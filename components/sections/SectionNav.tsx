"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormaLogoStatic } from "@/components/FormaLogo";
import { useLang } from "@/components/LanguageProvider";
import { Search, User } from "lucide-react";

interface NavLink {
  href: string;
  labelIt: string;
  labelEn: string;
}

const LEFT_LINKS: NavLink[] = [
  { href: "/catalogo", labelIt: "Catalogo", labelEn: "Catalog" },
  { href: "/guida", labelIt: "Guida", labelEn: "Guide" },
];

const RIGHT_LINKS: NavLink[] = [{ href: "/ai-studio", labelIt: "Studio", labelEn: "Studio" }];

export default function SectionNav() {
  const pathname = usePathname();
  const { lang } = useLang();

  const renderNavLinks = (links: NavLink[]) => {
    return links.map((link) => {
      const label = lang === "it" ? link.labelIt : link.labelEn;
      const active = pathname.startsWith(`/${lang}${link.href}`);
      return (
        <Link
          key={link.href}
          href={`/${lang}${link.href}`}
          aria-current={active ? "page" : undefined}
          className="px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase transition-all duration-200"
          style={{
            color: active ? "var(--accent)" : "var(--muted)",
            borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
            letterSpacing: "0.12em",
          }}
        >
          {label}
        </Link>
      );
    });
  };

  return (
    <>
      {/* Fixed overlay nav bar. The strip stays full-bleed (it's the visual
          anchor of the header), but its content is capped to the same
          max-width as the masonry grid below it — otherwise "1fr auto 1fr"
          pins the side links to the literal screen edges, and on a wide
          monitor that reads as two orphaned words with a huge gap to the
          logo instead of a nav.

          Flat paper, not glass: the homepage hero is no longer a photo the
          nav floats over, so there is nothing left to blur or refract — an
          opaque bar with a hairline border reads the same as every other
          raised surface on the site. */}
      <header
        className="fixed top-0 inset-x-0 z-[70] px-4 sm:px-6 lg:px-10"
        style={{
          height: "56px",
          paddingTop: "env(safe-area-inset-top, 0px)",
          background: "var(--nav-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="grid items-center h-full mx-auto"
          style={{ gridTemplateColumns: "1fr auto 1fr", maxWidth: "1400px" }}
        >
          {/* Left side nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Left navigation">
            {renderNavLinks(LEFT_LINKS)}
          </nav>

          {/* Logo center — bigger and bolder than the old snap-nav treatment,
              so the wordmark reads as the site's identity, not a footnote. */}
          <div className="flex justify-center">
            <Link href={`/${lang}`} aria-label="Atelier Nove — Home" className="flex items-center">
              <FormaLogoStatic className="w-36 sm:w-48 h-auto opacity-95 hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Right side nav + utility (search, account) — matches SiteNav's
              utility bar, so the Home doesn't behave like a separate landing
              page missing the shortcuts every inner page has. */}
          <div className="hidden lg:flex items-center gap-3 justify-self-end">
            <nav className="flex items-center gap-1" aria-label="Right navigation">
              {renderNavLinks(RIGHT_LINKS)}
            </nav>
            <Link
              href={`/${lang}/catalogo`}
              aria-label={lang === "it" ? "Cerca template" : "Search templates"}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors"
              style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
            >
              <Search size={13} strokeWidth={1.8} aria-hidden />
              <span className="hidden xl:inline">{lang === "it" ? "Cerca" : "Search"}</span>
            </Link>
            <Link
              href={`/${lang}/account`}
              aria-label={lang === "it" ? "Il mio account" : "My account"}
              className="flex items-center justify-center w-7 h-7 rounded-full transition-colors"
              style={{
                color: pathname.startsWith(`/${lang}/account`) ? "var(--accent)" : "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              <User size={13} strokeWidth={1.8} aria-hidden />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
