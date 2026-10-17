import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import SiteNav from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import TestBase from "@/components/TestBase";
import ArticleBody from "@/components/ArticleBody";
import ArkDemo from "@/components/lab/ArkDemo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return pageMeta(
    lang,
    "/test-ma-di-piu",
    `${copy[lang].testPlusTitle} — Sandbox`,
    copy[lang].testPlusSub,
  );
}

const h2 = "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted";

const LONG_TEXT = {
  it: `Un testo lungo serve a verificare ritmo verticale, lunghezza di riga e gerarchia dei titoli.

## Perché una pagina di prova

Provare un'interfaccia con contenuti realistici, anche se di esempio, mostra problemi che con il testo segnaposto non emergono: titoli che vanno a capo, elenchi lunghi, paragrafi densi.

- Elenco puntato con voci brevi.
- Voce più lunga, che va a capo su più righe per verificare allineamento e interlinea dell'elenco.
- **Testo in grassetto** inserito nel mezzo di una frase.

:::callout Nota
Tutto il contenuto di questa pagina è materiale di esempio e non rappresenta un'organizzazione reale.
:::

## Seconda sezione

Il testo scorre su una colonna di circa sessantotto caratteri: abbastanza stretta per leggere senza fatica, abbastanza larga da non frammentare le frasi.`,
  en: `A long text is used to check vertical rhythm, line length and heading hierarchy.

## Why a test page

Trying an interface with realistic content, even sample content, reveals problems that placeholder text hides: headings that wrap, long lists, dense paragraphs.

- A bulleted list with short items.
- A longer item that wraps over several lines to check list alignment and line height.
- **Bold text** placed in the middle of a sentence.

:::callout Note
All content on this page is sample material and does not represent a real organisation.
:::

## Second section

The text runs in a column of about sixty-eight characters: narrow enough to read without effort, wide enough not to fragment sentences.`,
};

const SWATCHES = [
  "bg",
  "surface",
  "surface-2",
  "ink",
  "muted",
  "line",
  "line-strong",
  "brand",
  "accent",
];

export default async function TestPlusPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const L = (it: string, en: string) => (lang === "it" ? it : en);

  const rows: [string, string, string][] = [
    ["Tabs", "Ark UI", L("Attivo", "Active")],
    ["Accordion", "Ark UI", L("Attivo", "Active")],
    ["Switch", "Ark UI", L("Attivo", "Active")],
    [L("Palette comandi", "Command palette"), "Ctrl/Cmd + K", L("Attivo", "Active")],
    [L("Tema scuro", "Dark theme"), "class .dark", L("Attivo", "Active")],
  ];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <PageHeader
        crumbs={[{ label: t("siteName") }, { label: t("testPlusTitle") }]}
        kicker={t("testPlusKicker")}
        title={t("testPlusTitle")}
        subtitle={t("testPlusSub")}
      />
      <main className="mx-auto max-w-[1200px] space-y-14 px-4 py-12 sm:px-6">
        <TestBase lang={lang} />

        <section aria-labelledby="ark">
          <h2 id="ark" className={h2}>
            {L("Primitive Ark UI", "Ark UI primitives")}
          </h2>
          <div className="glass mt-4 max-w-2xl p-6 sm:p-8">
            <ArkDemo />
          </div>
        </section>

        <section aria-labelledby="table">
          <h2 id="table" className={h2}>
            {L("Tabella dati", "Data table")}
          </h2>
          <div className="glass mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
              <thead className="bg-surface/50">
                <tr className="border-b border-line-strong">
                  {[L("Componente", "Component"), L("Origine", "Source"), L("Stato", "Status")].map(
                    (h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-3 font-medium">{r[0]}</td>
                    <td className="px-4 py-3 text-muted">{r[1]}</td>
                    <td className="px-4 py-3 font-mono text-[13px]">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="long">
          <h2 id="long" className={h2}>
            {L("Testo lungo", "Long-form text")}
          </h2>
          <div className="mt-4">
            <ArticleBody body={LONG_TEXT[lang]} />
          </div>
        </section>

        <section aria-labelledby="palette">
          <h2 id="palette" className={h2}>
            {L("Palette", "Palette")}
          </h2>
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {SWATCHES.map((s) => (
              <li key={s}>
                <div
                  className="h-14 rounded-xl border border-line-strong"
                  style={{ background: `var(--${s})` }}
                />
                <p className="mt-1.5 font-mono text-[11px] text-muted">--{s}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
