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
 * Android: programmatically tries the custom scheme, then falls back to the Play
 * Store — Chrome tolerates unknown schemes better than Safari.
 *
 * iOS: never auto-navigates to qollaby://; without the app installed, Safari
 * shows "invalid URL". Users rely on tapping the HTTPS link (Universal Link
 * retry) or the App Store button.
 */
export function OpenInAppRedirect({ type, id }: OpenInAppRedirectProps) {
  const [didAndroidAutoAttempt, setDidAndroidAutoAttempt] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">(
    "other",
  );
  const visibilityChangedRef = useRef(false);

  useEffect(() => {
    const detected = detectMobilePlatform(
      typeof navigator !== "undefined" ? navigator.userAgent : null,
    );
    setPlatform(detected);

    /* iOS Safari: skip automatic custom-scheme redirects (Safari blocks them as
       invalid URLs when the app isn't installed). */
    if (detected !== "android") {
      return;
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        visibilityChangedRef.current = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const deepLink = buildAppDeepLink(type, id);
    const storeUrl = storeUrlForPlatform("android");

    const attemptOpen = () => {
      setDidAndroidAutoAttempt(true);
      window.location.href = deepLink;
    };

    const fallbackTimer = window.setTimeout(() => {
      if (
        !visibilityChangedRef.current &&
        document.visibilityState !== "hidden"
      ) {
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
  /* Same-origin HTTPS link — retriggers Universal / App Links without Safari blocking */
  const universalLinkRetryUrl = `/${type}/${encodeURIComponent(id)}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={universalLinkRetryUrl}
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
      {didAndroidAutoAttempt && platform === "android" && (
        <p className="mt-2 text-xs text-[#6c727a]">
          Didn&apos;t open? Make sure Qollaby is installed, or use the buttons
          above.
        </p>
      )}
    </div>
  );
}
