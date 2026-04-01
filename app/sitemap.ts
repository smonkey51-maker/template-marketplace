import { MetadataRoute } from "next";
import { getAllTemplates, getAllBundles } from "@/lib/templatesDb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [templates, bundles] = await Promise.all([getAllTemplates(), getAllBundles()]);

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/studio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...bundles.map((b) => ({
      url: `${SITE_URL}/bundle/${b.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...templates.map((t) => ({
      url: `${SITE_URL}/preview/${t.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
