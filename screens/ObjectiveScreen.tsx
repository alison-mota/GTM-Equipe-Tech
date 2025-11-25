import React from 'react';

const DetailedWireframeRocket = () => (
  <svg viewBox="0 0 300 800" className="w-full h-full text-tech/60" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
      </linearGradient>
    </defs>

    {/* GROUP: Central Fuselage */}
    <g id="fuselage">
        {/* Main Cylinder Outline */}
        <path d="M110 200 L 110 600" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M190 200 L 190 600" fill="none" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Vertical Striations (Wireframe effect) */}
        <line x1="130" y1="200" x2="130" y2="600" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="150" y1="150" x2="150" y2="600" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <line x1="170" y1="200" x2="170" y2="600" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

        {/* Horizontal Rings (Cross sections) */}
        <ellipse cx="150" cy="200" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <ellipse cx="150" cy="300" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <ellipse cx="150" cy="400" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <ellipse cx="150" cy="500" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <ellipse cx="150" cy="600" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </g>

    {/* GROUP: Nose Cone */}
    <g id="nose-cone">
        {/* Outline */}
        <path d="M110 200 Q 150 50 190 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="150" y1="50" x2="150" y2="150" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Antenna */}
        <line x1="150" y1="50" x2="150" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="150" cy="0" r="2" fill="currentColor" />

        {/* Vertical curve lines on cone */}
        <path d="M130 195 Q 145 100 150 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <path d="M170 195 Q 155 100 150 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </g>

    {/* GROUP: Side Boosters (Left) */}
    <g id="booster-left" transform="translate(50, 450)">
         {/* Cone Top */}
         <path d="M10 50 L 30 0 L 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
         {/* Body */}
         <path d="M10 50 L 10 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
         <path d="M50 50 L 50 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
         <ellipse cx="30" cy="50" rx="20" ry="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
         <ellipse cx="30" cy="200" rx="25" ry="5" fill="none" stroke="currentColor" strokeWidth="1" />
         {/* Vertical lines */}
         <line x1="30" y1="0" x2="30" y2="200" stroke="currentColor" strokeWidth="0.5" />
         {/* Fin */}
         <path d="M10 150 L -20 220 L 10 200" fill="none" stroke="currentColor" strokeWidth="1" />
    </g>

    {/* GROUP: Side Boosters (Right) */}
    <g id="booster-right" transform="translate(190, 450)">
         {/* Cone Top */}
         <path d="M10 50 L 30 0 L 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
         {/* Body */}
         <path d="M10 50 L 10 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
         <path d="M50 50 L 50 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
         <ellipse cx="30" cy="50" rx="20" ry="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
         <ellipse cx="30" cy="200" rx="25" ry="5" fill="none" stroke="currentColor" strokeWidth="1" />
         {/* Vertical lines */}
         <line x1="30" y1="0" x2="30" y2="200" stroke="currentColor" strokeWidth="0.5" />
         {/* Fin */}
         <path d="M50 150 L 80 220 L 50 200" fill="none" stroke="currentColor" strokeWidth="1" />
    </g>

    {/* GROUP: Engines / Nozzles */}
    <g id="engines" transform="translate(0, 600)">
        {/* Main Engine */}
        <path d="M130 0 L 120 40 L 180 40 L 170 0" fill="none" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="150" cy="40" rx="30" ry="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
        
        {/* Grid lines on engine */}
        <line x1="150" y1="0" x2="150" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </g>
    
    {/* GROUP: Central Booster (Foreground/Background illusion) */}
     <g id="booster-center" transform="translate(120, 480)">
         <path d="M10 50 L 30 0 L 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
         <path d="M10 50 L 10 180" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
         <path d="M50 50 L 50 180" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
         <ellipse cx="30" cy="50" rx="20" ry="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
         <ellipse cx="30" cy="180" rx="25" ry="5" fill="none" stroke="currentColor" strokeWidth="1" />
         <line x1="30" y1="0" x2="30" y2="180" stroke="currentColor" strokeWidth="0.5" />
    </g>

  </svg>
);

const ObjectiveScreen: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden border-b border-tech/5 bg-background">
      <style>
        {`
          @keyframes spin3d {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
          .rocket-scene {
            perspective: 1200px;
          }
          .rocket-assembly {
            transform-style: preserve-3d;
            animation: spin3d 20s linear infinite;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
      
      {/* Rocket Graphic - 3D Rotating Hologram */}
      <div className="absolute left-[-15%] md:left-[5%] bottom-0 h-[85vh] w-auto aspect-[1/3] z-30 pointer-events-none drop-shadow-[0_0_25px_rgba(191,163,217,0.15)] rocket-scene">
        <div className="rocket-assembly">
            {/* Plane 1 (0 deg) */}
            <div className="absolute inset-0 backface-visible" style={{ transform: 'rotateY(0deg)' }}>
                <DetailedWireframeRocket />
            </div>
            {/* Plane 2 (90 deg) */}
            <div className="absolute inset-0 backface-visible" style={{ transform: 'rotateY(90deg)' }}>
                <DetailedWireframeRocket />
            </div>
        </div>
      </div>

      {/* Content Band */}
      <div className="relative z-10 w-full bg-[#191C23]/95 backdrop-blur-xl border-y border-tech/10 py-20 md:py-32 shadow-2xl">
         <div className="w-full max-w-7xl mx-auto px-8 md:px-12 flex flex-col items-end">
           
           {/* Title Section (Inside Container) */}
           <div className="w-full border-b border-tech/10 mb-8 pb-4 flex justify-end">
             <h2 className="text-5xl md:text-8xl font-display font-light tracking-tighter text-[#EEEEEE] select-none mix-blend-plus-lighter">
              objetivo
             </h2>
           </div>

           <div className="text-center md:text-right max-w-xl lg:max-w-3xl z-20">
              <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-300 tracking-wide text-balance font-mono">
                Elevar o processo de prospecção, qualificação e conversão comercial da Equipe Tech com frameworks de vendas consultivas, ativos personalizados, abordagem segmentada e inteligência de mercado
              </p>
             
               <div className="flex justify-center md:justify-end gap-3 mt-12 opacity-50">
                 <div className="h-1 w-1 bg-tech-accent rounded-full animate-pulse"></div>
                 <div className="h-1 w-1 bg-tech-accent rounded-full animate-pulse delay-75"></div>
                 <div className="h-1 w-1 bg-tech-accent rounded-full animate-pulse delay-150"></div>
                 <div className="h-1 w-24 bg-tech-accent/20 rounded-full"></div>
               </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default ObjectiveScreen;