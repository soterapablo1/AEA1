
import React, { useState, useEffect } from 'react';
import AttendanceTracker from '../components/AttendanceTracker';
import InstallBanner from '../components/InstallBanner';
import { Activity, Star, ChevronRight, Telescope, Download, Smartphone, Share, AlertTriangle, CheckCircle2, ShieldAlert, Clock, AlertCircle } from 'lucide-react';
import { formatDate } from '../utils';

interface HomeProps {
  reports: any[];
}

const Home: React.FC<HomeProps> = ({ reports }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Filtrar novedades activas (que no estén finalizadas)
  const activeReports = reports.filter(r => r.status !== 'Completed');

  // Lógica dinámica del estado del observatorio (solo considera reportes críticos ACTIVOS)
  const criticalReport = activeReports.find(r => r.priority === 'critical');
  const isOperational = !criticalReport;

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone;
    setIsStandalone(standalone);

    const ua = window.navigator.userAgent;
    const ios = !!ua.match(/iPad|iPhone|iPod/) && !(window as any).MSStream;
    setIsIOS(ios);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    if (ios && !standalone) setIsInstallable(true);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallAction = async () => {
    if (isIOS) {
      alert("En iPhone: Toca el botón 'Compartir' y selecciona 'Añadir a la pantalla de inicio'.");
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstallable(false);
    setDeferredPrompt(null);
  };

  return (
    <div className="space-y-6">
      <InstallBanner />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Hola, Astronom@
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Observatorio Oro Verde</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 p-0.5 shadow-md">
          <img src="https://picsum.photos/seed/astro/100" alt="Avatar" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>

      <AttendanceTracker />

      {/* SECCIÓN: ESTADO DEL OBSERVATORIO (Dinámico) */}
      <section className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm transition-all overflow-hidden relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            Estado del Sistema
          </h3>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg">
             <div className={`w-1.5 h-1.5 rounded-full ${isOperational ? 'bg-green-500' : 'bg-red-500 animate-ping'}`} />
             <span className="text-[9px] font-black text-slate-400 uppercase">Live Monitor</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl flex items-start gap-4 border transition-all ${
          isOperational 
            ? 'bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-400' 
            : 'bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400'
        }`}>
          <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isOperational ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {isOperational 
              ? <CheckCircle2 size={24} /> 
              : <AlertTriangle size={24} className="animate-bounce" />
            }
          </div>
          <div className="flex-1">
            <h4 className="font-black text-sm uppercase tracking-widest leading-none mb-1">
              {isOperational ? 'OPERATIVO' : 'NO OPERATIVO'}
            </h4>
            <p className={`text-xs font-bold leading-tight ${
              isOperational ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {isOperational 
                ? 'Todos los equipos están funcionando correctamente. Cielo despejado para observación.' 
                : (criticalReport?.title + ': ' + (criticalReport?.content?.substring(0, 60) || 'Falla instrumental crítica'))}
            </p>
          </div>
        </div>
      </section>

      {/* FEED DE NOVEDADES ACTIVAS */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
            <ShieldAlert size={18} className="text-red-500" />
            Últimas Novedades
          </h3>
          <button className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">Ver Historial</button>
        </div>
        
        <div className="space-y-3">
          {activeReports.length > 0 ? activeReports.slice(0, 3).map((report) => (
            <div key={report.id} className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center gap-4 group cursor-pointer hover:border-blue-500/30 transition-all shadow-sm">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                report.priority === 'critical' ? 'bg-red-500/10 text-red-500' :
                report.priority === 'high' ? 'bg-orange-500/10 text-orange-500' :
                'bg-blue-500/10 text-blue-500'
              }`}>
                <AlertCircle size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                   <h4 className="text-sm font-bold dark:text-white truncate">{report.title}</h4>
                   <span className={`text-[8px] font-black uppercase px-1 rounded border shrink-0 ${
                      report.priority === 'critical' ? 'border-red-500/30 text-red-500' : 'border-slate-200 dark:border-white/10 text-slate-400'
                   }`}>
                      {report.priority}
                   </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                   <Clock size={10} />
                   <span>{formatDate(report.createdAt)}</span>
                   <span className="opacity-50">•</span>
                   <span className="uppercase font-bold tracking-tighter text-blue-500/70">{report.status}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
            </div>
          )) : (
            <div className="bg-slate-100 dark:bg-white/5 p-8 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 text-center">
               <CheckCircle2 size={32} className="mx-auto mb-2 text-slate-400" />
               <p className="text-xs font-bold text-slate-500 uppercase">No hay novedades activas</p>
            </div>
          )}
        </div>
      </section>

      {/* Resumen Semanal */}
      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 dark:text-white">
          <Activity size={18} className="text-blue-500" />
          Métricas de Uso
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Visitas del Mes</p>
            <p className="text-2xl font-bold dark:text-white">42</p>
            <div className="h-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-blue-500 w-[65%]" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Incidencias</p>
            <p className="text-2xl font-bold dark:text-white">{activeReports.length}</p>
            <p className="text-[9px] text-slate-400 font-bold mt-2 uppercase">Activas ahora</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
