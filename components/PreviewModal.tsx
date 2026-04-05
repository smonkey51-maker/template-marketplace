"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { getTemplate, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";

export default function PreviewModal({ templateId, onClose }: {
  templateId: string;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const template = getTemplate(templateId);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap
  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      trapFocus(e);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // Focus the modal on open
    setTimeout(() => modalRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // Restore focus
      previousFocusRef.current?.focus();
    };
  }, [onClose, trapFocus]);

  if (!template) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-md anim-fade-in" style={{ background: "var(--overlay)" }} onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={template.name}
        className="relative z-10 w-full max-w-5xl flex flex-col overflow-hidden
          shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-theme anim-scale-in outline-none"
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
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-theme shrink-0 gap-3" style={{ background: "var(--prompt-header)" }}>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-theme leading-tight truncate">{template.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[18px] leading-none price-gold" style={{ fontFamily: "var(--font-dm-serif)" }}>
                {template.price === 0 ? (lang === "it" ? "Gratis" : "Free") : formatPrice(template.price)}
              </span>
              <span className="text-[10px] text-muted">{lang === "it" ? "una tantum" : "one-time"}</span>
            </div>
          </div>
          <a
            href={`/preview/${template.id}`}
            className="btn-brand btn-brand-sm text-[13px] shrink-0"
          >
            {lang === "it" ? "Vedi dettagli →" : "View details →"}
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
