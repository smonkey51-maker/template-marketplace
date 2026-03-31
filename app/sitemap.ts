import { MetadataRoute } from "next";
import { templates, bundles } from "@/lib/templates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export default function sitemap(): MetadataRoute.Sitemap {
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
