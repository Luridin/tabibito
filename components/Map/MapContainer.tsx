"use client";

import { Country, TravelData } from "@/types";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    activeState: string | null;
    setActiveState: (state: string | null) => void;
    country: Country;
    travelData: TravelData;
};

export default function MapContainer({ activeState, setActiveState, country, travelData }: Props) {
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Memoize the country data specifically
    const currentCountryData = useMemo(() => {
        return travelData[country.id] || { states: {} };
    }, [country.id, travelData]);

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Global listener to clear hover states if mouse is not over a geography
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            const target = e.target as Element | null;
            // If we are not hovering over a geography path (or any child of it), clear the hover state
            if (!target || !target.closest || !target.closest(".rsm-geography")) {
                setHoveredState(null);
            }
        };

        window.addEventListener("mousemove", handleGlobalMouseMove);
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    }, []);

    const isRightSide = typeof window !== "undefined" && mousePos.x > window.innerWidth / 2;

    return (
        <div className="absolute inset-0 overflow-hidden" onMouseMove={handleMouseMove}>
            {/* Non-transformed parent lets fixed tooltip use viewport coords, 
                while this inner div handles the map shift transform */}
            <div
                className="w-full h-full transition-all duration-700 ease-in-out"
                style={{
                    transform: activeState ? "translateX(-15%) scale(0.95)" : "translateX(0) scale(1)",
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
                            {({ geographies }) => {
                                // Sort geographies to ensure the hovered or active state is rendered last (on top)
                                const sortedGeographies = [...geographies].sort((a, b) => {
                                    const aName = a.properties.ST_NM;
                                    const bName = b.properties.ST_NM;
                                    const aState = Object.values(currentCountryData.states).find(s => s.geoId === aName || s.name === aName);
                                    const bState = Object.values(currentCountryData.states).find(s => s.geoId === bName || s.name === bName);

                                    const aActive = aState?.id === activeState;
                                    const bActive = bState?.id === activeState;
                                    const aHovered = aName === hoveredState;
                                    const bHovered = bName === hoveredState;

                                    if (aActive && !bActive) return 1;
                                    if (!aActive && bActive) return -1;
                                    if (aHovered && !bHovered) return 1;
                                    if (!aHovered && bHovered) return -1;
                                    return 0;
                                });

                                return sortedGeographies.map((geo) => {
                                    const stName = geo.properties.ST_NM;
                                    const stateEntry = Object.values(currentCountryData.states).find(s =>
                                        s.geoId === stName || s.name === stName
                                    );

                                    const isVisited = stateEntry?.visited;
                                    const isActive = stateEntry && activeState === stateEntry.id;
                                    // Use stName for hover comparison to ensure it works even for states without a travelData entry
                                    const isHovered = stName === hoveredState;
                                    const isSelectedOrHovered = isActive || isHovered;

                                    return (
                                            <motion.g
                                            key={geo.rsmKey}
                                            initial={false}
                                            animate={{
                                                scale: isSelectedOrHovered ? 1.4 : 1,
                                                y: isSelectedOrHovered ? -20 : 0, // Lift it off the map
                                                filter: isSelectedOrHovered
                                                    ? "drop-shadow(0px 25px 50px rgba(0,0,0,0.25))"
                                                    : "none"
                                            }}
                                            style={{
                                                transformBox: "fill-box",
                                                transformOrigin: "50% 50%",
                                                cursor: "pointer",
                                                zIndex: isSelectedOrHovered ? 100 : 1
                                            }}
                                        >
                                            <Geography
                                                geography={geo}
                                                onPointerEnter={() => setHoveredState(stName)}
                                                onPointerLeave={() => setHoveredState(null)}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (stateEntry) {
                                                        setActiveState(stateEntry.id);
                                                    } else {
                                                        // Even if no data, we can set it to the name to show the "empty" sidebar
                                                        setActiveState(stName);
                                                    }
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
                                                        stroke: isSelectedOrHovered ? "#ffffff" : "#e5e7eb",
                                                        strokeWidth: isSelectedOrHovered ? 2 : 0.5,
                                                        outline: "none",
                                                        transition: "fill 0.2s ease"
                                                    },
                                                    hover: {
                                                        fill: isActive ? "#fbbf24" : "#fde68a",
                                                        stroke: "#ffffff",
                                                        strokeWidth: 2,
                                                        outline: "none"
                                                    },
                                                    pressed: {
                                                        fill: "#f59e0b",
                                                        outline: "none"
                                                    }
                                                }}
                                            />
                                        </motion.g>
                                    );
                                });
                            }}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            {/* Tooltip with dynamic offsetting */}
            <AnimatePresence>
                {hoveredState && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: isRightSide ? -220 : 30 // Flip side based on mouse position
                        }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
                        style={{
                            position: "fixed",
                            left: mousePos.x,
                            top: mousePos.y - 50,
                            pointerEvents: "none",
                            zIndex: 1000
                        }}
                        className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-neutral-100 flex flex-col gap-1 min-w-[160px]"
                    >
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] leading-none mb-0.5">Experience</span>
                        <span className="text-base font-extrabold text-neutral-900 leading-none whitespace-nowrap">
                            {hoveredState}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}