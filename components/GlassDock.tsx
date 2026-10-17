"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

// Loaded on demand and only in the browser: the refraction layer is an extra
// ~180 KB that no visitor needs for the first paint.
const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

/**
 * A floating glass pill, fixed at the bottom centre, that opens the command
 * palette. liquid-glass-react draws real refraction (SVG displacement filter)
 * and is built for fixed, content-sized elements like this one — not for
 * panels in the page flow. Skipped for reduced motion/transparency and on
 * small screens, where it would sit on top of content.
 */
export default function GlassDock() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const q = window.matchMedia(
      "(max-width: 767px), (prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce)",
    );
    const update = () => setShow(!q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  if (!show) return null;

  const open = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true }));

  return (
    <LiquidGlass
      cornerRadius={999}
      displacementScale={46}
      blurAmount={0.12}
      saturation={150}
      aberrationIntensity={1.4}
      elasticity={0.25}
      padding="10px 20px"
      onClick={open}
      style={{ position: "fixed", top: "calc(100% - 52px)", left: "50%", zIndex: 40 }}
    >
      <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
        <Search size={15} aria-hidden />
        {lang === "it" ? "Cerca" : "Search"}
        <kbd className="font-mono text-[11px] text-muted">⌘K</kbd>
      </span>
    </LiquidGlass>
  );
}
