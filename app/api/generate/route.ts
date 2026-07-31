import { anthropic } from "@/lib/claude";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAIPermission } from "@/lib/aiPermissions";
import { reserveAIUsage, finalizeAIUsage, releaseAIUsage } from "@/lib/aiCost";
import { getUserPreferences, buildMemoryContext } from "@/lib/userMemory";
import { generateSchema } from "@/lib/schemas";
import { rateLimitRedis } from "@/lib/rateLimitRedis";

const MODEL = "claude-opus-5";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await rateLimitRedis(`generate:${ip}`, 10, 60_000))) {
    return new Response("Too many requests. Please wait a moment.", { status: 429 });
  }

  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Permission check basato su piano (free vs studio)
  const permission = await checkAIPermission(userId, "generate");
  if (!permission.allowed) {
    return new Response(permission.reason, { status: 403 });
  }

  let reservationId: string | null = null;

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response("Server configuration error: missing API key", { status: 500 });
    }

    const parsed = generateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(parsed.error.issues[0]?.message ?? "Invalid input", { status: 400 });
    }
    const { category, description, style, templateId } = parsed.data;

    const isUI = category === "ui";

    // Carica preferenze brand dell'utente (fire-and-forget se non disponibili)
    const prefs = await getUserPreferences(userId).catch(() => ({}));
    const memoryContext = buildMemoryContext(prefs);

    const system = isUI
      ? `You are an expert frontend developer and UI designer.
Generate clean, production-ready HTML with Tailwind CSS.
Rules:
- Output ONLY the HTML code block, no explanations before or after
- Use modern design: gradients, subtle shadows, smooth transitions
- Make it fully responsive
- Add comments like <!-- CUSTOMIZE: change this color --> on key customizable lines
- All code must work standalone (no imports needed)${memoryContext}`
      : `You are a world-class AI prompt engineer and copywriter.
Generate professional, reusable prompt templates.
Rules:
- Output ONLY the prompt template, no explanations before or after
- Use {{variable_name}} syntax for every customizable value
- Add a single-line comment at the top: # USAGE: brief description
- Structure for maximum LLM effectiveness
- Make it immediately usable${memoryContext}`;

    const userMsg = isUI
      ? `Create a ${style || "modern"} UI template for: ${description}`
      : `Create a professional prompt template for: ${description}`;

    // Claim the quota slot before the model call — see reserveAIUsage.
    reservationId = await reserveAIUsage({
      userId,
      feature: "generate",
      model: MODEL,
      templateId,
    });

    // Await stream creation so auth/config errors surface before we start
    // streaming. Adaptive thinking + effort — `budget_tokens` is rejected on
    // Opus 5, and adaptive interleaves thinking without any beta header.
    const stream = await anthropic.messages.create({
      model: MODEL,
      max_tokens: isUI ? 16000 : 8000,
      stream: true,
      thinking: { type: "adaptive" },
      output_config: { effort: isUI ? "high" : "medium" },
      system,
      messages: [{ role: "user", content: userMsg }],
    });

    const encoder = new TextEncoder();
    let inputTokens = 0;
    let outputTokens = 0;
    const usageId = reservationId;

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

          if (usageId) {
            finalizeAIUsage({ id: usageId, model: MODEL, inputTokens, outputTokens }).catch(
              console.error,
            );
          }
        } catch (err) {
          if (usageId) releaseAIUsage(usageId).catch(console.error);
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
    if (reservationId) await releaseAIUsage(reservationId).catch(console.error);
    const message = err instanceof Error ? err.message : "Internal server error";
    return new Response(message, { status: 500 });
  }
}
