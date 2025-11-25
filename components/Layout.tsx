import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen w-full bg-background bg-radial-custom font-display text-tech overflow-y-auto scroll-smooth snap-y snap-mandatory selection:bg-tech selection:text-background">
      
      <main className="relative z-10 flex flex-col w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;