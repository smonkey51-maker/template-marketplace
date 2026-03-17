"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Torna in cima"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center
        glass rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)]
        text-muted hover:text-theme hover:scale-110 active:scale-95
        transition-all duration-200 ios-spring anim-fade-in"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
