import { createClient } from "@supabase/supabase-js";

// Prezzi claude-opus-4-6 (USD per milione di token)
const PRICING: Record<string, { input: number; output: number }> = {
  "claude-opus-4-6":    { input: 15.0, output: 75.0 },
  "claude-sonnet-4-6":  { input: 3.0,  output: 15.0 },
  "claude-haiku-4-5-20251001": { input: 0.8,  output: 4.0 },
};

export function calcCostUSD(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const price = PRICING[model] ?? PRICING["claude-opus-4-6"];
  return (
    (inputTokens  / 1_000_000) * price.input +
    (outputTokens / 1_000_000) * price.output
  );
}

export async function recordAIUsage({
  userId,
  feature,
  model,
  inputTokens,
  outputTokens,
  templateId,
}: {
  userId: string;
  feature: "generate" | "customize";
  model: string;
  inputTokens: number;
  outputTokens: number;
  templateId?: string;
}): Promise<void> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const cost_usd = calcCostUSD(model, inputTokens, outputTokens);

  await supabase.from("ai_usage").insert({
    user_id: userId,
    feature,
    model,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    cost_usd,
    template_id: templateId ?? null,
  });
}

export async function getMonthlyUsage(
  userId: string
): Promise<{ calls: number; cost_usd: number }> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("ai_usage")
    .select("cost_usd")
    .eq("user_id", userId)
    .gte("created_at", startOfMonth.toISOString());

  if (error || !data) return { calls: 0, cost_usd: 0 };

  return {
    calls: data.length,
    cost_usd: data.reduce((sum, row) => sum + Number(row.cost_usd), 0),
  };
}
