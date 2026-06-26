"use client";

import Image from "next/image";
import { GalleryImage } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(43,25,5,0.86)] p-3 sm:p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0, y: 10 }}
                        className="relative max-h-[90vh] max-h-[90dvh] w-full max-w-5xl overflow-y-auto border-4 border-[var(--journal-line)] bg-[var(--journal-paper)] shadow-[10px_10px_0_var(--journal-shadow)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-3 top-3 z-10 border-4 border-[var(--journal-line)] bg-[var(--journal-paper-strong)] p-2 text-[var(--journal-ink)] transition-transform hover:-translate-y-0.5"
                            aria-label="Close lightbox"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative w-full overflow-hidden border-b-4 border-[var(--journal-line)] bg-[var(--journal-paper-strong)]">
                            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                                <Image
                                    src={galleryImages[selectedImageIndex].url}
                                    alt={galleryImages[selectedImageIndex].caption}
                                    fill
                                    sizes="100vw"
                                    className="absolute inset-0 h-full w-full object-cover"
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
                                        className="absolute left-3 top-1/2 -translate-y-1/2 border-4 border-[var(--journal-line)] bg-[var(--journal-paper)] p-2 text-[var(--journal-ink)] transition-all sm:left-4"
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
                                        className="absolute right-3 top-1/2 -translate-y-1/2 border-4 border-[var(--journal-line)] bg-[var(--journal-paper)] p-2 text-[var(--journal-ink)] transition-all sm:right-4"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </motion.button>
                                </>
                            )}

                            <div className="absolute bottom-4 right-4 border-4 border-[var(--journal-line)] bg-[var(--journal-paper)] px-3 py-2">
                                <p className="pixel-label !text-[9px] text-[var(--journal-muted)]">
                                    Photo {selectedImageIndex + 1} / {galleryImages.length}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 p-4 sm:p-6">
                            <p className="pixel-label">Photo Description</p>
                            <h3 className="pixel-heading text-xs text-[var(--journal-ink)] sm:text-sm">
                                {galleryImages[selectedImageIndex].caption}
                            </h3>
                            <p className="text-sm leading-7 text-[var(--journal-muted)] sm:text-base">
                                This description is loaded from the destination caption manifest in your
                                R2 bucket.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
