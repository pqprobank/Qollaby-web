"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SubscriptionSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#1d1d1f]">
            Payment Successful!
          </h1>
          <p className="mt-3 text-sm text-[#6c727a]">
            Thank you for subscribing. Your plan is now active. Open the Qollaby
            app to start using your new features.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-block rounded-xl bg-[#1d1d1f] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Back to Pricing
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
