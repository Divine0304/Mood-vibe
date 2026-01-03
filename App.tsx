
import React, { useState, useEffect } from 'react';
import { getMoodRecommendations } from './geminiService';
import { MoodRecommendation, AppStatus, ThemeType } from './types';
import MoodCard from './components/MoodCard';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [mood, setMood] = useState('');
  const [result, setResult] = useState<MoodRecommendation | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeType>('neon');

  // Load saved state if any
  useEffect(() => {
    const saved = localStorage.getItem('moodvibe_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setResult(parsed.result);
      setStatus(parsed.status);
      setTheme(parsed.theme || 'neon');
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem('moodvibe_state', JSON.stringify({ result, status, theme }));
  }, [result, status, theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setStatus(AppStatus.LOADING);
    setError(null);

    try {
      const data = await getMoodRecommendations(mood);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError("Oups ! Une erreur est survenue lors de l'analyse. Vérifiez votre connexion ou votre clé API.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setMood('');
    setResult(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  const themeClasses = {
    neon: {
      bg: 'bg-slate-950',
      text: 'text-slate-100',
      card: 'bg-slate-900/80 border-slate-800',
      accent: 'from-indigo-500 to-cyan-400',
      input: 'bg-slate-900 border-slate-700 focus:border-indigo-500',
      button: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
    },
    pastel: {
      bg: 'bg-rose-50',
      text: 'text-slate-800',
      card: 'bg-white border-rose-100',
      accent: 'from-pink-500 to-indigo-400',
      input: 'bg-white border-rose-200 focus:border-pink-400',
      button: 'bg-indigo-500 hover:bg-indigo-400 shadow-indigo-500/10'
    }
  }[theme];

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col items-center p-4 md:p-8 ${themeClasses.bg} ${themeClasses.text}`}>
      
      {/* Sidebar-like Floating Header */}
      <nav className={`w-full max-w-4xl flex flex-wrap justify-between items-center mb-12 p-4 rounded-2xl border ${themeClasses.card} backdrop-blur-md sticky top-4 z-50 shadow-xl`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${theme === 'neon' ? 'bg-indigo-600' : 'bg-pink-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent`}>
            MoodVibe
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex rounded-full p-1 border ${themeClasses.card} shadow-inner`}>
            <button 
              onClick={() => setTheme('neon')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${theme === 'neon' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-400'}`}
            >
              NÉON
            </button>
            <button 
              onClick={() => setTheme('pastel')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${theme === 'pastel' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-500 hover:text-pink-400'}`}
            >
              PASTEL
            </button>
          </div>
        </div>
      </nav>

      <main className="w-full max-w-2xl flex-grow">
        {status === AppStatus.IDLE || status === AppStatus.ERROR ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="text-center space-y-4">
              <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${theme === 'pastel' ? 'text-slate-900' : 'text-white'}`}>
                C'est quoi la <span className={`bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent`}>vibe</span> ?
              </h2>
              <p className={`text-lg ${theme === 'pastel' ? 'text-slate-600' : 'text-slate-400'}`}>
                Racontez-moi votre humeur, je m'occupe des hits.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <textarea
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="Ex: Un peu nostalgique, je veux des sons qui bougent pour oublier..."
                  className={`w-full h-48 p-6 rounded-3xl border transition-all text-xl resize-none outline-none shadow-xl ${themeClasses.input} ${theme === 'pastel' ? 'text-slate-900' : 'text-white'}`}
                  disabled={status === AppStatus.LOADING}
                />
                <div className={`absolute bottom-4 right-4 text-xs font-bold ${theme === 'pastel' ? 'text-rose-300' : 'text-indigo-900'}`}>
                  AI READY
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-center font-medium animate-bounce">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!mood.trim() || status === AppStatus.LOADING}
                className={`w-full py-5 px-8 text-white font-black rounded-2xl transition-all shadow-2xl active:scale-95 text-xl uppercase tracking-widest disabled:opacity-30 ${themeClasses.button}`}
              >
                Générer ma Playlist
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-3">
              {['Motivation 🔥', 'Chilling ☁️', 'Cœur brisé 💔', 'Grosse fête 🕺', 'Nostalgie ✨'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setMood(tag.split(' ')[0])}
                  className={`px-5 py-2.5 rounded-full border transition-all text-sm font-semibold hover:scale-105 active:scale-95 ${themeClasses.card} ${theme === 'pastel' ? 'hover:border-pink-400 text-slate-600' : 'hover:border-indigo-500 text-slate-300'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {status === AppStatus.LOADING && <Loader theme={theme} />}

        {status === AppStatus.SUCCESS && result && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <MoodCard recommendation={result} theme={theme} onReset={handleReset} />
          </div>
        )}
      </main>

      <footer className={`mt-12 py-8 text-center text-sm font-medium ${theme === 'pastel' ? 'text-slate-400' : 'text-slate-600'}`}>
        <p>MoodVibe © {new Date().getFullYear()} — Créé avec Passion & IA</p>
      </footer>
    </div>
  );
};

export default App;
