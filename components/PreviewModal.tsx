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
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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
        className="relative z-10 w-full max-w-5xl flex flex-col overflow-hidden
          shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-theme anim-scale-in"
        style={{ height: "min(85vh, 780px)", background: "var(--surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-theme shrink-0" style={{ background: "var(--prompt-header)" }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-[12px] text-muted font-medium select-none">{template.name}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[12px] text-muted hover:text-theme transition-colors duration-200 font-medium"
            aria-label={lang === "it" ? "Chiudi anteprima" : "Close preview"}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden" style={{ background: "var(--card-bg)" }}>
          {template.category === "ui" ? (
            <div className="relative w-full h-full">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "var(--skeleton-bg)" }}>
                  <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
                </div>
              )}
              <iframe
                src={`/api/preview/${template.id}`}
                title={template.name}
                sandbox="allow-scripts"
                className="w-full h-full border-0 block"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-8" style={{ background: "var(--prompt-bg)" }}>
              <div className="max-w-2xl mx-auto font-mono text-[14px] leading-relaxed whitespace-pre-wrap" style={{ color: "var(--prompt-text)" }}>
                {template.content.split(/({{[^}]+}})/g).map((part, i) =>
                  part.startsWith("{{") ? (
                    <span key={i} className="inline-block bg-accent/10 text-accent rounded-[5px] px-1.5 py-0.5 font-semibold text-[13px]">{part}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-theme shrink-0" style={{ background: "var(--prompt-header)" }}>
          <div>
            <p className="text-[13px] font-bold text-theme leading-tight">{template.name}</p>
            <p className="text-[11px] text-muted mt-0.5">{lang === "it" ? "Acquisto una tantum" : "One-time purchase"}</p>
          </div>
          <a
            href={`/preview/${template.id}`}
            className="px-5 py-2.5 font-bold text-[13px] transition-colors duration-200 ios-spring active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
          >
            {lang === "it" ? "Vedi dettagli →" : "View details →"}
          </a>
        </div>
      </div>
    </div>
  );
}
