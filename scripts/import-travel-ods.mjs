import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

const [, , odsPathArg, outputPathArg] = process.argv;

if (!odsPathArg) {
  console.error("Usage: node scripts/import-travel-ods.mjs <input.ods> [output.json]");
  process.exit(1);
}

const odsPath = path.resolve(odsPathArg);
const outputPath = outputPathArg ? path.resolve(outputPathArg) : null;

const countryCodes = {
  India: "IN",
  Thailand: "TH",
  UAE: "AE",
  "United Arab Emirates": "AE",
};

const stateFixes = {
  Pondicherry: "Puducherry",
  Orissa: "Odisha",
  Telengana: "Telangana",
  Harayana: "Haryana",
  Chattisgarh: "Chhattisgarh",
  Kashmir: "Jammu & Kashmir",
  "Andaman and Nicobar": "Andaman & Nicobar Island",
  "Andaman & Nicobar": "Andaman & Nicobar Island",
  Delhi: "Delhi",
  Dubai: "Dubai",
  "Abu Dhabi": "Abu Dhabi",
};

const cityFixes = {
  Mysuru: "Mysore",
  Madikeri: "Coorg",
  Chikamagalur: "Chikmagalur",
  Gokarnma: "Gokarna",
  Allepey: "Alleppey",
  Pondicherry: "Puducherry",
  Udagamandalam: "Ooty",
  Chikamagalur: "Chikmagalur",
  Kukke: "Kukke Subramanya",
  Lehh: "Leh",
  Benaulim: "Benaulim",
  Jaiselmer: "Jaisalmer",
  Cochin: "Kochi",
  Portblair: "Port Blair",
  Swarajdeep: "Swaraj Dweep",
  Shaheedweep: "Shaheed Dweep",
  Vishakapatnam: "Visakhapatnam",
  Srinanagar: "Srinagar",
  Manguluru: "Mangaluru",
  Conoor: "Coonoor",
  Thiruvunathapuram: "Thiruvananthapuram",
  Bhubaneshwar: "Bhubaneswar",
  "Hemkund sahib": "Hemkund Sahib",
};

const geoIdFixes = {
  Delhi: "NCT of Delhi",
};

const stateIds = {
  "Andaman & Nicobar Island": "AND",
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  Assam: "AS",
  Bihar: "BR",
  Chhattisgarh: "CG",
  Delhi: "DL",
  Goa: "GA",
  Gujarat: "GJ",
  Haryana: "HR",
  "Himachal Pradesh": "HP",
  Jharkhand: "JH",
  Karnataka: "KA",
  Kerala: "KL",
  "Jammu & Kashmir": "JK",
  Ladakh: "LA",
  "Madhya Pradesh": "MP",
  Maharashtra: "MH",
  Manipur: "MN",
  Meghalaya: "ML",
  Mizoram: "MZ",
  Nagaland: "NL",
  Odisha: "OR",
  Puducherry: "PY",
  Punjab: "PB",
  Rajasthan: "RJ",
  Sikkim: "SK",
  "Tamil Nadu": "TN",
  Telangana: "TG",
  Tripura: "TR",
  "Uttar Pradesh": "UP",
  Uttarakhand: "UT",
  "West Bengal": "WB",
  Bangkok: "BANGKOK",
  Pattaya: "PATTAYA",
  Phuket: "PHUKET",
  Dubai: "DUBAI",
  "Abu Dhabi": "ABU_DHABI",
};

