/** App base path configured in next.config.ts */
export const APP_BASE_PATH = process.env.NODE_ENV === "production" ? "/tabibito" : "";

/** Site metadata */
export const SITE_META = {
  title: "Tabibito - Travel Journal",
  description: "A pixel-styled travel journal for tracking destinations, gallery moments, and trip notes.",
} as const;

/** Public asset paths for the pixel journal redesign. */
export const JOURNAL_ASSETS = {
  logoPath: "/pixel-journal/tabibito_logo.jpg",
  countryArtById: {
    IN: "/pixel-journal/countries/india.png",
    TH: "/pixel-journal/countries/thailand.png",
    AE: "/pixel-journal/countries/uae.png",
    JP: "/pixel-journal/countries/japan.png",
  },
} as const;

