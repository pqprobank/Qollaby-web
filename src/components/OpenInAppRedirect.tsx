"use client";

import { useEffect, useRef, useState } from "react";

import {
  AppContentType,
  buildAppDeepLink,
  detectMobilePlatform,
  storeUrlForPlatform,
} from "@/lib/app-links";

interface OpenInAppRedirectProps {
  type: AppContentType;
  id: string;
}

/**
 * Tries to open the Qollaby native app via the custom URL scheme. If the app
 * doesn't open within a short window (meaning it's most likely not installed),
 * falls back to the appropriate app store.
 *
 * iOS / Android Universal/App Links will usually intercept the original
 * https://qollaby.com/<type>/<id> URL *before* this page ever renders when
 * the app is installed, so this component is mainly a backup for browsers
 * where Universal Links failed (in-app webviews, desktop, fresh installs
 * before AASA cached, etc).
 */
export function OpenInAppRedirect({ type, id }: OpenInAppRedirectProps) {
  const [hasAttempted, setHasAttempted] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">(
    "other",
  );
  const visibilityChangedRef = useRef(false);

  useEffect(() => {
    const detected = detectMobilePlatform(
      typeof navigator !== "undefined" ? navigator.userAgent : null,
    );
    setPlatform(detected);

    if (detected === "other") {
      return;
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        visibilityChangedRef.current = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const deepLink = buildAppDeepLink(type, id);
    const storeUrl = storeUrlForPlatform(detected);

    const attemptOpen = () => {
      setHasAttempted(true);
      window.location.href = deepLink;
    };

    const fallbackTimer = window.setTimeout(() => {
      if (!visibilityChangedRef.current && document.visibilityState !== "hidden") {
        window.location.href = storeUrl;
      }
    }, 1500);

    const startTimer = window.setTimeout(attemptOpen, 50);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [type, id]);

  const storeUrl = storeUrlForPlatform(platform);
  const deepLink = buildAppDeepLink(type, id);

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={deepLink}
        className="inline-flex items-center justify-center rounded-full bg-[#f5a623] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Open in Qollaby app
      </a>
      <a
        href={storeUrl}
        className="inline-flex items-center justify-center rounded-full border border-black/8 px-7 py-3 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
      >
        {platform === "android" ? "Get it on Google Play" : "Download on the App Store"}
      </a>
      {hasAttempted && (
        <p className="mt-2 text-xs text-[#6c727a]">
          Didn&apos;t open? Make sure the Qollaby app is installed.
        </p>
      )}
    </div>
  );
}
