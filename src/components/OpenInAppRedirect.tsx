"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  ANDROID_FALLBACK_STORE_DELAY_MS,
  type AppContentType,
  CUSTOM_SCHEME_DELAY_MS,
  IOS_FALLBACK_STORE_DELAY_MS,
  PLAY_STORE_URL,
  buildAppDeepLink,
  buildWebUrl,
  detectMobilePlatform,
  storeUrlForPlatform,
} from "@/lib/app-links";

interface OpenInAppRedirectProps {
  type: AppContentType;
  id: string;
}

function markHidden(ref: { current: boolean }) {
  if (typeof document === "undefined") return;
  if (document.visibilityState === "hidden") {
    ref.current = true;
  }
}

/**
 * Automatically tries `qollaby://` first (same expectation on iPhone and Android),
 * then the correct app store if this tab stays in the foreground.
 *
 * iOS caveat: Safari may briefly show “invalid URL” when the app is not installed;
 * after dismissal the store opens automatically shortly after unless you already
 * switched away to Qollaby.
 */
export function OpenInAppRedirect({ type, id }: OpenInAppRedirectProps) {
  const [didSchemeAttempt, setDidSchemeAttempt] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">(
    "other",
  );
  const hiddenRef = useRef(false);

  const universalHttpsUrl = buildWebUrl(type, id);
  const storeUrl = storeUrlForPlatform(platform);

  useEffect(() => {
    const detected = detectMobilePlatform(
      typeof navigator !== "undefined" ? navigator.userAgent : null,
    );
    queueMicrotask(() => {
      setPlatform(detected);
    });
    hiddenRef.current = false;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") hiddenRef.current = true;
    };
    const onPageHide = () => {
      hiddenRef.current = true;
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    if (detected !== "ios" && detected !== "android") {
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pagehide", onPageHide);
      };
    }

    markHidden(hiddenRef);

    const deepLink = buildAppDeepLink(type, id);
    const store =
      detected === "ios"
        ? storeUrlForPlatform("ios")
        : storeUrlForPlatform("android");

    const fallbackDelay =
      detected === "ios"
        ? IOS_FALLBACK_STORE_DELAY_MS
        : ANDROID_FALLBACK_STORE_DELAY_MS;

    const trySchemeTimer = window.setTimeout(() => {
      setDidSchemeAttempt(true);
      window.location.href = deepLink;
    }, CUSTOM_SCHEME_DELAY_MS);

    const storeTimer = window.setTimeout(() => {
      if (hiddenRef.current || document.visibilityState !== "visible") {
        return;
      }
      window.location.assign(store);
    }, fallbackDelay);

    return () => {
      window.clearTimeout(trySchemeTimer);
      window.clearTimeout(storeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [type, id]);

  const actionButtons =
    platform === "ios" || platform === "android" ? (
      <>
        <a
          href={universalHttpsUrl}
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full bg-[#f5a623] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Open in Qollaby app
        </a>
        <a
          href={storeUrl}
          className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full border border-black/8 px-7 py-3 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
        >
          {platform === "android"
            ? "Get it on Google Play"
            : "Download on the App Store"}
        </a>
      </>
    ) : (
      <p className="max-w-[21rem] text-center text-xs leading-6 text-[#6c727a]">
        Open this link on your phone for the mobile app — or grab install links
        on the homepage.{" "}
        <Link
          href="/#download"
          className="font-semibold text-[#915400] hover:text-[#6a3d00]"
        >
          Download Qollaby
        </Link>
        {" · "}
        <Link
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#915400] hover:text-[#6a3d00]"
        >
          Android
        </Link>
      </p>
    );

  const storeName =
    platform === "android" ? "Google Play" : "the App Store";

  return (
    <div className="flex flex-col items-center gap-4">
      {platform !== "other" && (
        <p className="max-w-[20rem] text-center text-xs leading-5 text-[#6c727a]">
          We try to launch Qollaby automatically via the app deep link (same URL
          the app listens for); if you stay here,{" "}
          <strong className="text-[#50555c]">{storeName}</strong> opens next.
          {platform === "ios" ? (
            <>
              {" "}
              If Qollaby isn&apos;t installed, Safari may briefly show{' '}
              &quot;invalid URL&quot;
              {" — dismiss it."}
            </>
          ) : null}
        </p>
      )}

      <div className="flex flex-col items-center gap-3">{actionButtons}</div>

      {didSchemeAttempt && platform !== "other" && (
        <p className="max-w-[19rem] text-center text-[11px] leading-5 text-[#9ca3af]">
          Use the outlined button for the store sooner, or the orange HTTPS
          button if the app stayed in Safari instead of handing off.
        </p>
      )}
    </div>
  );
}
