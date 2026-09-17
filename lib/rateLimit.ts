const store = new Map<string, number[]>();

/**
 * Simple in-memory sliding-window rate limiter.
 * Returns true if the request is allowed, false if it exceeds the limit.
 *
 * LIMITATION: State is stored in-memory per server instance.
 * - Resets on every server restart / cold start (e.g. Vercel Serverless).
 * - Not shared across multiple instances in a scaled deployment.
 *
 * That tradeoff is accepted here: the only endpoint using it is the
 * newsletter signup (`/api/subscribe`), which sees low, non-adversarial
 * traffic. A distributed store would be overkill for this site.
 *
 * Current limit (configured in app/api/subscribe/route.ts):
 *   - /api/subscribe: 5 requests / 60 s per IP
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) return false;
  timestamps.push(now);
  store.set(key, timestamps);
  return true;
}
