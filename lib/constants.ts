/** App base path configured in next.config.ts */
export const APP_BASE_PATH = process.env.NODE_ENV === "production" ? "/tabibito" : "";

/** Site metadata */
export const SITE_META = {
  title: "Tabibito - Travel Journal",
  description: "Travel destinations, photographs, and personal experiences.",
} as const;

