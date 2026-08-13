"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { copy } from "@/lib/formaCopy";
import { useLang } from "@/components/LanguageProvider";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import BackLink from "@/components/BackLink";
import ThemeToggle from "@/components/ThemeToggle";
import { useWishlist } from "@/lib/useWishlist";
import { Menu, X, Heart, User } from "lucide-react";

const LINKS: { href: string; key: keyof typeof copy.it }[] = [
  { href: "/catalogo", key: "catalogo" },
  { href: "/studio", key: "studioAi" },
  { href: "/guida", key: "guida" },
];

/**
 * Site header — sticky compact bar, matching the Figma Make prototype's
 * Header.tsx: wordmark left, three links, theme toggle + wishlist + account
 * on the right, hamburger on mobile. Replaced the two-tier utility-bar +
 * logo-hero + mega-dropdown navbar this used to be (see git history) — same
 * spot, same import, every page that renders `<SiteNav />` picks this up
 * automatically.
 *
 * No framer-motion in this codebase (unlike the prototype), so the mobile
 * drawer uses a plain max-height CSS transition — same technique already
 * used by FormaFooter's mobile accordion.
 */
export default function SiteNav() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const pathname = usePathname();
  const withoutLang = pathname.replace(/^\/(it|en)(?=\/|$)/, "");
  const { isSignedIn } = useAuth();
  const { ids } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => withoutLang.startsWith(href);

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
        <div className="flex items-center gap-3">
          <BackLink fallbackHref={`/${lang}`} />
          <Link href={`/${lang}`} aria-label="FORMA — home" className="flex items-center">
            <FormaLogoAnimated className="w-24" />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
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

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href={`/${lang}/wishlist`}
            aria-label={lang === "it" ? "Salvati" : "Saved"}
            className="relative flex h-9 w-9 items-center justify-center border border-theme r-md transition-colors hover:bg-[var(--surface)]"
          >
            <Heart size={16} strokeWidth={1.8} aria-hidden style={{ color: "var(--text)" }} />
            {ids.length > 0 && (
              <span
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center px-1 text-[10px] r-sm"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                {ids.length}
              </span>
            )}
          </Link>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link
              href={`/${lang}/account`}
              aria-label={t("account")}
              className="flex h-9 w-9 items-center justify-center border border-theme r-md transition-colors hover:bg-[var(--surface)]"
              style={{ color: isActive("/account") ? "var(--accent)" : "var(--text)" }}
            >
              <User size={16} strokeWidth={1.8} aria-hidden />
            </Link>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={
              open
                ? lang === "it"
                  ? "Chiudi menu"
                  : "Close menu"
                : lang === "it"
                  ? "Apri menu"
                  : "Open menu"
            }
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            style={{ color: "var(--text)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="overflow-hidden border-t border-theme md:hidden"
        style={{
          maxHeight: open ? 260 : 0,
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
                <span
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
                  className="text-[1.05rem]"
                >
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
