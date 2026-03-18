import { MetadataRoute } from "next";
import { templates } from "@/lib/templates";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templatelab.io";
const LAST_UPDATED = new Date("2026-03-18");

export default function sitemap(): MetadataRoute.Sitemap {
  const templateEntries: MetadataRoute.Sitemap = templates.map((tmpl) => ({
    url: `${BASE_URL}/preview/${tmpl.id}`,
    lastModified: tmpl.isNew ? LAST_UPDATED : new Date("2026-01-01"),
    changeFrequency: "monthly",
    priority: tmpl.editorsPick ? 0.9 : 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/guide`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.3 },
    ...templateEntries,
  ];
}
