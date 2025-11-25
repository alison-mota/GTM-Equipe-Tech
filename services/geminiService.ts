import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateGTMAdvice = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[]
) => {
  if (!apiKey) {
    return "SYSTEM ERROR: API_KEY_MISSING. Please configure access credentials.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: "You are CORE-1, an advanced AI strategist for the GTM (Go-To-Market) Equipe Tech. Your tone is professional, concise, slightly futuristic, and highly analytical. You prefer bullet points and structured data. You are part of a high-performance revenue team.",
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM ERROR: CONNECTION_FAILED. Target unreachable.";
  }
};