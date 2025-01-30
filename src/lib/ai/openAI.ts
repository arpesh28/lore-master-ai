import { createOpenAI } from "@ai-sdk/openai";

export const OpenAI = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export const openai = OpenAI("gpt-4o-mini");
