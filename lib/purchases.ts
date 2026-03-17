import { createClient } from "@supabase/supabase-js";

export async function getUserPurchases(userId: string): Promise<string[]> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await supabase
    .from("purchases")
    .select("template_id")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data.map((row) => row.template_id);
}
