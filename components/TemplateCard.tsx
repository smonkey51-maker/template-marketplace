"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Template, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t, templateTranslations } from "@/lib/i18n";

type Lang = "it" | "en";

function PromptThumbnail({ template, isPurchased, lang }: { template: Template; isPurchased: boolean; lang: Lang }) {
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
        <div className="font-mono text-[11px] text-[#1C1C1E] leading-relaxed line-clamp-4">
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span key={i} className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{part}</span>
            ) : <span key={i}>{part}</span>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/10 to-transparent" />
      {isPurchased && <PurchasedBadge lang={lang} />}
    </div>
  );
}

function UIThumbnail({ template, isPurchased, lang }: { template: Template; isPurchased: boolean; lang: Lang }) {
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
            sandbox="allow-scripts"
            className="w-full border-0"
            style={{ height: "530px" }}
          />
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.7) 100%)" }} />
      {isPurchased && <PurchasedBadge lang={lang} />}
    </div>
  );
}

function PurchasedBadge({ lang }: { lang: Lang }) {
  return (
    <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-full px-2.5 py-1 text-[11px] font-semibold">
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
      {lang === "it" ? "Acquistato" : "Purchased"}
    </span>
  );
}

export default function TemplateCard({ template, purchasedIds, onQuickView }: {
  template: Template;
  purchasedIds: string[];
  onQuickView?: (id: string) => void;
}) {
  const { lang } = useLang();
  const isPurchased = purchasedIds.includes(template.id);
  const isBestseller = template.downloads >= 700;
  const isEditorsPick = template.editorsPick === true;
  const isNew = template.isNew === true;
  const displayName = lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
  const displayDesc = lang === "it" ? (templateTranslations[template.id]?.description ?? template.description) : template.description;

  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/preview/${template.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <Link
      href={`/preview/${template.id}`}
      aria-label={displayName}
      className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-full
        transition-shadow duration-200
        hover:shadow-lg
        active:opacity-90"
    >
      {/* Editor's Pick badge (takes priority over bestseller) */}
      {isEditorsPick && !isPurchased && (
        <div className="absolute top-2.5 right-2.5 z-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full px-2 py-0.5 text-[10px] font-bold">
          {t[lang].card.editorsPick}
        </div>
      )}
      {/* Bestseller badge */}
      {isBestseller && !isPurchased && !isEditorsPick && (
        <div className="absolute top-2.5 right-2.5 z-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full px-2 py-0.5 text-[10px] font-bold">
          {t[lang].card.bestseller}
        </div>
      )}
      {/* New badge */}
      {isNew && !isPurchased && !isEditorsPick && !isBestseller && (
        <div className="absolute top-2.5 left-2.5 z-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full px-2 py-0.5 text-[10px] font-bold">
          {t[lang].card.isNew}
        </div>
      )}

      <div
        className="relative"
        onClick={(e) => { if (onQuickView) { e.preventDefault(); e.stopPropagation(); onQuickView(template.id); } }}
      >
        {template.category === "ui"
          ? <UIThumbnail template={template} isPurchased={isPurchased} lang={lang} />
          : <PromptThumbnail template={template} isPurchased={isPurchased} lang={lang} />
        }
        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-white/90 dark:bg-black/80 text-zinc-900 dark:text-zinc-100 text-[12px] font-bold px-4 py-2 rounded-xl shadow-sm">
            {lang === "it" ? "Anteprima rapida →" : "Quick preview →"}
          </span>
        </div>
      </div>

      <div className="px-4 py-3.5 flex flex-col flex-1">
        {/* Category pill */}
        <div className="mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            {template.category === "ui" ? t[lang].card.categoryUI : t[lang].card.categoryPrompt}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-200 mb-1">
          {displayName}
        </h3>

        {/* Description — 1 line, gives context without clicking */}
        <p className="text-[12px] text-muted leading-snug line-clamp-1 flex-1">
          {displayDesc}
        </p>

        {/* Price + downloads */}
        <div className="mt-2.5 pt-2.5 border-t border-theme flex items-center justify-between">
          <span className="text-[16px] font-bold text-zinc-900 dark:text-white">{formatPrice(template.price)}</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {template.downloads.toLocaleString(lang === "it" ? "it-IT" : "en-US")}
            </span>
            {/* Share button */}
            <button
              onClick={handleShare}
              aria-label={copied ? "Link copiato" : "Copia link"}
              className={`opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg p-1 -mr-0.5
                ${copied ? "text-zinc-900 dark:text-zinc-100" : "text-muted hover:text-theme"}`}
            >
              {copied ? (
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <circle cx="11" cy="3" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="3" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="11" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M4.7 6.1l4.6-2.3M4.7 7.9l4.6 2.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              )}
            </button>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
              className="text-muted opacity-0 group-hover:opacity-60 transition-opacity duration-200 group-hover:translate-x-0.5 transition-transform">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
