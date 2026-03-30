"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Template, formatPrice, formatCount, templates, getDownloadType } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t, templateTranslations } from "@/lib/i18n";
import { useWishlist } from "@/lib/useWishlist";

type Lang = "it" | "en";

/* ── Platform accent colors ─────────────────────────────────────────── */
const PLATFORM_COLORS: Record<string, { from: string; to: string; label: string }> = {
  notion:    { from: "#2f3437", to: "#1a1a1a",   label: "Notion" },
  canva:     { from: "#7B61FF", to: "#4B3DB5",   label: "Canva" },
  excel:     { from: "#1D6F42", to: "#0d3d24",   label: "Excel" },
  sheets:    { from: "#0F9D58", to: "#086d3d",   label: "Sheets" },
  webflow:   { from: "#4353FF", to: "#2233cc",   label: "Webflow" },
  framer:    { from: "#0055FF", to: "#0033aa",   label: "Framer" },
  shopify:   { from: "#95BF47", to: "#5a7a1e",   label: "Shopify" },
  wordpress: { from: "#21759B", to: "#0e4a6e",   label: "WordPress" },
  html:      { from: "#9C7733", to: "#5c4219",   label: "HTML" },
};

/* ── Platform icon set ──────────────────────────────────────────────── */
function PlatformIcon({ type, size = 28 }: { type: string; size?: number }) {
  const s = size;
  if (type === "notion")
    return <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="3" width="20" height="22" rx="2" stroke="white" strokeWidth="1.8" strokeOpacity="0.9"/>
      <path d="M9 9h10M9 13h10M9 17h6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>;
  if (type === "canva")
    return <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.8" strokeOpacity="0.9"/>
      <path d="M9.5 14a4.5 4.5 0 009 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>;
  if (type === "shopify")
    return <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M19 8c-.2-1.3-1.4-2-2.4-2l-1.3 3.7M9.4 22l1.8-8.5M14.4 6l-5 16M19 8l-3 14" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85"/>
    </svg>;
  if (type === "wordpress")
    return <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.8" strokeOpacity="0.9"/>
      <path d="M4 14h20M14 4c-3 3-3 14 0 20M14 4c3 3 3 14 0 20" stroke="white" strokeWidth="1.4" strokeOpacity="0.6"/>
    </svg>;
  if (type === "webflow" || type === "framer")
    return <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="5" y="5" width="18" height="18" rx="2" stroke="white" strokeWidth="1.8" strokeOpacity="0.9"/>
      <path d="M5 11h18M11 11v12" stroke="white" strokeWidth="1.4" strokeOpacity="0.6"/>
    </svg>;
  if (type === "excel" || type === "sheets")
    return <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="2" stroke="white" strokeWidth="1.8" strokeOpacity="0.9"/>
      <path d="M4 11h20M4 17h20M11 4v20" stroke="white" strokeWidth="1.4" strokeOpacity="0.6"/>
    </svg>;
  // html default
  return <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M5 4l2 16 7 4 7-4 2-16H5z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" strokeOpacity="0.9"/>
    <path d="M9 10h10M10 14l8-0M11 18l6-0" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6"/>
  </svg>;
}

/* ── Lazy iframe thumbnail ──────────────────────────────────────────── */
function UIThumbnail({ template, isPurchased, lang }: { template: Template; isPurchased: boolean; lang: Lang }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const dlType = getDownloadType(template);
  const platformData = PLATFORM_COLORS[dlType] ?? PLATFORM_COLORS.html;
  const isExternal = dlType !== "html" && dlType !== "shopify" && dlType !== "wordpress";

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
    <div ref={containerRef} className="relative h-48 overflow-hidden" style={{ background: platformData.from }}>

      {/* For external platforms: elegant branded poster instead of raw iframe grid */}
      {isExternal ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            background: `linear-gradient(145deg, ${platformData.from} 0%, ${platformData.to} 100%)`,
          }}
        >
          {/* Decorative grid — subtle, not dominant */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }} />
          {/* Light orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, white, transparent)` }} />
          {/* Platform icon */}
          <div className="relative z-10 opacity-90 drop-shadow-lg">
            <PlatformIcon type={dlType} size={36} />
          </div>
          <p className="relative z-10 text-[11px] font-bold uppercase tracking-[0.18em] text-white opacity-70">
            {platformData.label}
          </p>
        </div>
      ) : (
        <>
          {/* Skeleton while loading */}
          {(!visible || !iframeLoaded) && (
            <div className="absolute inset-0 flex flex-col p-4 gap-3"
              style={{ background: `linear-gradient(145deg, ${platformData.from}cc, ${platformData.to}aa)` }}>
              <div className="h-3 w-2/3 skeleton-shimmer" style={{ opacity: 0.3 }} />
              <div className="h-2 w-full skeleton-shimmer" style={{ opacity: 0.2 }} />
              <div className="h-2 w-5/6 skeleton-shimmer" style={{ opacity: 0.2 }} />
              <div className="flex-1" />
              <div className="flex gap-2">
                <div className="h-6 w-20 skeleton-shimmer" style={{ opacity: 0.25 }} />
                <div className="h-6 w-16 skeleton-shimmer" style={{ opacity: 0.2 }} />
              </div>
            </div>
          )}
          {/* Scaled-down iframe preview */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: "scale(0.36)", transformOrigin: "top left", width: "278%", height: "278%" }}
          >
            {visible && (
              <iframe
                src={`/api/preview/${template.id}`}
                title={template.name}
                sandbox="allow-scripts"
                loading="lazy"
                className="w-full border-0"
                style={{ height: "530px" }}
                onLoad={() => setIframeLoaded(true)}
              />
            )}
          </div>
        </>
      )}

      {/* Bottom gradient overlay — elegant fade */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.72) 100%)",
        }} />

      {/* Purchased badge */}
      {isPurchased && <PurchasedBadge lang={lang} />}
    </div>
  );
}

