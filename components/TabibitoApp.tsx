"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import AnimatedCount from "@/components/AnimatedCount";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, ImageOff, MapPin, RefreshCw } from "lucide-react";
import { APP_BASE_PATH } from "@/lib/constants";
import type { DestinationContentResponse, DestinationOption, GalleryImage, JournalPageData } from "@/types";

const CACHE_DURATION_MS = 60_000;
const contentCache = new Map<string, { content: DestinationContentResponse; expires: number }>();

type ContentResult = { content: DestinationContentResponse; error?: never } | { content?: never; error: string };

function getCachedContent(key: string): ContentResult | null {
  const cached = contentCache.get(key);
  return cached && cached.expires > Date.now() ? { content: cached.content } : null;
}

function useDestinationContent(destination: DestinationOption) {
  const [result, setResult] = useState<ContentResult | null>(() => getCachedContent(destination.key));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (getCachedContent(destination.key)) return;

    const controller = new AbortController();
    let active = true;
    const params = new URLSearchParams({
      countryId: destination.countryId,
      destinationId: destination.destination.id,
    });

    async function load() {
      try {
        const response = await fetch(`${APP_BASE_PATH}/api/gallery?${params}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Could not load this destination.");
        const content = await response.json() as DestinationContentResponse;
        if (!active) return;
        if (content.configured) {
          contentCache.set(destination.key, { content, expires: Date.now() + CACHE_DURATION_MS });
        }
        setResult({ content });
      } catch {
        if (active) setResult({ error: "The journal couldn’t be loaded. Please try again." });
      }
    }

    void load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [destination, attempt]);

  const retry = () => {
    contentCache.delete(destination.key);
    setResult(null);
    setAttempt((previous) => previous + 1);
  };

  return { result, retry };
}

// Render the supported journal blocks without injecting HTML from the bucket.
function ExperienceText({ body, format }: { body: string; format: DestinationContentResponse["experienceFormat"] }) {
  const lines = body.replace(/\r\n?/g, "\n").trim().split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (paragraph.length) {
      blocks.push(<p key={`p-${blocks.length}`}>{paragraph.join(" ")}</p>);
      paragraph = [];
    }
    if (list.length) {
      blocks.push(<ul key={`ul-${blocks.length}`}>{list.map((item, index) => <li key={index}>{item}</li>)}</ul>);
      list = [];
    }
  };

  for (const line of lines) {
    const heading = format === "markdown" ? line.match(/^#{1,6}\s+(.+)$/) : null;
    const item = format === "markdown" ? line.match(/^[-*+]\s+(.+)$/) : null;
    const quote = format === "markdown" ? line.match(/^>\s?(.*)$/) : null;
    if (!line.trim()) {
      flush();
    } else if (heading) {
      flush();
      blocks.push(<h3 key={`h-${blocks.length}`}>{heading[1]}</h3>);
    } else if (item) {
      if (paragraph.length) flush();
      list.push(item[1]);
    } else if (quote) {
      flush();
      blocks.push(<blockquote key={`q-${blocks.length}`}>{quote[1]}</blockquote>);
    } else {
      if (list.length) flush();
      paragraph.push(line.trim());
    }
  }
  flush();
  return <div className="experience-prose">{blocks}</div>;
}

function Photo({ image }: { image: GalleryImage }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="photo-unavailable"><ImageOff size={28} strokeWidth={1} /><p>This photo is unavailable.</p></div>
  ) : (
    <Image
      src={image.url}
      alt={image.caption}
      fill
      sizes="(max-height: 500px) and (orientation: landscape) and (max-width: 1000px) 35svh, (max-width: 700px) min(94vw, 51svh, 480px), 560px"
      className="gallery-photo"
      onError={() => setFailed(true)}
    />
  );
}

function PhotoCarousel({ images, destinationName }: { images: GalleryImage[]; destinationName: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useReducedMotion();
  const image = images[index];
  const canNavigate = images.length > 1;

  function move(step: number) {
    if (!canNavigate) return;
    setDirection(step);
    setIndex((current) => (current + step + images.length) % images.length);
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${destinationName} photos`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="carousel-stage">
        <div className="card-stack" data-stacked={canNavigate}>
          <div className="card-back card-back-far" aria-hidden="true" />
          <div className="card-back card-back-near" aria-hidden="true" />
          <div
            className="photo-card"
            onTouchStart={(event) => {
              if (event.touches.length !== 1) {
                touchStart.current = null;
                return;
              }
              touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }}
            onTouchCancel={() => { touchStart.current = null; }}
            onTouchEnd={(event) => {
              if (!touchStart.current || event.touches.length > 0 || !event.changedTouches.length) return;
              const dx = event.changedTouches[0].clientX - touchStart.current.x;
              const dy = event.changedTouches[0].clientY - touchStart.current.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
              touchStart.current = null;
            }}
          >
            <div className="photo-viewport">
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={image.id}
                  custom={direction}
                  variants={{
                    enter: (step: number) => ({ opacity: 0, x: reducedMotion ? 0 : step * 24 }),
                    visible: { opacity: 1, x: 0 },
                    exit: (step: number) => ({ opacity: 0, x: reducedMotion ? 0 : step * -24 }),
                  }}
                  initial="enter"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: reducedMotion ? 0 : 0.18 }}
                  className="photo-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${images.length}`}
                >
                  <Photo image={image} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="photo-card-footer" aria-live="polite" aria-atomic="true">
              <span className="photo-caption">{image.caption}</span>
              <span className="photo-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" className="arrow-button" onClick={() => move(-1)} disabled={!canNavigate} aria-label="Previous photo">
          <ArrowLeft size={19} strokeWidth={1.5} />
        </button>
        <span className="carousel-position" aria-live="polite" aria-atomic="true">
          <span>{index + 1}</span><span aria-hidden="true">/</span><span className="sr-only"> of </span><span>{images.length}</span>
        </span>
        <button type="button" className="arrow-button" onClick={() => move(1)} disabled={!canNavigate} aria-label="Next photo">
          <ArrowRight size={19} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function DestinationJournal({ destination }: { destination: DestinationOption }) {
  const { result, retry } = useDestinationContent(destination);
  const content = result?.content;
  const loading = result === null;
  const unavailable = content?.configured === false;
  const images = content?.images ?? [];

  return (
    <>
      <section className="gallery-section" aria-labelledby="gallery-heading" aria-busy={loading}>
        <div className="section-heading">
          <div><h1 id="gallery-heading">{destination.destination.name}</h1></div>
          <span className="location-tag"><MapPin size={13} aria-hidden="true" />{destination.countryName}</span>
        </div>
        {loading ? (
          <div className="gallery-loading" role="status"><div className="skeleton-card" /><p>Finding the moments…</p></div>
        ) : result.error || unavailable ? (
          <div className="gallery-empty" role="status">
            <ImageOff size={30} strokeWidth={1} aria-hidden="true" />
            <h3>{unavailable ? "Photos are temporarily unavailable" : "A little detour"}</h3>
            <p>{result.error ?? "Photos and stories are temporarily unavailable. Please check back soon."}</p>
            <button type="button" className="retry-button" onClick={retry}><RefreshCw size={14} />Try again</button>
          </div>
        ) : images.length ? (
          <PhotoCarousel images={images} destinationName={destination.destination.name} />
        ) : (
          <div className="gallery-empty"><ImageOff size={30} strokeWidth={1} aria-hidden="true" /><h3>Memories still to be framed</h3><p>Photos from {destination.destination.name} will find their way here soon.</p></div>
        )}
      </section>
      <section className="experience-section" aria-labelledby="experience-heading" aria-busy={loading}>
        <details className="experience-disclosure">
          <summary className="experience-toggle">
            <div className="experience-heading"><h2 id="experience-heading">Personal experience<span className="heading-period">.</span></h2></div>
            <ChevronDown className="experience-chevron" size={22} aria-hidden="true" />
          </summary>
          <div className="experience-body">
        {loading ? (
          <div className="experience-loading" role="status"><span className="sr-only">Loading personal experience</span><div /><div /><div /></div>
        ) : result.error || unavailable ? (
          <p className="experience-empty">The story couldn’t be loaded right now. Try loading the journal again above.</p>
        ) : content?.experience.trim() ? (
          <ExperienceText body={content.experience} format={content.experienceFormat} />
        ) : (
          <p className="experience-empty">Some journeys take a little longer to put into words. The story of {destination.destination.name} is still being written.</p>
        )}
          </div>
        </details>
      </section>
    </>
  );
}

export default function TabibitoApp({ journalData }: { journalData: JournalPageData }) {
  const { countries, destinationsByCountry, totalCountries, totalDestinations } = journalData;
  const [countryId, setCountryId] = useState(countries[0]?.id ?? "");
  const [destinationKey, setDestinationKey] = useState("");
  const destinations = destinationsByCountry[countryId] ?? [];
  const destination = destinations.find((option) => option.key === destinationKey) ?? destinations[0];

  return (
    <div className="journal">
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href={`${APP_BASE_PATH}/`} aria-label="Tabibito home">tabibito<span className="wordmark-dot" /></a>
          <div className="travel-stats" aria-label="Travel totals">
            <div className="stat"><span className="stat-value"><AnimatedCount value={totalCountries} /></span><span className="stat-label">Countries</span></div>
            <span className="stat-divider" aria-hidden="true" />
            <div className="stat"><span className="stat-value"><AnimatedCount value={totalDestinations} /></span><span className="stat-label">Destinations</span></div>
          </div>
        </div>
      </header>
      <main className="journal-main">
        <section className="route-section" aria-label="Choose a destination">
          <div className="route-filters">
            <div className="filter-field">
              <label htmlFor="country-selector">Country</label>
              <div className="select-wrapper"><select id="country-selector" value={countryId} disabled={!countries.length} onChange={(event) => { setCountryId(event.target.value); setDestinationKey(""); }}>
                {countries.map((country) => <option key={country.id} value={country.id}>{country.flag}　{country.name}</option>)}
              </select><ChevronDown size={16} aria-hidden="true" /></div>
            </div>
            <div className="filter-field">
              <label htmlFor="destination-selector">Destination<span>{destinations.length} places</span></label>
              <div className="select-wrapper"><select id="destination-selector" value={destination?.key ?? ""} disabled={!destinations.length} onChange={(event) => setDestinationKey(event.target.value)}>
                {destinations.map((option) => <option key={option.key} value={option.key}>{option.destination.name}</option>)}
              </select><ChevronDown size={16} aria-hidden="true" /></div>
            </div>
          </div>
        </section>
        {destination ? <DestinationJournal key={destination.key} destination={destination} /> : <div className="gallery-empty"><h2>The journey starts here</h2><p>Destinations will appear as the journal grows.</p></div>}
      </main>
      <footer className="site-footer"><span>tabibito</span><span className="footer-japanese" lang="ja">旅人</span></footer>
    </div>
  );
}
