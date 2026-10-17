import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import TestBase from "@/components/TestBase";
import ArticleBody from "@/components/ArticleBody";
import ArkDemo from "@/components/lab/ArkDemo";

// Internal component playground: not part of the public site.
export const metadata: Metadata = {
  title: "Test ma di più",
  robots: { index: false, follow: false },
};

const h2 = "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted";

const LONG_TEXT = `Un testo lungo serve a verificare ritmo verticale, lunghezza di riga e gerarchia dei titoli.

## Perché una pagina di prova

Provare un'interfaccia con contenuti realistici, anche se di esempio, mostra problemi che con il testo segnaposto non emergono: titoli che vanno a capo, elenchi lunghi, paragrafi densi.

- Elenco puntato con voci brevi.
- Voce più lunga, che va a capo su più righe per verificare allineamento e interlinea dell'elenco.
- **Testo in grassetto** inserito nel mezzo di una frase.

:::callout Nota
Tutto il contenuto di questa pagina è materiale di esempio e non rappresenta un'organizzazione reale.
:::

## Seconda sezione

Il testo scorre su una colonna di circa sessantotto caratteri: abbastanza stretta per leggere senza fatica, abbastanza larga da non frammentare le frasi.`;

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

const ROWS: [string, string, string][] = [
  ["Tabs", "Ark UI", "Attivo"],
  ["Accordion", "Ark UI", "Attivo"],
  ["Switch", "Ark UI", "Attivo"],
  ["Palette comandi", "Ctrl/Cmd + K", "Attivo"],
  ["Tema scuro", "class .dark", "Attivo"],
];

export default function TestPlusPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Test ma di più" }]}
        kicker="Pagina 2"
        title="Test ma di più"
        subtitle="Stessa base, più materiale: primitive Ark UI, testo lungo, tabella dati e palette."
      />
      <div className="mx-auto max-w-[1200px] space-y-14 px-4 py-12 sm:px-6">
        <TestBase />

        <section aria-labelledby="ark">
          <h2 id="ark" className={h2}>
            Primitive Ark UI
          </h2>
          <div className="glass-panel mt-4 max-w-2xl p-6 sm:p-8">
            <ArkDemo />
          </div>
        </section>

        <section aria-labelledby="table">
          <h2 id="table" className={h2}>
            Tabella dati
          </h2>
          <div className="glass-panel mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
              <thead className="bg-surface/50">
                <tr className="border-b border-line-strong">
                  {["Componente", "Origine", "Stato"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
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
            Testo lungo
          </h2>
          <div className="mt-4">
            <ArticleBody body={LONG_TEXT} />
          </div>
        </section>

        <section aria-labelledby="palette">
          <h2 id="palette" className={h2}>
            Palette
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
      </div>
    </PageShell>
  );
}
