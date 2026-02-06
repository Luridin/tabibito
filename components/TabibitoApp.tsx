"use client";

import { useEffect, useState } from "react";
import MapContainer from "@/components/Map/MapContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CountrySelector from "@/components/CountrySelector";
import ImageLightbox from "@/components/ImageLightbox";
import { COUNTRIES, TRAVEL_DATA } from "@/data/locations";
import { Country } from "@/types";

export default function Home() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [layout, setLayout] = useState<"portrait" | "landscape">("landscape");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<Array<{ id: string; url: string; caption: string }>>([]);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const updateLayout = () => setLayout(mq.matches ? "portrait" : "landscape");
    updateLayout();
    mq.addEventListener("change", updateLayout);
    return () => mq.removeEventListener("change", updateLayout);
  }, []);

  // Find the data for the active state to pass to sidebar
  const activeStateData = activeState && TRAVEL_DATA[selectedCountry.id]?.states[activeState]
    ? TRAVEL_DATA[selectedCountry.id].states[activeState]
    : null;

  return (
    <main className="tabibito-shell h-screen w-screen bg-white text-neutral-900 overflow-hidden relative selection:bg-amber-500/20">
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
      <div className="tabibito-map z-0">
        <MapContainer
          activeState={activeState}
          setActiveState={setActiveState}
          country={selectedCountry}
          travelData={TRAVEL_DATA}
          layout={layout}
        />
      </div>

      {/* Sidebar Overlay */}
      <Sidebar
        activeState={activeState}
        stateData={activeStateData}
        onClose={() => setActiveState(null)}
        layout={layout}
        onGalleryImages={setGalleryImages}
        onImageSelect={setSelectedImageIndex}
      />

      {/* Lightbox (rendered outside sidebar) */}
      <ImageLightbox
        selectedImageIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onPrevImage={() => {
          if (selectedImageIndex !== null && galleryImages.length > 0) {
            setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
          }
        }}
        onNextImage={() => {
          if (selectedImageIndex !== null && galleryImages.length > 0) {
            setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
          }
        }}
        galleryImages={galleryImages}
      />
    </main>
  );
}