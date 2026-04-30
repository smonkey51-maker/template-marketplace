"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface PricingTier {
  id: string;
  badge?: { it: string; en: string };
  name: { it: string; en: string };
  price: { it: string; en: string };
  period: { it: string; en: string };
  description: { it: string; en: string };
  features: { it: string[]; en: string[] };
  cta: { it: string; en: string };
  ctaHref: string;
  featured?: boolean;
}

const TIERS: PricingTier[] = [
  {
    id: "single",
    name: { it: "Template singolo", en: "Single template" },
    price: { it: "da €19", en: "from €19" },
    period: { it: "acquisto unico", en: "one-time" },
    description: {
      it: "Ogni template venduto separatamente. Paghi solo quello che usi. Download immediato.",
      en: "Each template sold separately. Pay only for what you use. Instant download.",
    },
    features: {
      it: [
        "Download immediato del file",
        "Accesso a vita alla versione acquistata",
        "Anteprima completa prima dell'acquisto",
        "Checkout come ospite disponibile",
        "Compatibile con AI Studio",
      ],
      en: [
        "Immediate file download",
        "Lifetime access to purchased version",
        "Full preview before purchase",
        "Guest checkout available",
        "AI Studio compatible",
      ],
    },
    cta: { it: "Sfoglia il catalogo", en: "Browse catalog" },
    ctaHref: "#browse",
  },
  {
    id: "bundle",
    badge: { it: "Più conveniente", en: "Best value" },
    name: { it: "Bundle tematico", en: "Themed bundle" },
    price: { it: "da €49", en: "from €49" },
    period: { it: "acquisto unico", en: "one-time" },
    description: {
      it: "Gruppi curati di template correlati. Risparmio garantito rispetto all'acquisto singolo.",
      en: "Curated groups of related templates. Guaranteed savings vs. buying individually.",
    },
    features: {
      it: [
        "5–12 template per bundle",
        "Risparmio fino al 60%",
        "Template correlati per stesso progetto",
        "Tutti i file in un unico download",
        "AI Studio incluso per ogni template",
      ],
      en: [
        "5–12 templates per bundle",
        "Save up to 60%",
        "Related templates for same project",
        "All files in a single download",
        "AI Studio included for each template",
      ],
    },
    cta: { it: "Vedi i bundle", en: "See bundles" },
    ctaHref: "#browse",
    featured: true,
  },
  {
    id: "studio",
    name: { it: "Studio Access", en: "Studio Access" },
    price: { it: "€49", en: "€49" },
    period: { it: "accesso a vita", en: "lifetime access" },
    description: {
      it: "Accesso illimitato all'AI Studio per generare e personalizzare qualsiasi template con Claude.",
      en: "Unlimited access to AI Studio to generate and customize any template with Claude.",
    },
    features: {
      it: [
        "Generazioni illimitate con Claude AI",
        "Personalizzazioni senza limite di uso",
        "Accesso a tutti i template futuri",
        "Modelli AI aggiornati automaticamente",
        "Export HTML illimitato",
      ],
      en: [
        "Unlimited generations with Claude AI",
        "Unlimited customizations",
        "Access to all future templates",
        "AI models updated automatically",
        "Unlimited HTML export",
      ],
    },
    cta: { it: "Attiva Studio Access", en: "Activate Studio Access" },
    ctaHref: "/studio",
  },
];

