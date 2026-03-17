"use client";

import { useEffect, useState } from "react";
import { getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";

export default function PreviewModal({ templateId, onClose }: {
  templateId: string;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const template = getTemplate(templateId);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!template) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-5xl flex flex-col rounded-[24px] overflow-hidden
          shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/10 anim-scale-in"
        style={{ height: "min(85vh, 780px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1C1C1E] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-[12px] text-white/50 font-medium select-none">{template.name}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white/90 transition-colors duration-200 font-medium"
            aria-label="Chiudi anteprima"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white overflow-hidden">
          {template.category === "ui" ? (
            <div className="relative w-full h-full">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F2F2F7]">
                  <div className="w-7 h-7 rounded-full border-2 border-[#0A84FF] border-t-transparent animate-spin" />
                </div>
              )}
              <iframe
                src={`/api/preview/${template.id}`}
                title={template.name}
                className="w-full h-full border-0 block"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-8 bg-[#FFFEF7]">
              <div className="max-w-2xl mx-auto font-mono text-[14px] text-[#1C1C1E] leading-relaxed whitespace-pre-wrap">
                {template.content.split(/({{[^}]+}})/g).map((part, i) =>
                  part.startsWith("{{") ? (
                    <span key={i} className="inline-block bg-[#007AFF]/10 text-[#007AFF] rounded-[5px] px-1.5 py-0.5 font-semibold text-[13px]">{part}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#1C1C1E] border-t border-white/10 shrink-0">
          <div>
            <p className="text-[13px] font-bold text-white leading-tight">{template.name}</p>
            <p className="text-[11px] text-white/40 mt-0.5">{lang === "it" ? "Acquisto una tantum" : "One-time purchase"}</p>
          </div>
          <a
            href={`/preview/${template.id}`}
            className="px-5 py-2.5 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-bold rounded-2xl text-[13px]
              transition-all duration-200 ios-spring active:scale-[0.97]
              shadow-[0_4px_16px_rgba(10,132,255,0.4)]"
          >
            {lang === "it" ? "Vedi dettagli →" : "View details →"}
          </a>
        </div>
      </div>
    </div>
  );
}
