"use client";

import { useEffect, useState, useCallback } from "react";
import MapContainer from "@/components/Map/MapContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CountrySelector from "@/components/CountrySelector";
import ImageLightbox from "@/components/ImageLightbox";
import { COUNTRIES, TRAVEL_DATA } from "@/data/locations";
import { Country, GalleryImage } from "@/types";

export default function TabibitoApp() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [layout, setLayout] = useState<"portrait" | "landscape">("landscape");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const updateLayout = () => setLayout(mq.matches ? "portrait" : "landscape");
    updateLayout();
    mq.addEventListener("change", updateLayout);
    return () => mq.removeEventListener("change", updateLayout);
  }, []);

  const activeStateData = activeState && TRAVEL_DATA[selectedCountry.id]?.states[activeState]
    ? TRAVEL_DATA[selectedCountry.id].states[activeState]
    : null;

  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setActiveState(null);
  }, []);

  const handleCloseState = useCallback(() => setActiveState(null), []);
  const handleCloseLightbox = useCallback(() => setSelectedImageIndex(null), []);

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null || galleryImages.length === 0) return prev;
      return (prev - 1 + galleryImages.length) % galleryImages.length;
    });
  }, [galleryImages.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null || galleryImages.length === 0) return prev;
      return (prev + 1) % galleryImages.length;
    });
  }, [galleryImages.length]);

  return (
    <main className="tabibito-shell h-screen h-dvh w-screen bg-white text-neutral-900 overflow-hidden relative selection:bg-amber-500/20">
      <CountrySelector
        countries={COUNTRIES}
        selectedCountry={selectedCountry}
        onSelect={handleCountrySelect}
      />

      <div className="tabibito-map z-0">
        <MapContainer
          activeState={activeState}
          setActiveState={setActiveState}
          country={selectedCountry}
          travelData={TRAVEL_DATA}
          layout={layout}
        />
      </div>

      <Sidebar
        activeState={activeState}
        stateData={activeStateData}
        onClose={handleCloseState}
        layout={layout}
        onGalleryImages={setGalleryImages}
        onImageSelect={setSelectedImageIndex}
      />

      <ImageLightbox
        selectedImageIndex={selectedImageIndex}
        onClose={handleCloseLightbox}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        galleryImages={galleryImages}
      />
    </main>
  );
}