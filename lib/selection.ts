import type { JournalPageData, JournalSelection } from "@/types";

export function resolveJournalSelection(
  data: JournalPageData,
  query: { country?: string; destination?: string; sort?: string }
): JournalSelection {
  const countryId = data.countries.find((country) => country.id === query.country)?.id
    ?? data.countries[0]?.id ?? "";
  const destinations = data.destinationsByCountry[countryId] ?? [];
  const destination = destinations.find((option) => option.destination.id === query.destination)
    ?? destinations[0];

  return {
    countryId,
    destinationKey: destination?.key ?? "",
    sort: query.sort === "alphabetical" ? "alphabetical" : "date",
  };
}
