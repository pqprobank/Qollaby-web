export type AppContentType = "post" | "ad" | "exchange";

/** Matches native share links (`hooks/useShare.ts` in the app). */
export const SHARE_ORIGIN =
  process.env.NEXT_PUBLIC_SHARE_ORIGIN ?? "https://qollaby.com";

/** Brief pause before attempting `qollaby://` (HTTPS may resolve first). */
export const CUSTOM_SCHEME_DELAY_MS = 80;

/** Heuristic after custom-scheme delay: tab still foreground → assume app not launched. */
export const LIKELY_NOT_INSTALLED_AFTER_MS = 2600;

/**
 * Android only — iOS timers to the App Store overlap with Safari’s handoff sheet (“Open”).
 */
export const ANDROID_FALLBACK_STORE_DELAY_MS = 1600;

export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com/app/qollaby";

export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.marcus.qollaby";

export function buildAppDeepLink(type: AppContentType, id: string): string {
  return `qollaby://${type}/${id}`;
}

export function buildWebUrl(type: AppContentType, id: string): string {
  return `${SHARE_ORIGIN.replace(/\/$/, "")}/${type}/${encodeURIComponent(id)}`;
}

export function detectMobilePlatform(
  userAgent: string | null | undefined,
): "ios" | "android" | "other" {
  if (!userAgent) return "other";
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "other";
}

export function storeUrlForPlatform(
  platform: "ios" | "android" | "other",
): string {
  if (platform === "ios") return APP_STORE_URL;
  if (platform === "android") return PLAY_STORE_URL;
  return APP_STORE_URL;
}
