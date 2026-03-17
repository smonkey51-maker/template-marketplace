"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Template, formatPrice } from "@/lib/templates";

const categoryLabels: Record<string, string> = {
  ui: "UI Template",
  prompt: "Prompt Template",
};

/* ─── iOS Notes-style prompt preview ─── */
function PromptPreview({ content }: { content: string }) {
  const parts = content.split(/({{[^}]+}})/g);
  return (
    <div className="bg-[#FFFEF7] m-4 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F7F6EE] border-b border-black/6">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="text-xs text-[#8E8E93] ml-2 font-medium">Prompt Template</span>
      </div>
      <div className="p-5 font-mono text-[13px] text-[#1C1C1E] leading-relaxed whitespace-pre-wrap overflow-auto max-h-[460px]">
        {parts.map((part, i) =>
          part.startsWith("{{") ? (
            <span
              key={i}
              className="inline-block bg-[#007AFF]/12 text-[#007AFF] rounded-[5px] px-1 py-0.5 font-semibold text-[12px]"
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
    </div>
  );
}

/* ─── Prompt card thumbnail ─── */
function PromptThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  const preview = template.content.slice(0, 160);
  const parts = preview.split(/({{[^}]+}})/g);
  return (
    <div className="relative h-44 overflow-hidden bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E] p-3 flex items-start">
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
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/80 via-transparent to-transparent" />
      {isPurchased && (
        <span className="absolute bottom-2 left-2 z-10 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm">
          ✓ Acquistato
        </span>
      )}
    </div>
  );
}

/* ─── UI card thumbnail ─── */
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
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
      {isPurchased && (
        <span className="absolute bottom-2 left-2 z-10 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm">
          ✓ Acquistato
        </span>
      )}
    </div>
  );
}

/* ─── Main component ─── */
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
        className="group cursor-pointer bg-card border border-theme rounded-[28px] overflow-hidden flex flex-col
          hover:shadow-xl hover:-translate-y-1
          active:scale-[0.97] active:opacity-90
          transition-all duration-300 ios-spring"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        {template.category === "ui"
          ? <UIThumbnail template={template} isPurchased={isPurchased} />
          : <PromptThumbnail template={template} isPurchased={isPurchased} />
        }

        <div className="px-4 py-3.5 flex flex-col flex-1">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-1">
            {categoryLabels[template.category]}
          </span>
          <h3 className="text-[15px] font-semibold text-theme group-hover:text-[#0A84FF] transition-colors duration-200 leading-snug">
            {template.name}
          </h3>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#0A84FF]">{formatPrice(template.price)}</span>
            <span className="text-[12px] text-muted group-hover:text-[#0A84FF] transition-colors duration-200">
              Anteprima →
            </span>
          </div>
        </div>
      </div>

      {/* ── Modal / Bottom Sheet ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          {/* Sheet */}
          <div
            className="relative w-full sm:max-w-3xl border border-theme
              rounded-t-[32px] sm:rounded-[32px]
              shadow-2xl
              flex flex-col max-h-[92vh] sm:max-h-[88vh] sm:mx-4
              sheet-enter sm:modal-enter"
            style={{ backgroundColor: "var(--surface-2)", backdropFilter: "blur(40px)" }}
          >
            {/* Handle (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-9 h-1 rounded-full bg-theme/20" />
            </div>

            {/* Close (desktop) */}
            <button
              onClick={() => setModalOpen(false)}
              className="hidden sm:flex absolute top-4 right-4 z-10 w-8 h-8 rounded-full items-center justify-center text-muted hover:text-theme transition-all duration-200 text-lg leading-none hover:bg-card"
            >
              ×
            </button>

            {/* Header */}
            <div className="px-6 pt-4 pb-4 border-b border-theme shrink-0">
              <div className="flex items-start justify-between gap-4 pr-4 sm:pr-10">
                <div>
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-widest">
                    {categoryLabels[template.category]}
                  </span>
                  <h2 className="text-xl font-bold text-theme mt-0.5 leading-tight">{template.name}</h2>
                  <p className="text-[14px] text-muted mt-1 leading-relaxed">{template.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-muted bg-card border border-theme px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-extrabold text-[#0A84FF]">{formatPrice(template.price)}</span>
                  <p className="text-[11px] text-muted mt-0.5">one-time</p>
                </div>
              </div>
            </div>

            {/* Preview area */}
            <div className="overflow-y-auto flex-1 min-h-0 bg-card">
              {template.category === "ui" ? (
                <iframe
                  src={`/api/preview/${template.id}`}
                  title="Template preview"
                  className="w-full border-0 pointer-events-none"
                  style={{ height: "500px" }}
                />
              ) : (
                <PromptPreview content={template.content} />
              )}
            </div>

            {/* CTA */}
            <div className="p-5 border-t border-theme shrink-0">
              {isPurchased ? (
                <Link
                  href={`/studio?templateId=${template.id}`}
                  className="flex items-center justify-center gap-2 bg-[#5E5CE6] hover:bg-[#6E6CF6] active:scale-[0.97] text-white font-semibold rounded-2xl px-6 py-4 w-full text-center transition-all duration-200 ios-spring shadow-lg shadow-violet-900/30"
                >
                  Personalizza in AI Studio →
                </Link>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97] active:bg-[#0066CC] text-white font-bold rounded-2xl px-6 py-4 w-full transition-all duration-200 ios-spring disabled:opacity-50 text-[17px] shadow-lg shadow-blue-500/25"
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
