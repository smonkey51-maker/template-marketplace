"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";
import { OsservatorioLogoStatic } from "@/components/OsservatorioLogo";

const COLUMNS: {
  titleKey: keyof typeof copy.it;
  items: { href: string; labelKey: keyof typeof copy.it }[];
}[] = [
  {
    titleKey: "footerColumnsExplore",
    items: [
      { href: "/articoli", labelKey: "navArticoli" },
      { href: "/dossier", labelKey: "navDossier" },
      { href: "/guide-pratiche", labelKey: "navGuide" },
      { href: "/biblioteca", labelKey: "navBiblioteca" },
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

export function OsservatorioFooter() {
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
      className="border-t border-theme"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        padding: "72px 24px calc(36px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 border-b border-theme pb-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span
              className="text-[10px] font-semibold uppercase"
              style={{ color: "var(--accent)", letterSpacing: "0.18em" }}
            >
              {t("newsletterKicker")}
            </span>
            <p
              className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-none"
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 600,
                letterSpacing: "-0.025em",
              }}
            >
              {t("newsletterTitle")}
            </p>
            <p className="mt-4 max-w-xl text-[14px] leading-6" style={{ color: "var(--muted)" }}>
              {t("newsletterSub")}
            </p>

            {status !== "sent" ? (
              <form onSubmit={handleSubscribe} className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  className="min-w-0 flex-1 bg-transparent px-0 py-3 text-sm outline-none"
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

          <div className="grid grid-cols-2 gap-8 lg:col-span-5">
            {COLUMNS.map((col) => (
              <div key={col.titleKey}>
                <p
                  className="text-[10px] font-semibold uppercase"
                  style={{ color: "var(--muted)", letterSpacing: "0.16em" }}
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

        <div className="pt-7">
          <p className="max-w-2xl text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {t("disclaimerShort")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <OsservatorioLogoStatic className="h-5 w-auto opacity-90" />
            <p
              className="text-[10px] uppercase"
              style={{ color: "var(--muted)", letterSpacing: "0.14em" }}
            >
              {t("footerCopyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
