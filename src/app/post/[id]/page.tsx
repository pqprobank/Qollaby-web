import type { Metadata } from "next";

import { SharedContentLanding } from "@/components/SharedContentLanding";
import { buildAppleItunesAppMeta, buildWebUrl } from "@/lib/app-links";

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const url = buildWebUrl("post", id);
  const title = "Post on Qollaby";
  const description =
    "View this Qollaby community post. Open it in the Qollaby app to comment or message the poster.";

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
      images: ["/images/screenshot-discover.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/screenshot-discover.png"],
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
