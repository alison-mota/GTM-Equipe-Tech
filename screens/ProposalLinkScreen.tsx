import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, ArrowDown } from 'lucide-react';

const ProposalLinkScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Delay the "light on" effect
          setTimeout(() => setIsLit(true), 800);
        } else {
          setIsLit(false);
        }
      },
      { threshold: 0.4 }
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
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000 ${isLit ? 'bg-[#0f0418]' : 'bg-black'}`}
    >
      
      {/* Filament Cord */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-white/20 transition-all duration-1000 ease-out ${
          isVisible ? 'h-[40vh]' : 'h-0'
        }`}
      ></div>

      {/* The Bulb / Light Source */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Glow Container */}
        <div className={`transition-all duration-300 ${isLit ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
          <div className={`relative p-8 rounded-full transition-all duration-500 ${isLit ? 'bg-white shadow-[0_0_150px_rgba(255,255,255,0.8)]' : 'bg-gray-800'}`}>
             <Lightbulb 
               size={64} 
               className={`transition-colors duration-300 ${isLit ? 'text-background-dark' : 'text-gray-500'}`} 
               strokeWidth={1.5}
             />
          </div>
        </div>

        {/* Text Reveal */}
        <div className="mt-16 text-center">
          <h2 className="overflow-hidden">
             <span 
                className={`block font-display text-5xl md:text-8xl tracking-[0.2em] font-bold uppercase transition-all duration-700 delay-500 transform ${
                  isLit ? 'translate-y-0 opacity-100 text-white shadow-[0_0_30px_rgba(255,255,255,0.5)]' : 'translate-y-20 opacity-0 text-gray-900'
                }`}
                style={{ textShadow: isLit ? '0 0 40px rgba(191,163,217, 0.8)' : 'none' }}
             >
               Proposta
             </span>
          </h2>
          
          <div 
            className={`mt-6 h-[1px] bg-gradient-to-r from-transparent via-tech-accent to-transparent transition-all duration-1000 delay-1000 ${
              isLit ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
          ></div>

          <p 
            className={`mt-6 font-mono text-tech-accent text-sm tracking-widest uppercase transition-all duration-1000 delay-1000 ${
              isLit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Conectando estratégia à execução
          </p>
        </div>

      </div>

      {/* Ambient Particles */}
      {isLit && (
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
           <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-tech-accent rounded-full animate-pulse"></div>
           <div className="absolute bottom-10 left-1/2 w-1 h-1 bg-white rounded-full animate-bounce"></div>
        </div>
      )}

      {/* Connector to Next Screen */}
      <div 
         className={`absolute bottom-8 animate-bounce transition-opacity duration-1000 delay-[1500ms] ${isLit ? 'opacity-50' : 'opacity-0'}`}
      >
        <ArrowDown className="text-white/30" />
      </div>

    </div>
  );
};

export default ProposalLinkScreen;