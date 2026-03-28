"use client";

import { useState, useEffect, useRef } from "react";
import { SCRAMBLE_CHARS } from "@/lib/gridData";

export default function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const scramble = () => {
    if (reducedMotion) return;
    startRef.current = performance.now();
    const duration = text.length * 2.5 * 35;
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * text.length);
      setDisplay(
        text.split("").map((ch, i) => {
          if (i < revealed || ch === " " || ch === "&" || ch === "-") return ch;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setDisplay(text);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const reset = () => { cancelAnimationFrame(rafRef.current); setDisplay(text); };
  useEffect(() => { reset(); return () => cancelAnimationFrame(rafRef.current); }, [text]);

  return <span onMouseEnter={scramble} onMouseLeave={reset}>{display}</span>;
}
