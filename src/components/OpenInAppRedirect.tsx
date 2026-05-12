import {
  AppContentType,
  buildAndroidIntentUrl,
  buildAppDeepLink,
  storeUrlForPlatform,
} from "@/lib/app-links";

interface OpenInAppRedirectProps {
  type: AppContentType;
  id: string;
  platform: "ios" | "android" | "other";
}

/**
 * Renders the "Open in app" / "Download" actions for a shared content link.
 *
 * We deliberately do NOT auto-redirect to the custom scheme on page load:
 *
 * - When the Qollaby app is installed, iOS Universal Links / Android App
 *   Links intercept https://qollaby.com/<type>/<id> *before* this page ever
 *   loads, so the app opens automatically. If a user lands here, they are
 *   most likely (a) without the app installed or (b) inside an in-app
 *   browser that suppressed the universal link.
 *
 * - JavaScript-driven `location = "qollaby://..."` on iOS Safari triggers
 *   the system "Cannot Open Page" alert when the app isn't installed, and
 *   races with any setTimeout fallback so the App Store opens *on top of*
 *   the launching app — exactly the bug we were seeing previously.
 *
 * Instead the user gets two clear, tappable buttons:
 *
 * - "Open in Qollaby app" — on Android uses an `intent://` URL so Chrome
 *   silently falls back to Play Store if the app isn't installed; on iOS
 *   uses the `qollaby://` scheme (a user-gesture tap is the safe way to
 *   trigger custom schemes).
 * - "Download" — direct App Store / Play Store link as the explicit
 *   alternative.
 *
 * Platform is detected on the server from the User-Agent header to avoid a
 * hydration flash.
 */
export function OpenInAppRedirect({
  type,
  id,
  platform,
}: OpenInAppRedirectProps) {
  const storeUrl = storeUrlForPlatform(platform);
  const openInAppHref =
    platform === "android"
      ? buildAndroidIntentUrl(type, id)
      : buildAppDeepLink(type, id);
  const storeLabel =
    platform === "android"
      ? "Get it on Google Play"
      : "Download on the App Store";

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={openInAppHref}
        className="inline-flex items-center justify-center rounded-full bg-[#f5a623] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Open in Qollaby app
      </a>
      <a
        href={storeUrl}
        className="inline-flex items-center justify-center rounded-full border border-black/8 px-7 py-3 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
      >
        {storeLabel}
      </a>
    </div>
  );
}
