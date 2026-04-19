"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import EmailCapture from "@/components/EmailCapture";

export default function Footer() {
  const { lang } = useLang();
  const f = t[lang].footer;

  return (
    <footer className="relative z-10 border-t pb-20 sm:pb-0 overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      {/* Kanji watermark — giant, animated */}
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-fraunces), serif",
          fontSize: "clamp(280px, 42vw, 520px)",
          fontWeight: 300,
          color: "var(--accent)",
          opacity: 0.05,
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
          bottom: "-8%",
          right: "-4%",
          transform: "rotate(-6deg)",
        }}
      >
        形
      </span>

      {/* Newsletter band */}
      <div className="relative border-b" style={{ borderColor: "var(--border)" }}>
        <EmailCapture />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-3">
            <span
              className="text-[18px] leading-none tracking-[0.04em] uppercase select-none"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, color: "var(--text)" }}
            >
              For<span style={{ color: "var(--accent)" }}>ma</span>
            </span>
            <p className="text-[12px] leading-relaxed max-w-[240px]" style={{ color: "var(--muted)" }}>
              {lang === "it"
                ? "Template premium e prompt AI, curati come piccoli oggetti artigianali."
                : "Premium templates and AI prompts, crafted like small artisanal objects."}
            </p>
            <span
              className="mt-2 display-serif text-[28px] leading-none"
              style={{ color: "var(--accent)", opacity: 0.85 }}
              aria-hidden
            >
              形
            </span>
          </div>

          {/* Product links */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "var(--font-montserrat)", color: "var(--accent)" }}>
              {lang === "it" ? "Prodotto" : "Product"}
            </p>
            {[
              { href: "/#bundles", label: f.bundles },
              { href: "/wishlist", label: f.saved },
              { href: "/guide",    label: f.guide },
              { href: "/studio",   label: f.studio },
              { href: "/account",  label: f.account },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-[12.5px] link-muted">
                <span className="link-underline">{l.label}</span>
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "var(--font-montserrat)", color: "var(--accent)" }}>
              {lang === "it" ? "Legale" : "Legal"}
            </p>
            {[
              { href: "/privacy", label: f.privacy },
              { href: "/terms",   label: f.terms },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-[12.5px] link-muted">
                <span className="link-underline">{l.label}</span>
              </Link>
            ))}
          </div>

          {/* Philosophy / Craft */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "var(--font-montserrat)", color: "var(--accent)" }}>
              {lang === "it" ? "Filosofia" : "Philosophy"}
            </p>
            <p className="text-[12px] leading-relaxed italic display-serif" style={{ color: "var(--muted)" }}>
              {lang === "it"
                ? "「 Kanso 」 semplicità.\n「 Shizen 」 naturalezza.\n「 Seijaku 」 quiete."
                : "「 Kanso 」 simplicity.\n「 Shizen 」 naturalness.\n「 Seijaku 」 tranquility."}
            </p>
          </div>
        </div>

        {/* Zen divider */}
        <div className="zen-divider mt-10" aria-hidden="true"><span>◇</span></div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] font-light" style={{ color: "var(--muted)" }}>{f.copyright}</p>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <span className="text-[10px] font-medium flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
              Powered by
              <span style={{ color: "var(--accent)", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>Claude AI</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
