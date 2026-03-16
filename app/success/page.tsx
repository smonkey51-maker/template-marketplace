import Link from "next/link";
import { getTemplate } from "@/lib/templates";

interface Props {
  searchParams: Promise<{ templateId?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { templateId } = await searchParams;
  const template = templateId ? getTemplate(templateId) : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-3">Acquisto completato!</h1>
        {template && (
          <p className="text-gray-400 mb-2">
            Hai acquistato{" "}
            <span className="text-white font-semibold">{template.name}</span>
          </p>
        )}
        <p className="text-gray-500 text-sm mb-8">
          Puoi ora accedere al template e personalizzarlo con l&apos;AI Studio.
        </p>
        <div className="flex gap-4 justify-center">
          {template && (
            <Link
              href={`/studio?templateId=${template.id}`}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition"
            >
              Apri in AI Studio →
            </Link>
          )}
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
          >
            Torna al marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
