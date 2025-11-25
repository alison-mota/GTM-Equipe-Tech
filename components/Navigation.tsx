
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import { Hexagon } from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  // Full list of screens, lowercase labels
  const navItems = [
    { id: Screen.LANDING, label: 'início' },
    { id: Screen.OBJECTIVE, label: 'objetivo' },
    { id: Screen.FOUNDER, label: 'founder' },
    { id: Screen.SPRINT, label: 'sprints' },
    { id: Screen.STEPS, label: 'etapas' },
    { id: Screen.ICP, label: 'icp' },
    { id: Screen.ICP_DEFINITION, label: 'definição' },
    { id: Screen.MARKET_FUNNEL, label: 'mercado' },
    { id: Screen.PROPOSAL_LINK, label: 'proposta' },
    { id: Screen.PROPOSAL_DETAILS, label: 'valores' },
    { id: Screen.CONTACT, label: 'contato' },
  ];

  const isContactScreen = currentScreen === Screen.CONTACT;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    // Attach to window or main scrolling element depending on architecture
    // Since App layout usually handles scroll on body or main div
    window.addEventListener('scroll', handleScroll);
    // Also try attaching to the main container if it's the one scrolling
    const layoutDiv = document.querySelector('main')?.parentElement; 
    layoutDiv?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      layoutDiv?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic Styles based on screen
  // If Contact Screen (White BG): Text Dark (#191C23), Active BG Dark
  // Else (Dark BG): Text White, Active BG Tech Accent
  
  const textColor = isContactScreen ? 'text-[#191C23]' : 'text-white';
  const logoFill = isContactScreen ? '#191C23' : '#ffffff';
  const borderColor = isContactScreen ? 'border-[#191C23]/10' : 'border-white/5';
  
  const glassBg = scrolled 
    ? (isContactScreen ? 'bg-white/90 shadow-sm' : 'bg-[#11051D]/90 shadow-lg') 
    : 'bg-transparent';

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${glassBg} ${borderColor} ${scrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="w-full mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Area */}
        <button 
          onClick={() => onNavigate(Screen.LANDING)}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="relative">
             <Hexagon 
                className={`transition-colors duration-500 ${textColor}`} 
                size={32} 
                strokeWidth={1.5} 
                fill={logoFill}
                fillOpacity={0.1}
             />
             <div className="absolute inset-0 bg-tech-accent/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className={`font-display font-bold text-xl tracking-widest hidden lg:block transition-colors duration-500 ${textColor}`}>
            core
          </span>
        </button>

        {/* Navigation Tabs - Horizontal Scroll on Mobile */}
        <div 
          className={`
            flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar max-w-full 
            ${isContactScreen ? 'bg-[#191C23]/5' : 'bg-white/5'} 
            backdrop-blur-sm p-1 rounded-full border ${borderColor}
          `}
        >
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            
            // Active State Logic
            let activeClass = '';
            let inactiveClass = '';

            if (isContactScreen) {
                // Dark Theme Active State (for Light Background)
                activeClass = 'bg-[#191C23] text-white font-bold shadow-md';
                inactiveClass = 'text-[#191C23]/60 hover:text-[#191C23] hover:bg-[#191C23]/10';
            } else {
                // Light Theme Active State (for Dark Background)
                activeClass = 'bg-tech-accent text-[#0a0212] font-bold shadow-[0_0_15px_rgba(191,163,217,0.3)]';
                inactiveClass = 'text-white/60 hover:text-white hover:bg-white/10';
            }

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  px-3 md:px-4 py-1.5 rounded-full font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap
                  ${isActive ? activeClass : inactiveClass}
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        
      </div>
    </nav>
  );
};

export default Navigation;
