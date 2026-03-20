/**
 * Genera exports/ con tutti i template pronti per Gumroad/Etsy.
 *
 * Struttura:
 *   exports/
 *   ├── gumroad/          ← tutto (HTML, prompts, canva, notion, excel, sheets, webflow, framer)
 *   │   ├── html/
 *   │   ├── prompts/
 *   │   ├── canva/
 *   │   ├── notion/
 *   │   ├── excel/
 *   │   ├── sheets/
 *   │   ├── webflow/
 *   │   └── framer/
 *   └── etsy/             ← solo i formati adatti a Etsy (canva, notion, excel, sheets)
 *       ├── canva/
 *       ├── notion/
 *       ├── excel/
 *       └── sheets/
 *
 * Esegui manualmente con:
 *   npm run export-templates
 *
 * Oppure parte in automatico all'avvio del dev server (tramite instrumentation.ts).
 */

import fs from "node:fs";
import path from "node:path";
import { templates, getDownloadType, type DownloadType } from "../lib/templates";

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "exports");

// Tipi che hanno senso su Etsy (mercato creativo / no-code)
const ETSY_TYPES: DownloadType[] = ["canva", "notion", "excel", "sheets"];

// Tutte le sottocartelle di gumroad
const GUMROAD_SUBDIRS: DownloadType[] = [
  "html", "prompt", "canva", "notion", "excel", "sheets", "webflow", "framer",
];

function ensureDir(...parts: string[]) {
  const p = path.join(...parts);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  return p;
}

function tailwindHtml(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; }
    * { scrollbar-width: none; -ms-overflow-style: none; }
    *::-webkit-scrollbar { display: none; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

function externalLinkTxt(name: string, type: string, url: string, price: number): string {
  return `${name}
${"─".repeat(Math.max(name.length, 20))}

Tipo: ${type.toUpperCase()}
Prezzo consigliato: €${(price / 100).toFixed(2)}

LINK DI ACCESSO:
${url}

───────────────────────────────────────────
Apri il link nel browser per aprire / duplicare il template.

💡 Vuoi personalizzarlo con AI?
   Visita TemplateLab per usare lo Studio AI integrato.
`;
}

export function runExport(silent = false): void {
  if (!silent) console.log("\n📦 Generazione exports/...\n");
  ensureDir(OUT);
  const gumroadDir = path.join(OUT, "gumroad");
  const etsyDir = path.join(OUT, "etsy");

  const indexRows: string[] = [
    "# TemplateLab — Export per Gumroad / Etsy",
    "",
    `Generato: ${new Date().toLocaleString("it-IT")}`,
    "",
    "| Nome | ID | Formato | Prezzo | Gumroad | Etsy |",
    "| ---- | -- | ------- | ------ | ------- | ---- |",
  ];

  for (const tmpl of templates) {
    const dlType = getDownloadType(tmpl);
    const price = `€${(tmpl.price / 100).toFixed(2)}`;
    let gumroadPath = "";
    let etsyPath = "";

    if (dlType === "html") {
      const filename = `${tmpl.id}.html`;
      const dest = path.join(gumroadDir, "html");
      ensureDir(dest);
      fs.writeFileSync(path.join(dest, filename), tailwindHtml(tmpl.name, tmpl.content), "utf-8");
      gumroadPath = `gumroad/html/${filename}`;
      console.log(`  ✅ html     → ${gumroadPath}`);

    } else if (dlType === "prompt") {
      const filename = `${tmpl.id}.txt`;
      const dest = path.join(gumroadDir, "prompt");
      ensureDir(dest);
      fs.writeFileSync(path.join(dest, filename), tmpl.content, "utf-8");
      gumroadPath = `gumroad/prompt/${filename}`;
      console.log(`  ✅ prompt   → ${gumroadPath}`);

    } else {
      // canva, notion, excel, sheets, webflow, framer
      const filename = `${tmpl.id}.txt`;
      const url = tmpl.downloadUrl ?? "(link non ancora configurato)";
      const content = externalLinkTxt(tmpl.name, dlType, url, tmpl.price);

      const gDest = path.join(gumroadDir, dlType);
      ensureDir(gDest);
      fs.writeFileSync(path.join(gDest, filename), content, "utf-8");
      gumroadPath = `gumroad/${dlType}/${filename}`;
      console.log(`  ✅ ${dlType.padEnd(8)} → ${gumroadPath}`);

      if ((ETSY_TYPES as string[]).includes(dlType)) {
        const eDest = path.join(etsyDir, dlType);
        ensureDir(eDest);
        fs.writeFileSync(path.join(eDest, filename), content, "utf-8");
        etsyPath = `etsy/${dlType}/${filename}`;
        console.log(`  ✅ ${dlType.padEnd(8)} → ${etsyPath} (Etsy)`);
      }
    }

    indexRows.push(
      `| ${tmpl.name} | \`${tmpl.id}\` | ${dlType} | ${price} | \`${gumroadPath}\` | ${etsyPath ? `\`${etsyPath}\`` : "—"} |`
    );
  }

  // Indice
  indexRows.push(
    "",
    "## Note",
    "",
    "**Gumroad** — accetta tutti i formati. Carica il file direttamente come prodotto digitale.",
    "",
    "**Etsy** — funziona meglio con Canva, Notion, Excel, Google Sheets.",
    "  I template HTML puri sono fuori scope per Etsy.",
    "",
    "**Suggerimento descrizione**: aggiungi sempre:",
    "> *Personalizza questo template con AI su TemplateLab — studio AI integrato, nessun abbonamento.*",
  );

  fs.writeFileSync(path.join(OUT, "_INDEX.md"), indexRows.join("\n"), "utf-8");

  if (!silent) {
    console.log(`\n✅ Esportazione completata!`);
    console.log(`📁 ${OUT}\n`);
  }
}

// Esecuzione diretta via `npm run export-templates`
if (require.main === module) {
  runExport();
}
