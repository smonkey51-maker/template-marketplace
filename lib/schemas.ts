import { z } from "zod";

// ── /api/generate ─────────────────────────────────────────────────────────────
export const generateSchema = z.object({
  category: z.enum(["ui", "prompt"]),
  description: z.string().min(1, "Description is required").max(2000).trim(),
  style: z.string().max(50).optional(),
  templateId: z.string().max(100).optional(),
});

export type GenerateInput = z.infer<typeof generateSchema>;

// ── /api/customize ────────────────────────────────────────────────────────────
export const customizeSchema = z.object({
  templateContent: z.string().min(1, "Template content is required").max(50_000).trim(),
  category: z.enum(["ui", "prompt"]),
  instructions: z.string().min(1, "Instructions are required").max(2000).trim(),
  templateId: z.string().max(100).optional(),
});

export type CustomizeInput = z.infer<typeof customizeSchema>;

// ── /api/checkout ─────────────────────────────────────────────────────────────
export const checkoutSchema = z
  .object({
    templateId: z.string().max(100).optional(),
    bundleId: z.string().max(100).optional(),
  })
  .refine((data) => data.templateId || data.bundleId, {
    message: "templateId or bundleId is required",
  });

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// ── /api/reviews ──────────────────────────────────────────────────────────────
export const reviewSchema = z.object({
  templateId: z.string().min(1).max(100),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

// ── /api/wishlist ─────────────────────────────────────────────────────────────
export const wishlistSchema = z.object({
  templateId: z.string().min(1).max(100),
});

export type WishlistInput = z.infer<typeof wishlistSchema>;

// ── /api/preferences ──────────────────────────────────────────────────────────
// These strings are injected verbatim into the Claude system prompt, so they are
// capped hard: an unbounded field is both a prompt-injection surface and an
// unbounded bill.
const pref = z.string().trim().max(300).optional();

export const preferencesSchema = z.object({
  brand_tone: pref,
  preferred_style: pref,
  color_notes: pref,
  extra_context: z.string().trim().max(1000).optional(),
});

export type PreferencesInput = z.infer<typeof preferencesSchema>;

// ── /api/subscribe ────────────────────────────────────────────────────────────
export const subscribeSchema = z.object({
  email: z.email("Invalid email").max(254).trim().toLowerCase(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
