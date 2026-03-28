"use client";

import { useState, useEffect, useRef } from "react";

function SplitFlapDigit({ char }: { char: string }) {
  return <span key={char} className="split-flap-char">{char}</span>;
}

export default function SplitFlap({ to, duration = 1100 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  const digits = String(value).split("");
  return (
    <span ref={ref} className="inline-flex tabular-nums">
      {digits.map((d, i) => <SplitFlapDigit key={`${i}-${d}`} char={d} />)}
    </span>
  );
}
