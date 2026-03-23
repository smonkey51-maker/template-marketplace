"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBundle, getTemplate, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import PromptFullView from "@/components/PromptFullView";
import { useToast } from "@/components/Toast";

const BRAND_COLOR = {
  bg: "bg-accent/10",
  border: "border-accent/30",
  text: "text-accent",
  badge: "bg-accent/15 text-accent border-accent/30",
  glow: "",
};
const COLOR_MAP: Record<string, typeof BRAND_COLOR> = {
  blue: BRAND_COLOR, violet: BRAND_COLOR, emerald: BRAND_COLOR,
  purple: BRAND_COLOR, amber: BRAND_COLOR, orange: BRAND_COLOR,
};

export default function BundleDetailContent({ bundleId }: { bundleId: string }) {
  const router = useRouter();
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const toast = useToast();

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
          <Link href="/" className="font-semibold" style={{ color: "var(--accent)" }}>{t[lang].bundleDetail.notFoundBack}</Link>
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
      toast(
        lang === "it"
          ? "Errore durante il checkout. Riprova più tardi."
          : "Checkout failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">

      {/* ── Back button ── */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3.5 py-2 border border-theme shadow-sm
          text-theme text-[14px] font-semibold
          hover:opacity-80 transition-opacity duration-200"
        style={{ background: "var(--card-bg)" }}
        aria-label={t[lang].bundleDetail.back}
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0" aria-hidden>
          <path d="M7 1L1.5 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">{t[lang].bundleDetail.back}</span>
      </button>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-20 pb-48">

        {/* ── Hero ── */}
        <div className={`${colors.bg} border ${colors.border} p-6 sm:p-8 mb-8`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl shrink-0">{bundle.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-[11px] font-black uppercase tracking-widest ${colors.text}`}>Bundle</span>
                <span className={`border px-2.5 py-0.5 text-[11px] font-black ${colors.badge}`}>
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
              <div key={i} className="flex items-start gap-2 bg-theme/5 px-3 py-2.5">
                <span className={`mt-0.5 w-4 h-4 flex items-center justify-center text-[9px] shrink-0 border ${colors.badge}`}>
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

          {/* Template list */}
          <div className="space-y-2 mb-4">
            {includedTemplates.map((tmpl, i) => {
              const owned = purchasedIds.includes(tmpl!.id);
              const isActive = activeTemplateIdx === i;
              return (
                <button
                  key={tmpl!.id}
                  onClick={() => setActiveTemplateIdx(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left
                    transition-all duration-200 ios-spring border ${
                    isActive
                      ? `${colors.bg} ${colors.border}`
                      : "bg-input border-theme hover:border-theme/60"
                  }`}
                >
                  <span className={`w-6 h-6 flex items-center justify-center text-[11px] font-black shrink-0 border ${
                    isActive ? colors.badge : "bg-theme/10 border-theme/30 text-muted"
                  }`}>
                    {owned ? "✓" : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-semibold leading-tight ${isActive ? colors.text : "text-theme"}`}>
                      {tmpl!.name}
                    </p>
                    <p className="text-[11px] text-muted truncate mt-0.5">{tmpl!.description}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {owned && (
                      <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5">
                        {t[lang].bundleDetail.alreadyOwned}
                      </span>
                    )}
                    <span className="text-[12px] text-muted/60 line-through">{formatPrice(tmpl!.price)}</span>
                    {isActive && (
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className={colors.text} aria-hidden>
                        <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview area */}
          {activeTemplate && (
            <div className="border border-theme overflow-hidden bg-card">
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
                    <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5">
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
        <div className="glass-subtle border border-theme p-5 mb-4">
          <h2 className="text-[13px] font-black text-muted/60 uppercase tracking-widest mb-4">
            {t[lang].bundleDetail.totalValue}
          </h2>
          <div className="space-y-2 mb-4">
            {includedTemplates.map((tmpl) => {
              const owned = purchasedIds.includes(tmpl!.id);
              return (
                <div key={tmpl!.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {owned && <span className="text-accent text-[11px]">✓</span>}
                    <span className={`text-[13px] ${owned ? "text-accent/80" : "text-theme/80"}`}>
                      {tmpl!.name}
                    </span>
                    {owned && (
                      <span className="text-[10px] text-accent/60 bg-accent/10 px-1.5 py-0.5 border border-accent/20">
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
              <p className="text-[11px] text-muted">{includedTemplates.length} {lang === "it" ? "template inclusi" : "templates included"}</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-[22px] font-black leading-none ${colors.text}`}>{formatPrice(bundle.price)}</p>
              <p className="text-[11px] text-muted line-through">{formatPrice(bundle.regularPrice)}</p>
            </div>
          </div>

          {purchasesLoading ? (
            <div className="w-full h-[50px] bg-theme/10 animate-pulse" />
          ) : isFullyOwned ? (
            <div className="w-full py-3 bg-accent/10 text-accent text-[14px] font-bold text-center border border-accent/20">
              {t[lang].bundleDetail.fullyOwned}
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              className="btn-brand w-full justify-center text-[15px]"
              style={{ padding: "14px 24px" }}
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
