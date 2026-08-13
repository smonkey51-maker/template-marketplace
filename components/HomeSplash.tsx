"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * Minimal splash homepage — replaces the editorial Hero + template masonry +
 * how-it-works + footer stack that lived here before (see git history on
 * this file). Ported from the Figma Make prototype's own Home.tsx: giant
 * wordmark, one-line claim, three index-numbered entries into the site. No
 * site chrome (SiteNav/FormaFooter) on this screen by design, matching the
 * prototype — every entry point leads to a page that carries its own nav
 * and footer.
 */
const ENTRIES = [
  { labelIt: "Catalogo", labelEn: "Catalog", href: "/catalogo", index: "01" },
  { labelIt: "Studio AI", labelEn: "AI Studio", href: "/studio", index: "02" },
  // Points at /guida — FORMA's existing guide page already doubles as the
  // "how it works" walkthrough, so the label says what the page does rather
  // than what section of the site it lives in.
  { labelIt: "Come funziona", labelEn: "How it works", href: "/guida", index: "03" },
] as const;

export default function HomeSplash() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <main
      className="relative flex min-h-screen flex-col"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Utility row */}
      <div className="flex items-center justify-end px-6 py-6 md:px-10">
        <ThemeToggle />
      </div>

      {/* Wordmark + claim — protagonist. Vermeer sits behind it as a faint,
          full-bleed backdrop (the homepage's original hero painting before
          the splash rewrite) rather than a hard-edged image, so the wordmark
          still reads as the only real content on the screen. */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/paintings/vermeer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: 0.16,
            maskImage: "radial-gradient(ellipse 70% 65% at center, black 40%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 65% at center, black 40%, transparent 90%)",
          }}
        />
        <FormaLogoAnimated className="relative w-full max-w-[22em]" />
        <p
          className="relative mt-6 text-[0.8rem] uppercase"
          style={{ color: "var(--muted)", letterSpacing: "0.3em" }}
        >
          {t.heroTagline}
        </p>
      </div>

      {/* Minimal entries into the three destinations.
          Bottom padding on small screens only — MobileNav (components/MobileNav.tsx)
          is a `fixed bottom-0` tab bar shown below the `sm` breakpoint, and
          without this the last entry sat underneath it, unreachable/unreadable
          on a phone. FormaFooter clears the same bar with the same value. */}
      <nav
        className="border-t border-theme pb-[calc(140px_+_env(safe-area-inset-bottom,0px))] sm:pb-0"
        aria-label="Main navigation"
      >
        <ul className="mx-auto grid max-w-[1400px] grid-cols-1 sm:grid-cols-3">
          {ENTRIES.map((e, i) => (
            <li
              key={e.href}
              className={i > 0 ? "border-theme sm:border-l border-t sm:border-t-0" : undefined}
            >
              <Link
                href={`/${lang}${e.href}`}
                className="group flex items-center justify-between px-6 py-6 transition-colors duration-200 md:px-10 hover:bg-[var(--surface)]"
              >
                <span className="flex items-baseline gap-3">
                  <span
                    className="text-[0.7rem]"
                    style={{ color: "var(--muted)", letterSpacing: "0.05em" }}
                  >
                    [{e.index}]
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
                      fontWeight: 500,
                      color: "var(--text)",
                    }}
                    className="text-[1.25rem]"
                  >
                    {lang === "it" ? e.labelIt : e.labelEn}
                  </span>
                </span>
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--muted)" }}
                >
                  <span className="group-hover:hidden">→</span>
                  <span className="hidden group-hover:inline" style={{ color: "var(--accent)" }}>
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
