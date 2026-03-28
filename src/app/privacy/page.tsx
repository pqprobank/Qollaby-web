import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { privacyPageSections } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Qollaby",
  description: "Qollaby Privacy Policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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
                Legal
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#5f6368]">
                Effective date: March 27, 2026. This policy describes how Qollaby
                collects, uses, and protects your personal information when you
                use our mobile application and related services.
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
                  {privacyPageSections.map((section) => (
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
                id="intro"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">Introduction</h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Qollaby (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Qollaby mobile
                  application. This Privacy Policy explains what information we
                  collect, how we use it, and the choices you have. By using
                  Qollaby you agree to the practices described in this policy.
                </p>
              </section>

              <section
                id="info-collected"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Information we collect
                </h2>
                <div className="mt-6 space-y-6 text-base leading-8 text-[#5f6368]">
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Account information</h3>
                    <p className="mt-2">
                      When you create an account we collect your name, email
                      address, and profile photo. You may optionally provide a
                      location, bio, and business profile details.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">User-generated content</h3>
                    <p className="mt-2">
                      Posts, exchange listings, event details, messages, images,
                      and videos you create or upload are stored to provide the
                      service.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Usage and device data</h3>
                    <p className="mt-2">
                      We may collect device type, operating system, app version,
                      and general interaction data to improve performance and
                      fix issues.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Location</h3>
                    <p className="mt-2">
                      If you grant permission, we collect your approximate
                      location to show locally relevant posts and events. You
                      can revoke this permission at any time in your device
                      settings.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">Push notification tokens</h3>
                    <p className="mt-2">
                      We store device push tokens to deliver notifications. You
                      can disable notifications in your device settings.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="how-used"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  How we use your information
                </h2>
                <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-[#5f6368]">
                  <li>Provide, maintain, and improve the Qollaby platform.</li>
                  <li>Display posts, events, exchange listings, and sponsor ads relevant to your location and interests.</li>
                  <li>Enable messaging and social features such as following and friends.</li>
                  <li>Process subscription payments and manage sponsor ad campaigns.</li>
                  <li>Send service-related notifications (e.g. new messages, bid updates).</li>
                  <li>Enforce our Rules of Engagement and respond to reports.</li>
                  <li>Analyze aggregated usage trends to improve the product.</li>
                </ul>
              </section>

              <section
                id="sharing"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Sharing and disclosure
                </h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-[#5f6368]">
                  <p>
                    We do not sell your personal information. We may share data
                    in the following limited circumstances:
                  </p>
                  <ul className="list-disc space-y-3 pl-6">
                    <li><strong>Service providers:</strong> Cloud hosting (Appwrite), payment processing (Stripe, RevenueCat), and push notification delivery operate on our behalf under contractual obligations.</li>
                    <li><strong>Legal requirements:</strong> We may disclose information if required by law, court order, or governmental request.</li>
                    <li><strong>Safety:</strong> We may share information when we believe it is necessary to prevent harm, fraud, or violations of our Rules of Engagement.</li>
                    <li><strong>With your consent:</strong> We may share information when you explicitly direct us to do so.</li>
                  </ul>
                </div>
              </section>

              <section
                id="retention"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Data retention
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  We retain your account data and content for as long as your
                  account is active. If you delete your account, we will remove
                  your personal information within a reasonable timeframe, except
                  where retention is required by law or for legitimate business
                  purposes such as resolving disputes.
                </p>
              </section>

              <section
                id="security"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Security
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  We use industry-standard security measures including encrypted
                  connections (HTTPS/TLS), secure authentication, and access
                  controls to protect your data. No method of transmission or
                  storage is completely secure, so we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section
                id="children"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Children&apos;s privacy
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  Qollaby is not intended for children under the age of 13. We
                  do not knowingly collect personal information from children
                  under 13. If we learn that we have collected information from
                  a child under 13, we will take steps to delete it promptly.
                </p>
              </section>

              <section
                id="rights"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Your rights
                </h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-[#5f6368]">
                  <p>Depending on your jurisdiction, you may have the right to:</p>
                  <ul className="list-disc space-y-3 pl-6">
                    <li>Access the personal data we hold about you.</li>
                    <li>Request correction of inaccurate data.</li>
                    <li>Request deletion of your data.</li>
                    <li>Withdraw consent for data processing where consent is the legal basis.</li>
                    <li>Object to certain types of processing.</li>
                  </ul>
                  <p>
                    To exercise any of these rights, contact us at{" "}
                    <a href="mailto:qollaby@gmail.com" className="font-semibold text-[#915400] hover:text-[#6a3d00]">
                      qollaby@gmail.com
                    </a>.
                  </p>
                </div>
              </section>

              <section
                id="changes"
                className="rounded-[2rem] border border-black/6 bg-white p-7 shadow-sm sm:p-9"
              >
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                  Changes to this policy
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f6368]">
                  We may update this Privacy Policy from time to time. When we
                  make material changes, we will notify users through the app or
                  by updating the effective date at the top of this page. Your
                  continued use of Qollaby after changes constitutes acceptance
                  of the updated policy.
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
                  If you have questions or concerns about this Privacy Policy or
                  your data, please contact us at{" "}
                  <a href="mailto:qollaby@gmail.com" className="font-semibold text-[#915400] hover:text-[#6a3d00]">
                    qollaby@gmail.com
                  </a>.
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
