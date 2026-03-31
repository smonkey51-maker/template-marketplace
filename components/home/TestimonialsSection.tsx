"use client";

import { TESTIMONIALS } from "@/lib/homeData";
import TestimonialCard from "@/components/home/TestimonialCard";

export default function TestimonialsSection({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="relative z-10 border-t border-theme px-4 sm:px-6 py-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <span className="tategaki">声</span>
            <div className="torii-accent" />
            <span className="tategaki">心</span>
          </div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.18em] mb-3">
            {lang === "it" ? "Recensioni" : "Reviews"}
          </p>
          <h2 className="ink-line text-[1.6rem] sm:text-[2rem] font-bold tracking-tight text-theme">
            {lang === "it" ? "Amato dai professionisti" : "Loved by professionals"}
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
