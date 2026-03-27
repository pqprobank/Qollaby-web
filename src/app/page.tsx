import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { homeFeatures } from "@/lib/site-content";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        <section id="features">
          {homeFeatures.map((feature) => (
            <FeatureSection
              key={feature.id}
              eyebrow={feature.eyebrow}
              title={feature.title}
              description={feature.description}
              bullets={feature.bullets}
              screenshot={feature.screenshot}
              screenshotAlt={feature.screenshotAlt}
              reverse={feature.reverse}
            />
          ))}
        </section>

        <section className="border-t border-black/6 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-18 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#915400]">
                Community standards
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                Built on trust, guided by shared standards.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f6368]">
                Qollaby is community-led. Our Rules of Engagement keep the
                platform respectful, useful, and focused on real contribution.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href="/rules"
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-[#f5a623] px-7 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Read the rules
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#download"
                className="cursor-pointer inline-flex items-center justify-center rounded-full border border-black/8 px-7 py-4 text-base font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
              >
                Download Qollaby
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
