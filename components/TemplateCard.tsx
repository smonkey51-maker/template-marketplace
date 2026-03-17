"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Template, formatPrice } from "@/lib/templates";

const categoryLabels: Record<string, string> = {
  ui: "UI Template",
  prompt: "Prompt Template",
};

const categoryGradients: Record<string, string> = {
  ui: "from-blue-600 to-violet-700",
  prompt: "from-orange-500 to-rose-600",
};

interface TemplateCardProps {
  template: Template;
  purchasedIds: string[];
}

function UIPreview({ templateId }: { templateId: string }) {
  return (
    <iframe
      src={`/api/preview/${templateId}`}
      title="Template preview"
      className="w-full border-0 pointer-events-none"
      style={{ height: "500px" }}
    />
  );
}

function PromptPreview({ content }: { content: string }) {
  const parts = content.split(/({{[^}]+}})/g);
  return (
    <div className="p-5 font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap overflow-auto max-h-[500px]">
      {parts.map((part, i) =>
        part.startsWith("{{") ? (
          <span key={i} className="bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded px-1">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </div>
  );
}

function CardThumbnail({ template, isPurchased }: { template: Template; isPurchased: boolean }) {
  if (template.category === "ui") {
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
        {isPurchased && (
          <span className="absolute bottom-2 left-2 z-10 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
            ✓ Acquistato
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
      </div>
    );
  }

  // Prompt template thumbnail — styled text preview
  const preview = template.content.slice(0, 180);
  const parts = preview.split(/({{[^}]+}})/g);
  return (
    <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${categoryGradients.prompt} p-4`}>
      <div className="font-mono text-xs text-white/80 leading-relaxed line-clamp-6">
        {parts.map((part, i) =>
          part.startsWith("{{") ? (
            <span key={i} className="bg-black/30 text-amber-300 rounded px-0.5">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      {isPurchased && (
        <span className="absolute bottom-2 left-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
          ✓ Acquistato
        </span>
      )}
    </div>
  );
}

export default function TemplateCard({ template, purchasedIds }: TemplateCardProps) {
  const { isSignedIn } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPurchased = purchasedIds.includes(template.id);

  const handleBuy = async () => {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }
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
      {/* Card */}
      <div
        className="group cursor-pointer bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:bg-white/7 hover:border-white/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
        onClick={() => setModalOpen(true)}
      >
        <CardThumbnail template={template} isPurchased={isPurchased} />

        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-gray-500 mb-1">{categoryLabels[template.category]}</span>
          <h3 className="text-base font-semibold text-white group-hover:text-orange-300 transition-colors leading-tight">
            {template.name}
          </h3>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-yellow-400">{formatPrice(template.price)}</span>
            <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
              Vedi anteprima →
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="relative w-full max-w-3xl bg-gray-900/85 backdrop-blur-2xl border border-white/12 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col max-h-[90vh]">
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 text-lg leading-none"
            >
              ×
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/8 shrink-0">
              <div className="flex items-start justify-between gap-4 pr-10">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {categoryLabels[template.category]}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{template.name}</h2>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-400 bg-white/8 border border-white/10 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-extrabold text-yellow-400 shrink-0">
                  {formatPrice(template.price)}
                </span>
              </div>
            </div>

            {/* Preview */}
            <div className="overflow-auto flex-1 bg-gray-950/50">
              {template.category === "ui" ? (
                <UIPreview templateId={template.id} />
              ) : (
                <PromptPreview content={template.content} />
              )}
            </div>

            {/* CTA */}
            <div className="p-6 border-t border-white/8 shrink-0">
              {isPurchased ? (
                <Link
                  href={`/studio?templateId=${template.id}`}
                  className="block bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl px-6 py-3.5 w-full text-center transition-all duration-200"
                >
                  Personalizza in AI Studio →
                </Link>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl px-6 py-3.5 w-full transition-all duration-200 disabled:opacity-50 text-lg shadow-lg shadow-orange-500/25"
                >
                  {loading ? "Caricamento..." : `Acquista ora — ${formatPrice(template.price)}`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
