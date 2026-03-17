"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";

export default function EmailCapture() {
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copy = {
    it: {
      title: "Ricevi i nuovi template in anteprima",
      subtitle: "Nessuno spam. Solo novità utili, una volta ogni tanto.",
      placeholder: "La tua email",
      cta: "Iscriviti gratis",
      success: "Perfetto! Ti aggiungiamo alla lista 🎉",
      error: "Qualcosa è andato storto. Riprova.",
    },
    en: {
      title: "Get new templates first",
      subtitle: "No spam. Just useful updates, once in a while.",
      placeholder: "Your email",
      cta: "Subscribe for free",
      success: "You're in! We'll keep you posted 🎉",
      error: "Something went wrong. Please try again.",
    },
  };

  const c = copy[lang];

  return (
    <section className="relative z-10 px-4 sm:px-6 pb-12 max-w-xl mx-auto">
      <div className="relative bg-surface border border-theme rounded-[28px] p-7 sm:p-8 overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.4), transparent)" }} />

        <p className="text-[11px] font-bold text-[#0A84FF] uppercase tracking-[0.2em] mb-2">Newsletter</p>
        <h2 className="text-[18px] font-black text-theme mb-1.5">{c.title}</h2>
        <p className="text-[13px] text-muted mb-5">{c.subtitle}</p>

        {status === "success" ? (
          <p className="text-[#30D158] font-semibold text-[15px] py-2">{c.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={c.placeholder}
              required
              className="flex-1 bg-input border border-theme rounded-2xl px-4 py-3 text-[14px] text-theme placeholder:text-muted outline-none focus:border-[#0A84FF]/50 transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-3 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-bold rounded-2xl text-[14px] transition-all duration-200 active:scale-[0.97] ios-spring disabled:opacity-50 whitespace-nowrap shadow-[0_4px_16px_rgba(10,132,255,0.3)]"
            >
              {status === "loading" ? "..." : c.cta}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-[#FF453A] text-[12px] mt-2">{c.error}</p>
        )}
      </div>
    </section>
  );
}
