/**
 * Renders the tiny markdown grammar used by `lib/articles.ts`: blank-line
 * paragraphs, "## " headings, "- " bullet lists, "**bold**" spans, and a
 * ":::callout Title" ... ":::" fenced block rendered as the
 * "L'Osservazione Chiave" / "The Key Observation" highlight box. No markdown
 * dependency — the grammar is deliberately small, so a hand-rolled parser is
 * simpler and safer than pulling one in.
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

/** Renders one callout's inner content — its own blank-line paragraphs and
 * "- " bullet lists, same grammar as the outer body minus headings and
 * nested callouts (a callout is a leaf, not a container for another one). */
function renderCalloutContent(inner: string, keyPrefix: string) {
  const blocks = inner.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim());
    if (lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={`${keyPrefix}-${i}`} className="list-disc space-y-2 pl-5">
          {lines.map((l, j) => (
            <li key={j}>{renderInline(l.slice(2), `${keyPrefix}-li-${i}-${j}`)}</li>
          ))}
        </ul>
      );
    }
    return <p key={`${keyPrefix}-${i}`}>{renderInline(block, `${keyPrefix}-p-${i}`)}</p>;
  });
}

const CALLOUT_DEFAULT_TITLE = "L'Osservazione Chiave";

type Block = { kind: "text"; content: string } | { kind: "callout"; title: string; body: string };

/**
 * Splits the raw body into top-level blocks. A plain "\n\n+" split (the
 * original approach) would break on any blank line — including ones *inside*
 * a ":::callout" fence, which the Barnum-effect and defense-checklist
 * callouts both use for their own internal paragraph breaks. So callouts are
 * carved out first, line by line, and everything in between is split the
 * old, simple way.
 */
function parseBlocks(body: string): Block[] {
  const lines = body.trim().split("\n");
  const blocks: Block[] = [];
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join("\n").trim();
    if (text) {
      for (const chunk of text.split(/\n\n+/)) {
        blocks.push({ kind: "text", content: chunk });
      }
    }
    buffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fenceOpen = line.match(/^:::callout(.*)$/);
    if (fenceOpen) {
      flush();
      const title = fenceOpen[1].trim() || CALLOUT_DEFAULT_TITLE;
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        inner.push(lines[i]);
        i++;
      }
      blocks.push({ kind: "callout", title, body: inner.join("\n") });
      continue;
    }
    buffer.push(line);
  }
  flush();

  return blocks;
}

export default function ArticleBody({ body }: { body: string }) {
  const blocks = parseBlocks(body);

  return (
    <div
      className="article-body space-y-5 text-[16px] leading-relaxed"
      style={{ color: "var(--text)" }}
    >
      {blocks.map((block, i) => {
        if (block.kind === "callout") {
          return (
            <div key={i} className="fn-callout">
              <p className="fn-callout__title">{block.title}</p>
              {renderCalloutContent(block.body, `callout-${i}`)}
            </div>
          );
        }

        const { content } = block;

        if (content.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mt-10 mb-1 text-[1.4rem]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 }}
            >
              {renderInline(content.slice(3), `h-${i}`)}
            </h2>
          );
        }

        const lines = content.split("\n").map((l) => l.trim());
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.slice(2), `li-${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{renderInline(content, `p-${i}`)}</p>;
      })}
    </div>
  );
}
