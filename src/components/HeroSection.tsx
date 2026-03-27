import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fcfbf7]">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,_rgba(245,166,35,0.18),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(255,222,173,0.35),_transparent_40%)]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-18 sm:px-8 lg:grid-cols-[minmax(0,1fr)_540px] lg:px-12 lg:py-24">
        <div className="relative z-10 flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#f5a623]/25 bg-white/90 px-4 py-2 text-sm font-medium text-[#915400] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f5a623]" />
            Community-led discovery for local connection
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-[#1b1b1b] sm:text-6xl lg:text-7xl">
            Collaborate locally.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f5660] sm:text-xl">
            Qollaby brings people, opportunities, events, exchange, and direct
            conversation into one community-led app.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#download"
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-[#f5a623] px-7 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Download Qollaby
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/rules"
              className="cursor-pointer inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-7 py-4 text-base font-semibold text-[#1f1f1f] transition-colors hover:border-black/20 hover:bg-black/[0.02]"
            >
              Read the rules
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Ideas, work, opportunities, and exchange in one feed.",
              "Built-in messaging to move fast after discovery.",
              "Event browsing and sponsor promotion in the same ecosystem.",
              "Community standards that keep the platform useful.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f5a623]" />
                <p className="text-sm leading-6 text-[#5f6368]">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center lg:pl-6">
          <div className="absolute -left-8 top-20 hidden h-28 w-28 rounded-full bg-[#f5a623]/15 blur-3xl lg:block" />
          <div className="absolute -right-4 bottom-10 hidden h-28 w-28 rounded-full bg-[#ffd48c]/40 blur-3xl lg:block" />
          <div className="relative w-[300px] overflow-hidden rounded-[2.5rem] border border-black/8 bg-white shadow-[0_32px_80px_rgba(26,26,26,0.15)]">
            <Image
              src="/images/screenshot-hero.png"
              alt="Qollaby app home feed with posts, categories, and sponsor cards"
              width={430}
              height={932}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
