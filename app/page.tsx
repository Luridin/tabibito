import TabibitoApp from "@/components/TabibitoApp";
import { getJournalPageData } from "@/lib/journal";
import { resolveJournalSelection } from "@/lib/selection";

export default async function Home({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const journalData = getJournalPageData();
  const params = await searchParams;
  const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
  const initialSelection = resolveJournalSelection(journalData, {
    country: first(params.country),
    destination: first(params.destination),
    sort: first(params.sort),
  });

  return <TabibitoApp journalData={journalData} initialSelection={initialSelection} />;
}
