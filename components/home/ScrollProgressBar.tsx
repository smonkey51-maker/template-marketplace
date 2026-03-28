"use client";

import { useState, useEffect } from "react";

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function update() {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (el.scrollTop / total) * 100 : 0);
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none">
      <div style={{ width: `${width}%`, height: "100%", background: "linear-gradient(to right, var(--gold-mid), var(--accent), var(--terra))", transition: "width 0.1s linear" }} />
    </div>
  );
}
