import test from 'node:test';
import assert from 'node:assert/strict';
import load from './load-typescript.mjs';

function gallery({ list, get } = {}) {
  const requests = [];
  class ListObjectsV2Command { constructor(input) { this.input = input; } }
  class GetObjectCommand { constructor(input) { this.input = input; } }
  class NoSuchKey extends Error {}
  class S3Client {
    async send(command) {
      requests.push(command);
      if (command instanceof ListObjectsV2Command) {
        return list ? list(command.input) : { Contents: [
          { Key: 'India/Test/photo1.jpg', ETag: '"version-1"' },
          { Key: 'India/Test/experience.md' },
        ] };
      }
      if (get) return { Body: { transformToString: async () => get(command.input.Key) } };
      if (command.input.Key.endsWith('captions.json')) throw new NoSuchKey();
      return { Body: { transformToString: async () => 'My trip' } };
    }
  }
  const { GET } = load('app/api/gallery/route.ts', {
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    '@aws-sdk/client-s3': { S3Client, ListObjectsV2Command, GetObjectCommand, NoSuchKey },
    '@/data/locations': { COUNTRIES: [{ id: 'IN', name: 'India' }], TRAVEL_DATA: {
      IN: { destinations: { test: { id: 'test', name: 'Test', photoFolder: 'India/Test' } } },
    } },
  }, {
    R2_BUCKET_NAME: 'test', R2_PUBLIC_BASE_URL: 'https://photos.example/',
    R2_ENDPOINT: 'https://storage.example', R2_ACCESS_KEY_ID: 'test', R2_SECRET_ACCESS_KEY: 'test',
  });
  return {
    requests,
    async request(query = 'countryId=IN&destinationId=test') {
      const response = await GET({ nextUrl: new URL(`https://site.example/api/gallery?${query}`) });
      return { status: response.status, body: await response.json(), cache: response.headers.get('cache-control') };
    },
    listRequests: () => requests.filter((command) => command instanceof ListObjectsV2Command),
  };
}

test('bad captions do not hide valid photos or the story', async () => {
  const api = gallery({ get: (key) => key.endsWith('captions.json') ? '{broken' : 'My trip' });
  const result = await api.request();
  assert.equal(result.status, 200);
  assert.equal(result.body.images.length, 1);
  assert.equal(result.body.images[0].caption, 'Test - 1');
  assert.equal(result.body.experience, 'My trip');
  assert.deepEqual(result.body.warnings, ['captions']);
  assert.equal(result.cache, 'no-store');
});

test('a failed story read does not hide photos or captions', async () => {
  const api = gallery({ get: (key) => {
    if (key.endsWith('captions.json')) return '{"photo1.jpg":"A memory"}';
    throw new Error('Storage unavailable');
  } });
  const result = await api.request();
  assert.equal(result.status, 200);
  assert.equal(result.body.images[0].caption, 'A memory');
  assert.deepEqual(result.body.warnings, ['experience']);
  assert.equal(result.body.experience, '');
  assert.equal(result.body.experienceFormat, 'none');
});

test('missing optional caption manifests are normal, not errors', async () => {
  const result = await gallery().request();
  assert.equal(result.status, 200);
  assert.equal(result.body.warnings, undefined);
});

test('lists all 1001 images and metadata across continuation pages', async () => {
  const api = gallery({
    list: ({ ContinuationToken }) => ContinuationToken ? {
      Contents: [{ Key: 'India/Test/photo1001.jpg' }, { Key: 'India/Test/experience.md' }, { Key: 'India/Test/nested/hidden.jpg' }],
      IsTruncated: false,
    } : {
      Contents: Array.from({ length: 1000 }, (_, i) => ({ Key: `India/Test/photo${i + 1}.jpg` })),
      IsTruncated: true, NextContinuationToken: 'page-2',
    },
  });
  const result = await api.request();
  assert.equal(result.status, 200);
  assert.equal(result.body.images.length, 1001);
  assert.equal(result.body.images[1000].url, 'https://photos.example/India/Test/photo1001.jpg');
  assert.equal(result.body.experience, 'My trip');
  assert.equal(api.listRequests()[1].input.ContinuationToken, 'page-2');
});

test('invalid repeated continuation tokens fail instead of looping forever', async () => {
  const api = gallery({ list: () => ({ Contents: [], IsTruncated: true, NextContinuationToken: 'same' }) });
  const result = await api.request();
  assert.equal(result.status, 500);
  assert.equal(api.listRequests().length, 2);
});

test('overwriting the same file changes its versioned photo URL', async () => {
  let version = 'old';
  const api = gallery({ list: () => ({ Contents: [{ Key: 'India/Test/photo1.jpg', ETag: `"${version}"` }] }) });
  const first = await api.request();
  version = 'cropped';
  const second = await api.request();
  assert.equal(new URL(first.body.images[0].url).searchParams.get('v'), 'old');
  assert.equal(new URL(second.body.images[0].url).searchParams.get('v'), 'cropped');
  assert.notEqual(first.body.images[0].url, second.body.images[0].url);
});

test('last-modified timestamps version images if ETag is absent', async () => {
  const api = gallery({ list: () => ({ Contents: [{ Key: 'India/Test/photo1.jpg', LastModified: new Date('2026-11-07T00:00:00Z') }] }) });
  const result = await api.request();
  assert.equal(new URL(result.body.images[0].url).searchParams.get('v'), '2026-11-07T00:00:00.000Z');
});

test('unknown and inherited country/destination keys return 404 without storage requests', async () => {
  const api = gallery();
  for (const key of ['unknown', 'constructor', '__proto__', 'toString']) {
    assert.equal((await api.request(`countryId=${key}&destinationId=test`)).status, 404);
    assert.equal((await api.request(`countryId=IN&destinationId=${key}`)).status, 404);
  }
  assert.equal(api.requests.length, 0);
  assert.equal((await api.request('countryId=IN')).status, 400);
});
