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
    const errorMessage = !apiKey 
      ? "SYSTEM ERROR: API_KEY_MISSING.\n\nA API key do Gemini não está configurada.\n\nPara configurar:\n1. Crie um arquivo .env.local na raiz do projeto\n2. Adicione: GEMINI_API_KEY=sua_chave_aqui\n3. Reinicie o servidor\n\nObtenha sua chave em: https://aistudio.google.com/apikey"
      : "SYSTEM ERROR: INVALID_API_KEY.\n\nA API key configurada não é válida.\n\nVerifique se a chave está correta no arquivo .env.local";
    
    console.error("Gemini API Key issue:", !apiKey ? "Not found" : "Invalid");
    return errorMessage;
  }

  if (!ai) {
    console.error("GoogleGenAI client not initialized");
    return "SYSTEM ERROR: INITIALIZATION_FAILED.\n\nO serviço de IA não pôde ser inicializado.\n\nVerifique sua configuração e tente novamente.";
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
      return "SYSTEM ERROR: SERVICE_UNAVAILABLE.\n\nO serviço de IA não está disponível no momento.\n\nVerifique sua configuração ou tente novamente mais tarde.";
    }
    
    return `SYSTEM ERROR: CONNECTION_FAILED.\n\nDestino inacessível.\n\nErro: ${error?.message || 'Erro desconhecido'}\n\nTente novamente ou entre em contato com o suporte.`;
  }
};