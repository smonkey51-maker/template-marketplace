import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getBundleFromDb, getTemplateFromDb } from "@/lib/templatesDb";
import { getBundle as getBundleLocal, getTemplate as getTemplateLocal } from "@/lib/templates";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { bundleId, templateId } = await req.json();

  const supabase = supabaseAdmin();

  if (bundleId) {
    const bundle = (await getBundleFromDb(bundleId).catch(() => null)) ?? getBundleLocal(bundleId);
    if (!bundle || bundle.price !== 0) {
      return NextResponse.json({ error: "Bundle not found or not free" }, { status: 400 });
    }

    // Skip already-recorded entries to avoid duplicates
    const { data: existing } = await supabase
      .from("purchases")
      .select("template_id")
      .eq("user_id", userId)
      .in("template_id", bundle.templateIds);

    const alreadyOwned = new Set(
      (existing ?? []).map((r: { template_id: string }) => r.template_id),
    );
    const toInsert = bundle.templateIds
      .filter((tid) => !alreadyOwned.has(tid))
      .map((tid) => ({
        user_id: userId,
        template_id: tid,
        stripe_session_id: `free:${bundleId}`,
      }));

    if (toInsert.length > 0) {
      const { error } = await supabase.from("purchases").insert(toInsert);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, recorded: toInsert.length });
  }

  if (templateId) {
    const template =
      (await getTemplateFromDb(templateId).catch(() => null)) ?? getTemplateLocal(templateId);
    if (!template || template.price !== 0) {
      return NextResponse.json({ error: "Template not found or not free" }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from("purchases")
      .select("template_id")
      .eq("user_id", userId)
      .eq("template_id", templateId)
      .limit(1);

    if (!existing || existing.length === 0) {
      const { error } = await supabase.from("purchases").insert({
        user_id: userId,
        template_id: templateId,
        stripe_session_id: `free:${templateId}`,
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "bundleId or templateId required" }, { status: 400 });
}
