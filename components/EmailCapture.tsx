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
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const copy = {
    it: {
      label: "Newsletter",
      title: "Nuovi template in anteprima",
      placeholder: "La tua email",
      cta: "Iscriviti",
      success: "Sei dentro. Ti aggiungiamo alla lista ✓",
      error: "Qualcosa è andato storto. Riprova.",
    },
    en: {
      label: "Newsletter",
      title: "New templates, first",
      placeholder: "Your email",
      cta: "Subscribe",
      success: "You're in. We'll keep you posted ✓",
      error: "Something went wrong. Please try again.",
    },
  };

  const c = copy[lang];

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
        {/* Text */}
        <div className="text-center sm:text-left">
          <p
            className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {c.label}
          </p>
          <p
            className="text-[15px] font-semibold text-theme"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 700 }}
          >
            {c.title}
          </p>
        </div>

        {/* Form */}
        <div className="w-full sm:w-auto shrink-0 flex flex-col items-center sm:items-end">
          {status === "success" ? (
            <p className="text-[13px] font-medium" style={{ color: "var(--success)" }}>
              {c.success}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.placeholder}
                required
                className="glass-pill w-full sm:w-56 px-5 py-3 sm:py-2.5 text-[14px] sm:text-[13px] text-theme placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`btn-brand btn-brand-sm whitespace-nowrap justify-center ${status === "loading" ? "btn-loading" : ""}`}
              >
                {status === "loading" ? (
                  <span className="dots-loading">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  c.cta
                )}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-[11px] mt-1.5" style={{ color: "var(--error)" }}>
              {c.error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
