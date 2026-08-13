"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { copy } from "@/lib/formaCopy";
import { useLang } from "@/components/LanguageProvider";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import BackLink from "@/components/BackLink";
import { Layers, Sparkles, BookOpen, Table2, LayoutGrid, User, Heart } from "lucide-react";
import { sellableTemplatesMeta } from "@/lib/templates";

const SELLABLE_COUNT = sellableTemplatesMeta.filter((t) => t.price > 0).length;

interface DropItem {
  href: string;
  labelIt: string;
  labelEn: string;
  /** One line saying what is behind the link. */
  descIt: string;
  descEn: string;
  icon: typeof Layers;
  /** Ties the icon badge to the catalogue's category colours. */
  cat?: "prompt" | "guide" | "sheet";
}

/**
 * Nav entries. Only entries with `items` render a disclosure caret — a link
 * without a submenu must not advertise one.
 */
// These mirror the filter chips on /catalogo, and the values match the
// GroupKey union there. They used to be Web / Notion / App / Shop pointing at
// ?cat=, which the catalogue never read — four of the five items in the main
// menu silently landed on the unfiltered catalogue, and none of those four
// categories has existed since the catalogue was rebuilt.
const CATALOGO_ITEMS: DropItem[] = [
  {
    href: "/catalogo",
    labelIt: "Tutti i template",
    labelEn: "All templates",
    // Counted, not typed. Written as a literal it said "16" the moment seven
    // products were withdrawn, which is the kind of number nobody re-reads.
    descIt: `${SELLABLE_COUNT} prodotti pronti all'uso`,
    descEn: `${SELLABLE_COUNT} products, ready to use`,
    icon: LayoutGrid,
  },
  {
    href: "/catalogo?gruppo=prompt",
    labelIt: "Prompt e script",
    labelEn: "Prompts & scripts",
    descIt: "Testo da copiare e adattare",
    descEn: "Copy, adapt, paste",
    icon: Sparkles,
    cat: "prompt",
  },
  {
    href: "/catalogo?gruppo=guide",
    labelIt: "Guide",
    labelEn: "Guides",
    descIt: "Percorsi passo per passo",
    descEn: "Step-by-step walkthroughs",
    icon: BookOpen,
    cat: "guide",
  },
  {
    href: "/catalogo?gruppo=sheet",
    labelIt: "Fogli e tracker",
    labelEn: "Sheets & trackers",
    descIt: "Da compilare e aggiornare",
    descEn: "Fill in and keep updated",
    icon: Table2,
    cat: "sheet",
  },
  {
    href: "/catalogo#bundle",
    labelIt: "Bundle",
    labelEn: "Bundles",
    descIt: "Più prodotti, fino a €17 in meno",
    descEn: "Several products, up to €17 off",
    icon: Layers,
  },
];

const ACCOUNT_ITEMS: DropItem[] = [
  {
    href: "/account",
    labelIt: "Il mio account",
    labelEn: "My account",
    descIt: "Acquisti e download",
    descEn: "Purchases and downloads",
    icon: User,
  },
  {
    href: "/wishlist",
    labelIt: "Salvati",
    labelEn: "Saved",
    descIt: "I template messi da parte",
    descEn: "Templates you set aside",
    icon: Heart,
  },
];

/** Nav item with a real dropdown — opens on hover (pointer) and on focus/click. */
function NavDropdown({
  label,
  href,
  items,
  lang,
  active,
}: {
  label: string;
  href: string;
  items: DropItem[];
  lang: "it" | "en";
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const menuId = useId();

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small grace period so the pointer can travel from trigger to panel.
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="fn-nav-item"
      ref={wrapRef}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={href}
        className={active ? "fn-drop active" : "fn-drop"}
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {label}
        <svg
          className="fn-caret"
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          aria-hidden
          data-open={open ? "1" : undefined}
        >
          <path
            d="M1 1l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div id={menuId} className="fn-menu" data-open={open ? "1" : undefined} role="menu">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={`/${lang}${item.href}`}
              role="menuitem"
              className="fn-menu-item"
              data-cat={item.cat}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <span className="fn-menu-item__badge" aria-hidden>
                <Icon size={16} strokeWidth={1.6} />
              </span>
              <span className="fn-menu-item__text">
                <span className="fn-menu-item__label">
                  {lang === "it" ? item.labelIt : item.labelEn}
                </span>
                <span className="fn-menu-item__desc">
                  {lang === "it" ? item.descIt : item.descEn}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function SiteNav() {
  const { lang, toggle } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const pathname = usePathname();
  const withoutLang = pathname.replace(/^\/(it|en)(?=\/|$)/, "");
  const inCatalogo =
    withoutLang.startsWith("/catalogo") ||
    withoutLang.startsWith("/bundle") ||
    withoutLang.startsWith("/templates") ||
    withoutLang.startsWith("/preview") ||
    withoutLang.startsWith("/wishlist");
  const inGuida = withoutLang.startsWith("/guida") || withoutLang.startsWith("/guide");
  const inStudio = withoutLang.startsWith("/studio") || withoutLang.startsWith("/ai-studio");
  const inAccount = withoutLang.startsWith("/account") || withoutLang.startsWith("/success");

  return (
    <>
      {/* Utility bar. The left slot used to be an empty placeholder — every
          inner page opened with a strip of nothing above the wordmark. It
          holds "Indietro" now, which is how every page that carries this nav
          gets a back control in the same place. */}
      <div className="fn-utility">
        <BackLink fallbackHref={`/${lang}`} />
        <div className="fn-right">
          <UserButton />
        </div>
      </div>

      <div className="fn-topline" />

      {/* SVG logo */}
      <Link href={`/${lang}`} className="fn-logo-hero" aria-label="FORMA home">
        <FormaLogoAnimated className="fn-logo-svg" />
      </Link>

      {/* Navbar
          "Studio" portava a /ai-studio (brochure statica), obbligando chi
          vuole usare lo strumento a passare sempre di là prima di arrivare a
          /studio. Ora porta direttamente a /studio; il secondo link, che
          prima duplicava la stessa destinazione, ora porta a /ai-studio come
          approfondimento opzionale. */}
      <nav className="fn-navbar" aria-label="Main navigation">
        <div className="fn-nav-left">
          <NavDropdown
            label={t("catalogo")}
            href={`/${lang}/catalogo`}
            items={CATALOGO_ITEMS}
            lang={lang}
            active={inCatalogo}
          />
          <Link
            href={`/${lang}/guida`}
            className={inGuida ? "active" : undefined}
            aria-current={inGuida ? "page" : undefined}
          >
            {t("guida")}
          </Link>
          <Link
            href={`/${lang}/studio`}
            className={inStudio ? "active" : undefined}
            aria-current={inStudio ? "page" : undefined}
          >
            {t("studioAi")}
          </Link>
          <NavDropdown
            label={t("account")}
            href={`/${lang}/account`}
            items={ACCOUNT_ITEMS}
            lang={lang}
            active={inAccount}
          />
        </div>
        <div />
        <div className="fn-nav-right">
          <Link href={`/${lang}/catalogo`}>
            {t("cerca")} <span className="fn-kbd">Ctrl K</span>
          </Link>
          <Link className="fn-outline" href={`/${lang}/ai-studio`}>
            {lang === "it" ? "Come funziona" : "How it works"}
          </Link>
        </div>
      </nav>
    </>
  );
}
