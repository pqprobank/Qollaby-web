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
  const url = buildWebUrl("exchange", id);
  const title = "Exchange listing on Qollaby";
  const description =
    "View this Qollaby exchange listing. Open it in the Qollaby app to see the details and message the lister.";

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
      images: ["/images/screenshot-exchange.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/screenshot-exchange.png"],
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
