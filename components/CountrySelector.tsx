"use client";

import { Country } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    countries: Country[];
    selectedCountry: Country;
    onSelect: (country: Country) => void;
};

export default function CountrySelector({ countries, selectedCountry, onSelect }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute top-8 left-8 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-neutral-200 text-neutral-900 px-4 py-3 rounded-xl hover:border-neutral-300 transition-colors w-[200px] justify-between shadow-sm"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedCountry.flag}</span>
                        <span className="font-medium">{selectedCountry.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-full bg-white/90 backdrop-blur-md border border-neutral-200 rounded-xl overflow-hidden shadow-xl"
                        >
                            {countries.map((country) => (
                                <button
                                    key={country.id}
                                    onClick={() => {
                                        onSelect(country);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-neutral-50 flex items-center gap-2 text-neutral-700 transition-colors"
                                >
                                    <span>{country.flag}</span>
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
