"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { navigationLinks } from "@/lib/site-content";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { webUser, loading, logout } = useAuth();

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
          {!loading && webUser ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-black/8 px-4 py-2">
                <User className="h-4 w-4 text-[#6c727a]" />
                <span className="max-w-[120px] truncate text-sm font-medium text-[#1d1d1f]">
                  {webUser.profile.name || webUser.user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-black/8 px-4 py-2.5 text-sm font-medium text-[#6c727a] transition-colors hover:bg-black/[0.03] hover:text-[#1d1d1f]"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="cursor-pointer rounded-full border border-black/8 px-5 py-2.5 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
              >
                Sign In
              </Link>
              <Link
                href="/pricing"
                className="cursor-pointer rounded-full bg-[#f5a623] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </Link>
            </>
          )}
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

            {!loading && webUser ? (
              <div className="mt-2 flex flex-col gap-3">
                <div className="flex items-center gap-2 px-2 py-1">
                  <User className="h-4 w-4 text-[#6c727a]" />
                  <span className="text-sm font-medium text-[#1d1d1f]">
                    {webUser.profile.name || webUser.user.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="cursor-pointer rounded-full border border-black/8 px-5 py-3 text-center text-sm font-semibold text-[#1d1d1f]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="cursor-pointer rounded-full border border-black/8 px-5 py-3 text-center text-sm font-semibold text-[#1d1d1f]"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/pricing"
                  className="cursor-pointer rounded-full bg-[#f5a623] px-5 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Subscribe
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
