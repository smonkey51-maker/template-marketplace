"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Lock } from "lucide-react";
import { useCart } from "@/lib/useCart";
import { getTemplate, formatPrice } from "@/lib/templates";
import { getLocalizedName } from "@/lib/i18n";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import SiteNav from "@/components/SiteNav";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import { FormaFooter } from "@/components/FormaFooter";

/**
 * Cart page — bordered item list, remove-per-row, total, checkout, matching
 * the Figma Make prototype's Carrello.tsx structure. Checkout goes through
 * the real Stripe flow via /api/checkout's templateIds line, not the
 * prototype's mocked setTimeout "payment".
 */
export default function CarrelloPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const { ids, remove, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const items = ids.map((id) => getTemplate(id)).filter((item) => item !== undefined);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateIds: items.map((item) => item.id) }),
      });
      const data = await res.json();
      if (data.url) {
        const checkoutUrl: string = data.url;
        clear();
        window.location.assign(checkoutUrl);
      } else {
        setError(data.error ?? t("checkoutError"));
        setLoading(false);
      }
    } catch {
      setError(t("networkError"));
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-page pb-24">
      <SiteNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div
          style={{
            paddingBottom: "clamp(24px, 3vw, 36px)",
            borderBottom: "1px solid var(--border)",
            marginBottom: "clamp(32px, 4vw, 48px)",
          }}
        >
          <ArtHeader
            compact
            painting={PAINTINGS.catalogo}
            kicker={lang === "it" ? "Checkout" : "Checkout"}
            title={lang === "it" ? "Carrello" : "Cart"}
          />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-24 text-center border border-theme r-md">
            <p style={{ color: "var(--muted)" }}>
              {lang === "it" ? "Il carrello è vuoto." : "Your cart is empty."}
            </p>
            <Link
              href={`/${lang}/catalogo`}
              className="text-sm font-semibold pb-1 transition-colors"
              style={{ borderBottom: "1px solid var(--border)", color: "var(--text)" }}
            >
              {lang === "it" ? "Vai al catalogo →" : "Browse the catalogue →"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <ul className="border-t border-theme lg:col-span-7">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b border-theme py-6"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/${lang}/templates/${item.id}`}
                      className="block truncate text-[1.05rem]"
                      style={{
                        fontFamily: "var(--font-fraunces), Georgia, serif",
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      {getLocalizedName(item, lang)}
                    </Link>
                    <span className="text-sm" style={{ color: "var(--accent)" }}>
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label={lang === "it" ? "Rimuovi" : "Remove"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-theme r-md transition-colors hover:bg-[var(--surface)]"
                  >
                    <Trash2 size={15} strokeWidth={1.8} style={{ color: "var(--muted)" }} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="lg:col-span-5">
              <div
                className="border border-theme r-md p-8"
                style={{ background: "var(--surface)" }}
              >
                <div
                  className="flex items-center justify-between border-b border-theme pb-4 mb-4"
                  style={{ color: "var(--text)" }}
                >
                  <span className="text-sm uppercase" style={{ letterSpacing: "0.1em" }}>
                    {lang === "it" ? "Totale" : "Total"}
                  </span>
                  <span
                    className="text-[1.5rem]"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-brand w-full justify-center inline-flex items-center gap-2"
                >
                  <Lock size={14} strokeWidth={2} aria-hidden />
                  {loading
                    ? t("redirecting")
                    : lang === "it"
                      ? "Procedi al pagamento"
                      : "Proceed to payment"}
                </button>
                {error && (
                  <p className="mt-3 text-xs" style={{ color: "#c97a52" }}>
                    {error}
                  </p>
                )}
                <p className="mt-4 text-xs text-center" style={{ color: "var(--muted)" }}>
                  {lang === "it"
                    ? "Pagamento sicuro Stripe · Rimborso 14 giorni"
                    : "Secure Stripe checkout · 14-day refund"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <FormaFooter />
    </div>
  );
}
