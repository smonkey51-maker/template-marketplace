"use client";

export default function CTASection({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="relative z-10 border-t border-theme px-4 sm:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative accent dot */}
        <div className="flex justify-center mb-5">
          <span className="w-[6px] h-[6px] rounded-full" style={{ background: "var(--accent)" }} />
        </div>
        {/* Quote */}
        <blockquote>
          <p
            className="text-[15px] sm:text-[18px] italic leading-relaxed"
            style={{
              fontFamily: "var(--font-gatsunaga)",
              color: "var(--text)",
              opacity: 0.75,
            }}
          >
            {lang === "it"
              ? <>&ldquo;Non c&rsquo;è niente di più definitivo di un template &lsquo;temporaneo&rsquo; che resterà in produzione per i prossimi otto anni.&rdquo;</>
              : <>&ldquo;There&rsquo;s nothing more permanent than a &lsquo;temporary&rsquo; template that ends up in production for the next eight years.&rdquo;</>}
          </p>
        </blockquote>
        {/* Attribution line */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="w-8 h-px" style={{ background: "var(--accent)", opacity: 0.4 }} />
          <span className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: "var(--accent)", opacity: 0.7 }}>
            {lang === "it" ? "Ogni developer, sempre" : "Every developer, always"}
          </span>
          <span className="w-8 h-px" style={{ background: "var(--accent)", opacity: 0.4 }} />
        </div>
      </div>
    </div>
  );
}
