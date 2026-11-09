import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultCatalogPath = fileURLToPath(new URL("../data/locations.ts", import.meta.url));
const defaultCountries = [
  { id: "IN", name: "India", flag: "🇮🇳" },
  { id: "TH", name: "Thailand", flag: "🇹🇭" },
  { id: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { id: "JP", name: "Japan", flag: "🇯🇵" },
];

// Python's standard library handles zipped ODS XML, including repeated cells,
// without relying on regex XML parsing or adding a workbook dependency.
export function readOdsRows(odsPath) {
  const reader = `
import json, sys, zipfile, xml.etree.ElementTree as ET
ns = {'t': 'urn:oasis:names:tc:opendocument:xmlns:table:1.0', 'x': 'urn:oasis:names:tc:opendocument:xmlns:text:1.0'}
with zipfile.ZipFile(sys.argv[1]) as archive:
    root = ET.fromstring(archive.read('content.xml'))
sheets = root.findall('.//t:table', ns)
if not sheets:
    raise ValueError('The spreadsheet has no sheets.')
sheet = next((s for s in sheets if s.get('{'+ns['t']+'}name') == 'Sheet1'), sheets[0])
rows = []
for row in sheet.findall('t:table-row', ns):
    cells = []
    for cell in row:
        if cell.tag not in ('{'+ns['t']+'}table-cell', '{'+ns['t']+'}covered-table-cell'):
            continue
        def text(node):
            result = node.text or ''
            for child in node:
                if child.tag == '{'+ns['x']+'}s':
                    result += ' ' * int(child.get('{'+ns['x']+'}c', '1'))
                elif child.tag in ('{'+ns['x']+'}tab', '{'+ns['x']+'}line-break'):
                    result += ' '
                else:
                    result += text(child)
                result += child.tail or ''
            return result
        value = ' '.join(text(p) for p in cell.findall('x:p', ns)).strip()
        repeat = int(cell.get('{'+ns['t']+'}number-columns-repeated', '1'))
        cells.extend([value] * min(repeat, max(0, 256 - len(cells))))
    while cells and not cells[-1]:
        cells.pop()
    if any(cells):
        rows.append(cells)
print(json.dumps(rows, ensure_ascii=False))
`;
  return JSON.parse(execFileSync("python3", ["-c", reader, path.resolve(odsPath)], {
    encoding: "utf8", maxBuffer: 20 * 1024 * 1024,
  }));
}

export function readCatalog(catalogPath = defaultCatalogPath) {
  if (!existsSync(catalogPath)) return { countries: defaultCountries, travelData: {} };
  const source = readFileSync(catalogPath, "utf8");
  const countryMatch = source.match(/export const COUNTRIES(?:\s*:[^=]+)?\s*=\s*(\[[\s\S]*?\]);/);
  const dataMatch = source.match(/export const TRAVEL_DATA(?:\s*:[^=]+)?\s*=\s*(\{[\s\S]*\});?\s*$/);
  if (!countryMatch || !dataMatch) throw new Error("The existing catalog must contain JSON-compatible COUNTRIES and TRAVEL_DATA exports.");
  return { countries: JSON.parse(countryMatch[1]), travelData: JSON.parse(dataMatch[1]) };
}

function slug(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function importTravelRows(rows, existing = { countries: defaultCountries, travelData: {} }) {
  if (!rows.length) throw new Error("The spreadsheet is empty.");
  const headers = rows[0].map((value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim());
  const column = (aliases) => headers.findIndex((header) => aliases.includes(header));
  const countryColumn = column(["country"]);
  const destinationColumn = column(["destination", "city", "place"]);
  const orderColumn = column(["travel order", "travelorder", "order"]);
  if (countryColumn < 0 || destinationColumn < 0) throw new Error("Country and Destination columns are required.");

  const countries = existing.countries;
  const countryLookup = new Map(countries.flatMap((country) => [
    [country.id.toLowerCase(), country], [country.name.toLowerCase(), country],
  ]));
  const uae = countries.find((country) => country.id === "AE");
  if (uae) countryLookup.set("uae", uae);
  const travelData = {};

  for (const [index, cells] of rows.slice(1).entries()) {
    const countryName = String(cells[countryColumn] ?? "").trim();
    const name = String(cells[destinationColumn] ?? "").trim();
    if (!countryName && !name) continue;
    if (!countryName || !name) throw new Error(`Row ${index + 2}: Country and Destination must both be filled in.`);
    const country = countryLookup.get(countryName.toLowerCase());
    if (!country) throw new Error(`Row ${index + 2}: Unknown country "${countryName}". Add its name, ID, and flag to COUNTRIES first.`);

    const rawOrder = orderColumn < 0 ? "" : String(cells[orderColumn] ?? "").trim();
    const travelOrder = rawOrder ? Number(rawOrder) : index + 1;
    if (!Number.isSafeInteger(travelOrder) || travelOrder < 1) throw new Error(`Row ${index + 2}: Travel Order must be a positive whole number.`);
    const previous = Object.values(existing.travelData[country.id]?.destinations ?? {})
      .find((destination) => destination.name.toLowerCase() === name.toLowerCase());
    const id = previous?.id ?? slug(name);
    if (!id) throw new Error(`Row ${index + 2}: Cannot generate an ID for "${name}".`);
    travelData[country.id] ??= { destinations: Object.create(null) };
    const destinations = travelData[country.id].destinations;
    const duplicate = destinations[id];
    if (duplicate) {
      if (duplicate.name.toLowerCase() !== name.toLowerCase()) throw new Error(`Row ${index + 2}: Destination ID collision for "${name}".`);
      duplicate.travelOrder = Math.min(duplicate.travelOrder, travelOrder);
      continue;
    }
    destinations[id] = {
      ...previous,
      id, name,
      description: previous?.description ?? `Visited ${name} in ${country.name}.`,
      visited: true,
      travelOrder,
      photoFolder: previous?.photoFolder ?? `${country.name}/${name}`,
    };
  }

  if (!Object.keys(travelData).length) throw new Error("No destinations were found; refusing to generate an empty catalog.");
  for (const country of Object.values(travelData)) {
    country.destinations = Object.fromEntries(Object.values(country.destinations)
      .sort((left, right) => left.travelOrder - right.travelOrder || left.name.localeCompare(right.name))
      .map((destination) => [destination.id, destination]));
  }
  return { countries, travelData };
}

export function serializeCatalog(catalog, typescript = false) {
  const data = JSON.stringify(catalog.travelData, null, 4);
  if (!typescript) return `${data}\n`;
  return `import type { Country, TravelData } from "@/types";\n\nexport const COUNTRIES: Country[] = ${JSON.stringify(catalog.countries, null, 4)};\n\nexport const TRAVEL_DATA: TravelData = ${data};\n`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [, , inputPath, outputPath] = process.argv;
    if (!inputPath) throw new Error("Usage: node scripts/import-travel-ods.mjs <input.ods> [output.json|output.ts]");
    const catalog = importTravelRows(readOdsRows(inputPath), readCatalog());
    const serialized = serializeCatalog(catalog, outputPath?.endsWith(".ts"));
    if (outputPath) {
      const target = path.resolve(outputPath);
      mkdirSync(path.dirname(target), { recursive: true });
      const temporary = `${target}.tmp-${process.pid}`;
      try { writeFileSync(temporary, serialized); renameSync(temporary, target); }
      finally { rmSync(temporary, { force: true }); }
    } else {
      process.stdout.write(serialized);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
