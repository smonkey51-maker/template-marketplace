"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/lib/useWishlist";
import { getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import TemplateCard from "@/components/TemplateCard";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();
  const { lang } = useLang();
  const router = useRouter();
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
      {/* Nav */}
      <nav className="border-b border-theme backdrop-blur-2xl bg-nav px-4 sm:px-6 py-3.5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1 text-[#0A84FF] text-[15px] font-medium hover:opacity-70 transition-opacity"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" className="shrink-0">
              <path d="M8 1L1.5 7.5L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden sm:inline">{lang === "it" ? "Marketplace" : "Marketplace"}</span>
          </button>
          <div className="flex-1" />
          <span className="text-[13px] font-bold text-theme">
            {lang === "it" ? "❤ Salvati" : "❤ Saved"}
          </span>
          <div className="flex-1" />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FF453A]/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                <path d="M14 24S3 17.5 3 10A5.5 5.5 0 0114 6.2a5.5 5.5 0 0111 3.8C25 17.5 14 24 14 24z"
                  stroke="#FF453A" strokeWidth="1.8" strokeLinejoin="round"/>
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
              className="px-6 py-3 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-bold rounded-2xl text-[14px] transition-all duration-200 active:scale-[0.97] ios-spring"
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
                className="text-[12px] text-muted hover:text-[#FF453A] transition-colors duration-200"
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
