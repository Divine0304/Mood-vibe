
import React, { useState, useEffect } from 'react';
import { ThemeType } from '../types';

interface LoaderProps {
  theme: ThemeType;
}

const MESSAGES = [
  "Décryptage de vos émotions...",
  "Scan des charts mondiaux (2020-2025)...",
  "Sélection des pépites francophones...",
  "Mixage de votre playlist personnalisée...",
  "Synchronisation des vibes...",
  "C'est presque prêt..."
];

const Loader: React.FC<LoaderProps> = ({ theme }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const isNeon = theme === 'neon';

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in zoom-in duration-500">
      <div className="relative">
        <div className={`w-24 h-24 border-4 rounded-full animate-spin ${isNeon ? 'border-indigo-600/20 border-t-indigo-400' : 'border-pink-200 border-t-pink-500'}`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-12 h-12 rounded-full animate-pulse blur-md opacity-60 ${isNeon ? 'bg-indigo-500' : 'bg-pink-400'}`}></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className={`text-2xl font-black uppercase tracking-tighter animate-pulse ${isNeon ? 'text-slate-200' : 'text-slate-800'}`}>
          {MESSAGES[msgIndex]}
        </p>
        <p className={`text-sm font-medium italic ${isNeon ? 'text-slate-500' : 'text-rose-400'}`}>MoodVibe prépare votre son...</p>
      </div>
    </div>
  );
};

export default Loader;
