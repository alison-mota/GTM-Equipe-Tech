import React, { useEffect, useRef, useState } from 'react';

const IcpDefinitionScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
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
      className="min-h-screen w-full flex items-center justify-center bg-[#191C23] border-b border-tech/5 relative overflow-hidden p-6 md:p-12"
    >
      <div className="w-full max-w-[1400px] flex flex-col justify-center h-full relative z-10">
        
        {/* Title */}
        <h2 
          className={`text-5xl md:text-7xl font-display font-light text-white mb-16 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          Definição do ICP
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          
          {/* Column 1: SEGMENTOS */}
          <div className={`flex flex-col gap-4 transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-[#0a0212] py-8 px-4 flex items-center justify-center border border-white/10 shadow-lg">
              <span className="font-mono text-white/90 font-bold tracking-wider uppercase">SEGMENTOS</span>
            </div>
            <div className="flex flex-col gap-4 h-full">
              {['VAREJO', 'INDÚSTRIA 4.0', 'FINANCEIRO', 'SERVIÇOS'].map((item) => (
                <div key={item} className="bg-[#EEE] py-6 px-4 flex items-center justify-center flex-1 min-h-[80px] hover:scale-[1.02] transition-transform shadow-md">
                  <span className="font-mono text-[#0a0212] font-bold uppercase">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: AREA DE ATUAÇÃO */}
          <div className={`flex flex-col gap-4 transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-[#0a0212] py-8 px-4 flex items-center justify-center border border-white/10 shadow-lg">
              <span className="font-mono text-white/90 font-bold tracking-wider uppercase">AREA DE ATUAÇÃO</span>
            </div>
            <div className="flex flex-col gap-4 h-full">
              {['T.I', 'OPERAÇÕES', 'INOVAÇÃO', 'COMPRAS'].map((item) => (
                <div key={item} className="bg-[#EEE] py-6 px-4 flex items-center justify-center flex-1 min-h-[80px] hover:scale-[1.02] transition-transform shadow-md">
                  <span className="font-mono text-[#0a0212] font-bold uppercase">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: ESTRUTURA */}
          <div className={`flex flex-col gap-4 transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <div className="bg-[#0a0212] py-8 px-4 flex items-center justify-center border border-white/10 shadow-lg">
              <span className="font-mono text-white/90 font-bold tracking-wider uppercase">ESTRUTURA</span>
            </div>
            <div className="bg-[#EEE] flex-1 flex items-center justify-center p-8 hover:scale-[1.02] transition-transform shadow-md min-h-[200px]">
               <span className="font-mono text-[#0a0212] font-bold text-xl text-center">até 500 funcionários</span>
            </div>
          </div>

          {/* Column 4: FATURAMENTO */}
          <div className={`flex flex-col gap-4 transition-all duration-700 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <div className="bg-[#0a0212] py-8 px-4 flex items-center justify-center border border-white/10 shadow-lg">
              <span className="font-mono text-white/90 font-bold tracking-wider uppercase">FATURAMENTO</span>
            </div>
            <div className="bg-[#EEE] flex-1 flex items-center justify-center p-8 hover:scale-[1.02] transition-transform shadow-md min-h-[200px]">
               <span className="font-mono text-[#0a0212] font-bold text-3xl">360k +</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IcpDefinitionScreen;