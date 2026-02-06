"use client";

import { StateData, GalleryImage } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = {
    activeState: string | null;
    stateData: StateData | null;
    onClose: () => void;
    layout: "portrait" | "landscape";
    onGalleryImages: (images: GalleryImage[]) => void;
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
        onImageSelect(null);
    }, [activeState, stateData, onImageSelect]);

    const sortedCities = useMemo(() => {
        return stateData ? [...stateData.cities].sort((a, b) => a.name.localeCompare(b.name)) : [];
    }, [stateData]);

    const selectedCity = useMemo(() => {
        return selectedCityId ? sortedCities.find(c => c.id === selectedCityId) : null;
    }, [selectedCityId, sortedCities]);

    const galleryImages: GalleryImage[] = useMemo(() => {
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

    const visitedCitiesCount = useMemo(() => {
        return stateData?.cities.filter(c => c.visited).length ?? 0;
    }, [stateData]);

    return (
        <AnimatePresence>
            {activeState && stateData && (
                <motion.aside
                    initial={layout === "portrait" ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                    animate={layout === "portrait" ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                    exit={layout === "portrait" ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 36, stiffness: 260, mass: 0.9 }}
                    role="complementary"
                    aria-label={`Details for ${stateData.name}`}
                    className="tabibito-sidebar bg-white/95 backdrop-blur-xl border-neutral-100 p-2.5 sm:p-3 md:p-5 shadow-[0_0_80px_rgba(0,0,0,0.08)] z-50 overflow-y-auto overscroll-contain"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <div className="mx-auto mb-1.5 h-1 w-10 rounded-full bg-neutral-200 tabibito-handle" />
                    <button
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-5 md:right-5 p-1 sm:p-1.5 rounded-full hover:bg-neutral-50 transition-colors"
                    >
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                    </button>

                    <div className="mt-6 sm:mt-8">
                        {/* State Header */}
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-400 bg-clip-text text-transparent mb-1.5 sm:mb-2 leading-[1.1]">
                            {stateData.name}
                        </h2>

                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-widest ${stateData.visited ? "bg-amber-400 text-white shadow-sm" : "bg-neutral-100 text-neutral-500 border border-neutral-200"}`}>
                                {stateData.visited ? "Experience Shared" : "Future Chapter"}
                            </span>
                        </div>

                        <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed mb-2.5 sm:mb-4 font-light">
                            {stateData.description}
                        </p>

                        {/* City Counter */}
                        {stateData.cities.length > 0 && (
                            <div className="mb-2.5 sm:mb-4 p-2 sm:p-2.5 md:p-3 bg-amber-50 border border-amber-100 rounded-lg">
                                <p className="text-[9px] sm:text-[11px] md:text-xs font-semibold text-amber-900">
                                    Cities Visited: <span className="text-base sm:text-lg md:text-xl font-bold text-amber-600">{visitedCitiesCount}</span>
                                </p>
                            </div>
                        )}

                        {stateData.cities.length > 0 && (
                            <div className="space-y-2.5 sm:space-y-4">
                                {/* City Selector */}
                                <div>
                                    <label htmlFor="city-select" className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-1 sm:mb-2">
                                        Select City
                                    </label>
                                    <select
                                        id="city-select"
                                        value={selectedCityId || ""}
                                        onChange={(e) => setSelectedCityId(e.target.value)}
                                        disabled={sortedCities.length === 0}
                                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {sortedCities.map(city => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* City Detail */}
                                {selectedCity && (
                                    <motion.div
                                        key={selectedCityId}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-2.5 sm:space-y-4 pt-2 sm:pt-3"
                                    >
                                        <div>
                                            <h3 className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-1 sm:mb-2">
                                                About {selectedCity.name}
                                            </h3>
                                            <p className="text-neutral-600 text-[11px] sm:text-xs md:text-sm leading-relaxed font-light">
                                                {selectedCity.description}
                                            </p>
                                        </div>

                                        {selectedCity.visited && (
                                            <div className="pt-2 sm:pt-3 border-t border-neutral-100">
                                                <h4 className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-1 sm:mb-2">
                                                    Travel Experience
                                                </h4>
                                                <p className="text-[11px] sm:text-xs leading-relaxed font-light italic text-neutral-500">
                                                    Personal travel notes and memories coming soon...
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* City Gallery */}
                                {selectedCity && galleryImages.length > 0 && (
                                    <motion.div
                                        key={`gallery-${selectedCityId}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                        className="pt-2.5 sm:pt-4 border-t border-neutral-100"
                                    >
                                        <h3 className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-2 sm:mb-3">
                                            Gallery
                                        </h3>
                                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                            {galleryImages.map((image, index) => (
                                                <motion.button
                                                    key={image.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={() => onImageSelect(index)}
                                                    aria-label={`View ${image.caption}`}
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

                </motion.aside>
            )}
        </AnimatePresence>
    );
}