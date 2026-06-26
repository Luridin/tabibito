import TabibitoApp from "@/components/TabibitoApp";
import { getJournalPageData } from "@/lib/journal";

export default function Home() {
  const journalData = getJournalPageData();

  return <TabibitoApp journalData={journalData} />;
}