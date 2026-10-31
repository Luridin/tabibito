/** App base path configured in next.config.ts */
export const APP_BASE_PATH = process.env.NODE_ENV === "production" ? "/tabibito" : "";

/** Site metadata */
export const SITE_META = {
  title: "Tabibito - Travel Journal",
  description: "A personal travel journal. Places explored, moments captured, and stories from the journey.",
} as const;

