
import React, { useState } from 'react';
import { Users, MessageSquare, ChevronRight, Rocket, Star } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    { 
      id: '1', 
      title: 'Monitoreo de Asteroides', 
      abstract: 'Investigación sobre NEOs cercanos a la Tierra.', 
      goals: 'Identificar nuevos objetos y refinar sus órbitas.',
      members: 4,
      comments: 12
    },
    { 
      id: '2', 
      title: 'Catálogo Estelar del Sur', 
      abstract: 'Mapeo detallado de cúmulos abiertos en el hemisferio sur.', 
      goals: 'Publicar una base de datos abierta para la comunidad.',
      members: 3,
      comments: 5
    }
  ];

  if (selectedProject) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <button onClick={() => setSelectedProject(null)} className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 mb-4">
          <ChevronRight size={16} className="rotate-180" /> Volver
        </button>
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
            <Rocket size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">{selectedProject.title}</h2>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Resumen</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedProject.abstract}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Objetivos</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedProject.goals}</p>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="font-bold flex items-center gap-2 dark:text-white">
            <MessageSquare size={18} className="text-blue-400" />
            Discusión
          </h3>
          <div className="bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex gap-3 shadow-inner">
             <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold text-xs">SG</div>
             <div className="flex-1">
               <p className="text-[10px] text-slate-500 font-black mb-1 uppercase tracking-tighter">Dr. S. Galindo • 2h</p>
               <p className="text-sm dark:text-white">He subido los nuevos datos del sensor CCD a la carpeta compartida.</p>
             </div>
          </div>
          <div className="flex gap-2">
            <input type="text" className="flex-1 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 dark:text-white shadow-sm" placeholder="Escribe un comentario..." />
            <button className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/10 text-white active:scale-95 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Proyectos</h2>
        <button className="bg-blue-600/10 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-500/20 active:scale-95 transition-all">
          Proponer
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => (
          <div 
            key={proj.id} 
            onClick={() => setSelectedProject(proj)}
            className="bg-white dark:bg-[#161b22] p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg dark:text-white group-hover:text-blue-500 transition-colors">{proj.title}</h4>
              <Star size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-yellow-400 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">{proj.abstract}</p>
            <div className="flex items-center gap-4 border-t border-slate-50 dark:border-white/5 pt-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500 tracking-tighter">
                <Users size={14} className="text-blue-500" />
                {proj.members} miembros
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500 tracking-tighter">
                <MessageSquare size={14} className="text-blue-500" />
                {proj.comments} comentarios
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
