/**
 * The canonical, server-trusted base URL of the site.
 *
 * Deliberately does NOT read the request's `Origin` / `Referer` headers:
 * those are attacker-controlled, and feeding them into Stripe's
 * `success_url` / `cancel_url` turns checkout into an open redirect.
 */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    "http://localhost:3000";

  // Strip any trailing slash so callers can always do `${siteUrl()}/path`
  return raw.replace(/\/+$/, "");
}
