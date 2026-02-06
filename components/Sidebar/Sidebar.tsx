"use client";

import { StateData } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = {
    activeState: string | null;
    stateData: StateData | null;
    onClose: () => void;
    layout: "portrait" | "landscape";
    onGalleryImages: (images: Array<{ id: string; url: string; caption: string }>) => void;
    onImageSelect: (index: number | null) => void;
};

export default function Sidebar({ activeState, stateData, onClose, layout, onGalleryImages, onImageSelect }: Props) {
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

    // Auto-select first city alphabetically when state changes
    useEffect(() => {
        if (stateData && stateData.cities.length > 0) {
            const sortedCities = [...stateData.cities].sort((a, b) => a.name.localeCompare(b.name));
            setSelectedCityId(sortedCities[0].id);
        } else {
            setSelectedCityId(null);
        }
        onImageSelect(null); // Reset lightbox on state change
    }, [activeState, stateData, onImageSelect]);

    // Handle ESC key to close lightbox - now handled in parent
    // (lightbox is rendered at page level)

    // Memoize sorted cities to avoid re-sorting on every render
    const sortedCities = useMemo(() => {
        return stateData ? [...stateData.cities].sort((a, b) => a.name.localeCompare(b.name)) : [];
    }, [stateData]);

    const selectedCity = useMemo(() => {
        return selectedCityId ? sortedCities.find(c => c.id === selectedCityId) : null;
    }, [selectedCityId, sortedCities]);

    // Memoize gallery images
    const galleryImages = useMemo(() => {
        if (!selectedCity) return [];
        return [
            { id: "1", url: `https://picsum.photos/400/300?random=${selectedCity.id}-1`, caption: `${selectedCity.name} - View 1` },
            { id: "2", url: `https://picsum.photos/400/300?random=${selectedCity.id}-2`, caption: `${selectedCity.name} - View 2` },
            { id: "3", url: `https://picsum.photos/400/300?random=${selectedCity.id}-3`, caption: `${selectedCity.name} - View 3` },
        ];
    }, [selectedCity]);

    // Notify parent of gallery images changes
    useEffect(() => {
        onGalleryImages(galleryImages);
    }, [galleryImages, onGalleryImages]);

    // Memoize visited cities count
    const visitedCitiesCount = useMemo(() => {
        return stateData?.cities.filter(c => c.visited).length ?? 0;
    }, [stateData]);

    return (
        <AnimatePresence>
            {activeState && stateData && (
                <>
                    {/* Backdrop for small screens */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="tabibito-backdrop"
                        onClick={onClose}
                        style={{ pointerEvents: "none", display: "none" }}
                    />

                    <motion.div
                        initial={layout === "portrait" ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                        animate={layout === "portrait" ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                        exit={layout === "portrait" ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 22 }}
                        className="tabibito-sidebar bg-white/95 backdrop-blur-xl border-neutral-100 p-3 sm:p-4 md:p-6 shadow-[0_0_80px_rgba(0,0,0,0.08)] z-50 overflow-y-auto"
                    >
                        <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-neutral-200 tabibito-handle" />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-1.5 sm:p-2 rounded-full hover:bg-neutral-50 transition-colors"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                    </button>

                    <div className="mt-10 sm:mt-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-400 bg-clip-text text-transparent mb-3 sm:mb-4 leading-[1.1]">
                            {stateData.name}
                        </h2>

                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${stateData.visited ? "bg-amber-400 text-white shadow-sm" : "bg-neutral-100 text-neutral-500 border border-neutral-200"}`}>
                                {stateData.visited ? "Experience Shared" : "Future Chapter"}
                            </span>
                        </div>

                        <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 font-light">
                            {stateData.description}
                        </p>

                        {/* City Counter */}
                        {stateData.cities.length > 0 && (
                            <div className="mb-4 sm:mb-6 p-2.5 sm:p-3 md:p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-amber-900">
                                    No of Cities Visited: <span className="text-lg sm:text-xl md:text-2xl font-bold text-amber-600">{visitedCitiesCount}</span>
                                </p>
                            </div>
                        )}

                        {stateData.cities.length > 0 && (
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-2 sm:mb-3">
                                        Select City
                                    </label>
                                    <select
                                        value={selectedCityId || ""}
                                        onChange={(e) => setSelectedCityId(e.target.value)}
                                        disabled={sortedCities.length === 0}
                                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm sm:text-base text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {sortedCities.map(city => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Selected City Description */}
                                {selectedCity && (
                                    <motion.div
                                        key={selectedCityId}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4 sm:space-y-6 pt-3 sm:pt-4"
                                    >
                                        <div>
                                            <h3 className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-2 sm:mb-3">
                                                About {selectedCity.name}
                                            </h3>
                                            <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                                                {selectedCity.description}
                                            </p>
                                        </div>

                                        {/* Personal Experience Section - Ready for future API data */}
                                        {selectedCity.visited && (
                                            <div className="pt-3 sm:pt-4 border-t border-neutral-100">
                                                <h4 className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-2 sm:mb-3">
                                                    Travel Experience
                                                </h4>
                                                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light italic text-neutral-500">
                                                    Personal travel notes and memories coming soon...
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Gallery Section */}
                                {selectedCity && galleryImages.length > 0 && (
                                    <motion.div
                                        key={`gallery-${selectedCityId}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                        className="pt-4 sm:pt-6 border-t border-neutral-100"
                                    >
                                        <h3 className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-3 sm:mb-4">
                                            Gallery
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                            {galleryImages.map((image, index) => (
                                                <motion.button
                                                    key={image.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={() => onImageSelect(index)}
                                                    className="group relative aspect-square rounded-lg overflow-hidden border border-neutral-200 hover:border-amber-400 transition-all duration-200 bg-neutral-100"
                                                >
                                                    <Image
                                                        src={image.url}
                                                        alt={image.caption}
                                                        fill
                                                        className="object-cover group-hover:brightness-110 transition-all duration-200"
                                                        sizes="(max-width: 768px) 100px, 120px"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}