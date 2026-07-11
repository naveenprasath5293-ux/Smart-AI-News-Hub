/**
 * geminiApi.js
 * Wraps the Google Gemini API to turn a news article into a structured
 * AI briefing: summary, key highlights, why it matters, future impact.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.5-flash";

let client = null;
function getClient() {
  if (!API_KEY) {
    throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env file.");
  }
  if (!client) {
    client = new GoogleGenerativeAI(API_KEY);
  }
  return client;
}

const PROMPT_TEMPLATE = (article) => `
You are a precise news analyst. Analyze the following article and respond
ONLY with valid JSON (no markdown fences, no commentary) in this exact shape:

{
  "summary": "2-3 sentence plain-language summary",
  "highlights": ["short bullet", "short bullet", "short bullet"],
  "whyItMatters": "1-2 sentences on significance",
  "futureImpact": "1-2 sentences on likely future implications"
}

Article title: ${article.title}
Article description: ${article.description || "N/A"}
Article content excerpt: ${(article.content || "").slice(0, 1500) || "N/A"}
`;

function safeParseJson(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("AI response could not be parsed. Please regenerate.");
  }
}

/**
 * Generates a structured AI briefing for a given article.
 */
export async function analyzeArticle(article) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent(PROMPT_TEMPLATE(article));
  const text = result.response.text();
  return safeParseJson(text);
}
