"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTemplate, formatPrice, getDownloadType } from "@/lib/templates";
import DownloadButton from "@/components/DownloadButton";
import RelatedTemplates from "@/components/RelatedTemplates";
import { useUser } from "@clerk/nextjs";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

function PromptFullView({ content }: { content: string }) {
  const parts = content.split(/({{[^}]+}})/g);
  return (
    <div className="min-h-full p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="bg-[#FFFEF7] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#F7F6EE] border-b border-black/[0.07]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[12px] text-[#8E8E93] ml-2 font-medium tracking-wide select-none">
            Prompt Template
          </span>
        </div>
        <div className="p-6 sm:p-8 font-mono text-[14px] text-[#1C1C1E] leading-relaxed whitespace-pre-wrap">
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span
                key={i}
                className="inline-block bg-[#007AFF]/10 text-[#007AFF] rounded-[5px] px-1.5 py-0.5 font-semibold text-[13px]"
              >
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function PreviewContent({ templateId }: { templateId: string }) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const template = getTemplate(templateId);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.json())
      .then((d) => setPurchasedIds(d.templateIds ?? []))
      .catch(() => {});
  }, []);

  const isPurchased = purchasedIds.includes(templateId);

  const handleBuy = async () => {
    if (!isSignedIn) { router.push("/sign-in"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-[15px] mb-4">{t[lang].preview.notFound}</p>
          <Link href="/" className="text-[#0A84FF] font-semibold">{t[lang].preview.notFoundBack}</Link>
        </div>
      </div>
    );
  }

  const categoryLabel = template.category === "ui" ? t[lang].card.categoryUI : t[lang].card.categoryPrompt;

  return (
    <div className="min-h-screen bg-page flex flex-col">

      {/* ── Floating back button ── */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl
          glass shadow-[0_4px_24px_rgba(0,0,0,0.18)]
          text-[#0A84FF] text-[15px] font-semibold
          hover:scale-105 active:scale-[0.96] ios-spring transition-all duration-200"
        aria-label={t[lang].preview.back}
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0">
          <path d="M7 1L1.5 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">{t[lang].preview.back}</span>
      </button>

      {/* ── Mobile/Desktop toggle (UI only) ── */}
      {template.category === "ui" && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-1 glass rounded-2xl p-1 shadow-[0_4px_24px_rgba(0,0,0,0.18)]">
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
              viewMode === "desktop"
                ? "bg-[#0A84FF] text-white shadow-sm"
                : "text-muted hover:text-theme"
            }`}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <rect x="0.5" y="0.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4.5 11.5h5M7 9.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="hidden sm:inline">{lang === "it" ? "Desktop" : "Desktop"}</span>
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
              viewMode === "mobile"
                ? "bg-[#0A84FF] text-white shadow-sm"
                : "text-muted hover:text-theme"
            }`}
          >
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
              <rect x="0.5" y="0.5" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="4.5" cy="11.5" r="0.75" fill="currentColor"/>
            </svg>
            <span className="hidden sm:inline">{lang === "it" ? "Mobile" : "Mobile"}</span>
          </button>
        </div>
      )}

      {/* ── Preview area ── */}
      <div className="flex-1" style={{ paddingBottom: "100px" }}>
        {template.category === "ui" ? (
          <div className={`pt-16 flex justify-center bg-[#1C1C1E] min-h-screen ${viewMode === "mobile" ? "items-start" : ""}`}>
            <div
              className="transition-all duration-300 ease-in-out"
              style={viewMode === "mobile" ? { width: "375px", maxWidth: "100%" } : { width: "100%" }}
            >
              <iframe
                src={`/api/preview/${template.id}`}
                title={template.name}
                className="w-full border-0"
                style={{
                  height: viewMode === "mobile" ? "812px" : "100vh",
                  minHeight: "600px",
                  display: "block",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="pt-16 pb-4 bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E] min-h-screen">
            <PromptFullView content={template.content} />
          </div>
        )}
      </div>

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
        {/* Top glint */}
        <div className="absolute inset-x-8 top-0 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

        <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4">
          {/* Template info row */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{categoryLabel}</span>
                {template.downloads >= 700 && (
                  <span className="text-[10px] font-bold text-[#FF9F0A] bg-[#FF9F0A]/10 border border-[#FF9F0A]/20 px-1.5 py-0.5 rounded-full">{t[lang].card.bestseller}</span>
                )}
              </div>
              <p className="text-[15px] font-bold text-theme leading-tight mt-0.5">{template.name}</p>
              <p className="text-[12px] text-muted mt-0.5 line-clamp-1">{template.description}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[20px] font-black text-[#0A84FF]">{formatPrice(template.price)}</p>
              <p className="text-[11px] text-muted">{t[lang].preview.oneTime}</p>
            </div>
          </div>

          {/* Tags row */}
          <div className="flex gap-1.5 flex-wrap mb-3">
            {template.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[10px] text-muted glass-subtle px-2 py-0.5 rounded-full border border-theme">
                {tag}
              </span>
            ))}
            <span className="text-[10px] text-muted flex items-center gap-1 ml-1">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="opacity-50"><path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {template.downloads.toLocaleString("it-IT")}
            </span>
          </div>

          {/* CTA button */}
          {isPurchased ? (
            <div className="flex flex-col gap-2">
              <Link
                href={`/studio?templateId=${template.id}`}
                className="flex items-center justify-center gap-2 bg-[#5E5CE6] hover:bg-[#6E6CF6] active:scale-[0.97]
                  text-white font-bold rounded-2xl px-6 py-3.5 w-full text-center
                  transition-all duration-200 ios-spring
                  shadow-[0_4px_20px_rgba(94,92,230,0.35)] text-[15px]"
              >
                {t[lang].preview.openStudio}
              </Link>
              <DownloadButton
                templateId={template.id}
                downloadType={getDownloadType(template)}
                variant="full"
              />
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              className="w-full bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97]
                text-white font-bold rounded-2xl px-6 py-3.5
                transition-all duration-200 ios-spring
                disabled:opacity-50 btn-glow-blue text-[15px]
                shadow-[0_4px_20px_rgba(10,132,255,0.35)]"
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
