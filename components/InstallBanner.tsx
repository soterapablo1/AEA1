
import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, Share, ChevronRight } from 'lucide-react';

const InstallBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Detectar si ya está instalada
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone;

    if (isStandalone) return;

    // Detectar iOS
    const ua = window.navigator.userAgent;
    const ios = !!ua.match(/iPad|iPhone|iPod/) && !(window as any).MSStream;
    setIsIOS(ios);

    // Capturar evento de instalación nativa (Android/Chrome)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Si es móvil, mostrar siempre el banner tras 2s para guiar al usuario
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    const timer = setTimeout(() => {
      if (isMobile) setIsVisible(true);
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Si no hay prompt nativo (ej. Samsung Browser), dar aviso
      alert("Para instalar: toca el menú de tu navegador (3 puntos o rayas) y busca 'Instalar aplicación' o 'Añadir a inicio'.");
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-[100] animate-in slide-in-from-top-10 duration-700">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-5 shadow-2xl shadow-blue-500/40 border border-white/20 relative overflow-hidden">
        {/* Decoración fondo */}
        <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12 scale-150 pointer-events-none">
          <Smartphone size={100} className="text-white" />
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1.5 bg-black/20 text-white/70 hover:text-white rounded-full transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex gap-4 items-center relative z-10">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl ring-4 ring-blue-400/20">
            <img src="https://cdn-icons-png.flaticon.com/512/3222/3222640.png" className="w-8 h-8" alt="logo" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-black text-base leading-tight">Lleva AEA en tu bolsillo</h4>
            <p className="text-blue-100 text-[11px] leading-snug mt-1 font-medium">
              {isIOS 
                ? 'Toca el botón "Compartir" y selecciona "Añadir a pantalla de inicio" para instalar.'
                : 'Instala la app para recibir alertas del cielo y gestionar tus visitas más rápido.'}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2 relative z-10">
          {!isIOS ? (
            <button 
              onClick={handleInstallClick}
              className="flex-1 bg-white text-blue-700 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Instalar App
            </button>
          ) : (
            <div className="flex-1 bg-blue-500/30 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center justify-center gap-3 text-white text-[10px] font-bold">
               <Share size={18} className="text-white animate-bounce" />
               <span>Sigue los pasos en Safari</span>
            </div>
          )}
          <button 
            onClick={() => setIsVisible(false)}
            className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-bold uppercase transition-all"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;
