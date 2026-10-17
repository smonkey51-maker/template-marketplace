"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6 py-16">
      <div className="max-w-md">
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
          404
        </p>
        <h1 className="mt-2 text-[1.75rem]">{t("notFoundTitle")}</h1>
        <p className="mt-3 text-muted">{t("notFoundSub")}</p>
        <Link href={`/${lang}/test`} className="btn btn-primary mt-6">
          {t("notFoundCta")}
        </Link>
      </div>
    </div>
  );
}
