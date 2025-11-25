import React, { useEffect, useRef, useState } from 'react';
import { Target, Crosshair, BarChart3, Globe } from 'lucide-react';

const IcpScreen: React.FC = () => {
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

  const icpData = [
    { label: "segmento", value: "b2b / saas / fintech", icon: Globe },
    { label: "maturidade", value: "series a / scale-up", icon: BarChart3 },
    { label: "decisor", value: "c-level / diretoria", icon: Target },
    { label: "ticket médio", value: "> r$ 500k / ano", icon: Crosshair },
  ];

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen w-full flex items-center justify-center bg-[#191C23] border-b border-tech/5 relative overflow-hidden p-6 md:p-12"
    >
      {/* Background Grid Lines (HUD Effect) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 w-full h-[1px] bg-white/20"></div>
        <div className="absolute bottom-1/4 w-full h-[1px] bg-white/20"></div>
        <div className="absolute left-1/4 h-full w-[1px] bg-white/20"></div>
        <div className="absolute right-1/4 h-full w-[1px] bg-white/20"></div>
      </div>

      {/* 3D Glass Sphere - Enlarged + Lower Opacity - Centered at Bottom Left Intersection */}
      <div 
        className={`absolute bottom-0 left-0 w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem] rounded-full z-10 transition-transform duration-[2000ms] ease-out pointer-events-none ${
          isVisible ? 'transform -translate-x-1/2 translate-y-1/2 scale-100' : 'transform -translate-x-1/2 translate-y-1/2 scale-90'
        }`}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 70%)', // Opacity ~15% max
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: 'inset 0 0 50px rgba(255,255,255,0.02)'
        }}
      >
        {/* Subtle Highlight */}
        <div className="absolute top-[20%] left-[20%] w-[15%] h-[10%] bg-white/10 blur-2xl rounded-full transform -rotate-45"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Massive Typography */}
        <div 
          className={`flex flex-col justify-center transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
        >
          <div className="relative">
            <h2 className="font-display text-[20vw] lg:text-[14rem] text-[#CFA6E0] leading-[0.8] tracking-tighter mix-blend-screen opacity-90">
              icp
            </h2>
            <h3 className="font-display text-[8vw] lg:text-[5rem] text-[#CFA6E0] leading-none tracking-tight ml-2 md:ml-4 opacity-60">
              sugerido
            </h3>
            
            {/* Decorative decorative lines under text */}
            <div className="w-full h-[2px] bg-gradient-to-r from-[#CFA6E0] to-transparent mt-8"></div>
            <div className="w-2/3 h-[2px] bg-gradient-to-r from-[#CFA6E0]/50 to-transparent mt-2"></div>
          </div>
        </div>

        {/* Right Column: Technical Specs List (Filling the void) */}
        <div 
          className={`flex flex-col gap-6 pl-0 lg:pl-12 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
        >
           <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl relative overflow-hidden">
             {/* Scanner line animation */}
             <div className={`absolute top-0 left-0 w-full h-[2px] bg-[#CFA6E0]/50 shadow-[0_0_20px_#CFA6E0] transition-all duration-[3000ms] linear ${isVisible ? 'translate-y-[400px]' : 'translate-y-0'}`}></div>

             <div className="flex items-center gap-3 mb-8 opacity-50">
                <Crosshair className="text-[#CFA6E0] animate-spin-slow" size={20} />
                <span className="font-mono text-xs tracking-[0.3em] text-[#CFA6E0] uppercase">Target Parameters Detected</span>
             </div>

             <div className="space-y-8">
               {icpData.map((item, idx) => (
                 <div key={idx} className="group">
                   <div className="flex justify-between items-end mb-2">
                     <span className="font-mono text-xs text-white/40 uppercase tracking-widest">{item.label}</span>
                     <item.icon size={16} className="text-[#660000] opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <div className="font-display text-2xl md:text-3xl text-white group-hover:text-[#CFA6E0] transition-colors">
                     {item.value}
                   </div>
                   <div className="w-full h-[1px] bg-white/10 mt-2 group-hover:bg-[#CFA6E0]/30 transition-colors"></div>
                 </div>
               ))}
             </div>
           </div>
        </div>

      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 right-8 z-40">
        <p className="font-mono text-sm md:text-base tracking-[0.2em] font-bold text-[#660000]">
          GO TO MARKET TREXX
        </p>
      </div>

    </div>
  );
};

export default IcpScreen;