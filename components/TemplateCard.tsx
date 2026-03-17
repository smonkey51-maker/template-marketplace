"use client";

import Link from "next/link";
import { Template, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

/* ─── Prompt thumbnail ─── */
function PromptThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  const preview = template.content.slice(0, 160);
  const parts = preview.split(/({{[^}]+}})/g);
  return (
    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] p-3 flex items-start">
      <div className="w-full bg-[#FFFEF7] rounded-xl shadow-lg p-3 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="font-mono text-[10px] text-[#1C1C1E] leading-relaxed line-clamp-4">
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span key={i} className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{part}</span>
            ) : <span key={i}>{part}</span>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/20 to-transparent" />
      {isPurchased && <PurchasedBadge />}
    </div>
  );
}

/* ─── UI thumbnail ─── */
function UIThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  return (
    <div className="relative h-44 overflow-hidden bg-gray-950">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: "scale(0.38)", transformOrigin: "top left", width: "263%", height: "263%" }}
      >
        <iframe
          src={`/api/preview/${template.id}`}
          title={template.name}
          className="w-full border-0"
          style={{ height: "460px" }}
        />
      </div>
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
      {isPurchased && <PurchasedBadge />}
    </div>
  );
}

function PurchasedBadge() {
  return (
    <span className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
      Acquistato
    </span>
  );
}

/* ─── Main ─── */
export default function TemplateCard({ template, purchasedIds }: {
  template: Template;
  purchasedIds: string[];
}) {
  const { lang } = useLang();
  const isPurchased = purchasedIds.includes(template.id);
  const isBestseller = template.downloads >= 700;

  return (
    <Link
      href={`/preview/${template.id}`}
      className="group glass-subtle rounded-[24px] overflow-hidden flex flex-col h-full
        transition-all duration-350 ease-premium
        hover:-translate-y-1.5
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.18),0_0_0_1px_rgba(10,132,255,0.12)]
        active:scale-[0.97] active:opacity-90"
    >
      {/* Bestseller badge */}
      {isBestseller && !isPurchased && (
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-[#FF9F0A]/20 text-[#FF9F0A] border border-[#FF9F0A]/30 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm">
          {t[lang].card.bestseller}
        </div>
      )}

      {template.category === "ui"
        ? <UIThumbnail template={template} isPurchased={isPurchased} />
        : <PromptThumbnail template={template} isPurchased={isPurchased} />
      }

      <div className="px-4 py-3.5 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] mb-1">
          {template.category === "ui" ? t[lang].card.categoryUI : t[lang].card.categoryPrompt}
        </span>
        <h3 className="text-[14px] font-semibold text-theme leading-snug group-hover:text-[#0A84FF] transition-colors duration-200">
          {template.name}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#0A84FF]">{formatPrice(template.price)}</span>
          <span className="text-[11px] text-muted flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" className="opacity-60"><path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            {template.downloads.toLocaleString("it-IT")}
          </span>
        </div>
      </div>
    </Link>
  );
}
