import Image from "next/image";
import Link from "next/link";

import { OpenInAppRedirect } from "@/components/OpenInAppRedirect";
import { AppContentType } from "@/lib/app-links";

interface SharedContentLandingProps {
  type: AppContentType;
  id: string;
}

const TYPE_COPY: Record<
  AppContentType,
  { eyebrow: string; title: string; description: string }
> = {
  post: {
    eyebrow: "Shared post",
    title: "Open this post in Qollaby",
    description:
      "Someone shared a Qollaby community post with you. Open it in the app to view the full post, leave a comment, or message the poster.",
  },
  ad: {
    eyebrow: "Shared sponsor ad",
    title: "Open this sponsor ad in Qollaby",
    description:
      "Someone shared a Qollaby sponsor ad with you. Open it in the app to see the full details and contact the sponsor.",
  },
  exchange: {
    eyebrow: "Shared exchange listing",
    title: "Open this exchange listing in Qollaby",
    description:
      "Someone shared a Qollaby exchange listing with you. Open it in the app to see the item details and message the lister.",
  },
};

export function SharedContentLanding({ type, id }: SharedContentLandingProps) {
  const copy = TYPE_COPY[type];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-black/6 bg-[#fcfbf7]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex cursor-pointer items-center gap-3">
            <Image
              src="/images/logo-app-icon.png"
              alt="Qollaby logo"
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <div>
              <p className="text-lg font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                Qollaby
              </p>
              <p className="text-xs text-[#6c727a]">Community-led platform</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16 sm:px-8 lg:px-12">
        <div className="w-full max-w-xl">
          <div className="rounded-[2rem] border border-black/6 bg-white p-9 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#915400]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-[#5f6368]">
              {copy.description}
            </p>
            <p className="mt-2 text-xs text-[#9ca3af]">
              Reference: {id}
            </p>

            <div className="mt-8">
              <OpenInAppRedirect type={type} id={id} />
            </div>

            <p className="mt-8 text-xs leading-6 text-[#9ca3af]">
              If you already have the app installed, it should open automatically.
              Otherwise you can install Qollaby and open the link again.
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-[#5f6368]">
            <Link
              href="/"
              className="font-semibold text-[#915400] hover:text-[#6a3d00]"
            >
              Back to qollaby.com
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
