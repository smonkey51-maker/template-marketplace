import { anthropic } from "@/lib/claude";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAIPermission } from "@/lib/aiPermissions";
import { recordAIUsage } from "@/lib/aiCost";
import { getUserPreferences, buildMemoryContext } from "@/lib/userMemory";
import { customizeSchema } from "@/lib/schemas";
import { rateLimitRedis } from "@/lib/rateLimitRedis";

// Haiku is sufficient for editing/customisation tasks — ~19x cheaper than Opus
const MODEL = "claude-haiku-4-5-20251001";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await rateLimitRedis(`customize:${ip}`, 20, 60_000))) {
    return new Response("Too many requests. Please wait a moment.", { status: 429 });
  }

  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Permission check basato su piano (free vs studio)
  const permission = await checkAIPermission(userId, "customize");
  if (!permission.allowed) {
    return new Response(permission.reason, { status: 403 });
  }

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response("Server configuration error: missing API key", { status: 500 });
    }

    const parsed = customizeSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(parsed.error.issues[0]?.message ?? "Invalid input", { status: 400 });
    }
    const { templateContent, category, instructions, templateId } = parsed.data;

    const isUI = category === "ui";

    // Carica preferenze brand dell'utente
    const prefs = await getUserPreferences(userId).catch(() => ({}));
    const memoryContext = buildMemoryContext(prefs);

    const system = isUI
      ? `You are an expert frontend developer. Customize the provided HTML/Tailwind template.
Rules:
- Output ONLY the complete modified HTML, no explanations
- Preserve the overall structure and responsiveness
- Apply all requested changes precisely
- Keep Tailwind CSS classes, update them where needed${memoryContext}`
      : `You are an expert prompt engineer. Customize the provided prompt template.
Rules:
- Output ONLY the complete modified prompt, no explanations
- Keep all {{variable}} placeholders (rename only if asked)
- Preserve the prompt structure while applying changes
- Improve clarity and effectiveness where possible${memoryContext}`;

    let inputTokens = 0;
    let outputTokens = 0;

    // Await the stream creation so auth/config errors are caught before we start streaming
    const stream = await anthropic.messages.create({
      model: MODEL,
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
            if (event.type === "message_start" && event.message?.usage) {
              inputTokens = event.message.usage.input_tokens ?? 0;
            }
            if (event.type === "message_delta" && event.usage) {
              outputTokens = event.usage.output_tokens ?? 0;
            }
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          controller.close();

          // Registra uso dopo stream completato (non blocca la response)
          recordAIUsage({
            userId,
            feature: "customize",
            model: MODEL,
            inputTokens,
            outputTokens,
            templateId,
          }).catch(console.error);
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
        "X-AI-Plan": permission.plan,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return new Response(message, { status: 500 });
  }
}
