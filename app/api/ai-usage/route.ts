import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getUserPurchases, hasStudioAccess } from "@/lib/purchases";
import { AI_LIMITS, startOfMonthISO } from "@/lib/aiLimits";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [purchases, { data: rows }] = await Promise.all([
    getUserPurchases(userId),
    supabaseAdmin()
      .from("ai_usage")
      .select("feature, cost_usd")
      .eq("user_id", userId)
      .gte("created_at", startOfMonthISO()),
  ]);

  const plan = hasStudioAccess(purchases) ? "studio" : "free";
  const limits = AI_LIMITS[plan];

  const generateCalls = rows?.filter((r) => r.feature === "generate").length ?? 0;
  const customizeCalls = rows?.filter((r) => r.feature === "customize").length ?? 0;
  const totalCost = rows?.reduce((s, r) => s + Number(r.cost_usd), 0) ?? 0;

  return NextResponse.json({
    plan,
    generate: { used: generateCalls, limit: limits.generate },
    customize: { used: customizeCalls, limit: limits.customize },
    cost_usd: totalCost,
  });
}