const stateDescriptions = {
  Karnataka: "The land of sandalwood, coffee hills, coastlines, and layered heritage across the Deccan.",
  "Tamil Nadu": "A state of temple towns, hill stations, coastal cities, and a deep classical cultural tradition.",
  Kerala: "Backwaters, hill country, beaches, and lush green landscapes define this southern state.",
  Puducherry: "A compact coastal union territory shaped by French colonial history and seaside promenades.",
  Goa: "A small coastal state known for beaches, food, music, and Indo-Portuguese heritage.",
  Maharashtra: "A vast western state spanning megacities, forts, hills, coastlines, and pilgrimage routes.",
  Gujarat: "A western state of vibrant cities, sacred sites, white deserts, and long coastlines.",
  Delhi: "India's capital region, where monuments, dense neighborhoods, and political power meet.",
  "Himachal Pradesh": "A Himalayan state of mountain towns, valleys, monasteries, and road-trip landscapes.",
  Uttarakhand: "A northern Himalayan state of pilgrimage routes, forests, lakes, and mountain escapes.",
  Rajasthan: "A desert state of forts, palaces, old cities, and dramatic landscapes.",
  Telangana: "A Deccan state anchored by Hyderabad and shaped by forts, cuisine, and dry plateau landscapes.",
  Punjab: "A northwestern state of agriculture, Sikh heritage, and border history.",
  "Andhra Pradesh": "A southeastern state of temple towns, long coastlines, and major pilgrimage centers.",
  Ladakh: "A high-altitude cold desert region known for monasteries, mountain passes, and stark landscapes.",
  "Jammu & Kashmir": "A Himalayan region of valleys, lakes, mountains, and historic towns.",
  "Uttar Pradesh": "A populous northern state of historic cities, pilgrimage centers, and Mughal landmarks.",
  Odisha: "An eastern coastal state known for temples, beaches, tribal culture, and classical art traditions.",
  Meghalaya: "A northeastern hill state of clouds, waterfalls, caves, and living root bridges.",
  "Andaman & Nicobar Island": "An island territory in the Bay of Bengal known for beaches, forests, and remote archipelagos.",
  Sikkim: "A Himalayan state of mountain views, monasteries, and winding hill roads.",
  "West Bengal": "An eastern state that ranges from Kolkata and river plains to Himalayan foothills.",
  Assam: "A northeastern state of tea gardens, river islands, wildlife, and cultural festivals.",
  "Arunachal Pradesh": "India's northeastern frontier of mountains, monasteries, valleys, and remote roads.",
  Nagaland: "A hill state in northeast India known for tribal cultures, ridges, and village landscapes.",
  Tripura: "A small northeastern state with royal history, temples, and green landscapes.",
  Bihar: "A historic Gangetic plain state tied to ancient kingdoms, Buddhism, and river cities.",
  Jharkhand: "A mineral-rich eastern state of forests, plateaus, waterfalls, and industrial towns.",
  Manipur: "A northeastern state of valleys, lakes, and layered cultural traditions.",
  Mizoram: "A mountainous northeastern state of steep ridges, bamboo forests, and quiet towns.",
  Haryana: "A northern state surrounding Delhi, mixing farmland, highways, and satellite cities.",
  "Madhya Pradesh": "A central Indian state of heritage cities, forests, temples, and wildlife reserves.",
  Chhattisgarh: "A central-eastern state of forests, waterfalls, temples, and tribal regions.",
  Bangkok: "Thailand's capital region of canals, temples, markets, nightlife, and dense urban energy.",
  Pattaya: "A coastal resort region known for beaches, nightlife, and quick escapes from Bangkok.",
  Phuket: "Thailand's island province known for beaches, resorts, old town streets, and nearby islands.",
  Dubai: "An emirate of futuristic skylines, desert highways, luxury retail, and global tourism.",
  "Abu Dhabi": "The capital emirate of the UAE, combining museums, mosques, coastline, and modern urban planning.",
};

function decodeText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function readRows(sheetXml) {
  return [...sheetXml.matchAll(/<table:table-row[\s\S]*?<\/table:table-row>/g)].map((match) => match[0]);
}

function readCells(rowXml) {
  const cells = [];
  const matches = rowXml.match(/<table:table-cell(?:\s[^>]*)?[\s\S]*?(?:<\/table:table-cell>|\/>)/g) || [];

  for (const cell of matches) {
    const repeat = Number((cell.match(/table:number-columns-repeated="(\d+)"/) || [])[1] || 1);
    const paragraphs = [...cell.matchAll(/<text:p[^>]*>([\s\S]*?)<\/text:p>/g)].map((match) => decodeText(match[1]));
    const text = paragraphs.join(" ").trim();

    for (let index = 0; index < repeat; index += 1) {
      cells.push(text);
    }
  }

  return cells;
}

function toCityId(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function cityDescription(city, state, country) {
  return `Visited ${city} in ${state}, ${country}.`;
}

const xml = execFileSync("unzip", ["-p", odsPath, "content.xml"], {
  encoding: "utf8",
  maxBuffer: 20 * 1024 * 1024,
});

const sheetMatch = xml.match(/<table:table[^>]*table:name="Sheet1"[\s\S]*?<\/table:table>/);
if (!sheetMatch) {
  console.error("Could not find Sheet1 in ODS file.");
  process.exit(1);
}

const rows = readRows(sheetMatch[0]);
const travelData = {};

for (const row of rows.slice(1)) {
  const cells = readCells(row);

  const countryRaw = cells[1];
  const stateRaw = cells[2];
  const cityRaw = cells[3];
  if (!countryRaw || !stateRaw || !cityRaw) continue;

  const country = countryRaw.trim();
  const state = stateFixes[stateRaw.trim()] || stateRaw.trim();
  const city = cityFixes[cityRaw.trim()] || cityRaw.trim();
  const countryId = countryCodes[country];

  if (!countryId) continue;

  if (!travelData[countryId]) {
    travelData[countryId] = { states: {} };
  }

  const stateId = stateIds[state] || state.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  if (!travelData[countryId].states[stateId]) {
    travelData[countryId].states[stateId] = {
      id: stateId,
      geoId: geoIdFixes[state] || state,
      name: state,
      description: stateDescriptions[state] || `Visited places in ${state}, ${country}.`,
      visited: true,
      cities: [],
    };
  }

  if (!travelData[countryId].states[stateId].cities.some((existingCity) => existingCity.name === city)) {
    travelData[countryId].states[stateId].cities.push({
      id: toCityId(city),
      name: city,
      description: cityDescription(city, state, country),
      visited: true,
    });
  }
}

for (const country of Object.values(travelData)) {
  for (const state of Object.values(country.states)) {
    state.cities.sort((left, right) => left.name.localeCompare(right.name));
  }
}

for (const countryId of Object.keys(travelData).sort()) {
  const sortedStates = Object.values(travelData[countryId].states).sort((left, right) => left.name.localeCompare(right.name));
  travelData[countryId].states = Object.fromEntries(sortedStates.map((state) => [state.id, state]));
}

const serialized = JSON.stringify(travelData, null, 2);
if (outputPath) {
  writeFileSync(outputPath, serialized + "\n");
} else {
  process.stdout.write(serialized + "\n");
}
