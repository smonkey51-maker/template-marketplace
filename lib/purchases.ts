import { supabaseAdmin } from "@/lib/supabaseAdmin";

export function hasStudioAccess(purchasedIds: string[]): boolean {
  return purchasedIds.includes("studio-access") || purchasedIds.includes("studio-access-lifetime");
}

export function isStudioProduct(templateId: string): boolean {
  return templateId === "studio-access" || templateId === "studio-access-lifetime";
}

export async function getUserPurchases(userId: string): Promise<string[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("purchases")
    .select("template_id")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data.map((row) => row.template_id);
}
