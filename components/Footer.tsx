"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

export default function Footer() {
  const { lang } = useLang();
  const f = t[lang].footer;

  return (
    <footer className="relative z-10 border-t pb-20 sm:pb-0" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2 relative">
            {/* Kanji watermark 形 = katachi = "forma" */}
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-2 select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-montserrat), serif",
                fontSize: "72px",
                fontWeight: 900,
                color: "var(--accent)",
                opacity: 0.04,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >形</span>
            <span
              className="text-[15px] leading-none tracking-[0.06em] uppercase select-none relative z-10"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, color: "var(--text)" }}
            >
              For<span style={{ color: "var(--accent)" }}>ma</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="flex flex-col gap-2.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ fontFamily: "var(--font-montserrat)", color: "var(--muted)", opacity: 0.6 }}>Product</p>
              {[
                { href: "/#bundles", label: f.bundles },
                { href: "/wishlist", label: f.saved },
                { href: "/guide",    label: f.guide },
                { href: "/studio",   label: f.studio },
                { href: "/account",  label: f.account },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[12px] transition-colors duration-200"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  <span className="link-underline">{l.label}</span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ fontFamily: "var(--font-montserrat)", color: "var(--muted)", opacity: 0.6 }}>Legal</p>
              {[
                { href: "/privacy", label: f.privacy },
                { href: "/terms",   label: f.terms },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[12px] transition-colors duration-200"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  <span className="link-underline">{l.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Zen divider */}
        <div className="zen-divider mt-8" aria-hidden="true"><span>◇</span></div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] font-light" style={{ color: "var(--muted)", opacity: 0.7 }}>{f.copyright}</p>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <span className="text-[10px] font-medium flex items-center gap-1.5" style={{ color: "var(--muted)", opacity: 0.7 }}>
              Powered by
              <span style={{ color: "var(--accent)", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>Claude AI</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
