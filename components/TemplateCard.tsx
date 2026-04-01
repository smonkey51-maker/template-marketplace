"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Template, formatPrice, getDownloadType } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { templateTranslations } from "@/lib/i18n";
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
    <div ref={containerRef} className="relative h-52 overflow-hidden" style={{ background: platformData.from }}>

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
  const displayName = lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
  const displayDesc = lang === "it" ? (templateTranslations[template.id]?.description ?? template.description) : template.description;
  const saved = isWishlisted(template.id);

  return (
    <div className="group relative h-full transition-opacity duration-200 hover:opacity-90">
      <Link
        href={`/preview/${template.id}`}
        aria-label={displayName}
        className="shoji-card bg-card border border-theme relative overflow-hidden flex flex-col h-full active:opacity-90 block"
      >

        {/* Thumbnail */}
        <div
          className="relative"
          onClick={(e) => { if (onQuickView) { e.preventDefault(); e.stopPropagation(); onQuickView(template.id); } }}
        >
          <UIThumbnail template={template} isPurchased={isPurchased} lang={lang} />
          {/* Hover overlay — quick view label (Mobbin-style) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-250 pointer-events-none flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-bold uppercase tracking-widest text-white/90 border border-white/30 px-3 py-1.5"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
              {lang === "it" ? "Anteprima" : "Preview"}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="px-4 py-4 flex flex-col flex-1" style={{ borderTop: "1px solid var(--border)" }}>
          {/* Name */}
          <h3 className="text-[13px] font-semibold leading-snug mb-1.5 tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}>
            {displayName}
          </h3>

          {/* Description — one line only, visual is the protagonist */}
          <p className="text-[11px] font-light leading-snug line-clamp-1 flex-1 opacity-70" style={{ color: "var(--muted)" }}>
            {displayDesc}
          </p>

          {/* Price + wishlist */}
          <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
            <span className="text-[18px]" style={{ fontFamily: "var(--font-jakarta), sans-serif", fontWeight: 600, color: "var(--accent)" }}>
              {template.price === 0 ? (lang === "it" ? "Gratis" : "Free") : formatPrice(template.price)}
            </span>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(template.id); }}
              aria-label={saved ? (lang === "it" ? "Rimuovi dai salvati" : "Remove from saved") : (lang === "it" ? "Salva" : "Save")}
              className={`transition-colors duration-200 p-1 ${
                saved ? "text-[var(--terra)]" : "text-muted hover:text-[var(--terra)] opacity-0 group-hover:opacity-100"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 12S1 8 1 4.5A3.5 3.5 0 017 2.1a3.5 3.5 0 016 2.4C13 8 7 12 7 12z"
                  stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
                  fill={saved ? "currentColor" : "none"} />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
