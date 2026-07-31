"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

type ToastType = "success" | "error" | "info";
type ToastItem = { id: string; message: string; type: ToastType };

const ToastContext = createContext<{
  toast: (message: string, type?: ToastType) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-6 inset-x-0 z-[300] flex flex-col items-center gap-2.5 pointer-events-none px-4"
      >
        {toasts.map((t) => (
          <ToastBubble
            key={t.id}
            toast={t}
            onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastBubble({ toast: t, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const show = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(show);
  }, [reduced]);

  const accentVar = t.type === "error" ? "var(--error)" : "var(--accent)";

  const icon =
    t.type === "success" ? (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M2 7l3.5 3.5L12 3"
          stroke={accentVar}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : t.type === "error" ? (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 3l8 8M11 3L3 11" stroke={accentVar} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="5.5" stroke={accentVar} strokeWidth="1.5" />
        <path d="M7 6.5v4M7 4.5v.5" stroke={accentVar} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );

  const accentRgb = t.type === "error" ? "var(--error)" : "var(--accent)";

  return (
    <div
      onClick={onDismiss}
      className="r-pill pointer-events-auto cursor-pointer select-none flex items-center gap-3 pl-4 pr-5 py-3 text-[14px] font-medium border"
      style={{
        background: "var(--surface)",
        color: "var(--text)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: `color-mix(in srgb, ${accentRgb} 19%, transparent)`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px color-mix(in srgb, ${accentRgb} 9%, transparent)`,
        transition: reduced
          ? "none"
          : "opacity 0.25s ease, transform 0.3s cubic-bezier(.34,1.2,.64,1)",
        opacity: visible ? 1 : 0,
        transform: visible || reduced ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-1">{t.message}</span>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden
        className="flex-shrink-0 opacity-40 ml-1"
      >
        <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}
