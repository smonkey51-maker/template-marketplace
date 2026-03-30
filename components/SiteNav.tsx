"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useLang } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

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
            {lang === "it" ? "Mercato del digitale artigianale" : "Artisan digital marketplace"}
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
                <span className="link-underline">{label}</span>
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

        {/* Claude AI trust badge */}
        <div className="hidden md:flex items-center gap-1.5 mr-3 px-2.5 py-1 border"
          style={{ borderColor: "var(--accent-muted, rgba(156,119,51,0.3))", background: "var(--accent-bg)" }}>
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M5 1l1.1 2.3L9 4l-2 1.8.5 2.5L5 7.2 2.5 8.3 3 5.8 1 4l2.9-.7L5 1z" fill="currentColor"/>
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-syne)", color: "var(--accent)" }}>
            Claude AI
          </span>
        </div>

        {/* Studio Access CTA — only lg+ to avoid cramping at narrow desktop */}
        <Link
          href="/studio"
          className="hidden lg:inline-flex btn-brand btn-brand-sm mr-3"
        >
          Studio Access
        </Link>

        <LanguageToggle />
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
