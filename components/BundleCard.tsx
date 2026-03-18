"use client";

import { useState } from "react";
import { Bundle, formatPrice, getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; btn: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/30",    text: "text-blue-400",    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",    btn: "bg-blue-500/15 hover:bg-blue-500/25 border-blue-500/40 text-blue-300" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/30",  text: "text-violet-400",  badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",  btn: "bg-violet-500/15 hover:bg-violet-500/25 border-violet-500/40 text-violet-300" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", btn: "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-300" },
  purple:  { bg: "bg-purple-500/10",  border: "border-purple-500/30",  text: "text-purple-400",  badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",  btn: "bg-purple-500/15 hover:bg-purple-500/25 border-purple-500/40 text-purple-300" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/30",   text: "text-amber-400",   badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",    btn: "bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/40 text-amber-300" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/30",  text: "text-orange-400",  badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",  btn: "bg-orange-500/15 hover:bg-orange-500/25 border-orange-500/40 text-orange-300" },
};

export default function BundleCard({
  bundle,
  purchasedIds,
  onBuy,
}: {
  bundle: Bundle;
  purchasedIds: string[];
  onBuy: (bundleId: string) => void;
}) {
  const { lang } = useLang();
  const colors = COLOR_MAP[bundle.accentColor] ?? COLOR_MAP.blue;
  const savings = bundle.regularPrice - bundle.price;
  const savingsPct = Math.round((savings / bundle.regularPrice) * 100);

  // Check if user already owns all templates in this bundle
  const ownedCount = bundle.templateIds.filter((id) => purchasedIds.includes(id)).length;
  const isFullyOwned = ownedCount === bundle.templateIds.length;

  const includedTemplates = bundle.templateIds
    .map((id) => getTemplate(id))
    .filter(Boolean);

  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      await onBuy(bundle.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative glass-subtle rounded-[22px] overflow-hidden border ${colors.border} flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)]`}>
      {/* Savings badge */}
      <div className={`absolute top-3 right-3 z-10 border rounded-full px-2.5 py-1 text-[10px] font-black ${colors.badge}`}>
        –{savingsPct}%
      </div>

      {/* Header */}
      <div className={`${colors.bg} px-5 pt-5 pb-4 border-b border-theme`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{bundle.emoji}</span>
          <div className="flex-1 pr-8">
            <h3 className="text-[14px] font-black text-theme leading-tight">{bundle.name}</h3>
            <p className={`text-[11px] font-semibold ${colors.text} mt-0.5`}>{bundle.tagline}</p>
          </div>
        </div>
        <p className="text-[12px] text-muted leading-snug">{bundle.description}</p>
      </div>

      {/* Included templates */}
      <div className="px-5 pt-4 pb-3 flex-1">
        <p className="text-[10px] font-black text-muted/60 uppercase tracking-[0.18em] mb-2.5">
          {lang === "it" ? "Include" : "Includes"} ({bundle.templateIds.length} template)
        </p>
        <div className="space-y-1.5">
          {includedTemplates.map((tmpl) => {
            const owned = purchasedIds.includes(tmpl!.id);
            return (
              <div key={tmpl!.id} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0 ${owned ? "bg-[#30D158]/20 text-[#30D158]" : "bg-theme/10 text-muted"}`}>
                  {owned ? "✓" : "·"}
                </span>
                <span className={`text-[12px] leading-snug ${owned ? "text-[#30D158]/80" : "text-theme/80"}`}>
                  {tmpl!.name}
                  {owned && <span className="text-[10px] text-[#30D158]/60 ml-1">(già tuo)</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price + CTA */}
      <div className="px-5 pt-3 pb-5 border-t border-theme">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className={`text-[20px] font-black ${colors.text}`}>{formatPrice(bundle.price)}</span>
            <span className="text-[12px] text-muted line-through ml-2">{formatPrice(bundle.regularPrice)}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-muted">
              {lang === "it" ? "Risparmi" : "Save"} <strong className={colors.text}>{formatPrice(savings)}</strong>
            </span>
          </div>
        </div>

        {isFullyOwned ? (
          <div className="w-full py-2.5 rounded-xl bg-[#30D158]/10 text-[#30D158] text-[13px] font-bold text-center border border-[#30D158]/20">
            {lang === "it" ? "✓ Bundle già acquistato" : "✓ Already owned"}
          </div>
        ) : (
          <button
            onClick={handleBuy}
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 active:scale-[0.97] disabled:opacity-60 border ${colors.btn}`}
          >
            {loading
              ? (lang === "it" ? "Caricamento..." : "Loading...")
              : (lang === "it" ? `Acquista il bundle →` : "Get the bundle →")}
          </button>
        )}

        {ownedCount > 0 && !isFullyOwned && (
          <p className="text-center text-[10px] text-muted mt-2">
            {lang === "it"
              ? `Possiedi già ${ownedCount}/${bundle.templateIds.length} template`
              : `You own ${ownedCount}/${bundle.templateIds.length} templates`}
          </p>
        )}
      </div>
    </div>
  );
}
