
import React, { useState } from 'react';
import { Users as UsersIcon, FileText as FileTextIcon, Check as CheckIcon, X as XIcon, ShieldCheck as ShieldIcon, Download as DownloadIcon, Loader2 as LoaderIcon, BookOpen as BookIcon, Printer as PrinterIcon, Presentation as PresentationIcon, UserPlus, Trash2 } from 'lucide-react';

interface AdminProps {
  onOpenPDR: () => void;
  onOpenTraining: () => void;
}

const Admin: React.FC<AdminProps> = ({ onOpenPDR, onOpenTraining }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'reports'>('users');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Reporte de actividad generado con éxito y listo para descargar.");
    }, 2000);
  };

  const pendingUsers = [
    { id: '1', name: 'Julián Rodriguez', email: 'j.rodriguez@gmail.com', date: '2024-05-15' },
    { id: '2', name: 'Marta Gomez', email: 'marta.g@astro.org', date: '2024-05-17' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/5 pb-2">
        <button 
          onClick={() => setActiveTab('users')}
          className={`text-sm font-bold pb-2 transition-all ${activeTab === 'users' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500'}`}
        >
          Usuarios
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`text-sm font-bold pb-2 transition-all ${activeTab === 'reports' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500'}`}
        >
          Gestión y Reportes
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Solicitudes de Alta</h3>
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold">{pendingUsers.length} PENDIENTES</span>
          </div>
          
          <div className="space-y-3">
            {pendingUsers.map(user => (
              <div key={user.id} className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/5 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500">
                    <UserPlus size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold dark:text-white">{user.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-green-500/10 text-green-600 rounded-xl hover:bg-green-500/20 transition-colors" title="Aprobar">
                    <CheckIcon size={18} />
                  </button>
                  <button className="p-2 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-colors" title="Rechazar">
                    <XIcon size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 px-1 mb-4">Acciones Globales</h3>
            <button className="w-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-transparent">
              <UsersIcon size={18} />
              Ver Base Completa de Socios
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 px-1">Documentación y Capacitación</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={onOpenPDR}
              className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/5 p-5 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-blue-500/40 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <PrinterIcon size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm dark:text-white">Documento PDR Integral</h4>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Vista técnica y manual de usuario</p>
              </div>
              <ShieldIcon size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </button>

            <button 
              onClick={onOpenTraining}
              className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/5 p-5 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-indigo-500/40 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                <PresentationIcon size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm dark:text-white">Capacitación de Socios</h4>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Guía interactiva de inducción</p>
              </div>
              <BookIcon size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" />
            </button>

            <div className="mt-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 px-1 mb-4">Herramientas de Comisión</h3>
               <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${
                  isGenerating 
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                }`}
              >
                {isGenerating ? <LoaderIcon className="animate-spin" size={18} /> : <DownloadIcon size={18} />}
                {isGenerating ? 'Generando Excel...' : 'Exportar Anuario de Asistencia'}
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
             <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                <FileTextIcon size={16} />
                <h5 className="text-[10px] font-black uppercase tracking-widest">Aviso de Seguridad</h5>
             </div>
             <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Recuerde que todas las acciones realizadas en este panel quedan registradas en el log de auditoría del sistema para garantizar la transparencia de la AEA.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
