import { MetadataRoute } from "next";
import { SITE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // While the site is a draft, ask crawlers to stay away entirely.
    rules: SITE.draft
      ? { userAgent: "*", disallow: "/" }
      : {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/test", "/test-ma-di-piu", "/rickrolled"],
        },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
