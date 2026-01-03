
import React from 'react';
import { Song, ThemeType } from '../types';

interface SongListProps {
  songs: Song[];
  theme: ThemeType;
}

const SongList: React.FC<SongListProps> = ({ songs, theme }) => {
  const isNeon = theme === 'neon';
  
  const getYouTubeLink = (song: Song) => {
    const query = encodeURIComponent(`${song.titre} ${song.artiste}`);
    return `https://www.youtube.com/results?search_query=${query}`;
  };

  return (
    <div className="space-y-4">
      {songs.map((song, index) => (
        <div 
          key={index} 
          className={`group relative p-5 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${isNeon ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/50 shadow-lg' : 'bg-white border-rose-100 hover:border-pink-300 shadow-md'}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl font-black text-lg transition-colors ${isNeon ? 'bg-slate-900 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-rose-50 text-pink-500 group-hover:bg-pink-500 group-hover:text-white'}`}>
                {index + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className={`font-black text-lg leading-tight ${isNeon ? 'text-white' : 'text-slate-900'}`}>{song.titre}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isNeon ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{song.annee}</span>
                </div>
                <p className={`text-sm font-bold ${isNeon ? 'text-cyan-400/80' : 'text-indigo-500'}`}>{song.artiste}</p>
              </div>
            </div>
            
            <a
              href={getYouTubeLink(song)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg ${isNeon ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              ÉCOUTER
            </a>
          </div>
          
          <div className={`mt-3 pt-3 border-t text-xs leading-relaxed italic ${isNeon ? 'border-slate-800 text-slate-500' : 'border-rose-50 text-slate-400'}`}>
            "{song.explication_courte}"
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
