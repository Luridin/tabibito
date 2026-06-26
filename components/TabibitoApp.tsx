"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
  APP_BASE_PATH,
  JOURNAL_ASSETS,
} from "@/lib/constants";
import type {
  Country,
  DestinationContentResponse,
  JournalPageData,
} from "@/types";

const EMPTY_DESTINATION_CONTENT: DestinationContentResponse = {
  images: [],
  experience: "",
  experienceFormat: "none",
  configured: true,
  prefix: null,
};

const destinationContentCache = new Map<string, DestinationContentResponse>();

function PixelLogoCard() {
  const [logoFailed, setLogoFailed] = useState(false);
  const logoSrc = `${APP_BASE_PATH}${JOURNAL_ASSETS.logoPath}`;

  return (
    <section className="pixel-card min-h-[180px]">
      <div className="pixel-card-inner flex h-full flex-col justify-between gap-5 p-5 sm:p-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex min-h-[6.5rem] min-w-[6.5rem] shrink-0 items-end justify-center sm:min-h-[8rem] sm:min-w-[8rem]">
            {!logoFailed ? (
              <Image
                src={logoSrc}
                alt="Tabibito logo"
                width={192}
                height={192}
                priority
                sizes="(max-width: 640px) 120px, 160px"
                className="h-auto max-h-[7rem] w-auto max-w-[7rem] object-contain [image-rendering:pixelated] sm:max-h-[8.5rem] sm:max-w-[8.5rem]"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-sm bg-[linear-gradient(180deg,rgba(255,194,92,0.95),rgba(238,154,50,0.92))] px-3 text-center text-[10px] font-black uppercase tracking-[0.18em] text-[var(--journal-ink)] sm:h-[8rem] sm:w-[8rem]">
                Tabibito
              </div>
            )}
          </div>

          <div className="pt-3 sm:pt-4">
            <h1 className="pixel-heading text-[clamp(0.9rem,1.5vw,1.2rem)] leading-[1.5] text-[var(--journal-ink)]">
              Tabibito
            </h1>
            <p className="pixel-label mt-2">Travel Journal</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: number;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 px-4 py-3 text-center sm:px-6 sm:py-4 ${
        isLast
          ? ""
          : "border-b-4 border-[var(--journal-line)] sm:border-b-0 sm:border-r-4"
      }`}
    >
      <span className="pixel-stat-value text-3xl text-[var(--journal-ink)] sm:text-4xl md:text-5xl">
          <AnimatedCounter value={value} />
      </span>
      <p className="text-sm font-medium text-[var(--journal-ink)] sm:text-base">{label}</p>
    </div>
  );
}

function StatsCard({
  totalDestinations,
  totalCountries,
}: {
  totalDestinations: number;
  totalCountries: number;
}) {
  return (
    <section className="pixel-card lg:col-span-2 min-h-[180px]">
      <div className="pixel-card-inner flex h-full items-center p-5 sm:p-6">
        <div className="grid w-full sm:grid-cols-2">
          <StatTile label="Destinations" value={totalDestinations} />
          <StatTile label="Countries" value={totalCountries} isLast />
        </div>
      </div>
    </section>
  );
}

function CountryArtImage({
  artPath,
  countryName,
}: {
  artPath: string;
  countryName: string;
}) {
  const [artFailed, setArtFailed] = useState(false);

  if (artFailed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,rgba(255,210,110,0.45),rgba(255,244,207,0.3))] p-6 text-center">
        <div className="pixel-heading text-4xl text-[var(--journal-ink)] sm:text-5xl">
          ?
        </div>
      </div>
    );
  }

  return (
    <Image
      src={`${APP_BASE_PATH}${artPath}`}
      alt={`${countryName} pixel art`}
      width={640}
      height={640}
      loading="eager"
      sizes="(max-width: 1024px) 100vw, 66vw"
      className="max-h-[320px] w-full object-contain [image-rendering:pixelated]"
      onError={() => setArtFailed(true)}
    />
  );
}

function CountryArtCard({ selectedCountry }: { selectedCountry: Country | null }) {
  const artPath = selectedCountry
    ? JOURNAL_ASSETS.countryArtById[
        selectedCountry.id as keyof typeof JOURNAL_ASSETS.countryArtById
      ]
    : null;

  return (
    <section className="pixel-card lg:col-span-2">
      <div className="pixel-card-inner flex h-full min-h-[360px] flex-col gap-4 p-5 sm:p-6">
        <div>
          <h2 className="pixel-heading text-sm text-[var(--journal-ink)] sm:text-base">
            Post Card
          </h2>
        </div>

        <div className="pixel-reading-surface flex min-h-[260px] flex-1 items-center justify-center p-4 sm:p-6">
          {selectedCountry && artPath ? (
            <CountryArtImage
              key={artPath}
              artPath={artPath}
              countryName={selectedCountry.name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,rgba(255,210,110,0.45),rgba(255,244,207,0.3))] p-6 text-center">
              <div className="pixel-heading text-4xl text-[var(--journal-ink)] sm:text-5xl">
                ?
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderExperienceBlocks(body: string, format: DestinationContentResponse["experienceFormat"]) {
  const normalizedBody = body.replace(/\r\n/g, "\n").trim();
  if (!normalizedBody) {
    return null;
  }

  const blocks = normalizedBody.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) {
      return null;
    }

    const headingMatch = lines[0].match(/^(#{1,3})\s+(.*)$/);
    if (format === "markdown" && headingMatch) {
      return (
        <h3
          key={`heading-${index}`}
          className="pixel-heading mt-2 text-xs text-[var(--journal-ink)] sm:text-sm"
        >
          {headingMatch[2].trim()}
        </h3>
      );
    }

    if (format === "markdown" && lines.every((line) => /^[-*]\s+/.test(line))) {
      return (
        <ul
          key={`list-${index}`}
          className="space-y-2 pl-5 text-sm leading-7 text-[var(--journal-ink)] sm:text-base"
        >
          {lines.map((line, lineIndex) => (
            <li key={`item-${index}-${lineIndex}`}>{line.replace(/^[-*]\s+/, "")}</li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={`paragraph-${index}`}
        className="text-sm leading-7 text-[var(--journal-ink)] sm:text-base"
      >
        {lines.join(" ").replace(/^>\s?/, "")}
      </p>
    );
  });
}

export default function TabibitoApp({
  journalData,
}: {
  journalData: JournalPageData;
}) {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [selectedDestinationKey, setSelectedDestinationKey] = useState<string | null>(null);
  const [destinationContent, setDestinationContent] = useState<DestinationContentResponse>(
    EMPTY_DESTINATION_CONTENT
  );
  const [isDestinationLoading, setIsDestinationLoading] = useState(false);
  const [destinationError, setDestinationError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const { countries, destinationsByCountry, totalCountries, totalDestinations } = journalData;

  const selectedCountry = useMemo(() => {
    if (countries.length === 0) {
      return null;
    }

    return (
      countries.find((country) => country.id === selectedCountryId) ??
      countries[0]
    );
  }, [countries, selectedCountryId]);

  const availableDestinations = useMemo(() => {
    return selectedCountry ? (destinationsByCountry[selectedCountry.id] ?? []) : [];
  }, [selectedCountry, destinationsByCountry]);

  const selectedDestination = useMemo(() => {
    if (availableDestinations.length === 0) {
      return null;
    }

    return (
      availableDestinations.find((destination) => destination.key === selectedDestinationKey) ??
      availableDestinations[0]
    );
  }, [availableDestinations, selectedDestinationKey]);

  const cachedDestinationContent = useMemo(() => {
    if (!selectedDestination) {
      return null;
    }

    return destinationContentCache.get(selectedDestination.key) ?? null;
  }, [selectedDestination]);

  useEffect(() => {
    if (!selectedDestination || cachedDestinationContent) {
      return;
    }

    const controller = new AbortController();
    let frameId = 0;
    const params = new URLSearchParams({
      countryId: selectedDestination.countryId,
      destinationId: selectedDestination.destination.id,
    });

    frameId = requestAnimationFrame(() => {
      setDestinationContent(EMPTY_DESTINATION_CONTENT);
      setDestinationError(null);
      setIsDestinationLoading(true);
    });

    fetch(`${APP_BASE_PATH}/api/gallery?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Destination request failed with status ${response.status}`);
        }
        return response.json() as Promise<DestinationContentResponse>;
      })
      .then((payload) => {
        destinationContentCache.set(selectedDestination.key, payload);
        setDestinationContent(payload);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setDestinationError("Could not load destination media right now.");
        setDestinationContent(EMPTY_DESTINATION_CONTENT);
      })
      .finally(() => {
        setIsDestinationLoading(false);
      });

    return () => {
      controller.abort();
      cancelAnimationFrame(frameId);
    };
  }, [cachedDestinationContent, selectedDestination]);

  const activeDestinationContent = selectedDestination
    ? (cachedDestinationContent ?? destinationContent)
    : EMPTY_DESTINATION_CONTENT;
  const activeDestinationError = cachedDestinationContent
    ? null
    : selectedDestination
      ? destinationError
      : null;
  const activeDestinationLoading = cachedDestinationContent
    ? false
    : selectedDestination
      ? isDestinationLoading
      : false;
  const galleryImages = activeDestinationContent.images;

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((previous) => {
      if (previous === null || galleryImages.length === 0) {
        return previous;
      }

      return (previous - 1 + galleryImages.length) % galleryImages.length;
    });
  }, [galleryImages.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((previous) => {
      if (previous === null || galleryImages.length === 0) {
        return previous;
      }

      return (previous + 1) % galleryImages.length;
    });
  }, [galleryImages.length]);

  const renderedExperience = renderExperienceBlocks(
    activeDestinationContent.experience.trim(),
    activeDestinationContent.experienceFormat
  );

  return (
    <main className="journal-shell">
      <div className="journal-grid pb-8">
        <PixelLogoCard />

        <StatsCard
          totalDestinations={totalDestinations}
          totalCountries={totalCountries}
        />

        <section className="pixel-card">
          <div className="pixel-card-inner flex h-full flex-col gap-5 p-5 sm:p-6">
            <div>
              <h2 className="pixel-heading text-sm text-[var(--journal-ink)] sm:text-base">
                Choose your route
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="pixel-label block" htmlFor="country-selector">
                  Country
                </label>
                <select
                  id="country-selector"
                  className="pixel-select"
                  value={selectedCountry?.id ?? ""}
                  onChange={(event) => {
                    setSelectedCountryId(event.target.value || null);
                    setSelectedDestinationKey(null);
                    setSelectedImageIndex(null);
                  }}
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="pixel-label block" htmlFor="destination-selector">
                  Destination
                </label>
                <select
                  id="destination-selector"
                  className="pixel-select"
                  value={selectedDestination?.key ?? ""}
                  onChange={(event) => {
                    setSelectedDestinationKey(event.target.value || null);
                    setSelectedImageIndex(null);
                  }}
                  disabled={availableDestinations.length === 0}
                >
                  {availableDestinations.map((destination) => (
                    <option key={destination.key} value={destination.key}>
                      {destination.destination.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <CountryArtCard key={selectedCountry?.id ?? "none"} selectedCountry={selectedCountry} />

        <section className="pixel-card lg:col-span-3">
          <div className="pixel-card-inner flex h-full min-h-[420px] flex-col gap-5 p-5 sm:p-6">
            <div>
              <p className="pixel-label mb-2">Travel Experience</p>
              <h2 className="pixel-heading text-sm text-[var(--journal-ink)] sm:text-base">
                {selectedDestination
                    ? `${selectedDestination.destination.name} journal entry`
                  : "Destination journal"}
              </h2>
            </div>

            <div className="pixel-reading-surface pixel-scroll flex-1 overflow-y-auto p-4 sm:p-5">
              {selectedDestination ? (
                <div className="space-y-5">
                  <div className="space-y-3 border-b-4 border-dashed border-[var(--journal-line)] pb-4">
                    <p className="pixel-label">Destination overview</p>
                    <h3 className="pixel-heading text-xs text-[var(--journal-ink)] sm:text-sm">
                      {selectedDestination.destination.name}
                    </h3>
                    <p className="text-sm leading-7 text-[var(--journal-ink)] sm:text-base">
                      {selectedDestination.destination.description}
                    </p>
                  </div>

                  {activeDestinationLoading ? (
                    <div className="space-y-3">
                      <div className="h-4 w-5/6 animate-pulse bg-[rgba(255,212,107,0.35)]" />
                      <div className="h-4 w-full animate-pulse bg-[rgba(255,212,107,0.35)]" />
                      <div className="h-4 w-11/12 animate-pulse bg-[rgba(255,212,107,0.35)]" />
                    </div>
                  ) : renderedExperience ? (
                    <div className="space-y-4">{renderedExperience}</div>
                  ) : (
                    <div className="space-y-3">
                      <p className="pixel-heading text-xs text-[var(--journal-ink)] sm:text-sm">
                        Journal entry not uploaded yet
                      </p>
                      {activeDestinationContent.prefix ? (
                        <p className="text-xs leading-6 text-[var(--journal-muted)]">
                          Looked in: {activeDestinationContent.prefix}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-center">
                  <div className="max-w-xs space-y-3">
                    <p className="pixel-heading text-xs text-[var(--journal-ink)] sm:text-sm">
                      No destination selected
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pixel-card lg:col-span-3">
          <div className="pixel-card-inner flex h-full min-h-[420px] flex-col gap-5 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="pixel-label mb-2">Gallery</p>
                <h2 className="pixel-heading text-sm text-[var(--journal-ink)] sm:text-base">
                  {selectedDestination
                    ? `${selectedDestination.destination.name} snapshots`
                    : "Destination snapshots"}
                </h2>
              </div>
              {selectedDestination ? (
                <div className="pixel-label border-2 border-[var(--journal-line)] bg-[var(--journal-paper-strong)] px-3 py-2">
                  {galleryImages.length} photos
                </div>
              ) : null}
            </div>

            {activeDestinationLoading ? (
              <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`gallery-loading-${index}`}
                    className="pixel-image-frame aspect-[4/3] animate-pulse bg-[rgba(255,212,107,0.35)]"
                  />
                ))}
              </div>
            ) : galleryImages.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className="pixel-image-frame group relative aspect-[4/3] overflow-hidden text-left transition-transform duration-150 hover:-translate-y-1"
                  >
                    <Image
                      src={image.url}
                      alt={image.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-200 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(43,25,5,0.9))] p-3">
                      <p className="pixel-label !text-[9px] text-white">Photo {index + 1}</p>
                      <p className="mt-2 line-clamp-2 text-sm leading-5 text-white">
                        {image.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="pixel-reading-surface flex flex-1 items-center justify-center p-6 text-center">
                <div className="max-w-md space-y-3">
                  <p className="pixel-heading text-xs text-[var(--journal-ink)] sm:text-sm">
                    Gallery not loaded
                  </p>
                  {activeDestinationError ? (
                    <p className="text-sm leading-6 text-[var(--journal-muted)]">
                      {activeDestinationError}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <ImageLightbox
        selectedImageIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        galleryImages={galleryImages}
      />
    </main>
  );
}