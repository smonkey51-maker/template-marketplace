"use client";

import { useState } from "react";

export function BuyButton({ templateId, price }: { templateId: string; price: string }) {
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
        setError(data.error ?? "Errore nel checkout.");
        setLoading(false);
      }
    } catch {
      setError("Errore di rete. Riprova.");
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
        {loading ? "Reindirizzamento…" : `Acquista — ${price}`}
      </button>
      {error && (
        <p style={{ color: "#c97a52", fontSize: 12, marginTop: 8 }}>{error}</p>
      )}
    </div>
  );
}