function PricingCard({
  tier,
  index,
  lang,
  inView,
}: {
  tier: PricingTier;
  index: number;
  lang: "it" | "en";
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.12, ease }}
      style={{
        display: "flex",
        flexDirection: "column",
        border: tier.featured ? "2px solid var(--apple-text)" : "1px solid var(--apple-border)",
        background: tier.featured ? "var(--apple-text)" : "var(--apple-surface)",
        padding: "clamp(28px, 3.5vw, 44px)",
        position: "relative",
        flex: 1,
        minWidth: "0",
      }}
    >
      {/* Featured badge */}
      {tier.badge && (
        <div
          style={{
            position: "absolute",
            top: tier.featured ? "-1px" : "-13px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "3px 12px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "var(--accent)",
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          {tier.badge[lang]}
        </div>
      )}

      {/* Tier name */}
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: tier.featured ? "rgba(255,255,255,0.6)" : "var(--apple-text-secondary)",
          marginBottom: "16px",
          fontFamily: "var(--font-jakarta), sans-serif",
        }}
      >
        {tier.name[lang]}
      </p>

      {/* Price */}
      <div style={{ marginBottom: "8px" }}>
        <span
          style={{
            fontSize: "clamp(32px, 4vw, 44px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: tier.featured ? "#FFFFFF" : "var(--apple-text)",
            fontFamily: "var(--font-montserrat), sans-serif",
          }}
        >
          {tier.price[lang]}
        </span>
      </div>
      <p
        style={{
          fontSize: "12px",
          color: tier.featured ? "rgba(255,255,255,0.5)" : "var(--apple-text-tertiary)",
          marginBottom: "20px",
          fontFamily: "var(--font-jakarta), sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        {tier.period[lang]}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.65,
          color: tier.featured ? "rgba(255,255,255,0.7)" : "var(--apple-text-secondary)",
          marginBottom: "28px",
          fontFamily: "var(--font-jakarta), sans-serif",
        }}
      >
        {tier.description[lang]}
      </p>

      {/* Separator */}
      <div
        style={{
          height: "1px",
          background: tier.featured ? "rgba(255,255,255,0.12)" : "var(--apple-divider)",
          marginBottom: "24px",
        }}
      />

      {/* Feature list */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
        {tier.features[lang].map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              fontSize: "13px",
              color: tier.featured ? "rgba(255,255,255,0.75)" : "var(--apple-text-secondary)",
              fontFamily: "var(--font-jakarta), sans-serif",
              lineHeight: 1.5,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ flexShrink: 0, marginTop: "1px", color: tier.featured ? "#A8FF78" : "var(--accent)" }}
            >
              <path d="M2.5 7l3 3L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <Link
        href={tier.ctaHref}
        onClick={(e) => {
          if (tier.ctaHref.startsWith("#")) {
            e.preventDefault();
            document.getElementById(tier.ctaHref.slice(1))?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "13px 20px",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          background: tier.featured ? "#FFFFFF" : "var(--apple-text)",
          color: tier.featured ? "#000000" : "var(--apple-bg)",
          textDecoration: "none",
          transition: "opacity 0.15s ease",
          fontFamily: "var(--font-jakarta), sans-serif",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      >
        {tier.cta[lang]}
      </Link>
    </motion.div>
  );
}

export default function Pricing() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        background: "var(--apple-bg-alt)",
        padding: "clamp(80px, 12vw, 140px) 5vw",
        borderTop: "1px solid var(--apple-divider)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "clamp(48px, 6vw, 72px)", textAlign: "center", maxWidth: "600px", margin: "0 auto clamp(48px, 6vw, 72px)" }}>
          <motion.p
            className="apple-eyebrow"
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "16px" }}
          >
            {lang === "it" ? "Prezzi" : "Pricing"}
          </motion.p>
          <motion.h2
            className="apple-headline"
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: "16px" }}
          >
            {lang === "it" ? "Trasparenza totale." : "Total transparency."}
          </motion.h2>
          <motion.p
            className="apple-subhead"
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease }}
            style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
          >
            {lang === "it"
              ? "Nessun abbonamento obbligatorio. Paghi solo quello che scegli, una volta sola."
              : "No mandatory subscriptions. Pay only for what you choose, once."}
          </motion.p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(12px, 2vw, 20px)",
            alignItems: "start",
          }}
        >
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} lang={lang} inView={inView} />
          ))}
        </div>

        {/* Fine print */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: "32px",
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {[
            lang === "it" ? "Nessun abbonamento nascosto" : "No hidden subscriptions",
            lang === "it" ? "Pagamento sicuro via Stripe" : "Secure payment via Stripe",
            lang === "it" ? "Fattura disponibile su richiesta" : "Invoice available on request",
          ].map((note) => (
            <span
              key={note}
              style={{
                fontSize: "12px",
                color: "var(--apple-text-tertiary)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "var(--font-jakarta), sans-serif",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "var(--accent)", flexShrink: 0 }}>
                <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {note}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
