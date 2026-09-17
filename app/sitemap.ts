import { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { LOCALES } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acume.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    entries.push(
      {
        url: `${SITE_URL}/${lang}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/${lang}/articoli`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/${lang}/chi-siamo`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      ...articles.map((a) => ({
        url: `${SITE_URL}/${lang}/articoli/${a.slug}`,
        lastModified: new Date(a.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    );
  }

  return entries;
}
