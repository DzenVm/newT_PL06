"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconClose, IconMenu } from "@/components/icons";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-ink/95 backdrop-blur border-b border-gold-deep/30" : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Brand slot intentionally left empty — no name, no logo. */}
        <div aria-hidden className="w-8" />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[13px] uppercase tracking-[0.16em] text-ivory/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/rezerwacja"
            className="inline-flex items-center border border-gold px-5 py-2.5 text-[13px] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Rezerwacja
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-gold lg:hidden"
        >
          {open ? <IconClose className="h-7 w-7" /> : <IconMenu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gold-deep/30 bg-ink px-5 pb-8 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3.5 text-sm uppercase tracking-[0.16em] text-ivory/85 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/rezerwacja"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center border border-gold px-5 py-3 text-sm uppercase tracking-[0.16em] text-gold hover:bg-gold hover:text-ink"
            >
              Rezerwacja
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
