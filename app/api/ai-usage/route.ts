import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { getUserPurchases, hasStudioAccess } from "@/lib/purchases";

const LIMITS = {
  free:   { generate: 5,   customize: 10  },
  studio: { generate: 100, customize: 200 },
} as const;

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [purchases, { data: rows }] = await Promise.all([
    getUserPurchases(userId),
    supabase
      .from("ai_usage")
      .select("feature, cost_usd")
      .eq("user_id", userId)
      .gte("created_at", startOfMonth.toISOString()),
  ]);

  const plan = hasStudioAccess(purchases) ? "studio" : "free";
  const limits = LIMITS[plan];

  const generateCalls = rows?.filter((r) => r.feature === "generate").length ?? 0;
  const customizeCalls = rows?.filter((r) => r.feature === "customize").length ?? 0;
  const totalCost = rows?.reduce((s, r) => s + Number(r.cost_usd), 0) ?? 0;

  return NextResponse.json({
    plan,
    generate:  { used: generateCalls,  limit: limits.generate  },
    customize: { used: customizeCalls, limit: limits.customize },
    cost_usd:  totalCost,
  });
}
