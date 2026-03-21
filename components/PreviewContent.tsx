"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTemplate, formatPrice, getDownloadType } from "@/lib/templates";
import DownloadButton from "@/components/DownloadButton";
import RelatedTemplates from "@/components/RelatedTemplates";

import { useLang } from "@/components/LanguageProvider";
import { t, templateTranslations } from "@/lib/i18n";
import PromptFullView from "@/components/PromptFullView";
import { useToast } from "@/components/Toast";
import { useWishlist } from "@/lib/useWishlist";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

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

  const categoryLabel = template.category === "ui" ? t[lang].card.categoryUI : t[lang].card.categoryPrompt;
  const displayName = lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
  const displayDesc = lang === "it" ? (templateTranslations[template.id]?.description ?? template.description) : template.description;

  return (
    <div className="min-h-screen bg-page flex flex-col">

      {/* ── Floating back + save buttons ── */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
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
        <div className="fixed top-4 right-4 z-50 flex items-center gap-0.5 glass p-1 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
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
        {template.category === "ui" ? (
          viewMode === "desktop" ? (
            /* Desktop: full-width iframe */
            <iframe
              src={`/api/preview/${template.id}`}
              title={template.name}
              sandbox="allow-scripts"
              className="w-full border-0 block"
              style={{ height: "100vh", minHeight: "600px" }}
            />
          ) : (
            /* Mobile: phone-frame bezel, iframe at real 390px viewport */
            <div className="flex justify-center items-start pt-20 pb-10 px-4 bg-[#111113] min-h-screen">
              {/* Phone outer shell */}
              <div
                className="relative shrink-0"
                style={{
                  width: "390px",
                  maxWidth: "calc(100vw - 32px)",
                }}
              >
                {/* Bezel ring */}
                <div
                  className="relative rounded-[48px] overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 10px #2C2C2E, 0 0 0 11px #3A3A3C, 0 40px 120px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.5)",
                    background: "#1C1C1E",
                  }}
                >
                  {/* Notch / Dynamic Island */}
                  <div className="relative bg-black flex items-center justify-between px-6 pt-3 pb-2">
                    <span className="text-white text-[11px] font-semibold opacity-80">9:41</span>
                    <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full border border-[#333]" />
                    <div className="flex items-center gap-1 opacity-80">
                      <svg width="15" height="10" viewBox="0 0 15 10" fill="white">
                        <rect x="0" y="3" width="2.5" height="7" rx="0.5"/><rect x="3.5" y="2" width="2.5" height="8" rx="0.5"/><rect x="7" y="0.5" width="2.5" height="9.5" rx="0.5"/><rect x="10.5" y="0" width="3.5" height="10" rx="0.5" opacity="0.35"/>
                      </svg>
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                        <rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
                        <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="white"/>
                        <path d="M21.5 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4"/>
                      </svg>
                    </div>
                  </div>

                  {/* Iframe — 390px wide = real mobile viewport */}
                  <div style={{ overflow: "hidden" }}>
                    <iframe
                      src={`/api/preview/${template.id}`}
                      title={template.name}
                      sandbox="allow-scripts"
                      style={{
                        width: "390px",
                        height: "780px",
                        border: "none",
                        display: "block",
                        maxWidth: "390px",
                      }}
                    />
                  </div>

                  {/* Home indicator */}
                  <div className="bg-black flex justify-center py-2">
                    <div className="w-28 h-1 bg-white/30 rounded-full" />
                  </div>
                </div>

                {/* Side buttons */}
                <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-[#3A3A3C] rounded-l-sm" />
                <div className="absolute -left-[3px] top-36 w-[3px] h-14 bg-[#3A3A3C] rounded-l-sm" />
                <div className="absolute -left-[3px] top-52 w-[3px] h-14 bg-[#3A3A3C] rounded-l-sm" />
                <div className="absolute -right-[3px] top-36 w-[3px] h-20 bg-[#3A3A3C] rounded-r-sm" />
              </div>
            </div>
          )
        ) : (
          <div className="pt-16 pb-4 bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E] min-h-screen">
            <PromptFullView content={template.content} />
          </div>
        )}
      </div>

      {/* ── Video tutorial (if set) ── */}
      {template.videoUrl && (
        <div className="relative z-10 bg-page border-t border-theme px-4 py-4 flex items-center justify-between gap-3 max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF453A]/10 border border-[#FF453A]/20 flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 2.5l9 4.5-9 4.5V2.5z" fill="#FF453A"/>
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
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-[#FF453A]/10 border border-[#FF453A]/20
              text-[#FF453A] text-[12px] font-semibold
              hover:bg-[#FF453A]/20 transition-colors duration-200"
          >
            {lang === "it" ? "Guarda" : "Watch"}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      )}

      {/* ── Related templates ── */}
      <div className="relative z-10 bg-page border-t border-theme">
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
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

        <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{categoryLabel}</span>
                {template.downloads >= 700 && (
                  <span className="text-[10px] font-bold text-[#FF9F0A] bg-[#FF9F0A]/10 border border-[#FF9F0A]/20 px-1.5 py-0.5">{t[lang].card.bestseller}</span>
                )}
              </div>
              <p className="text-[15px] font-bold text-theme leading-tight">{displayName}</p>
              <p className="text-[12px] text-muted mt-0.5 line-clamp-1">{displayDesc}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[22px] font-black leading-none" style={{ color: "var(--accent)" }}>{formatPrice(template.price)}</p>
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
              {template.downloads.toLocaleString(lang === "it" ? "it-IT" : "en-US")}
            </span>
          </div>

          {purchasesLoading ? (
            <div className="w-full h-[50px] bg-theme/10 animate-pulse" />
          ) : isPurchased ? (
            <div className="flex gap-2">
              <Link
                href={`/studio?templateId=${template.id}`}
                className="flex-1 flex items-center justify-center gap-2 active:scale-[0.97]
                  font-bold px-4 py-3 text-center
                  transition-all duration-200 ios-spring text-[14px]"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
              >
                {t[lang].preview.openStudio}
              </Link>
              <div className="flex-1">
                <DownloadButton
                  templateId={template.id}
                  downloadType={getDownloadType(template)}
                  variant="full"
                />
              </div>
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              className="w-full active:scale-[0.97]
                font-bold px-6 py-3.5
                transition-all duration-200 ios-spring
                disabled:opacity-50 text-[15px]"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
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
