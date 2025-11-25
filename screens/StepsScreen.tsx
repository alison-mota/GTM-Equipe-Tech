import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    id: 1,
    title: "KICK OFF",
    items: [
      "Reunião de imersão ao perfil de negócio, estrutura comercial, objetivos, metas, campanhas , desafios e necessidades."
    ]
  },
  {
    id: 2,
    title: "planejamento",
    items: [
      "Mapeamento de ICP exclusivo para campanhas que serão criadas.",
      "Definição de metodologia aplicada.",
      "Desenvolvimento de fluxo comercial para geração de demanda outbound para time comercial."
    ]
  },
  {
    id: 3,
    title: "execução",
    items: [
      "Construção de até 6 templates e 6 cadências personalizadas.",
      "Criação de matriz de qualificação.",
      "Criação de Matriz de objeção.",
      "Criação de matriz de necessidade.",
      "Definição de motivo de perda."
    ]
  },
  {
    id: 4,
    title: "documentação",
    items: [
      "Confecção de playbook comercial",
      "Setup de cadência em ferramenta.",
      "Ativação de campanha outreach",
      "1h de treinamento com time comercial para aplicação de nova cadência."
    ]
  }
];

const StepsScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
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
      className="min-h-screen w-full flex items-center justify-center bg-background border-b border-tech/5 relative overflow-hidden p-6 md:p-12"
    >
      {/* Connector Line from Top (Visual link to previous section) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-gradient-to-b from-tech/20 to-transparent"></div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6 lg:gap-8 pt-12">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative flex flex-col items-center group transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              
              {/* Header Title */}
              <h3 className="font-mono font-bold text-xl md:text-2xl text-[#C0BFC5] tracking-tight mb-8 uppercase text-center h-12 flex items-end justify-center">
                {step.title}
              </h3>

              {/* Number Badge with Ribbon Effect */}
              <div className="relative z-[70] -mb-8">
                 <div className="w-16 h-16 rounded-full bg-[#D9D9D9] border-[6px] border-[#360F1E] flex items-center justify-center shadow-2xl relative z-10">
                    <span className="font-display text-3xl text-[#360F1E] font-bold">{step.id}</span>
                 </div>
                 {/* Ribbon/Shape connector */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#360F1E] rounded-full -z-10 scale-90"></div>
              </div>

              {/* Card Body - Background solid #D9D9D9, z-[60] to sit ABOVE scanlines */}
              <div className="relative z-[60] w-full bg-[#D9D9D9] text-[#11051D] rounded-2xl p-8 pt-12 min-h-[400px] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 hover:scale-[1.02] transition-transform duration-500">
                <ul className="space-y-4 mt-4">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#360F1E] mt-2 flex-shrink-0 opacity-70"></span>
                      <p className="font-mono text-sm leading-relaxed text-[#11051D]/80 font-medium">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative line at bottom of card */}
              <div className={`relative z-[60] absolute bottom-0 left-8 right-8 h-1 bg-[#360F1E] rounded-t-full transition-all duration-700 delay-500 transform origin-center ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StepsScreen;