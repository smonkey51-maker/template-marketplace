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

  // Only show on mobile (handled via CSS), hide on certain pages
  const hidden = ["/sign-in", "/sign-up", "/studio", "/preview"].some((p) =>
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
        className="glass-surface-pill pointer-events-auto flex items-center justify-between"
        style={{ width: "calc(100% - 32px)", maxWidth: "360px", padding: "6px 8px" }}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            aria-label={tab.label}
            aria-current={tab.active ? "page" : undefined}
            className={`relative flex flex-col items-center justify-center gap-1 min-w-[64px] py-2 rounded-full transition-all duration-300 active:scale-95 ${
              tab.active
                ? "text-[var(--accent)]"
                : "text-muted hover:text-theme hover:bg-[color:var(--glass-s-fill)]"
            }`}
            style={
              tab.active
                ? { background: "color-mix(in srgb, var(--accent) 16%, transparent)" }
                : undefined
            }
          >
            <span className="relative">{tab.icon(tab.active)}</span>
            <span className="text-[10px] font-semibold leading-none tracking-wide">
              {tab.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
