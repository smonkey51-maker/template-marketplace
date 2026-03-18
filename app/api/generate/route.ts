import { anthropic } from "@/lib/claude";
import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`generate:${ip}`, 10, 60_000)) {
    return new Response("Too many requests. Please wait a moment.", { status: 429 });
  }

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response("Server configuration error: missing API key", {
        status: 500,
      });
    }

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

    // Await the stream creation so auth/config errors are caught before we start streaming
    const stream = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      stream: true,
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
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return new Response(message, { status: 500 });
  }
}
