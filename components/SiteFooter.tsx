"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";
import SiteLogo from "@/components/SiteLogo";

type Item = { href: string; labelKey: keyof typeof copy.it };

const EXPLORE: Item[] = [
  { href: "/test", labelKey: "navTest" },
  { href: "/test-ma-di-piu", labelKey: "navTestPlus" },
  { href: "/rickrolled", labelKey: "navRick" },
  { href: "mailto:nicoloforcolinprivata@gmail.com", labelKey: "footerContact" },
];

export function SiteFooter() {
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

  const column = (titleKey: keyof typeof copy.it, items: Item[]) => (
    <div>
      <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
        {t(titleKey)}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            {item.href.startsWith("mailto:") ? (
              <a href={item.href} className="text-[14px] hover:underline">
                {t(item.labelKey)}
              </a>
            ) : (
              <Link href={`/${lang}${item.href}`} className="text-[14px] hover:underline">
                {t(item.labelKey)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="glass-bar mt-12 border-t border-line text-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SiteLogo />
            <p className="mt-4 max-w-sm text-[14px] text-muted">{t("footerNote")}</p>
          </div>

          <div className="md:col-span-3">{column("footerColumnsExplore", EXPLORE)}</div>

          <div className="md:col-span-4">
            <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
              {t("newsletterKicker")}
            </h2>
            <p className="mt-4 text-[14px] text-muted">{t("newsletterSub")}</p>
            {status !== "sent" ? (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  aria-label={t("newsletterPlaceholder")}
                  className="field min-w-0 flex-1"
                />
                <button type="submit" className="btn btn-primary shrink-0">
                  {t("newsletterCta")}
                </button>
              </form>
            ) : (
              <p role="status" className="mt-4 text-[14px] font-medium text-accent">
                {t("newsletterSuccess")}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-2 text-[13px] text-muted">
                {t("newsletterError")}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[12px] text-muted sm:flex-row sm:justify-between">
          <p>© 2026 {t("footerCopyright")}</p>
          <p>ENV: TEST · CONTENT: SAMPLE</p>
        </div>
      </div>
    </footer>
  );
}
