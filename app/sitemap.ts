import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// The test pages are internal and noindex, so they are left out.
const PATHS = ["", "/servizi", "/metodo", "/chi-siamo", "/contatti", "/area-riservata", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
