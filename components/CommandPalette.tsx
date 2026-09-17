"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Zap, ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/articles";
import { useLang } from "@/components/LanguageProvider";

type PaletteItem =
  | { kind: "article"; slug: string; title: string; description?: string; href: string }
  | { kind: "route"; label: string; hint: string; href: string }
  | { kind: "action"; label: string; hint: string; run: () => void };

/** Ctrl/Cmd-K search — repurposed from the old catalogue search to search
 * articles instead, now that there's no product catalogue. */
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
        label: lang === "it" ? "Home" : "Home",
        hint: lang === "it" ? "Torna alla home" : "Back to the homepage",
        href: `/${lang}`,
      },
      {
        kind: "route",
        label: lang === "it" ? "Articoli" : "Articles",
        hint: lang === "it" ? "Tutti gli articoli" : "All articles",
        href: `/${lang}/articoli`,
      },
      {
        kind: "route",
        label: lang === "it" ? "Chi siamo" : "About",
        hint: lang === "it" ? "Il progetto e il disclaimer" : "The project and the disclaimer",
        href: `/${lang}/chi-siamo`,
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

  const articleItems: PaletteItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => {
        if (!q) return true;
        const locale = a[lang];
        return (
          locale.title.toLowerCase().includes(q) ||
          locale.description.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      })
      .slice(0, q ? 12 : 6)
      .map<PaletteItem>((a) => ({
        kind: "article",
        slug: a.slug,
        title: a[lang].title,
        description: a[lang].description,
        href: `/${lang}/articoli/${a.slug}`,
      }));
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
    return [...filteredRoutes, ...articleItems, ...filteredActions];
  }, [routes, actions, articleItems, query]);

  useEffect(() => setIndex(0), [query]);

  const execute = useCallback(
    (item: PaletteItem) => {
      setOpen(false);
      if (item.kind === "route") router.push(item.href);
      else if (item.kind === "article") router.push(item.href);
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
            placeholder={lang === "it" ? "Cerca articoli, pagine…" : "Search articles, pages…"}
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[var(--muted)]"
            style={{ color: "var(--text)" }}
            aria-label={lang === "it" ? "Cerca" : "Search"}
          />
          <span className="cmdk-kbd">ESC</span>
        </div>

        <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
          {allItems.length === 0 && (
            <div className="px-4 py-8 text-center text-[13px]" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "Nessun risultato" : "No results"}
            </div>
          )}

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
              if (item.kind !== "route") return null;
              return (
                <div
                  key={`r-${item.href}`}
                  data-idx={itemIdx}
                  data-active={active}
                  className="cmdk-item"
                  onClick={() => execute(item)}
                  onMouseEnter={() => setIndex(itemIdx)}
                >
                  <span className="cmdk-item__badge" aria-hidden>
                    <ArrowUpRight size={15} strokeWidth={1.8} />
                  </span>
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

          {allItems.some((i) => i.kind === "article") && (
            <div
              className="px-3 pt-3 pb-1 text-[9px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--muted)" }}
            >
              {lang === "it" ? "Articoli" : "Articles"}
            </div>
          )}
          {allItems
            .filter((i) => i.kind === "article")
            .map((item) => {
              cursor += 1;
              const active = cursor === index;
              const itemIdx = cursor;
              if (item.kind !== "article") return null;
              return (
                <div
                  key={`a-${item.slug}`}
                  data-idx={itemIdx}
                  data-active={active}
                  className="cmdk-item"
                  onClick={() => execute(item)}
                  onMouseEnter={() => setIndex(itemIdx)}
                >
                  <span className="cmdk-item__badge" aria-hidden>
                    {item.title.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate">{item.title}</p>
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
                  key={`ac-${item.label}`}
                  data-idx={itemIdx}
                  data-active={active}
                  className="cmdk-item"
                  onClick={() => execute(item)}
                  onMouseEnter={() => setIndex(itemIdx)}
                >
                  <Zap aria-hidden size={14} strokeWidth={1.75} className="opacity-60" />
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
