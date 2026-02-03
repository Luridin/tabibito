"use client";

import { Country, TravelData } from "@/types";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { useState, useMemo, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  activeState: string | null;
  setActiveState: (state: string | null) => void;
  country: Country;
  travelData: TravelData;
};

export default function MapContainer({
  activeState,
  setActiveState,
  country,
  travelData
}: Props) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Map container transform (camera-level only, safe) */}
      <div
        className="w-full h-full transition-all duration-700 ease-in-out"
        style={{
          transform: activeState
            ? "translateX(-15%) scale(0.95)"
            : "translateX(0) scale(1)",
          transformOrigin: "center left"
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 800,
            center: [82.0, 22.0]
          }}
          className="w-full h-full outline-none"
        >
          <ZoomableGroup center={[82.0, 22.0]} minZoom={1} maxZoom={8}>
            <Geographies geography={country.mapUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stName = geo.properties.ST_NM;

                  // O(1) lookup instead of O(n) search
                  const stateEntry = statesByGeoId.get(stName);

                  const isVisited = stateEntry?.visited;
                  const isActive =
                    stateEntry && activeState === stateEntry.id;
                  const isHovered = stName === hoveredState;
                  const isSelected = isActive || isHovered;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onPointerEnter={() => setHoveredState(stName)}
                      onPointerLeave={() => setHoveredState(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveState(stateEntry?.id ?? stName);
                        setHoveredState(null);
                      }}
                      stroke="transparent"
                      strokeWidth={10} // invisible hit-area
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
                          vectorEffect: "non-scaling-stroke",
                          cursor: "pointer",
                          opacity: 1
                        },
                        hover: {
                          fill: isActive ? "#fbbf24" : "#fde68a",
                          cursor: "pointer"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
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
