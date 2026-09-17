/**
 * Renders the tiny markdown grammar used by `lib/articles.ts`: blank-line
 * paragraphs, "## " headings, "- " bullet lists and "**bold**" spans. No
 * markdown dependency — the grammar is deliberately small, so a hand-rolled
 * parser is simpler and safer than pulling one in.
 */
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

export default function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\n+/);

  return (
    <div
      className="article-body space-y-5 text-[16px] leading-relaxed"
      style={{ color: "var(--text)" }}
    >
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mt-10 mb-1 text-[1.4rem]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
            >
              {renderInline(block.slice(3), `h-${i}`)}
            </h2>
          );
        }

        const lines = block.split("\n").map((l) => l.trim());
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.slice(2), `li-${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{renderInline(block, `p-${i}`)}</p>;
      })}
    </div>
  );
}
