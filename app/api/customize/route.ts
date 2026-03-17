import { anthropic } from "@/lib/claude";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response("Server configuration error: missing API key", {
        status: 500,
      });
    }

    const { templateContent, category, instructions } = await req.json();

    if (!templateContent?.trim() || !instructions?.trim()) {
      return new Response("Template content and instructions are required", {
        status: 400,
      });
    }

    const isUI = category === "ui";

    const system = isUI
      ? `You are an expert frontend developer. Customize the provided HTML/Tailwind template.
Rules:
- Output ONLY the complete modified HTML, no explanations
- Preserve the overall structure and responsiveness
- Apply all requested changes precisely
- Keep Tailwind CSS classes, update them where needed`
      : `You are an expert prompt engineer. Customize the provided prompt template.
Rules:
- Output ONLY the complete modified prompt, no explanations
- Keep all {{variable}} placeholders (rename only if asked)
- Preserve the prompt structure while applying changes
- Improve clarity and effectiveness where possible`;

    // Await the stream creation so auth/config errors are caught before we start streaming
    const stream = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      stream: true,
      system,
      messages: [
        {
          role: "user",
          content: `ORIGINAL TEMPLATE:\n\`\`\`\n${templateContent}\n\`\`\`\n\nCUSTOMIZATION INSTRUCTIONS:\n${instructions}\n\nOutput the complete customized template:`,
        },
      ],
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
