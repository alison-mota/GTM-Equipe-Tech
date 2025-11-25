import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Rocket } from 'lucide-react';

const sprints = [
  {
    id: 0,
    title: "SPRINT 0",
    duration: "1 dia",
    tasks: ["kick off"],
    position: "bottom"
  },
  {
    id: 1,
    title: "SPRINT 1",
    duration: "10 dias",
    tasks: ["Mapeamento de ICP", "Definição de processo e metodologia."],
    position: "top"
  },
  {
    id: 2,
    title: "SPRINT 2",
    duration: "15 dias",
    tasks: ["Construção de ativos de vendas e fluxo comercial.", "Setup de Ferramentas."],
    position: "bottom"
  },
  {
    id: 3,
    title: "SPRINT 3",
    duration: "5 dias",
    tasks: ["Testes e entrega de playbook de Vendas Equipe Tech."],
    position: "top"
  }
];

const SprintScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on intersection to trigger animation entry and exit
        setIsVisible(entry.isIntersecting);
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
      className="min-h-screen w-full flex items-center justify-center bg-background border-b border-tech/5 relative overflow-hidden p-4"
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#8C8B91 1px, transparent 1px), linear-gradient(90deg, #8C8B91 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="w-full max-w-7xl relative z-10 flex flex-col justify-center">
        
        {/* Initiation Label - Top Left */}
        <div className="flex justify-start w-full px-4 font-mono text-xs text-[#DEDCE4] uppercase tracking-[0.3em] mb-4 opacity-60">
           <span className="flex items-center gap-2 animate-pulse"><Rocket size={14} /> Initiation</span>
        </div>

        {/* Main Timeline Track - Height reduced by ~50% */}
        <div className="relative w-full h-16 md:h-12 my-12 flex items-center">
          
          {/* Animated Progress Bar Background */}
          <div className="absolute w-full h-full bg-tech/5 rounded-lg border border-tech/10 backdrop-blur-sm transform skew-x-12"></div>
          
          {/* Animated Fill Bar */}
          <div 
            className="absolute h-full bg-gradient-to-r from-tech-dim via-tech to-white/90 rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-[2000ms] ease-out transform skew-x-12 origin-left"
            style={{ width: isVisible ? '100%' : '0%' }}
          ></div>

          {/* Timeline Nodes Container */}
          <div className="relative w-full h-full flex justify-between items-center px-8 md:px-16">
             {sprints.map((sprint, index) => {
               const delay = 500 + (index * 400); // Staggered delay
               
               return (
                 <div 
                   key={sprint.id} 
                   className="relative flex flex-col items-center justify-center w-full"
                 >
                   
                   {/* Connection Point on Bar */}
                   <div 
                     className={`absolute w-3 h-3 bg-background-dark border-2 border-white rounded-full z-20 transition-all duration-500 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                     style={{ transitionDelay: `${delay}ms` }}
                   ></div>

                   {/* Content Group */}
                   <div 
                     className={`absolute w-64 md:w-80 flex flex-col items-center text-center transition-all duration-700
                       ${sprint.position === 'top' ? 'bottom-12 md:bottom-16' : 'top-12 md:top-16'}
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                     `}
                     style={{ transitionDelay: `${delay + 200}ms` }}
                   >
                     
                     {/* Triangle Pointer */}
                     <div className={`absolute left-1/2 -translate-x-1/2 text-white/90 
                        ${sprint.position === 'top' ? '-bottom-5' : '-top-5'}`}>
                        {sprint.position === 'top' ? <ChevronDown size={30} strokeWidth={1} fill="currentColor" className="text-[#C0BFC5]" /> : <ChevronUp size={30} strokeWidth={1} fill="currentColor" className="text-[#C0BFC5]" />}
                     </div>

                     {/* Title - Changed font to mono for better legibility */}
                     <h3 className="text-2xl md:text-3xl font-mono font-bold tracking-tighter text-[#C0BFC5] mb-2 drop-shadow-lg">
                       {sprint.title}
                     </h3>

                     {/* Duration Badge */}
                     <div className="inline-flex items-center gap-2 bg-tech/10 border border-tech/20 px-3 py-1 rounded-full mb-4 backdrop-blur-md">
                       <Clock size={12} className="text-[#DEDCE4]" />
                       <span className="font-mono text-xs text-[#DEDCE4]">{sprint.duration}</span>
                     </div>

                     {/* Tasks List - Consolidated Container */}
                     <div className="bg-background-dark/80 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md w-full">
                       {sprint.tasks.map((task, tIndex) => (
                         <p key={tIndex} className="font-mono text-xs md:text-sm text-[#DEDCE4] leading-relaxed">
                           {task}
                         </p>
                       ))}
                     </div>

                   </div>

                 </div>
               );
             })}
          </div>
        </div>

        {/* Delivery Label - Bottom Right */}
        <div className="flex justify-end w-full px-4 font-mono text-xs text-[#DEDCE4] uppercase tracking-[0.3em] mt-4 opacity-60">
           <span className="flex items-center gap-2 animate-pulse">Delivery <Rocket size={14} /></span>
        </div>

      </div>
    </div>
  );
};

export default SprintScreen;