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
        className="inline-block px-8 py-4 bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97] text-white font-bold rounded-2xl text-[17px] disabled:opacity-60 transition-all duration-200 ios-spring shadow-[0_4px_24px_rgba(10,132,255,0.3)]"
      >
        {loading ? "Caricamento..." : "Inizia con Studio Access →"}
      </button>
      {error && <p className="text-[#FF453A] text-[13px]">{error}</p>}
    </div>
  );
}
