"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { copy } from "@/lib/i18n";
import { useLang } from "@/components/LanguageProvider";
import { OsservatorioLogoAnimated } from "@/components/OsservatorioLogo";
import BackLink from "@/components/BackLink";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

const LINKS: { href: string; key: keyof typeof copy.it }[] = [
  { href: "/articoli", key: "navArticoli" },
  { href: "/dossier", key: "navDossier" },
  { href: "/guide-pratiche", key: "navGuide" },
  { href: "/biblioteca", key: "navBiblioteca" },
  { href: "/chi-siamo", key: "navChiSiamo" },
];

export default function SiteNav() {
  const { lang, toggle } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const pathname = usePathname();
  const withoutLang = pathname.replace(/^\/(it|en)(?=\/|$)/, "");
  const isHome = withoutLang === "" || withoutLang === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => withoutLang.startsWith(href.split("?")[0]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-theme transition-shadow duration-300"
      style={{
        background: "var(--bg)",
        paddingTop: "env(safe-area-inset-top, 0px)",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          {!isHome && <BackLink fallbackHref={`/${lang}`} />}
          <Link href={`/${lang}`} aria-label={`${copy[lang].siteName} — home`} className="flex min-w-0 items-center">
            <OsservatorioLogoAnimated className="w-40 sm:w-44" />
          </Link>
        </div>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={`/${lang}${l.href}`}
              aria-current={isActive(l.href) ? "page" : undefined}
              className="text-sm transition-colors"
              style={{ color: isActive(l.href) ? "var(--text)" : "var(--muted)" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={lang === "it" ? "Switch to English" : "Passa all'italiano"}
            className="r-sm border border-theme px-2.5 py-2 text-[11px] font-semibold transition-colors hover:bg-[var(--surface)]"
            style={{ color: "var(--text)", letterSpacing: "0.08em" }}
          >
            {lang === "it" ? "IT / EN" : "EN / IT"}
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? (lang === "it" ? "Chiudi menu" : "Close menu") : lang === "it" ? "Apri menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            style={{ color: "var(--text)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden border-t border-theme md:hidden"
        style={{
          maxHeight: open ? 360 : 0,
          transition: "max-height 0.28s ease",
          background: "var(--bg)",
        }}
      >
        <ul className="px-4 py-2 sm:px-6">
          {LINKS.map((l, i) => (
            <li key={l.href} className={i > 0 ? "border-t border-theme" : undefined}>
              <Link
                href={`/${lang}${l.href}`}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="flex items-center justify-between py-4"
                style={{ color: isActive(l.href) ? "var(--text)" : "var(--muted)" }}
              >
                <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }} className="text-[1.05rem]">
                  {t(l.key)}
                </span>
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
