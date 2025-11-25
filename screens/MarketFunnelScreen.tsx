import React, { useEffect, useRef, useState } from 'react';
import { Target, Globe, Crosshair, ArrowRight, Info } from 'lucide-react';

type MarketLayer = 'TAM' | 'SAM' | 'SOM';

const marketData = {
  TAM: {
    title: "Total Available Market",
    subtitle: "Mercado Disponível Total",
    color: "#22d3ee", // Cyan
    stats: [
      "~350 mil empresas totais no Brasil",
      "Ticket médio software digitalização",
      "Potencial: R$ 7 a 10 bilhões anuais"
    ],
    description: "O universo total de demanda. Representa a oportunidade máxima de receita se a empresa conquistasse 100% do mercado disponível em todos os segmentos."
  },
  SAM: {
    title: "Serviceable Available Market",
    subtitle: "Mercado Útil Disponível",
    color: "#818cf8", // Indigo
    stats: [
      "30-40% com demanda ativa",
      "Estimativa: 105 a 140 mil empresas",
      "Gasto anual: R$ 3 a 4 bilhões"
    ],
    description: "O segmento do TAM que está dentro do alcance geográfico e operacional. Empresas que já buscam transformação digital ativamente."
  },
  SOM: {
    title: "Serviceable Obtainable Market",
    subtitle: "Mercado Útil Acessível",
    color: "#c084fc", // Purple
    stats: [
      "Meta realista outbound (~15% do SAM)",
      "Potencial ativo: 15 a 20 mil empresas",
      "Receita anual: R$ 450 a 600 milhões"
    ],
    description: "A fatia do mercado que podemos capturar realisticamente a curto/médio prazo, considerando recursos, concorrência e estratégia comercial."
  }
};

