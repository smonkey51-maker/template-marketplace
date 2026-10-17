"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { copy } from "@/lib/i18n";
import { useLang } from "@/components/LanguageProvider";
import SiteLogo from "@/components/SiteLogo";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS: { href: string; key: keyof typeof copy.it }[] = [
  { href: "/test", key: "navTest" },
  { href: "/test-ma-di-piu", key: "navTestPlus" },
  { href: "/rickrolled", key: "navRick" },
];

export default function SiteNav() {
  const { lang, toggle } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const pathname = usePathname();
  const withoutLang = pathname.replace(/^\/(it|en)(?=\/|$)/, "");
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => withoutLang === href;
  const openSearch = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true }));

  return (
    <header className="sticky top-0 z-50 bg-bg">
      {/* Environment bar — always visible so the site never reads as production. */}
      <div className="bg-bar text-bar-fg">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-1.5 sm:px-6">
          <p className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.08em]">
            <span className="font-medium text-white">{t("envLabel")}</span>
            <span className="hidden sm:inline"> — {t("envNote")}</span>
          </p>
          <button
            type="button"
            onClick={toggle}
            aria-label={lang === "it" ? "Switch to English" : "Passa all'italiano"}
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] hover:text-white"
          >
            {lang === "it" ? "IT | en" : "EN | it"}
          </button>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
          <Link href={`/${lang}`} aria-label={`${copy[lang].siteName} — home`}>
            <SiteLogo />
          </Link>

          <nav className="hidden items-stretch gap-1 self-stretch md:flex" aria-label="Main">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={`/${lang}${l.href}`}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`flex items-center border-b-2 px-3 text-sm font-medium transition-colors ${
                  isActive(l.href)
                    ? "border-brand text-ink dark:border-accent"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="hidden h-9 items-center gap-2 rounded-md border border-line-strong px-3 text-sm text-muted hover:bg-surface sm:flex"
            >
              <Search size={15} aria-hidden />
              <span>{t("searchCta")}</span>
              <kbd className="font-mono text-[11px]">⌘K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={lang === "it" ? "Menu" : "Menu"}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <ul className="border-t border-line px-4 py-2 md:hidden sm:px-6">
            {LINKS.map((l, i) => (
              <li key={l.href} className={i > 0 ? "border-t border-line" : undefined}>
                <Link
                  href={`/${lang}${l.href}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block py-3 text-[15px] ${isActive(l.href) ? "font-medium text-ink" : "text-muted"}`}
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
