import type { Metadata } from "next";
import Homepage from "@/components/Homepage";
import { toLocale } from "@/lib/locales";

// The taglines match lib/formaCopy.ts `heroTagline` / `heroSubSnap`, so the tab
// and the link preview say the same thing as the headline the visitor lands on.
// The title is spelled in full here rather than relying on the layout's
// "%s — FORMA" template, because the brand belongs at the front on the home
// page — hence `title.absolute`, which opts this one page out of the template
// instead of letting it append a second "— FORMA".
const META = {
  it: {
    title: "FORMA — Arte in tasca.",
    description:
      "Template, prompt e strumenti per chi crea: prompt AI, guide, fogli di calcolo e tracker pronti all'uso. Ogni file è un gesto preciso, non una soluzione generica.",
    ogDescription: "Ogni file è un gesto preciso, non una soluzione generica.",
  },
  en: {
    title: "FORMA — Art in your pocket.",
    description:
      "Templates, prompts and tools for creators: AI prompts, guides, spreadsheets and trackers, ready to use. Every file is a precise gesture, not a generic solution.",
    ogDescription: "Every file is a precise gesture, not a generic solution.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const m = META[lang];
  const ogImage = `/api/og?lang=${lang}`;
  return {
    title: { absolute: m.title },
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "FORMA" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.ogDescription,
      images: [ogImage],
    },
  };
}

export default function Page() {
  return <Homepage />;
}
