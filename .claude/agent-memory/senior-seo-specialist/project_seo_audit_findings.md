---
name: TemplateLab SEO audit findings — March 2026
description: Summary of all SEO gaps identified during the first audit of templatelab.io — used to track what has and has not been fixed
type: project
---

Audit performed on 2026-03-18. No fixes applied yet. Key gaps found:

1. No metadataBase in layout.tsx — OG/Twitter image URLs are relative, will break social cards.
2. No robots.ts — no robots.txt is being generated; /studio, /account, /success, /sign-in, /sign-up, /api/* should be noindex.
3. No JSON-LD structured data anywhere (no Product, WebSite, BreadcrumbList, or ItemList schemas).
4. Global metadata in layout.tsx has no OG tags, no Twitter card, no canonical/alternates.
5. Homepage metadata (app/page.tsx) is Italian-only despite site being bilingual.
6. Preview pages missing canonical URL and alternates (hreflang IT/EN).
7. Sitemap missing: /privacy, /terms, /guide (priority too low at 0.6 vs its importance), and lastModified uses new Date() (always today — wastes crawl budget signaling).
8. guide/page.tsx and studio/page.tsx are "use client" — metadata export on guide page is missing entirely; studio page has no metadata.
9. Heading hierarchy issue: guide page uses h2 for section sub-headings but skips a proper document-level structure; "sectionTypes" label is a <p> not an <h2>.
10. No hreflang implementation despite bilingual content (IT/EN language toggle exists client-side but no server-side alternate URLs).
11. TemplateCard iframe previews load on intersection — good for performance, but iframes are not crawlable; template content is invisible to Googlebot.
12. No favicon/apple-touch-icon declared in metadata.
13. Default OG image text in api/og/route.tsx is Italian ("personalizzati con AI") — English social shares get Italian text.
14. /account, /success, /sign-in, /sign-up pages have no robots: noindex directive.
15. No WebSite schema with SearchAction on homepage (missed sitelinks searchbox opportunity).

**How to apply:** When the user asks to fix SEO issues, refer to this list and mark items as resolved.
