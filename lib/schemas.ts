import { z } from "zod";

// ── /api/subscribe ────────────────────────────────────────────────────────────
export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Invalid email")),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
