import { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandbox.example.com";

// /rickrolled is deliberately left out (it is noindex).
const PATHS = ["/test", "/test-ma-di-piu"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((lang) =>
    PATHS.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/test" ? 1 : 0.6,
    })),
  );
}
