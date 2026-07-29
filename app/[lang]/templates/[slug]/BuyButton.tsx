"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

export function BuyButton({ templateId, price }: { templateId: string; price: string }) {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleBuy() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
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
    <div>
      <button
        className="fn-btn primary"
        onClick={handleBuy}
        disabled={loading}
        style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "16px 24px" }}
      >
        {loading ? t("redirecting") : `${t("buyNow")} — ${price}`}
      </button>
      {error && <p style={{ color: "#c97a52", fontSize: 12, marginTop: 8 }}>{error}</p>}
    </div>
  );
}
