"use client";

import { useEffect } from "react";

import {
  AppContentType,
  buildAndroidIntentUrl,
  buildAppDeepLink,
  storeUrlForPlatform,
} from "@/lib/app-links";

interface AutoOpenInAppProps {
  type: AppContentType;
  id: string;
  platform: "ios" | "android" | "other";
}

/**
 * Tries to open the Qollaby app automatically as soon as a mobile visitor
 * lands on the page, then falls back to the appropriate app store if the app
 * doesn't open within ~2.5 seconds.
 *
 * Robustness notes (the previous version had the "app + store both open"
 * bug — fixed here):
 *
 * - Listens for `visibilitychange`, `pagehide`, and `blur`. Any one of
 *   these means the OS has handed the user off to the app — once that
 *   happens we *permanently* cancel the store fallback. Some iOS Safari
 *   versions only fire `pagehide` (not `visibilitychange`) when an app
 *   takes over.
 * - Waits 2500 ms before the store fallback so a slow-launching app has
 *   time to mark the page as hidden.
 * - On Android we use the `intent://` URL, which has a built-in Play Store
 *   fallback and never shows the disambiguation popup, so we don't need a
 *   JS timer there at all.
 *
 * What this *cannot* do (Apple platform limits, not bugs):
 *
 * - When a visitor pastes the URL into Safari's address bar, Apple
 *   intentionally blocks Universal Links from firing. The custom-scheme
 *   redirect we do here may then show "Cannot Open Page" if the app is
 *   not installed. The Smart App Banner (rendered via metadata) is the
 *   official Apple-supported escape hatch for that case.
 * - When the link is tapped from inside an in-app browser (Instagram,
 *   Facebook, WeChat, …), Universal Links are suppressed and even our
 *   custom-scheme fallback is often blocked. The user has to "Open in
 *   Safari" first.
 */
export function AutoOpenInApp({ type, id, platform }: AutoOpenInAppProps) {
  useEffect(() => {
    if (platform !== "ios" && platform !== "android") return;

    let pageHidden = false;
    let cancelled = false;

    const markHidden = () => {
      pageHidden = true;
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") markHidden();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", markHidden);
    window.addEventListener("blur", markHidden);

    const deepLink =
      platform === "android"
        ? buildAndroidIntentUrl(type, id)
        : buildAppDeepLink(type, id);
    const storeUrl = storeUrlForPlatform(platform);

    const launchTimer = window.setTimeout(() => {
      if (cancelled) return;
      window.location.href = deepLink;
    }, 100);

    const fallbackTimer = window.setTimeout(() => {
      if (cancelled) return;
      if (pageHidden || document.visibilityState === "hidden") return;
      window.location.href = storeUrl;
    }, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(launchTimer);
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", markHidden);
      window.removeEventListener("blur", markHidden);
    };
  }, [type, id, platform]);

  return null;
}
