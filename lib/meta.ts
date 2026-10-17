import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/** Title, description and canonical URL for a route. The title is suffixed with the site name. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title: `${title} — ${SITE.name}`,
    description,
    alternates: { canonical: path || "/" },
  };
}
