"use client";

import { useEffect, useRef } from "react";

/**
 * The business name set as one outlined line that always fills the width of its container
 * (measured, then scaled), as a closing flourish above the footer's legal row.
 * Decorative: hidden from assistive tech and from the contrast audit.
 */
export default function BigWordmark({ text }: { text: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = wrap.current;
    const el = box.current;
    if (!outer || !el) return;
    const fit = () => {
      // Measure the text at a known size (the line is `width: max-content`), then scale.
      el.style.fontSize = "100px";
      const w = el.getBoundingClientRect().width;
      const avail = outer.clientWidth;
      if (w > 0 && avail > 0) el.style.fontSize = `${(100 * avail) / w}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(outer);
    void document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={wrap} aria-hidden className="wordmark-wrap">
      <div ref={box} className="wordmark">
        {text}
      </div>
    </div>
  );
}
