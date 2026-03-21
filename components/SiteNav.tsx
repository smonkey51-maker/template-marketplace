"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useLang } from "@/components/LanguageProvider";

const NAV_LINKS = [
  { href: "/",        labelIt: "Catalogo",  labelEn: "Catalog",   activeOn: [] },
  { href: "/guide",   labelIt: "Guida",     labelEn: "Guide",     activeOn: ["/guide"] },
  { href: "/studio",  labelIt: "AI Studio", labelEn: "AI Studio", activeOn: ["/studio"] },
  { href: "/account", labelIt: "Account",   labelEn: "Account",   activeOn: ["/account"] },
];

export default function SiteNav({ title }: { title?: string }) {
  const { lang } = useLang();
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-[14px] px-4 sm:px-6 py-3.5"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1">
        {/* Logo */}
        <Link href="/" className="shrink-0 mr-4 hover:opacity-80 transition-opacity flex flex-col gap-0.5">
          <span
            className="text-[15px] leading-none tracking-[0.06em] uppercase"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 800,
              color: "var(--text)",
            }}
          >
            Template<span style={{ color: "var(--accent)" }}>Lab</span>
          </span>
          <span
            className="text-[8px] tracking-[0.18em] uppercase leading-none hidden sm:block"
            style={{ color: "var(--accent)", opacity: 0.65, fontWeight: 500 }}
          >
            Mercato del digitale artigianale
          </span>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden sm:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            const label = lang === "it" ? link.labelIt : link.labelEn;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium px-3 py-1.5 transition-all duration-200 uppercase tracking-[0.1em]"
                style={{
                  color: isActive ? "var(--text)" : "var(--muted)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "var(--text)" : "var(--muted)")}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Center title — mobile only */}
        {title && (
          <span
            className="sm:hidden flex-1 text-center text-[11px] font-semibold uppercase tracking-widest truncate"
            style={{ color: "var(--muted)" }}
          >
            {title}
          </span>
        )}

        {/* Spacer */}
        <div className="hidden sm:flex flex-1" />

        {/* Studio Access CTA */}
        <Link
          href="/studio"
          className="hidden sm:inline-flex items-center mr-3 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            background: "var(--accent)",
            color: "var(--bg)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
          }}
        >
          Studio Access
        </Link>

        <UserButton />
      </div>
    </nav>
  );
}
