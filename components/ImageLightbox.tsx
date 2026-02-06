"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useCallback } from "react";

type Props = {
    selectedImageIndex: number | null;
    onClose: () => void;
    onPrevImage: () => void;
    onNextImage: () => void;
    galleryImages: Array<{ id: string; url: string; caption: string }>;
};

export default function ImageLightbox({ selectedImageIndex, onClose, onPrevImage, onNextImage, galleryImages }: Props) {
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                onPrevImage();
            } else if (e.key === "ArrowRight") {
                onNextImage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImageIndex, onClose, onPrevImage, onNextImage]);

    return (
        <AnimatePresence>
            {selectedImageIndex !== null && galleryImages.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onPrevImage();
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 rounded-full p-2 transition-all"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={24} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onNextImage();
                                        }}
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
                        <div className="p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                                {galleryImages[selectedImageIndex].caption}
                            </h3>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
