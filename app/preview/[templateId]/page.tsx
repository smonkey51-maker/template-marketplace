"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTemplate, formatPrice } from "@/lib/templates";
import { useUser } from "@clerk/nextjs";

function PromptFullView({ content }: { content: string }) {
  const parts = content.split(/({{[^}]+}})/g);
  return (
    <div className="min-h-full p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="bg-[#FFFEF7] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden">
        {/* macOS-style title bar */}
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

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const templateId = params.templateId as string;
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
          <p className="text-muted text-[15px] mb-4">Template non trovato.</p>
          <Link href="/" className="text-[#0A84FF] font-semibold">← Torna al marketplace</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page flex flex-col">

      {/* ── Floating back button ── */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl
          glass shadow-[0_4px_24px_rgba(0,0,0,0.18)]
          text-[#0A84FF] text-[15px] font-semibold
          hover:scale-105 active:scale-[0.96] ios-spring transition-all duration-200"
        aria-label="Torna indietro"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0">
          <path d="M7 1L1.5 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">Indietro</span>
      </button>

      {/* ── Preview area ── */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "100px" }}>
        {template.category === "ui" ? (
          <iframe
            src={`/api/preview/${template.id}`}
            title={template.name}
            className="w-full border-0"
            style={{ height: "100vh", minHeight: "600px" }}
          />
        ) : (
          <div className="pt-16 pb-4 bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E] min-h-screen">
            <PromptFullView content={template.content} />
          </div>
        )}
      </div>

      {/* ── Fixed bottom CTA bar ── */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 px-4 pb-6 pt-4 border-t border-theme"
        style={{
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          backgroundColor: "var(--nav-bg)",
        }}
      >
        {/* Top glint */}
        <div className="absolute inset-x-8 top-0 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />

        <div className="max-w-xl mx-auto flex items-center gap-4">
          {/* Template info */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-theme truncate">{template.name}</p>
            <p className="text-[12px] text-muted truncate">{template.description}</p>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[18px] font-black text-[#0A84FF]">{formatPrice(template.price)}</span>

            {isPurchased ? (
              <Link
                href={`/studio?templateId=${template.id}`}
                className="px-5 py-3 bg-[#5E5CE6] hover:bg-[#6E6CF6] active:scale-[0.97]
                  text-white font-bold rounded-2xl text-[14px] transition-all duration-200 ios-spring
                  shadow-[0_4px_20px_rgba(94,92,230,0.35)] whitespace-nowrap"
              >
                Apri Studio →
              </Link>
            ) : (
              <button
                onClick={handleBuy}
                disabled={loading}
                className="px-5 py-3 bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97]
                  text-white font-bold rounded-2xl text-[14px] transition-all duration-200 ios-spring
                  disabled:opacity-50 btn-glow-blue whitespace-nowrap"
              >
                {loading ? "..." : `Acquista`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
