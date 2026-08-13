"use client";

import { CreditCard, Download, RotateCcw } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

/**
 * Three-step "how it works" strip + trust badges — the one structural piece
 * from the Figma editorial redesign ("Modern Art Gallery Website" prototype)
 * that had no equivalent on the homepage: mono index numbers, a bordered
 * step grid, sharp corners. Ported into FORMA's actual tokens (bordeaux
 * accent, Fraunces/Inter, r-md/r-sm) rather than the prototype's
 * black/orange palette — see CLAUDE.md "Depth" and "Design Tokens".
 */
const STEPS_IT = [
  {
    n: "01",
    title: "Scegli il template",
    text: "Sfoglia il catalogo per categoria e apri l'anteprima dal vivo prima di comprare.",
  },
  {
    n: "02",
    title: "Paga in sicurezza",
    text: "Checkout Stripe. Acquisto come ospite consentito, nessun costo nascosto.",
  },
  {
    n: "03",
    title: "Scarica subito",
    text: "File pronti immediatamente dopo l'acquisto, con accesso permanente da account.",
  },
];

const STEPS_EN = [
  {
    n: "01",
    title: "Pick a template",
    text: "Browse the catalogue by category and open the live preview before buying.",
  },
  {
    n: "02",
    title: "Pay securely",
    text: "Stripe checkout. Guest purchase allowed, no hidden costs.",
  },
  {
    n: "03",
    title: "Download instantly",
    text: "Files are ready right after purchase, with permanent access from your account.",
  },
];

export default function HowItWorks() {
  const { lang } = useLang();
  const steps = lang === "it" ? STEPS_IT : STEPS_EN;

  const trust = [
    {
      icon: CreditCard,
      label: lang === "it" ? "Pagamento sicuro" : "Secure payment",
      detail: "Stripe",
    },
    {
      icon: RotateCcw,
      label: lang === "it" ? "Rimborso 14 giorni" : "14-day refund",
      detail: lang === "it" ? "Soddisfatti o rimborsati" : "Money-back guarantee",
    },
    {
      icon: Download,
      label: lang === "it" ? "Download immediato" : "Instant download",
      detail: lang === "it" ? "Accesso permanente" : "Permanent access",
    },
  ];

  return (
    <section
      className="border-b border-theme"
      style={{ background: "var(--surface)" }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex items-baseline gap-4 border-b border-theme pb-5">
          <span
            className="text-[11px] font-semibold uppercase"
            style={{ color: "var(--muted)", letterSpacing: "0.2em" }}
          >
            {lang === "it" ? "Come funziona" : "How it works"}
          </span>
          <h2
            id="how-it-works-heading"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--text)",
            }}
            className="text-[clamp(1.5rem,3vw,2.25rem)]"
          >
            {lang === "it" ? "Dal browser al download" : "From browser to download"}
          </h2>
        </div>

        <div
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-theme md:grid-cols-3 r-md"
          style={{ background: "var(--border)" }}
        >
          {steps.map((s) => (
            <div key={s.n} className="p-8" style={{ background: "var(--surface)" }}>
              <span
                className="text-[11px] font-semibold"
                style={{ color: "var(--accent)", letterSpacing: "0.1em" }}
              >
                [{s.n}]
              </span>
              <h3
                className="mt-5 text-[1.15rem]"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  color: "var(--text)",
                }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {trust.map((tItem) => (
            <div
              key={tItem.label}
              className="flex items-center gap-3 border border-theme px-5 py-4 r-md"
              style={{ background: "var(--surface)" }}
            >
              <tItem.icon
                size={18}
                strokeWidth={1.75}
                aria-hidden
                className="shrink-0"
                style={{ color: "var(--accent)" }}
              />
              <div>
                <p className="text-[13px]" style={{ color: "var(--text)" }}>
                  {tItem.label}
                </p>
                <p
                  className="text-[10px] uppercase"
                  style={{ color: "var(--muted)", letterSpacing: "0.1em" }}
                >
                  {tItem.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
