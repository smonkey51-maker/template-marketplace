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
    <div className="flex flex-col items-center gap-3">
      {/* Animated ring wrapper */}
      <div className="relative inline-flex">
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-2xl opacity-0"
          style={{
            background: "linear-gradient(135deg, #0A84FF, #5E5CE6)",
            animation: "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
        {/* Gradient border */}
        <div
          className="absolute inset-[-2px] rounded-[18px] opacity-70"
          style={{
            background: "linear-gradient(135deg, #0A84FF, #5E5CE6, #0A84FF)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
            borderRadius: "18px",
          }}
        />
        <button
          onClick={handleClick}
          disabled={loading}
          className="relative z-10 px-8 py-4 font-bold rounded-2xl text-[16px] text-white disabled:opacity-60 transition-all duration-200 active:scale-[0.97] ios-spring"
          style={{ background: "linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)" }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Caricamento...
            </span>
          ) : (
            "Inizia con Studio Access →"
          )}
        </button>
      </div>

      {error && (
        <p className="text-[#FF453A] text-[13px] anim-fade-in">{error}</p>
      )}
    </div>
  );
}
