"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/servizi", label: "Servizi" },
  { href: "/metodo", label: "Metodo" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

/**
 * Floating navigation dock, fixed at the bottom centre (desktop only). liquid-gl turns
 * `.lens-dock` into a refracting lens; the `.glass-lens` layer inside it is the legible
 * glass that works with or without the lens. A second route to the same pages as the
 * top nav, kept within thumb/pointer reach while the page scrolls.
 */
export default function NavDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigazione rapida"
      className="lens-dock fixed inset-x-0 bottom-6 z-50 mx-auto hidden w-fit rounded-full md:block"
    >
      <ul className="glass-lens flex items-center gap-1 rounded-full p-1.5">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  active ? "bg-brand text-brand-fg" : "text-ink hover:bg-surface-2"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
