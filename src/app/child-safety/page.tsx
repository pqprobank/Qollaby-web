import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { childSafetyPageSections } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Child Safety Standards | Qollaby",
  description:
    "Qollaby's standards for preventing child sexual abuse and exploitation (CSAE) and how we respond to reports.",
  alternates: {
    canonical: "https://www.qollaby.com/child-safety",
  },
};

export default function ChildSafetyPage() {
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
                Safety
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                Child Safety Standards
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#5f6368]">
                Qollaby has a zero-tolerance policy toward child sexual abuse
                and exploitation (CSAE) and child sexual abuse material (CSAM).
                This page describes the standards we hold ourselves to, the
                tools we use, and how anyone can report concerns.
              </p>
              <p className="mt-3 text-sm text-[#5f6368]">
                Last updated: April 16, 2026
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
                  {childSafetyPageSections.map((section) => (
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
                id="commitment"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Our commitment
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Qollaby is built for adult members of local communities. We
                  do not tolerate content or behavior that sexualises, exploits,
                  or endangers minors. Any account found to produce, share, or
                  solicit CSAM, or to attempt to contact minors for sexual
                  purposes, is removed without warning and reported to the
                  appropriate authorities.
                </p>
              </section>

              <section
                id="prohibited"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Prohibited content and behavior
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  The following are strictly prohibited on Qollaby and will
                  result in immediate removal and, where applicable, reporting
                  to law enforcement:
                </p>
                <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-[#5f6368]">
                  <li>
                    Child sexual abuse material (CSAM) in any form, including
                    photographs, videos, drawings, or computer-generated images.
                  </li>
                  <li>
                    Grooming, solicitation, or sexual communication directed at
                    or involving a minor.
                  </li>
                  <li>
                    Requests for, or exchange of, sexual content or personal
                    identifying information of a minor.
                  </li>
                  <li>
                    Sharing or selling a minor&apos;s personal information such
                    as name, school, home address, phone number, or precise
                    location.
                  </li>
                  <li>
                    Content that normalises, glorifies, or incites the sexual
                    abuse or trafficking of children.
                  </li>
                  <li>
                    Links, usernames, or handles that direct users to CSAM or
                    to communities that traffic in it.
                  </li>
                </ul>
              </section>

              <section
                id="prevention"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  How we prevent child exploitation
                </h2>
                <div className="mt-6 space-y-6 text-base leading-8 text-[#5f6368]">
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Age gating</h3>
                    <p className="mt-2">
                      Qollaby is intended for users aged 18 and over. This is
                      declared in our App Store and Google Play listings and in
                      our Terms of Service. Accounts suspected of belonging to
                      minors are suspended pending verification and, if the
                      user is confirmed to be a minor, permanently removed.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Content moderation</h3>
                    <p className="mt-2">
                      Every post, exchange listing, sponsor ad, event, and
                      profile image is subject to user reporting. Our moderation
                      team reviews reports on a rolling basis and can remove
                      content, suspend accounts, and escalate to law
                      enforcement.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Blocking tools</h3>
                    <p className="mt-2">
                      Members can block any other account from the profile
                      screen. Blocking hides that account&apos;s posts,
                      listings, and messages, and prevents further contact.
                      Individual posts can be hidden from the feed using the
                      block-post action.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Account appeals</h3>
                    <p className="mt-2">
                      When an account is suspended, the owner can submit an
                      appeal from the app. Appeals are reviewed by a human and
                      either upheld or dismissed with a written response.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="reporting"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  In-app reporting
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Anyone can report a post, exchange listing, sponsor ad,
                  event, message, or profile directly from the app:
                </p>
                <ol className="mt-6 list-decimal space-y-3 pl-6 text-base leading-8 text-[#5f6368]">
                  <li>
                    Open the content you want to report and tap the menu icon
                    (three dots) on the card or profile header.
                  </li>
                  <li>
                    Choose <strong>Report</strong>.
                  </li>
                  <li>
                    Select the most relevant reason. For child-safety concerns,
                    choose <strong>Child safety / CSAE</strong>.
                  </li>
                  <li>
                    Add optional context, then submit. You will receive a
                    confirmation in the app once the report is received.
                  </li>
                </ol>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Reporters&apos; identities are not shared with the reported
                  account.
                </p>
              </section>

              <section
                id="response"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Our response process
                </h2>
                <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-[#5f6368]">
                  <li>
                    <strong>Triage (within 24 hours):</strong> reports tagged as
                    CSAE are prioritised and escalated to the on-call
                    moderation lead.
                  </li>
                  <li>
                    <strong>Review (within 24 to 72 hours):</strong> a trained
                    moderator examines the content, context, and account
                    history.
                  </li>
                  <li>
                    <strong>Action:</strong> infringing content is removed,
                    the offending account is suspended or permanently banned,
                    and associated devices are flagged.
                  </li>
                  <li>
                    <strong>Preservation:</strong> where the law requires it,
                    we preserve evidence and user data for handover to law
                    enforcement.
                  </li>
                  <li>
                    <strong>Report to authorities:</strong> when content
                    appears to involve CSAM or the exploitation of a minor, we
                    report to the appropriate authority without delay (see
                    below).
                  </li>
                  <li>
                    <strong>Communication:</strong> the reporter receives a
                    status update through the in-app notification centre when
                    the case is closed.
                  </li>
                </ul>
              </section>

              <section
                id="authorities"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Reports to authorities
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Qollaby reports suspected CSAM and online child sexual
                  exploitation to the National Center for Missing &amp;
                  Exploited Children (NCMEC) in the United States via the
                  CyberTipline, and to the equivalent national authority in
                  any jurisdiction where we are legally required to do so. We
                  cooperate with valid law-enforcement requests and court
                  orders, and we respond to emergency-disclosure requests on
                  an expedited basis when there is an immediate risk to a
                  child.
                </p>
              </section>

              <section
                id="training"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Moderator training
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Our content moderators are trained to identify and act on
                  CSAE signals. Training covers content classification, safe
                  handling of illegal material, user-grooming patterns, and
                  the legal reporting obligations in each jurisdiction we
                  serve. Moderators are re-trained whenever our policies or
                  the underlying legal framework materially change.
                </p>
              </section>

              <section
                id="contact"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Contact us
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  You can reach the Qollaby safety team through any of the
                  following channels. For urgent threats to a child&apos;s
                  life or safety, contact local emergency services first.
                </p>
                <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-[#5f6368]">
                  <li>
                    <strong>In-app:</strong> tap the menu icon on any post,
                    listing, or profile and choose <strong>Report</strong>.
                  </li>
                  <li>
                    <strong>Child-safety inquiries:</strong>{" "}
                    <a
                      href="mailto:safety@qollaby.com"
                      className="font-semibold text-[#915400] hover:text-[#6a3d00]"
                    >
                      safety@qollaby.com
                    </a>
                    . Please include the phrase &quot;child safety&quot; in
                    the subject line.
                  </li>
                  <li>
                    <strong>Law enforcement / legal process:</strong>{" "}
                    <a
                      href="mailto:legal@qollaby.com"
                      className="font-semibold text-[#915400] hover:text-[#6a3d00]"
                    >
                      legal@qollaby.com
                    </a>
                    . Reserved for subpoenas, preservation requests, and
                    emergency-disclosure requests.
                  </li>
                </ul>
              </section>

              <section
                id="hotlines"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Legal reporting hotlines
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Anyone can report suspected child sexual exploitation
                  directly to the organisations below, independently of
                  Qollaby&apos;s own reporting flow:
                </p>
                <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-[#5f6368]">
                  <li>
                    <strong>United States — NCMEC CyberTipline:</strong>{" "}
                    <a
                      href="https://report.cybertip.org"
                      className="font-semibold text-[#915400] hover:text-[#6a3d00]"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      report.cybertip.org
                    </a>
                    .
                  </li>
                  <li>
                    <strong>United Kingdom — Internet Watch Foundation:</strong>{" "}
                    <a
                      href="https://report.iwf.org.uk"
                      className="font-semibold text-[#915400] hover:text-[#6a3d00]"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      report.iwf.org.uk
                    </a>
                    .
                  </li>
                  <li>
                    <strong>International — INHOPE network:</strong>{" "}
                    <a
                      href="https://www.inhope.org"
                      className="font-semibold text-[#915400] hover:text-[#6a3d00]"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      inhope.org
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Europol:</strong>{" "}
                    <a
                      href="https://www.europol.europa.eu/report-a-crime/report-child-sexual-abuse"
                      className="font-semibold text-[#915400] hover:text-[#6a3d00]"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      report child sexual abuse
                    </a>
                    .
                  </li>
                </ul>
              </section>

              <section
                id="updates"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Updates
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  This page will be updated as our practices evolve and as the
                  legal framework in our operating regions changes. Material
                  updates are noted in the &quot;Last updated&quot; date at the
                  top of this page.
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
