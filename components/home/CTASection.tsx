"use client";

export default function CTASection({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="relative z-10 border-t border-theme px-4 sm:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Hanko seal — Japanese ink stamp */}
        <div className="flex justify-center mb-6">
          <div className="hanko-seal" aria-hidden="true">印</div>
        </div>
        {/* Quote */}
        <blockquote>
          <p
            className="text-[15px] sm:text-[18px] leading-relaxed"
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              color: "var(--text)",
              opacity: 0.75,
            }}
          >
            {lang === "it"
              ? <>&ldquo;Non c&rsquo;è niente di più definitivo di un template &lsquo;temporaneo&rsquo; che resterà in produzione per i prossimi otto anni.&rdquo;</>
              : <>&ldquo;There&rsquo;s nothing more permanent than a &lsquo;temporary&rsquo; template that ends up in production for the next eight years.&rdquo;</>}
          </p>
        </blockquote>
        {/* Ma divider */}
        <div className="ma-divider mt-6" aria-hidden="true"><span>間</span></div>
        {/* Attribution line */}
        <div className="flex items-center justify-center gap-3">
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
