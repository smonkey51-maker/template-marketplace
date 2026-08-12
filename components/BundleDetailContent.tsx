"use client";

import { useState } from "react";
import { usePurchases } from "@/lib/usePurchases";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBundle, getTemplate, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t, getLocalizedName, getLocalizedDesc } from "@/lib/i18n";
import { useToast } from "@/components/Toast";
import BackLink from "@/components/BackLink";
import { Layers } from "lucide-react";

const BRAND_COLOR = {
  bg: "bg-accent/10",
  border: "border-accent/30",
  text: "text-accent",
  badge: "bg-accent/15 text-accent border-accent/30",
  glow: "",
};
const COLOR_MAP: Record<string, typeof BRAND_COLOR> = {
  blue: BRAND_COLOR,
  violet: BRAND_COLOR,
  emerald: BRAND_COLOR,
  purple: BRAND_COLOR,
  amber: BRAND_COLOR,
  orange: BRAND_COLOR,
};

export default function BundleDetailContent({ bundleId }: { bundleId: string }) {
  const router = useRouter();
  const { lang } = useLang();
  const { purchasedIds, loading: purchasesLoading } = usePurchases();
  const [loading, setLoading] = useState(false);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const toast = useToast();

  // Same as a retired product: this page prices a basket and sells it.
  const foundBundle = getBundle(bundleId);
  const bundle = foundBundle?.retired ? undefined : foundBundle;

  if (!bundle) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-[15px] mb-4">{t[lang].bundleDetail.notFound}</p>
          <Link href={`/${lang}`} className="font-semibold" style={{ color: "var(--accent)" }}>
            {t[lang].bundleDetail.notFoundBack}
          </Link>
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
      const data = await res.json().catch(() => ({}));

      // Same as the single-template flow: show what the route actually said,
      // and send an unauthenticated buyer to sign in instead of to an error.
      if (!res.ok) {
        if (data.requireAuth) {
          router.push(
            `/${lang}/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`,
          );
          return;
        }
        throw new Error(typeof data.error === "string" ? data.error : "");
      }
      if (!data.url) throw new Error("");
      window.location.href = data.url;
    } catch (err) {
      const fromServer = err instanceof Error && err.message ? err.message : null;
      toast(
        fromServer ??
          (lang === "it"
            ? "Errore durante il checkout. Riprova più tardi."
            : "Checkout failed. Please try again."),
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* ── Back ── */}
      <BackLink floating fallbackHref={`/${lang}/catalogo`} />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-20 pb-48">
        {/* ── Hero ── */}
        <div className={`r-glass ${colors.bg} border ${colors.border} p-6 sm:p-8 mb-8`}>
          <div className="flex items-start gap-4 mb-4">
            {/* A bundle is layers of products. This replaced a per-bundle
                emoji field on the Bundle type — full-colour system glyphs that
                were the only saturated marks on the page and rendered
                differently on every platform. */}
            <Layers
              aria-hidden
              size={40}
              strokeWidth={1.25}
              className={`shrink-0 ${colors.text}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-[11px] font-black uppercase tracking-widest ${colors.text}`}>
                  Bundle
                </span>
                <span
                  className={`r-pill border px-2.5 py-0.5 text-[11px] font-black ${colors.badge}`}
                >
                  –{savingsPct}%
                </span>
              </div>
              <h1 className="text-[1.6rem] sm:text-[2rem] font-black text-theme leading-tight tracking-tight">
                {getLocalizedName(bundle, lang)}
              </h1>
              <p className={`text-[14px] font-semibold ${colors.text} mt-1`}>{bundle.tagline}</p>
            </div>
          </div>
          <p className="text-[14px] text-muted leading-relaxed mb-5">
            {getLocalizedDesc(bundle, lang)}
          </p>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-2.5">
            {bundle.highlights.map((h, i) => (
              <div key={i} className="r-md flex items-start gap-2 bg-theme/5 px-3 py-2.5">
                <span
                  className={`r-pill mt-0.5 w-4 h-4 flex items-center justify-center text-[9px] shrink-0 border ${colors.badge}`}
                >
                  ✓
                </span>
                <span className="text-[12px] text-theme/80 leading-snug font-medium">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Template preview carousel ── */}
        <div className="mb-8">
          <h2 className="text-[16px] font-black text-theme mb-4">
            {t[lang].bundleDetail.whatsIncluded}
          </h2>

          {/* Template list */}
          <div className="space-y-2 mb-4">
            {includedTemplates.map((tmpl, i) => {
              const owned = purchasedIds.includes(tmpl!.id);
              const isActive = activeTemplateIdx === i;
              return (
                <button
                  key={tmpl!.id}
                  onClick={() => setActiveTemplateIdx(i)}
                  className={`r-md w-full flex items-center gap-3 px-4 py-3 text-left
                    transition-all duration-200 ios-spring border ${
                      isActive
                        ? `${colors.bg} ${colors.border}`
                        : "bg-input border-theme hover:border-theme/60"
                    }`}
                >
                  <span
                    className={`r-pill w-6 h-6 flex items-center justify-center text-[11px] font-black shrink-0 border ${
                      isActive ? colors.badge : "bg-theme/10 border-theme/30 text-muted"
                    }`}
                  >
                    {owned ? "✓" : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[13px] font-semibold leading-tight ${isActive ? colors.text : "text-theme"}`}
                    >
                      {getLocalizedName(tmpl!, lang)}
                    </p>
                    <p className="text-[11px] text-muted truncate mt-0.5">
                      {getLocalizedDesc(tmpl!, lang)}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {owned && (
                      <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5">
                        {t[lang].bundleDetail.alreadyOwned}
                      </span>
                    )}
                    <span className="text-[12px] text-muted/60 line-through">
                      {formatPrice(tmpl!.price)}
                    </span>
                    {isActive && (
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        className={colors.text}
                        aria-hidden
                      >
                        <path
                          d="M1 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview area */}
          {activeTemplate && (
            <div className="r-glass border border-theme overflow-hidden bg-card">
              <div className="relative">
                <iframe
                  key={activeTemplateIdx}
                  src={`/api/preview/${activeTemplate.id}`}
                  title={getLocalizedName(activeTemplate, lang)}
                  sandbox="allow-scripts"
                  className="w-full border-0 block"
                  style={{ height: "480px" }}
                />
                {/* Overlay to prevent interaction */}
                <div className="absolute inset-0 bg-transparent" />
              </div>

              {/* Template meta footer */}
              <div className="px-4 py-3 border-t border-theme flex items-center justify-between gap-3">
                <div>
                  <p className="text-[13px] font-bold text-theme">
                    {getLocalizedName(activeTemplate, lang)}
                  </p>
                  <p className="text-[11px] text-muted">{getLocalizedDesc(activeTemplate, lang)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {purchasedIds.includes(activeTemplate.id) && (
                    <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5">
                      {t[lang].bundleDetail.alreadyOwned}
                    </span>
                  )}
                  <span className="text-[12px] text-muted line-through">
                    {formatPrice(activeTemplate.price)}
                  </span>
                  <Link
                    href={`/${lang}/preview/${activeTemplate.id}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center min-h-[24px] text-[11px] font-semibold ${colors.text} hover:opacity-70 transition-opacity whitespace-nowrap`}
                  >
                    {t[lang].bundleDetail.openPreview}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Featured Product Spotlight (free bundles only) ── */}
        {bundle.featuredProductId &&
          bundle.price === 0 &&
          (() => {
            const featured = getTemplate(bundle.featuredProductId);
            if (!featured) return null;
            const owned = purchasedIds.includes(featured.id);
            return (
              <div
                className="mb-8 border border-accent/40 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(156,119,51,0.08) 0%, rgba(13,11,8,0) 60%)",
                }}
              >
                {/* Top shimmer line */}
                <div
                  className="absolute top-0 inset-x-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(200,169,110,0.6),transparent)",
                  }}
                />

                <div className="p-5 sm:p-6">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-accent/15 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                        <path
                          d="M5 1l1.2 2.4L9 3.8l-2 1.9.5 2.8L5 7.2 2.5 8.5l.5-2.8L1 3.8l2.8-.4L5 1z"
                          fill="currentColor"
                        />
                      </svg>
                      Il nostro prodotto più forte
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                    {/* Preview */}
                    <div
                      className="r-glass w-full sm:w-[220px] shrink-0 border border-accent/20 overflow-hidden bg-card"
                      style={{ height: "130px" }}
                    >
                      <div className="relative" style={{ height: "130px" }}>
                        <iframe
                          src={`/api/preview/${featured.id}`}
                          title={getLocalizedName(featured, lang)}
                          sandbox="allow-scripts"
                          className="w-full border-0 block"
                          style={{
                            height: "360px",
                            transform: "scale(0.36)",
                            transformOrigin: "top left",
                            width: "611px",
                            pointerEvents: "none",
                          }}
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[18px] sm:text-[20px] font-black text-theme leading-tight tracking-tight mb-1">
                        {getLocalizedName(featured, lang)}
                      </h3>
                      <p className="text-[13px] text-muted leading-relaxed mb-4">
                        {getLocalizedDesc(featured, lang)}
                      </p>

                      {/* Stats row */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-[12px] text-muted/80">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                            <path
                              d="M6.5 1.5L8 4.6l3.4.5-2.5 2.4.6 3.4L6.5 9.3 3.5 11l.6-3.4L1.6 5.1l3.4-.5L6.5 1.5z"
                              fill="currentColor"
                              className="text-accent"
                            />
                          </svg>
                          <span>{lang === "it" ? "Più scaricato" : "Top downloaded"}</span>
                        </div>
                        <span className="text-muted/30">·</span>
                        <span className="text-[12px] text-muted/80">
                          {lang === "it" ? "Solo" : "Only"}{" "}
                          <span
                            className="font-black text-accent text-[14px]"
                            style={{ fontFamily: "var(--font-dm-serif)" }}
                          >
                            {(featured.price / 100).toFixed(2).replace(".", ",")}€
                          </span>
                        </span>
                        <span className="text-muted/30">·</span>
                        <span className="text-[12px] text-muted/80">UI Template</span>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        {owned ? (
                          <span className="text-[12px] font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5">
                            {t[lang].bundleDetail.alreadyOwned}
                          </span>
                        ) : (
                          <Link href={`/${lang}/preview/${featured.id}`} className="btn-brand-sm">
                            {lang === "it" ? "Scopri il template →" : "Explore template →"}
                          </Link>
                        )}
                        <Link
                          href={`/${lang}/preview/${featured.id}`}
                          className="text-[12px] text-muted/60 hover:text-muted transition-colors underline underline-offset-2"
                        >
                          {lang === "it" ? "Anteprima completa" : "Full preview"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* ── Price breakdown ── */}
        <div className="r-glass m3-surface-container border border-theme p-5 mb-4">
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
                      {getLocalizedName(tmpl!, lang)}
                    </span>
                    {owned && (
                      <span className="text-[10px] text-accent/60 bg-accent/10 px-1.5 py-0.5 border border-accent/20">
                        {t[lang].bundleDetail.alreadyOwned}
                      </span>
                    )}
                  </div>
                  <span className="text-[13px] text-muted shrink-0">
                    {formatPrice(tmpl!.price)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-theme pt-3 space-y-1.5">
            <div className="flex items-center justify-between">
              {/* The label is not struck through — only the figure is. Striking
                  "Valore totale" too made the row read as a rendering fault
                  rather than as a price that no longer applies. */}
              <span className="text-[13px] text-muted">{t[lang].bundleDetail.totalValue}</span>
              <span className="text-[13px] text-muted line-through">
                {formatPrice(bundle.regularPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-[13px] font-bold ${colors.text}`}>
                {t[lang].bundleDetail.savings.replace("{{amount}}", formatPrice(savings))}
              </span>
              <span className={`text-[15px] font-black ${colors.text}`}>
                –{formatPrice(savings)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[16px] font-black text-theme">
                {t[lang].bundleDetail.bundlePrice}
              </span>
              <span className="text-[22px] font-black text-theme">{formatPrice(bundle.price)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed bottom CTA bar ── */}
      {/* .m3-bar, not a hand-rolled blur: the rim, fill and cast now come
          from the same tokens as every other panel, and the bar picks up the
          specular highlight and refraction it never had. The hand-drawn
          hairline that stood in for the rim is gone with it. */}
      <div className="m3-bar fixed bottom-0 inset-x-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 mb-3">
            <Layers aria-hidden size={22} strokeWidth={1.5} className={`shrink-0 ${colors.text}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-theme leading-tight truncate">
                {getLocalizedName(bundle, lang)}
              </p>
              <p className="text-[11px] text-muted">
                {includedTemplates.length}{" "}
                {lang === "it" ? "template inclusi" : "templates included"}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-[22px] font-black leading-none ${colors.text}`}>
                {formatPrice(bundle.price)}
              </p>
              <p className="text-[11px] text-muted line-through">
                {formatPrice(bundle.regularPrice)}
              </p>
            </div>
          </div>

          {purchasesLoading ? (
            <div className="w-full h-[50px] r-pill bg-theme/10 animate-pulse" />
          ) : isFullyOwned ? (
            <div className="w-full py-3 r-pill bg-accent/10 text-accent text-[14px] font-bold text-center border border-accent/20">
              {t[lang].bundleDetail.fullyOwned}
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              aria-label={`${t[lang].bundleDetail.buyNow.replace("{{price}}", formatPrice(bundle.price))} — ${getLocalizedName(bundle, lang)}`}
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

          <p className="text-center text-[10px] text-muted/60 mt-1.5">
            {t[lang].bundleDetail.oneTime}
          </p>
        </div>
      </div>
    </div>
  );
}
