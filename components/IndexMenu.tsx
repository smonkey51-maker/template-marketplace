"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ITEMS = [
  ["/servizi", "Servizi", "Le quattro aree di consulenza"],
  ["/metodo", "Metodo", "Come lavoriamo"],
  ["/chi-siamo", "Chi siamo", "Lo studio e il team"],
  ["/contatti", "Contatti", "Richiedi un colloquio"],
  ["/area-riservata", "Area riservata", "Accesso clienti"],
] as const;

/**
 * The "Indice" button (it lives inside the bottom dock) and the full-screen index it opens:
 * huge links that rise in one after another, on a blue band. Escape or a click on the
 * backdrop closes it; focus goes to the first link and returns to the button; the page does
 * not scroll behind it. The overlay is portalled to <body>: inside the dock, a `backdrop-filter`
 * ancestor would trap a fixed element in the dock's own box.
 */
export default function IndexMenu({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      button.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={className}
      >
        Indice
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Indice del sito"
            className="index-overlay tone-blue fixed inset-0 z-[70] flex flex-col overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-5 sm:px-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
                Indice
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn btn-outline"
                aria-label="Chiudi l'indice"
              >
                Chiudi
              </button>
            </div>
            <nav
              aria-label="Indice"
              className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-4 pb-16 sm:px-6"
            >
              <ul>
                {ITEMS.map(([href, label, hint], i) => (
                  <li key={href} className="index-item" style={{ ["--i" as string]: i }}>
                    <Link
                      ref={i === 0 ? first : undefined}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="index-link"
                    >
                      <span className="index-label">{label}</span>
                      <span className="index-hint">{hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
