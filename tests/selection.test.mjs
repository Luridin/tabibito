import test from 'node:test';
import assert from 'node:assert/strict';
import load from './load-typescript.mjs';
const { resolveJournalSelection } = load('lib/selection.ts');
const option = (country, id) => ({ key: `${country}:${id}`, destination: { id } });
const data = { countries: [{ id: 'IN' }, { id: 'TH' }], destinationsByCountry: {
  IN: [option('IN', 'bengaluru'), option('IN', 'gokarna')], TH: [option('TH', 'bangkok'), option('TH', 'phuket')],
} };
const resolve = (query, source = data) => JSON.parse(JSON.stringify(resolveJournalSelection(source, query)));

test('shareable selection resolves the country, destination, and sort', () => {
  assert.deepEqual(resolve({ country: 'TH', destination: 'phuket', sort: 'alphabetical' }), {
    countryId: 'TH', destinationKey: 'TH:phuket', sort: 'alphabetical',
  });
});
test('restoring a Gokarna URL selects Gokarna instead of the default Bengaluru', () => {
  const params = new URLSearchParams('?country=IN&destination=gokarna&sort=date');
  assert.deepEqual(resolve(Object.fromEntries(params)), {
    countryId: 'IN', destinationKey: 'IN:gokarna', sort: 'date',
  });
});
test('invalid query values fall back safely', () => {
  assert.deepEqual(resolve({ country: 'constructor', destination: 'constructor', sort: 'invalid' }), {
    countryId: 'IN', destinationKey: 'IN:bengaluru', sort: 'date',
  });
});
test('a destination from another country is not selected', () => {
  assert.equal(resolve({ country: 'TH', destination: 'bengaluru' }).destinationKey, 'TH:bangkok');
});
test('empty journals do not throw', () => {
  assert.deepEqual(resolve({}, { countries: [], destinationsByCountry: {} }), { countryId: '', destinationKey: '', sort: 'date' });
});
