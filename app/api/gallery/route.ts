import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, ListObjectsV2Command, NoSuchKey, S3Client } from "@aws-sdk/client-s3";
import { COUNTRIES, TRAVEL_DATA } from "@/data/locations";
import { DestinationData } from "@/types";

export const runtime = "nodejs";

type RouteLookup = {
  countryId: string;
  countryName: string;
  destination: DestinationData;
};

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|webp)$/i;
const CAPTIONS_FILE_NAME = "captions.json";
const EXPERIENCE_FILE_NAMES = [
  "experience.md",
  "experience.txt",
  "travel-experience.md",
  "travel-experience.txt",
];

type CaptionManifest = Record<string, string>;
type ExperiencePayload = {
  body: string;
  format: "markdown" | "text" | "none";
};

function getCountryName(countryId: string) {
  return COUNTRIES.find((country) => country.id === countryId)?.name ?? countryId;
}

function getDestinationRecord(countryId: string, destinationId: string): RouteLookup | null {
  if (!Object.hasOwn(TRAVEL_DATA, countryId)) return null;
  const country = TRAVEL_DATA[countryId];
  if (!country) return null;

  if (!Object.hasOwn(country.destinations, destinationId)) return null;
  const destination = country.destinations[destinationId];
  if (!destination) return null;

  return {
    countryId,
    countryName: getCountryName(countryId),
    destination,
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

function buildPublicUrl(baseUrl: string, objectKey: string, version?: string) {
  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const url = new URL(encodeObjectKey(objectKey), normalizedBaseUrl);
  if (version) url.searchParams.set("v", version);
  return url.toString();
}

function getPhotoPrefixes(record: RouteLookup) {
  return [...new Set([
    record.destination.photoFolder,
    `${record.countryName}/${record.destination.name}`,
    `${record.countryName}/${record.destination.id}`,
    `${record.countryId}/${record.destination.name}`,
    `${record.countryId}/${record.destination.id}`,
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

async function readTextObject(client: S3Client, bucketName: string, objectKey: string) {
  const response = await client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    })
  );

  return (await response.Body?.transformToString())?.trim() ?? "";
}

async function getExperienceContent(
  client: S3Client,
  bucketName: string,
  keys: string[],
  lookup: RouteLookup
): Promise<ExperiencePayload> {
  const preferredNames = [
    `${lookup.destination.name}.md`,
    `${lookup.destination.id}.md`,
    ...EXPERIENCE_FILE_NAMES,
  ];

  const preferredKey = preferredNames
    .map((fileName) => keys.find((key) => key.endsWith(`/${fileName}`)))
    .find((key): key is string => Boolean(key));

  const fallbackKey = keys.find((key) => /\.(md|txt)$/i.test(key));
  const objectKey = preferredKey || fallbackKey;

  if (!objectKey) {
    return {
      body: "",
      format: "none",
    };
  }

  const body = await readTextObject(client, bucketName, objectKey);
  return {
    body,
    format: objectKey.endsWith(".md") ? "markdown" : "text",
  };
}

function toGalleryImages(keys: string[], lookup: RouteLookup, publicBaseUrl: string, captionManifest: CaptionManifest, versions: Map<string, string>) {
  return keys
    .filter((key) => IMAGE_EXTENSIONS.test(key))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }))
    .map((key, index) => ({
      id: key,
      url: buildPublicUrl(publicBaseUrl, key, versions.get(key)),
      caption: captionManifest[key] ?? captionManifest[getObjectName(key)] ?? `${lookup.destination.name} - ${index + 1}`,
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

function getMissingConfig() {
  const missing = [];

  if (!process.env.R2_BUCKET_NAME) {
    missing.push("R2_BUCKET_NAME");
  }

  if (!process.env.R2_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_TRIP_PHOTO_BASE_URL) {
    missing.push("R2_PUBLIC_BASE_URL or NEXT_PUBLIC_TRIP_PHOTO_BASE_URL");
  }

  const hasEndpoint = Boolean(process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID);
  if (!hasEndpoint) {
    missing.push("R2_ENDPOINT or R2_ACCOUNT_ID");
  }

  if (!process.env.R2_ACCESS_KEY_ID) {
    missing.push("R2_ACCESS_KEY_ID");
  }

  if (!process.env.R2_SECRET_ACCESS_KEY) {
    missing.push("R2_SECRET_ACCESS_KEY");
  }

  return missing;
}

export async function GET(request: NextRequest) {
  const countryId = request.nextUrl.searchParams.get("countryId");
  const destinationId = request.nextUrl.searchParams.get("destinationId");

  if (!countryId || !destinationId) {
    return NextResponse.json({ error: "countryId and destinationId are required." }, { status: 400 });
  }

  const lookup = getDestinationRecord(countryId, destinationId);
  if (!lookup) {
    return NextResponse.json({ error: "Destination not found." }, { status: 404 });
  }

  const bucketName = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_TRIP_PHOTO_BASE_URL ?? null;
  const client = getS3Client();

  if (!bucketName || !publicBaseUrl || !client) {
    const missing = getMissingConfig();
    return NextResponse.json(
      {
        images: [],
        experience: "",
        experienceFormat: "none",
        configured: false,
        prefix: getPhotoPrefixes(lookup)[0] ?? null,
        missing,
      },
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
      const versions = new Map<string, string>();
      const objectKeys = new Set<string>();
      const seenTokens = new Set<string>();
      let continuationToken: string | undefined;

      do {
        const response = await client.send(new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        }));

        for (const entry of response.Contents ?? []) {
          const key = entry.Key;
          if (!key || !key.startsWith(prefix) || key.endsWith("/") || key.slice(prefix.length).includes("/")) continue;
          objectKeys.add(key);
          const version = entry.ETag?.replace(/^"|"$/g, "") || entry.LastModified?.toISOString();
          if (version) versions.set(key, version);
        }

        if (!response.IsTruncated) break;
        continuationToken = response.NextContinuationToken;
        if (!continuationToken || seenTokens.has(continuationToken)) {
          throw new Error("Object listing returned an invalid continuation token.");
        }
        seenTokens.add(continuationToken);
      } while (continuationToken);

      const keys = [...objectKeys];

      if (keys.length === 0) {
        continue;
      }

      const [captionsResult, experienceResult] = await Promise.allSettled([
        getCaptionManifest(client, bucketName, prefix),
        getExperienceContent(client, bucketName, keys, lookup),
      ]);
      const warnings: ("captions" | "experience")[] = [];
      if (captionsResult.status === "rejected") warnings.push("captions");
      if (experienceResult.status === "rejected") warnings.push("experience");
      const captionManifest = captionsResult.status === "fulfilled" ? captionsResult.value : {};
      const experience: ExperiencePayload = experienceResult.status === "fulfilled"
        ? experienceResult.value : { body: "", format: "none" };
      const images = toGalleryImages(keys, lookup, publicBaseUrl, captionManifest, versions);

      return NextResponse.json(
        {
          images,
          experience: experience.body,
          experienceFormat: experience.format,
          configured: true,
          prefix,
          ...(warnings.length ? { warnings } : {}),
        },
        {
          headers: {
            "Cache-Control": warnings.length ? "no-store" : "public, s-maxage=60, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      {
        images: [],
        experience: "",
        experienceFormat: "none",
        configured: true,
        prefix: prefixes[0] ?? null,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, must-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        images: [],
        experience: "",
        experienceFormat: "none",
        configured: true,
        prefix: prefixes[0] ?? null,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
