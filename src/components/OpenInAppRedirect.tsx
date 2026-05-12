"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  ANDROID_CUSTOM_SCHEME_DELAY_MS,
  ANDROID_FALLBACK_STORE_DELAY_MS,
  type AppContentType,
  IOS_AUTO_STORE_DELAY_MS,
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
 * - **Android**: tries custom scheme briefly, then auto-opens Play Store if the
 *   tab is still foreground (installed app normally hides the tab).
 * - **iOS**: never auto-opens `qollaby://` (Safari shows an invalid‑URL alert
 *   when the app isn’t installed). After a delay, auto-opens the App Store if
 *   the web page stayed visible — so “no reaction” resolves without that error.
 *
 * Buttons: HTTPS Universal Link retry + store; copy explains the countdown.
 */
export function OpenInAppRedirect({ type, id }: OpenInAppRedirectProps) {
  const [didAndroidSchemeAttempt, setDidAndroidSchemeAttempt] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other");
  const hiddenRef = useRef(false);

  const universalHttpsUrl = buildWebUrl(type, id);
  const storeUrl = storeUrlForPlatform(platform);

  useEffect(() => {
    const detected = detectMobilePlatform(
      typeof navigator !== "undefined" ? navigator.userAgent : null,
    );
    setPlatform(detected);
    hiddenRef.current = false;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") hiddenRef.current = true;
    };
    const onPageHide = () => {
      hiddenRef.current = true;
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    if (detected === "other") {
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pagehide", onPageHide);
      };
    }

    markHidden(hiddenRef);

    if (detected === "ios") {
      const store = storeUrlForPlatform("ios");
      const t = window.setTimeout(() => {
        if (hiddenRef.current || document.visibilityState !== "visible") {
          return;
        }
        window.location.assign(store);
      }, IOS_AUTO_STORE_DELAY_MS);

      return () => {
        window.clearTimeout(t);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pagehide", onPageHide);
      };
    }

    const deepLink = buildAppDeepLink(type, id);
    const play = storeUrlForPlatform("android");

    const trySchemeTimer = window.setTimeout(() => {
      setDidAndroidSchemeAttempt(true);
      window.location.href = deepLink;
    }, ANDROID_CUSTOM_SCHEME_DELAY_MS);

    const storeTimer = window.setTimeout(() => {
      if (hiddenRef.current || document.visibilityState !== "visible") {
        return;
      }
      window.location.assign(play);
    }, ANDROID_FALLBACK_STORE_DELAY_MS);

    return () => {
      window.clearTimeout(trySchemeTimer);
      window.clearTimeout(storeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [type, id]);

  const actionButtons =
    platform === "ios" ? (
      <>
        <a
          href={storeUrl}
          className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full bg-[#f5a623] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Download Qollaby
        </a>
        <a
          href={universalHttpsUrl}
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full border border-black/8 px-7 py-3 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
        >
          Already using the app? Open link
        </a>
      </>
    ) : platform === "android" ? (
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
          Get it on Google Play
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

  return (
    <div className="flex flex-col items-center gap-4">
      {platform !== "other" && (
        <p className="max-w-[20rem] text-center text-xs leading-5 text-[#6c727a]">
          {platform === "ios" ? (
            <>
              In a moment we&apos;ll take you to the{" "}
              <strong className="text-[#50555c]">App Store</strong> if Qollaby
              didn&apos;t open. Tap below to go right away.
            </>
          ) : (
            <>
              If Qollaby doesn&apos;t open, we&apos;ll send you to{" "}
              <strong className="text-[#50555c]">Google Play</strong> — tap
              anytime below.
            </>
          )}
        </p>
      )}

      <div className="flex flex-col items-center gap-3">{actionButtons}</div>

      {didAndroidSchemeAttempt && platform === "android" && (
        <p className="max-w-[19rem] text-center text-[11px] leading-5 text-[#9ca3af]">
          If Qollaby is installed but didn&apos;t open, we&apos;ll open the Play
          Store next — reinstall if needed.
        </p>
      )}
    </div>
  );
}
