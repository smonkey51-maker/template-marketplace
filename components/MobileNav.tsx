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
  // `pathname` always carries the locale segment (/it/..., /en/...), so every
  // comparison below needs the prefix stripped first — matching against the
  // raw pathname meant `hidden` was always false and no tab was ever "active".
  const routeKey = pathname.replace(/^\/(it|en)/, "") || "/";

  // Only show on mobile (handled via CSS), hide on pages that put their own bar
  // at the bottom of the viewport. This pill is `bottom-6 z-[90]`, centred; a
  // page-level bottom bar is `bottom-0 z-50`, full width — so the pill lands on
  // top of it rather than beside it, and the page's own control loses.
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
    <div
      className={`sm:hidden fixed bottom-6 inset-x-0 z-[90] flex justify-center pointer-events-none ${reduced ? "" : "transition-all duration-500 ease-out"} ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <nav
        className="glass-surface-pill pointer-events-auto flex items-center justify-center"
        style={{ padding: "5px 24px", gap: "36px" }}
      >
        {tabs.map((tab) =>
          tab.active ? (
            // Active tab: reproduces the reference pill's layered circle —
            // an elliptical glow hugging the bottom edge, a frosted-glass
            // disc on top of it, the icon, then a small glowing dot beneath
            // — 1:1 on structure and sizing, recoloured from the reference's
            // neon blue to the site's own gold accent.
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current="page"
              className="relative flex items-center justify-center rounded-full text-[var(--accent)] transition-transform duration-300 active:scale-95"
              style={{ width: "64px", height: "64px" }}
            >
              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  bottom: "-6px",
                  width: "56px",
                  height: "32px",
                  background:
                    "radial-gradient(closest-side, rgba(var(--accent-rgb), 0.45) 0%, rgba(var(--accent-rgb), 0.15) 55%, transparent 80%)",
                  filter: "blur(10px)",
                  zIndex: 0,
                }}
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                  zIndex: 1,
                }}
              />
              <span
                className="relative flex items-center justify-center"
                style={{ zIndex: 2, width: "26px", height: "26px" }}
              >
                {tab.icon(true)}
              </span>
              <span
                aria-hidden
                className="absolute rounded-sm"
                style={{
                  bottom: "-9px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "12px",
                  height: "4px",
                  borderRadius: "2px",
                  background: "#fbead0",
                  boxShadow: "0 0 12px 4px rgba(var(--accent-rgb), 0.9)",
                  zIndex: 2,
                }}
              />
            </Link>
          ) : (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              className="relative flex items-center justify-center rounded-full text-muted transition-colors duration-300 hover:text-theme active:scale-95"
              style={{ width: "40px", height: "40px" }}
            >
              <span
                className="flex items-center justify-center"
                style={{ width: "25px", height: "25px" }}
              >
                {tab.icon(false)}
              </span>
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
