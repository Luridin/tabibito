import { COUNTRIES, TRAVEL_DATA } from "@/data/locations";
import type { DestinationOption, JournalPageData } from "@/types";

export function getJournalPageData(): JournalPageData {
  const destinationCountsByCountry: Record<string, number> = {};

  for (const country of COUNTRIES) {
    const countryData = TRAVEL_DATA[country.id];
    if (!countryData) {
      destinationCountsByCountry[country.id] = 0;
      continue;
    }

    destinationCountsByCountry[country.id] = Object.values(countryData.destinations)
      .filter((destination) => destination.visited)
      .length;
  }

  const countries = COUNTRIES.filter(
    (country) => (destinationCountsByCountry[country.id] ?? 0) > 0
  );

  const destinationsByCountry: Record<string, DestinationOption[]> = {};

  for (const country of countries) {
    const countryData = TRAVEL_DATA[country.id];
    if (!countryData) {
      destinationsByCountry[country.id] = [];
      continue;
    }

    destinationsByCountry[country.id] = Object.values(countryData.destinations)
      .filter((destination) => destination.visited)
      .map((destination) => ({
        key: `${country.id}:${destination.id}`,
        countryId: country.id,
        countryName: country.name,
        destination,
      }))
      .sort((left, right) => {
        const leftOrder = left.destination.travelOrder ?? Number.MAX_SAFE_INTEGER;
        const rightOrder = right.destination.travelOrder ?? Number.MAX_SAFE_INTEGER;

        if (leftOrder !== rightOrder) {
          return leftOrder - rightOrder;
        }

        return left.destination.name.localeCompare(right.destination.name);
      });
  }

  return {
    countries,
    destinationsByCountry,
    totalCountries: countries.length,
    totalDestinations: Object.values(destinationCountsByCountry).reduce(
      (sum, count) => sum + count,
      0
    ),
  };
}