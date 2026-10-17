"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Zap } from "lucide-react";

type Item = { id: string; label: string; hint: string; kind: "route" | "action"; run: () => void };

/** Ctrl/Cmd-K palette: jump to a page or run a site action. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: Item[] = useMemo(() => {
    const go = (path: string) => () => router.push(path);
    const page = (id: string, label: string, hint: string, path: string): Item => ({
      id,
      kind: "route",
      label,
      hint,
      run: go(path),
    });
    return [
      page("home", "Home", "Torna alla home", "/"),
      page("servizi", "Servizi", "Cosa facciamo per le imprese", "/servizi"),
      page("metodo", "Metodo", "Come lavoriamo", "/metodo"),
      page("chi", "Chi siamo", "Lo studio e il team", "/chi-siamo"),
      page("contatti", "Contatti", "Richiedi un colloquio", "/contatti"),
      page("area", "Area riservata", "Accesso clienti", "/area-riservata"),
      page("privacy", "Privacy", "Informativa sul trattamento dei dati", "/privacy"),
      {
        id: "theme",
        kind: "action",
        label: "Tema chiaro/scuro",
        hint: "Cambia tema",
        run: () => {
          const html = document.documentElement;
          html.classList.toggle("dark");
          try {
            localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
          } catch {}
        },
      },
    ];
  }, [router]);

  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter((i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q))
    : items;

  const choose = (item: Item) => {
    setOpen(false);
    item.run();
  };

  if (!open) return null;

  return (
    <>
      <div className="cmdk-backdrop" onClick={() => setOpen(false)} aria-hidden />
      <div className="cmdk-panel" role="dialog" aria-modal="true" aria-label="Cerca">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && results[index]) {
                e.preventDefault();
                choose(results[index]);
              }
            }}
            placeholder="Cerca una pagina o un'azione"
            aria-label="Cerca"
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-hidden placeholder:text-muted"
          />
          <span className="cmdk-kbd">ESC</span>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-1">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-[13px] text-muted">Nessun risultato</p>
          ) : (
            results.map((item, i) => (
              <button
                key={item.id}
                type="button"
                data-active={i === index}
                onMouseEnter={() => setIndex(i)}
                onClick={() => choose(item)}
                className="cmdk-item w-full text-left"
              >
                <span className="cmdk-item__badge" aria-hidden>
                  {item.kind === "route" ? <ArrowUpRight size={15} /> : <Zap size={14} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium">{item.label}</span>
                  <span className="block truncate text-[12px] text-muted">{item.hint}</span>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
