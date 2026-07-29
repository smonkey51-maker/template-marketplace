import { getUserPurchases, hasStudioAccess } from "@/lib/purchases";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AI_LIMITS, startOfMonthISO, type AIFeature, type AIPlan } from "@/lib/aiLimits";

export type { AIFeature } from "@/lib/aiLimits";

export type PermissionResult =
  { allowed: true; plan: AIPlan } | { allowed: false; reason: string; plan: AIPlan };

export async function checkAIPermission(
  userId: string,
  feature: AIFeature,
): Promise<PermissionResult> {
  const [purchases, calls] = await Promise.all([
    getUserPurchases(userId),
    getFeatureCalls(userId, feature),
  ]);

  const plan: AIPlan = hasStudioAccess(purchases) ? "studio" : "free";
  const limit = AI_LIMITS[plan][feature];

  if (calls >= limit) {
    return {
      allowed: false,
      plan,
      reason:
        plan === "free"
          ? `Hai raggiunto il limite di ${limit} ${feature === "generate" ? "generazioni" : "personalizzazioni"} mensili nel piano free. Passa a Studio per più accesso.`
          : `Hai raggiunto il limite mensile di ${limit} chiamate per il piano Studio.`,
    };
  }

  return { allowed: true, plan };
}

/** Calls made by this user, for this feature, in the current calendar month. */
async function getFeatureCalls(userId: string, feature: AIFeature): Promise<number> {
  const { count } = await supabaseAdmin()
    .from("ai_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("feature", feature)
    .gte("created_at", startOfMonthISO());

  return count ?? 0;
}
