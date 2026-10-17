"use client";

import { useEffect } from "react";

/**
 * Starts the home page's arrival animation only once the hero photo is decoded and the page
 * has settled. An inline script in the layout adds `hero-pending` to <html> before the first
 * paint (with a failsafe), which keeps the intro elements hidden; this removes it. Without
 * this the animation would run while the image is still decoding and hydration is blocking
 * the main thread, and it would stutter.
 */
export default function HeroReady() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("hero-pending")) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      // Two frames later, so the layout and the decoded image are already painted.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => html.classList.remove("hero-pending")),
      );
    };
    const img = document.querySelector<HTMLImageElement>(".hero-photo");
    if (img && typeof img.decode === "function") {
      img.decode().then(go, go);
    } else {
      go();
    }
    const t = window.setTimeout(go, 1500);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
