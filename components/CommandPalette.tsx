"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { templates } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { templateTranslations } from "@/lib/i18n";

type PaletteItem =
  | { kind: "template"; id: string; name: string; description?: string; href: string }
  | { kind: "route"; label: string; hint: string; href: string }
  | { kind: "action"; label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { lang, toggle: toggleLang } = useLang();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const trigger = (isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k";
      if (trigger) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

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

  const routes: PaletteItem[] = useMemo(
    () => [
      {
        kind: "route",
        label: lang === "it" ? "Catalogo" : "Catalog",
        hint: lang === "it" ? "Sfoglia tutti i template" : "Browse all templates",
        href: "/",
      },
      {
        kind: "route",
        label: lang === "it" ? "AI Studio" : "AI Studio",
        hint:
          lang === "it" ? "Genera e personalizza con Claude" : "Generate and customize with Claude",
        href: "/studio",
      },
      {
        kind: "route",
        label: lang === "it" ? "Guida" : "Guide",
        hint: lang === "it" ? "Guida all'acquisto" : "Buyer's guide",
        href: "/guide",
      },
      {
        kind: "route",
        label: lang === "it" ? "Wishlist" : "Wishlist",
        hint: lang === "it" ? "I tuoi salvati" : "Your saved items",
        href: "/wishlist",
      },
      {
        kind: "route",
        label: "Account",
        hint: lang === "it" ? "I tuoi acquisti" : "Your purchases",
        href: "/account",
      },
    ],
    [lang],
  );

  const actions: PaletteItem[] = useMemo(
    () => [
      {
        kind: "action",
        label: lang === "it" ? "Cambia lingua → EN" : "Switch language → IT",
        hint: lang === "it" ? "Passa all'inglese" : "Switch to Italian",
        run: () => toggleLang(),
      },
      {
        kind: "action",
        label: lang === "it" ? "Toggle tema scuro/chiaro" : "Toggle dark/light theme",
        hint: lang === "it" ? "Cambia tema visivo" : "Switch visual theme",
        run: () => {
          const html = document.documentElement;
          html.classList.toggle("dark");
          try {
            localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
          } catch {}
        },
      },
    ],
    [lang, toggleLang],
  );

  const templateItems: PaletteItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = templates
      .filter((tpl) => {
        if (!q) return true;
        const tr = lang === "it" ? templateTranslations[tpl.id] : undefined;
        const name = (tr?.name ?? tpl.name).toLowerCase();
        const desc = (tr?.description ?? tpl.description).toLowerCase();
        return name.includes(q) || desc.includes(q) || tpl.id.toLowerCase().includes(q);
      })
      .slice(0, q ? 12 : 6)
      .map<PaletteItem>((tpl) => {
        const tr = lang === "it" ? templateTranslations[tpl.id] : undefined;
        return {
          kind: "template",
          id: tpl.id,
          name: tr?.name ?? tpl.name,
          description: tr?.description ?? tpl.description,
          href: `/preview/${tpl.id}`,
        };
      });
    return list;
  }, [query, lang]);

  const allItems = useMemo<PaletteItem[]>(() => {
    const q = query.trim().toLowerCase();
    const filteredRoutes = q
      ? routes.filter(
          (r) =>
            r.kind === "route" &&
            (r.label.toLowerCase().includes(q) || r.hint.toLowerCase().includes(q)),
        )
      : routes;
    const filteredActions = q
      ? actions.filter(
          (a) =>
            a.kind === "action" &&
            (a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q)),
        )
      : actions;
    return [...filteredRoutes, ...templateItems, ...filteredActions];
  }, [routes, actions, templateItems, query]);

  useEffect(() => setIndex(0), [query]);

  const execute = useCallback(
    (item: PaletteItem) => {
      setOpen(false);
      if (item.kind === "route") router.push(item.href);
      else if (item.kind === "template") router.push(item.href);
      else if (item.kind === "action") item.run();
    },
    [router],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, allItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (allItems[index]) execute(allItems[index]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, allItems, index, execute]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${index}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [index]);

  if (!open) return null;

  let cursor = -1;
  return (
    <>
      <div className="cmdk-backdrop" onClick={() => setOpen(false)} aria-hidden />
      <div
        className="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label={lang === "it" ? "Palette comandi" : "Command palette"}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.6"
              style={{ color: "var(--muted)" }}
            />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{ color: "var(--muted)" }}
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "it"
                ? "Cerca template, azioni, pagine…"
                : "Search templates, actions, pages…"
            }
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[var(--muted)]"
            style={{ color: "var(--text)" }}
            aria-label={lang === "it" ? "Cerca" : "Search"}
          />
          <span className="cmdk-kbd">ESC</span>
        </div>

        {/* List */}
        <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
          {allItems.length === 0 && (
            <div className="px-4 py-8 text-center text-[13px]" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "Nessun risultato" : "No results"}
            </div>
          )}

          {/* Routes group */}
          {allItems.some((i) => i.kind === "route") && (
            <div
              className="px-3 pt-2 pb-1 text-[9px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--muted)" }}
            >
              {lang === "it" ? "Naviga" : "Navigate"}
            </div>
          )}
          {allItems
            .filter((i) => i.kind === "route")
            .map((item) => {
              cursor += 1;
              const active = cursor === index;
              const itemIdx = cursor;
              return (
                <div
                  key={`r-${item.kind === "route" ? item.href : ""}`}
                  data-idx={itemIdx}
                  data-active={active}
                  className="cmdk-item"
                  onClick={() => execute(item)}
                  onMouseEnter={() => setIndex(itemIdx)}
                >
                  <span className="text-[14px] opacity-60">↗</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate">
                      {item.kind === "route" ? item.label : ""}
                    </p>
                    <p className="text-[11px] truncate" style={{ color: "var(--muted)" }}>
                      {item.kind === "route" ? item.hint : ""}
                    </p>
                  </div>
                  {active && <span className="cmdk-kbd">↵</span>}
                </div>
              );
            })}

          {/* Templates group */}
          {allItems.some((i) => i.kind === "template") && (
            <div
              className="px-3 pt-3 pb-1 text-[9px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--muted)" }}
            >
              {lang === "it" ? "Template" : "Templates"}
            </div>
          )}
          {allItems
            .filter((i) => i.kind === "template")
            .map((item) => {
              cursor += 1;
              const active = cursor === index;
              const itemIdx = cursor;
              if (item.kind !== "template") return null;
              return (
                <div
                  key={`t-${item.id}`}
                  data-idx={itemIdx}
                  data-active={active}
                  className="cmdk-item"
                  onClick={() => execute(item)}
                  onMouseEnter={() => setIndex(itemIdx)}
                >
                  <span
                    className="w-6 h-6 shrink-0 flex items-center justify-center text-[11px] font-bold"
                    style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                  >
                    {item.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate">{item.name}</p>
                    {item.description && (
                      <p className="text-[11px] truncate" style={{ color: "var(--muted)" }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  {active && <span className="cmdk-kbd">↵</span>}
                </div>
              );
            })}

          {/* Actions group */}
          {allItems.some((i) => i.kind === "action") && (
            <div
              className="px-3 pt-3 pb-1 text-[9px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--muted)" }}
            >
              {lang === "it" ? "Azioni" : "Actions"}
            </div>
          )}
          {allItems
            .filter((i) => i.kind === "action")
            .map((item) => {
              cursor += 1;
              const active = cursor === index;
              const itemIdx = cursor;
              if (item.kind !== "action") return null;
              return (
                <div
                  key={`a-${item.label}`}
                  data-idx={itemIdx}
                  data-active={active}
                  className="cmdk-item"
                  onClick={() => execute(item)}
                  onMouseEnter={() => setIndex(itemIdx)}
                >
                  <span className="text-[14px] opacity-60">⚡</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate">{item.label}</p>
                    <p className="text-[11px] truncate" style={{ color: "var(--muted)" }}>
                      {item.hint}
                    </p>
                  </div>
                  {active && <span className="cmdk-kbd">↵</span>}
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t text-[10px]"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <div className="flex items-center gap-2">
            <span className="cmdk-kbd">↑</span>
            <span className="cmdk-kbd">↓</span>
            <span>{lang === "it" ? "Naviga" : "Navigate"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="cmdk-kbd">↵</span>
            <span>{lang === "it" ? "Apri" : "Open"}</span>
          </div>
        </div>
      </div>
    </>
  );
}
