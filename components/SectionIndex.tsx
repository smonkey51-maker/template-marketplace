"use client";

import { useEffect, useState } from "react";

export type SectionItem = { id: string; label: string };

/**
 * "In questa pagina": a sticky index of the page's sections with scroll-spy. It is a
 * liquid-gl lens (`.lens-bar`) on wide screens; the `.glass-lens` layer inside keeps
 * the text legible with or without it.
 */
export default function SectionIndex({ items }: { items: SectionItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;
    // A section is "current" while it crosses a band near the top of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <aside
      aria-label="In questa pagina"
      className="lens-bar sticky top-[7.5rem] z-50 hidden self-start rounded-[20px] lg:block"
    >
      <div className="glass-lens rounded-[20px] p-4">
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
          In questa pagina
        </p>
        <ul className="mt-3 space-y-0.5">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "location" : undefined}
                className={`block rounded-lg px-2.5 py-2 text-[14px] transition-colors ${
                  active === i.id
                    ? "bg-brand font-medium text-brand-fg"
                    : "text-ink hover:bg-surface-2"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
