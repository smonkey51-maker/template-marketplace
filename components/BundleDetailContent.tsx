"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBundle, getTemplate, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import PromptFullView from "@/components/PromptFullView";

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; glow: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/30",    text: "text-blue-400",    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",    glow: "shadow-[0_4px_20px_rgba(10,132,255,0.35)]" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/30",  text: "text-violet-400",  badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",  glow: "shadow-[0_4px_20px_rgba(139,92,246,0.35)]" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", glow: "shadow-[0_4px_20px_rgba(52,211,153,0.35)]" },
  purple:  { bg: "bg-purple-500/10",  border: "border-purple-500/30",  text: "text-purple-400",  badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",  glow: "shadow-[0_4px_20px_rgba(168,85,247,0.35)]" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/30",   text: "text-amber-400",   badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",    glow: "shadow-[0_4px_20px_rgba(245,158,11,0.35)]" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/30",  text: "text-orange-400",  badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",  glow: "shadow-[0_4px_20px_rgba(249,115,22,0.35)]" },
};

export default function BundleDetailContent({ bundleId }: { bundleId: string }) {
  const router = useRouter();
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);

  const bundle = getBundle(bundleId);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.ok ? r.json() : { templateIds: [] })
      .then((d) => setPurchasedIds(d.templateIds ?? []))
      .catch(() => {})
      .finally(() => setPurchasesLoading(false));
  }, []);

  if (!bundle) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-[15px] mb-4">{t[lang].bundleDetail.notFound}</p>
          <Link href="/" className="text-[#0A84FF] font-semibold">{t[lang].bundleDetail.notFoundBack}</Link>
        </div>
      </div>
    );
  }

  const colors = COLOR_MAP[bundle.accentColor] ?? COLOR_MAP.blue;
  const savings = bundle.regularPrice - bundle.price;
  const savingsPct = Math.round((savings / bundle.regularPrice) * 100);
  const includedTemplates = bundle.templateIds.map((id) => getTemplate(id)).filter(Boolean);
  const ownedCount = bundle.templateIds.filter((id) => purchasedIds.includes(id)).length;
  const isFullyOwned = ownedCount === bundle.templateIds.length;
  const activeTemplate = includedTemplates[activeTemplateIdx];

  const handleBuy = async () => {
    setLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId }),
      });
      if (!res.ok) throw new Error("checkout_failed");
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error("no_url");
    } catch {
      setCheckoutError(
        lang === "it"
          ? "Errore durante il checkout. Riprova più tardi."
          : "Checkout failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">

      {/* ── Back button ── */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl
          glass shadow-[0_4px_24px_rgba(0,0,0,0.12)]
          text-[#0A84FF] text-[14px] font-semibold
          hover:scale-105 active:scale-[0.96] ios-spring transition-all duration-200"
        aria-label={t[lang].bundleDetail.back}
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0" aria-hidden>
          <path d="M7 1L1.5 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">{t[lang].bundleDetail.back}</span>
      </button>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-20 pb-48">

        {/* ── Hero ── */}
        <div className={`${colors.bg} border ${colors.border} rounded-[24px] p-6 sm:p-8 mb-8`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl shrink-0">{bundle.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-[11px] font-black uppercase tracking-widest ${colors.text}`}>Bundle</span>
                <span className={`border rounded-full px-2.5 py-0.5 text-[11px] font-black ${colors.badge}`}>
                  –{savingsPct}%
                </span>
              </div>
              <h1 className="text-[1.6rem] sm:text-[2rem] font-black text-theme leading-tight tracking-tight">
                {bundle.name}
              </h1>
              <p className={`text-[14px] font-semibold ${colors.text} mt-1`}>{bundle.tagline}</p>
            </div>
          </div>
          <p className="text-[14px] text-muted leading-relaxed mb-5">{bundle.description}</p>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-2.5">
            {bundle.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 bg-theme/5 rounded-xl px-3 py-2.5">
                <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0 border ${colors.badge}`}>
                  ✓
                </span>
                <span className="text-[12px] text-theme/80 leading-snug font-medium">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Template preview carousel ── */}
        <div className="mb-8">
          <h2 className="text-[16px] font-black text-theme mb-4">{t[lang].bundleDetail.whatsIncluded}</h2>

          {/* Tab bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
            {includedTemplates.map((tmpl, i) => {
              const owned = purchasedIds.includes(tmpl!.id);
              return (
                <button
                  key={tmpl!.id}
                  onClick={() => setActiveTemplateIdx(i)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold
                    transition-all duration-200 ios-spring whitespace-nowrap border ${
                    activeTemplateIdx === i
                      ? `${colors.bg} ${colors.border} ${colors.text}`
                      : "bg-input border-theme text-muted hover:text-theme"
                  }`}
                >
                  {owned && <span className="text-[#30D158] text-[10px]">✓</span>}
                  {tmpl!.name}
                </button>
              );
            })}
          </div>

          {/* Preview area */}
          {activeTemplate && (
            <div className="border border-theme rounded-[20px] overflow-hidden bg-card">
              {activeTemplate.category === "ui" ? (
                <div className="relative">
                  <iframe
                    key={activeTemplateIdx}
                    src={`/api/preview/${activeTemplate.id}`}
                    title={activeTemplate.name}
                    sandbox="allow-scripts"
                    className="w-full border-0 block"
                    style={{ height: "480px" }}
                  />
                  {/* Overlay to prevent interaction */}
                  <div className="absolute inset-0 bg-transparent" />
                </div>
              ) : (
                <div className="bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E] min-h-[320px]">
                  <PromptFullView content={activeTemplate.content} />
                </div>
              )}

              {/* Template meta footer */}
              <div className="px-4 py-3 border-t border-theme flex items-center justify-between gap-3">
                <div>
                  <p className="text-[13px] font-bold text-theme">{activeTemplate.name}</p>
                  <p className="text-[11px] text-muted">{activeTemplate.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {purchasedIds.includes(activeTemplate.id) && (
                    <span className="text-[10px] font-bold text-[#30D158] bg-[#30D158]/10 border border-[#30D158]/20 px-2 py-0.5 rounded-full">
                      {t[lang].bundleDetail.alreadyOwned}
                    </span>
                  )}
                  <span className="text-[12px] text-muted line-through">{formatPrice(activeTemplate.price)}</span>
                  <Link
                    href={`/preview/${activeTemplate.id}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className={`text-[11px] font-semibold ${colors.text} hover:opacity-70 transition-opacity whitespace-nowrap`}
                  >
                    {t[lang].bundleDetail.openPreview}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Price breakdown ── */}
        <div className="glass-subtle border border-theme rounded-[20px] p-5 mb-4">
          <h2 className="text-[13px] font-black text-muted/60 uppercase tracking-widest mb-4">
            {t[lang].bundleDetail.totalValue}
          </h2>
          <div className="space-y-2 mb-4">
            {includedTemplates.map((tmpl) => {
              const owned = purchasedIds.includes(tmpl!.id);
              return (
                <div key={tmpl!.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {owned && <span className="text-[#30D158] text-[11px]">✓</span>}
                    <span className={`text-[13px] ${owned ? "text-[#30D158]/80" : "text-theme/80"}`}>
                      {tmpl!.name}
                    </span>
                    {owned && (
                      <span className="text-[10px] text-[#30D158]/60 bg-[#30D158]/10 px-1.5 py-0.5 rounded-full border border-[#30D158]/20">
                        {t[lang].bundleDetail.alreadyOwned}
                      </span>
                    )}
                  </div>
                  <span className="text-[13px] text-muted shrink-0">{formatPrice(tmpl!.price)}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-theme pt-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted line-through">{t[lang].bundleDetail.totalValue}</span>
              <span className="text-[13px] text-muted line-through">{formatPrice(bundle.regularPrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-[13px] font-bold ${colors.text}`}>
                {t[lang].bundleDetail.savings.replace("{{amount}}", formatPrice(savings))}
              </span>
              <span className={`text-[15px] font-black ${colors.text}`}>–{formatPrice(savings)}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[16px] font-black text-theme">Bundle price</span>
              <span className="text-[22px] font-black text-theme">{formatPrice(bundle.price)}</span>
            </div>
          </div>
        </div>
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
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl shrink-0">{bundle.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-theme leading-tight truncate">{bundle.name}</p>
              <p className="text-[11px] text-muted">{includedTemplates.length} template inclusi</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-[22px] font-black leading-none ${colors.text}`}>{formatPrice(bundle.price)}</p>
              <p className="text-[11px] text-muted line-through">{formatPrice(bundle.regularPrice)}</p>
            </div>
          </div>

          {checkoutError && (
            <p className="text-center text-[12px] text-[#FF453A] mb-2 font-medium">{checkoutError}</p>
          )}

          {purchasesLoading ? (
            <div className="w-full h-[50px] rounded-2xl bg-theme/10 animate-pulse" />
          ) : isFullyOwned ? (
            <div className="w-full py-3 rounded-2xl bg-[#30D158]/10 text-[#30D158] text-[14px] font-bold text-center border border-[#30D158]/20">
              {t[lang].bundleDetail.fullyOwned}
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              className={`w-full bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97]
                text-white font-bold rounded-2xl px-6 py-3.5
                transition-all duration-200 ios-spring
                disabled:opacity-50 btn-glow-blue text-[15px]
                shadow-[0_4px_20px_rgba(10,132,255,0.35)]`}
            >
              {loading
                ? t[lang].bundleDetail.loading
                : t[lang].bundleDetail.buyNow.replace("{{price}}", formatPrice(bundle.price))}
            </button>
          )}

          {!isFullyOwned && ownedCount > 0 && (
            <p className="text-center text-[11px] text-muted mt-2">
              {t[lang].bundleDetail.owned
                .replace("{{n}}", String(ownedCount))
                .replace("{{total}}", String(bundle.templateIds.length))}
            </p>
          )}

          <p className="text-center text-[10px] text-muted/60 mt-1.5">{t[lang].bundleDetail.oneTime}</p>
        </div>
      </div>
    </div>
  );
}
