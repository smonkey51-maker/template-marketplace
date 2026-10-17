"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import SiteLogo from "@/components/SiteLogo";
import GlassLenses from "@/components/GlassLenses";
import IndexMenu from "@/components/IndexMenu";

const LINKS = [
  { href: "/servizi", label: "Servizi" },
  { href: "/metodo", label: "Metodo" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Draft bar: shown while the content is provisional (see lib/site.ts). */}
      {SITE.draft && (
        <div className="sticky top-0 z-50 h-8 bg-bar text-bar-fg">
          <div className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6">
            <p className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.08em]">
              <span className="font-medium text-white">{SITE.draftLabel}</span>
              <span className="hidden sm:inline"> — {SITE.draftNote}</span>
            </p>
          </div>
        </div>
      )}

      {/* Nav row: sticky under the draft bar; liquid-gl turns it into a glass lens. */}
      <header
        className={`lens-bar sticky z-50 border-b border-line ${SITE.draft ? "top-8" : "top-0"}`}
      >
        <div className="glass-nav">
          <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
            <Link href="/" aria-label={`${SITE.name} — home`}>
              <SiteLogo />
            </Link>

            <nav
              className="hidden items-stretch gap-1 self-stretch md:flex"
              aria-label="Principale"
            >
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex items-center border-b-2 px-3 text-sm font-medium transition-colors ${
                    isActive(l.href)
                      ? "border-brand text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {/* `.btn` sets its own display, which beats the `hidden` utility: hide a wrapper instead. */}
              <div className="hidden md:block">
                <IndexMenu className="btn btn-outline" />
              </div>
              <div className="hidden sm:block">
                <Link href="/area-riservata" className="btn btn-outline">
                  Area riservata
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center md:hidden"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <ul className="menu-enter glass-nav border-t border-line px-4 py-2 md:hidden sm:px-6">
            {[...LINKS, { href: "/area-riservata", label: "Area riservata" }].map((l, i) => (
              <li key={l.href} className={i > 0 ? "border-t border-line" : undefined}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block py-3 text-[15px] ${isActive(l.href) ? "font-medium text-ink" : "text-muted"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>
      <GlassLenses />
    </>
  );
}
