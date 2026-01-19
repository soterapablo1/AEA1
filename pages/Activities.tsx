
import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin } from 'lucide-react';
import { formatDate } from '../utils';

const Activities: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const activities = [
    { id: '1', title: 'Taller de Astrofotografía', status: 'approved', date: '2024-05-20T20:00:00Z', location: 'Aula Magna' },
    { id: '2', title: 'Mantenimiento del Telescopio', status: 'pending', date: '2024-05-22T15:00:00Z', location: 'Observatorio' },
    { id: '3', title: 'Charla Pública: Marte 2024', status: 'approved', date: '2024-05-25T19:00:00Z', location: 'Salón de Eventos' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Agenda</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-blue-500/30 rounded-2xl p-5 animate-in slide-in-from-top-4">
          <h3 className="font-semibold mb-4 text-blue-600 dark:text-blue-400">Solicitar Actividad</h3>
          <form className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-bold uppercase">Título</label>
              <input type="text" className="w-full bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-blue-500 outline-none dark:text-white" placeholder="Nombre de la actividad" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-bold uppercase">Fecha</label>
                <input type="date" className="w-full bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-blue-500 outline-none dark:text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-bold uppercase">Hora</label>
                <input type="time" className="w-full bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-blue-500 outline-none dark:text-white" />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/10">
              Enviar Solicitud
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/5 rounded-2xl p-4 hover:border-blue-500/30 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                act.status === 'approved' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
              }`}>
                {act.status === 'approved' ? 'Aprobada' : 'Pendiente'}
              </span>
              <Clock size={16} className="text-slate-400" />
            </div>
            <h4 className="font-bold text-lg mb-3 dark:text-white">{act.title}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Calendar size={14} className="text-blue-500" />
                {formatDate(act.date)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin size={14} className="text-red-500" />
                {act.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
