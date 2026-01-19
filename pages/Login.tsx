
import React, { useState, useEffect } from 'react';
import { Telescope, Rocket, Mail, Lock, User, ArrowRight, ShieldCheck, UserCheck, Download, Share, Smartphone } from 'lucide-react';
import { ApprovalStatus, UserRole } from '../types';

interface LoginProps {
  onLogin: (status: ApprovalStatus, role?: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState<ApprovalStatus | null>(null);
  
  // Lógica de Instalación PWA
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar si la app ya se está ejecutando como instalada
    const standalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Detectar si es un dispositivo iOS
    const ua = window.navigator.userAgent;
    const ios = !!ua.match(/iPad|iPhone|iPod/) && !(window as any).MSStream;
    setIsIOS(ios);

    // Capturar el evento de instalación para Android/Desktop Chrome
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('Evento beforeinstallprompt capturado');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert("Para instalar en iPhone/iPad:\n1. Toca el botón 'Compartir' (el icono del cuadrado con la flecha hacia arriba).\n2. Desliza hacia abajo y selecciona 'Añadir a pantalla de inicio'.");
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsStandalone(true);
      }
    } else {
      alert("Para instalar esta App:\n1. Toca los tres puntos de la esquina superior derecha del navegador.\n2. Busca la opción 'Instalar aplicación' o 'Añadir a pantalla de inicio'.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      setStatus(ApprovalStatus.PENDING);
    } else {
      onLogin(ApprovalStatus.APPROVED, UserRole.MEMBER);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    onLogin(ApprovalStatus.APPROVED, role);
  };

  if (status === ApprovalStatus.PENDING) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Rocket size={40} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-tighter">Solicitud Enviada</h2>
        <p className="text-slate-400 text-sm mb-8 font-medium">
          Tu registro está en revisión por la comisión directiva. 
        </p>
        <button onClick={() => setStatus(null)} className="text-blue-500 font-black text-xs uppercase tracking-widest">Volver</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-start py-12 px-6 relative overflow-hidden">
      {/* Sutil resplandor de fondo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-sm z-10 flex flex-col">
        {/* Header con Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-6">
            <Telescope size={42} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white text-center uppercase leading-none">
            AEA <span className="text-blue-500 italic">GESTIÓN</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-2 text-center font-black uppercase tracking-[0.3em] opacity-80">
            Observatorio Oro Verde
          </p>
        </div>

        {/* --- BLOQUE DE BOTONES PRINCIPALES --- */}
        <div className="flex flex-col gap-3.5 mb-10">
          {/* BOTÓN ADMIN */}
          <button 
            onClick={() => handleDemoLogin(UserRole.ADMIN)} 
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] hover:bg-slate-100 transition-all active:scale-95 shadow-xl"
          >
            <ShieldCheck size={18} />
            Acceso Administrador
          </button>

          {/* BOTÓN SOCIOS */}
          <button 
            onClick={() => handleDemoLogin(UserRole.MEMBER)} 
            className="w-full flex items-center justify-center gap-3 bg-[#161b22] border border-white/10 text-white py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] hover:bg-[#1c2128] transition-all active:scale-95"
          >
            <UserCheck size={18} className="text-blue-500" />
            Acceso Socios
          </button>

          {/* BOTÓN DESCARGAR LA APP (Siempre visible si no es standalone) */}
          {!isStandalone && (
            <button 
              onClick={handleInstallClick}
              className="w-full flex items-center justify-center gap-3 bg-[#1e293b]/40 border border-blue-500/30 text-blue-400 py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] hover:bg-blue-500/10 transition-all active:scale-95 mt-1"
            >
              {isIOS ? <Share size={18} /> : <Download size={18} />}
              Descargar la App
            </button>
          )}
        </div>

        {/* SEPARADOR */}
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="bg-[#0b0e14] px-4 text-slate-500">Acceso con cuenta</span>
          </div>
        </div>

        {/* FORMULARIO DE LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <div className="relative group">
            <Mail className="absolute left-5 top-4.5 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 outline-none focus:border-blue-500/50 transition-all text-sm text-white placeholder:text-slate-600 font-medium" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#1e293b] border border-blue-900/30 text-blue-400 font-black py-4.5 rounded-2xl flex items-center justify-center gap-2 group transition-all hover:bg-blue-600 hover:text-white text-[11px] uppercase tracking-[0.15em]"
          >
            ENTRAR
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* FOOTER ACCIÓN SECUNDARIA */}
        <div className="text-center pb-8">
          <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="text-slate-500 text-[11px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors underline-offset-4 decoration-2"
          >
            {isRegistering ? '¿Ya eres socio? Inicia sesión' : '¿Aún no eres socio? Solicita alta'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
