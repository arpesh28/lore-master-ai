import { deepinfra } from "@ai-sdk/deepinfra";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepinfra("deepseek-ai/DeepSeek-V3"),
    // model: openai("gpt-4o-mini"),
    // model: openrouter("deepseek-ai/DeepSeek-V3", systemPrompt),
    system: geraltSystemPrompt,
    messages,
    temperature: 1,
  });

  return result.toDataStreamResponse();
}
