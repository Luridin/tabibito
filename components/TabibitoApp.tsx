"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import MapContainer from "@/components/Map/MapContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CountrySelector from "@/components/CountrySelector";
import ImageLightbox from "@/components/ImageLightbox";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { COUNTRIES, TRAVEL_DATA } from "@/data/locations";
import { Country, GalleryImage } from "@/types";

export default function TabibitoApp() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [layout, setLayout] = useState<"portrait" | "landscape">("landscape");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  const destinationCountsByCountry = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const country of COUNTRIES) {
      const countryData = TRAVEL_DATA[country.id];
      if (!countryData) {
        counts[country.id] = 0;
        continue;
      }

      let count = 0;
      for (const state of Object.values(countryData.states)) {
        count += state.cities.filter((city) => city.visited).length;
      }

      counts[country.id] = count;
    }

    return counts;
  }, []);

  const totalDestinationsVisited = useMemo(
    () => Object.values(destinationCountsByCountry).reduce((sum, count) => sum + count, 0),
    [destinationCountsByCountry]
  );

  const countriesWithVisitedPlaces = useMemo(
    () => COUNTRIES.filter((country) => (destinationCountsByCountry[country.id] ?? 0) > 0),
    [destinationCountsByCountry]
  );

  const selectedCountryDestinationsVisited = selectedCountry
    ? (destinationCountsByCountry[selectedCountry.id] ?? 0)
    : 0;

  useEffect(() => {
    if (countriesWithVisitedPlaces.length === 0) {
      if (selectedCountry !== null) {
        setSelectedCountry(null);
      }
      setActiveState(null);
      setIsMapReady(false);
      return;
    }

    if (!selectedCountry) {
      setSelectedCountry(countriesWithVisitedPlaces[0]);
      return;
    }

    const selectedStillVisible = countriesWithVisitedPlaces.some(
      (country) => country.id === selectedCountry.id
    );

    if (!selectedStillVisible) {
      setSelectedCountry(countriesWithVisitedPlaces[0]);
      setActiveState(null);
      setIsMapReady(false);
    }
  }, [countriesWithVisitedPlaces, selectedCountry]);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const updateLayout = () => setLayout(mq.matches ? "portrait" : "landscape");
    updateLayout();
    mq.addEventListener("change", updateLayout);
    return () => mq.removeEventListener("change", updateLayout);
  }, []);

  const activeStateData = (() => {
    if (!activeState || !selectedCountry) return null;
    const countryData = TRAVEL_DATA[selectedCountry.id];
    if (!countryData) return null;

    const direct = countryData.states[activeState];
    if (direct) return direct;

    return (
      Object.values(countryData.states).find(
        (state) =>
          state.id === activeState ||
          state.name === activeState ||
          state.geoId === activeState
      ) || null
    );
  })();

  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setActiveState(null);
    setIsMapReady(false);
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
      {selectedCountry && countriesWithVisitedPlaces.length > 0 && (
        <CountrySelector
          countries={countriesWithVisitedPlaces}
          selectedCountry={selectedCountry}
          onSelect={handleCountrySelect}
        />
      )}

      <div className="absolute top-14 right-3 sm:top-20 sm:left-6 sm:right-auto md:top-24 md:left-8 z-40 pointer-events-none">
        <div className="bg-white/85 backdrop-blur-md border border-neutral-200 rounded-xl shadow-lg px-3 py-2 sm:px-5 sm:py-4 text-right">
          <p className="text-[11px] sm:text-sm font-semibold tracking-wide text-neutral-600 uppercase">
            Worldwide:
            <span className="ml-1 text-neutral-900 text-lg sm:text-2xl font-extrabold tabular-nums">
              {isMapReady ? <AnimatedCounter value={totalDestinationsVisited} /> : 0}
            </span>
          </p>
          {selectedCountry && (
            <p className="text-[11px] sm:text-sm font-semibold tracking-wide text-neutral-600 uppercase mt-1">
              {selectedCountry.name}:
              <span className="ml-1 text-neutral-900 text-lg sm:text-2xl font-extrabold tabular-nums">
                {isMapReady ? <AnimatedCounter value={selectedCountryDestinationsVisited} /> : 0}
              </span>
            </p>
          )}
        </div>
      </div>

      {selectedCountry && (
        <div className="tabibito-map z-0">
          <MapContainer
            activeState={activeState}
            setActiveState={setActiveState}
            country={selectedCountry}
            travelData={TRAVEL_DATA}
            layout={layout}
            onMapReadyChange={setIsMapReady}
          />
        </div>
      )}

      {selectedCountry && (
        <Sidebar
          countryId={selectedCountry.id}
          activeState={activeState}
          stateData={activeStateData}
          onClose={handleCloseState}
          layout={layout}
          onGalleryImages={setGalleryImages}
          onImageSelect={setSelectedImageIndex}
        />
      )}

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