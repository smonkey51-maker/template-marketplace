"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPalette = () => {
    const evt = new KeyboardEvent("keydown", { key: "k", metaKey: isMac, ctrlKey: !isMac, bubbles: true });
    window.dispatchEvent(evt);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b px-4 sm:px-6 transition-all duration-300 ${scrolled ? "py-2.5 nav-scrolled" : "py-3.5 nav-default"}`}
      style={{
        background: "var(--nav-bg)",
        borderColor: scrolled ? "var(--accent-muted)" : "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1">
        {/* Logo */}
        <Link href="/" className="shrink-0 mr-4 hover:opacity-80 transition-opacity flex flex-col gap-0.5">
          <span
            className="text-[15px] leading-none tracking-[0.06em] uppercase"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 800,
              color: "var(--text)",
            }}
          >
            For<span style={{ color: "var(--accent)" }}>ma</span>
          </span>
          <span
            className={`text-[10px] tracking-[0.14em] uppercase leading-none hidden sm:block transition-opacity duration-300 ${scrolled ? "opacity-0 h-0" : "opacity-65 h-auto"}`}
            style={{ color: "var(--accent)", fontWeight: 500 }}
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
                className={`relative text-[11px] font-medium px-3 py-1.5 uppercase tracking-[0.1em] link-muted${isActive ? " nav-active" : ""}`}
              >
                <span className="link-underline">{label}</span>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 bottom-[3px] w-1 h-1 rounded-full"
                    style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
                  />
                )}
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

        {/* Command palette trigger — Cmd+K / Ctrl+K */}
        <button
          type="button"
          onClick={openPalette}
          aria-label={lang === "it" ? "Apri palette comandi" : "Open command palette"}
          className="hidden sm:flex items-center gap-2 mr-2 px-2.5 py-1.5 border transition-colors hover:border-[var(--accent)]"
          style={{ borderColor: "var(--border)", background: "var(--input-bg)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--muted)" }} />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ color: "var(--muted)" }} />
          </svg>
          <span className="text-[10px] font-medium tracking-[0.1em]" style={{ color: "var(--muted)" }}>
            {lang === "it" ? "Cerca" : "Search"}
          </span>
          <span
            className="text-[9px] font-bold tracking-[0.08em] px-1.5 py-0.5 border"
            style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--muted)" }}
          >
            {isMac ? "⌘K" : "Ctrl K"}
          </span>
        </button>

        {/* Claude AI trust badge */}
        <div className="hidden md:flex items-center gap-1.5 mr-3 px-2.5 py-1 border"
          style={{ borderColor: "var(--accent-muted, rgba(156,119,51,0.3))", background: "var(--accent-bg)" }}>
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M5 1l1.1 2.3L9 4l-2 1.8.5 2.5L5 7.2 2.5 8.3 3 5.8 1 4l2.9-.7L5 1z" fill="currentColor"/>
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-syne)", color: "var(--accent)" }}>
            Claude AI
          </span>
        </div>

        {/* Studio Access CTA — xl+ only, below that the nav is too crowded */}
        <Link
          href="/studio"
          className="hidden xl:inline-flex btn-brand shrink-0 mr-3"
          style={{ fontSize: "9px", padding: "7px 14px" }}
        >
          Studio
        </Link>

        <LanguageToggle />
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