function PurchasedBadge({ lang }: { lang: Lang }) {
  return (
    <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm"
      style={{ background: "var(--success)", color: "var(--bg)" }}>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2 6l2.8 3 5.2-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {lang === "it" ? "Acquistato" : "Purchased"}
    </span>
  );
}

/* ── Main card ──────────────────────────────────────────────────────── */
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


  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/preview/${template.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const editionNum = String(templates.findIndex((tt) => tt.id === template.id) + 1).padStart(3, "0");
  const downloadType = getDownloadType(template);

  return (
    <div className="group relative h-full transition-opacity duration-200 hover:opacity-90">
      <Link
        href={`/preview/${template.id}`}
        aria-label={displayName}
        className="glass relative overflow-hidden flex flex-col h-full active:opacity-90 block"
      >
        {/* Top accent strip */}
        <div className="h-[2px] w-full flex-shrink-0" style={{ background: "var(--accent)" }} />

        {/* Badges */}
        {isEditorsPick && !isPurchased && (
          <div className="absolute top-3 right-3 z-20 text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-[3px]"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}>
            {t[lang].card.editorsPick}
          </div>
        )}
        {isNew && !isPurchased && !isEditorsPick && (
          <div className="absolute top-3 right-3 z-20 text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-[3px]"
            style={{ fontFamily: "var(--font-syne)", background: "var(--terra, #C4622D)", color: "white" }}>
            {t[lang].card.isNew}
          </div>
        )}
        {isBestseller && !isPurchased && !isEditorsPick && !isNew && (
          <div className="absolute top-3 right-3 z-20 text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-[3px]"
            style={{ background: "var(--input-bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            Hot
          </div>
        )}
        {/* Edition badge */}
        <div className="absolute top-3 left-3 z-20 text-[11px] italic px-1.5 py-0.5"
          style={{ fontFamily: "var(--font-dm-serif), serif", color: "white", opacity: 0.8, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}>
          N° {editionNum}
        </div>

        {/* Thumbnail */}
        <div
          className="relative"
          onClick={(e) => { if (onQuickView) { e.preventDefault(); e.stopPropagation(); onQuickView(template.id); } }}
        >
          <UIThumbnail template={template} isPurchased={isPurchased} lang={lang} />
          {/* Quick-preview hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            <span className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 shadow-lg"
              style={{ background: "rgba(0,0,0,0.65)", color: "white", backdropFilter: "blur(8px)" }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <circle cx="6.5" cy="6.5" r="4.5" stroke="white" strokeWidth="1.4"/>
                <path d="M10 10l2.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              {lang === "it" ? "Anteprima →" : "Preview →"}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="px-4 py-3.5 flex flex-col flex-1" style={{ borderTop: "1px solid var(--border)" }}>
          {/* Category pill + platform badge */}
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="text-[9px] tracking-[0.12em] uppercase font-semibold px-1.5 py-[1px]"
              style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-muted)" }}>
              {t[lang].card.categoryUI}
            </span>
            {downloadType !== "html" && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-[2px]"
                style={{ background: `var(--platform-${downloadType})`, color: "white" }}>
                {downloadType}
              </span>
            )}
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

          {/* Price + actions row */}
          <div className="mt-2.5 pt-2.5 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
            <span className="text-[20px] italic" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)" }}>
              {formatPrice(template.price)}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-muted flex items-center gap-1 mr-1">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {formatCount(template.downloads)}
              </span>
              {/* Wishlist */}
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(template.id); }}
                aria-label={saved ? (lang === "it" ? "Rimuovi dai salvati" : "Remove") : (lang === "it" ? "Salva" : "Save")}
                className={`p-2 -m-1 min-w-[36px] min-h-[36px] flex items-center justify-center transition-all duration-150 ${
                  saved ? "opacity-100" : "sm:opacity-0 sm:group-hover:opacity-100 text-muted"
                }`}
                style={saved ? { color: "var(--terra)" } : undefined}
                onMouseEnter={(e) => { if (!saved) (e.currentTarget as HTMLElement).style.color = "var(--terra)"; }}
                onMouseLeave={(e) => { if (!saved) (e.currentTarget as HTMLElement).style.color = ""; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 12S1 8 1 4.5A3.5 3.5 0 017 2.1a3.5 3.5 0 016 2.4C13 8 7 12 7 12z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
                    fill={saved ? "currentColor" : "none"} />
                </svg>
              </button>
              {/* Share */}
              <button
                onClick={handleShare}
                aria-label={copied ? (lang === "it" ? "Copiato!" : "Copied!") : (lang === "it" ? "Copia link" : "Copy link")}
                title={copied ? (lang === "it" ? "Copiato!" : "Copied!") : (lang === "it" ? "Copia link" : "Copy link")}
                className="p-2 -m-1 min-w-[36px] min-h-[36px] flex items-center justify-center opacity-60 sm:opacity-0 sm:group-hover:opacity-100 hover:opacity-100 transition-all duration-150 text-muted hover:text-theme"
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
              {/* Arrow hint */}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden
                className="text-muted opacity-0 group-hover:opacity-50 group-hover:translate-x-0.5 transition-all duration-150">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
