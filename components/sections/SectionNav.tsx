"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FormaLogoStatic } from "@/components/FormaLogo";
import { useLang } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

interface NavLink {
  href: string;
  labelIt: string;
  labelEn: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/catalogo", labelIt: "Catalogo", labelEn: "Catalog" },
  { href: "/guida", labelIt: "Guida", labelEn: "Guide" },
  { href: "/ai-studio", labelIt: "Studio", labelEn: "Studio" },
  { href: "/account", labelIt: "Account", labelEn: "Account" },
];

export default function SectionNav() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Fixed overlay nav bar */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-10"
        style={{
          height: "56px",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        {/* Logo top-left */}
        <Link href="/" aria-label="FORMA — Home" className="flex items-center">
          <FormaLogoStatic className="w-24 sm:w-32 h-auto opacity-90 hover:opacity-100 transition-opacity" />
        </Link>

        {/* Desktop tab nav top-right */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const label = lang === "it" ? link.labelIt : link.labelEn;
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase transition-all duration-200"
                style={{
                  color: active ? "var(--accent)" : "rgba(255,255,255,0.65)",
                  borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
                  letterSpacing: "0.12em",
                }}
              >
                {label}
              </Link>
            );
          })}
          <div className="ml-3 flex items-center gap-1">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>

        {/* Mobile hamburger top-right */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 text-white/80 hover:text-white transition-colors"
          onClick={() => setDrawerOpen(true)}
          aria-label="Apri menu"
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          style={{ paddingRight: "env(safe-area-inset-right, 0px)" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* Mobile fullscreen drawer */}
      {drawerOpen && (
        <div
          id="mobile-drawer"
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ background: "rgba(6,6,6,0.97)", backdropFilter: "blur(24px)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="flex items-center justify-between px-4 pt-safe"
            style={{ height: "56px", paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            <FormaLogoStatic className="w-24 h-auto" />
            <button
              className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white"
              onClick={() => setDrawerOpen(false)}
              aria-label="Chiudi menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav
            className="flex flex-col items-start gap-2 px-6 mt-10"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => {
              const label = lang === "it" ? link.labelIt : link.labelEn;
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="py-3 text-3xl font-light tracking-tight transition-colors"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: active ? "var(--accent)" : "rgba(255,255,255,0.85)",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto px-6 pb-8 flex items-center gap-3" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      )}
    </>
  );
}
