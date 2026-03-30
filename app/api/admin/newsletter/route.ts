import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/lib/email";

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export async function GET() {
  if (!ADMIN_USER_ID) {
    console.error("[admin/newsletter] ADMIN_USER_ID env var is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const { userId } = await auth();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { count, error } = await supabase
    .from("subscribers")
    .select("*", { count: "exact", head: true });

  if (error) return NextResponse.json({ error: "DB error" }, { status: 500 });
  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(req: NextRequest) {
  if (!ADMIN_USER_ID) {
    console.error("[admin/newsletter] ADMIN_USER_ID env var is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const { userId } = await auth();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subject, title, body } = await req.json().catch(() => ({}));
  if (!subject || !title || !body) {
    return NextResponse.json({ error: "subject, title e body sono obbligatori" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await supabase.from("subscribers").select("email");
  if (error) return NextResponse.json({ error: "DB error" }, { status: 500 });

  const emails = (data ?? []).map((r: { email: string }) => r.email);
  if (emails.length === 0) {
    return NextResponse.json({ sent: 0, errors: 0, message: "Nessun subscriber" });
  }

  const result = await sendNewsletterEmail(emails, subject, title, body);
  return NextResponse.json({ ...result, total: emails.length });
}
