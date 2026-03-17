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
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="w-8 h-8 rounded-full border-2 border-[#FF9F0A] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] relative" style={{ background: "radial-gradient(ellipse at top, #1a1a1a 0%, #000 60%)" }}>

      {/* Nav — iOS liquid glass */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] backdrop-blur-2xl bg-[#1C1C1E]/80 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#FF9F0A]">
            TemplateLab
          </Link>
          <Link href="/" className="text-[15px] text-[#8E8E93] hover:text-white transition">
            ← Marketplace
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">

        {/* Profile card */}
        <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-[28px] p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#FF9F0A] flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-semibold text-white truncate">
              {user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? "Utente"}
            </p>
            <p className="text-[13px] text-[#8E8E93] truncate">
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
              hasStudioAccess ? "bg-[#5E5CE6]/20 text-[#5E5CE6]" : "bg-white/[0.08] text-white"
            }`}>
              ✦
            </div>
            <div>
              <p className="font-bold text-white text-[17px]">Studio Access</p>
              <p className="text-[13px] text-[#8E8E93]">
                {hasStudioAccess ? "Attivo — Generazioni AI illimitate" : "Non attivo"}
              </p>
            </div>
          </div>
          {hasStudioAccess ? (
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="px-4 py-2 bg-[#2C2C2E] border border-white/[0.08] rounded-2xl text-[15px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
            >
              {portalLoading ? "..." : "Gestisci abbonamento"}
            </button>
          ) : (
            <Link
              href="/#studio-access"
              className="px-4 py-2 bg-[#FF9F0A] hover:bg-[#FFB340] text-white font-semibold rounded-2xl text-[14px] transition-all duration-200 active:scale-[0.97] ios-spring shrink-0"
            >
              Attiva →
            </Link>
          )}
        </div>

        {/* Purchased templates */}
        <div>
          <h2 className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-widest mb-3 px-1">
            I miei template{" "}
            {purchasedTemplates.length > 0 && (
              <span className="normal-case tracking-normal text-[#8E8E93]">({purchasedTemplates.length})</span>
            )}
          </h2>

          {purchasedTemplates.length === 0 ? (
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-[28px] p-10 text-center flex flex-col items-center gap-4">
              <p className="text-[15px] text-[#8E8E93]">Nessun template acquistato ancora.</p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-[#FF9F0A] hover:bg-[#FFB340] text-white font-semibold rounded-2xl text-[15px] transition-all duration-200 active:scale-[0.97] ios-spring"
              >
                Vai al marketplace →
              </Link>
            </div>
          ) : (
            <div className="bg-[#1C1C1E] rounded-[20px] overflow-hidden">
              {purchasedTemplates.map((t, index) => (
                <div
                  key={t.id}
                  className={`flex items-center gap-4 px-5 py-4 active:bg-white/[0.05] transition-colors duration-150 ${
                    index > 0 ? "border-t border-white/[0.06]" : ""
                  }`}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    t.category === "ui" ? "bg-[#007AFF]/20" : "bg-[#FF9F0A]/20"
                  }`}>
                    {t.category === "ui" ? "🖼" : "📝"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-[15px] truncate">{t.name}</p>
                    <p className="text-[13px] text-[#8E8E93]">{formatPrice(t.price)}</p>
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
          <h3 className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-widest mb-3 px-1">Account</h3>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-[20px] overflow-hidden">
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="w-full text-left px-5 py-4 text-[15px] text-white hover:bg-white/[0.04] active:bg-white/[0.05] transition-colors duration-150 border-b border-white/[0.06] flex items-center justify-between"
            >
              <span>{portalLoading ? "..." : "Gestisci pagamenti e fatture"}</span>
              <span className="text-[#8E8E93] text-[18px]">›</span>
            </button>
            <Link
              href="/studio"
              className="block px-5 py-4 text-[15px] text-white hover:bg-white/[0.04] active:bg-white/[0.05] transition-colors duration-150 flex items-center justify-between"
            >
              <span>Vai all&apos;AI Studio</span>
              <span className="text-[#8E8E93] text-[18px]">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
