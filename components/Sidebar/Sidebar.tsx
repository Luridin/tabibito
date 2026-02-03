"use client";

import { StateData } from "@/types";
import { X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    activeState: string | null;
    stateData: StateData | null;
    onClose: () => void;
};

export default function Sidebar({ activeState, stateData, onClose }: Props) {
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
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${stateData.visited ? "bg-amber-400 text-white shadow-sm" : "bg-neutral-100 text-neutral-500 border border-neutral-200"}`}>
                                {stateData.visited ? "Experience Shared" : "Future Chapter"}
                            </span>
                        </div>

                        <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-400 bg-clip-text text-transparent mb-6 leading-[1.1]">
                            {stateData.name}
                        </h2>

                        <p className="text-neutral-600 text-lg leading-relaxed mb-10 font-light">
                            {stateData.description}
                        </p>

                        {stateData.cities.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] border-b border-neutral-100 pb-2">
                                    Local Highlights
                                </h3>
                                <div className="space-y-4">
                                    {stateData.cities.map(city => (
                                        <div key={city.id} className="group relative bg-neutral-50 p-5 rounded-2xl border border-neutral-100 hover:border-amber-400/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md">
                                            <div className="absolute inset-0 bg-amber-400/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <h4 className="flex items-center gap-2.5 font-semibold text-neutral-900 mb-2 relative z-10">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                                {city.name}
                                            </h4>
                                            <p className="text-sm text-neutral-500 leading-normal relative z-10">
                                                {city.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}