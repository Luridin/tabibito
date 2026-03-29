import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, ListObjectsV2Command, NoSuchKey, S3Client } from "@aws-sdk/client-s3";
import { TRAVEL_DATA } from "@/data/locations";
import { GalleryImage, CityData, StateData } from "@/types";

export const runtime = "nodejs";

type RouteLookup = {
  countryId: string;
  city: CityData;
  state: StateData;
  countryName: string;
};

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|webp)$/i;
const CAPTIONS_FILE_NAME = "captions.json";

type CaptionManifest = Record<string, string>;

function getCityRecord(countryId: string, stateId: string, cityId: string): RouteLookup | null {
  const country = TRAVEL_DATA[countryId];
  if (!country) return null;

  const state = country.states[stateId];
  if (!state) return null;

  const city = state.cities.find((entry) => entry.id === cityId);
  if (!city) return null;

  return {
    countryId,
    city,
    state,
    countryName:
      countryId === "IN" ? "India" : countryId === "TH" ? "Thailand" : countryId === "AE" ? "UAE" : countryId,
  };
}

function normalizePrefix(prefix: string) {
  return prefix.endsWith("/") ? prefix : `${prefix}/`;
}

function encodeObjectKey(key: string) {
  return key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildPublicUrl(baseUrl: string, objectKey: string) {
  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(encodeObjectKey(objectKey), normalizedBaseUrl).toString();
}

function getPhotoPrefixes(record: RouteLookup) {
  return [...new Set([
    record.city.photoFolder,
    `${record.countryName}/${record.state.name}/${record.city.name}`,
    `${record.countryId}/${record.state.id}/${record.city.name}`,
    `${record.countryId}/${record.state.id}/${record.city.id}`,
  ].filter((value): value is string => Boolean(value)).map(normalizePrefix))];
}

function getObjectName(key: string) {
  return key.split("/").pop() ?? key;
}

function normalizeCaptionManifest(value: unknown): CaptionManifest {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value as Record<string, unknown>).reduce<CaptionManifest>((accumulator, [entryKey, entryValue]) => {
    if (typeof entryValue !== "string") {
      return accumulator;
    }

    const normalizedValue = entryValue.trim();
    if (!normalizedValue) {
      return accumulator;
    }

    accumulator[entryKey] = normalizedValue;
    return accumulator;
  }, {});
}

async function getCaptionManifest(client: S3Client, bucketName: string, prefix: string) {
  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: `${prefix}${CAPTIONS_FILE_NAME}`,
      })
    );

    const body = await response.Body?.transformToString();
    if (!body) {
      return {};
    }

    return normalizeCaptionManifest(JSON.parse(body));
  } catch (error) {
    if (error instanceof NoSuchKey) {
      return {};
    }

    const statusCode = typeof error === "object" && error !== null && "$metadata" in error
      ? (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode
      : undefined;

    if (statusCode === 404) {
      return {};
    }

    throw error;
  }
}

function toGalleryImages(keys: string[], lookup: RouteLookup, publicBaseUrl: string, captionManifest: CaptionManifest) {
  return keys
    .filter((key) => IMAGE_EXTENSIONS.test(key))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }))
    .map((key, index) => ({
      id: `${lookup.city.id}-${index + 1}`,
      url: buildPublicUrl(publicBaseUrl, key),
      caption: captionManifest[key] ?? captionManifest[getObjectName(key)] ?? `${lookup.city.name} - ${index + 1}`,
    }));
}

function getS3Client() {
  const endpoint = process.env.R2_ENDPOINT ??
    (process.env.R2_ACCOUNT_ID ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : null);
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function GET(request: NextRequest) {
  const countryId = request.nextUrl.searchParams.get("countryId");
  const stateId = request.nextUrl.searchParams.get("stateId");
  const cityId = request.nextUrl.searchParams.get("cityId");

  if (!countryId || !stateId || !cityId) {
    return NextResponse.json({ error: "countryId, stateId, and cityId are required." }, { status: 400 });
  }

  const lookup = getCityRecord(countryId, stateId, cityId);
  if (!lookup) {
    return NextResponse.json({ error: "City not found." }, { status: 404 });
  }

  const bucketName = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_TRIP_PHOTO_BASE_URL;
  const client = getS3Client();

  if (!bucketName || !publicBaseUrl || !client) {
    return NextResponse.json(
      { images: [], configured: false, prefix: getPhotoPrefixes(lookup)[0] ?? null },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const prefixes = getPhotoPrefixes(lookup);

  try {
    for (const prefix of prefixes) {
      const response = await client.send(
        new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: prefix,
        })
      );

      const keys = (response.Contents ?? [])
        .map((entry) => entry.Key)
        .filter((key): key is string => Boolean(key))
        .filter((key) => key.startsWith(prefix))
        .filter((key) => !key.endsWith("/"))
        .filter((key) => !key.slice(prefix.length).includes("/"));

      if (keys.length === 0) {
        continue;
      }

      const captionManifest = await getCaptionManifest(client, bucketName, prefix);
      const images = toGalleryImages(keys, lookup, publicBaseUrl, captionManifest);

      return NextResponse.json(
        { images, configured: true, prefix },
        {
          headers: {
            // Cache successful responses for 60s, serve stale for up to 5min
            // while revalidating in the background. Cuts R2 Class B ops and
            // Vercel function invocations dramatically under repeated/bot traffic.
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    return NextResponse.json(
      { images: [], configured: true, prefix: prefixes[0] ?? null },
      {
        headers: {
          // Empty result — cache briefly so bots don't hammer missing cities
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { images: [], configured: true, prefix: prefixes[0] ?? null },
      {
        status: 500,
        headers: {
          // Don't cache errors
          "Cache-Control": "no-store",
        },
      }
    );
  }
}