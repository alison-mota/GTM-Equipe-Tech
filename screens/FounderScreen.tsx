import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const FounderScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset animation when scrolling away (optional)
        }
      },
      { threshold: 0.3 }
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
      className="min-h-screen w-full flex items-center justify-center bg-background border-b border-tech/5 relative overflow-hidden p-6 md:p-12"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-tech-accent/5 skew-x-12 transform translate-x-1/2"></div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <div 
          className={`flex flex-col justify-center space-y-8 transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#EEEEEE] leading-tight">
              especialista em geração de demanda <br/><span className="text-tech-accent">outbound | abm.</span>
            </h2>
            <div className="h-1 w-20 bg-tech-accent rounded-full"></div>
          </div>

          <ul className="space-y-6">
            {[
              "Experiência consolidada em prospecção B2B para tecnologia.",
              "Frameworks personalizados para construção de pipelines qualificados.",
              "Integração full stack com ferramentas de CRM, automação e analytics.",
              "Time sênior focado em aceleração comercial, treinamento e otimização contínua.",
              "Cases de sucesso com software houses e empresas de TI em múltiplos setores."
            ].map((item, index) => (
              <li 
                key={index} 
                className={`flex items-start gap-4 transition-all duration-700 delay-[${index * 100}ms] ${
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
              >
                <CheckCircle2 className="w-6 h-6 text-tech-accent flex-shrink-0 mt-1" />
                <p className="font-mono text-sm md:text-base text-tech/80 leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Image */}
        <div 
          className={`relative h-[60vh] md:h-[80vh] w-full flex items-end justify-center md:justify-end transition-all duration-1000 ease-out delay-300 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
        >
          <div className="relative w-full h-full max-w-md">
             {/* Decorative Frame */}
             <div className="absolute inset-0 border border-tech-accent/20 translate-x-4 translate-y-4 rounded-3xl"></div>
             
             {/* Image Container */}
             <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b from-transparent to-background-dark border border-tech/10 shadow-2xl">
               {/* 
                  PLACEHOLDER IMAGE 
                  Replace the src below with the URL of your uploaded image.
               */}
               <img 
                 src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
                 alt="Founder" 
                 className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
               />
               
               {/* Overlay Gradient at bottom */}
               <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
               
               {/* Name Tag */}
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-background-dark/80 backdrop-blur-md border border-tech/20 p-4 rounded-xl">
                    <p className="font-display text-xl text-white">founder</p>
                    <p className="font-mono text-xs text-tech-accent uppercase tracking-widest mt-1">Head of Strategy</p>
                  </div>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FounderScreen;