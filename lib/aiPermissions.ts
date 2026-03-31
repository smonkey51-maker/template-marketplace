import { getUserPurchases, hasStudioAccess } from "@/lib/purchases";
import { getMonthlyUsage } from "@/lib/aiCost";

// Limiti mensili per piano
// - free:    5 generate + 10 customize
// - studio:  100 generate + 200 customize (acquisto studio-access)
const LIMITS = {
  free:   { generate: 5,   customize: 10  },
  studio: { generate: 100, customize: 200 },
} as const;

export type AIFeature = "generate" | "customize";

export type PermissionResult =
  | { allowed: true; plan: "free" | "studio" }
  | { allowed: false; reason: string; plan: "free" | "studio" };

export async function checkAIPermission(
  userId: string,
  feature: AIFeature
): Promise<PermissionResult> {
  const [purchases, usage] = await Promise.all([
    getUserPurchases(userId),
    getMonthlyUsage(userId),
  ]);

  const plan: "free" | "studio" = hasStudioAccess(purchases) ? "studio" : "free";
  const limit = LIMITS[plan][feature];

  // Conta solo le chiamate per questa feature nel mese corrente
  const { calls } = await getFeatureCalls(userId, feature);

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

async function getFeatureCalls(
  userId: string,
  feature: AIFeature
): Promise<{ calls: number }> {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("ai_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("feature", feature)
    .gte("created_at", startOfMonth.toISOString());

  return { calls: count ?? 0 };
}
