"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const RIGHT_LINKS: NavLink[] = [
  { href: "/ai-studio", labelIt: "Studio", labelEn: "Studio" },
  { href: "/account", labelIt: "Account", labelEn: "Account" },
];

export default function SectionNav() {
  const pathname = usePathname();
  const { lang } = useLang();

  const renderNavLinks = (links: NavLink[]) => {
    return links.map((link) => {
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
    });
  };

  return (
    <>
      {/* Fixed overlay nav bar — glassmorphism */}
      <header
        className="fixed top-0 inset-x-0 z-[70] grid items-center px-4 sm:px-6 lg:px-10"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          height: "56px",
          paddingTop: "env(safe-area-inset-top, 0px)",
          background: "rgba(5,4,2,0.46)",
          backdropFilter: "blur(30px) saturate(190%)",
          WebkitBackdropFilter: "blur(30px) saturate(190%)",
          borderBottom: "1px solid var(--spatial-rim)",
          boxShadow: "0 8px 28px -12px rgba(0,0,0,0.6), inset 0 1px 0 var(--spatial-rim)",
        }}
      >
        {/* Left side nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Left navigation">
          {renderNavLinks(LEFT_LINKS)}
        </nav>

        {/* Logo center */}
        <div className="flex justify-center">
          <Link href="/" aria-label="FORMA — Home" className="flex items-center">
            <FormaLogoStatic className="w-24 sm:w-32 h-auto opacity-90 hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* Right side nav */}
        <nav
          className="hidden lg:flex items-center gap-1 justify-self-end"
          aria-label="Right navigation"
        >
          {renderNavLinks(RIGHT_LINKS)}
        </nav>
      </header>
    </>
  );
}
