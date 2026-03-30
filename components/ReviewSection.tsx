"use client";

import ReviewList from "@/components/ReviewList";
import { useLang } from "@/components/LanguageProvider";
import { usePurchases } from "@/lib/usePurchases";

export default function ReviewSection({ templateId }: { templateId: string }) {
  const { lang } = useLang();
  const { purchasedIds } = usePurchases();
  return <ReviewList templateId={templateId} purchasedIds={purchasedIds} lang={lang} />;
}
