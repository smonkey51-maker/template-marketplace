import 'package:flutter/material.dart';

import '../models/article.dart';

/// A small, hand-picked subset of the real site content
/// (`lib/articles.ts` in the web repo), condensed for the app mockup.
/// Original commentary only — no reproduced show dialogue or transcripts,
/// per the site's IP/disclaimer rules (see the web repo's CLAUDE.md).
const List<Article> articles = [
  Article(
    slug: 'metodo-jane-osservazione',
    category: ArticleCategory.mentalismo,
    title: "Il metodo Jane: l'arte di osservare prima di dedurre",
    description:
        'Cosa rende il personaggio di Patrick Jane convincente non è la magia, ma un metodo: guardare tutto, prima di parlare.',
    paragraphs: [
      'Chi segue "The Mentalist" ricorda la scena tipo: Patrick Jane entra su una scena del crimine, cammina in silenzio per una stanza che tutti gli altri hanno già "visto", e in trenta secondi nota tre cose che a nessun altro erano saltate all\'occhio.',
      "Non è un dono soprannaturale: è osservazione attiva, una tecnica costruita nel tempo. La maggior parte delle persone attraversa una stanza registrando solo ciò che serve a un obiettivo immediato — il personaggio inverte questa economia, entrando senza un obiettivo immediato e lasciando che tutto entri, per poi decidere cosa è rilevante.",
    ],
    callout: ArticleCallout(
      title: "L'Osservazione Chiave",
      body:
          'Il corpo non sa mentire in modo simmetrico. Il primo passo per "leggere la mente" è smettere di guardare e iniziare, finalmente, a osservare.',
    ),
    tags: const ['Patrick Jane', 'osservazione', 'deduzione'],
    readMinutes: 4,
    gradient: [Color(0xFFCEA29E), Color(0xFF8A625E)],
    person: 'patrick-jane',
  ),
  Article(
    slug: 'le-armi-della-persuasione-cialdini',
    category: ArticleCategory.persuasione,
    title: 'Le armi della persuasione: come Cialdini spiega i trucchi dei manipolatori',
    description:
        "Reciprocità, riprova sociale e autorità: i tre principi di Cialdini che i manipolatori usano per farci dire sì — e il manuale per disinnescarli.",
    paragraphs: [
      "C'è una sottile differenza tra un mentalista sul palcoscenico e un truffatore professionista. Il primo dichiara apertamente di volerti ingannare; il secondo lo fa mentre ti stringe la mano.",
      'Nel suo capolavoro "Le armi della persuasione", Cialdini ha dimostrato che il nostro cervello, per risparmiare energia, utilizza delle scorciatoie mentali. Se un manipolatore impara a premere i pulsanti giusti, può spingerci a dire di sì bypassando il pensiero logico.',
    ],
    callout: const ArticleCallout(
      title: 'Manuale di Autodifesa',
      body:
          'Isola la folla: quando ti dicono che "tutti lo fanno", chiediti se faresti comunque questa scelta da solo, senza sapere cosa fa il resto del mondo.',
    ),
    tags: const ['Cialdini', 'persuasione', 'riprova sociale'],
    readMinutes: 5,
    gradient: [Color(0xFF26348C), Color(0xFF151D4D)],
    isGuide: true,
  ),
  Article(
    slug: 'bugie-in-faccia-microespressioni',
    category: ArticleCategory.corpo,
    title: 'Bugie in faccia: come leggere le microespressioni facciali',
    description:
        'La seconda parte della guida al Cold Reading: i segnali involontari del viso e del corpo sotto stress, e la regola della Baseline.',
    paragraphs: [
      "Nelle stanze degli interrogatori, Patrick Jane non ascolta quasi mai le risposte verbali dei sospettati. Cerca qualcos'altro: un battito di ciglia accelerato, una frazione di secondo in cui le labbra si stringono.",
      "Lo psicologo Paul Ekman ha dimostrato che le emozioni umane lasciano sul viso delle tracce fulminee e universali, chiamate microespressioni facciali. Durano meno di un quinto di secondo.",
    ],
    callout: const ArticleCallout(
      title: "L'Avvertimento del Mentalista",
      body:
          'La menzogna o lo stress si nascondono solo nelle anomalie rispetto al comportamento di base di una persona. Non concludere mai nulla da un singolo segnale isolato.',
    ),
    tags: const ['microespressioni', 'Paul Ekman', 'baseline'],
    readMinutes: 5,
    gradient: [Color(0xFFE4E0E8), Color(0xFF9AA0C8)],
    isGuide: true,
  ),
  Article(
    slug: 'cold-reading-nella-finzione',
    category: ArticleCategory.mentalismo,
    title: 'L\'arte del Cold Reading: come Patrick Jane "legge" la mente',
    description:
        "Dietro ogni apparente magia si nasconde uno spirito di osservazione implacabile. I pilastri scientifici della lettura a freddo — e come riconoscerla quando viene usata su di te.",
    paragraphs: [
      "Quella che in televisione sembra magia, nella psicologia reale prende il nome di Cold Reading: un insieme di tecniche che permette di ottenere informazioni su uno sconosciuto dando l'illusione di poterne leggere la mente.",
      'Nel 1948 lo psicologo Bertram Forer dimostrò con un semplice esperimento quanto siamo pronti a riconoscerci in affermazioni generiche, se ci vengono presentate come "su misura per noi".',
    ],
    tags: const ['cold reading', 'effetto Barnum', 'Forer'],
    readMinutes: 4,
    gradient: [Color(0xFF8A625E), Color(0xFF614542)],
    person: 'patrick-jane',
    isGuide: true,
  ),
  Article(
    slug: 'dossier-cal-lightman-microespressioni',
    category: ArticleCategory.corpo,
    title: 'Dossier: Cal Lightman e la scienza (vera) delle microespressioni',
    description:
        'Un altro consulente televisivo che legge le persone per mestiere. Cosa prende in prestito dalla ricerca reale, e cosa aggiunge la sceneggiatura.',
    paragraphs: [
      'Chi ha visto sia "The Mentalist" sia "Lie to Me" nota subito una parentela: due consulenti esterni, entrambi capaci di leggere le persone meglio di chiunque altro nella stanza.',
      "Il personaggio di Cal Lightman è basato, dichiaratamente, sul lavoro dello psicologo reale Paul Ekman — ma lo show comprime in un fermo immagine ciò che nella realtà richiede allenamento specifico.",
    ],
    tags: const ['Cal Lightman', 'Lie to Me', 'FACS'],
    readMinutes: 4,
    gradient: [Color(0xFF151D4D), Color(0xFF0B1030)],
    person: 'cal-lightman',
  ),
  Article(
    slug: 'cold-reading-come-riconoscerlo',
    category: ArticleCategory.controManipolazione,
    title: 'Cold reading: come riconoscerlo e difendersi',
    description:
        'Sedicenti sensitivi, venditori aggressivi, oroscopi troppo azzeccati: come riconoscere il cold reading quando viene usato su di te.',
    paragraphs: [
      'Le affermazioni di Barnum sono strutturate per sembrare specifiche, ma in realtà si adattano a chiunque. Riconoscerle è il primo passo per non caderci.',
      "Una volta consapevole del meccanismo, l'illusione svanisce: il cold reading funziona solo finché decidi di essere un complice attivo di chi lo usa.",
    ],
    tags: const ['difesa psicologica', 'sensitivi', 'manipolazione'],
    readMinutes: 4,
    gradient: [Color(0xFFCEA29E), Color(0xFF26348C)],
    isGuide: true,
  ),
];

Article featuredArticle() => articles.first;

List<Article> articlesByCategory(ArticleCategory? category) {
  if (category == null) return articles;
  return articles.where((a) => a.category == category).toList();
}
