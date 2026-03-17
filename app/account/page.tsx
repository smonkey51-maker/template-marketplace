"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { templates, getTemplate, formatPrice } from "@/lib/templates";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
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
        <div className="w-8 h-8 rounded-full border-2 border-[#0A84FF] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page relative">

      {/* Nav — iOS liquid glass */}
      <nav className="sticky top-0 z-50 border-b border-theme backdrop-blur-2xl bg-nav px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#0A84FF]">
            TemplateLab
          </Link>
          <Link href="/" className="text-[15px] text-muted hover:text-theme transition">
            ← Marketplace
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">

        {/* Profile card */}
        <div className="bg-surface border border-theme rounded-[28px] p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#0A84FF] flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-semibold text-theme truncate">
              {user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? "Utente"}
            </p>
            <p className="text-[13px] text-muted truncate">
              {user?.emailAddresses?.[0]?.emailAddress}
            </p>
          </div>
          <Link
            href="/studio"
            className="px-4 py-2 bg-[#5E5CE6] hover:bg-[#7B79F7] text-white font-semibold rounded-2xl text-[14px] transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
          >
            AI Studio →
          </Link>
        </div>

        {/* Studio Access */}
        <div className={`rounded-[28px] border p-6 flex items-center justify-between gap-4 ${
          hasStudioAccess
            ? "bg-[#5E5CE6]/10 border-[#5E5CE6]/25"
            : "bg-white/[0.04] backdrop-blur-xl border-white/10"
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
              hasStudioAccess ? "bg-[#5E5CE6]/20 text-[#5E5CE6]" : "bg-card text-theme"
            }`}>
              ✦
            </div>
            <div>
              <p className="font-bold text-theme text-[17px]">Studio Access</p>
              <p className="text-[13px] text-muted">
                {hasStudioAccess ? "Attivo — Generazioni AI illimitate" : "Non attivo"}
              </p>
            </div>
          </div>
          {hasStudioAccess ? (
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="px-4 py-2 bg-card border border-theme rounded-2xl text-[15px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
            >
              {portalLoading ? "..." : "Gestisci abbonamento"}
            </button>
          ) : (
            <Link
              href="/#studio-access"
              className="px-4 py-2 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-semibold rounded-2xl text-[14px] transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
            >
              Attiva →
            </Link>
          )}
        </div>

        {/* Purchased templates */}
        <div>
          <h2 className="text-[13px] font-semibold text-muted uppercase tracking-widest mb-3 px-1">
            I miei template{" "}
            {purchasedTemplates.length > 0 && (
              <span className="normal-case tracking-normal text-muted">({purchasedTemplates.length})</span>
            )}
          </h2>

          {purchasedTemplates.length === 0 ? (
            <div className="bg-surface border border-theme rounded-[28px] p-10 text-center flex flex-col items-center gap-4">
              <p className="text-[15px] text-muted">Nessun template acquistato ancora.</p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-semibold rounded-2xl text-[15px] transition-all duration-200 active:scale-[0.97] ios-spring"
              >
                Vai al marketplace →
              </Link>
            </div>
          ) : (
            <div className="bg-surface rounded-[20px] overflow-hidden">
              {purchasedTemplates.map((t, index) => (
                <div
                  key={t.id}
                  className={`flex items-center gap-4 px-5 py-4 active:bg-white/[0.05] transition-colors duration-150 ${
                    index > 0 ? "border-t border-theme" : ""
                  }`}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    t.category === "ui" ? "bg-[#007AFF]/20" : "bg-[#0A84FF]/20"
                  }`}>
                    {t.category === "ui" ? "🖼" : "📝"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-theme text-[15px] truncate">{t.name}</p>
                    <p className="text-[13px] text-muted">{formatPrice(t.price)}</p>
                  </div>
                  <Link
                    href={`/studio?templateId=${t.id}`}
                    className="px-3 py-1.5 bg-[#5E5CE6] hover:bg-[#7B79F7] text-white text-[13px] font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
                  >
                    Apri Studio
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account section */}
        <div>
          <h3 className="text-[13px] font-semibold text-muted uppercase tracking-widest mb-3 px-1">Account</h3>
          <div className="bg-surface border border-theme rounded-[20px] overflow-hidden">
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="w-full text-left px-5 py-4 text-[15px] text-theme hover:bg-card active:bg-card transition-colors duration-150 border-b border-theme flex items-center justify-between"
            >
              <span>{portalLoading ? "..." : "Gestisci pagamenti e fatture"}</span>
              <span className="text-muted text-[18px]">›</span>
            </button>
            <Link
              href="/studio"
              className="block px-5 py-4 text-[15px] text-theme hover:bg-card/[0.04] active:bg-white/[0.05] transition-colors duration-150 flex items-center justify-between"
            >
              <span>Vai all&apos;AI Studio</span>
              <span className="text-muted text-[18px]">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
