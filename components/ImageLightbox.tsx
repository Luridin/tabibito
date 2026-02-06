"use client";

import { GalleryImage } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
    selectedImageIndex: number | null;
    onClose: () => void;
    onPrevImage: () => void;
    onNextImage: () => void;
    galleryImages: GalleryImage[];
};

export default function ImageLightbox({ selectedImageIndex, onClose, onPrevImage, onNextImage, galleryImages }: Props) {
    // Keyboard navigation — only attach listener when lightbox is open
    useEffect(() => {
        if (selectedImageIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
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
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-3 sm:p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] max-h-[90dvh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white hover:text-amber-400 transition-colors rounded-full p-1.5"
                            aria-label="Close lightbox"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative w-full bg-neutral-100 rounded-t-lg overflow-hidden">
                            <div className="relative aspect-[4/3] sm:aspect-square">
                                <Image
                                    src={galleryImages[selectedImageIndex].url}
                                    alt={galleryImages[selectedImageIndex].caption}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {galleryImages.length > 1 && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onPrevImage();
                                        }}
                                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 rounded-full p-1.5 sm:p-2 transition-all"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onNextImage();
                                        }}
                                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 rounded-full p-1.5 sm:p-2 transition-all"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </motion.button>
                                </>
                            )}

                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium">
                                {selectedImageIndex + 1} / {galleryImages.length}
                            </div>
                        </div>

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
