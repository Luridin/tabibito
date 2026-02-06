"use client";

import { Country } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    countries: Country[];
    selectedCountry: Country;
    onSelect: (country: Country) => void;
};

export default function CountrySelector({ countries, selectedCountry, onSelect }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleSelect = useCallback(
        (country: Country) => {
            onSelect(country);
            setIsOpen(false);
        },
        [onSelect]
    );

    return (
        <div ref={containerRef} className="absolute top-3 right-3 sm:top-6 sm:left-6 sm:right-auto md:top-8 md:left-8 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-label={`Select country: ${selectedCountry.name}`}
                    className="flex items-center gap-1 sm:gap-3 bg-white/80 backdrop-blur-md border border-neutral-200 text-neutral-900 px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl hover:border-neutral-300 transition-colors w-auto sm:w-[200px] justify-between shadow-sm"
                >
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm sm:text-xl">{selectedCountry.flag}</span>
                        <span className="font-medium text-xs sm:text-base">{selectedCountry.name}</span>
                    </div>
                    <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="listbox"
                            aria-label="Country list"
                            className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 w-full min-w-[140px] bg-white/90 backdrop-blur-md border border-neutral-200 rounded-xl overflow-hidden shadow-xl"
                        >
                            {countries.map((country) => (
                                <button
                                    key={country.id}
                                    role="option"
                                    aria-selected={country.id === selectedCountry.id}
                                    onClick={() => handleSelect(country)}
                                    className="w-full text-left px-2 py-2 sm:px-4 sm:py-3 hover:bg-neutral-50 flex items-center gap-1 sm:gap-2 text-neutral-700 transition-colors text-xs sm:text-base"
                                >
                                    <span className="text-sm sm:text-xl">{country.flag}</span>
                                    <span>{country.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
