"use client";

import { Country, TravelData, StateData } from "@/types";
import { geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection, Feature, Geometry } from "geojson";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MAP_COLORS,
  MAP_TRANSFORMS,
  MAP_PADDING_PX,
  SELECTOR_HEIGHT_PX,
  NARROW_LANDSCAPE_WIDTH,
  APP_BASE_PATH,
} from "@/lib/constants";

type Props = {
  activeState: string | null;
  setActiveState: (state: string | null) => void;
  country: Country;
  travelData: TravelData;
  layout: "portrait" | "landscape";
  onMapReadyChange?: (isReady: boolean) => void;
};

type MapLoadState = "loading" | "loaded" | "error" | "missing";

export default function MapContainer({
  activeState,
  setActiveState,
  country,
  travelData,
  layout,
  onMapReadyChange,
}: Props) {
  const resolveMapUrl = useCallback((rawUrl: string | undefined) => {
    if (!rawUrl) return "";

    // Existing data may contain legacy /tabibito-prefixed map URLs.
    const legacyBasePath = "/tabibito";

    if (APP_BASE_PATH) {
      return rawUrl;
    }

    if (rawUrl === legacyBasePath) {
      return "/";
    }

    if (rawUrl.startsWith(`${legacyBasePath}/`)) {
      return rawUrl.slice(legacyBasePath.length);
    }

    return rawUrl;
  }, []);

  const resolvedMapUrl = useMemo(
    () => resolveMapUrl(country.mapUrl),
    [country.mapUrl, resolveMapUrl]
  );

  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [loadedMapUrl, setLoadedMapUrl] = useState<string | null>(null);
  const [errorMapUrl, setErrorMapUrl] = useState<string | null>(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch GeoJSON data with error handling
  useEffect(() => {
    const mapUrl = resolvedMapUrl;

    if (!mapUrl) {
      return;
    }

    const controller = new AbortController();

    fetch(mapUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data: FeatureCollection) => {
        setGeoData(data);
        setLoadedMapUrl(mapUrl);
        setErrorMapUrl(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load map data:", err);
          setErrorMapUrl(mapUrl);
        }
      });

    return () => controller.abort();
  }, [resolvedMapUrl]);

  const loadState: MapLoadState = useMemo(() => {
    if (!resolvedMapUrl) return "missing";
    if (errorMapUrl === resolvedMapUrl) return "error";
    if (loadedMapUrl === resolvedMapUrl) return "loaded";
    return "loading";
  }, [resolvedMapUrl, errorMapUrl, loadedMapUrl]);

  const visibleGeoData = useMemo(() => {
    return loadedMapUrl === resolvedMapUrl ? geoData : null;
  }, [resolvedMapUrl, geoData, loadedMapUrl]);

  useEffect(() => {
    if (!onMapReadyChange) return;
    const isReady = loadState === "loaded" && svgSize.width > 0 && svgSize.height > 0;
    onMapReadyChange(isReady);
  }, [loadState, onMapReadyChange, svgSize.height, svgSize.width]);

  // Track container size for responsive SVG
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSvgSize({ width, height });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Cleanup click timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const currentCountryData = useMemo(() => {
    return travelData[country.id] || { states: {} };
  }, [country.id, travelData]);

  const normalizeStateName = useCallback((value: string) => {
    return value
      .normalize("NFKD")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }, []);

  const getFeatureName = useCallback((feature: Feature<Geometry>) => {
    const properties = feature.properties || {};
    const candidate = [
      properties.name,
      properties.ST_NM,
      properties.NAME_1,
      properties.name_1,
      properties.shapeName,
      properties.shapeGroup,
    ].find((value) => typeof value === "string" && value.trim());

    return typeof candidate === "string" ? candidate : "";
  }, []);

  // O(1) lookup map for state features
  const statesByGeoId = useMemo(() => {
    const map = new Map<string, StateData>();
    Object.values(currentCountryData.states).forEach((state) => {
      if (state.geoId) map.set(normalizeStateName(state.geoId), state);
      if (state.name) map.set(normalizeStateName(state.name), state);
      if (state.id) map.set(normalizeStateName(state.id), state);
    });
    return map;
  }, [currentCountryData.states, normalizeStateName]);

  // Projection using fitExtent — always computed for idle state (no sidebar).
  // The wrapper CSS transform handles sidebar-open repositioning.
  const { pathGenerator } = useMemo(() => {
    if (!visibleGeoData) {
      const projection = geoMercator();
      return { projection, pathGenerator: geoPath().projection(projection) };
    }

    const top = SELECTOR_HEIGHT_PX + MAP_PADDING_PX;
    const left = MAP_PADDING_PX;
    const right = svgSize.width - MAP_PADDING_PX;
    const bottom = svgSize.height - MAP_PADDING_PX;

    let extentLeft = left;
    let extentTop = top;
    let extentRight = right;
    let extentBottom = bottom;

    // Thailand appears visually oversized on tall screens, so we shrink the portrait fit extent.
    if (layout === "portrait" && country.id === "TH") {
      const shrinkRatio = 0.1;
      const width = right - left;
      const height = bottom - top;
      const insetX = (width * shrinkRatio) / 2;
      const insetY = (height * shrinkRatio) / 2;
      extentLeft += insetX;
      extentRight -= insetX;
      extentTop += insetY;
      extentBottom -= insetY;
    }

    const projection = geoMercator().fitExtent(
      [[extentLeft, extentTop], [extentRight, extentBottom]],
      visibleGeoData
    );
    return { projection, pathGenerator: geoPath().projection(projection) };
  }, [svgSize, visibleGeoData, layout, country.id]);

  const featurePaths = useMemo(() => {
    if (!visibleGeoData) return [];
    return visibleGeoData.features.map((feature: Feature<Geometry>) => ({
      path: pathGenerator(feature) || "",
      stName: getFeatureName(feature),
    }));
  }, [visibleGeoData, pathGenerator, getFeatureName]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleStateClick = useCallback(
    (stateId: string) => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        setActiveState(stateId);
        setHoveredState(null);
      }, 0);
    },
    [setActiveState]
  );

  // GPU-composited transform — paths stay identical, only container moves
  const mapTransform = useMemo(() => {
    if (!activeState) return MAP_TRANSFORMS.none;
    if (layout === "portrait") {
      if (country.id === "TH") {
        return MAP_TRANSFORMS.portraitTall;
      }
      return MAP_TRANSFORMS.portrait;
    }
    if (svgSize.width < NARROW_LANDSCAPE_WIDTH) return MAP_TRANSFORMS.landscapeNarrow;
    return MAP_TRANSFORMS.landscapeWide;
  }, [layout, activeState, svgSize.width, country.id]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden select-none touch-manipulation"
      onMouseMove={handleMouseMove}
      onDoubleClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.detail > 1 && e.preventDefault()}
      suppressHydrationWarning
    >
      {/* Loading / Error states */}
      {(loadState === "loading" || (svgSize.width === 0 && svgSize.height === 0)) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {loadState === "missing" && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-md rounded-2xl border border-neutral-200 bg-white/90 p-6 text-center shadow-sm backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Map Coming Soon</p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">{country.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Travel data is loaded for {Object.keys(currentCountryData.states).length} visited regions, but the country boundary map has not been added yet.
            </p>
          </div>
        </div>
      )}
      {loadState === "error" && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm">
          Failed to load map. Please refresh.
        </div>
      )}

      {svgSize.width > 0 && svgSize.height > 0 && (
      <div
        className="w-full h-full"
        style={{
          position: "absolute",
          inset: 0,
          transform: mapTransform,
          transformOrigin: "center center",
          transition: "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        <svg
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          className="w-full h-full outline-none"
          role="img"
          aria-label={`Map of ${country.name}`}
          style={{ pointerEvents: "auto" }}
        >
          <title>Interactive map of {country.name}</title>
          {featurePaths.map(({ path, stName }, i) => {
            const stateEntry = statesByGeoId.get(normalizeStateName(stName));
            const isVisited = stateEntry?.visited;
            const isActive = stateEntry && activeState === stateEntry.id;
            const isHovered = stName === hoveredState;

            const fill = isActive
              ? MAP_COLORS.active
              : isHovered
              ? MAP_COLORS.hovered
              : isVisited
              ? MAP_COLORS.visited
              : MAP_COLORS.default;
            const stroke = isActive
              ? MAP_COLORS.strokeActive
              : isHovered
              ? MAP_COLORS.strokeHovered
              : MAP_COLORS.strokeDefault;
            const strokeWidth = isActive ? 1.5 : isHovered ? 1 : 0.5;

            return (
              <path
                key={stName || i}
                d={path}
                fill={fill}
                fillRule="evenodd"
                stroke={stroke}
                strokeWidth={strokeWidth}
                role="button"
                aria-label={stName}
                tabIndex={0}
                style={{
                  cursor: "pointer",
                  outline: "none",
                  transition:
                    "fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease",
                }}
                onMouseEnter={() => setHoveredState(stName)}
                onMouseLeave={() => setHoveredState(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!stateEntry) return;
                    handleStateClick(stateEntry.id);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!stateEntry) return;
                  handleStateClick(stateEntry.id);
                }}
              />
            );
          })}
        </svg>
      </div>
      )}

      {/* Tooltip — desktop only (pointer:fine) */}
      <AnimatePresence>
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, x: 24 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.5,
            }}
            style={{
              position: "fixed",
              left: mousePos.x,
              top: mousePos.y - 50,
              pointerEvents: "none",
              zIndex: 1000,
            }}
            role="tooltip"
            className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-neutral-100 flex-col gap-1 min-w-[160px] hidden pointer-fine:flex"
          >
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] leading-none mb-0.5">
              {statesByGeoId.get(normalizeStateName(hoveredState))?.visited ? "Visited" : "Not Visited"}
            </span>
            <span className="text-base font-extrabold text-neutral-900 leading-none whitespace-nowrap">
              {hoveredState}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
