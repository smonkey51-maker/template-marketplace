"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getTemplate, formatPrice, formatCount, getDownloadType } from "@/lib/templates";
import DownloadButton from "@/components/DownloadButton";
import RelatedTemplates from "@/components/RelatedTemplates";

import { useLang } from "@/components/LanguageProvider";
import { t, templateTranslations } from "@/lib/i18n";
import { useToast } from "@/components/Toast";
import { useWishlist } from "@/lib/useWishlist";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

/** Responsive phone mockup: scales down the 390px iframe to fit narrow viewports */
function PhoneFrame({ templateId, templateName }: { templateId: string; templateName: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setScale(available < 390 ? available / 390 : 1);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const PHONE_W = 390;
  const PHONE_H = 844; // approximate full frame height

  return (
    /* Outer wrapper: actual rendered size after scaling */
    <div
      ref={wrapRef}
      style={{
        width: "390px",
        maxWidth: "calc(100vw - 32px)",
        height: `${PHONE_H * scale}px`,
        flexShrink: 0,
      }}
    >
      {/* Inner wrapper: always 390px, scaled down via transform */}
      <div
        style={{
          width: `${PHONE_W}px`,
          transformOrigin: "top left",
          transform: scale < 1 ? `scale(${scale})` : undefined,
        }}
      >
        {/* Bezel ring */}
        <div
          className="relative rounded-[48px] overflow-hidden"
          style={{
            boxShadow: `0 0 0 10px var(--bezel-ring), 0 0 0 11px var(--bezel-ring-2), 0 40px 120px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.5)`,
            background: "var(--bezel-bg)",
          }}
        >
          {/* Notch / Dynamic Island */}
          <div className="relative flex items-center justify-between px-6 pt-3 pb-2" style={{ background: "var(--bezel-notch-bg)" }}>
            <span className="text-[11px] font-semibold text-theme opacity-80">9:41</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 rounded-full border" style={{ background: "var(--bezel-notch-bg)", borderColor: "var(--bezel-notch-border)" }} />
            <div className="flex items-center gap-1 opacity-80">
              <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor" className="text-theme">
                <rect x="0" y="3" width="2.5" height="7" rx="0.5"/><rect x="3.5" y="2" width="2.5" height="8" rx="0.5"/><rect x="7" y="0.5" width="2.5" height="9.5" rx="0.5"/><rect x="10.5" y="0" width="3.5" height="10" rx="0.5" opacity="0.35"/>
              </svg>
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-theme">
                <rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
                <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="currentColor"/>
                <path d="M21.5 4v4a2 2 0 000-4z" fill="currentColor" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Iframe — always 390px wide so mobile breakpoints fire correctly */}
          <div style={{ height: "780px", overflowY: "scroll", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            <iframe
              src={`/api/preview/${templateId}`}
              title={templateName}
              sandbox="allow-scripts"
              scrolling="yes"
              style={{ width: "390px", height: "100%", border: "none", display: "block" }}
            />
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2" style={{ background: "var(--bezel-notch-bg)" }}>
            <div className="w-28 h-1 rounded-full" style={{ background: "var(--muted)" }} />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 rounded-l-sm" style={{ background: "var(--bezel-button)" }} />
        <div className="absolute -left-[3px] top-36 w-[3px] h-14 rounded-l-sm" style={{ background: "var(--bezel-button)" }} />
        <div className="absolute -left-[3px] top-52 w-[3px] h-14 rounded-l-sm" style={{ background: "var(--bezel-button)" }} />
        <div className="absolute -right-[3px] top-36 w-[3px] h-20 rounded-r-sm" style={{ background: "var(--bezel-button)" }} />
      </div>
    </div>
  );
}

export default function PreviewContent({ templateId }: { templateId: string }) {
  const router = useRouter();

  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { toggle, isWishlisted } = useWishlist();
  const { track } = useRecentlyViewed();
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const template = getTemplate(templateId);

  // Track this template as recently viewed
  useEffect(() => {
    if (templateId) track(templateId);
  }, [templateId, track]);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.ok ? r.json() : { templateIds: [] })
      .then((d) => setPurchasedIds(d.templateIds ?? []))
      .catch(() => {})
      .finally(() => setPurchasesLoading(false));
  }, []);

  const isPurchased = purchasedIds.includes(templateId);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      if (!res.ok) throw new Error("checkout_failed");
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error("no_url");
    } catch {
      toast(lang === "it" ? "Errore durante il checkout. Riprova più tardi." : "Checkout failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-[15px] mb-4">{t[lang].preview.notFound}</p>
          <Link href="/" className="font-semibold" style={{ color: "var(--accent)" }}>{t[lang].preview.notFoundBack}</Link>
        </div>
      </div>
    );
  }

  const downloadType = template.downloadType ?? "html";
  const categoryLabel = t[lang].card.categoryUI;
  const displayName = lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
  const displayDesc = lang === "it" ? (templateTranslations[template.id]?.description ?? template.description) : template.description;

  return (
    <div className="min-h-screen bg-page flex flex-col">

      {/* ── Floating back + save buttons ── */}
      <div className="fixed z-50 flex items-center gap-2" style={{ top: "max(1rem, env(safe-area-inset-top, 1rem))", left: "max(1rem, env(safe-area-inset-left, 1rem))" }}>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-theme shadow-sm
            text-theme text-[14px] font-semibold
            hover:opacity-80 transition-opacity duration-200"
          style={{ background: "var(--card-bg)" }}
          aria-label={t[lang].preview.back}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0" aria-hidden>
            <path d="M7 1L1.5 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">{t[lang].preview.back}</span>
        </button>
        {template && (
          <button
            onClick={() => toggle(template.id)}
            aria-label={isWishlisted(template.id) ? (lang === "it" ? "Rimuovi dai salvati" : "Unsave") : (lang === "it" ? "Salva" : "Save")}
            className={`flex items-center justify-center w-9 h-9 border shadow-sm transition-all duration-200
              ${isWishlisted(template.id)
                ? "border-accent/30 text-accent"
                : "border-theme text-muted hover:text-accent"
              }`}
            style={{ background: "var(--card-bg)" }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 13.5S1.5 9.5 1.5 5A3.75 3.75 0 018 2.3a3.75 3.75 0 016.5 2.7C14.5 9.5 8 13.5 8 13.5z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
                fill={isWishlisted(template.id) ? "currentColor" : "none"} />
            </svg>
          </button>
        )}
      </div>

      {/* ── Mobile/Desktop toggle (UI only) ── */}
      {template.category === "ui" && (
        <div className="fixed z-50 flex items-center gap-0.5 glass p-1 shadow-[0_4px_24px_rgba(0,0,0,0.12)]" style={{ top: "max(1rem, env(safe-area-inset-top, 1rem))", right: "max(1rem, env(safe-area-inset-right, 1rem))" }}>
          <button
            onClick={() => setViewMode("desktop")}
            aria-pressed={viewMode === "desktop"}
            aria-label="Desktop preview"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
              viewMode === "desktop"
                ? "shadow-sm"
                : "text-muted hover:text-theme"
            }`}
            style={viewMode === "desktop" ? { background: "var(--accent)", color: "var(--bg)" } : undefined}
          >
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
              <rect x="0.6" y="0.6" width="13.8" height="8.3" rx="1.4" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4.5 10.5h6M7.5 8.9v1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            aria-pressed={viewMode === "mobile"}
            aria-label="Mobile preview"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
              viewMode === "mobile"
                ? "shadow-sm"
                : "text-muted hover:text-theme"
            }`}
            style={viewMode === "mobile" ? { background: "var(--accent)", color: "var(--bg)" } : undefined}
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
              <rect x="0.6" y="0.6" width="6.8" height="11.8" rx="1.8" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="4" cy="10.2" r="0.7" fill="currentColor"/>
            </svg>
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      )}

      {/* ── Preview area ── */}
      <div className="flex-1" style={{ paddingBottom: "160px" }}>
        {viewMode === "desktop" ? (
            /* Desktop: full-width iframe */
            <iframe
              src={`/api/preview/${template.id}`}
              title={template.name}
              sandbox="allow-scripts"
              className="w-full border-0 block"
              style={{ height: "100vh", minHeight: "600px" }}
            />
          ) : (
            /* Mobile: phone-frame bezel, iframe scaled to fit available width */
            <div className="flex justify-center items-start pt-20 pb-10 px-4 min-h-screen" style={{ background: "var(--surface)" }}>
              {/* Phone outer shell — scales down on narrow viewports */}
              <PhoneFrame templateId={template.id} templateName={template.name} />
            </div>
          )}
      </div>

      {/* ── Video tutorial (if set) ── */}
      {template.videoUrl && (
        <div className="relative z-10 bg-page border-t border-theme px-4 py-4 flex items-center justify-between gap-3 max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "var(--terra-dim)", border: "1px solid rgba(var(--accent-rgb), 0.20)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 2.5l9 4.5-9 4.5V2.5z" fill="var(--terra)"/>
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-theme leading-tight">
                {lang === "it" ? "Video tutorial incluso" : "Video tutorial included"}
              </p>
              <p className="text-[11px] text-muted">
                {lang === "it" ? "Guarda come usare questo template" : "Watch how to use this template"}
              </p>
            </div>
          </div>
          <a
            href={template.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-semibold transition-colors duration-200"
            style={{ background: "var(--terra-dim)", border: "1px solid rgba(var(--accent-rgb), 0.20)", color: "var(--terra)" }}
          >
            {lang === "it" ? "Guarda" : "Watch"}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      )}

      {/* ── Related templates ── */}
      {/* pb-48 ensures content isn't hidden behind the fixed bottom CTA bar */}
      <div className="relative z-10 bg-page border-t border-theme pb-48">
        <RelatedTemplates currentTemplate={template} />
      </div>

      {/* ── Fixed bottom CTA bar ── */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 border-t border-theme"
        style={{
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          backgroundColor: "var(--nav-bg)",
        }}
      >
        <div className="absolute inset-x-8 top-0 h-px rounded-full"
          style={{ background: "var(--glass-top-edge)" }} />

        <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{categoryLabel}</span>
                {template.downloads >= 700 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5" style={{ color: "var(--accent)", background: "var(--accent-bg)", border: "1px solid var(--accent-muted)" }}>{t[lang].card.bestseller}</span>
                )}
              </div>
              <p className="text-[15px] font-bold text-theme leading-tight">{displayName}</p>
              <p className="text-[12px] text-muted mt-0.5 line-clamp-1">{displayDesc}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[22px] leading-none price-gold">{formatPrice(template.price)}</p>
              <p className="text-[11px] text-muted mt-0.5">{t[lang].preview.oneTime}</p>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-2.5">
            {template.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/?q=${encodeURIComponent(tag)}`}
                className="text-[10px] text-muted glass-subtle px-2 py-0.5 border border-theme
                  hover:text-theme hover:border-theme/60 transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
            <span className="text-[10px] text-muted flex items-center gap-1 ml-1">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="opacity-50"><path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {formatCount(template.downloads)}
            </span>
            {/* Live viewing indicator */}
            <span className="text-[10px] text-muted flex items-center gap-1.5 ml-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--success)" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "var(--success)" }} />
              </span>
              {(() => { const seed = templateId.split("").reduce((a, c) => a + c.charCodeAt(0), 0); return 3 + (seed % 18) + (new Date().getHours() % 5); })()}
              {lang === "it" ? " stanno guardando" : " viewing"}
            </span>
          </div>

          {purchasesLoading ? (
            <div className="w-full h-[50px] bg-theme/10 animate-pulse" />
          ) : isPurchased ? (
            <div className="flex flex-col gap-2">
              <DownloadButton
                templateId={template.id}
                downloadType={getDownloadType(template)}
                variant="prominent"
              />
              <Link
                href={`/studio?templateId=${template.id}`}
                className="block w-full px-5 py-3 glass-subtle font-bold text-[14px] text-theme text-center transition-all duration-200 active:scale-[0.97] ios-spring"
              >
                {t[lang].preview.openStudio}
              </Link>
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              className="btn-brand w-full justify-center text-[15px]"
              style={{ padding: "14px 24px" }}
            >
              {loading
                ? t[lang].preview.loading
                : t[lang].preview.buyNow.replace("{{price}}", formatPrice(template.price))}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
