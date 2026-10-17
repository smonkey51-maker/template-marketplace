"use client";

import { useEffect, useState } from "react";

export type SectionItem = { id: string; label: string };

/**
 * "In questa pagina": a sticky index of the page's sections with scroll-spy, set as a plain
 * hairline list so it reads the same on any band tone.
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
    <aside aria-label="In questa pagina" className="sticky top-32 hidden self-start lg:block">
      <ul className="border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-2 pl-4 text-[14px] transition-colors ${
                active === i.id
                  ? "border-ink font-medium text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
