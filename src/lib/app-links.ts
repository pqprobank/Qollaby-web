export type AppContentType = "post" | "ad" | "exchange";

export const ANDROID_PACKAGE = "com.marcus.qollaby";

export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  "https://apps.apple.com/us/app/qollaby/id6758202087";

/**
 * Numeric App Store id, parsed out of the App Store URL (e.g. the
 * `6758202087` in `https://apps.apple.com/us/app/qollaby/id6758202087`).
 * Used for the iOS Smart App Banner. Falls back to an explicit env var
 * if you ever want to override the parsed value.
 */
export const APPLE_ITUNES_APP_ID =
  process.env.NEXT_PUBLIC_APPLE_ITUNES_APP_ID ||
  APP_STORE_URL.match(/\/id(\d+)/)?.[1] ||
  "";

export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

export function buildAppDeepLink(type: AppContentType, id: string): string {
  return `qollaby://${type}/${id}`;
}

export function buildWebUrl(type: AppContentType, id: string): string {
  return `https://www.qollaby.com/${type}/${id}`;
}

/**
 * Android intent:// URL with a Play-Store fallback baked in. Tapping it in
 * Chrome:
 *   - opens the app if installed (resolves the qollaby:// scheme via the
 *     intent filter on the package)
 *   - otherwise jumps straight to the Play Store URL passed in
 *     `S.browser_fallback_url`
 *
 * Crucially this avoids the "Cannot Open Page" / disambiguation popups that
 * `window.location = "qollaby://..."` triggers when the app isn't installed.
 */
export function buildAndroidIntentUrl(
  type: AppContentType,
  id: string,
): string {
  const fallback = encodeURIComponent(PLAY_STORE_URL);
  return (
    `intent://${type}/${id}` +
    `#Intent;scheme=qollaby;package=${ANDROID_PACKAGE}` +
    `;S.browser_fallback_url=${fallback};end`
  );
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

/**
 * Apple's Smart App Banner. iOS Safari renders a native banner at the top of
 * the page that says "Open in Qollaby" (or "View" → App Store if not
 * installed) — completely native, no JS, no "Cannot Open Page" alerts.
 *
 * Requires the App Store numeric id (auto-derived from `APP_STORE_URL`).
 * Returns undefined if the id can't be resolved, so Safari just ignores
 * the tag.
 */
export function buildAppleItunesAppMeta(
  type: AppContentType,
  id: string,
): string | undefined {
  if (!APPLE_ITUNES_APP_ID) return undefined;
  return `app-id=${APPLE_ITUNES_APP_ID}, app-argument=${buildWebUrl(type, id)}`;
}
