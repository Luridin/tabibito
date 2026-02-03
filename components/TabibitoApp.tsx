"use client";

import { useState } from "react";
import MapContainer from "@/components/Map/MapContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CountrySelector from "@/components/CountrySelector";
import { COUNTRIES, TRAVEL_DATA } from "@/data/locations";
import { Country } from "@/types";

export default function Home() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

  // Find the data for the active state to pass to sidebar
  const activeStateData = activeState && TRAVEL_DATA[selectedCountry.id]?.states[activeState]
    ? TRAVEL_DATA[selectedCountry.id].states[activeState]
    : null;

  return (
    <main className="h-screen w-screen bg-white text-neutral-900 overflow-hidden relative selection:bg-amber-500/20">
      {/* Header / Nav Area */}
      <CountrySelector
        countries={COUNTRIES}
        selectedCountry={selectedCountry}
        onSelect={(country) => {
          setSelectedCountry(country);
          setActiveState(null); // Reset state when changing country
        }}
      />

      {/* Map Layer */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          activeState={activeState}
          setActiveState={setActiveState}
          country={selectedCountry}
          travelData={TRAVEL_DATA}
        />
      </div>

      {/* Sidebar Overlay */}
      <Sidebar
        activeState={activeState}
        stateData={activeStateData}
        onClose={() => setActiveState(null)}
      />
    </main>
  );
}