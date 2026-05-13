import type { Metadata } from "next";

import { SharedContentLanding } from "@/components/SharedContentLanding";
import { buildAppleItunesAppMeta, buildWebUrl } from "@/lib/app-links";
import { fetchShareOgPayload } from "@/lib/share-metadata";

interface PageParams {
  params: Promise<{ id: string }>;
}

const STATIC_OG_IMAGE = "/images/screenshot-discover.png";

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const url = buildWebUrl("post", id);
  const payload = await fetchShareOgPayload("post", id);
  const title = payload?.title ?? "Post on Qollaby";
  const description =
    payload?.description ??
    "View this Qollaby community post. Open it in the Qollaby app to comment or message the poster.";
  const ogImages = payload?.imageUrl ? [payload.imageUrl] : [STATIC_OG_IMAGE];

  const appleItunesApp = buildAppleItunesAppMeta("post", id);

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

export default async function SharedPostPage({ params }: PageParams) {
  const { id } = await params;
  return <SharedContentLanding type="post" id={id} />;
}
