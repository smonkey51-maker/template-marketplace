"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";
import { FormaLogoStatic } from "@/components/FormaLogo";

const COLUMNS: {
  titleKey: keyof typeof copy.it;
  items: { href: string; labelKey: keyof typeof copy.it }[];
}[] = [
  {
    titleKey: "footerColumnsExplore",
    items: [
      { href: "/articoli", labelKey: "navArticoli" },
      { href: "/articoli?categoria=mentalist", labelKey: "navMentalist" },
      { href: "/articoli?categoria=psicologia", labelKey: "navPsicologia" },
      { href: "/chi-siamo", labelKey: "navChiSiamo" },
    ],
  },
  {
    titleKey: "footerColumnsLegal",
    items: [
      { href: "/terms", labelKey: "footerTerms" },
      { href: "/privacy", labelKey: "footerPrivacy" },
      { href: "mailto:nicoloforcolinprivata@gmail.com", labelKey: "footerContact" },
    ],
  },
];

/**
 * Site footer — newsletter signup, link columns, and the permanent
 * fan-disclaimer required by CLAUDE.md: this project is not affiliated with
 * CBS, Warner Bros. or the creators of "The Mentalist".
 */
export function FormaFooter() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer
      className="forma-footer-ink border-t border-theme"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        padding: "80px 24px calc(48px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Brand + newsletter */}
        <div className="lg:col-span-5">
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--text)",
            }}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)]"
          >
            {t("newsletterTitle")}
          </p>
          <p className="mt-3 max-w-sm text-[13px]" style={{ color: "var(--muted)" }}>
            {t("newsletterSub")}
          </p>

          {status !== "sent" ? (
            <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletterPlaceholder")}
                className="w-full bg-transparent py-3 text-sm outline-none"
                style={{
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
              <button type="submit" className="btn-brand-sm shrink-0 whitespace-nowrap">
                {t("newsletterCta")}
              </button>
            </form>
          ) : (
            <p
              className="mt-6 text-[12px] uppercase"
              style={{ color: "var(--accent)", letterSpacing: "0.12em" }}
            >
              ✓ {t("newsletterSuccess")}
            </p>
          )}
          {status === "error" && (
            <p className="mt-2 text-[12px]" style={{ color: "var(--muted)" }}>
              {t("newsletterError")}
            </p>
          )}
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 lg:col-span-7">
          {COLUMNS.map((col) => (
            <div key={col.titleKey}>
              <p
                className="text-[11px] font-semibold uppercase"
                style={{ color: "var(--muted)", letterSpacing: "0.15em" }}
              >
                {t(col.titleKey)}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href + item.labelKey}>
                    <Link
                      href={item.href.startsWith("/") ? `/${lang}${item.href}` : item.href}
                      className="text-sm transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--text)" }}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Fan disclaimer + closing row */}
      <div
        className="mx-auto mt-16 max-w-[1400px] border-t border-theme pt-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="max-w-2xl text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {t("disclaimerShort")}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <FormaLogoStatic className="h-5 w-auto opacity-90" />
          <p
            className="text-[11px] uppercase"
            style={{ color: "var(--muted)", letterSpacing: "0.15em" }}
          >
            {t("footerCopyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
