import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Force scroll to top on page load/reload
if (typeof window !== 'undefined') {
  // Remove hash from URL if present
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname);
  }
  
  // Disable browser's default scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Scroll to top immediately
  window.scrollTo(0, 0);
  
  // Additional scroll after a tiny delay
  setTimeout(() => window.scrollTo(0, 0), 0);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);