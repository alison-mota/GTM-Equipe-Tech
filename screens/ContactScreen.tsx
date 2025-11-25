
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Hexagon, Twitter, Linkedin, Instagram } from 'lucide-react';

const ContactScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen w-full flex flex-col bg-white relative overflow-hidden pt-20"
    >
      {/* MAIN CONTENT: Quote Only */}
      <div className="flex-1 flex flex-col items-start justify-center p-6 md:p-12 relative z-10 min-h-[50vh]">
         <div className={`flex flex-col items-start text-left transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <h2 className="font-display font-bold text-3xl md:text-5xl text-[#360F1E] tracking-tighter leading-tight mb-2 whitespace-nowrap">
             trust the process
           </h2>
           <p className="font-serif italic text-xl md:text-3xl text-[#11051D]/80">
             You just have to start.
           </p>
        </div>
      </div>

      {/* FOOTER - Compacted Vertical Space */}
      <footer className="w-full bg-[#0a0212] text-white pt-10 pb-6 px-8 md:px-16 border-t border-white/5 relative z-20">
         
         {/* Background Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-tech-accent/50 to-transparent shadow-[0_0_50px_rgba(191,163,217,0.5)]"></div>

         <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
            
            {/* Column 1: Brand (Span 4) */}
            <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                    <Hexagon className="text-tech-accent fill-tech-accent/10 stroke-[1.5]" size={28} />
                    <span className="font-display font-bold text-xl tracking-widest text-white">CORE REVENUE</span>
                </div>
                <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-sm">
                    Core Revenue é um ecossistema de estratégia GTM de última geração dedicado a criar motores de receita influentes.
                </p>
            </div>

            {/* Column 2: Sitemap (Span 2) */}
            <div className="lg:col-span-2 space-y-4">
                <h4 className="font-mono font-bold text-[10px] uppercase tracking-[0.2em] text-white">Mapa do Site</h4>
                <ul className="space-y-2 font-mono text-xs text-gray-500">
                    <li><a href="#" className="hover:text-tech-accent transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-tech-accent transition-colors">Objetivo</a></li>
                    <li><a href="#" className="hover:text-tech-accent transition-colors">Planejamento</a></li>
                    <li><a href="#" className="hover:text-tech-accent transition-colors">Definição ICP</a></li>
                </ul>
            </div>

             {/* Column 3: Info (Span 2) */}
            <div className="lg:col-span-2 space-y-4">
                <h4 className="font-mono font-bold text-[10px] uppercase tracking-[0.2em] text-white">Info</h4>
                <ul className="space-y-2 font-mono text-xs text-gray-500">
                    <li><a href="#" className="hover:text-tech-accent transition-colors">Sobre a Founder</a></li>
                    <li><a href="#" className="hover:text-tech-accent transition-colors">Metodologia</a></li>
                    <li><a href="#" className="hover:text-tech-accent transition-colors">Política de Privacidade</a></li>
                </ul>
            </div>

            {/* Column 4: Newsletter (Span 4) */}
            <div className="lg:col-span-4 space-y-4">
                <h4 className="font-mono font-bold text-[10px] uppercase tracking-[0.2em] text-white">Assine a Newsletter</h4>
                <div className="relative group">
                    <input 
                        type="email" 
                        placeholder="Seu e-mail" 
                        className="w-full bg-[#11051D] border border-white/10 rounded-full py-3 px-5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-tech-accent focus:ring-1 focus:ring-tech-accent transition-all"
                    />
                    <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-tech-accent rounded-full text-[#0a0212] hover:scale-105 hover:bg-white transition-all duration-300">
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
         </div>

         {/* Bottom Bar - Aligned */}
         <div className="max-w-[1400px] mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[10px] text-gray-600">Todos os direitos reservados © 2025 Core Revenue.</p>
            
            <div className="flex items-center gap-4">
                 <div className="p-1.5 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group">
                    <Twitter size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                 </div>
                 <div className="p-1.5 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group">
                    <Linkedin size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                 </div>
                 <div className="p-1.5 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group">
                    <Instagram size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                 </div>
            </div>
         </div>

      </footer>
    </div>
  );
};

export default ContactScreen;
