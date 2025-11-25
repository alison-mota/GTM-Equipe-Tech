
import React, { useEffect, useRef, useState } from 'react';
import { Handshake, Settings, FileText } from 'lucide-react';

const ProposalDetailsScreen: React.FC = () => {
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

  const items = [
    { icon: Handshake, label: "PLANEJAMENTO" },
    { icon: Settings, label: "CRIAÇÃO & SETUP" },
    { icon: FileText, label: "DOCUMENTAÇÃO" }
  ];

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen w-full flex items-center justify-center bg-[#0a0212] border-b border-tech/5 relative overflow-hidden p-6 md:p-12"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        
        {/* LEFT COLUMN: Title & List */}
        <div className="flex flex-col justify-center">
          
          {/* Main Header */}
          <div className={`mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="font-display font-bold text-5xl md:text-7xl text-white leading-tight">
              Valores e <br/>
              <span className="text-[#360F1E] brightness-150">Investimento</span>
            </h2>
          </div>

          {/* List Items */}
          <div className="flex flex-col w-full">
            {/* Top Border */}
            <div className={`w-full h-[1px] bg-white/20 mb-8 transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`}></div>

            {items.map((item, index) => (
              <div key={index} className="group">
                <div 
                  className={`flex items-center gap-6 py-6 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <item.icon size={48} className="text-white" strokeWidth={1} />
                  <span className="font-display font-bold text-xl md:text-2xl text-white tracking-wide uppercase">
                    {item.label}
                  </span>
                </div>
                {/* Separator Line */}
                <div className={`w-full h-[1px] bg-white/20 mb-4 transition-all duration-1000 delay-300 ${isVisible ? 'w-full' : 'w-0'}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Description & Price */}
        <div className={`flex flex-col justify-center transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Description Text */}
          <p className="font-mono text-[#8C8B91] text-lg leading-relaxed mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut risus at purus condimentum scelerisque. Quisque condimentum molestie dolor, a faucibus turpis. Ut sollicitudin lacus vel eros ultricies, in suscipit nulla vulputate.
          </p>

          {/* Pricing Block - One Time */}
          <div className="mb-12">
            <h3 className="font-mono text-white/80 text-sm uppercase tracking-[0.2em] mb-2">
              VALOR TOTAL INICIAL (SETUP + 1º MÊS)
            </h3>
            <div className="text-[#360F1E] font-display font-bold text-6xl md:text-8xl brightness-125">
              R$ 3.800
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/20 mb-8"></div>

          {/* Pricing Block - Recurring */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
             <div>
                <div className="flex gap-4 font-mono text-white font-bold text-sm tracking-widest uppercase mb-1">
                  <span>BÔNUS</span>
                  <span>-</span>
                  <span>CONSULTORIA</span>
                </div>
                <div className="font-mono text-white font-bold text-sm tracking-widest uppercase mb-2">
                  MENSAL - 2H <span className="ml-8">RECORRENTE</span>
                </div>
                <div className="text-white font-display font-bold text-5xl md:text-6xl">
                  R$ 699,90
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProposalDetailsScreen;
