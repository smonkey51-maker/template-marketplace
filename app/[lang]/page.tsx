import { redirect } from "next/navigation";
import { toLocale } from "@/lib/locales";

/** The site is two pages; the home path goes straight to the first. */
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);
  redirect(`/${lang}/test`);
}
