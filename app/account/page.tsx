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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-orange-950/10 relative">
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full pointer-events-none z-0" style={{ transform: "translate(-30%,-30%)" }} />
      <div className="fixed bottom-0 right-0 w-72 h-72 bg-violet-500/10 blur-3xl rounded-full pointer-events-none z-0" style={{ transform: "translate(30%,30%)" }} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-2xl bg-gray-950/60 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            TemplateLab
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
            ← Marketplace
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">

        {/* Profile card */}
        <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-white truncate">
              {user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? "Utente"}
            </p>
            <p className="text-sm text-gray-400 truncate">
              {user?.emailAddresses?.[0]?.emailAddress}
            </p>
          </div>
          <Link
            href="/studio"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 shrink-0"
          >
            AI Studio →
          </Link>
        </div>

        {/* Studio Access */}
        <div className={`rounded-3xl border p-6 flex items-center justify-between gap-4 ${
          hasStudioAccess
            ? "bg-violet-500/8 border-violet-400/20"
            : "bg-white/4 border-white/10"
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
              hasStudioAccess ? "bg-violet-500/20" : "bg-white/8"
            }`}>
              ✦
            </div>
            <div>
              <p className="font-bold text-white">Studio Access</p>
              <p className="text-sm text-gray-400">
                {hasStudioAccess ? "Attivo — Generazioni AI illimitate" : "Non attivo"}
              </p>
            </div>
          </div>
          {hasStudioAccess ? (
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="px-4 py-2 bg-white/8 hover:bg-white/15 border border-white/15 rounded-2xl text-sm font-medium transition-all duration-200 shrink-0"
            >
              {portalLoading ? "..." : "Gestisci abbonamento"}
            </button>
          ) : (
            <Link
              href="/#studio-access"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 shrink-0"
            >
              Attiva →
            </Link>
          )}
        </div>

        {/* Purchased templates */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            I miei template{" "}
            {purchasedTemplates.length > 0 && (
              <span className="text-sm font-normal text-gray-500">({purchasedTemplates.length})</span>
            )}
          </h2>

          {purchasedTemplates.length === 0 ? (
            <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">
              <p className="text-gray-500 mb-4">Nessun template acquistato ancora.</p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-2xl text-sm transition-all duration-200"
              >
                Sfoglia il marketplace →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {purchasedTemplates.map((t) => (
                <div key={t.id} className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/7 transition-all duration-200">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    t.category === "ui" ? "bg-blue-500/20" : "bg-orange-500/20"
                  }`}>
                    {t.category === "ui" ? "🖼" : "📝"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{t.name}</p>
                    <p className="text-xs text-gray-500">{formatPrice(t.price)}</p>
                  </div>
                  <Link
                    href={`/studio?templateId=${t.id}`}
                    className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-xl transition-all duration-200 shrink-0"
                  >
                    Apri Studio
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger zone */}
        <div className="bg-white/3 border border-white/8 rounded-3xl p-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="px-4 py-2 bg-white/8 hover:bg-white/15 border border-white/10 rounded-2xl text-sm transition-all duration-200"
            >
              {portalLoading ? "..." : "Gestisci pagamenti e fatture"}
            </button>
            <Link
              href="/studio"
              className="px-4 py-2 bg-white/8 hover:bg-white/15 border border-white/10 rounded-2xl text-sm transition-all duration-200"
            >
              Vai all'AI Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
