const store = new Map<string, number[]>();

/**
 * Simple in-memory sliding-window rate limiter.
 * Returns true if the request is allowed, false if it exceeds the limit.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const timestamps = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) return false;
  timestamps.push(now);
  store.set(key, timestamps);
  return true;
}
