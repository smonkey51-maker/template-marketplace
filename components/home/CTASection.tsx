"use client";

import Link from "next/link";

export default function CTASection({ lang }: { lang: "it" | "en" }) {
  return (
    <div
      className="relative z-10 border-t border-theme px-4 sm:px-8 py-16 sm:py-24 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(var(--accent-rgb), 0.10), transparent 70%)",
      }}
    >
      {/* Floating hanko seal background */}
      <span
        aria-hidden
        className="absolute display-serif select-none pointer-events-none"
        style={{
          fontSize: "clamp(200px, 32vw, 400px)",
          color: "var(--accent)",
          opacity: 0.06,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-8deg)",
          fontWeight: 300,
        }}
      >
        印
      </span>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Hanko seal — Japanese ink stamp */}
        <div className="flex justify-center mb-8">
          <div className="hanko-seal" aria-hidden="true">印</div>
        </div>

        {/* Headline */}
        <h2
          className="display-serif mb-6"
          style={{
            fontSize: "clamp(28px, 4.5vw, 48px)",
            color: "var(--text)",
          }}
        >
          {lang === "it" ? (
            <>Inizia con un <em>template</em>.<br />Finisci con la <em>tua visione</em>.</>
          ) : (
            <>Start with a <em>template</em>.<br />Finish with <em>your vision</em>.</>
          )}
        </h2>

        {/* Quote */}
        <blockquote className="max-w-xl mx-auto mb-8">
          <p
            className="text-[15px] sm:text-[17px] leading-relaxed italic"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              color: "var(--muted)",
            }}
          >
            {lang === "it"
              ? <>&ldquo;Non c&rsquo;è niente di più definitivo di un template &lsquo;temporaneo&rsquo; che resterà in produzione per i prossimi otto anni.&rdquo;</>
              : <>&ldquo;There&rsquo;s nothing more permanent than a &lsquo;temporary&rsquo; template that ends up in production for the next eight years.&rdquo;</>}
          </p>
        </blockquote>

        {/* Ma divider */}
        <div className="ma-divider mb-8" aria-hidden="true"><span>間</span></div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#browse" className="btn-brand magnetic">
            {lang === "it" ? "Sfoglia il catalogo →" : "Browse catalog →"}
          </Link>
          <Link href="/studio" className="btn-ghost gap-1.5">
            {lang === "it" ? "Apri AI Studio" : "Open AI Studio"}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Attribution line */}
        <div className="flex items-center justify-center gap-3 mt-10">
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
