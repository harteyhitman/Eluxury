'use client'

import { useEffect } from 'react';

declare global {
  interface Window {
    AR?: {
      loadModel: (url: string) => void;
    };
  }
}

export const ARButton = ({ modelUrl, className }: { modelUrl: string; className?: string }) => {
  useEffect(() => {
    // Load AR script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@ar-js-org/ar.js@latest';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleARView = () => {
    if (window.AR) {
      window.AR.loadModel(modelUrl);
    } else {
      console.error('AR.js not loaded');
    }
  };

  return (
    <button 
      onClick={handleARView}
      className={className}
      aria-label="View in AR"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2zM12 22v-5M3 7l9 5m0 0l9-5m-9 5v5"/>
      </svg>
    </button>
  );
};