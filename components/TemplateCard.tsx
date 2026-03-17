"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Template, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

function PromptThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  const preview = template.content.slice(0, 180);
  const parts = preview.split(/({{[^}]+}})/g);
  return (
    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] p-3 flex items-start">
      <div className="w-full bg-[#FFFEF7] rounded-xl shadow-lg p-3 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="font-mono text-[9.5px] text-[#1C1C1E] leading-relaxed line-clamp-5">
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span key={i} className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{part}</span>
            ) : <span key={i}>{part}</span>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/10 to-transparent" />
      {isPurchased && <PurchasedBadge />}
    </div>
  );
}

function UIThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-48 overflow-hidden bg-gray-950">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: "scale(0.36)", transformOrigin: "top left", width: "278%", height: "278%" }}
      >
        {visible && (
          <iframe
            src={`/api/preview/${template.id}`}
            title={template.name}
            className="w-full border-0"
            style={{ height: "530px" }}
          />
        )}
      </div>
      {/* Better gradient: transparent top, heavy bottom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.7) 100%)" }} />
      {isPurchased && <PurchasedBadge />}
    </div>
  );
}

function PurchasedBadge() {
  return (
    <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-[#30D158]/20 text-[#30D158] border border-[#30D158]/30 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
      Acquistato
    </span>
  );
}

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
      className="group relative glass-subtle rounded-[22px] overflow-hidden flex flex-col h-full
        transition-all duration-300 ease-premium
        hover:-translate-y-1
        hover:shadow-[0_16px_48px_rgba(0,0,0,0.15),0_0_0_1px_rgba(10,132,255,0.15)]
        active:scale-[0.98] active:opacity-90"
    >
      {/* Bestseller badge */}
      {isBestseller && !isPurchased && (
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-[#FF9F0A]/20 text-[#FF9F0A] border border-[#FF9F0A]/30 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm">
          ⭐ {t[lang].card.bestseller}
        </div>
      )}

      {template.category === "ui"
        ? <UIThumbnail template={template} isPurchased={isPurchased} />
        : <PromptThumbnail template={template} isPurchased={isPurchased} />
      }

      <div className="px-4 py-3.5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-md ${
            template.category === "ui"
              ? "bg-[#007AFF]/10 text-[#007AFF]"
              : "bg-[#5E5CE6]/10 text-[#5E5CE6]"
          }`}>
            {template.category === "ui" ? t[lang].card.categoryUI : t[lang].card.categoryPrompt}
          </span>
        </div>
        <h3 className="text-[13.5px] font-semibold text-theme leading-snug group-hover:text-[#0A84FF] transition-colors duration-200 flex-1">
          {template.name}
        </h3>
        <div className="mt-2.5 pt-2.5 border-t border-theme flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#0A84FF]">{formatPrice(template.price)}</span>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-muted flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="opacity-50">
                <path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {template.downloads.toLocaleString("it-IT")}
            </span>
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              className="text-muted opacity-0 group-hover:opacity-60 transition-opacity duration-200 translate-x-0 group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
