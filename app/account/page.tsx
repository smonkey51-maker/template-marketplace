"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useEffect, useState } from "react";
import { templates, getTemplate, formatPrice, getDownloadType } from "@/lib/templates";
import DownloadButton from "@/components/DownloadButton";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.json())
      .then((d) => setPurchasedIds(d.templateIds ?? []))
      .catch(() => {});
  }, []);

  const hasStudioAccess = purchasedIds.includes("studio-access");
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
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page relative">

      <SiteNav title={t[lang].account.title} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">

        {/* Profile card */}
        <div className="bg-surface border border-theme rounded-[28px] p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0" style={{ background: "var(--accent)", color: "var(--bg)" }}>
            {user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-semibold text-theme truncate">
              {user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? (lang === "it" ? "Utente" : "User")}
            </p>
            <p className="text-[13px] text-muted truncate">
              {user?.emailAddresses?.[0]?.emailAddress}
            </p>
          </div>
          <Link
            href="/studio"
            className="px-4 py-2 font-bold uppercase tracking-[0.12em] text-[10px] transition-colors duration-200 active:scale-[0.97] ios-spring shrink-0"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
          >
            {t[lang].account.studioBtn}
          </Link>
        </div>

        {/* Studio Access */}
        <div className={`rounded-[28px] border p-6 flex items-center justify-between gap-4 ${
          hasStudioAccess
            ? "bg-accent/10 border-accent/25"
            : "border-theme"
        }`} style={!hasStudioAccess ? { background: "var(--card-bg)" } : undefined}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
              hasStudioAccess ? "bg-accent/20 text-accent" : "bg-card text-theme"
            }`}>
              ✦
            </div>
            <div>
              <p className="font-bold text-theme text-[17px]">{t[lang].account.studioAccessTitle}</p>
              <p className="text-[13px] text-muted">
                {hasStudioAccess ? t[lang].account.studioAccessActive : t[lang].account.studioAccessInactive}
              </p>
            </div>
          </div>
          {hasStudioAccess ? (
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="px-4 py-2 bg-card border border-theme rounded-2xl text-[15px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
            >
              {portalLoading ? "..." : t[lang].account.manageSubscription}
            </button>
          ) : (
            <Link
              href="/#studio-access"
              className="px-4 py-2 font-bold uppercase tracking-[0.12em] text-[10px] transition-colors duration-200 active:scale-[0.97] ios-spring shrink-0"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
            >
              {t[lang].account.activateCta}
            </Link>
          )}
        </div>

        {/* Purchased templates */}
        <div>
          <h2 className="text-[13px] font-semibold text-muted uppercase tracking-widest mb-3 px-1">
            {t[lang].account.myTemplates}{" "}
            {purchasedTemplates.length > 0 && (
              <span className="normal-case tracking-normal text-muted">({purchasedTemplates.length})</span>
            )}
          </h2>

          {purchasedTemplates.length === 0 ? (
            <div className="bg-surface border border-theme rounded-[28px] p-10 text-center flex flex-col items-center gap-4">
              <p className="text-[15px] text-muted">{t[lang].account.noTemplates}</p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 font-bold uppercase tracking-[0.12em] text-[10px] transition-colors duration-200 active:scale-[0.97] ios-spring"
              style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
              >
                {t[lang].account.goToMarketplace}
              </Link>
            </div>
          ) : (
            <div className="bg-surface rounded-[20px] overflow-hidden">
              {purchasedTemplates.map((tmpl, index) => (
                <div
                  key={tmpl.id}
                  className={`flex items-center gap-4 px-5 py-4 active:bg-white/[0.05] transition-colors duration-150 ${
                    index > 0 ? "border-t border-theme" : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-accent/10">
                    {tmpl.category === "ui" ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <rect x="1.5" y="3.5" width="17" height="12" rx="2" stroke="var(--accent)" strokeWidth="1.5"/>
                        <path d="M5 16.5v1.5M15 16.5v1.5M4 18h12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M5 7h4M5 10h7" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <rect x="3.5" y="1.5" width="13" height="17" rx="2" stroke="var(--accent)" strokeWidth="1.5"/>
                        <path d="M7 6h6M7 9.5h6M7 13h4" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-theme text-[15px] truncate">{tmpl.name}</p>
                    <p className="text-[13px] text-muted">{formatPrice(tmpl.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <DownloadButton
                      templateId={tmpl.id}
                      downloadType={getDownloadType(tmpl)}
                      variant="compact"
                    />
                    <Link
                      href={`/studio?templateId=${tmpl.id}`}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 active:scale-[0.97] ios-spring"
                      style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
                    >
                      {lang === "it" ? "Apri Studio" : "Open Studio"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account section */}
        <div>
          <h3 className="text-[13px] font-semibold text-muted uppercase tracking-widest mb-3 px-1">{t[lang].account.accountSection}</h3>
          <div className="bg-surface border border-theme rounded-[20px] overflow-hidden">
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="w-full text-left px-5 py-4 text-[15px] text-theme hover:bg-card active:bg-card transition-colors duration-150 border-b border-theme flex items-center justify-between"
            >
              <span>{portalLoading ? "..." : t[lang].account.managePayments}</span>
              <span className="text-muted text-[18px]">›</span>
            </button>
            <Link
              href="/studio"
              className="block px-5 py-4 text-[15px] text-theme hover:bg-card/[0.04] active:bg-white/[0.05] transition-colors duration-150 flex items-center justify-between"
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
