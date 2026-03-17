import Link from "next/link";
import { getTemplate } from "@/lib/templates";

interface Props {
  searchParams: Promise<{ templateId?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { templateId } = await searchParams;
  const isStudioAccess = templateId === "studio-access";
  const template = templateId && !isStudioAccess ? getTemplate(templateId) : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#000000]" style={{ background: "radial-gradient(ellipse at top, #1a1a1a 0%, #000 60%)" }}>
      <div className="bg-[#1C1C1E] border border-white/10 rounded-[32px] p-8 max-w-sm w-full mx-auto text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#30D158]/15 flex items-center justify-center">
            <span className="text-[#30D158] text-[32px] font-bold">✓</span>
          </div>
        </div>

        <h1 className="text-[22px] font-bold mb-3 tracking-tight">Acquisto completato!</h1>

        {isStudioAccess ? (
          <>
            <p className="text-[15px] text-[#8E8E93] mb-2">
              Hai acquistato{" "}
              <span className="text-white font-semibold">Studio Access</span>
            </p>
            <p className="text-[13px] text-[#8E8E93] mb-8">
              Puoi ora generare template illimitati con l&apos;AI Studio.
            </p>
            <Link
              href="/studio"
              className="block w-full px-6 py-3.5 bg-[#5E5CE6] hover:bg-[#7B79F7] rounded-2xl font-bold text-[15px] text-white transition-all duration-200 active:scale-[0.97] ios-spring shadow-[0_4px_20px_rgba(94,92,230,0.25)]"
            >
              Apri AI Studio → Genera ora
            </Link>
          </>
        ) : (
          <>
            {template && (
              <p className="text-[15px] text-[#8E8E93] mb-2">
                Hai acquistato{" "}
                <span className="text-white font-semibold">{template.name}</span>
              </p>
            )}
            <p className="text-[13px] text-[#8E8E93] mb-8">
              Puoi ora personalizzare il template con l&apos;AI Studio.
            </p>
            <div className="flex flex-col gap-3">
              {template && (
                <Link
                  href={`/studio?templateId=${template.id}`}
                  className="block w-full px-6 py-3.5 bg-[#5E5CE6] hover:bg-[#7B79F7] rounded-2xl font-bold text-[15px] text-white transition-all duration-200 active:scale-[0.97] ios-spring shadow-[0_4px_20px_rgba(94,92,230,0.25)]"
                >
                  Personalizza in AI Studio →
                </Link>
              )}
              <Link
                href="/"
                className="block w-full px-6 py-3.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-2xl font-bold text-[15px] transition-all duration-200 active:scale-[0.97] ios-spring"
              >
                Torna al marketplace
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
