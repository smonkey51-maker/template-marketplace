import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { startOfMonthISO } from "@/lib/aiLimits";

// USD per million tokens (Anthropic first-party API rates)
const PRICING: Record<string, { input: number; output: number }> = {
  "claude-opus-5": { input: 5.0, output: 25.0 },
  "claude-sonnet-5": { input: 3.0, output: 15.0 },
  "claude-haiku-4-5": { input: 1.0, output: 5.0 },
};

const DEFAULT_MODEL = "claude-opus-5";

export function calcCostUSD(model: string, inputTokens: number, outputTokens: number): number {
  const price = PRICING[model] ?? PRICING[DEFAULT_MODEL];
  return (inputTokens / 1_000_000) * price.input + (outputTokens / 1_000_000) * price.output;
}

/**
 * Reserve a usage slot BEFORE the model call starts.
 *
 * The monthly quota is enforced by counting rows in `ai_usage`. If we only
 * inserted the row after the stream finished, N concurrent requests would all
 * pass the quota check against the same stale count and blow past the limit.
 * Reserving first makes the count authoritative; `finalizeAIUsage` fills in the
 * real token numbers once the stream completes.
 */
export async function reserveAIUsage({
  userId,
  feature,
  model,
  templateId,
}: {
  userId: string;
  feature: "generate" | "customize";
  model: string;
  templateId?: string;
}): Promise<string | null> {
  const { data, error } = await supabaseAdmin()
    .from("ai_usage")
    .insert({
      user_id: userId,
      feature,
      model,
      input_tokens: 0,
      output_tokens: 0,
      cost_usd: 0,
      template_id: templateId ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[reserveAIUsage]", error);
    return null;
  }
  return data.id as string;
}

/** Fill in the real token counts on a previously reserved row. */
export async function finalizeAIUsage({
  id,
  model,
  inputTokens,
  outputTokens,
}: {
  id: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}): Promise<void> {
  const { error } = await supabaseAdmin()
    .from("ai_usage")
    .update({
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd: calcCostUSD(model, inputTokens, outputTokens),
    })
    .eq("id", id);

  if (error) console.error("[finalizeAIUsage]", error);
}

/** Release a reservation when the call failed before producing any output. */
export async function releaseAIUsage(id: string): Promise<void> {
  const { error } = await supabaseAdmin().from("ai_usage").delete().eq("id", id);
  if (error) console.error("[releaseAIUsage]", error);
}

export async function getMonthlyUsage(
  userId: string,
): Promise<{ calls: number; cost_usd: number }> {
  const { data, error } = await supabaseAdmin()
    .from("ai_usage")
    .select("cost_usd")
    .eq("user_id", userId)
    .gte("created_at", startOfMonthISO());

  if (error || !data) return { calls: 0, cost_usd: 0 };

  return {
    calls: data.length,
    cost_usd: data.reduce((sum, row) => sum + Number(row.cost_usd), 0),
  };
}
