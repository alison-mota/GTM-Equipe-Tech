import { GoogleGenAI } from "@google/genai";

// Tenta obter a API key de diferentes fontes (Vite e process.env)
const getApiKey = () => {
  // Vite usa import.meta.env, mas precisa do prefixo VITE_ para expor no cliente
  const viteKey = import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.GEMINI_API_KEY;
  const processKey = process.env?.GEMINI_API_KEY || process.env?.API_KEY;
  const key = (viteKey || processKey || '').trim();
  
  // Log apenas em desenvolvimento para debug
  if (import.meta.env?.DEV) {
    console.log('API Key loaded:', key ? `${key.substring(0, 10)}...` : 'NOT FOUND');
  }
  
  return key;
};

const apiKey = getApiKey();
const ai = apiKey && apiKey !== 'PLACEHOLDER_API_KEY' ? new GoogleGenAI({ apiKey }) : null;

export const generateGTMAdvice = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[]
) => {
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.error("Gemini API Key not found or is placeholder. Check your .env.local file for GEMINI_API_KEY");
    return "SYSTEM ERROR: API_KEY_MISSING.\n\nPlease configure a valid GEMINI_API_KEY in your .env.local file.\n\nGet your API key at: https://aistudio.google.com/apikey\n\nContact system administrator for access credentials.";
  }

  if (!ai) {
    return "SYSTEM ERROR: INITIALIZATION_FAILED.\n\nAI service could not be initialized.\n\nPlease check your configuration.";
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
    return result.text || "NO RESPONSE RECEIVED.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Mensagens de erro mais específicas
    if (error?.message?.includes('API key')) {
      return "SYSTEM ERROR: INVALID_API_KEY.\n\nAuthentication failed. Please verify your API key configuration.";
    }
    
    if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
      return "SYSTEM ERROR: NETWORK_FAILURE.\n\nUnable to reach AI service. Please check your internet connection.";
    }
    
    if (error?.status === 429) {
      return "SYSTEM ERROR: RATE_LIMIT_EXCEEDED.\n\nToo many requests. Please try again in a few moments.";
    }
    
    return `SYSTEM ERROR: CONNECTION_FAILED.\n\nTarget unreachable.\n\nError: ${error?.message || 'Unknown error'}\n\nPlease try again or contact support.`;
  }
};