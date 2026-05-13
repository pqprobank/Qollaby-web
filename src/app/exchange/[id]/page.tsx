import type { Metadata } from "next";

import { SharedContentLanding } from "@/components/SharedContentLanding";
import { buildAppleItunesAppMeta, buildWebUrl } from "@/lib/app-links";
import { fetchShareOgPayload } from "@/lib/share-metadata";

interface PageParams {
  params: Promise<{ id: string }>;
}

const STATIC_OG_IMAGE = "/images/screenshot-exchange.png";

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const url = buildWebUrl("exchange", id);
  const payload = await fetchShareOgPayload("exchange", id);
  const title = payload?.title ?? "Exchange listing on Qollaby";
  const description =
    payload?.description ??
    "View this Qollaby exchange listing. Open it in the Qollaby app to see the details and message the lister.";
  const ogImages = payload?.imageUrl ? [payload.imageUrl] : [STATIC_OG_IMAGE];

  const appleItunesApp = buildAppleItunesAppMeta("exchange", id);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Qollaby",
      images: ogImages,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
    ...(appleItunesApp
      ? { other: { "apple-itunes-app": appleItunesApp } }
      : {}),
  };
}

export default async function SharedExchangePage({ params }: PageParams) {
  const { id } = await params;
  return <SharedContentLanding type="exchange" id={id} />;
}
