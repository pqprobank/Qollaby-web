import type { Metadata } from "next";

import { SharedContentLanding } from "@/components/SharedContentLanding";
import { buildWebUrl } from "@/lib/app-links";

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const url = buildWebUrl("ad", id);
  const title = "Sponsor ad on Qollaby";
  const description =
    "View this Qollaby sponsor ad. Open it in the Qollaby app for full details and to contact the sponsor.";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Qollaby",
      images: ["/images/screenshot-sponsors.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/screenshot-sponsors.png"],
    },
  };
}

export default async function SharedAdPage({ params }: PageParams) {
  const { id } = await params;
  return <SharedContentLanding type="ad" id={id} />;
}
