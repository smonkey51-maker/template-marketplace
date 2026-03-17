import { anthropic } from "@/lib/claude";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { category, description, style } = await req.json();

  if (!description?.trim()) {
    return new Response("Description is required", { status: 400 });
  }

  const isUI = category === "ui";

  const system = isUI
    ? `You are an expert frontend developer and UI designer.
Generate clean, production-ready HTML with Tailwind CSS.
Rules:
- Output ONLY the HTML code block, no explanations before or after
- Use modern design: gradients, subtle shadows, smooth transitions
- Make it fully responsive
- Add comments like <!-- CUSTOMIZE: change this color --> on key customizable lines
- All code must work standalone (no imports needed)`
    : `You are a world-class AI prompt engineer and copywriter.
Generate professional, reusable prompt templates.
Rules:
- Output ONLY the prompt template, no explanations before or after
- Use {{variable_name}} syntax for every customizable value
- Add a single-line comment at the top: # USAGE: brief description
- Structure for maximum LLM effectiveness
- Make it immediately usable`;

  const userMsg = isUI
    ? `Create a ${style || "modern"} UI template for: ${description}`
    : `Create a professional prompt template for: ${description}`;

  const stream = anthropic.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    system,
    messages: [{ role: "user", content: userMsg }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
