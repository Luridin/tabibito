/** Height of the CountrySelector component in pixels */
export const SELECTOR_HEIGHT_PX = 56;

/** General padding around the map safe area in pixels */
export const MAP_PADDING_PX = 16;

/** Map state fill colors */
export const MAP_COLORS = {
  active: "#fbbf24",
  hovered: "#fde68a",
  visited: "#e5e7eb",
  default: "#f3f4f6",
  strokeActive: "#000000",
  strokeHovered: "#000000",
  strokeDefault: "#000000",
} as const;

/** Map transform values when sidebar is open (GPU-composited) */
export const MAP_TRANSFORMS = {
  portrait: "translateY(-18vh) scale(0.78)",
  portraitTall: "translateY(-21vh) scale(0.68)",
  landscapeNarrow: "translateX(-18%) scale(0.85)",
  landscapeWide: "translateX(-11%) scale(0.9)",
  none: "none",
} as const;

/** Breakpoint for narrow landscape screens */
export const NARROW_LANDSCAPE_WIDTH = 900;

/** Sidebar layout dimensions (matching globals.css) */
export const SIDEBAR = {
  landscapeWidth: 0.25,
  landscapeMaxWidth: 520,
  landscapeNarrowWidth: 0.4,
} as const;

/** App base path configured in next.config.ts */
export const APP_BASE_PATH = process.env.NODE_ENV === "production" ? "/tabibito" : "";

/** Site metadata */
export const SITE_META = {
  title: "Tabibito - Travel Map",
  description: "An interactive travel map to track and share your journey across countries, states, and cities.",
} as const;

/** Public base URL for trip photos stored in Cloudflare R2 */
export const TRIP_PHOTO_BASE_URL =
  process.env.NEXT_PUBLIC_TRIP_PHOTO_BASE_URL ??
  "https://pub-a1c2a0add823468281d32b1737490565.r2.dev";
