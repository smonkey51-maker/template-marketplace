/**
 * Monthly AI call limits per plan.
 * Single source of truth — imported by lib/aiPermissions.ts (enforcement)
 * and app/api/ai-usage/route.ts (the usage banner in the Studio).
 */
export const AI_LIMITS = {
  free: { generate: 5, customize: 10 },
  studio: { generate: 100, customize: 200 },
} as const;

export type AIPlan = keyof typeof AI_LIMITS;
export type AIFeature = keyof (typeof AI_LIMITS)["free"];

/** First instant of the current calendar month, as an ISO string. */
export function startOfMonthISO(): string {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
