"use client";

import { StateData } from "@/types";
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = {
    activeState: string | null;
    stateData: StateData | null;
    onClose: () => void;
};

export default function Sidebar({ activeState, stateData, onClose }: Props) {
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Auto-select first city alphabetically when state changes
    useEffect(() => {
        if (stateData && stateData.cities.length > 0) {
            const sortedCities = [...stateData.cities].sort((a, b) => a.name.localeCompare(b.name));
            setSelectedCityId(sortedCities[0].id);
        } else {
            setSelectedCityId(null);
        }
        setSelectedImageIndex(null); // Reset gallery on state change
    }, [activeState, stateData]);

    // Handle ESC key to close lightbox
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedImageIndex !== null) {
                setSelectedImageIndex(null);
            }
        };

        window.addEventListener("keydown", handleEscKey);
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [selectedImageIndex]);

    // Handle next/prev image navigation
    const handlePrevImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    const handleNextImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
        }
    };

    const sortedCities = stateData ? [...stateData.cities].sort((a, b) => a.name.localeCompare(b.name)) : [];
    const selectedCity = selectedCityId ? sortedCities.find(c => c.id === selectedCityId) : null;

    // Generate placeholder images for the gallery (3 images per city)
    const galleryImages = selectedCity ? [
        { id: "1", url: `https://picsum.photos/400/300?random=${selectedCity.id}-1`, caption: `${selectedCity.name} - View 1` },
        { id: "2", url: `https://picsum.photos/400/300?random=${selectedCity.id}-2`, caption: `${selectedCity.name} - View 2` },
        { id: "3", url: `https://picsum.photos/400/300?random=${selectedCity.id}-3`, caption: `${selectedCity.name} - View 3` },
    ] : [];
    return (
        <AnimatePresence>
            {activeState && stateData && (
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="fixed top-0 right-0 h-full w-[800px] bg-white/95 backdrop-blur-xl border-l border-neutral-100 p-8 shadow-[0_0_100px_rgba(0,0,0,0.1)] z-50 overflow-y-auto"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-50 transition-colors"
                    >
                        <X className="w-5 h-5 text-neutral-400" />
                    </button>

                    <div className="mt-12">
                        <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-400 bg-clip-text text-transparent mb-4 leading-[1.1]">
                            {stateData.name}
                        </h2>

                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${stateData.visited ? "bg-amber-400 text-white shadow-sm" : "bg-neutral-100 text-neutral-500 border border-neutral-200"}`}>
                                {stateData.visited ? "Experience Shared" : "Future Chapter"}
                            </span>
                        </div>

                        <p className="text-neutral-600 text-lg leading-relaxed mb-6 font-light">
                            {stateData.description}
                        </p>

                        {/* City Counter */}
                        {stateData.cities.length > 0 && (
                            <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                <p className="text-sm font-semibold text-amber-900">
                                    No of Cities Visited: <span className="text-2xl font-bold text-amber-600">{stateData.cities.filter(c => c.visited).length}</span>
                                </p>
                            </div>
                        )}

                        {stateData.cities.length > 0 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-3">
                                        Select City
                                    </label>
                                    <select
                                        value={selectedCityId || ""}
                                        onChange={(e) => setSelectedCityId(e.target.value)}
                                        disabled={sortedCities.length === 0}
                                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        className="space-y-6 pt-4"
                                    >
                                        <div>
                                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-3">
                                                About {selectedCity.name}
                                            </h3>
                                            <p className="text-neutral-600 text-base leading-relaxed font-light">
                                                {selectedCity.description}
                                            </p>
                                        </div>

                                        {/* Personal Experience Section - Ready for future API data */}
                                        {selectedCity.visited && (
                                            <div className="pt-4 border-t border-neutral-100">
                                                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-3">
                                                    Travel Experience
                                                </h4>
                                                <p className="text-neutral-600 text-sm leading-relaxed font-light italic text-neutral-500">
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
                                        className="pt-6 border-t border-neutral-100"
                                    >
                                        <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-4">
                                            Gallery
                                        </h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {galleryImages.map((image, index) => (
                                                <motion.button
                                                    key={image.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={() => setSelectedImageIndex(index)}
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

                    {/* Lightbox Modal */}
                    <AnimatePresence>
                        {selectedImageIndex !== null && galleryImages.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                                onClick={() => setSelectedImageIndex(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Close button */}
                                    <button
                                        onClick={() => setSelectedImageIndex(null)}
                                        className="absolute -top-10 right-0 text-white hover:text-amber-400 transition-colors"
                                        aria-label="Close lightbox"
                                    >
                                        <X size={32} />
                                    </button>

                                    {/* Image container */}
                                    <div className="relative w-full bg-neutral-100 rounded-t-lg overflow-hidden">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={galleryImages[selectedImageIndex].url}
                                                alt={galleryImages[selectedImageIndex].caption}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>

                                        {/* Navigation buttons */}
                                        {galleryImages.length > 1 && (
                                            <>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    onClick={handlePrevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 rounded-full p-2 transition-all"
                                                    aria-label="Previous image"
                                                >
                                                    <ChevronLeft size={24} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    onClick={handleNextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 rounded-full p-2 transition-all"
                                                    aria-label="Next image"
                                                >
                                                    <ChevronRight size={24} />
                                                </motion.button>
                                            </>
                                        )}

                                        {/* Image counter */}
                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium">
                                            {selectedImageIndex + 1} / {galleryImages.length}
                                        </div>
                                    </div>

                                    {/* Caption and info */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                            {galleryImages[selectedImageIndex].caption}
                                        </h3>
                                        <p className="text-sm text-neutral-600">
                                            {selectedCity?.name} • {selectedCity?.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}