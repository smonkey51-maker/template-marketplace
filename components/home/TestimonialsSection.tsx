"use client";

import { TESTIMONIALS } from "@/lib/homeData";
import TestimonialCard from "@/components/home/TestimonialCard";

export default function TestimonialsSection({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="relative z-10 border-t border-theme px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
      {/* Background kanji watermark */}
      <span
        aria-hidden
        className="absolute display-serif select-none pointer-events-none"
        style={{
          fontSize: "clamp(220px, 34vw, 440px)",
          color: "var(--terra, var(--accent))",
          opacity: 0.04,
          top: "10%",
          right: "-8%",
          transform: "rotate(8deg)",
          fontWeight: 300,
        }}
      >
        声
      </span>

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <span className="tategaki">声</span>
            <div className="torii-accent" />
            <span className="tategaki">心</span>
          </div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.22em] mb-4">
            {lang === "it" ? "Recensioni" : "Reviews"}
          </p>
          <h2
            className="display-serif tracking-tight"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--text)",
            }}
          >
            {lang === "it" ? (
              <>Amato dai <em>professionisti</em></>
            ) : (
              <>Loved by <em>professionals</em></>
            )}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}
