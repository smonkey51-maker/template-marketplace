import CatalogoContent, { type GroupKey } from "./CatalogoContent";

/**
 * Server shell for the catalogue.
 *
 * It exists to read `?gruppo=` — the parameter the Catalogo menu links to —
 * without dragging the page out of server rendering. The obvious alternative,
 * `useSearchParams` inside the client component, requires a Suspense boundary,
 * and that boundary renders on the server instead of the page: the catalogue
 * shipped **zero product cards in its initial HTML**, leaving a shop's most
 * important page blank until JavaScript ran. Reading the parameter here keeps
 * all twenty cards in the server-rendered markup.
 *
 * Validation happens here too, so the client component receives a GroupKey and
 * never has to defend itself against `?gruppo=<script>`.
 */
export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ gruppo?: string }>;
}) {
  const { gruppo } = await searchParams;
  const initialGroup: GroupKey =
    gruppo === "prompt" || gruppo === "guide" || gruppo === "sheet" ? gruppo : "all";

  return <CatalogoContent initialGroup={initialGroup} />;
}
