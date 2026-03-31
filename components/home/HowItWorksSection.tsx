"use client";

import { STEPS } from "@/lib/homeData";

const KANJI = ["一", "二", "三"] as const;

export default function HowItWorksSection({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="relative z-10 border-t border-theme px-4 sm:px-6 py-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <span className="tategaki">道</span>
            <div className="torii-accent" />
            <span className="tategaki">法</span>
          </div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.18em] mb-3">
            {lang === "it" ? "Come funziona" : "How it works"}
          </p>
          <h2 className="ink-line text-[1.6rem] sm:text-[2rem] font-bold tracking-tight text-theme">
            {lang === "it" ? "Tre passi per il tuo template" : "Three steps to your template"}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`flex flex-col items-center text-center gap-4 p-6 border border-theme transition-all duration-300 ease-premium hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(var(--accent-rgb),0.08)] anim-fade-up delay-${i === 0 ? "0" : i === 1 ? "150" : "300"}`}
            >
              {/* Kanji numeral sovrapposto all'icona */}
              <div className="relative flex items-end justify-center w-16 h-12">
                <span className="kanji-num absolute top-0 left-1/2 -translate-x-1/2" aria-hidden="true">
                  {KANJI[i]}
                </span>
                <div
                  className="relative z-10 w-8 h-8 flex items-center justify-center text-base border border-theme"
                  style={{ background: "var(--card-bg)" }}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
              </div>
              <h3 className="text-[15px] font-bold text-theme">
                {lang === "it" ? step.titleIt : step.titleEn}
              </h3>
              <p className="text-[13px] text-muted leading-relaxed">
                {lang === "it" ? step.descIt : step.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
