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

  // Only show on mobile (handled via CSS), hide on certain pages
  const hidden = ["/sign-in", "/sign-up", "/studio", "/preview"].some((p) =>
    pathname.startsWith(p),
  );
  if (hidden) return null;

  const tabs = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
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
      href: "/catalogo",
      label: lang === "it" ? "Catalogo" : "Catalog",
      active: pathname.startsWith("/catalogo") || pathname.startsWith("/templates"),
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
      href: "/ai-studio",
      label: "Studio",
      active: pathname === "/ai-studio" || pathname === "/studio",
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
      href: "/account",
      label: lang === "it" ? "Account" : "Account",
      active: pathname === "/account",
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
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 border-t border-theme ${reduced ? "" : "transition-transform duration-300 ease-out"} ${mounted ? "translate-y-0" : "translate-y-full"}`}
      style={{
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        backgroundColor: "var(--nav-bg)",
      }}
    >
      {/* Top specular line */}
      <div
        className="absolute inset-x-8 top-0 h-px rounded-full"
        style={{ background: "var(--glass-top-edge)" }}
      />

      <div
        className="flex items-stretch"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingLeft: "env(safe-area-inset-left, 0px)",
          paddingRight: "env(safe-area-inset-right, 0px)",
        }}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            aria-label={tab.label}
            aria-current={tab.active ? "page" : undefined}
            className={`relative flex-1 flex flex-col items-center justify-center gap-1.5 py-3 min-h-[48px] transition-all duration-200 active:scale-95 active:opacity-70 ${
              tab.active ? "" : "text-muted"
            }`}
            style={tab.active ? { color: "var(--accent)" } : undefined}
          >
            <span className="relative">{tab.icon(tab.active)}</span>
            <span
              className={`text-[10px] font-semibold leading-none ${tab.active ? "" : "text-muted"}`}
              style={tab.active ? { color: "var(--accent)" } : undefined}
            >
              {tab.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
