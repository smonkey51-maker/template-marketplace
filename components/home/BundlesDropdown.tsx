"use client";

import Link from "next/link";
import { bundles, formatPrice } from "@/lib/templates";

export default function BundlesDropdown({ lang, purchasedIds }: { lang: "it" | "en"; purchasedIds: string[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-[440px] max-w-[calc(100vw-2rem)]">
      <div className="border border-theme rounded-2xl shadow-2xl overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="p-3">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 px-2" style={{ color: "var(--muted)" }}>
            {lang === "it" ? "Bundle — risparmia fino al 55%" : "Bundles — save up to 55%"}
          </p>
          <div className="space-y-0.5">
            {bundles.map((bundle) => {
              const ownedCount = bundle.templateIds.filter((id) => purchasedIds.includes(id)).length;
              const fullyOwned = ownedCount === bundle.templateIds.length;
              return (
                <Link
                  key={bundle.id}
                  href={`/bundle/${bundle.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group cursor-pointer hover:bg-surface focus:bg-surface"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                    {bundle.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold leading-tight" style={{ color: "var(--text)" }}>
                      {bundle.name}
                    </p>
                    <p className="text-[11px] truncate leading-tight mt-0.5" style={{ color: "var(--muted)" }}>
                      {bundle.tagline}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {fullyOwned ? (
                      <span className="text-[11px] font-semibold" style={{ color: "var(--accent)" }}>✓ {lang === "it" ? "Tuo" : "Owned"}</span>
                    ) : (
                      <>
                        <p className="text-[13px] font-bold" style={{ color: "var(--text)" }}>{formatPrice(bundle.price)}</p>
                        <p className="text-[10px] line-through" style={{ color: "var(--muted)" }}>{formatPrice(bundle.regularPrice)}</p>
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="px-5 py-2.5" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            🎁 {lang === "it" ? "Ogni bundle ha accesso permanente + AI Studio incluso" : "Every bundle includes permanent access + AI Studio"}
          </p>
        </div>
      </div>
    </div>
  );
}
