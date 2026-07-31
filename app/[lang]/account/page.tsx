"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useState } from "react";
import { usePurchases } from "@/lib/usePurchases";
import { hasStudioAccess } from "@/lib/purchases";
import { getTemplate, formatPrice, getDownloadType } from "@/lib/templates";
import DownloadButton from "@/components/DownloadButton";
import { useLang } from "@/components/LanguageProvider";
import { t, getLocalizedName } from "@/lib/i18n";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const { lang } = useLang();
  const { purchasedIds, loading: purchasesLoading } = usePurchases();
  const [portalLoading, setPortalLoading] = useState(false);

  const studioAccess = hasStudioAccess(purchasedIds);
  const purchasedTemplates = purchasedIds
    .filter((id) => id !== "studio-access")
    .map((id) => getTemplate(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTemplate>>[];

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe-portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setPortalLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page relative">
      <SiteNav />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">
        {/* Editorial page header */}
        <div
          style={{
            paddingBottom: "clamp(32px, 4vw, 48px)",
            borderBottom: "1px solid var(--border)",
            marginBottom: "clamp(32px, 4vw, 48px)",
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "12px",
            }}
          >
            {lang === "it" ? "Il tuo account" : "Your account"}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              lineHeight: 1.1,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {user?.firstName
              ? lang === "it"
                ? `Ciao, ${user.firstName}`
                : `Hello, ${user.firstName}`
              : lang === "it"
                ? "Il mio spazio"
                : "My space"}
          </h1>
        </div>

        {/* Profile card */}
        <div className="bg-surface border border-theme r-glass p-6 flex items-center gap-5">
          <div
            className="w-16 h-16 flex items-center justify-center text-2xl font-bold shrink-0"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            {user?.firstName?.[0] ??
              user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ??
              "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-semibold text-theme truncate">
              {user?.fullName ??
                user?.emailAddresses?.[0]?.emailAddress ??
                (lang === "it" ? "Utente" : "User")}
            </p>
            <p className="text-[13px] text-muted truncate">
              {user?.emailAddresses?.[0]?.emailAddress}
            </p>
          </div>
          <Link href={`/${lang}/studio`} className="btn-brand btn-brand-sm shrink-0">
            {t[lang].account.studioBtn}
          </Link>
        </div>

        {/* Studio Access */}
        <div
          className={`border p-6 flex items-center justify-between gap-4 ${
            studioAccess ? "bg-accent/10 border-accent/25" : "border-theme"
          }`}
          style={!studioAccess ? { background: "var(--card-bg)" } : undefined}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 flex items-center justify-center text-2xl ${
                studioAccess ? "bg-accent/20 text-accent" : "bg-card text-theme"
              }`}
            >
              ✦
            </div>
            <div>
              <p className="font-bold text-theme text-[17px]">
                {t[lang].account.studioAccessTitle}
              </p>
              <p className="text-[13px] text-muted">
                {studioAccess
                  ? t[lang].account.studioAccessActive
                  : t[lang].account.studioAccessInactive}
              </p>
            </div>
          </div>
          {studioAccess ? (
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="px-4 py-2 bg-card border border-theme r-pill text-[15px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
            >
              {portalLoading ? "..." : t[lang].account.manageSubscription}
            </button>
          ) : (
            <Link href={`/${lang}#studio-access`} className="btn-brand btn-brand-sm shrink-0">
              {t[lang].account.activateCta}
            </Link>
          )}
        </div>

        {/* ── Purchased templates — purchase history ─────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2
              className="text-[10px] font-normal uppercase tracking-[0.18em]"
              style={{ fontFamily: "monospace", color: "var(--accent)" }}
            >
              {t[lang].account.myTemplates}{" "}
              {purchasedTemplates.length > 0 && (
                <span className="normal-case tracking-normal text-muted">
                  ({purchasedTemplates.length})
                </span>
              )}
            </h2>
            {purchasedTemplates.length > 0 && (
              <span className="text-[11px] text-muted">
                {lang === "it"
                  ? "Clicca per scaricare nel formato nativo"
                  : "Click to download in native format"}
              </span>
            )}
          </div>

          {purchasesLoading ? (
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-surface border border-theme r-glass overflow-hidden animate-pulse"
                >
                  <div className="flex items-center gap-4 px-5 py-4">
                    <div className="w-11 h-11 shrink-0" style={{ background: "var(--card-bg)" }} />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-2/5 rounded" style={{ background: "var(--card-bg)" }} />
                      <div className="h-3 w-1/4 rounded" style={{ background: "var(--card-bg)" }} />
                    </div>
                  </div>
                  <div
                    className="border-t border-theme px-5 py-3 h-14"
                    style={{ background: "var(--card-bg)" }}
                  />
                </div>
              ))}
            </div>
          ) : purchasedTemplates.length === 0 ? (
            <div className="bg-surface border border-theme r-glass p-10 text-center flex flex-col items-center gap-4">
              <p className="text-[15px] text-muted">{t[lang].account.noTemplates}</p>
              <Link href={`/${lang}`} className="btn-brand">
                {t[lang].account.goToMarketplace}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {purchasedTemplates.map((tmpl) => {
                const dlType = getDownloadType(tmpl);
                const displayName = getLocalizedName(tmpl, lang);
                const meta = DOWNLOAD_META_LABELS[dlType];

                return (
                  <div
                    key={tmpl.id}
                    className="bg-surface border border-theme r-glass overflow-hidden"
                  >
                    {/* Template info row */}
                    <div className="flex items-center gap-4 px-5 py-4">
                      {/* Platform icon */}
                      <div
                        className="w-11 h-11 flex items-center justify-center shrink-0"
                        style={{ background: "var(--accent-bg)" }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <rect
                            x="1.5"
                            y="3.5"
                            width="17"
                            height="12"
                            rx="2"
                            stroke="var(--accent)"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5 16.5v1.5M15 16.5v1.5M4 18h12"
                            stroke="var(--accent)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5 7h4M5 10h7"
                            stroke="var(--accent)"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            opacity="0.5"
                          />
                        </svg>
                      </div>
                      {/* Name + format badge */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-theme text-[15px] truncate">
                          {displayName}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[12px] text-muted">
                            {tmpl.price === 0
                              ? lang === "it"
                                ? "Gratis"
                                : "Free"
                              : formatPrice(tmpl.price)}
                          </span>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-[1px]"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            {meta.badge}
                          </span>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/${lang}/preview/${tmpl.id}`}
                          className="hidden sm:flex items-center gap-1 px-3 py-2 text-[12px] text-muted border border-theme r-pill hover:border-accent hover:text-theme transition-colors"
                        >
                          {lang === "it" ? "Anteprima" : "Preview"}
                        </Link>
                        <Link
                          href={`/${lang}/studio?templateId=${tmpl.id}`}
                          className="hidden sm:flex items-center gap-1 px-3 py-2 text-[12px] text-muted border border-theme r-pill hover:border-accent hover:text-theme transition-colors"
                        >
                          {lang === "it" ? "Studio" : "Studio"}
                        </Link>
                      </div>
                    </div>
                    {/* Download bar — always visible, prominent */}
                    <div
                      className="border-t border-theme px-5 py-3"
                      style={{ background: "var(--card-bg)" }}
                    >
                      <DownloadButton
                        templateId={tmpl.id}
                        downloadType={dlType}
                        variant="prominent"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Account section */}
        <div>
          <h3
            className="text-[10px] font-normal uppercase tracking-[0.18em] mb-4 px-1"
            style={{ fontFamily: "monospace", color: "var(--accent)" }}
          >
            {t[lang].account.accountSection}
          </h3>
          <div className="bg-surface border border-theme r-glass overflow-hidden">
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="r-md w-full text-left px-5 py-4 text-[15px] text-theme hover:bg-card active:bg-card transition-colors duration-150 border-b border-theme flex items-center justify-between"
            >
              <span>{portalLoading ? "..." : t[lang].account.managePayments}</span>
              <span className="text-muted text-[18px]">›</span>
            </button>
            <Link
              href={`/${lang}/studio`}
              className="r-md block px-5 py-4 text-[15px] text-theme hover:bg-card/[0.04] active:bg-white/[0.05] transition-colors duration-150 flex items-center justify-between"
            >
              <span>{t[lang].account.goToStudio}</span>
              <span className="text-muted text-[18px]">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Badge metadata per download type */
const DOWNLOAD_META_LABELS: Record<string, { badge: string; bg: string; color: string }> = {
  html: { badge: "HTML", bg: "var(--accent-bg)", color: "var(--accent)" },
  shopify: { badge: "Shopify", bg: "var(--platform-shopify)", color: "white" },
  wordpress: { badge: "WordPress", bg: "var(--platform-wordpress)", color: "white" },
  notion: { badge: "Notion", bg: "var(--platform-notion)", color: "white" },
  canva: { badge: "Canva", bg: "var(--platform-canva)", color: "white" },
  excel: { badge: "Excel", bg: "var(--platform-excel)", color: "white" },
  sheets: { badge: "Sheets", bg: "var(--platform-sheets)", color: "white" },
  webflow: { badge: "Webflow", bg: "var(--platform-webflow)", color: "white" },
  framer: { badge: "Framer", bg: "var(--platform-framer)", color: "white" },
};
