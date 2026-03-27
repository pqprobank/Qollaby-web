import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { rulesOfEngagement, rulesPageSections } from "@/lib/site-content";

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-black/6 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
            <Link
              href="/"
              className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-[#915400] hover:text-[#6a3d00]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </Link>
            <div className="mt-8 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#915400]">
                Qollaby legal-style page
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                Qollaby Rules of Engagement
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#5f6368]">
                Qollaby is a community-led platform. We rely on our users to
                help keep the space respectful and useful. If you see content
                that violates the following Rules of Engagement, tap the Caution
                button. Our admin team will review it and take it from there.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fcfbf7]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-12 lg:py-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] border border-black/6 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#915400]">
                  On this page
                </p>
                <nav className="mt-5 flex flex-col gap-3">
                  {rulesPageSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="cursor-pointer text-sm font-medium text-[#40464d] transition-colors hover:text-[#111111]"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-10">
              <section
                id="overview"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">Overview</h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  These rules define the baseline expectations for participating
                  in Qollaby. They are designed to protect trust, reduce abuse,
                  and keep community activity focused on useful contribution.
                </p>
              </section>

              <section
                id="rules"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Rules of Engagement
                </h2>
                <div className="mt-8 divide-y divide-black/6">
                  {rulesOfEngagement.map((rule) => (
                    <article key={rule.number} className="py-6 first:pt-0 last:pb-0">
                      <h3 className="text-xl font-semibold text-[#1d1d1f]">
                        {rule.number}. {rule.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-base leading-8 text-[#5f6368]">
                        {rule.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="reporting"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Reporting and review
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  If content violates these rules, members are encouraged to use
                  the Caution reporting flow inside Qollaby. Reported content is
                  reviewed by the admin team before further action is taken.
                </p>
              </section>

              <section
                id="enforcement"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Enforcement
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  We reserve the right to remove content or accounts that harm
                  the community. Enforcement decisions may include content
                  removal, reduced visibility, account restrictions, or account
                  removal when needed to protect users and the platform.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
