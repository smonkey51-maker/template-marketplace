"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bundle, formatPrice, getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

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
  const savings = bundle.regularPrice - bundle.price;
  const savingsPct = Math.round((savings / bundle.regularPrice) * 100);

  const ownedCount = bundle.templateIds.filter((id) => purchasedIds.includes(id)).length;
  const isFullyOwned = ownedCount === bundle.templateIds.length;

  const includedTemplates = bundle.templateIds.map((id) => getTemplate(id)).filter(Boolean);

  const [loading, setLoading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 8).toFixed(1)}deg) rotateY(${(x * 8).toFixed(1)}deg) scale3d(1.025,1.025,1.025)`;
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform .5s cubic-bezier(.34,1.2,.64,1)';
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    setTimeout(() => { if (el) el.style.transition = ''; }, 500);
  };

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-[22px] h-full"
      style={{ willChange: 'transform' }}
    >
    <article
      className="glass relative rounded-[22px] overflow-hidden flex flex-col h-full cursor-pointer group"
      onClick={() => router.push(`/bundle/${bundle.id}`)}
      aria-label={`${bundle.name} — ${formatPrice(bundle.price)}`}
    >
      {/* Specular top edge highlight */}
      <div className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-10" style={{ background: 'var(--glass-top-edge)' }} />

      {/* Savings badge */}
      <div className="absolute top-3 right-3 z-10 border rounded-full px-2.5 py-1 text-[10px] font-black transition-transform duration-300 group-hover:scale-110"
        style={{ background: "var(--accent-bg)", color: "var(--accent)", borderColor: "var(--border)" }}>
        –{savingsPct}%
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-theme" style={{ background: "var(--surface)" }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{bundle.emoji}</span>
          <div className="flex-1 pr-8">
            <h3 className="text-[15px] font-black leading-tight" style={{ color: "var(--text)" }}>{bundle.name}</h3>
            <p className="text-[11px] font-semibold mt-0.5" style={{ color: "var(--muted)" }}>{bundle.tagline}</p>
          </div>
        </div>
        <p className="text-[12px] leading-snug" style={{ color: "var(--muted)" }}>{bundle.description}</p>
      </div>

      {/* Highlights + template pills */}
      <div className="px-5 pt-4 pb-3 flex-1 space-y-3">
        {/* USP bullets */}
        <div className="space-y-1.5">
          {bundle.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0 border"
                style={{ background: "var(--accent-bg)", color: "var(--accent)", borderColor: "var(--border)" }}>
                ✓
              </span>
              <span className="text-[12px] leading-snug" style={{ color: "var(--text)", opacity: 0.8 }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Template pills */}
        <div className="pt-2 border-t border-theme">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: "var(--muted)", opacity: 0.6 }}>
            {t[lang].bundleCard.includes} ({bundle.templateIds.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {includedTemplates.map((tmpl) => {
              const owned = purchasedIds.includes(tmpl!.id);
              return (
                <span
                  key={tmpl!.id}
                  className="text-[10px] px-2 py-0.5 rounded-full border leading-snug transition-colors duration-200"
                  style={{
                    background: owned ? "var(--accent-bg)" : "var(--input-bg)",
                    color: owned ? "var(--accent)" : "var(--muted)",
                    borderColor: "var(--border)",
                  }}
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
            <span className="text-[20px] font-black" style={{ color: "var(--text)" }}>{formatPrice(bundle.price)}</span>
            <span className="text-[12px] text-muted line-through ml-2">{formatPrice(bundle.regularPrice)}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-muted">
              {t[lang].bundleCard.save} <strong style={{ color: "var(--accent)" }}>{formatPrice(savings)}</strong>
            </span>
          </div>
        </div>

        {isFullyOwned ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 rounded-xl text-[13px] font-bold text-center border"
            style={{ background: "var(--input-bg)", color: "var(--muted)", borderColor: "var(--border)" }}
          >
            {t[lang].bundleCard.fullyOwned}
          </div>
        ) : (
          <button
            onClick={handleBuy}
            disabled={loading}
            className="w-full py-3 rounded-xl text-[13px] font-bold transition-opacity duration-200 active:scale-[0.97] disabled:opacity-60"
            style={{ background: "var(--text)", color: "var(--bg)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
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
          className="w-full mt-2 text-[11px] font-semibold hover:opacity-70 transition-opacity text-center"
          style={{ color: "var(--muted)" }}
        >
          {t[lang].bundleCard.seeDetails}
        </button>
      </div>
    </article>
    </div>
  );
}
