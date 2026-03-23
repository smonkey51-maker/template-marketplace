"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/useWishlist";
import { getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import TemplateCard from "@/components/TemplateCard";
import SiteNav from "@/components/SiteNav";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.ok ? r.json() : { templateIds: [] })
      .then((d) => setPurchasedIds(d.templateIds ?? []))
      .catch(() => {});
  }, []);

  const saved = ids.map((id) => getTemplate(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-page pb-24">
      <SiteNav title={lang === "it" ? "Salvati" : "Saved"} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <div className="w-16 h-16 bg-accent/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                <path d="M14 24S3 17.5 3 10A5.5 5.5 0 0114 6.2a5.5 5.5 0 0111 3.8C25 17.5 14 24 14 24z"
                  stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[18px] font-bold text-theme mb-2">
                {lang === "it" ? "Nessun template salvato" : "No saved templates"}
              </p>
              <p className="text-[14px] text-muted max-w-xs">
                {lang === "it"
                  ? "Clicca il ❤ su un template per salvarlo qui."
                  : "Tap the ❤ on any template to save it here."}
              </p>
            </div>
            <Link
              href="/"
              className="btn-brand"
            >
              {lang === "it" ? "Sfoglia template →" : "Browse templates →"}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[13px] text-muted">
                {saved.length} {lang === "it" ? "template salvati" : "saved templates"}
              </p>
              <button
                onClick={() => ids.forEach((id) => toggle(id))}
                className="text-[12px] text-muted transition-colors duration-200"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--terra)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}
              >
                {lang === "it" ? "Rimuovi tutti" : "Clear all"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {saved.map((tmpl, i) => (
                <div key={tmpl!.id} className="anim-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <TemplateCard template={tmpl!} purchasedIds={purchasedIds} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
