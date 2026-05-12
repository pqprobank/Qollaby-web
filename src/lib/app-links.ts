export type AppContentType = "post" | "ad" | "exchange";

/** Matches native share links (`hooks/useShare.ts` in the app). */
export const SHARE_ORIGIN =
  process.env.NEXT_PUBLIC_SHARE_ORIGIN ?? "https://qollaby.com";

/** iOS automatic App Store fallback if Universal Link didn't open the app. */
export const IOS_AUTO_STORE_DELAY_MS = 2800;

/** Android: try scheme, then Play Store if tab still foreground. */
export const ANDROID_CUSTOM_SCHEME_DELAY_MS = 80;
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
