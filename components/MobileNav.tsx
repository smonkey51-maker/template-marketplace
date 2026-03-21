"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWishlist } from "@/lib/useWishlist";
import { useLang } from "@/components/LanguageProvider";

export default function MobileNav() {
  const pathname = usePathname();
  const { ids } = useWishlist();
  const { lang } = useLang();

  // Only show on mobile (handled via CSS), hide on certain pages
  const hidden = ["/sign-in", "/sign-up", "/studio", "/preview"].some((p) => pathname.startsWith(p));
  if (hidden) return null;

  const tabs = [
    {
      href: "/",
      label: lang === "it" ? "Home" : "Home",
      active: pathname === "/",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z"
            stroke="currentColor" strokeWidth={active ? "2" : "1.5"} strokeLinejoin="round"
            fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.15" : "0"} />
        </svg>
      ),
    },
    {
      href: "/wishlist",
      label: lang === "it" ? "Salvati" : "Saved",
      active: pathname === "/wishlist",
      badge: ids.length,
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path d="M11 18.5S3 13.5 3 7.5A4 4 0 0111 5a4 4 0 018 2.5c0 6-8 11-8 11z"
            stroke="currentColor" strokeWidth={active ? "2" : "1.5"} strokeLinejoin="round"
            fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.2" : "0"} />
        </svg>
      ),
    },
    {
      href: "/studio",
      label: "Studio",
      active: pathname === "/studio",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path d="M11 3v2M11 17v2M3 11H1M21 11h-2M5.64 5.64l-1.42-1.42M17.78 17.78l-1.42-1.42M5.64 16.36l-1.42 1.42M17.78 4.22l-1.42 1.42"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="11" cy="11" r="3.5" stroke="currentColor" strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.15" : "0"} />
        </svg>
      ),
    },
    {
      href: "/account",
      label: lang === "it" ? "Account" : "Account",
      active: pathname === "/account",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth={active ? "2" : "1.5"}
            fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.15" : "0"} />
          <path d="M3.5 19c0-4.14 3.36-7 7.5-7s7.5 2.86 7.5 7"
            stroke="currentColor" strokeWidth={active ? "2" : "1.5"} strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 inset-x-0 z-50 border-t border-theme"
      style={{
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        backgroundColor: "var(--nav-bg)",
      }}
    >
      {/* Top specular line */}
      <div className="absolute inset-x-8 top-0 h-px rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

      <div className="flex items-stretch" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-opacity duration-200 active:opacity-60 ${
              tab.active ? "" : "text-muted"
            }`}
            style={tab.active ? { color: "var(--accent)" } : undefined}
          >
            <span className="relative">
              {tab.icon(tab.active)}
              {tab.badge ? (
                <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] rounded-full text-[9px] font-bold flex items-center justify-center px-0.5" style={{ background: "var(--accent)", color: "var(--bg)" }}>
                  {tab.badge > 9 ? "9+" : tab.badge}
                </span>
              ) : null}
            </span>
            <span className={`text-[9px] font-semibold leading-none ${tab.active ? "" : "text-muted"}`} style={tab.active ? { color: "var(--accent)" } : undefined}>
              {tab.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
