
import React, { useState, useEffect } from 'react';
import { PIXEL_CONFIG } from './constants';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Dispara o evento do Pixel com nome genérico
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Access Portal',
        status: 'verifying'
      });
    }

    const duration = PIXEL_CONFIG.REDIRECT_DELAY_MS;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);
    }, 30);

    const timeout = setTimeout(() => {
      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(PIXEL_CONFIG.DEFAULT_TARGET_URL);
        
        currentUrl.searchParams.forEach((value, key) => {
          targetUrl.searchParams.set(key, value);
        });

        window.location.href = targetUrl.toString();
      } catch (e) {
        window.location.href = PIXEL_CONFIG.DEFAULT_TARGET_URL;
      }
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center p-6 font-sans text-white overflow-hidden">
      {/* Background sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Ícone de Escudo em SVG (Garante que não quebra se o lucide falhar) */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-tr from-indigo-600 to-indigo-400 p-5 rounded-full shadow-2xl shadow-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Texto Neutro */}
        <h1 className="text-xl font-semibold mb-2 tracking-tight">
          Preparando seu acesso...
        </h1>
        <p className="text-slate-400 text-sm mb-10">
          Aguarde enquanto validamos sua conexão segura.
        </p>

        {/* Barra de Progresso */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-indigo-500 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          <svg className="animate-spin h-3 w-3 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sincronizando
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 flex items-center gap-2 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
        Protocolo SSL Ativo
      </div>
    </div>
  );
};

export default App;
