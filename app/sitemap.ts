import { MetadataRoute } from "next";
import { sellableTemplates, sellableBundles } from "@/lib/templates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-marketplace-psi.vercel.app";
const CATALOG_GROUPS = ["prompt", "guide", "sheet"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    {
      url: `${SITE_URL}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    ...CATALOG_GROUPS.map((gruppo) => ({
      url: `${SITE_URL}/catalogo/${gruppo}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...(sellableBundles.length > 0
      ? [
          {
            url: `${SITE_URL}/catalogo/bundle`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.85,
          },
        ]
      : []),
    {
      url: `${SITE_URL}/ai-studio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guida`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/studio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/account`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...sellableTemplates.map((t) => ({
      url: `${SITE_URL}/templates/${t.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
