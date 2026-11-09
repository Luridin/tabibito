import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readOdsRows, readCatalog, importTravelRows, serializeCatalog } from '../scripts/import-travel-ods.mjs';
const headers = ['Travel Order', 'Country', 'Destination'];

test('imports the bundled spreadsheet into the website schema and preserves metadata', () => {
  const existing = readCatalog();
  const rows = readOdsRows(fileURLToPath(new URL('../data/Travel List.ods', import.meta.url)));
  const result = importTravelRows(rows, existing);
  const count = Object.values(result.travelData).reduce((sum, c) => sum + Object.keys(c.destinations).length, 0);
  assert(count > 0);
  assert.equal(count, new Set(rows.slice(1).map(r => `${r[1]}:${r[2]}`)).size);
  for (const [countryId, country] of Object.entries(result.travelData)) {
    assert.equal(country.states, undefined);
    for (const destination of Object.values(country.destinations)) {
      const previous = existing.travelData[countryId]?.destinations[destination.id];
      if (previous) {
        assert.equal(destination.description, previous.description);
        assert.equal(destination.photoFolder, previous.photoFolder);
      }
    }
  }
  assert(serializeCatalog(result, true).includes('export const TRAVEL_DATA: TravelData ='));
});
test('new places get usable IDs and photo folders; duplicates keep the earliest order', () => {
  const { travelData } = importTravelRows([headers, ['9', 'UAE', 'New Place'], ['3', 'United Arab Emirates', 'New Place']]);
  assert.equal(travelData.AE.destinations['new-place'].travelOrder, 3);
  assert.equal(travelData.AE.destinations['new-place'].photoFolder, 'United Arab Emirates/New Place');
});
test('header aliases and optional travel order are supported', () => {
  assert.equal(importTravelRows([['Country', 'City'], ['Japan', 'Kyoto']]).travelData.JP.destinations.kyoto.travelOrder, 1);
});
test('malformed sheets fail clearly instead of silently dropping destinations', () => {
  for (const rows of [[], [['Country']], [headers], [headers, ['1', 'Unknown country', 'City']], [headers, ['1', 'India', '']], [headers, ['1st', 'India', 'City']]]) {
    assert.throws(() => importTravelRows(rows));
  }
});
