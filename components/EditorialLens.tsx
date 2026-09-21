import Link from "next/link";
import type { Lang } from "@/lib/i18n";

export default function EditorialLens({ lang }: { lang: Lang }) {
  const items =
    lang === "it"
      ? [
          ["Finzione", "Che cosa mostra il personaggio o suggerisce la narrazione."],
          ["Evidenza", "Che cosa la psicologia può sostenere, con limiti e alternative plausibili."],
          ["Pratica", "Che cosa è utile applicare senza trasformare un indizio in una certezza."],
        ]
      : [
          ["Fiction", "What the character portrays or the narrative suggests."],
          ["Evidence", "What psychology can support, including limits and plausible alternatives."],
          ["Practice", "What is useful to apply without turning a clue into certainty."],
        ];

  return (
    <aside className="my-10 border-y border-theme py-6" aria-label={lang === "it" ? "Lente editoriale" : "Editorial lens"}>
      <p
        className="text-[10px] font-semibold uppercase"
        style={{ color: "var(--accent)", letterSpacing: "0.16em" }}
      >
        {lang === "it" ? "Come leggere questa analisi" : "How to read this analysis"}
      </p>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map(([title, text]) => (
          <div key={title}>
            <h2
              className="text-[1.05rem]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 600 }}
            >
              {title}
            </h2>
            <p className="mt-2 text-[13px] leading-5" style={{ color: "var(--muted)" }}>
              {text}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[12px] leading-5" style={{ color: "var(--muted)" }}>
        {lang === "it"
          ? "Un gesto, una microespressione o un comportamento isolato non dimostrano da soli intenzioni, emozioni o menzogna."
          : "A single gesture, microexpression or behaviour does not by itself prove intention, emotion or deception."}
      </p>
      <Link
        href={`/${lang}/biblioteca`}
        className="mt-4 inline-block text-[12px] font-semibold"
        style={{ color: "var(--accent)" }}
      >
        {lang === "it" ? "Fonti e approfondimenti: La Biblioteca →" : "Sources & further reading: The Library →"}
      </Link>
    </aside>
  );
}
