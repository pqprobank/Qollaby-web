export type AppContentType = "post" | "ad" | "exchange";

export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com/app/qollaby";

export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.marcus.qollaby";

export function buildAppDeepLink(type: AppContentType, id: string): string {
  return `qollaby://${type}/${id}`;
}

export function buildWebUrl(type: AppContentType, id: string): string {
  return `https://www.qollaby.com/${type}/${id}`;
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
