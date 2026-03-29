"use client";

import { StateData, GalleryImage } from "@/types";
import { APP_BASE_PATH } from "@/lib/constants";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const getTemporaryGalleryImage = (cityName: string, viewNumber: number) => {
    const label = `${cityName} - View ${viewNumber}`;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><defs><linearGradient id='sky' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#f8fafc'/><stop offset='1' stop-color='#fde68a'/></linearGradient></defs><rect width='400' height='300' fill='url(#sky)'/><circle cx='315' cy='74' r='28' fill='#f59e0b' opacity='0.85'/><path d='M0 230 C55 205 95 198 150 214 C205 230 250 248 320 214 C350 200 374 198 400 205 L400 300 L0 300 Z' fill='#d6d3d1'/><path d='M0 250 C48 228 104 226 156 242 C212 259 278 268 336 238 C360 225 380 220 400 224 L400 300 L0 300 Z' fill='#a8a29e'/><text x='28' y='44' font-family='Arial, sans-serif' font-size='15' fill='#57534e'>Temporary gallery image</text><text x='28' y='268' font-family='Arial, sans-serif' font-size='20' font-weight='700' fill='#1c1917'>${label}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

type Props = {
    countryId: string;
    activeState: string | null;
    stateData: StateData | null;
    onClose: () => void;
    layout: "portrait" | "landscape";
    onGalleryImages: (images: GalleryImage[]) => void;
    onImageSelect: (index: number | null) => void;
};

export default function Sidebar({ countryId, activeState, stateData, onClose, layout, onGalleryImages, onImageSelect }: Props) {
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
    const [galleryCache, setGalleryCache] = useState<Record<string, GalleryImage[]>>({});
    const [pendingGalleryKeys, setPendingGalleryKeys] = useState<Record<string, boolean>>({});

    const sortedCities = useMemo(() => {
        return stateData ? [...stateData.cities].sort((a, b) => a.name.localeCompare(b.name)) : [];
    }, [stateData]);

    const resolvedSelectedCityId = useMemo(() => {
        if (sortedCities.length === 0) return null;
        const hasSelected = selectedCityId && sortedCities.some((city) => city.id === selectedCityId);
        return hasSelected ? selectedCityId : sortedCities[0].id;
    }, [sortedCities, selectedCityId]);

    // Close any open image when switching states
    useEffect(() => {
        onImageSelect(null);
    }, [activeState, onImageSelect]);

    const selectedCity = useMemo(() => {
        if (!resolvedSelectedCityId) return null;
        return sortedCities.find(c => c.id === resolvedSelectedCityId) || null;
    }, [resolvedSelectedCityId, sortedCities]);

    const fallbackGalleryImages: GalleryImage[] = useMemo(() => {
        if (!selectedCity) return [];
        if (selectedCity.galleryImages && selectedCity.galleryImages.length > 0) {
            return selectedCity.galleryImages;
        }
        return [
            { id: `${selectedCity.id}-1`, url: getTemporaryGalleryImage(selectedCity.name, 1), caption: `${selectedCity.name} - View 1` },
            { id: `${selectedCity.id}-2`, url: getTemporaryGalleryImage(selectedCity.name, 2), caption: `${selectedCity.name} - View 2` },
            { id: `${selectedCity.id}-3`, url: getTemporaryGalleryImage(selectedCity.name, 3), caption: `${selectedCity.name} - View 3` },
        ];
    }, [selectedCity]);

    const galleryCacheKey = selectedCity && stateData
        ? `${countryId}:${stateData.id}:${selectedCity.id}`
        : null;

    useEffect(() => {
        if (!selectedCity || !stateData || !galleryCacheKey) {
            return;
        }

        let cancelled = false;
        const params = new URLSearchParams({
            countryId,
            stateId: stateData.id,
            cityId: selectedCity.id,
        });

        const fetchGallery = () => {
            setPendingGalleryKeys((current) => ({
                ...current,
                [galleryCacheKey]: true,
            }));

            fetch(`${APP_BASE_PATH}/api/gallery?${params.toString()}`, { cache: "no-store" })
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error(`Gallery request failed with status ${response.status}`);
                    }
                    return response.json() as Promise<{ images?: GalleryImage[] }>;
                })
                .then((payload) => {
                    if (cancelled) return;
                    const images = Array.isArray(payload.images) ? payload.images : [];
                    setGalleryCache((current) => ({
                        ...current,
                        [galleryCacheKey]: images,
                    }));
                })
                .catch(() => {
                    if (cancelled) return;
                    setGalleryCache((current) => ({
                        ...current,
                        [galleryCacheKey]: current[galleryCacheKey] ?? [],
                    }));
                })
                .finally(() => {
                    if (cancelled) return;
                    setPendingGalleryKeys((current) => {
                        if (!current[galleryCacheKey]) {
                            return current;
                        }

                        const next = { ...current };
                        delete next[galleryCacheKey];
                        return next;
                    });
                });
        };

        fetchGallery();
        const intervalId = window.setInterval(fetchGallery, 60000);

        return () => {
            cancelled = true;
            window.clearInterval(intervalId);
        };
    }, [countryId, galleryCacheKey, selectedCity, stateData]);

    const remoteGalleryImages = galleryCacheKey ? (galleryCache[galleryCacheKey] ?? null) : null;
    const isGalleryLoading = Boolean(
        galleryCacheKey &&
        pendingGalleryKeys[galleryCacheKey] &&
        !galleryCache[galleryCacheKey]
    );

    const galleryImages = remoteGalleryImages && remoteGalleryImages.length > 0
        ? remoteGalleryImages
        : fallbackGalleryImages;

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
                                    Destinations Visited: <span className="text-base sm:text-lg md:text-xl font-bold text-amber-600">{visitedCitiesCount}</span>
                                </p>
                            </div>
                        )}

                        {stateData.cities.length > 0 && (
                            <div className="space-y-2.5 sm:space-y-4">
                                {/* City Selector */}
                                <div>
                                    <label htmlFor="city-select" className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-1 sm:mb-2">
                                        Select Destination
                                    </label>
                                    <select
                                        id="city-select"
                                        value={resolvedSelectedCityId || ""}
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
                                    <div className="space-y-2.5 sm:space-y-4 pt-2 sm:pt-3">
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
                                    </div>
                                )}

                                {/* City Gallery */}
                                {selectedCity && galleryImages.length > 0 && (
                                    <div className="pt-2.5 sm:pt-4 border-t border-neutral-100">
                                        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
                                            <h3 className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] block">
                                                Gallery
                                            </h3>
                                            {isGalleryLoading && (
                                                <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.18em]">
                                                    Syncing Photos
                                                </span>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                            {galleryImages.map((image, index) => (
                                                <motion.button
                                                    key={image.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={() => onImageSelect(index)}
                                                    aria-label={`View ${image.caption}`}
                                                    className="group relative aspect-square rounded-lg overflow-hidden border border-neutral-200 hover:border-amber-400 transition-all duration-200 bg-neutral-100"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={image.caption}
                                                        className="absolute inset-0 h-full w-full object-cover group-hover:brightness-110 transition-all duration-200"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </motion.aside>
            )}
        </AnimatePresence>
    );
}