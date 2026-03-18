import { MetadataRoute } from "next";
import { templates } from "@/lib/templates";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templatelab.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const templateEntries: MetadataRoute.Sitemap = templates.map((tmpl) => ({
    url: `${BASE_URL}/preview/${tmpl.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/studio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...templateEntries,
  ];
}
