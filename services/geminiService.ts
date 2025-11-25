import { GoogleGenAI } from "@google/genai";

// Tenta obter a API key de diferentes fontes (Vite e process.env)
const getApiKey = () => {
  try {
    // Vite usa import.meta.env, mas precisa do prefixo VITE_ para expor no cliente
    const viteKey = import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.GEMINI_API_KEY;
    const processKey = process.env?.GEMINI_API_KEY || process.env?.API_KEY;
    const key = (viteKey || processKey || '').trim();
    
    // Log apenas em desenvolvimento para debug
    if (import.meta.env?.DEV) {
      console.log('API Key loaded:', key ? `${key.substring(0, 10)}...` : 'NOT FOUND');
    }
    
    return key;
  } catch (error) {
    console.warn('Error loading API key:', error);
    return '';
  }
};

const apiKey = getApiKey();
const isValidKey = apiKey && 
                   apiKey !== 'PLACEHOLDER_API_KEY' && 
                   apiKey !== 'your_gemini_api_key_here' &&
                   apiKey.length > 10;

let ai: any = null;

// Inicializa o cliente Gemini apenas se tiver uma chave válida
try {
  if (isValidKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error('Failed to initialize GoogleGenAI:', error);
  ai = null;
}

export const generateGTMAdvice = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[]
) => {
  // Verifica se a API key está configurada e é válida
  if (!isValidKey) {
    console.error("Gemini API Key issue:", !apiKey ? "Not found" : "Invalid");
    
    return "Ops! Nosso assistente está offline no momento. 😅\n\nMas não se preocupe! Nossa equipe está pronta para te ajudar com sua estratégia GTM.\n\nVamos conversar? Chama a gente no WhatsApp:\n\n👉 https://wa.me/553499663517\n\nVamos juntos acelerar seu crescimento! 🚀";
  }

  if (!ai) {
    console.error("GoogleGenAI client not initialized");
    return "Ops! Nosso assistente está offline no momento. 😅\n\nMas não se preocupe! Nossa equipe está pronta para te ajudar com sua estratégia GTM.\n\nVamos conversar? Chama a gente no WhatsApp:\n\n👉 https://wa.me/553499663517\n\nVamos juntos acelerar seu crescimento! 🚀";
  }

  try {
    // Valida se o cliente AI está disponível
    if (!ai || typeof ai.chats?.create !== 'function') {
      throw new Error('AI client not properly initialized');
    }

    const model = 'gemini-2.5-flash';
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: "Você é o CORE-1, um assistente de IA estratégico da GTM Equipe Tech. Seu tom é descontraído, profissional, direto ao ponto e analítico. Você prefere respostas estruturadas com pontos-chave. Você faz parte de uma equipe de alta performance focada em resultados. Sempre responda em português brasileiro de forma natural e amigável.",
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
    if (error?.message?.includes('API key') || error?.message?.includes('API_KEY')) {
      return "SYSTEM ERROR: INVALID_API_KEY.\n\nFalha na autenticação. Verifique se sua API key está configurada corretamente.";
    }
    
    if (error?.message?.includes('network') || error?.message?.includes('fetch') || error?.code === 'NETWORK_ERROR') {
      return "SYSTEM ERROR: NETWORK_FAILURE.\n\nNão foi possível conectar ao serviço de IA.\n\nVerifique sua conexão com a internet e tente novamente.";
    }
    
    if (error?.status === 429 || error?.message?.includes('quota')) {
      return "SYSTEM ERROR: RATE_LIMIT_EXCEEDED.\n\nLimite de requisições excedido.\n\nAguarde alguns momentos e tente novamente.";
    }

    if (error?.message?.includes('not initialized') || error?.message?.includes('client')) {
      return "Ops! Nosso assistente está offline no momento. 😅\n\nMas não se preocupe! Nossa equipe está pronta para te ajudar com sua estratégia GTM.\n\nVamos conversar? Chama a gente no WhatsApp:\n\n👉 https://wa.me/553499663517\n\nVamos juntos acelerar seu crescimento! 🚀";
    }
    
    return `Ops! Algo deu errado aqui. 😅\n\nMas não se preocupe! Nossa equipe está pronta para te ajudar com sua estratégia GTM.\n\nVamos conversar? Chama a gente no WhatsApp:\n\n👉 https://wa.me/553499663517\n\nVamos juntos acelerar seu crescimento! 🚀`;
  }
};