"use client";

import { useEffect } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="glass max-w-md p-8">
        <h1 className="text-[1.75rem]">{t("errorTitle")}</h1>
        <p className="mt-3 text-muted">{t("errorSub")}</p>
        <div className="mt-6 flex gap-3">
          <button onClick={reset} className="btn btn-primary">
            {t("errorRetry")}
          </button>
          <a href={`/${lang}/test`} className="btn btn-outline">
            {t("errorHome")}
          </a>
        </div>
      </div>
    </div>
  );
}
