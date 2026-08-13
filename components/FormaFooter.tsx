"use client";

import Link from "next/link";
import { Check, Download, Lock } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaLogoStatic } from "@/components/FormaLogo";

/**
 * Site footer — newsletter + three always-open link columns, matching the
 * Figma Make prototype's Footer.tsx structure (mono uppercase column
 * headers, hairline top border, wordmark + copyright closing row). Replaced
 * the mobile accordion (columns collapsed behind a +/- trigger) with plain
 * always-visible columns, same as the prototype, on every breakpoint.
 */
const COLUMNS: {
  titleKey: keyof typeof copy.it;
  items: { href: string; labelKey: keyof typeof copy.it }[];
}[] = [
  {
    titleKey: "footerCatalog",
    items: [
      { href: "/catalogo", labelKey: "footerTemplates" },
      { href: "/catalogo#bundle", labelKey: "footerBundles" },
      { href: "/studio", labelKey: "studioAi" },
    ],
  },
  {
    titleKey: "footerSupport",
    items: [
      { href: "/guida", labelKey: "footerFaq" },
      { href: "/guida", labelKey: "footerGuide" },
      { href: "mailto:supporto@template-marketplace-psi.vercel.app", labelKey: "footerContact" },
    ],
  },
  {
    titleKey: "footerLegal",
    items: [
      { href: "/terms", labelKey: "footerTerms" },
      { href: "/privacy", labelKey: "footerPrivacy" },
      { href: "/guida#rimborsi", labelKey: "footerRefund" },
    ],
  },
];

export function FormaFooter() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSent(true);
  }

  return (
    <footer
      className="border-t border-theme"
      style={{
        background: "var(--surface)",
        // Bottom padding clears MobileNav, the full-width tab bar pinned to
        // the viewport edge (~65px tall, plus the safe-area inset added
        // below): without it the copyright row — the very last thing in the
        // document — renders right underneath it.
        padding: "80px 24px calc(140px + env(safe-area-inset-bottom, 0px))",
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
            {t("footerTagline")}
          </p>

          {!sent ? (
            <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === "it" ? "La tua email" : "Your email"}
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
              ✓ {lang === "it" ? "Iscritto." : "Subscribed."}
            </p>
          )}
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
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

      {/* Trust badges */}
      <div
        className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-theme pt-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--muted)" }}>
            <Lock aria-hidden size={13} strokeWidth={1.75} style={{ color: "var(--accent)" }} />
            {t("secureCheckout")}
          </span>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--muted)" }}>
            <Check aria-hidden size={13} strokeWidth={2} style={{ color: "var(--accent)" }} />
            {t("moneyBack")}
          </span>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--muted)" }}>
            <Download aria-hidden size={13} strokeWidth={1.75} style={{ color: "var(--accent)" }} />
            {lang === "it" ? "Download immediato" : "Immediate download"}
          </span>
        </div>
        <FormaLogoStatic className="h-5 w-auto opacity-90" />
        <p
          className="text-[11px] uppercase"
          style={{ color: "var(--muted)", letterSpacing: "0.15em" }}
        >
          {t("footerCopyright")}
        </p>
      </div>
    </footer>
  );
}
