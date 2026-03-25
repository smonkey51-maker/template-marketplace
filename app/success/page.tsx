"use client";

import Link from "next/link";
import { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

const CONFETTI_COLORS = ["#C8A96E", "#9C7733", "#D4B98A", "#6B5528", "#E8D5B0", "#A88445", "#7A6035"];

function Confetti() {
  const pieces = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: 2.8 + Math.random() * 2.2,
      size: 6 + Math.random() * 6,
      isRect: Math.random() > 0.5,
    }))
  ).current;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[200]" aria-hidden>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: -16,
            left: `${p.left}%`,
            width: p.isRect ? p.size : p.size * 0.6,
            height: p.isRect ? p.size * 0.5 : p.size,
            borderRadius: p.isRect ? 2 : "50%",
            background: p.color,
            opacity: 0.9,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards, confetti-sway ${p.duration * 0.7}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId") ?? undefined;
  const sessionId = searchParams.get("session_id") ?? undefined;
  const { isSignedIn } = useUser();
  const { lang } = useLang();

  const isStudioAccess = templateId === "studio-access";
  const template = templateId && !isStudioAccess ? getTemplate(templateId) : null;

  return (
    <div className="relative z-10 bg-surface border border-theme p-8 max-w-sm w-full mx-auto text-center shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
      {/* Top glint */}
      <div className="absolute inset-x-8 top-0 h-px rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />

      {/* Success icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-accent/15 flex items-center justify-center">
          <span className="text-[32px] font-bold" style={{ color: "var(--accent)" }}>✓</span>
        </div>
      </div>

      <h1 className="text-[22px] font-bold mb-3 tracking-tight text-theme" style={{ fontFamily: "var(--font-syne)" }}>{t[lang].success.title}</h1>

      {isStudioAccess ? (
        <>
          <p className="text-[15px] text-muted mb-2">
            {t[lang].success.templatePurchased}{" "}
            <span className="text-theme font-semibold">{t[lang].success.studioAccessPurchased}</span>
          </p>
          <p className="text-[13px] text-muted mb-8">
            {t[lang].success.subtitleStudio}
          </p>
          <Link
            href="/studio"
            className="btn-brand w-full justify-center text-[15px]"
            style={{ padding: "14px 24px" }}
          >
            {t[lang].success.openStudio}
          </Link>
        </>
      ) : (
        <>
          {template && (
            <p className="text-[15px] text-muted mb-2">
              {t[lang].success.templatePurchased}{" "}
              <span className="text-theme font-semibold">{template.name}</span>
            </p>
          )}
          <p className="text-[13px] text-muted mb-6">
            {t[lang].success.subtitleTemplate}
          </p>
          <div className="flex flex-col gap-3">
            {/* Guest: show direct download + sign-up prompt */}
            {!isSignedIn && template && sessionId && (
              <>
                <a
                  href={`/api/download-session?session_id=${sessionId}&templateId=${template.id}&lang=${lang}`}
                  className="btn-brand w-full justify-center text-[15px]"
                  style={{ padding: "14px 24px" }}
                >
                  {lang === "it" ? "Scarica il template" : "Download template"}
                </a>
                <div className="px-1 py-3 border-t border-theme/50">
                  <p className="text-[12px] text-muted mb-2">
                    {lang === "it"
                      ? "Crea un account per personalizzare con AI e accedere ai tuoi acquisti dal tuo profilo."
                      : "Create an account to customize with AI and access your purchases from your profile."}
                  </p>
                  <Link
                    href={`/sign-up?redirect_url=/studio?templateId=${template.id}`}
                    className="btn-brand w-full justify-center text-[14px]"
                    style={{ padding: "12px 24px" }}
                  >
                    {lang === "it" ? "Crea account gratuito →" : "Create free account →"}
                  </Link>
                </div>
              </>
            )}
            {/* Authenticated user: download + studio customization */}
            {isSignedIn && template && (
              <>
                <a
                  href={`/api/download/${template.id}?lang=${lang}`}
                  className="btn-brand w-full justify-center text-[15px]"
                  style={{ padding: "14px 24px" }}
                >
                  {lang === "it" ? "Scarica il template" : "Download template"}
                </a>
                <Link
                  href={`/studio?templateId=${template.id}`}
                  className="block w-full px-6 py-3.5 glass-subtle font-bold text-[15px] text-theme text-center transition-all duration-200 active:scale-[0.97] ios-spring"
                >
                  {t[lang].success.customizeStudio}
                </Link>
              </>
            )}
            <Link
              href="/"
              className="block w-full px-6 py-3.5 glass-subtle font-bold text-[15px] text-theme text-center transition-all duration-200 active:scale-[0.97] ios-spring"
            >
              {t[lang].success.backToMarketplace}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-page">
      <Confetti />
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse, var(--glow-gold) 0%, transparent 70%)" }} />
      </div>

      <Suspense fallback={
        <div className="relative z-10 bg-surface border border-theme p-8 max-w-sm w-full mx-auto text-center">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