const MarketFunnelScreen: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<MarketLayer>('SOM');
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
      className="min-h-screen w-full flex items-center justify-center bg-[#11051D] border-b border-tech/5 relative overflow-hidden p-6 md:p-12"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-tech-accent/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* LEFT: Interactive Radial Graphic */}
        <div className={`relative w-full max-w-[600px] aspect-square flex items-center justify-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           
           {/* SVG Interface */}
           <svg viewBox="0 0 600 600" className="w-full h-full">
              <defs>
                <filter id="glow-tam" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="grad-tam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="grad-sam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="grad-som" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="1" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Decorative Outer Ticks */}
              <circle cx="300" cy="300" r="290" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="2 10" className="animate-spin-slow" style={{ animationDuration: '60s' }} />

              {/* TAM LAYER (Outer Ring) */}
              <g 
                className="cursor-pointer group transition-all duration-500" 
                onClick={() => setActiveLayer('TAM')}
                onMouseEnter={() => setActiveLayer('TAM')}
              >
                {/* Main Ring */}
                <circle 
                  cx="300" cy="300" r="250" 
                  fill="none" 
                  stroke="url(#grad-tam)" 
                  strokeWidth={activeLayer === 'TAM' ? "4" : "1"} 
                  strokeOpacity={activeLayer === 'TAM' ? "1" : "0.3"}
                  strokeDasharray="100 20 40 20"
                  className="transition-all duration-500"
                />
                {/* Hover Glow Ring */}
                <circle cx="300" cy="300" r="250" fill="transparent" stroke="transparent" strokeWidth="20" />
                {/* Label Indicator */}
                <text x="300" y="40" textAnchor="middle" fill="#22d3ee" className={`font-mono text-xs uppercase tracking-widest transition-opacity duration-300 ${activeLayer === 'TAM' ? 'opacity-100' : 'opacity-40'}`}>Target Discovery</text>
              </g>

              {/* SAM LAYER (Middle Ring) */}
              <g 
                className="cursor-pointer group transition-all duration-500" 
                onClick={() => setActiveLayer('SAM')}
                onMouseEnter={() => setActiveLayer('SAM')}
              >
                <circle 
                  cx="300" cy="300" r="180" 
                  fill="none" 
                  stroke="url(#grad-sam)" 
                  strokeWidth={activeLayer === 'SAM' ? "6" : "2"} 
                  strokeOpacity={activeLayer === 'SAM' ? "1" : "0.4"}
                  strokeDasharray="10 5"
                  className="transition-all duration-500"
                  style={{ transformOrigin: 'center', transform: 'rotate(-45deg)' }}
                />
                <circle cx="300" cy="300" r="180" fill="transparent" stroke="transparent" strokeWidth="20" />
                 {/* Connecting Curves */}
                {activeLayer === 'SAM' && (
                  <path d="M 300 120 Q 360 180 300 300" fill="none" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.5" />
                )}
              </g>

              {/* SOM LAYER (Inner Core) */}
              <g 
                className="cursor-pointer group transition-all duration-500" 
                onClick={() => setActiveLayer('SOM')}
                onMouseEnter={() => setActiveLayer('SOM')}
              >
                <circle 
                  cx="300" cy="300" r="100" 
                  fill="url(#grad-som)" 
                  fillOpacity={activeLayer === 'SOM' ? "0.1" : "0.05"}
                  stroke="#c084fc" 
                  strokeWidth={activeLayer === 'SOM' ? "2" : "1"} 
                  strokeDasharray={activeLayer === 'SOM' ? "0" : "5 5"}
                  className={`transition-all duration-500 ${activeLayer === 'SOM' ? 'filter drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]' : ''}`}
                />
                 <circle cx="300" cy="300" r="100" fill="transparent" stroke="transparent" strokeWidth="20" />
              </g>

              {/* Central Text */}
              <text 
                x="300" y="300" 
                dy="0.3em" 
                textAnchor="middle" 
                fill="#ffffff" 
                className="font-display text-5xl md:text-6xl font-bold tracking-tighter select-none pointer-events-none"
                style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
              >
                {activeLayer}
              </text>
           </svg>

           {/* Orbiting Elements */}
            <div className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-transform duration-[10s] ease-linear ${isVisible ? 'animate-spin-slow' : ''}`}>
               <div className="absolute top-[10%] left-[50%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
               <div className="absolute bottom-[20%] right-[20%] w-1 h-1 bg-tech-accent rounded-full"></div>
            </div>
        </div>

        {/* RIGHT: Data Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-20 h-[500px]">
          
          <div className="relative w-full h-full">
            {Object.entries(marketData).map(([key, data]) => (
              <div 
                key={key}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                  activeLayer === key 
                    ? 'opacity-100 translate-x-0 pointer-events-auto' 
                    : 'opacity-0 translate-x-12 pointer-events-none'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-2">
                   {key === 'TAM' && <Globe size={32} color={data.color} />}
                   {key === 'SAM' && <Target size={32} color={data.color} />}
                   {key === 'SOM' && <Crosshair size={32} color={data.color} />}
                   <span className="font-mono text-sm tracking-[0.3em] uppercase opacity-70" style={{ color: data.color }}>Market Data</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-display text-white mb-2">{data.title}</h2>
                <h3 className="text-xl text-white/60 mb-8 font-light italic">{data.subtitle}</h3>

                {/* Description Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-8">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="mt-1 flex-shrink-0" style={{ color: data.color }} />
                    <p className="font-mono text-sm md:text-base leading-relaxed text-gray-300">
                      {data.description}
                    </p>
                  </div>
                </div>

                {/* Statistics List */}
                <div className="space-y-4">
                  {data.stats.map((stat, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-4 group"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="w-12 h-[1px] bg-white/20 group-hover:bg-white/60 transition-colors"></div>
                      <div className="flex items-center gap-2">
                        <ArrowRight size={16} style={{ color: data.color }} />
                        <span className="font-display text-lg md:text-xl text-white tracking-wide">{stat}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default MarketFunnelScreen;
