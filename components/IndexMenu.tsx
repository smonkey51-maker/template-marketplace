"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  ["/servizi", "Servizi", "Le quattro aree di consulenza"],
  ["/metodo", "Metodo", "Come lavoriamo"],
  ["/chi-siamo", "Chi siamo", "Lo studio e il team"],
  ["/contatti", "Contatti", "Richiedi un colloquio"],
  ["/area-riservata", "Area riservata", "Accesso clienti"],
] as const;

/**
 * A full-screen index of the site, opened by a button that appears once you have scrolled
 * (the "INDEX" button of the reference site). Huge links rise in one after another.
 * Escape or a click on the backdrop closes it; focus goes to the first link and returns to
 * the button; the page does not scroll behind it.
 */
export default function IndexMenu() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        data-shown={shown ? "" : undefined}
        className="index-btn glass-ctl fixed bottom-4 left-4 z-40 hidden h-11 items-center px-5 text-[14px] font-medium text-ink md:flex"
      >
        Indice
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Indice del sito"
          className="index-overlay fixed inset-0 z-[70] flex flex-col overflow-y-auto"
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
        </div>
      )}
    </>
  );
}
