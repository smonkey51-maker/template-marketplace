import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="glass-panel max-w-md p-8">
        <h1 className="text-[1.75rem]">Pagina non trovata</h1>
        <p className="mt-3 text-muted">L&apos;indirizzo richiesto non esiste o è stato spostato.</p>
        <Link href="/" className="btn btn-primary mt-6">
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
