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
      if (res.ok) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const copy = {
    it: {
      label: "Newsletter",
      title: "Nuovi template in anteprima",
      subtitle: "Nessuno spam. Solo novità utili, ogni tanto.",
      placeholder: "La tua email",
      cta: "Iscriviti",
      success: "Sei dentro. Ti aggiungiamo alla lista ✓",
      error: "Qualcosa è andato storto. Riprova.",
    },
    en: {
      label: "Newsletter",
      title: "New templates, first",
      subtitle: "No spam. Just useful updates, once in a while.",
      placeholder: "Your email",
      cta: "Subscribe",
      success: "You're in. We'll keep you posted ✓",
      error: "Something went wrong. Please try again.",
    },
  };

  const c = copy[lang];

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Text */}
        <div className="text-center sm:text-left">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">
            {c.label}
          </p>
          <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{c.title}</p>
          <p className="text-[13px] text-muted mt-0.5">{c.subtitle}</p>
        </div>

        {/* Form */}
        <div className="w-full sm:w-auto shrink-0">
          {status === "success" ? (
            <p className="text-[13px] text-emerald-500 font-medium">{c.success}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.placeholder}
                required
                className="w-48 sm:w-56 bg-input border border-theme rounded-xl px-3 py-2.5 text-[13px] text-theme placeholder:text-muted outline-none focus:border-[#0A84FF]/50 transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-xl text-[13px] transition-all duration-200 active:scale-[0.97] disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "…" : c.cta}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-[11px] text-red-500 mt-1.5">{c.error}</p>
          )}
        </div>
      </div>
    </section>
  );
}
