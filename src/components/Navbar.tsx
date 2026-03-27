"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { navigationLinks } from "@/lib/site-content";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-[#fcfbf7]/90 backdrop-blur-xl">
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

        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm font-medium text-[#40464d] transition-colors hover:text-[#111111]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#download"
            className="cursor-pointer rounded-full border border-black/8 px-5 py-2.5 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
          >
            App Store
          </Link>
          <Link
            href="#download"
            className="cursor-pointer rounded-full bg-[#f5a623] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Google Play
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/8 text-[#1d1d1f] md:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-black/6 px-6 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer text-base font-medium text-[#1d1d1f]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Link
                href="#download"
                className="cursor-pointer rounded-full border border-black/8 px-5 py-3 text-center text-sm font-semibold text-[#1d1d1f]"
                onClick={() => setIsOpen(false)}
              >
                Download for iOS
              </Link>
              <Link
                href="#download"
                className="cursor-pointer rounded-full bg-[#f5a623] px-5 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Download for Android
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
