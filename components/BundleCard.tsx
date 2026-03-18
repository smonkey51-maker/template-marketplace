"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bundle, formatPrice, getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

// Monochromatic — single neutral style regardless of bundle accent color
const NEUTRAL_COLORS = {
  bg:     "bg-zinc-50 dark:bg-zinc-800/50",
  border: "border-zinc-100 dark:border-zinc-800",
  text:   "text-zinc-700 dark:text-zinc-300",
  badge:  "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
  shadow: "hover:shadow-lg",
};

export default function BundleCard({
  bundle,
  purchasedIds,
  onBuy,
}: {
  bundle: Bundle;
  purchasedIds: string[];
  onBuy: (bundleId: string) => Promise<void>;
}) {
  const { lang } = useLang();
  const router = useRouter();
  const colors = NEUTRAL_COLORS;
  const savings = bundle.regularPrice - bundle.price;
  const savingsPct = Math.round((savings / bundle.regularPrice) * 100);

  const ownedCount = bundle.templateIds.filter((id) => purchasedIds.includes(id)).length;
  const isFullyOwned = ownedCount === bundle.templateIds.length;

  const includedTemplates = bundle.templateIds.map((id) => getTemplate(id)).filter(Boolean);

  const [loading, setLoading] = useState(false);

  const handleBuy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await onBuy(bundle.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      className={`relative bg-white dark:bg-zinc-900 rounded-[22px] overflow-hidden border ${colors.border} flex flex-col h-full
        transition-shadow duration-200 ${colors.shadow}
        cursor-pointer group`}
      onClick={() => router.push(`/bundle/${bundle.id}`)}
      aria-label={`${bundle.name} — ${formatPrice(bundle.price)}`}
    >
      {/* Savings badge */}
      <div className={`absolute top-3 right-3 z-10 border rounded-full px-2.5 py-1 text-[10px] font-black ${colors.badge}
        transition-transform duration-300 group-hover:scale-110`}>
        –{savingsPct}%
      </div>

      {/* Header */}
      <div className={`${colors.bg} px-5 pt-5 pb-4 border-b border-theme`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{bundle.emoji}</span>
          <div className="flex-1 pr-8">
            <h3 className="text-[15px] font-black text-theme leading-tight">{bundle.name}</h3>
            <p className={`text-[11px] font-semibold ${colors.text} mt-0.5`}>{bundle.tagline}</p>
          </div>
        </div>
        <p className="text-[12px] text-muted leading-snug">{bundle.description}</p>
      </div>

      {/* Highlights + template pills */}
      <div className="px-5 pt-4 pb-3 flex-1 space-y-3">
        {/* USP bullets */}
        <div className="space-y-1.5">
          {bundle.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0 border ${colors.badge}`}>
                ✓
              </span>
              <span className="text-[12px] text-theme/80 leading-snug">{h}</span>
            </div>
          ))}
        </div>

        {/* Template pills */}
        <div className="pt-2 border-t border-theme">
          <p className="text-[10px] font-black text-muted/60 uppercase tracking-[0.18em] mb-1.5">
            {t[lang].bundleCard.includes} ({bundle.templateIds.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {includedTemplates.map((tmpl) => {
              const owned = purchasedIds.includes(tmpl!.id);
              return (
                <span
                  key={tmpl!.id}
                  className={`text-[10px] px-2 py-0.5 rounded-full border leading-snug transition-colors duration-200 ${
                    owned
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                      : "bg-theme/5 text-muted border-theme"
                  }`}
                >
                  {owned ? "✓ " : ""}{tmpl!.name}
                </span>
              );
            })}
          </div>
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
              {t[lang].bundleCard.save} <strong className={colors.text}>{formatPrice(savings)}</strong>
            </span>
          </div>
        </div>

        {isFullyOwned ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[13px] font-bold text-center border border-zinc-200 dark:border-zinc-700"
          >
            {t[lang].bundleCard.fullyOwned}
          </div>
        ) : (
          <button
            onClick={handleBuy}
            disabled={loading}
            className="w-full py-3 rounded-xl text-[13px] font-bold transition-opacity duration-200
              active:scale-[0.97] disabled:opacity-60
              bg-zinc-900 dark:bg-white hover:opacity-80 text-white dark:text-zinc-900"
          >
            {loading
              ? t[lang].bundleCard.loading
              : t[lang].bundleCard.buyBundle.replace("{{price}}", formatPrice(bundle.price))}
          </button>
        )}

        {ownedCount > 0 && !isFullyOwned && (
          <p className="text-center text-[10px] text-muted mt-2">
            {t[lang].bundleCard.youOwn
              .replace("{{owned}}", String(ownedCount))
              .replace("{{total}}", String(bundle.templateIds.length))}
          </p>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/bundle/${bundle.id}`); }}
          className={`w-full mt-2 text-[11px] font-semibold ${colors.text} hover:opacity-70 transition-opacity text-center`}
        >
          {t[lang].bundleCard.seeDetails}
        </button>
      </div>
    </article>
  );
}
