"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Template, formatPrice, templates } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t, templateTranslations } from "@/lib/i18n";
import { useWishlist } from "@/lib/useWishlist";

type Lang = "it" | "en";

function PromptThumbnail({ template, isPurchased, lang }: { template: Template; isPurchased: boolean; lang: Lang }) {
  const preview = template.content.slice(0, 180);
  const parts = preview.split(/({{[^}]+}})/g);
  return (
    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] p-3 flex items-start">
      <div className="w-full bg-[#FFFEF7] rounded-none shadow-lg p-3 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="font-mono text-[11px] text-[#1C1C1E] leading-relaxed line-clamp-4">
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span key={i} className="rounded px-0.5 font-semibold" style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>{part}</span>
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
    <div ref={containerRef} className="relative h-48 overflow-hidden" style={{ background: "var(--surface)" }}>
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
        style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.6) 100%)" }} />
      {isPurchased && <PurchasedBadge lang={lang} />}
    </div>
  );
}

function PurchasedBadge({ lang }: { lang: Lang }) {
  return (
    <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-emerald-500/90 text-white rounded-none px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2 6l2.8 3 5.2-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
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
  const { toggle, isWishlisted } = useWishlist();
  const isPurchased = purchasedIds.includes(template.id);
  const isBestseller = template.downloads >= 700;
  const isEditorsPick = template.editorsPick === true;
  const isNew = template.isNew === true;
  const displayName = lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
  const displayDesc = lang === "it" ? (templateTranslations[template.id]?.description ?? template.description) : template.description;
  const saved = isWishlisted(template.id);

  const [copied, setCopied] = useState(false);

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

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/preview/${template.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // N° edition index — based on sorted position
  const editionNum = String(templates.findIndex((tt) => tt.id === template.id) + 1).padStart(3, "0");

  // Category strip color
  const stripColor = template.category === "prompt" ? "var(--terra, #C4622D)" : "var(--accent)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full transition-[transform,box-shadow] duration-150"
      style={{ willChange: 'transform' }}
    >
    <Link
      href={`/preview/${template.id}`}
      aria-label={displayName}
      className="glass relative overflow-hidden flex flex-col h-full active:opacity-90 block"
    >
      {/* Hybrid category color strip */}
      <div className="h-[2px] w-full flex-shrink-0" style={{ background: stripColor }} />

      {/* Editor's Pick badge — gold */}
      {isEditorsPick && !isPurchased && (
        <div className="absolute top-3 right-3 z-10 text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-[3px]"
          style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}>
          {t[lang].card.editorsPick}
        </div>
      )}
      {/* New badge — terra */}
      {isNew && !isPurchased && !isEditorsPick && (
        <div className="absolute top-3 right-3 z-10 text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-[3px]"
          style={{ fontFamily: "var(--font-syne)", background: "var(--terra, #C4622D)", color: "white" }}>
          {t[lang].card.isNew}
        </div>
      )}
      {/* Bestseller badge — muted glass */}
      {isBestseller && !isPurchased && !isEditorsPick && !isNew && (
        <div className="absolute top-3 right-3 z-10 text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-[3px]"
          style={{ background: "var(--input-bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
          Hot
        </div>
      )}
      {/* N° edition badge — top-left */}
      <div className="absolute top-3 left-3 z-10 text-[11px] italic px-1.5 py-0.5"
        style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)", opacity: 0.75, background: "var(--surface-2)", backdropFilter: "blur(4px)" }}>
        N° {editionNum}
      </div>

      <div
        className="relative"
        onClick={(e) => { if (onQuickView) { e.preventDefault(); e.stopPropagation(); onQuickView(template.id); } }}
      >
        {template.category === "ui"
          ? <UIThumbnail template={template} isPurchased={isPurchased} lang={lang} />
          : <PromptThumbnail template={template} isPurchased={isPurchased} lang={lang} />
        }
        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none">
          <span className="text-[12px] font-bold px-4 py-2 rounded-none shadow-sm"
            style={{ background: "var(--surface-2)", color: "var(--text)", backdropFilter: "blur(8px)" }}>
            {lang === "it" ? "Anteprima rapida →" : "Quick preview →"}
          </span>
        </div>
      </div>

      <div className="px-4 py-3.5 flex flex-col flex-1" style={{ borderTop: "1px solid var(--border)" }}>
        {/* Category line */}
        <div className="mb-1">
          <span className="text-[9px] tracking-[0.14em] uppercase font-medium" style={{ color: "var(--muted)" }}>
            {template.category === "ui" ? t[lang].card.categoryUI : t[lang].card.categoryPrompt}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-[14px] font-bold leading-snug mb-1 tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}>
          {displayName}
        </h3>

        {/* Description */}
        <p className="text-[12px] font-light leading-snug line-clamp-1 flex-1" style={{ color: "var(--muted)" }}>
          {displayDesc}
        </p>

        {/* Price + downloads */}
        <div className="mt-2.5 pt-2.5 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <span
            className="text-[20px] italic"
            style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)" }}
          >
            {formatPrice(template.price)}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {template.downloads.toLocaleString(lang === "it" ? "it-IT" : "en-US")}
            </span>
            {/* Wishlist button */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(template.id); }}
              aria-label={saved ? (lang === "it" ? "Rimuovi dai salvati" : "Remove from saved") : (lang === "it" ? "Salva" : "Save")}
              className={`transition-all duration-100 rounded-lg p-1 ${
                saved
                  ? "text-[#FF453A] opacity-100"
                  : "opacity-0 group-hover:opacity-100 text-muted hover:text-[#FF453A]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 12S1 8 1 4.5A3.5 3.5 0 017 2.1a3.5 3.5 0 016 2.4C13 8 7 12 7 12z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
                  fill={saved ? "currentColor" : "none"} />
              </svg>
            </button>
            {/* Share button */}
            <button
              onClick={handleShare}
              aria-label={copied ? "Link copiato" : "Copia link"}
              className={`opacity-0 group-hover:opacity-100 transition-all duration-100 rounded-lg p-1 -mr-0.5 text-muted hover:text-theme`}
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
              className="text-muted opacity-0 group-hover:opacity-60 transition-opacity duration-100 group-hover:translate-x-0.5 transition-transform">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
    </div>
  );
}
