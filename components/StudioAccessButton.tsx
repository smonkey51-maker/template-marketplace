"use client";

import { useState } from "react";

export default function StudioAccessButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: "studio-access" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-block px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-white/90 disabled:opacity-60 transition"
    >
      {loading ? "Caricamento..." : "Acquista Studio Access →"}
    </button>
  );
}
