export type Lang = "it" | "en";
export type ArticleCategory = "mentalist" | "psicologia";

export type ArticleLocale = {
  title: string;
  description: string;
  /**
   * Lightweight markdown: blank-line-separated paragraphs, "## " headings,
   * and "- " bullet lists. Rendered by `components/ArticleBody.tsx` — no
   * markdown dependency, the grammar is intentionally tiny.
   */
  body: string;
};

export type Article = {
  slug: string;
  category: ArticleCategory;
  publishedAt: string; // ISO date
  tags: string[];
  it: ArticleLocale;
  en: ArticleLocale;
};

export const articles: Article[] = [
  // ── The Mentalist / Patrick Jane — fan commentary ─────────────────────────
  {
    slug: "metodo-jane-osservazione",
    category: "mentalist",
    publishedAt: "2026-01-12",
    tags: ["Patrick Jane", "osservazione", "deduzione"],
    it: {
      title: "Il metodo Jane: l'arte di osservare prima di dedurre",
      description:
        "Cosa rende il personaggio di Patrick Jane convincente non è la magia, ma un metodo: guardare tutto, prima di parlare.",
      body: `Chi segue "The Mentalist" ricorda la scena tipo: Patrick Jane entra su una scena del crimine, cammina in silenzio per una stanza che tutti gli altri hanno già "visto", e in trenta secondi nota tre cose che a nessun altro erano saltate all'occhio. È un momento di sceneggiatura, certo — ma il meccanismo che il personaggio simula è reale e ha un nome: osservazione attiva.

## Guardare non è vedere

La maggior parte delle persone attraversa una stanza registrando solo ciò che serve a un obiettivo immediato: dov'è la porta, chi altro c'è, se c'è qualcosa da sedersi sopra. Il resto viene filtrato via dal cervello prima ancora di raggiungere la coscienza — è economico, ma costa dettagli. Il personaggio di Jane, nella finzione, inverte questa economia: entra senza un obiettivo immediato e lascia che tutto entri, poi decide cosa è rilevante.

Non è un dono soprannaturale, nella logica interna dello show: viene ripetutamente presentato come una tecnica costruita nel tempo, un'abitudine osservativa allenata come si allena un muscolo — anni passati (nella backstory del personaggio) a leggere persone per mestiere prima di diventare consulente.

## Tre livelli di lettura

Nel modo in cui il personaggio viene scritto, si possono distinguere tre livelli di ciò che nota:

- **L'ambiente fisico** — oggetti fuori posto, usura non coerente con una storia raccontata, dettagli che confermano o smentiscono una versione dei fatti.
- **Il corpo delle persone** — postura, contatto visivo, dove vanno le mani quando qualcuno risponde a una domanda scomoda.
- **La coerenza tra parole e comportamento** — non tanto "sta mentendo" quanto "quello che dice e quello che fa non tornano".

Il terzo livello è quello più interessante da un punto di vista psicologico reale, perché è il più trasferibile: non richiede leggere microespressioni impossibili da cogliere a occhio nudo, richiede solo notare le incongruenze, e le incongruenze sono alla portata di chiunque presti attenzione con costanza.

## Cosa prendere, cosa lasciare

Lo show, come ogni fiction, comprime in secondi processi che nella realtà richiedono tempo e verifica: un buon investigatore reale non annuncia una conclusione definitiva da un solo dettaglio, la usa come ipotesi da testare. È la differenza tra un momento drammatico scritto per la TV e un metodo psicologico applicabile: il primo cerca l'effetto, il secondo cerca l'accuratezza — e a volte i due obiettivi sono in tensione.

Quello che vale la pena portarsi via dal personaggio non è la certezza fulminea, ma l'abitudine che la precede: entrare in una stanza, in una conversazione, in una trattativa, senza dare per scontato di aver già visto tutto quello che c'è da vedere.`,
    },
    en: {
      title: "The Jane method: observing before deducing",
      description:
        "What makes Patrick Jane's character work isn't magic — it's a method: look at everything before you speak.",
      body: `Anyone who has watched "The Mentalist" remembers the typical scene: Patrick Jane walks onto a crime scene everyone else has already "seen", silently crosses the room, and within thirty seconds notices three things nobody else caught. It's a scripted beat, sure — but the mechanism the character simulates is real, and it has a name: active observation.

## Looking is not seeing

Most people cross a room registering only what serves an immediate goal: where the door is, who else is present, whether there's somewhere to sit. Everything else gets filtered out before it even reaches consciousness — efficient, but costly in detail. Jane's character, in the fiction, inverts that economy: he enters with no immediate goal and lets everything in, then decides afterward what matters.

Within the show's own internal logic, this is never presented as a supernatural gift — it's repeatedly framed as a trained habit, an observational muscle built over years (in the character's backstory) of reading people for a living before becoming a consultant.

## Three layers of reading

In how the character is written, you can pick out three layers of what he notices:

- **The physical environment** — objects out of place, wear inconsistent with a story someone just told, details that confirm or contradict a stated version of events.
- **People's bodies** — posture, eye contact, where hands go when someone answers an uncomfortable question.
- **The mismatch between words and behaviour** — less "they're lying", more "what they say and what they do don't line up".

That third layer is the most interesting from a real psychological standpoint, because it's the most transferable one: it doesn't require reading microexpressions no one can actually catch with the naked eye, it only requires noticing inconsistencies — and inconsistencies are available to anyone who pays consistent attention.

## What to keep, what to leave behind

Like any fiction, the show compresses into seconds a process that in reality takes time and verification: a good real investigator doesn't announce a firm conclusion from a single detail, they treat it as a hypothesis to test. That's the gap between a dramatic TV beat and an applicable psychological method — one aims for effect, the other for accuracy, and the two goals sometimes pull against each other.

What's worth taking from the character isn't the lightning-fast certainty, but the habit that precedes it: walking into a room, a conversation, a negotiation, without assuming you've already seen everything there is to see.`,
    },
  },
  {
    slug: "cold-reading-nella-finzione",
    category: "mentalist",
    publishedAt: "2026-01-19",
    tags: ["cold reading", "sceneggiatura", "psicologia"],
    it: {
      title: "Cold reading nella finzione: come funziona (e dove finisce)",
      description:
        "Il personaggio di Patrick Jane usa spesso tecniche che assomigliano al cold reading. Cosa sono davvero e quali sono i loro limiti reali.",
      body: `Una parte del fascino del personaggio di Patrick Jane sta nel modo in cui sembra "leggere nella mente" delle persone che interroga. Nella finzione dello show, viene chiarito più volte che non si tratta di percezione extrasensoriale: è un ex mentalista da palcoscenico che applica allo studio delle persone tecniche di lettura a freddo, affinate da anni di esibizioni.

## Cos'è davvero il cold reading

Il cold reading è un insieme di tecniche comunicative, non un potere. Si basa su alcuni ingredienti concreti:

- **Affermazioni generiche ad alta probabilità di essere vere** ("hai avuto un periodo difficile di recente" si applica a quasi chiunque, in quasi ogni momento della vita).
- **Osservazione di segnali visibili** — abbigliamento, accento, linguaggio del corpo, il modo in cui una persona reagisce a una frase, che permette di affinare l'affermazione successiva in tempo reale.
- **Feedback della persona stessa** — chi ascolta tende a completare inconsciamente le lacune, confermando dettagli che in realtà non sono mai stati detti con precisione.

Il pubblico che guarda una scena di cold reading ben scritta prova un senso di stupore perché vede solo il risultato finale, non il ragionamento graduale che lo ha costruito — esattamente come avviene nella realtà.

## Perché funziona sullo schermo (e con le persone vere)

L'effetto psicologico dietro il cold reading si chiama spesso "effetto Barnum": la tendenza a percepire come specifiche e personali affermazioni che in realtà sono abbastanza vaghe da adattarsi a chiunque. Non è un difetto di intelligenza — è un bias cognitivo estremamente comune, legato al modo in cui la mente cerca coerenza e significato.

## Dove finisce la tecnica e comincia la scrittura

È importante essere onesti su un punto: nella serie, molte "letture" di Jane sono in realtà dedotte da indizi che lo spettatore non ha modo di verificare — accelerazioni narrative tipiche della fiction televisiva, non dimostrazioni di un metodo replicabile passo passo. Non è un manuale di cold reading, ed è giusto trattarlo come commento e analisi di un personaggio, non come istruzione.

Quello che resta utile, fuori dallo schermo, è la consapevolezza: sapere che il cold reading esiste, come è costruito e perché convince, rende molto più difficile caderne vittima — è l'argomento del prossimo articolo di questa serie.`,
    },
    en: {
      title: "Cold reading in fiction: how it works (and where it stops)",
      description:
        "Patrick Jane's character often uses techniques that resemble cold reading. What they really are, and their real limits.",
      body: `Part of the appeal of Patrick Jane's character is how he seems to "read the mind" of the people he questions. Within the show's own fiction, it's repeatedly made clear this isn't extrasensory perception: he's a former stage mentalist who applies cold-reading techniques, sharpened by years of performing, to the study of people.

## What cold reading actually is

Cold reading is a set of communication techniques, not a power. It rests on a few concrete ingredients:

- **Generic, high-probability statements** ("you've been through a difficult stretch recently" applies to almost anyone, at almost any point in their life).
- **Reading visible signals** — clothing, accent, body language, how a person reacts to a sentence — which lets the next statement be sharpened in real time.
- **Feedback from the listener themselves** — people unconsciously fill in gaps, confirming details that were never actually stated with any precision.

An audience watching a well-written cold-reading scene feels a sense of wonder because they only see the final result, not the gradual reasoning that built it — exactly as happens in reality.

## Why it works on screen (and on real people)

The psychological effect behind cold reading is often called the "Barnum effect": the tendency to perceive as specific and personal statements that are actually vague enough to fit almost anyone. It isn't a flaw in intelligence — it's an extremely common cognitive bias, tied to how the mind searches for coherence and meaning.

## Where the technique ends and the writing begins

It's worth being honest about one thing: in the show, many of Jane's "readings" are really deduced from clues the viewer has no way to verify — a narrative shortcut typical of television fiction, not a demonstration of a step-by-step, replicable method. It isn't a cold-reading manual, and it's fair to treat it as character commentary and analysis, not instruction.

What remains useful off-screen is awareness: knowing that cold reading exists, how it's built and why it persuades, makes it much harder to fall for it — which is the subject of a later article in this series.`,
    },
  },
  {
    slug: "perche-jane-non-e-uno-psichico",
    category: "mentalist",
    publishedAt: "2026-01-26",
    tags: ["Patrick Jane", "scetticismo", "personaggio"],
    it: {
      title: "Perché Patrick Jane non è uno psichico",
      description:
        "Uno degli assi portanti del personaggio è la sua incrollabile posizione scettica. Perché è una scelta di scrittura tanto quanto un tratto caratteriale.",
      body: `Un dettaglio che gli spettatori distratti tendono a dimenticare: Patrick Jane, nel corso della serie, non smette mai di dichiarare — spesso in modo un po' provocatorio — che i poteri psichici non esistono. È una posizione ribadita così spesso da diventare quasi un tormentone del personaggio, ed è una scelta di scrittura precisa, non un dettaglio secondario.

## Un ex finto sensitivo, diventato scettico militante

Nella backstory raccontata dallo show, Jane ha lavorato per anni come falso medium, sfruttando esattamente le tecniche di lettura a freddo discusse in un altro articolo di questa serie. Il trauma personale che lo spinge verso la sua nuova vita da consulente nasce proprio dalle conseguenze di quell'inganno. Da lì in avanti, il personaggio smonta sistematicamente ogni pretesa di sensitività altrui che incontra sul suo cammino investigativo.

Questo doppio movimento — usare tecniche che sembrano magia, mentre nega pubblicamente ogni magia — è ciò che rende il personaggio più interessante di un semplice "detective con superpoteri". Jane non chiede mai al pubblico di credere nel soprannaturale: chiede di credere nell'osservazione, nella preparazione e, quando serve, nella manipolazione consapevole delle percezioni altrui.

## Una funzione narrativa precisa

Dal punto di vista della scrittura, questa insistenza scettica serve a diverse funzioni:

- **Rendere il personaggio moralmente ambiguo mai del tutto ambiguo**: inganna spesso, ma sempre dichiarando (al pubblico, se non ai sospettati) che si tratta di un trucco, non di magia.
- **Distinguerlo dai veri antagonisti/impostori della serie** — personaggi che sfruttano la credulità altrui per denaro o potere, mentre Jane la sfrutta (quasi sempre) per arrivare alla verità.
- **Offrire un commento più ampio** sulla facilità con cui persone reali cadono vittima di sedicenti sensitivi, argomento che lo show tratta esplicitamente in più episodi con personaggi secondari.

## Un fan-service per lo scetticismo

C'è qualcosa di godibile, per chi guarda la serie con occhio critico, nel vedere un personaggio di finzione così apertamente ostile alla pseudoscienza mentre lavora dentro un genere — il procedurale investigativo — che spesso flirta con l'ambiguo. È un promemoria che l'abilità di leggere le persone, per quanto affilata, resta un'abilità umana, allenabile, fallibile e completamente terrena — non un potere.`,
    },
    en: {
      title: "Why Patrick Jane is not a psychic",
      description:
        "One of the character's load-bearing traits is his unshakeable skepticism. Why that's a writing choice as much as a personality trait.",
      body: `A detail casual viewers tend to forget: throughout the series, Patrick Jane never stops declaring — often somewhat provocatively — that psychic powers don't exist. It's repeated often enough to become almost a running joke of the character, and it's a deliberate writing choice, not a minor detail.

## A former fake psychic turned militant skeptic

In the backstory the show tells, Jane worked for years as a fraudulent medium, exploiting exactly the cold-reading techniques discussed in another article in this series. The personal trauma that pushes him toward his new life as a consultant grows directly out of the consequences of that deception. From then on, the character systematically dismantles every claim of psychic ability he encounters along his investigative path.

That double movement — using techniques that look like magic, while publicly denying any magic exists — is what makes the character more interesting than a simple "detective with superpowers". Jane never asks the audience to believe in the supernatural: he asks them to believe in observation, preparation, and, when needed, the deliberate manipulation of other people's perceptions.

## A precise narrative function

From a writing standpoint, this insistent skepticism serves several purposes:

- **It keeps the character morally grey without ever being fully deceptive to the audience**: he often tricks people, but always signals (to the viewer, if not to the suspects) that it's a trick, not magic.
- **It separates him from the show's actual antagonists and impostors** — characters who exploit others' credulity for money or power, while Jane exploits it (almost always) to reach the truth.
- **It offers a broader commentary** on how easily real people fall for self-proclaimed psychics, a theme the show addresses explicitly through several supporting characters across episodes.

## A little fan-service for skepticism

There's something satisfying, for a critical viewer, in watching a fictional character so openly hostile to pseudoscience while working inside a genre — the investigative procedural — that often flirts with ambiguity. It's a reminder that the ability to read people, however sharp, remains a human skill: trainable, fallible, and entirely earthbound — not a power.`,
    },
  },
  {
    slug: "linguaggio-del-corpo-il-mentalist",
    category: "mentalist",
    publishedAt: "2026-02-02",
    tags: ["linguaggio del corpo", "Patrick Jane", "analisi"],
    it: {
      title: "Il linguaggio del corpo secondo Il Mentalist: cosa è vero e cosa no",
      description:
        "La serie fa spesso riferimento a segnali corporei rivelatori. Un confronto onesto tra la sceneggiatura e ciò che la ricerca sul linguaggio del corpo dice davvero.",
      body: `"Il Mentalist" restituisce spesso l'idea che leggere il corpo di una persona sia come leggere un libro aperto: uno sguardo di lato, una mano che tocca il collo, un sorriso che arriva un istante troppo tardi, e Jane sa. È un'immagine potente per la TV. È anche, va detto con chiarezza, semplificata rispetto a ciò che la ricerca sulla comunicazione non verbale racconta.

## Il mito del "segnale unico"

Uno dei semplificazioni più comuni nella fiction — non solo in questa serie — è l'idea che esista un gesto specifico che "tradisce" sempre una bugia: toccarsi il naso, evitare lo sguardo, incrociare le braccia. La ricerca psicologica reale è molto più cauta: nessun singolo segnale corporeo è un indicatore affidabile di menzogna, preso da solo. Evitare lo sguardo può significare disagio, timidezza, cultura d'origine diversa, oppure semplicemente il tentativo di concentrarsi mentre si ricorda un dettaglio vero.

## Cosa la ricerca considera più solido

Quello che gli studi su comunicazione non verbale e comportamento suggeriscono come più utile non è un singolo gesto, ma un **cambiamento rispetto alla linea di base** di una persona: come si comporta normalmente, in una conversazione neutra, rispetto a come si comporta quando la conversazione tocca un argomento sensibile. È un approccio molto più vicino a quello che, in alcune scene meglio scritte della serie, Jane effettivamente pratica: prima osserva come una persona risponde a domande innocue, poi nota gli scarti quando arriva la domanda scomoda.

## Segnali su cui vale la pena prestare attenzione

Restando su un terreno prudente e supportato dalla ricerca sulla comunicazione non verbale in generale (non specifica a un singolo show), alcuni pattern meritano attenzione più di altri:

- **Incongruenza tra parole e tono/espressione** — dire "sono tranquillo" con la voce tesa e le spalle rigide.
- **Cambi improvvisi rispetto al comportamento di base** della persona in quella conversazione specifica.
- **Micro-pause insolite** prima di rispondere a domande semplici che normalmente non richiederebbero riflessione.

## Il valore dello show, comunque

Anche dove la sceneggiatura comprime o romanza il processo, il merito della serie è aver reso popolare l'idea che il corpo comunica informazioni indipendenti dalle parole — un'idea corretta, anche se l'applicazione pratica richiede più cautela, più contesto e meno certezza di quanta ne mostri Patrick Jane in una scena da quaranta minuti.`,
    },
    en: {
      title: "Body language according to The Mentalist: what's true and what isn't",
      description:
        "The show often leans on telltale body signals. An honest comparison between the writing and what body-language research actually says.",
      body: `"The Mentalist" often sells the idea that reading someone's body is like reading an open book: a sideways glance, a hand touching the neck, a smile that lands a beat too late — and Jane knows. It's a powerful image for television. It is also, to be fair, simplified compared to what real research on nonverbal communication tells us.

## The myth of the "single tell"

One of the most common simplifications in fiction — not just this show — is the idea that a specific gesture always "gives away" a lie: touching the nose, avoiding eye contact, crossing arms. Real psychological research is far more cautious: no single body signal, taken alone, is a reliable indicator of deception. Avoiding eye contact can mean discomfort, shyness, a different cultural background, or simply the effort of concentrating while recalling a true detail.

## What research treats as more solid

What studies on nonverbal communication and behaviour suggest is more useful isn't a single gesture, but a **shift from a person's baseline**: how someone normally behaves in a neutral conversation, compared with how they behave once the conversation touches a sensitive topic. That's much closer to what, in some of the show's better-written scenes, Jane actually does: he first watches how a person answers harmless questions, then notices the deviation once an uncomfortable one arrives.

## Signals worth paying attention to

Staying on cautious ground, supported by general research on nonverbal communication (not specific to any one show), a few patterns are worth more attention than others:

- **Mismatch between words and tone or expression** — saying "I'm calm" with a tense voice and rigid shoulders.
- **Sudden departures from that person's own baseline** in that specific conversation.
- **Unusual micro-pauses** before answering simple questions that normally wouldn't require thought.

## The show's value, all the same

Even where the writing compresses or romanticises the process, the series deserves credit for popularising the idea that the body carries information independent of words — a correct idea, even if the practical application requires far more caution, context and less certainty than Patrick Jane displays in a forty-minute episode.`,
    },
  },

  // ── Practical psychology ───────────────────────────────────────────────────
  {
    slug: "leggere-il-linguaggio-del-corpo",
    category: "psicologia",
    publishedAt: "2026-02-09",
    tags: ["linguaggio del corpo", "comunicazione non verbale"],
    it: {
      title: "Leggere il linguaggio del corpo: una guida pratica",
      description:
        "Come osservare postura, gesti ed espressioni in modo utile, senza cadere nei miti da tavola bar sul 'segnale che tradisce tutto'.",
      body: `Il linguaggio del corpo è probabilmente il campo della psicologia popolare più frainteso, in parte proprio a causa della fiction televisiva: si cerca il gesto rivelatore, quando quello che conta davvero è il quadro d'insieme nel tempo.

## Il principio della linea di base

Prima di interpretare qualsiasi segnale, serve sapere come si comporta normalmente quella persona. Alcune persone gesticolano molto per natura, altre mantengono poco contatto visivo per timidezza cronica, non per inganno. Osservare per qualche minuto il comportamento di una persona in una situazione neutra — prima di una domanda importante — costruisce quella linea di base rispetto alla quale ogni scostamento diventa un'informazione, non un giudizio automatico.

## I quattro canali principali

- **Postura** — aperta (spalle rilassate, corpo rivolto verso l'interlocutore) o chiusa (braccia incrociate, corpo di lato). La postura chiusa non significa automaticamente disagio con te: a volte è solo freddo nella stanza.
- **Gesti delle mani** — mani visibili e rilassate comunicano generalmente più apertura di mani nascoste in tasca o sotto un tavolo, ma anche qui il contesto conta.
- **Espressioni facciali e loro tempistica** — un'espressione che appare troppo rapidamente o troppo lentamente rispetto a ciò che viene detto (una risata "fuori tempo") è più informativa dell'espressione in sé.
- **Prossemica** — la distanza che una persona sceglie di mantenere, e come cambia nel corso della conversazione.

## Un esercizio pratico

Un modo semplice per allenare l'osservazione: durante una conversazione ordinaria (una riunione, una cena), scegli in anticipo una sola persona da osservare per cinque minuti, senza giudicare, solo notando. Postura, mani, dove va lo sguardo quando qualcuno le fa una domanda diretta. Poi confrontalo con come si comporta quando parla di qualcosa di neutro. La differenza tra i due stati è l'informazione, non uno dei due stati preso da solo.

## Il limite onesto

Il linguaggio del corpo comunica emozioni e livelli di comfort — non è un poligrafo. Non permette di sapere con certezza se una persona sta mentendo, ma permette di sapere con più affidabilità se qualcosa nella conversazione ha smosso qualcosa dentro di lei — informazione preziosa per fare la domanda giusta, non per emettere un verdetto.`,
    },
    en: {
      title: "Reading body language: a practical guide",
      description:
        "How to observe posture, gestures and expressions usefully, without falling for the barroom myth of the 'one tell that gives it all away'.",
      body: `Body language is probably the most misunderstood field of popular psychology, partly because of television fiction: people look for the one revealing gesture, when what actually matters is the overall pattern over time.

## The baseline principle

Before interpreting any signal, you need to know how that person normally behaves. Some people gesture a lot by nature, others keep little eye contact out of chronic shyness, not deception. Watching a person's behaviour for a few minutes in a neutral situation — before an important question comes up — builds the baseline against which any deviation becomes information, not an automatic verdict.

## The four main channels

- **Posture** — open (relaxed shoulders, body facing the other person) or closed (crossed arms, body turned away). Closed posture doesn't automatically mean discomfort with you: sometimes it's just a cold room.
- **Hand gestures** — visible, relaxed hands generally communicate more openness than hands hidden in pockets or under a table, though context matters here too.
- **Facial expressions and their timing** — an expression that appears too quickly or too slowly relative to what's being said (a laugh that lands "off-beat") is more informative than the expression itself.
- **Proxemics** — the distance a person chooses to keep, and how it shifts over the course of a conversation.

## A practical exercise

A simple way to train observation: during an ordinary conversation (a meeting, a dinner), pick one person in advance to watch for five minutes, without judging, just noticing. Posture, hands, where their eyes go when someone asks them a direct question. Then compare it with how they behave when discussing something neutral. The difference between the two states is the information — not either state on its own.

## The honest limit

Body language communicates emotion and comfort levels — it is not a polygraph. It doesn't let you know for certain whether someone is lying, but it does let you know, more reliably, whether something in the conversation stirred something in them — valuable information for asking the right next question, not for delivering a verdict.`,
    },
  },
  {
    slug: "ascolto-attivo",
    category: "psicologia",
    publishedAt: "2026-02-16",
    tags: ["ascolto attivo", "comunicazione"],
    it: {
      title: "Ascolto attivo: la tecnica che cambia ogni conversazione",
      description:
        "La differenza tra sentire e ascoltare è enorme, ed è una competenza allenabile. Come funziona l'ascolto attivo e perché funziona.",
      body: `Gran parte di ciò che sembra "intuito" in chi legge bene le persone è, più prosaicamente, la capacità di ascoltare davvero — una competenza rara perché richiede di rinunciare temporaneamente al proprio turno di parola mentale.

## Cosa succede di solito in una conversazione

Nella maggior parte degli scambi, mentre l'altra persona parla, buona parte dell'attenzione dell'ascoltatore è già impegnata a preparare la propria risposta. È un pattern automatico e comprensibile — ma significa che si perde una quota consistente di ciò che viene effettivamente detto, incluse le sfumature più utili.

## I quattro elementi dell'ascolto attivo

- **Attenzione piena** — mettere via il telefono, mantenere un contatto visivo naturale, resistere alla tentazione di formulare la risposta prima che l'altro abbia finito.
- **Riflessione** — restituire con parole proprie ciò che si è capito ("quindi il problema principale per te è la tempistica, non il costo?"), che serve sia a verificare la comprensione sia a far sentire l'altra persona ascoltata.
- **Domande aperte** — invece di domande che si chiudono con sì/no, domande che invitano a sviluppare ("cosa ti preoccupa di più in questo?").
- **Sospensione del giudizio** — ascoltare per capire prima che per valutare o correggere.

## Perché funziona così bene

Le persone parlano diversamente — con più dettagli, meno difese — quando percepiscono di essere ascoltate senza fretta di essere interrotte o corrette. Questo non è un trucco manipolativo: è semplicemente rimuovere l'attrito che normalmente frena la comunicazione onesta. La riflessione, in particolare, ha un effetto quasi immediato: molte persone, sentendo ripetuto ciò che hanno appena detto, aggiungono spontaneamente dettagli che non avevano previsto di condividere.

## Un piccolo esercizio

Nella prossima conversazione un po' importante, prova a fare una sola cosa: prima di rispondere, riformula in una frase ciò che l'altra persona ha appena detto, e chiedi conferma. Sembra un dettaglio piccolo. Cambia, quasi sempre, il tono di tutto il resto della conversazione.`,
    },
    en: {
      title: "Active listening: the technique that changes every conversation",
      description:
        "The gap between hearing and listening is enormous, and it's a trainable skill. How active listening works and why it works.",
      body: `Much of what looks like "intuition" in people who read others well is, more prosaically, the ability to actually listen — a rare skill because it requires temporarily giving up your own mental turn to speak.

## What usually happens in a conversation

In most exchanges, while the other person is talking, a good chunk of the listener's attention is already busy preparing their own response. It's an automatic, understandable pattern — but it means missing a substantial share of what's actually being said, including the most useful nuances.

## The four elements of active listening

- **Full attention** — putting the phone away, keeping natural eye contact, resisting the urge to formulate a reply before the other person has finished.
- **Reflection** — restating what you understood in your own words ("so the main issue for you is timing, not cost?"), which both checks understanding and makes the other person feel heard.
- **Open questions** — instead of yes/no questions, ones that invite elaboration ("what worries you most about this?").
- **Suspending judgment** — listening to understand before listening to evaluate or correct.

## Why it works so well

People speak differently — with more detail, fewer defences — when they sense they're being listened to without the pressure of being interrupted or corrected. This isn't a manipulative trick: it's simply removing the friction that normally holds back honest communication. Reflection, in particular, has an almost immediate effect: many people, hearing what they just said repeated back, spontaneously add details they hadn't planned on sharing.

## A small exercise

In your next moderately important conversation, try doing just one thing: before replying, restate in a single sentence what the other person just said, and ask if you got it right. It sounds like a small detail. It almost always changes the tone of everything that follows.`,
    },
  },
  {
    slug: "tecniche-di-memoria-metodo-dei-loci",
    category: "psicologia",
    publishedAt: "2026-02-23",
    tags: ["memoria", "mnemotecniche", "metodo dei loci"],
    it: {
      title: "Tecniche di memoria: il metodo dei loci e le altre mnemotecniche",
      description:
        "Da tecniche usate dai campioni di memoria a strumenti quotidiani: come funziona il metodo dei loci e altre mnemotecniche pratiche.",
      body: `Ricordare grandi quantità di informazioni non è una questione di "avere buona memoria" per natura, ma quasi sempre una questione di metodo. Le tecniche che seguono sono usate da secoli — alcune risalgono all'antichità classica — e restano tra gli strumenti più efficaci disponibili.

## Il metodo dei loci (o palazzo della memoria)

È probabilmente la mnemotecnica più conosciuta, resa popolare anche da vari personaggi di fiction (compreso qualche detective televisivo). Funziona così:

- Scegli un luogo che conosci molto bene — la tua casa, il tragitto verso il lavoro.
- Percorrilo mentalmente in un ordine fisso, individuando una sequenza di "tappe" precise (la porta d'ingresso, il divano, la cucina...).
- Associa a ogni tappa un'informazione da ricordare, trasformandola in un'immagine vivida, insolita o esagerata — più è strana, meglio funziona.
- Per recuperare le informazioni, percorri di nuovo mentalmente lo stesso tragitto.

Il motivo per cui funziona ha basi solide: il cervello umano è eccezionalmente bravo a ricordare spazi e percorsi (un'eredità evolutiva utile per orientarsi nell'ambiente), molto meno bravo a ricordare liste astratte. Il metodo dei loci sfrutta il primo sistema per immagazzinare il secondo.

## Altre mnemotecniche utili nella vita quotidiana

- **Acronimi e frasi mnemoniche** — utili per liste brevi (l'ordine dei pianeti, le note musicali).
- **Chunking** — spezzare un numero lungo in gruppi più piccoli (i numeri di telefono funzionano già così).
- **Storie collegate** — trasformare una lista di elementi scollegati in una breve storia assurda che li unisce in sequenza; il cervello ricorda le narrazioni molto più facilmente delle liste.
- **Ripetizione dilazionata** — rivedere un'informazione a intervalli crescenti (dopo un giorno, poi tre, poi una settimana) è dimostrato più efficace della ripetizione concentrata in un'unica sessione.

## Un piccolo allenamento

Prova con la lista della spesa, la prossima volta: invece di scriverla, costruisci una breve storia mentale che colleghi ogni prodotto al successivo in modo assurdo e visivo. La maggior parte delle persone che lo prova per la prima volta si sorprende di quanti elementi riesce a ricordare senza sforzo.`,
    },
    en: {
      title: "Memory techniques: the method of loci and other mnemonics",
      description:
        "From techniques used by memory champions to everyday tools: how the method of loci and other practical mnemonics actually work.",
      body: `Remembering large amounts of information isn't about naturally "having a good memory" — it's almost always a matter of method. The techniques below have been used for centuries — some date back to classical antiquity — and remain among the most effective tools available.

## The method of loci (memory palace)

Probably the best-known mnemonic technique, also popularised by various fictional characters (including the odd TV detective). Here's how it works:

- Pick a place you know very well — your home, your commute.
- Walk through it mentally in a fixed order, picking out a sequence of specific "stops" (the front door, the sofa, the kitchen...).
- Attach a piece of information to each stop by turning it into a vivid, unusual or exaggerated image — the stranger, the better it works.
- To recall the information, mentally walk the same route again.

The reason it works rests on solid ground: the human brain is exceptionally good at remembering spaces and routes (a useful evolutionary inheritance for navigating the environment), much less good at remembering abstract lists. The method of loci borrows the first system to store the second.

## Other useful everyday mnemonics

- **Acronyms and mnemonic phrases** — useful for short lists (planetary order, musical notes).
- **Chunking** — breaking a long number into smaller groups (phone numbers already work this way).
- **Linked stories** — turning a list of unrelated items into a short, absurd story that connects them in sequence; the brain remembers narratives far more easily than lists.
- **Spaced repetition** — reviewing information at increasing intervals (after a day, then three, then a week) has been shown to be more effective than cramming it into a single session.

## A small workout

Try it with your next grocery list: instead of writing it down, build a short mental story linking each item to the next in an absurd, visual way. Most people trying it for the first time are surprised how many items they can recall without effort.`,
    },
  },
  {
    slug: "cold-reading-come-riconoscerlo",
    category: "psicologia",
    publishedAt: "2026-03-02",
    tags: ["cold reading", "effetto Barnum", "pensiero critico"],
    it: {
      title: "Cold reading: come riconoscerlo e difendersi",
      description:
        "Sedicenti sensitivi, venditori aggressivi, oroscopi troppo azzeccati: come riconoscere il cold reading quando viene usato su di te.",
      body: `Il cold reading non è solo un espediente da show televisivo o da palcoscenico: viene usato — spesso senza che chi lo pratica se ne renda pienamente conto — in contesti quotidiani come vendite aggressive, sedute con sedicenti sensitivi, e persino in alcuni colloqui di lavoro mal condotti. Riconoscerlo è la miglior difesa.

## I segnali da riconoscere

- **Affermazioni ad alta probabilità travestite da specifiche** — "sento che porti un peso da qualche tempo" è vero per la stragrande maggioranza delle persone adulte in un dato momento della vita.
- **Domande travestite da affermazioni** — un cold reader spesso pone una domanda con tono affermativo ("c'è qualcosa legato a una M... Marco? Marta?"), lasciando che sia l'interlocutore a fornire il nome corretto, che verrà poi ripetuto come se fosse stato "percepito".
- **Adattamento rapido dopo un feedback** — se una prima affermazione non trova conferma, un buon cold reader la corregge immediatamente e con disinvoltura, spesso senza che l'ascoltatore noti il cambio di rotta.
- **Linguaggio abbastanza vago da adattarsi a molte situazioni**, formulato però con un tono di sicurezza che suggerisce precisione.

## Perché ci caschiamo (l'effetto Barnum)

Il nome tecnico di questo fenomeno è effetto Barnum (o effetto Forer): la tendenza a percepire come sorprendentemente accurate e personali descrizioni generiche, quando ci viene detto che sono state elaborate appositamente per noi. Non è un segno di ingenuità — è una scorciatoia cognitiva comune, legata al modo in cui la mente cerca coerenza e conferma in ciò che sente.

## Una checklist pratica di difesa

- Chiediti: questa affermazione sarebbe vera anche per la maggior parte delle persone che conosco?
- Fai attenzione a quante informazioni hai fornito tu stesso, senza accorgertene, nella conversazione precedente.
- Diffida di chi corregge rapidamente un'affermazione sbagliata senza ammettere l'errore.
- Ricorda che la sicurezza nel tono di voce non è una prova di accuratezza.

Conoscere questi meccanismi non toglie nulla al piacere di guardare un personaggio di finzione usarli con abilità — anzi, li rende più interessanti da riconoscere sullo schermo, ed è utile difesa nella vita reale.`,
    },
    en: {
      title: "Cold reading: how to spot it and defend yourself",
      description:
        "Self-proclaimed psychics, pushy salespeople, uncannily accurate horoscopes: how to recognise cold reading when it's used on you.",
      body: `Cold reading isn't just a stage or TV device: it gets used — often without the person doing it fully realising it — in everyday settings like aggressive sales, sessions with self-proclaimed psychics, and even some poorly run job interviews. Recognising it is the best defence.

## Signs to watch for

- **High-probability statements disguised as specific ones** — "I sense you've been carrying a weight for some time" is true for the vast majority of adults at some point in their lives.
- **Questions disguised as statements** — a cold reader often poses a question with a statement's tone ("I'm sensing something connected to an M... Mark? Martha?"), letting the listener supply the right name, which then gets repeated back as if it had been "sensed".
- **Fast adaptation after feedback** — if a first statement doesn't land, a good cold reader corrects it immediately and smoothly, often without the listener noticing the course change.
- **Language vague enough to fit many situations**, delivered with a tone of confidence that implies precision.

## Why we fall for it (the Barnum effect)

The technical name for this is the Barnum effect (or Forer effect): the tendency to perceive generic descriptions as surprisingly accurate and personal when we're told they were crafted specifically for us. It isn't a sign of naivety — it's a common cognitive shortcut, tied to how the mind searches for coherence and confirmation in what it hears.

## A practical defence checklist

- Ask yourself: would this statement also be true for most people I know?
- Notice how much information you yourself supplied, without realising it, earlier in the conversation.
- Be wary of anyone who quickly corrects a wrong statement without acknowledging the miss.
- Remember that confidence in tone of voice is not evidence of accuracy.

Knowing these mechanics doesn't take anything away from the pleasure of watching a fictional character use them skilfully — if anything, it makes them more interesting to spot on screen, and it's a useful defence in real life.`,
    },
  },
  {
    slug: "principi-di-persuasione",
    category: "psicologia",
    publishedAt: "2026-03-09",
    tags: ["persuasione", "reciprocità", "framing", "ancoraggio"],
    it: {
      title: "Persuasione: reciprocità, framing e ancoraggio nella vita reale",
      description:
        "Tre principi psicologici della persuasione — reciprocità, framing e ancoraggio — spiegati con esempi pratici di uso quotidiano.",
      body: `La persuasione non è manipolazione nel senso negativo del termine, per definizione — è l'arte di presentare informazioni vere in modo che vengano recepite e valutate correttamente. Conoscerne i meccanismi principali serve tanto a comunicare meglio quanto a riconoscere quando vengono usati su di te in modo scorretto.

## Reciprocità

Le persone tendono a sentirsi in dovere di ricambiare un favore, anche piccolo. È uno dei principi di persuasione più documentati e più usati (a volte in modo scorretto) nel marketing — il campione gratuito, il piccolo omaggio prima della richiesta. Usato onestamente, funziona anche nelle relazioni ordinarie: offrire aiuto concreto prima di chiedere qualcosa costruisce una base di collaborazione molto più solida di una richiesta diretta e isolata.

## Framing

Lo stesso identico fatto, presentato con parole diverse, viene percepito in modo diverso. "Un intervento con il 90% di successo" e "un intervento con il 10% di fallimento" descrivono lo stesso numero, ma la prima formulazione viene sistematicamente percepita come più rassicurante. Il framing non cambia i fatti — cambia la cornice attraverso cui vengono valutati. Usarlo in modo onesto significa scegliere la cornice più utile e accurata per far capire qualcosa, non quella più ingannevole per nascondere qualcosa.

## Ancoraggio

La prima cifra o informazione che una persona incontra diventa un punto di riferimento (un'"ancora") che influenza tutte le valutazioni successive, anche quando quel primo numero è arbitrario. È il motivo per cui, in una trattativa, la prima offerta tende a spostare l'intero intervallo della negoziazione verso di sé — chi fa la prima proposta, spesso, ha un vantaggio strutturale.

## Un uso responsabile

Questi tre principi condividono una caratteristica: funzionano indipendentemente dal fatto che chi li usa abbia intenzioni buone o cattive, perché sfruttano scorciatoie cognitive comuni a tutti. La differenza tra persuasione onesta e manipolazione non sta nella tecnica in sé, ma nella trasparenza dell'obiettivo e nella veridicità di ciò che viene comunicato: usare il framing per spiegare meglio un dato reale è comunicazione efficace; usarlo per far apparire vero qualcosa di falso è manipolazione, con o senza tecnica raffinata.

Conoscere questi meccanismi — che si tratti di un venditore, di un collega o di un personaggio di finzione particolarmente convincente — è il primo passo per valutare un'affermazione per il suo contenuto, e non solo per il modo in cui viene confezionata.`,
    },
    en: {
      title: "Persuasion: reciprocity, framing and anchoring in real life",
      description:
        "Three psychological principles of persuasion — reciprocity, framing and anchoring — explained with practical, everyday examples.",
      body: `Persuasion isn't manipulation in the negative sense, by definition — it's the art of presenting true information so it gets received and evaluated correctly. Knowing its main mechanics helps you communicate better as much as it helps you recognise when they're being used on you unfairly.

## Reciprocity

People tend to feel obligated to return a favour, even a small one. It's one of the most documented persuasion principles, and one of the most used (sometimes unfairly) in marketing — the free sample, the small gift before the ask. Used honestly, it also works in ordinary relationships: offering concrete help before asking for something builds a far sturdier basis for cooperation than an isolated, direct request.

## Framing

The exact same fact, presented in different words, gets perceived differently. "A procedure with a 90% success rate" and "a procedure with a 10% failure rate" describe the same number, but the first phrasing is consistently perceived as more reassuring. Framing doesn't change the facts — it changes the frame through which they're evaluated. Using it honestly means choosing the most useful and accurate frame to help someone understand something, not the most misleading one to hide something.

## Anchoring

The first number or piece of information a person encounters becomes a reference point (an "anchor") that shapes every subsequent judgment, even when that first number is arbitrary. It's why, in a negotiation, the first offer tends to pull the entire range of the negotiation toward itself — whoever makes the first proposal often holds a structural advantage.

## Responsible use

These three principles share one trait: they work regardless of whether the person using them has good or bad intentions, because they exploit cognitive shortcuts common to everyone. The difference between honest persuasion and manipulation isn't in the technique itself, but in the transparency of the goal and the truthfulness of what's being communicated: using framing to better explain a real figure is effective communication; using it to make something false look true is manipulation, polished technique or not.

Knowing these mechanics — whether you're dealing with a salesperson, a colleague, or a particularly convincing fictional character — is the first step toward evaluating a claim on its content, not just on how it's packaged.`,
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles
    .filter((a) => a.category === category)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getAllArticlesSorted(): Article[] {
  return [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Up to `limit` other articles, same category first, most recent first. */
export function getRelatedArticles(current: Article, limit = 3): Article[] {
  const rest = articles.filter((a) => a.slug !== current.slug);
  rest.sort((a, b) => {
    const sameCategoryA = a.category === current.category ? 0 : 1;
    const sameCategoryB = b.category === current.category ? 0 : 1;
    if (sameCategoryA !== sameCategoryB) return sameCategoryA - sameCategoryB;
    return a.publishedAt < b.publishedAt ? 1 : -1;
  });
  return rest.slice(0, limit);
}
