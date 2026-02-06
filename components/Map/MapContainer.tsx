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
} from "@/lib/constants";

type Props = {
  activeState: string | null;
  setActiveState: (state: string | null) => void;
  country: Country;
  travelData: TravelData;
  layout: "portrait" | "landscape";
};

type MapLoadState = "loading" | "loaded" | "error";

export default function MapContainer({
  activeState,
  setActiveState,
  country,
  travelData,
  layout,
}: Props) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [loadState, setLoadState] = useState<MapLoadState>("loading");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch GeoJSON data with error handling
  useEffect(() => {
    const controller = new AbortController();
    setLoadState("loading");

    fetch(country.mapUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data: FeatureCollection) => {
        setGeoData(data);
        setLoadState("loaded");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load map data:", err);
          setLoadState("error");
        }
      });

    return () => controller.abort();
  }, [country.mapUrl]);

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

  // O(1) lookup map for state features
  const statesByGeoId = useMemo(() => {
    const map = new Map<string, StateData>();
    Object.values(currentCountryData.states).forEach((state) => {
      if (state.geoId) map.set(state.geoId, state);
      if (state.name) map.set(state.name, state);
    });
    return map;
  }, [currentCountryData.states]);

  // Projection using fitExtent — always computed for idle state (no sidebar).
  // The wrapper CSS transform handles sidebar-open repositioning.
  const { pathGenerator } = useMemo(() => {
    if (!geoData) {
      const projection = geoMercator();
      return { projection, pathGenerator: geoPath().projection(projection) };
    }

    const top = SELECTOR_HEIGHT_PX + MAP_PADDING_PX;
    const left = MAP_PADDING_PX;
    const right = svgSize.width - MAP_PADDING_PX;
    const bottom = svgSize.height - MAP_PADDING_PX;

    const projection = geoMercator().fitExtent(
      [[left, top], [right, bottom]],
      geoData
    );
    return { projection, pathGenerator: geoPath().projection(projection) };
  }, [svgSize, geoData]);

  const featurePaths = useMemo(() => {
    if (!geoData) return [];
    return geoData.features.map((feature: Feature<Geometry>) => ({
      feature,
      path: pathGenerator(feature) || "",
      stName: (feature.properties?.ST_NM as string) || "",
    }));
  }, [geoData, pathGenerator]);

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
    if (layout === "portrait") return MAP_TRANSFORMS.portrait;
    if (svgSize.width < NARROW_LANDSCAPE_WIDTH) return MAP_TRANSFORMS.landscapeNarrow;
    return MAP_TRANSFORMS.landscapeWide;
  }, [layout, activeState, svgSize.width]);

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
          {featurePaths.map(({ feature, path, stName }, i) => {
            const stateEntry = statesByGeoId.get(stName);
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
                    handleStateClick(stateEntry?.id ?? stName);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleStateClick(stateEntry?.id ?? stName);
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
              {statesByGeoId.get(hoveredState)?.visited ? "Visited" : "Not Visited"}
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
