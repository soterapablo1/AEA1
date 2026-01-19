
import React, { useState } from 'react';
import { AlertCircle, ShieldAlert, Sparkles, Send, Edit2, Trash2, CheckSquare, Save, Clock, ChevronRight } from 'lucide-react';
import { analyzeNewsPriority } from '../services/gemini';
import { UserRole } from '../types';

interface NewsProps {
  reports: any[];
  setReports: React.Dispatch<React.SetStateAction<any[]>>;
  userRole: UserRole;
}

const News: React.FC<NewsProps> = ({ reports, setReports, userRole }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Estado para edición administrativa
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editPriority, setEditPriority] = useState<string>('');

  const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.SUPERUSER;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !title) return;

    setIsAnalyzing(true);
    const priority = await analyzeNewsPriority(`${title}: ${content}`);
    
    const newReport = {
      id: Date.now().toString(),
      title,
      content,
      priority,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };

    setReports([newReport, ...reports]);
    setTitle('');
    setContent('');
    setIsAnalyzing(false);
  };

  const startEdit = (report: any) => {
    setEditingId(report.id);
    setEditTitle(report.title);
    setEditContent(report.content);
    setEditPriority(report.priority);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id: string) => {
    setReports(prev => prev.map(r => 
      r.id === id 
        ? { ...r, title: editTitle, content: editContent, priority: editPriority }
        : r
    ));
    setEditingId(null);
  };

  const toggleStatus = (id: string) => {
    setReports(prev => prev.map(r => {
      if (r.id === id) {
        // Al marcar como Completed, desaparece del Home pero sigue aquí.
        return { ...r, status: r.status === 'Completed' ? 'Pending' : 'Completed' };
      }
      return r;
    }));
  };

  const deleteReport = (id: string) => {
    if (window.confirm('¿Eliminar este reporte permanentemente del historial?')) {
      setReports(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Novedades e Incidentes</h2>

      {/* Formulario de Reporte */}
      <div className="bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm transition-all">
        <h3 className="font-semibold mb-4 text-xs flex items-center gap-2 dark:text-white uppercase tracking-wider">
          <AlertCircle size={18} className="text-blue-500" />
          Reportar Nueva Novedad
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-blue-500 dark:text-white transition-all font-medium" 
            placeholder="Título del reporte..." 
          />
          <textarea 
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-blue-500 resize-none dark:text-white transition-all font-medium" 
            placeholder="Describe lo sucedido (ej. Falla en seguimiento, falta de limpieza, etc.)" 
          />
          <button 
            type="submit" 
            disabled={isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            {isAnalyzing ? <Sparkles className="animate-pulse" size={18} /> : <Send size={18} />}
            {isAnalyzing ? 'Analizando gravedad...' : 'Enviar Reporte Oficial'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Historial del Observatorio</h3>
          <span className="text-[9px] font-bold text-slate-400">TOTAL: {reports.length}</span>
        </div>
        
        {reports.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#161b22] rounded-3xl border border-dashed border-slate-200 dark:border-white/5">
             <Clock size={32} className="mx-auto text-slate-300 mb-2" />
             <p className="text-slate-500 text-xs font-bold uppercase">No hay reportes registrados.</p>
          </div>
        )}

        {reports.map((report) => (
          <div key={report.id} className={`bg-white dark:bg-[#161b22] border rounded-2xl p-4 shadow-sm transition-all relative overflow-hidden group ${
            report.status === 'Completed' 
              ? 'opacity-60 grayscale border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20' 
              : 'border-slate-200 dark:border-white/10'
          }`}>
            {editingId === report.id ? (
              // VISTA DE EDICIÓN (ADMIN)
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Edit2 size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Editando Reporte</span>
                </div>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-black/40 p-3 rounded-xl text-sm font-bold dark:text-white border border-blue-500/30 outline-none"
                />
                <textarea 
                  value={editContent} 
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-black/40 p-3 rounded-xl text-xs dark:text-slate-300 border border-blue-500/30 outline-none resize-none"
                  rows={3}
                />
                <select 
                  value={editPriority} 
                  onChange={(e) => setEditPriority(e.target.value as any)}
                  className="w-full bg-slate-100 dark:bg-black/40 p-3 rounded-xl text-xs font-bold dark:text-white border border-blue-500/30 outline-none appearance-none"
                >
                  <option value="low">Prioridad: Baja</option>
                  <option value="medium">Prioridad: Media</option>
                  <option value="high">Prioridad: Alta</option>
                  <option value="critical">Prioridad: Crítica</option>
                </select>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => saveEdit(report.id)} className="flex-1 bg-green-600 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md active:scale-95">
                    <Save size={14} /> Guardar Cambios
                  </button>
                  <button onClick={cancelEdit} className="flex-1 bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest active:scale-95">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              // VISTA DE VISUALIZACIÓN
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  report.priority === 'critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                  report.priority === 'high' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                  'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                }`}>
                  <ShieldAlert size={22} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1.5">
                    <h4 className="text-sm font-bold dark:text-white truncate pr-2 group-hover:text-blue-500 transition-colors">{report.title}</h4>
                    <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border shrink-0 ${
                      report.priority === 'critical' ? 'border-red-500/30 text-red-500 bg-red-500/5 animate-pulse' :
                      report.priority === 'high' ? 'border-orange-500/30 text-orange-500' :
                      'border-blue-500/30 text-blue-500'
                    }`}>
                      {report.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    {report.content}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-50 dark:border-white/5 pt-3">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${report.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`} />
                       <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                          {new Date(report.createdAt).toLocaleDateString()} • {report.status === 'Completed' ? 'RESOLVIDO' : 'EN CURSO'}
                       </span>
                    </div>
                    
                    {/* Acciones de Admin */}
                    {isAdmin && (
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => toggleStatus(report.id)}
                          title={report.status === 'Completed' ? 'Re-activar' : 'Marcar como finalizado'}
                          className={`p-2 rounded-xl transition-all shadow-sm ${
                            report.status === 'Completed' 
                              ? 'bg-blue-600/10 text-blue-600 hover:bg-blue-600/20' 
                              : 'bg-green-600/10 text-green-600 hover:bg-green-600/20'
                          }`}
                        >
                          <CheckSquare size={16} />
                        </button>
                        <button 
                          onClick={() => startEdit(report)}
                          className="p-2 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-blue-500 rounded-xl transition-all shadow-sm"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteReport(report.id)}
                          className="p-2 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-red-500 rounded-xl transition-all shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Ribbon de Estado Finalizado */}
            {report.status === 'Completed' && (
               <div className="absolute top-0 right-0 p-1">
                  <div className="bg-green-600/10 text-green-600 px-2 py-0.5 rounded-bl-xl text-[7px] font-black uppercase tracking-[0.2em] border-l border-b border-green-600/20">Archivado</div>
               </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
        <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic text-center">
          "Los reportes marcados como 'Finalizados' se ocultan del panel de inicio pero permanecen en este historial oficial para auditoría y registro de mantenimiento."
        </p>
      </div>
    </div>
  );
};

export default News;
