import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Carrega variáveis de ambiente de forma segura
    const env = loadEnv(mode, '.', '');
    
    // Tenta obter a API key de diferentes fontes, com fallback seguro
    const geminiKey = (
      env.GEMINI_API_KEY || 
      env.VITE_GEMINI_API_KEY || 
      process.env.GEMINI_API_KEY || 
      process.env.VITE_GEMINI_API_KEY || 
      ''
    ).trim();
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Garante que sempre há uma string, mesmo que vazia
        'process.env.API_KEY': JSON.stringify(geminiKey || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey || ''),
        'import.meta.env.GEMINI_API_KEY': JSON.stringify(geminiKey || ''),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiKey || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
