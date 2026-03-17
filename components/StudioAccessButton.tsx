"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function StudioAccessButton() {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: "studio-access" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Errore durante il checkout. Riprova.");
      }
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-block px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-white/90 disabled:opacity-60 transition"
      >
        {loading ? "Caricamento..." : "Acquista Studio Access →"}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
