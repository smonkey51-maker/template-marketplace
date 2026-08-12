"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { FormaLogoStatic } from "@/components/FormaLogo";
import { useLang } from "@/components/LanguageProvider";

interface NavLink {
  href: string;
  labelIt: string;
  labelEn: string;
}

const LEFT_LINKS: NavLink[] = [
  { href: "/catalogo", labelIt: "Catalogo", labelEn: "Catalog" },
  { href: "/guida", labelIt: "Guida", labelEn: "Guide" },
];

// Points straight at the tool, not at /ai-studio's brochure. SiteNav (every
// inner page) already keeps those as two separate links — a descriptive
// "AI Studio" entry and a one-hop "Studio" CTA — because the brochure is
// still useful reading, it just should not sit between a returning visitor
// and the tool on every single visit.
const RIGHT_LINKS: NavLink[] = [
  { href: "/studio", labelIt: "Studio", labelEn: "Studio" },
  { href: "/account", labelIt: "Account", labelEn: "Account" },
];

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
            color: active ? "var(--accent)" : "rgba(255,255,255,0.65)",
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
      {/* Fixed overlay nav bar — glassmorphism. The translucent strip stays
          full-bleed (it's the visual anchor of the header), but its content
          is capped to the same max-width as the bento grid below it —
          otherwise "1fr auto 1fr" pins the side links to the literal screen
          edges, and on a wide monitor that reads as two orphaned words with
          a huge gap to the logo instead of a nav. */}
      <header
        className="fixed top-0 inset-x-0 z-[70] px-4 sm:px-6 lg:px-10"
        style={{
          height: "56px",
          paddingTop: "env(safe-area-inset-top, 0px)",
          // A near-opaque scrim, not just blur. The bento cells directly under
          // this bar scroll a painting under it on mobile, and blur alone
          // doesn't guarantee WCAG 1.4.11 contrast against an arbitrarily
          // light patch of that image — the fill has to do the work on its
          // own. 0.85 keeps ~5:1+ contrast for the 65%-white link text even
          // over a pure-white patch scrolling underneath.
          background: "rgba(5,4,2,0.85)",
          backdropFilter: "blur(30px) saturate(190%)",
          WebkitBackdropFilter: "blur(30px) saturate(190%)",
          borderBottom: "1px solid var(--spatial-rim)",
          boxShadow: "0 8px 28px -12px rgba(0,0,0,0.6), inset 0 1px 0 var(--spatial-rim)",
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

          {/* Logo center */}
          <div className="flex justify-center">
            <Link href={`/${lang}`} aria-label="FORMA — Home" className="flex items-center">
              <FormaLogoStatic className="w-24 sm:w-32 h-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Right side nav. Search and account used to exist only on inner
              pages via SiteNav, so a visitor who wanted either had to leave
              the Home before finding them. Ctrl/Cmd K already opens the
              command palette from anywhere (mounted globally in the root
              layout) — this link is the same discoverability hint SiteNav
              gives it on every other page, not a second implementation. */}
          <nav
            className="hidden lg:flex items-center gap-2 justify-self-end"
            aria-label="Right navigation"
          >
            {renderNavLinks(RIGHT_LINKS)}
            <Link
              href={`/${lang}/catalogo`}
              className="px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 flex items-center"
              style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em" }}
            >
              {lang === "it" ? "Cerca" : "Search"}
              <span
                className="ml-1.5 text-[10px] normal-case tracking-normal font-medium rounded-md px-1.5 py-0.5"
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Ctrl K
              </span>
            </Link>
            <div className="flex items-center">
              <UserButton />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
