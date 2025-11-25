
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingScreen from './screens/LandingScreen';
import ObjectiveScreen from './screens/ObjectiveScreen';
import FounderScreen from './screens/FounderScreen';
import SprintScreen from './screens/SprintScreen';
import StepsScreen from './screens/StepsScreen';
import IcpScreen from './screens/IcpScreen';
import IcpDefinitionScreen from './screens/IcpDefinitionScreen';
import MarketFunnelScreen from './screens/MarketFunnelScreen';
import ProposalLinkScreen from './screens/ProposalLinkScreen';
import ProposalDetailsScreen from './screens/ProposalDetailsScreen';
import ContactScreen from './screens/ContactScreen';
import AgentScreen from './screens/AgentScreen';
import Navigation from './components/Navigation';
import { Screen } from './types';

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.LANDING);

  // Force scroll to top on mount/reload
  useEffect(() => {
    // Disable browser's default scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top
    window.scrollTo(0, 0);
    // Explicitly set active screen to Landing
    setActiveScreen(Screen.LANDING);
    
    // Fallback for some browsers that might race
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  // Function to handle scrolling to a section
  const scrollToSection = (screen: Screen) => {
    const element = document.getElementById(screen);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveScreen(screen);
    }
  };

  // Intersection Observer to update active state on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScreen(entry.target.id as Screen);
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.5, // 50% of the item must be visible
      }
    );

    Object.values(Screen).forEach((screen) => {
      const element = document.getElementById(screen);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div id={Screen.LANDING} className="h-screen w-full snap-start overflow-hidden relative">
        <LandingScreen />
      </div>
      <div id={Screen.OBJECTIVE} className="h-screen w-full snap-start overflow-hidden relative">
        <ObjectiveScreen />
      </div>
      <div id={Screen.FOUNDER} className="h-screen w-full snap-start overflow-hidden relative">
        <FounderScreen />
      </div>
      <div id={Screen.SPRINT} className="h-screen w-full snap-start overflow-hidden relative">
        <SprintScreen />
      </div>
      <div id={Screen.STEPS} className="h-screen w-full snap-start overflow-hidden relative">
        <StepsScreen />
      </div>
      <div id={Screen.ICP} className="h-screen w-full snap-start overflow-hidden relative">
        <IcpScreen />
      </div>
      <div id={Screen.ICP_DEFINITION} className="h-screen w-full snap-start overflow-hidden relative">
        <IcpDefinitionScreen />
      </div>
      <div id={Screen.MARKET_FUNNEL} className="h-screen w-full snap-start overflow-hidden relative">
        <MarketFunnelScreen />
      </div>
      <div id={Screen.PROPOSAL_LINK} className="h-screen w-full snap-start overflow-hidden relative">
        <ProposalLinkScreen />
      </div>
      <div id={Screen.PROPOSAL_DETAILS} className="h-screen w-full snap-start overflow-hidden relative">
        <ProposalDetailsScreen />
      </div>
      <div id={Screen.AGENT} className="h-screen w-full snap-start overflow-hidden relative">
        <AgentScreen />
      </div>
      <div id={Screen.CONTACT} className="h-screen w-full snap-start overflow-hidden relative">
        <ContactScreen />
      </div>
      
      <Navigation currentScreen={activeScreen} onNavigate={scrollToSection} />
    </Layout>
  );
}

export default App;
