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
        aria-live="polite"
        className="fixed bottom-6 inset-x-0 z-[300] flex flex-col items-center gap-2.5 pointer-events-none px-4"
      >
        {toasts.map((t) => (
          <ToastBubble key={t.id} toast={t} onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastBubble({ toast: t, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(show);
  }, []);

  const icon = t.type === "success" ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7l3.5 3.5L12 3" stroke="#30D158" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : t.type === "error" ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 3l8 8M11 3L3 11" stroke="#FF453A" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="#0A84FF" strokeWidth="1.5"/>
      <path d="M7 6.5v4M7 4.5v.5" stroke="#0A84FF" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const accent = t.type === "success" ? "#30D158" : t.type === "error" ? "#FF453A" : "#0A84FF";

  return (
    <div
      onClick={onDismiss}
      className="pointer-events-auto cursor-pointer select-none flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl text-[14px] font-medium text-white border"
      style={{
        background: "rgba(28,28,30,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: `${accent}30`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${accent}18`,
        transition: "opacity 0.25s ease, transform 0.3s cubic-bezier(.34,1.2,.64,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      {t.message}
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}
