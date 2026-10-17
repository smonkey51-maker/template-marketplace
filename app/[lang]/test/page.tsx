import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import SiteNav from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import TestBase from "@/components/TestBase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return pageMeta(lang, "/test", `${copy[lang].testTitle} — Sandbox`, copy[lang].testSub);
}

export default async function TestPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <PageHeader
        crumbs={[{ label: t("siteName") }, { label: t("testTitle") }]}
        kicker={t("testKicker")}
        title={t("testTitle")}
        subtitle={t("testSub")}
      />
      <main className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <TestBase lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}
