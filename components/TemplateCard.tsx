"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Template, formatPrice } from "@/lib/templates";

const thumbnailGradients: Record<string, string> = {
  ui: "from-blue-600/80 to-violet-700/80",
  prompt: "from-orange-600/80 to-rose-600/80",
};

const thumbnailEmojis: Record<string, string> = {
  ui: "🖼",
  prompt: "📝",
};

const categoryLabels: Record<string, string> = {
  ui: "UI Template",
  prompt: "Prompt Template",
};

interface TemplateCardProps {
  template: Template;
  purchasedIds: string[];
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
      {/* Card — glassmorphism */}
      <div
        className="group cursor-pointer bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:bg-white/7 hover:border-white/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
        onClick={() => setModalOpen(true)}
      >
        {/* Thumbnail */}
        <div
          className={`h-40 bg-gradient-to-br ${thumbnailGradients[template.category]} flex items-center justify-center relative`}
        >
          <span className="text-5xl select-none">{thumbnailEmojis[template.category]}</span>
          {isPurchased && (
            <span className="absolute bottom-3 left-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 text-xs font-medium flex items-center gap-1">
              ✓ Acquistato
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-gray-500 mb-1">
            {categoryLabels[template.category]}
          </span>
          <h3 className="text-base font-semibold text-white group-hover:text-orange-300 transition-colors leading-tight">
            {template.name}
          </h3>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-yellow-400">
              {formatPrice(template.price)}
            </span>
            <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
              Dettagli →
            </span>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl bg-gray-900/80 backdrop-blur-2xl border border-white/12 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 mx-4">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              aria-label="Chiudi"
            >
              ×
            </button>

            {/* Modal Header — gradient thumbnail strip */}
            <div
              className={`h-16 bg-gradient-to-br ${thumbnailGradients[template.category]} flex items-center px-6`}
            >
              <span className="text-xs font-bold text-white/80 bg-black/30 px-2 py-0.5 rounded-full">
                {categoryLabels[template.category]}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              {/* Name + Price */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-white leading-tight">
                  {template.name}
                </h2>
                <span className="text-xl font-extrabold text-yellow-400 shrink-0">
                  {formatPrice(template.price)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {template.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Code Preview — macOS style */}
              <div className="rounded-2xl bg-gray-950 border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-gray-600 ml-2">preview</span>
                </div>
                <pre className="p-4 text-xs font-mono text-gray-400 overflow-auto max-h-64 leading-relaxed whitespace-pre-wrap">
                  {template.content.slice(0, 600)}
                  {template.content.length > 600 && (
                    <span className="text-gray-600">…</span>
                  )}
                </pre>
              </div>

              {/* CTA */}
              {isPurchased ? (
                <Link
                  href={`/studio?templateId=${template.id}`}
                  className="bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl px-6 py-3 w-full text-center transition-all duration-200"
                >
                  Personalizza in AI Studio →
                </Link>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl px-6 py-3 w-full transition-all duration-200 disabled:opacity-50 text-lg"
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
