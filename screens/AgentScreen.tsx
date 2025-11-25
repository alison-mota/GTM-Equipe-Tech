import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Terminal, Bot, MessageCircle } from 'lucide-react';
import { generateGTMAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const MAX_QUESTIONS = 5;
const WHATSAPP_NUMBER = '553499663517';

const AgentScreen: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'Olá! 👋\n\nSou o CORE-1, seu assistente de estratégia GTM.\n\nEstou aqui para te ajudar a acelerar seu crescimento. Pode me contar qual é seu objetivo ou desafio atual?',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || questionCount >= MAX_QUESTIONS) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setLoading(true);
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);
    
    // Scroll suave após adicionar mensagem do usuário
    setTimeout(() => scrollToBottom(), 50);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateGTMAdvice(userInput, history);

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "NO DATA RECEIVED.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
      
      // Scroll após resposta
      setTimeout(() => scrollToBottom(), 100);

      // Se atingiu o limite, mostrar mensagem de contato
      if (newQuestionCount >= MAX_QUESTIONS) {
        setTimeout(() => {
          const contactMsg: ChatMessage = {
            id: (Date.now() + 2).toString(),
            role: 'model',
            text: `SESSION_LIMIT_REACHED.\n\nVocê completou ${MAX_QUESTIONS} consultas nesta sessão.\n\nPara continuar explorando estratégias GTM personalizadas e acelerar seu crescimento, conecte-se diretamente com nossa equipe.\n\nVamos transformar insights em resultados.`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, contactMsg]);
          setTimeout(() => scrollToBottom(), 100);
        }, 500);
      }
    } catch (error: any) {
      console.error('Error in handleSend:', error);
      
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `SYSTEM ERROR: UNEXPECTED_ERROR.\n\nOcorreu um erro inesperado ao processar sua solicitação.\n\nErro: ${error?.message || 'Erro desconhecido'}\n\nPor favor, tente novamente ou entre em contato com o suporte.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen p-4 md:p-8 pt-28 md:pt-32 pb-24 border-b border-tech/5">
      <div className="flex items-center gap-4 mb-6 opacity-70">
        <Cpu className="w-6 h-6 text-tech-accent animate-pulse" />
        <h2 className="text-2xl tracking-widest text-white">core revenue ai agent</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-6 pr-2 scrollbar-thin">
        {messages.map((msg) => {
          const isContactMessage = msg.text.includes('SESSION_LIMIT_REACHED');
          return (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] md:max-w-[60%] p-4 rounded-2xl
                  font-mono text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-tech/10 text-tech border border-tech/20 rounded-br-none' 
                    : isContactMessage
                    ? 'bg-gradient-to-br from-tech-accent/20 to-tech-accent/5 text-white border-2 border-tech-accent/40 rounded-bl-none shadow-[0_0_20px_rgba(191,163,217,0.2)]'
                    : 'bg-background-dark/50 text-tech-accent border border-tech-accent/20 rounded-bl-none shadow-[0_0_15px_rgba(191,163,217,0.05)]'}
                `}
              >
                 {msg.role === 'model' && <Terminal className="w-4 h-4 mb-2 opacity-50 inline-block mr-2" />}
                 <div className="whitespace-pre-wrap">{msg.text.replace('SESSION_LIMIT_REACHED.\n\n', '')}</div>
                 {isContactMessage && (
                   <a
                     href={`https://wa.me/${WHATSAPP_NUMBER}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-tech-accent text-[#0a0212] font-bold rounded-xl hover:bg-tech-accent/90 transition-all duration-300 shadow-[0_0_15px_rgba(191,163,217,0.4)] hover:shadow-[0_0_25px_rgba(191,163,217,0.6)]"
                   >
                     <MessageCircle size={18} />
                     <span>Continuar no WhatsApp</span>
                   </a>
                 )}
                 <div className="text-[10px] opacity-30 mt-2 text-right uppercase tracking-wider">
                   {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </div>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-background-dark/50 p-4 rounded-2xl rounded-bl-none border border-tech-accent/20 flex items-center gap-2">
              <Bot className="w-4 h-4 text-tech-accent" />
              <span className="font-mono text-xs text-tech-accent">PROCESSING_DATA...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-tech-dim to-tech-accent rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-background-dark rounded-xl border border-tech/10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={questionCount >= MAX_QUESTIONS ? "LIMITE DE CONSULTAS ATINGIDO" : "ENTER COMMAND OR QUERY..."}
            disabled={questionCount >= MAX_QUESTIONS}
            className="flex-1 bg-transparent border-none text-tech placeholder-tech/30 p-4 focus:ring-0 font-mono text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim() || questionCount >= MAX_QUESTIONS}
            className="p-4 text-tech-accent hover:text-white disabled:opacity-30 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentScreen;