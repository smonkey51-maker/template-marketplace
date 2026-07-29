"use client";

import { TESTIMONIALS } from "@/lib/homeData";

export type Testimonial = (typeof TESTIMONIALS)[number];

export default function TestimonialCard({
  testimonial,
  lang,
}: {
  testimonial: Testimonial;
  lang: "it" | "en";
}) {
  return (
    <div className="shoji-card glass-subtle p-5 flex flex-col gap-3.5">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 10 10" fill="currentColor" style={{ color: "var(--accent)" }} aria-hidden>
            <path d="M5 0l1.2 3.7H10L6.9 5.9l1.2 3.7L5 7.5l-3.1 2.1 1.2-3.7L0 3.7h3.8z"/>
          </svg>
        ))}
      </div>
      {/* Quote */}
      <p className="text-[13px] text-muted leading-relaxed flex-1">
        &ldquo;{lang === "it" ? testimonial.quoteIt : testimonial.quoteEn}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-theme">
        <div className={`w-8 h-8 bg-gradient-to-br ${testimonial.accent} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0`}>
          {testimonial.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-theme leading-tight">
            {lang === "it" ? testimonial.nameIt : testimonial.nameEn}
          </p>
          <p className="text-[11px] text-muted leading-tight">
            {lang === "it" ? testimonial.roleIt : testimonial.roleEn}
          </p>
        </div>
        <span className="flex items-center gap-1 text-[9px] font-semibold shrink-0 px-1.5 py-0.5"
          style={{ color: "var(--success)", background: "var(--success-dim)" }}>
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6l2.8 3 5.2-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {lang === "it" ? "Acquisto verificato" : "Verified"}
        </span>
      </div>
    </div>
  );
}
