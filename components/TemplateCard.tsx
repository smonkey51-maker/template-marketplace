"use client";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
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
  html:      { from: "#C49A3C", to: "#7A5220",   label: "HTML" },
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

/* ── Platform-faithful mini-preview mockups ────────────────────────── */
function PlatformPreview({ type }: { type: string }) {
  if (type === "canva") return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#ffffff" }}>
      {/* Canva toolbar */}
      <div className="shrink-0 flex items-center px-2 gap-1.5" style={{ height: "26px", background: "#7B61FF" }}>
        <div className="flex gap-0.5">
          {[24, 32, 20].map((w, i) => <div key={i} className="h-2.5 rounded-sm" style={{ width: w, background: "rgba(255,255,255,0.35)" }} />)}
        </div>
        <div className="flex-1 mx-2 h-3.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
        <div className="w-12 h-4.5 rounded" style={{ background: "rgba(255,255,255,0.2)" }} />
      </div>
      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-9 shrink-0 flex flex-col items-center gap-2 pt-2" style={{ background: "#F0EDFF", borderRight: "1px solid #E0DBF5" }}>
          {["#7B61FF", "#C5BCEE", "#C5BCEE", "#C5BCEE", "#C5BCEE"].map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-md" style={{ background: c }} />
          ))}
        </div>
        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-2" style={{ background: "#F0EDFF" }}>
          <div className="relative shadow-sm" style={{ width: "78%", height: "90%", background: "#fff", border: "1px solid #ddd6fe" }}>
            <div className="absolute inset-x-3 top-3 h-4 rounded-sm" style={{ background: "#7B61FF" }} />
            <div className="absolute left-3 top-9 w-16 h-2 rounded-sm" style={{ background: "#d1d5db" }} />
            <div className="absolute left-3 top-13 w-12 h-1.5 rounded-sm" style={{ background: "#e5e7eb" }} />
            <div className="absolute bottom-4 left-3 flex gap-1.5">
              {["#7B61FF","#F472B6","#FBBF24"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-md" style={{ background: c }} />
              ))}
            </div>
            <div className="absolute bottom-4 right-3 w-8 h-14 rounded-md" style={{ background: "#E0DBF5" }} />
          </div>
        </div>
      </div>
    </div>
  );

  if (type === "notion") return (
    <div className="absolute inset-0 flex overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Sidebar */}
      <div className="w-16 shrink-0 flex flex-col px-2 pt-3 gap-1.5" style={{ background: "#F7F6F3", borderRight: "1px solid #E9E9E7" }}>
        <div className="w-8 h-2.5 rounded-sm mb-1" style={{ background: "#C9C9C7" }} />
        {[1,0,0,1,0,0,0].map((active, i) => (
          <div key={i} className="flex items-center gap-1 px-1 py-0.5 rounded-sm" style={{ background: active ? "#E9E9E7" : "transparent" }}>
            <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: active ? "#37352F" : "#C9C9C7" }} />
            <div className="h-1.5 flex-1 rounded-sm" style={{ background: active ? "#37352F" : "#C9C9C7", opacity: active ? 0.7 : 0.4 }} />
          </div>
        ))}
      </div>
      {/* Document */}
      <div className="flex-1 px-3 py-4 overflow-hidden">
        <div className="flex items-start gap-1.5 mb-3">
          <span style={{ fontSize: "16px", lineHeight: 1 }}>📋</span>
          <div className="h-4 w-24 rounded-sm mt-0.5" style={{ background: "#37352F", opacity: 0.85 }} />
        </div>
        <div className="h-2 w-20 rounded-sm mb-3" style={{ background: "#37352F", opacity: 0.25 }} />
        {[92, 75, 88, 60, 80, 66, 72].map((w, i) => (
          <div key={i} className="h-1.5 rounded-sm mb-1.5" style={{ width: `${w}%`, background: "#37352F", opacity: i % 4 === 0 ? 0.2 : 0.1 }} />
        ))}
        <div className="mt-2 p-2 rounded-sm" style={{ background: "#F7F6F3", border: "1px solid #E9E9E7" }}>
          {[100, 85, 60].map((w, i) => <div key={i} className="h-1.5 rounded-sm mb-1" style={{ width: `${w}%`, background: "#37352F", opacity: 0.12 }} />)}
        </div>
      </div>
    </div>
  );

  if (type === "excel" || type === "sheets") {
    const accent = type === "excel" ? "#1D6F42" : "#0F9D58";
    const cols = ["A","B","C","D","E"];
    const rowColors = [
      [accent, accent, accent, accent, accent],
      [null, null, null, null, null],
      [`${accent}22`, null, null, `${accent}22`, null],
      [null, null, null, null, null],
      [`${accent}14`, null, null, `${accent}14`, null],
      [null, null, null, null, null],
    ];
    return (
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "#ffffff" }}>
        {/* App header */}
        <div className="shrink-0 flex items-center px-2 gap-1.5" style={{ height: "22px", background: accent }}>
          <div className="w-3.5 h-3.5 rounded-sm" style={{ background: "rgba(255,255,255,0.4)" }} />
          <div className="flex-1 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.2)" }} />
          <div className="flex gap-0.5">{[0,1,2].map(i => <div key={i} className="w-2.5 h-2 rounded-sm opacity-60" style={{ background: "white" }} />)}</div>
        </div>
        {/* Ribbon */}
        <div className="shrink-0 flex items-center px-2 gap-1 border-b" style={{ height: "20px", background: "#f9fafb", borderColor: "#e5e7eb" }}>
          {["File","Inserisci","Formule","Dati"].map(l => <span key={l} style={{ fontSize: "7px", color: "#374151" }}>{l}</span>)}
        </div>
        {/* Col headers */}
        <div className="shrink-0 flex" style={{ height: "15px", background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
          <div className="w-8 shrink-0 border-r" style={{ borderColor: "#e5e7eb" }} />
          {cols.map(c => (
            <div key={c} className="flex-1 flex items-center justify-center border-r" style={{ fontSize: "7px", color: "#6b7280", borderColor: "#e5e7eb" }}>{c}</div>
          ))}
        </div>
        {/* Rows */}
        {rowColors.map((row, ri) => (
          <div key={ri} className="flex shrink-0" style={{ height: "20px", borderBottom: "1px solid #f3f4f6" }}>
            <div className="w-8 shrink-0 flex items-center justify-center border-r" style={{ background: "#f3f4f6", fontSize: "7px", color: "#9ca3af", borderColor: "#e5e7eb" }}>{ri + 1}</div>
            {row.map((bg, ci) => (
              <div key={ci} className="flex-1 border-r" style={{ background: bg ?? "transparent", borderColor: "#f3f4f6" }}>
                {ri === 0 && <div className="h-full w-full flex items-center justify-center" style={{ fontSize: "7px", color: "white", fontWeight: 600 }}>{["Prodotto","Q1","Q2","Q3","Tot."][ci]}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === "webflow" || type === "framer") {
    const isDark = type === "framer";
    const bg = isDark ? "#0F0F0F" : "#1A1A2E";
    const panel = isDark ? "#1A1A1A" : "#16213E";
    const accent2 = isDark ? "#0055FF" : "#4353FF";
    return (
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: bg }}>
        {/* App header */}
        <div className="shrink-0 flex items-center px-2 gap-2" style={{ height: "24px", background: panel }}>
          <div className="flex gap-0.5">{[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full" style={{ background: ["#FF5F57","#FFBD2E","#28C840"][i] }} />)}</div>
          <div className="flex-1 h-2.5 rounded-full mx-4" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="w-10 h-4 rounded-sm" style={{ background: accent2 }} />
        </div>
        {/* Main panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left layers */}
          <div className="w-12 shrink-0 pt-2 px-1 flex flex-col gap-1" style={{ background: panel, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            {[1,0,0,1,0,0].map((a, i) => (
              <div key={i} className="flex items-center gap-1 px-1 py-0.5 rounded-sm" style={{ background: a ? "rgba(255,255,255,0.08)" : "transparent" }}>
                <div className="w-2 h-2 rounded-sm" style={{ background: a ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }} />
                <div className="flex-1 h-1.5 rounded-sm" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>
            ))}
          </div>
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-3" style={{ background: isDark ? "#141414" : "#0D0D1F" }}>
            <div className="relative" style={{ width: "80%", height: "85%", background: "white", borderRadius: "2px", boxShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
              <div className="absolute inset-x-0 top-0 h-6" style={{ background: isDark ? "#1E1E1E" : bg }} />
              <div className="absolute top-8 left-3 right-3 h-3 rounded-sm" style={{ background: accent2, opacity: 0.85 }} />
              <div className="absolute top-13 left-3 w-16 h-1.5 rounded-sm" style={{ background: "#e5e7eb" }} />
              <div className="absolute bottom-3 left-3 right-3 h-6 rounded-sm" style={{ background: accent2, opacity: 0.15 }} />
            </div>
          </div>
          {/* Right properties */}
          <div className="w-12 shrink-0 pt-2 px-1 flex flex-col gap-1.5" style={{ background: panel, borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            {[40, 30, 40, 30, 35].map((w, i) => (
              <div key={i} className="h-1.5 rounded-sm" style={{ width: `${w + 16}px`, maxWidth: "100%", background: "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "shopify") return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "#F6F6F7" }}>
      {/* Admin header */}
      <div className="shrink-0 flex items-center px-3 gap-2" style={{ height: "26px", background: "#1A1A1A" }}>
        <div className="w-4 h-4 rounded-sm" style={{ background: "#95BF47" }} />
        <div className="flex gap-2">
          {[28, 22, 26].map((w, i) => <div key={i} className="h-2 rounded-sm opacity-50" style={{ width: w, background: "white" }} />)}
        </div>
      </div>
      {/* Store page */}
      <div className="flex-1 flex flex-col" style={{ background: "#fff", margin: "4px", borderRadius: "2px", border: "1px solid #E4E5E7" }}>
        {/* Product image */}
        <div className="shrink-0" style={{ height: "80px", background: "#f3f4f6" }}>
          <div className="h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded" style={{ background: "#e5e7eb" }} />
          </div>
        </div>
        {/* Product info */}
        <div className="px-3 py-2 flex flex-col gap-1.5">
          <div className="h-3 w-24 rounded-sm" style={{ background: "#1A1A1A", opacity: 0.8 }} />
          <div className="h-2.5 w-12 rounded-sm" style={{ background: "#95BF47" }} />
          <div className="h-1.5 w-32 rounded-sm" style={{ background: "#d1d5db" }} />
          <div className="h-1.5 w-28 rounded-sm" style={{ background: "#d1d5db" }} />
          <div className="mt-1 h-6 rounded-sm flex items-center justify-center" style={{ background: "#95BF47" }}>
            <div className="h-2 w-16 rounded-sm" style={{ background: "rgba(255,255,255,0.8)" }} />
          </div>
        </div>
      </div>
    </div>
  );

  if (type === "wordpress") return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "#f0f0f1" }}>
      {/* WP Admin bar */}
      <div className="shrink-0 flex items-center px-2 gap-1.5" style={{ height: "22px", background: "#1d2327" }}>
        <div className="w-3.5 h-3.5 rounded-sm" style={{ background: "#21759B" }} />
        {[28, 20, 24].map((w, i) => <div key={i} className="h-2 rounded-sm opacity-50" style={{ width: w, background: "white" }} />)}
      </div>
      {/* Dashboard split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-14 shrink-0 pt-2 flex flex-col gap-0.5" style={{ background: "#1d2327" }}>
          {[1,0,0,0,0,0].map((a, i) => (
            <div key={i} className="flex items-center gap-1 mx-1 px-1 py-1 rounded-sm" style={{ background: a ? "#2271b1" : "transparent" }}>
              <div className="w-2 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.4)" }} />
              <div className="flex-1 h-1.5 rounded-sm" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1 p-2 overflow-hidden">
          <div className="h-3.5 w-24 rounded-sm mb-2" style={{ background: "#1d2327", opacity: 0.7 }} />
          {[
            { w: "100%", h: 32 },
            { w: "70%", h: 12 },
            { w: "85%", h: 12 },
          ].map(({ w, h }, i) => (
            <div key={i} className="rounded-sm mb-1.5" style={{ width: w, height: h, background: i === 0 ? "#2271b1" : "white", border: i > 0 ? "1px solid #dcdcde" : "none" }} />
          ))}
          <div className="mt-2 grid grid-cols-2 gap-1">
            {[0,1,2,3].map(i => <div key={i} className="h-10 rounded-sm" style={{ background: "white", border: "1px solid #dcdcde" }} />)}
          </div>
        </div>
      </div>
    </div>
  );

  // fallback
  const p = PLATFORM_COLORS[type] ?? PLATFORM_COLORS.html;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }}>
      <PlatformIcon type={type} size={36} />
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white opacity-70">{p.label}</p>
    </div>
  );
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

      {/* For external platforms: faithful mini-preview of each platform's UI */}
      {isExternal ? (
        <div className="absolute inset-0 overflow-hidden">
          <PlatformPreview type={dlType} />
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

      {/* Platform badge — top-left */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 px-1.5 py-0.5"
        style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/90">{platformData.label}</span>
      </div>

      {/* isNew / editorsPick badge — top-right */}
      {(template.isNew || template.editorsPick) && (
        <div className="absolute top-2 right-2 z-20 px-1.5 py-0.5"
          style={{
            background: template.editorsPick ? "var(--accent)" : "rgba(0,0,0,0.48)",
            backdropFilter: "blur(6px)",
            border: template.editorsPick ? "none" : "1px solid rgba(255,255,255,0.18)",
          }}>
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/95">
            {template.editorsPick ? (lang === "it" ? "✦ Staff" : "✦ Staff Pick") : (lang === "it" ? "Nuovo" : "New")}
          </span>
        </div>
      )}

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

/* ── Spotlight hook — tracks mouse relative to card, outputs a CSS radial gradient ── */
function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setStyle({
      background: `radial-gradient(circle at ${x}% ${y}%, var(--glow-gold) 0%, transparent 65%)`,
      opacity: 1,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle({ opacity: 0 });
  }, []);

  return { ref, spotlightStyle: style, onMouseMove, onMouseLeave };
}

/* ── Main card ──────────────────────────────────────────────────────── */
export default function TemplateCard({ template, purchasedIds, onQuickView }: {
  template: Template;
  purchasedIds: string[];
  onQuickView?: (id: string) => void;
}) {
  const { lang } = useLang();
  const { toggle, isWishlisted } = useWishlist();
  const [heartPopping, setHeartPopping] = useState(false);
  const isPurchased = purchasedIds.includes(template.id);
  const displayName = lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
  const displayDesc = lang === "it" ? (templateTranslations[template.id]?.description ?? template.description) : template.description;
  const saved = isWishlisted(template.id);
  const { ref: spotlightRef, spotlightStyle, onMouseMove, onMouseLeave } = useSpotlight();

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(template.id);
    setHeartPopping(true);
    setTimeout(() => setHeartPopping(false), 400);
  }, [toggle, template.id]);

  return (
    <div
      ref={spotlightRef}
      className="group relative h-full transition-all duration-300 ease-premium hover:-translate-y-0.5"
      style={{ "--card-hover-shadow": "0 16px 48px rgba(0,0,0,0.22)" } as React.CSSProperties}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight overlay — rendered outside the Link to avoid z-index conflicts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={spotlightStyle}
      />
      <Link
        href={`/preview/${template.id}`}
        aria-label={displayName}
        className="shoji-card card-sweep card-tilt shine-sweep bg-card border border-theme relative overflow-hidden flex flex-col h-full active:opacity-90 block transition-shadow duration-300 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)]"
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
            <span className="display-serif text-[22px] leading-none" style={{ color: "var(--accent)" }}>
              {template.price === 0 ? (lang === "it" ? "Gratis" : "Free") : formatPrice(template.price)}
            </span>
            <button
              onClick={handleWishlist}
              aria-label={saved ? (lang === "it" ? "Rimuovi dai salvati" : "Remove from saved") : (lang === "it" ? "Salva" : "Save")}
              className={`p-1 transition-colors duration-200 ${
                saved ? "text-[var(--terra)]" : "text-muted hover:text-[var(--terra)] opacity-0 group-hover:opacity-100"
              }`}
              style={heartPopping ? { animation: "heart-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" } : undefined}
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
