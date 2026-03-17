"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Template, formatPrice } from "@/lib/templates";

const categoryLabels: Record<string, string> = {
  ui: "UI Template",
  prompt: "Prompt",
};

/* ─── Prompt preview (iOS Notes style) ─── */
function PromptPreview({ content }: { content: string }) {
  const parts = content.split(/({{[^}]+}})/g);
  return (
    <div className="bg-[#FFFEF7] m-4 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.14)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F7F6EE] border-b border-black/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="text-[11px] text-[#8E8E93] ml-2 font-medium tracking-wide">Prompt Template</span>
      </div>
      <div className="p-5 font-mono text-[13px] text-[#1C1C1E] leading-relaxed whitespace-pre-wrap overflow-auto max-h-[460px]">
        {parts.map((part, i) =>
          part.startsWith("{{") ? (
            <span key={i} className="inline-block bg-[#007AFF]/10 text-[#007AFF] rounded-[5px] px-1 py-0.5 font-semibold text-[12px]">
              {part}
            </span>
          ) : <span key={i}>{part}</span>
        )}
      </div>
    </div>
  );
}

/* ─── Prompt thumbnail ─── */
function PromptThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  const preview = template.content.slice(0, 160);
  const parts = preview.split(/({{[^}]+}})/g);
  return (
    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] p-3 flex items-start">
      <div className="w-full bg-[#FFFEF7] rounded-xl shadow-lg p-3 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="font-mono text-[10px] text-[#1C1C1E] leading-relaxed line-clamp-4">
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span key={i} className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{part}</span>
            ) : <span key={i}>{part}</span>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/20 to-transparent" />
      {isPurchased && <PurchasedBadge />}
    </div>
  );
}

/* ─── UI thumbnail ─── */
function UIThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  return (
    <div className="relative h-44 overflow-hidden bg-gray-950">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: "scale(0.38)", transformOrigin: "top left", width: "263%", height: "263%" }}
      >
        <iframe
          src={`/api/preview/${template.id}`}
          title={template.name}
          className="w-full border-0"
          style={{ height: "460px" }}
        />
      </div>
      {/* Vignette overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
      {isPurchased && <PurchasedBadge />}
    </div>
  );
}

function PurchasedBadge() {
  return (
    <span className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
      Acquistato
    </span>
  );
}

/* ─── Main ─── */
export default function TemplateCard({ template, purchasedIds }: {
  template: Template;
  purchasedIds: string[];
}) {
  const { isSignedIn } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPurchased = purchasedIds.includes(template.id);

  const handleBuy = async () => {
    if (!isSignedIn) { window.location.href = "/sign-in"; return; }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Card ── */}
      <div
        onClick={() => setModalOpen(true)}
        className="group cursor-pointer glass-subtle rounded-[24px] overflow-hidden flex flex-col h-full
          transition-all duration-350 ease-premium
          hover:-translate-y-1.5
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.18),0_0_0_1px_rgba(10,132,255,0.12)]
          active:scale-[0.97] active:opacity-90"
      >
        {template.category === "ui"
          ? <UIThumbnail template={template} isPurchased={isPurchased} />
          : <PromptThumbnail template={template} isPurchased={isPurchased} />
        }

        <div className="px-4 py-3.5 flex flex-col flex-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] mb-1">
            {categoryLabels[template.category]}
          </span>
          <h3 className="text-[14px] font-semibold text-theme leading-snug group-hover:text-[#0A84FF] transition-colors duration-200">
            {template.name}
          </h3>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#0A84FF]">{formatPrice(template.price)}</span>
            <span className="text-[12px] text-muted group-hover:text-[#0A84FF] transition-colors duration-200 flex items-center gap-0.5">
              Apri <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center anim-fade-in"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div
            className="relative w-full sm:max-w-3xl border border-theme
              rounded-t-[40px] sm:rounded-[40px]
              flex flex-col max-h-[92vh] sm:max-h-[88vh] sm:mx-4
              shadow-[0_40px_80px_rgba(0,0,0,0.5)]
              sheet-enter sm:modal-enter"
            style={{ backgroundColor: "var(--surface-2)", backdropFilter: "blur(60px) saturate(200%)", WebkitBackdropFilter: "blur(60px) saturate(200%)" }}
          >
            {/* Top inset glow */}
            <div className="absolute inset-x-8 top-0 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />

            {/* Handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-[5px] rounded-full bg-theme/15" />
            </div>

            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="hidden sm:flex absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-subtle items-center justify-center text-muted hover:text-theme transition-all duration-200 text-[18px] leading-none hover:scale-110 ios-spring"
            >
              ×
            </button>

            {/* Header */}
            <div className="px-5 sm:px-6 pt-4 pb-4 border-b border-theme shrink-0">
              <div className="flex items-start justify-between gap-4 pr-2 sm:pr-12">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-[0.1em]">
                    {categoryLabels[template.category]}
                  </span>
                  <h2 className="text-[19px] sm:text-xl font-bold text-theme mt-0.5 leading-tight tracking-[-0.02em]">{template.name}</h2>
                  <p className="text-[13px] text-muted mt-1 leading-relaxed">{template.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-muted glass-subtle px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[22px] sm:text-2xl font-black text-[#0A84FF]">{formatPrice(template.price)}</span>
                  <p className="text-[11px] text-muted mt-0.5">una tantum</p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="modal-preview-scroll overflow-y-auto flex-1 min-h-0 bg-card">
              {template.category === "ui" ? (
                <iframe
                  src={`/api/preview/${template.id}`}
                  title="Template preview"
                  className="w-full border-0"
                  style={{ height: "500px" }}
                />
              ) : (
                <PromptPreview content={template.content} />
              )}
            </div>

            {/* CTA */}
            <div className="p-4 sm:p-5 border-t border-theme shrink-0">
              {isPurchased ? (
                <Link
                  href={`/studio?templateId=${template.id}`}
                  className="flex items-center justify-center gap-2 bg-[#5E5CE6] hover:bg-[#6E6CF6] active:scale-[0.97] text-white font-bold rounded-2xl px-6 py-4 w-full text-center transition-all duration-200 ios-spring shadow-[0_4px_20px_rgba(94,92,230,0.35)] text-[16px]"
                >
                  Personalizza in AI Studio →
                </Link>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97] text-white font-bold rounded-2xl px-6 py-4 w-full transition-all duration-200 ios-spring disabled:opacity-50 text-[16px] btn-glow-blue"
                >
                  {loading ? "Caricamento..." : `Acquista — ${formatPrice(template.price)}`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
