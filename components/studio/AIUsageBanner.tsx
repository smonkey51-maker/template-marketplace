"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface UsageData {
  plan: "free" | "studio";
  generate: { used: number; limit: number };
  customize: { used: number; limit: number };
  cost_usd: number;
}

function UsageBar({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min((used / limit) * 100, 100);
  const isNearLimit = pct >= 80;
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden min-w-[40px]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isNearLimit ? "bg-terra" : "bg-accent"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={`text-[11px] tabular-nums shrink-0 ${isNearLimit ? "text-terra" : "text-muted"}`}
      >
        {used}/{limit}
      </span>
    </div>
  );
}

export default function AIUsageBanner() {
  const [data, setData] = useState<UsageData | null>(null);

  useEffect(() => {
    fetch("/api/ai-usage")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`/api/ai-usage ${r.status}`))))
      .then(setData)
      .catch(() => null);
  }, []);

  if (!data) return null;

  const isStudio = data.plan === "studio";

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-3 py-2 bg-surface border border-theme/30 text-[12px]">
      {/* Plan badge */}
      <span
        className={`font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 ${
          isStudio ? "bg-accent/15 text-accent" : "bg-surface text-muted border border-theme/30"
        }`}
      >
        {isStudio ? "Studio" : "Free"}
      </span>

      {/* Generate usage */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-muted shrink-0">Generate</span>
        <UsageBar used={data.generate.used} limit={data.generate.limit} />
      </div>

      {/* Customize usage */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-muted shrink-0">Customize</span>
        <UsageBar used={data.customize.used} limit={data.customize.limit} />
      </div>

      {/* Upgrade CTA — solo free */}
      {!isStudio && (
        <Link
          href="/bundle/studio-access"
          className="ml-auto text-[11px] text-accent underline underline-offset-2 hover:text-accent/80 transition-colors shrink-0"
        >
          Upgrade to Studio →
        </Link>
      )}
    </div>
  );
}
