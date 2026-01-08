
import React, { useState, useEffect } from 'react';
import { PIXEL_CONFIG } from './constants';
import { ShieldCheck, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Dispara o evento do Pixel com nome genérico para evitar flags
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Secure Access Portal',
        status: 'validated'
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
      const currentUrl = new URL(window.location.href);
      const targetUrl = new URL(PIXEL_CONFIG.DEFAULT_TARGET_URL);
      
      // Preservar parâmetros de rastreio (UTMs, fbclid, etc) para garantir que o pixel continue marcando na página final
      currentUrl.searchParams.forEach((value, key) => {
        targetUrl.searchParams.set(key, value);
      });

      window.location.href = targetUrl.toString();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center p-6 font-sans text-white">
      {/* Background sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50"></div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Ícone de Escudo Seguro (mais confiável e neutro) */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-tr from-indigo-600 to-indigo-400 p-5 rounded-full shadow-2xl shadow-indigo-500/20">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Texto Neutro e Profissional */}
        <h1 className="text-xl font-semibold mb-2 tracking-tight">
          Preparando seu acesso...
        </h1>
        <p className="text-slate-400 text-sm mb-10">
          Aguarde enquanto validamos sua conexão segura.
        </p>

        {/* Barra de Progresso Minimalista */}
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-indigo-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loader e Status */}
        <div className="flex items-center gap-3 text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
          <Loader2 className="w-3 h-3 animate-spin text-indigo-500" />
          Sincronizando
        </div>
      </div>

      {/* Footer discreto de segurança */}
      <div className="absolute bottom-10 flex items-center gap-2 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
        Protocolo SSL Ativo
      </div>
    </div>
  );
};

export default App;
