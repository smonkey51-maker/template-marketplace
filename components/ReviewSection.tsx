"use client";

import { useState, useEffect } from "react";
import ReviewList from "@/components/ReviewList";
import { useLang } from "@/components/LanguageProvider";

export default function ReviewSection({ templateId }: { templateId: string }) {
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.json())
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch((e) => console.error("[ReviewSection]", e));
  }, []);

  return <ReviewList templateId={templateId} purchasedIds={purchasedIds} lang={lang} />;
}
