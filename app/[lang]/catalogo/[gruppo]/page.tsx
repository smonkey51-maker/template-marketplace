import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CatalogoCategoryContent from "../CatalogoCategoryContent";
import { getFormatTile } from "@/lib/catalogFormats";
import { toLocale } from "@/lib/locales";

const VALID_GROUPS = ["prompt", "guide", "sheet"] as const;
type ValidGroup = (typeof VALID_GROUPS)[number];

function isValidGroup(g: string): g is ValidGroup {
  return (VALID_GROUPS as readonly string[]).includes(g);
}

export function generateStaticParams() {
  return VALID_GROUPS.flatMap((gruppo) => [
    { lang: "it", gruppo },
    { lang: "en", gruppo },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; gruppo: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, gruppo } = await params;
  if (!isValidGroup(gruppo)) return {};
  const lang = toLocale(rawLang);
  const tile = getFormatTile(gruppo);
  const label = lang === "it" ? tile.it : tile.en;

  return {
    title: label.title,
    description: label.desc,
  };
}

export default async function CatalogoGroupPage({
  params,
}: {
  params: Promise<{ gruppo: string }>;
}) {
  const { gruppo } = await params;
  if (!isValidGroup(gruppo)) notFound();

  return <CatalogoCategoryContent group={gruppo} />;
}
