import OpenAI from "openai";
import { CRM_PROMPT } from "../prompts/crm.prompt";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function extractCRM(records: any[]) {
  try {
   const completion = await client.chat.completions.create({
  model: "google/gemini-2.5-flash",

  messages: [
    {
      role: "system",
      content: CRM_PROMPT,
    },
    {
      role: "user",
      content: `
Convert the following CSV rows into CRM format.

Return ONLY valid JSON array.

${JSON.stringify(records.slice(0, 5))}
`,
    },
  ],

  temperature: 0,

  max_tokens: 1500,
});
    let text = completion.choices[0].message.content || "[]";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (err) {
    console.error("OPENROUTER ERROR");
    console.error(err);
    throw err;
  }
}