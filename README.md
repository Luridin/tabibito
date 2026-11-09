# Tabibito

A black travel journal with country and destination filters, Date/A–Z sorting, a portrait photo carousel, and collapsible personal experiences.

## Run locally

Use Node.js 20.9+ and install dependencies with `npm ci`. Copy `.env.example` to `.env.local`, configure the R2 bucket credentials and public photo URL, then run `npm run dev` and open http://localhost:3000. Production builds use `/tabibito` as their base path.

## Update destinations

The source list is `data/Travel List.ods`. Its first row must have **Country** and **Destination** (or City/Place) columns. **Travel Order** is optional and supplies the existing Date order. State/Region columns are not required.

Run `npm run import:travel` after editing the spreadsheet. Python 3 is required to read ODS with its standard library. The importer updates `data/locations.ts` atomically and preserves existing destination IDs, descriptions, and photo-folder paths. New destinations get a slug ID and a `Country/Destination` photo folder. Unknown countries and incomplete rows produce errors instead of silently losing data. Add new country IDs, names, and flags to `COUNTRIES` before importing them. Destinations removed from the spreadsheet are removed from the generated catalog.

For a reviewable export without updating the app:

```bash
node scripts/import-travel-ods.mjs "data/Travel List.ods" /tmp/travel.json
```

## Photos, captions, and experiences

Upload photos to each destination's `photoFolder` in the configured R2 bucket. Optional `captions.json` maps filenames to captions. Add `experience.md` or `experience.txt` for the personal experience. The API lists all pages of objects and ignores nested folders.

Captions and stories load independently: a malformed caption file uses fallback captions; a failed story read leaves the photos available and offers a retry. Failed optional content is not cached.

Photo URLs include the object's ETag (or last-modified time), so replacing an image under the same filename generates a new optimized-image URL. There is no need to delete Next.js's image cache. Successful destination listings are cached for up to 60 seconds at the CDN; the browser also reuses a successful listing for 60 seconds when revisiting a destination. Revisit or reload after that interval to see new uploads. Existing cache entries created before this version still expire under their earlier cache policy.

Country, destination, and sort selections are saved in query parameters, so refresh, sharing, and browser Back/Forward retain the selected view. For example: `?country=TH&destination=phuket&sort=alphabetical`.

## Verify changes

```bash
npm test
npm run lint
npm run build
```

The test suite covers optional-content failures, pagination, replacement-image versions, invalid API IDs, URL selection validation, and importing the bundled spreadsheet. Adjacent photos preload unless the browser reports Data Saver or a 2G connection. The first visible photo loads eagerly with high fetch priority.
