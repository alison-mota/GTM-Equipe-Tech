
import React, { useState, useEffect } from 'react';

const LandingScreen: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: DD.MM.YY - HH:MM:SS
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      setDateTime(`${day}.${month}.${year} :: ${hours}:${minutes}:${seconds}`);
    };

    // Update immediately
    updateTime();
    
    // Set interval
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col p-8 md:p-12 animate-in fade-in duration-1000 border-b border-tech/5 pt-32">
      <header className="absolute top-32 left-8 md:top-40 md:left-12">
        <div className="flex items-center space-x-4 text-sm md:text-base tracking-widest font-mono text-tech/80">
          <span className="animate-pulse text-tech-accent">&lt;&lt;&lt;</span>
          <span className="tabular-nums">{dateTime}</span>
        </div>
      </header>
      
      <main className="flex flex-1 items-center justify-start mt-10 md:mt-0">
        <div className="text-left select-none">
          <h1 className="text-[15vw] font-normal leading-none tracking-tighter mix-blend-lighten text-[#EEEEEE] hover:text-white transition-colors duration-500">
            gtm
          </h1>
          <h2 className="text-[9vw] md:text-[8vw] font-normal leading-none tracking-tight text-[#EEEEEE] ml-2">
            equipe tech
          </h2>
        </div>
      </main>

      <footer className="absolute bottom-8 right-8 text-left font-mono z-20 md:bottom-12 md:right-12">
        <p className="opacity-50 uppercase tracking-widest text-[10px]">Prepared by</p>
        <p className="mt-1 tracking-[0.2em] text-tech-accent/80 text-sm md:text-base">CORE REVENUE</p>
      </footer>
    </div>
  );
};

export default LandingScreen;
