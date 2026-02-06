"use client";

import { Country, TravelData } from "@/types";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { useState, useMemo, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  activeState: string | null;
  setActiveState: (state: string | null) => void;
  country: Country;
  travelData: TravelData;
  layout: "portrait" | "landscape";
};

export default function MapContainer({
  activeState,
  setActiveState,
  country,
  travelData,
  layout
}: Props) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize country data
  const currentCountryData = useMemo(() => {
    return travelData[country.id] || { states: {} };
  }, [country.id, travelData]);

  // Create a lookup map for O(1) state lookups instead of O(n) searches
  const statesByGeoId = useMemo(() => {
    const map = new Map();
    Object.values(currentCountryData.states).forEach((state) => {
      if (state.geoId) map.set(state.geoId, state);
      if (state.name) map.set(state.name, state);
    });
    return map;
  }, [currentCountryData.states]);

  // Use useCallback to avoid recreating function on each render
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Debounced state click handler to prevent rapid changes
  const handleStateClick = useCallback((stateId: string) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setActiveState(stateId);
      setHoveredState(null);
    }, 0);
  }, [setActiveState]);

  // Memoize transform to avoid recalculation
  const mapTransform = useMemo(() => {
    if (layout === "portrait") {
      return activeState ? "translateY(8%) scale(0.95)" : "translateY(12%) scale(1)";
    }
    return activeState ? "translateX(-10%) scale(0.92)" : "none";
  }, [layout, activeState]);

  // Memoize projection config
  const projectionConfig = useMemo(() => ({
    scale: layout === "portrait" ? 1100 : 850,
    center: [82.0, 22.0] as [number, number]
  }), [layout]);

  return (
    <div
      className="absolute inset-0 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onDoubleClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.detail > 1 && e.preventDefault()}
    >
      {/* Map container transform (camera-level only, safe) */}
      <div
        className="w-full h-full"
        style={{
          position: 'absolute',
          inset: 0,
          transform: mapTransform,
          transformOrigin: "center center",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
          className="w-full h-full outline-none"
          style={{ pointerEvents: 'auto' }}
        >
            <Geographies geography={country.mapUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stName = geo.properties.ST_NM;

                  // O(1) lookup instead of O(n) search
                  const stateEntry = statesByGeoId.get(stName);

                  const isVisited = stateEntry?.visited;
                  const isActive = stateEntry && activeState === stateEntry.id;
                  const isHovered = stName === hoveredState;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredState(stName)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleStateClick(stateEntry?.id ?? stName);
                      }}
                      style={{
                        default: {
                          fill: isActive
                            ? "#fbbf24"
                            : isHovered
                            ? "#fde68a"
                            : isVisited
                            ? "#f3f4f6"
                            : "#fafafa",
                          stroke: isActive ? "#ffffff" : isHovered ? "#ffffff" : "#e5e7eb",
                          strokeWidth: isActive ? 1.5 : isHovered ? 1 : 0.5,
                          outline: "none",
                          cursor: "pointer",
                          transition: "all 150ms ease-in-out"
                        },
                        hover: {
                          fill: isActive ? "#fbbf24" : "#fde68a",
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: "#fbbf24"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
        </ComposableMap>
      </div>

      {/* Tooltip */}
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
              mass: 0.5
            }}
            style={{
              position: "fixed",
              left: mousePos.x,
              top: mousePos.y - 50,
              pointerEvents: "none",
              zIndex: 1000
            }}
            className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-neutral-100 flex flex-col gap-1 min-w-[160px]"
          >
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] leading-none mb-0.5">
              Experience
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
