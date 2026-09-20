/**
 * "La Biblioteca" — recommended-reading page. Single source of truth for
 * the two books named in the "Il Taccuino di Jane" content brief. No cover
 * art on purpose: both are real, currently in-print books, and the site has
 * no legitimate free/CC source for their covers — see CLAUDE.md, which asks
 * for a typographic/icon treatment instead rather than any risk of
 * reproducing copyrighted cover art.
 */
export type Lang = "it" | "en";

export type BookLocale = {
  /** The edition title actually used in that language's market. */
  title: string;
  /** One-paragraph, original description in the site's own voice — not a
   * verbatim jacket blurb. */
  description: string;
};

export type Book = {
  slug: string;
  author: string;
  originalTitle: string;
  year: number;
  it: BookLocale;
  en: BookLocale;
};

export const books: Book[] = [
  {
    slug: "il-linguaggio-del-corpo-navarro",
    author: "Joe Navarro",
    originalTitle: "What Every BODY Is Saying",
    year: 2008,
    it: {
      title: "I segreti del linguaggio del corpo",
      description:
        "Scritto da un ex agente dell'FBI specializzato per anni in comunicazione non verbale, questo manuale resta il punto di riferimento più citato per chi vuole imparare a decodificare segnali corporei e microespressioni con un metodo, non a intuito. La forza del libro non è promettere scorciatoie magiche — è l'opposto: insegna a costruire pazientemente la linea di base di una persona, a distinguere il comfort dal disagio, e a resistere alla tentazione (molto diffusa, anche in questo sito quando si parla di Patrick Jane) di credere che un singolo gesto significhi sempre la stessa cosa. Per chi è arrivato fin qui leggendo gli articoli di INSPO sul linguaggio del corpo, è probabilmente la lettura più naturale con cui continuare: meno narrativa, più esercizio pratico quotidiano.",
    },
    en: {
      title: "What Every BODY Is Saying",
      description:
        "Written by a former FBI agent who spent years specialising in nonverbal communication, this book remains the most-cited reference for anyone who wants to decode body signals and microexpressions with a method, not a hunch. Its real strength isn't promising shortcuts — it's the opposite: it patiently teaches how to build a person's baseline, tell comfort from discomfort apart, and resist the very common temptation (one this site pushes back on when discussing Patrick Jane) to believe a single gesture always means the same thing. For anyone who got here through INSPO's body-language articles, it's probably the most natural next read: less narrative, more everyday practical exercise.",
    },
  },
  {
    slug: "le-armi-della-persuasione-cialdini",
    author: "Robert Cialdini",
    originalTitle: "Influence: The Psychology of Persuasion",
    year: 1984,
    it: {
      title: "Le armi della persuasione",
      description:
        "Il testo scientifico di riferimento per capire perché diciamo di sì — reciprocità, impegno e coerenza, riprova sociale, autorità, simpatia, scarsità: i sei principi che questo libro ha reso quasi di uso comune sono la base teorica dietro molti degli articoli di questo sito sulla persuasione e sulla manipolazione. Cialdini, psicologo sociale, li ha ricavati studiando da vicino venditori, raccoglitori di fondi e operatori di marketing sul campo, non solo in laboratorio, ed è per questo che il libro resta tanto utile a chi vuole comunicare meglio quanto a chi vuole riconoscere quando questi stessi meccanismi vengono usati contro di lui. Una lettura complementare, quasi obbligata, a qualunque articolo di questo sito nella categoria Contro-Manipolazione.",
    },
    en: {
      title: "Influence: The Psychology of Persuasion",
      description:
        "The scientific reference text for understanding why we say yes — reciprocity, commitment and consistency, social proof, authority, liking, scarcity: the six principles this book made almost common knowledge are the theoretical backbone behind much of what this site writes about persuasion and manipulation. Cialdini, a social psychologist, drew them from studying salespeople, fundraisers and marketers in the field, not only in the lab, which is exactly why the book is as useful to anyone who wants to communicate better as it is to anyone who wants to recognise these same mechanisms being used against them. A near-mandatory companion read to anything on this site filed under Counter-Manipulation.",
    },
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
