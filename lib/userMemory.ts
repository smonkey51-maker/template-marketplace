import { createClient } from "@supabase/supabase-js";

export interface UserPreferences {
  brand_tone?: string;
  preferred_style?: string;
  color_notes?: string;
  extra_context?: string;
}

export async function getUserPreferences(
  userId: string
): Promise<UserPreferences> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("user_preferences")
    .select("brand_tone, preferred_style, color_notes, extra_context")
    .eq("user_id", userId)
    .single();

  return data ?? {};
}

export async function saveUserPreferences(
  userId: string,
  prefs: Partial<UserPreferences>
): Promise<void> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase.from("user_preferences").upsert(
    { user_id: userId, ...prefs, updated_at: new Date().toISOString() },
    { onConflict: "user_id" }
  );
}

// Costruisce il blocco di memoria da iniettare nel system prompt
export function buildMemoryContext(prefs: UserPreferences): string {
  const lines: string[] = [];

  if (prefs.brand_tone)
    lines.push(`Brand tone: ${prefs.brand_tone}`);
  if (prefs.preferred_style)
    lines.push(`Preferred style: ${prefs.preferred_style}`);
  if (prefs.color_notes)
    lines.push(`Color preferences: ${prefs.color_notes}`);
  if (prefs.extra_context)
    lines.push(`Additional context: ${prefs.extra_context}`);

  if (lines.length === 0) return "";

  return `\n\nUSER BRAND MEMORY (apply these preferences):\n${lines.join("\n")}`;
}
