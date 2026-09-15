import type { Metadata } from "next";
import Homepage from "@/components/Homepage";
import { toLocale } from "@/lib/locales";

const META = {
  it: { title: "FORMA — Arte in tasca.", description: "Collezioni digitali curate e strumenti per renderle tue." },
  en: { title: "FORMA — Art in your pocket.", description: "Curated digital collections and tools to make them yours." },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const m = META[lang];
  const ogImage = `/api/og?lang=${lang}`;
  return { title: { absolute: m.title }, description: m.description, openGraph: { title: m.title, description: m.description, type: "website", images: [{ url: ogImage, width: 1200, height: 630, alt: "FORMA" }] }, twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [ogImage] } };
}

export default function Page() { return <Homepage />; }
