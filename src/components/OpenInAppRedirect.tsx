"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  ANDROID_FALLBACK_STORE_DELAY_MS,
  type AppContentType,
  CUSTOM_SCHEME_DELAY_MS,
  LIKELY_NOT_INSTALLED_AFTER_MS,
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
 * Mirrors the earliest behaviour: fires `qollaby://` automatically; Android falls back to
 * Play if the foreground tab never hands off (unlike Safari, no blocking modal).
 *
 * We **cannot** replace Apple’s Safari / system dialogs. Instead, if the browser tab stays
 * open after attempting the scheme, we show an on-page 「可能尚未下载」 heuristic (`aria-live`).
 */
export function OpenInAppRedirect({ type, id }: OpenInAppRedirectProps) {
  const [likelyNotInstalled, setLikelyNotInstalled] = useState(false);
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
    queueMicrotask(() => setPlatform(detected));
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

    const trySchemeTimer = window.setTimeout(() => {
      window.location.href = deepLink;
    }, CUSTOM_SCHEME_DELAY_MS);

    const heuristicAt =
      CUSTOM_SCHEME_DELAY_MS + LIKELY_NOT_INSTALLED_AFTER_MS;
    const heuristicTimer = window.setTimeout(() => {
      if (hiddenRef.current || document.visibilityState !== "visible") {
        return;
      }
      queueMicrotask(() => setLikelyNotInstalled(true));
    }, heuristicAt);

    let clearStoreFallback: undefined | (() => void);

    if (detected === "android") {
      const play = storeUrlForPlatform("android");
      const storeTimerId = window.setTimeout(() => {
        if (hiddenRef.current || document.visibilityState !== "visible") {
          return;
        }
        window.location.assign(play);
      }, ANDROID_FALLBACK_STORE_DELAY_MS);
      clearStoreFallback = () => window.clearTimeout(storeTimerId);
    }

    return () => {
      window.clearTimeout(trySchemeTimer);
      window.clearTimeout(heuristicTimer);
      clearStoreFallback?.();
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
          className="inline-flex min-h-[44px] min-w-[220px] items-center justify-center rounded-full bg-[#f5a623] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Open in Qollaby app
        </a>
        <a
          href={storeUrl}
          className="inline-flex min-h-[44px] min-w-[220px] items-center justify-center rounded-full border border-black/8 px-7 py-3 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
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

  return (
    <div className="flex flex-col items-center gap-4">
      {platform !== "other" &&
        (!likelyNotInstalled ? (
          <p
            lang="zh-Hans"
            className="max-w-[22rem] text-center text-xs leading-5 text-[#6c727a]"
          >
            正在自动尝试打开 Qollaby… 系统弹窗由 Safari
            / 安卓处理；若稍后你仍停在当前页，会提示是否可能尚未安装。
          </p>
        ) : (
          <div
            role="status"
            aria-live="polite"
            className="max-w-[22rem] rounded-2xl border border-black/10 bg-[#fef9f0] px-4 py-3 text-center shadow-sm"
          >
            <p
              lang="zh-Hans"
              className="text-sm font-semibold text-[#915400]"
            >
              检测到你仍未进入 Qollaby，可能尚未安装或链接未成功唤起 App。
            </p>
            <p
              lang="zh-Hans"
              className="mt-2 text-xs leading-5 text-[#5f6368]"
            >
              iPhone 如出现系统询问是否在「Qollaby」中打开，点「打开」即可；若没有安装，请点下面的「Download on the App
              Store」。Android 将自动尝试跳转 Google Play，也可手动点商店按钮。
            </p>
          </div>
        ))}

      <div className="flex flex-col items-center gap-3">{actionButtons}</div>
    </div>
  );
}
