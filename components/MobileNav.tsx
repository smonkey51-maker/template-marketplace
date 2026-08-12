"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";

export default function MobileNav() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const pathname = usePathname();
  const { lang } = useLang();

  // `tab.active` (below) only flips once `pathname` reflects the *completed*
  // navigation — and on a real phone on a real network, an App Router route
  // change means waiting for the new page's RSC payload before that happens.
  // That gap was dead time: nothing moved until the network round-trip
  // finished, then the (now genuinely smooth) transition played — but the
  // wait in front of it is what actually read as "very slow", not the
  // transition itself. Highlighting the tapped tab immediately, without
  // waiting for the network, closes that gap; this resyncs to the real route
  // the moment it lands (or if navigation happened some other way, e.g. the
  // back button).
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);
  // `pathname` always carries the locale segment (/it/..., /en/...), so every
  // comparison below needs the prefix stripped first — matching against the
  // raw pathname meant `hidden` was always false and no tab was ever "active".
  const routeKey = pathname.replace(/^\/(it|en)/, "") || "/";

  // Only show on mobile (handled via CSS), hide on pages that put their own bar
  // at the bottom of the viewport. This nav is `bottom-0 z-[90]`, full width;
  // a page-level bottom bar is `bottom-0 z-50` — same edge, and the higher
  // z-index means this one would render directly on top of it, hiding it
  // completely rather than sharing the edge, and the page's own control loses.
  //
  // `/bundle` is here because that is exactly what was happening: the bundle
  // page's fixed CTA bar carries the "Acquista bundle" button, and the floating
  // pill sat over it on every phone. Of all the buttons on the site to cover,
  // that is the one that costs a sale.
  const hidden = ["/sign-in", "/sign-up", "/studio", "/preview", "/bundle"].some((p) =>
    routeKey.startsWith(p),
  );
  if (hidden) return null;

  const tabs = [
    {
      href: `/${lang}`,
      label: "Home",
      active: routeKey === "/",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            strokeLinejoin="round"
            fill={active ? "currentColor" : "none"}
            fillOpacity={active ? "0.15" : "0"}
          />
        </svg>
      ),
    },
    {
      href: `/${lang}/catalogo`,
      label: lang === "it" ? "Catalogo" : "Catalog",
      active: routeKey.startsWith("/catalogo") || routeKey.startsWith("/templates"),
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"}
            fillOpacity={active ? "0.15" : "0"}
          />
          <rect
            x="12"
            y="3"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"}
            fillOpacity={active ? "0.15" : "0"}
          />
          <rect
            x="3"
            y="12"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"}
            fillOpacity={active ? "0.15" : "0"}
          />
          <rect
            x="12"
            y="12"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"}
            fillOpacity={active ? "0.15" : "0"}
          />
        </svg>
      ),
    },
    {
      href: `/${lang}/ai-studio`,
      label: "Studio",
      active: routeKey === "/ai-studio" || routeKey === "/studio",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="M11 3v2M11 17v2M3 11H1M21 11h-2M5.64 5.64l-1.42-1.42M17.78 17.78l-1.42-1.42M5.64 16.36l-1.42 1.42M17.78 4.22l-1.42 1.42"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="11"
            cy="11"
            r="3.5"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"}
            fillOpacity={active ? "0.15" : "0"}
          />
        </svg>
      ),
    },
    {
      href: `/${lang}/account`,
      label: lang === "it" ? "Account" : "Account",
      active: routeKey === "/account",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <circle
            cx="11"
            cy="8"
            r="3.5"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"}
            fillOpacity={active ? "0.15" : "0"}
          />
          <path
            d="M3.5 19c0-4.14 3.36-7 7.5-7s7.5 2.86 7.5 7"
            stroke="currentColor"
            strokeWidth={active ? "2" : "1.5"}
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className={`m3-bar sm:hidden fixed bottom-0 inset-x-0 z-[90] flex ${reduced ? "" : "transition-all duration-500 ease-out"} ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {tabs.map((tab) => {
        const active = pendingHref ? tab.href === pendingHref : tab.active;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-label={tab.label}
            aria-current={active ? "page" : undefined}
            onClick={() => setPendingHref(tab.href)}
            className="relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:scale-95 transition-transform duration-150"
          >
            <span
              aria-hidden
              className="flex items-center justify-center r-md"
              style={{
                width: "38px",
                height: "30px",
                color: active ? "var(--accent)" : "var(--muted)",
                background: active ? "rgba(var(--accent-rgb), 0.16)" : "transparent",
                transition: "background-color 200ms ease-out, color 200ms ease-out",
              }}
            >
              {tab.icon(active)}
            </span>
            <span
              className="text-[10.5px] leading-none tracking-wide"
              style={{
                color: active ? "var(--text)" : "var(--muted)",
                fontWeight: active ? 700 : 600,
                transition: "color 200ms ease-out",
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
