import { templateTranslations } from "@/lib/i18n";

/** Apply basic Italian localisation to an HTML template string. */
export function localiseHtml(html: string, lang: "it" | "en", templateId: string): string {
  if (lang === "en") return html;

  const replacements: [RegExp, string][] = [
    [/\bStart for free\b/g, "Inizia gratis"],
    [/\bGet started\b/g, "Inizia ora"],
    [/\bWatch demo\b/g, "Guarda la demo"],
    [/\bNo credit card required\b/g, "Nessuna carta richiesta"],
    [/\bFree tier available\b/g, "Piano gratuito disponibile"],
    [/\bCancel anytime\b/g, "Disdici quando vuoi"],
    [/\bLearn more\b/g, "Scopri di più"],
    [/\bSign up\b/g, "Registrati"],
    [/\bSign in\b/g, "Accedi"],
    [/\bContact us\b/g, "Contattaci"],
    [/\bSee all\b/g, "Vedi tutti"],
    [/\bView all\b/g, "Vedi tutti"],
    [/\bAdd to cart\b/g, "Aggiungi al carrello"],
    [/\bSave to wishlist\b/g, "Salva nei preferiti"],
    [/\bFree shipping on orders over\b/g, "Spedizione gratuita per ordini superiori a"],
    [/\b30-day free returns\b/g, "30 giorni di reso gratuito"],
    [/\bHandcrafted in Italy\b/g, "Fatto a mano in Italia"],
    [/\bSubscribe to newsletter\b/g, "Iscriviti alla newsletter"],
    [/\bView courses\b/g, "Vedi i corsi"],
    [/\bLatest posts\b/g, "Ultimi post"],
    [/\bRecent videos\b/g, "Video recenti"],
    [/\bActive Sequences\b/g, "Sequenze attive"],
    [/\bActive Workflows\b/g, "Workflow attivi"],
    [/\bNew sequence\b/g, "Nuova sequenza"],
    [/\bNew workflow\b/g, "Nuovo workflow"],
    [/\bSearch conversations\.\.\./g, "Cerca conversazioni..."],
    [/\bMessage Aria\.\.\./g, "Scrivi ad Aria..."],
    [/\bCustomize channel\b/g, "Personalizza il canale"],
    [/\bNew Project\b/g, "Nuovo progetto"],
    [/\bMy Projects\b/g, "I miei progetti"],
    [/\bKnowledge Base\b/g, "Knowledge Base"],
    [/\bSystem Instructions\b/g, "Istruzioni di sistema"],
    [/\bUsage stats\b/g, "Statistiche utilizzo"],
  ];

  let result = html;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

/** Get the display name for a template, using Italian translation when available. */
export function getDisplayName(templateId: string, templateName: string, lang: "it" | "en"): string {
  if (lang === "en") return templateName;
  const tr = templateTranslations[templateId];
  return tr ? tr.name : templateName;
}
