"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Template, formatPrice } from "@/lib/templates";

const categoryColors: Record<string, string> = {
  ui: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  prompt: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

const categoryLabels: Record<string, string> = {
  ui: "UI Template",
  prompt: "Prompt Template",
};

export default function TemplateCard({ template }: { template: Template }) {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!isSignedIn) {
      // Clerk's middleware reindirizzerà al login se necessario
      window.location.href = "/sign-in";
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Preview area */}
      <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-b border-white/5 overflow-hidden px-4">
        <code className="text-xs text-gray-500 font-mono line-clamp-6 leading-relaxed">
          {template.content.slice(0, 200)}...
        </code>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
              categoryColors[template.category]
            }`}
          >
            {categoryLabels[template.category]}
          </span>
          <span className="text-xs text-gray-500">
            {template.downloads.toLocaleString()} downloads
          </span>
        </div>

        <h3 className="font-semibold text-white mt-1 mb-1 group-hover:text-violet-300 transition-colors">
          {template.name}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed flex-1">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
          <span className="text-lg font-bold text-white">
            {formatPrice(template.price)}
          </span>
          <div className="flex gap-2 ml-auto">
            <Link
              href={`/studio?templateId=${template.id}`}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
            >
              Customize
            </Link>
            <button
              onClick={handleBuy}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white transition"
            >
              {loading ? "..." : "Buy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
