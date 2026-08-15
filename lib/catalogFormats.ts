import { Sparkles, BookOpen, Table2, type LucideIcon } from "lucide-react";
import { sellableTemplatesMeta } from "@/lib/templates";
import { GROUP_OF, type GroupKey } from "@/lib/categories";

/**
 * Shared between the catalogue hub (CatalogoHub.tsx) and each format's own
 * page (catalogo/[gruppo]/page.tsx) — one source of truth for the three
 * real formats this shop sells, not the fictional multi-platform grid
 * (Notion/Canva/Figma…) a redesign mockup once proposed. Checked against
 * lib/categories.ts's own GROUP_OF mapping rather than invented, so a tile's
 * count always matches what its page actually lists.
 */
export const PAID_TEMPLATES = sellableTemplatesMeta.filter((t) => !t.id.startsWith("free-"));

export const FORMAT_COUNTS: Record<Exclude<GroupKey, "all">, number> = PAID_TEMPLATES.reduce(
  (acc, x) => {
    const key = GROUP_OF[x.category];
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  },
  { prompt: 0, guide: 0, sheet: 0 } as Record<Exclude<GroupKey, "all">, number>,
);

export const FORMAT_TILES: {
  key: Exclude<GroupKey, "all">;
  icon: LucideIcon;
  it: { title: string; desc: string };
  en: { title: string; desc: string };
}[] = [
  {
    key: "prompt",
    icon: Sparkles,
    it: {
      title: "Prompt e script",
      desc: "Librerie di prompt e automazioni pronte in formato testo — copia, adatta, usa.",
    },
    en: {
      title: "Prompts & scripts",
      desc: "Ready-to-use prompt libraries and automations as plain text — copy, adapt, use.",
    },
  },
  {
    key: "guide",
    icon: BookOpen,
    it: {
      title: "Guide e template",
      desc: "Guide operative passo-passo e kit UI pronti all'uso, per lavorare da subito.",
    },
    en: {
      title: "Guides & templates",
      desc: "Step-by-step operating guides and ready-to-use UI kits, to get to work right away.",
    },
  },
  {
    key: "sheet",
    icon: Table2,
    it: {
      title: "Fogli e tracker",
      desc: "Fogli di calcolo e tracker per pianificare, monitorare e tenere sotto controllo numeri e scadenze.",
    },
    en: {
      title: "Sheets & trackers",
      desc: "Spreadsheets and trackers to plan, monitor and keep numbers and deadlines under control.",
    },
  },
];

export function getFormatTile(key: Exclude<GroupKey, "all">) {
  return FORMAT_TILES.find((f) => f.key === key)!;
}
