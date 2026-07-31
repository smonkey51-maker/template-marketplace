"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { copy } from "@/lib/formaCopy";
import { useLang } from "@/components/LanguageProvider";
import { FormaLogoAnimated } from "@/components/FormaLogo";

interface DropItem {
  href: string;
  labelIt: string;
  labelEn: string;
}

/**
 * Nav entries. Only entries with `items` render a disclosure caret — a link
 * without a submenu must not advertise one.
 */
const CATALOGO_ITEMS: DropItem[] = [
  { href: "/catalogo", labelIt: "Tutti i template", labelEn: "All templates" },
  { href: "/catalogo?cat=Web", labelIt: "Web", labelEn: "Web" },
  { href: "/catalogo?cat=Notion", labelIt: "Notion", labelEn: "Notion" },
  { href: "/catalogo?cat=App", labelIt: "App", labelEn: "App" },
  { href: "/catalogo?cat=Shop", labelIt: "Shop", labelEn: "Shop" },
];

const ACCOUNT_ITEMS: DropItem[] = [
  { href: "/account", labelIt: "Il mio account", labelEn: "My account" },
  { href: "/wishlist", labelIt: "Salvati", labelEn: "Saved" },
];

/** Nav item with a real dropdown — opens on hover (pointer) and on focus/click. */
function NavDropdown({
  label,
  href,
  items,
  lang,
}: {
  label: string;
  href: string;
  items: DropItem[];
  lang: "it" | "en";
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const menuId = useId();

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small grace period so the pointer can travel from trigger to panel.
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="fn-nav-item"
      ref={wrapRef}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={href}
        className="fn-drop"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {label}
        <svg
          className="fn-caret"
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          aria-hidden
          data-open={open ? "1" : undefined}
        >
          <path
            d="M1 1l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div id={menuId} className="fn-menu" data-open={open ? "1" : undefined} role="menu">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="fn-menu-item"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {lang === "it" ? item.labelIt : item.labelEn}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SiteNav() {
  const { lang, toggle } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <>
      {/* Utility bar */}
      <div className="fn-utility">
        <div /> {/* Empty placeholder for left side */}
        <div className="fn-right">
          <UserButton />
        </div>
      </div>

      <div className="fn-topline" />

      {/* SVG logo */}
      <Link href="/" className="fn-logo-hero" aria-label="FORMA home">
        <FormaLogoAnimated className="fn-logo-svg" />
      </Link>

      {/* Navbar */}
      <nav className="fn-navbar" aria-label="Main navigation">
        <div className="fn-nav-left">
          <NavDropdown label={t("catalogo")} href="/catalogo" items={CATALOGO_ITEMS} lang={lang} />
          <Link href="/guida">{t("guida")}</Link>
          <Link href="/ai-studio">{t("studioAi")}</Link>
          <NavDropdown label={t("account")} href="/account" items={ACCOUNT_ITEMS} lang={lang} />
        </div>
        <div />
        <div className="fn-nav-right">
          <Link href="/catalogo">
            {t("cerca")} <span className="fn-kbd">Ctrl K</span>
          </Link>
          <Link className="fn-outline" href="/studio">
            {t("studio")}
          </Link>
        </div>
      </nav>
    </>
  );
}
