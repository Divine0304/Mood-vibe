
import React from 'react';
import { MoodRecommendation, ThemeType } from '../types';
import SongList from './SongList';

interface MoodCardProps {
  recommendation: MoodRecommendation;
  theme: ThemeType;
  onReset: () => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ recommendation, theme, onReset }) => {
  const isNeon = theme === 'neon';

  return (
    <div className={`border rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 ${isNeon ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-rose-100'}`}>
      <div className="p-8 md:p-10 space-y-10">
        
        {/* Message de Bienveillance de l'IA */}
        <div className={`relative p-6 rounded-3xl border-l-4 ${isNeon ? 'bg-indigo-500/5 border-indigo-500 text-slate-200' : 'bg-pink-50 border-pink-400 text-slate-700'}`}>
          <div className="absolute -top-3 -left-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${isNeon ? 'bg-indigo-600' : 'bg-pink-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-lg font-medium leading-relaxed italic">
            {recommendation.message_bienveillant}
          </p>
        </div>

        {/* Header Analysis Summary */}
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${isNeon ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-pink-100 text-pink-600 border-pink-200'}`}>
            Diagnostic
          </div>
          <p className={`text-xl font-bold ${isNeon ? 'text-white' : 'text-slate-900'}`}>
            "{recommendation.analyse}"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-6 rounded-3xl border ${isNeon ? 'bg-slate-950/50 border-slate-800' : 'bg-rose-50/50 border-rose-100'}`}>
            <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${isNeon ? 'text-slate-500' : 'text-rose-400'}`}>Genre Suggéré</span>
            <span className={`text-2xl font-black ${isNeon ? 'text-cyan-400' : 'text-indigo-600'}`}>{recommendation.genre}</span>
          </div>
          <div className={`p-6 rounded-3xl border ${isNeon ? 'bg-slate-950/50 border-slate-800' : 'bg-rose-50/50 border-rose-100'}`}>
            <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${isNeon ? 'text-slate-500' : 'text-rose-400'}`}>Sélection</span>
            <span className={`text-2xl font-black ${isNeon ? 'text-purple-400' : 'text-pink-500'}`}>Hits 2020-2025</span>
          </div>
        </div>

        {/* Playlist Section */}
        <div className="space-y-6">
          <h3 className={`text-xl font-black uppercase tracking-tight flex items-center gap-3 ${isNeon ? 'text-white' : 'text-slate-900'}`}>
            <span className={`w-2 h-8 rounded-full bg-gradient-to-b ${isNeon ? 'from-indigo-500 to-cyan-400' : 'from-pink-500 to-indigo-400'}`}></span>
            Ta Playlist Sur-Mesure
          </h3>
          <SongList songs={recommendation.playlist} theme={theme} />
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-dashed border-slate-700/50">
          <button
            onClick={onReset}
            className={`w-full py-4 text-sm font-black uppercase tracking-widest transition-all rounded-2xl ${isNeon ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'}`}
          >
            Changer d'ambiance
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodCard;
