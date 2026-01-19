
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Star, Binoculars, Sparkles, Loader2, Compass, ArrowDown, ArrowUp, Cloud, Wind, ExternalLink } from 'lucide-react';
import { getSkyData } from '../services/gemini';

const SkyToday: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await getSkyData();
      setData(res);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <div className="relative">
          <Loader2 size={48} className="text-blue-500 animate-spin" />
          <Star size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold dark:text-white">Consultando efemérides...</h3>
          <p className="text-sm text-slate-500">Sincronizando con Oro Verde, Entre Ríos</p>
        </div>
      </div>
    );
  }

  const windyUrl = "https://embed.windy.com/embed2.html?lat=-31.7416&lon=-60.5113&zoom=10&level=surface&overlay=clouds&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
          <Sparkles className="text-yellow-400" size={24} />
          Cielo de Hoy
        </h2>
        <div className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">
          <Compass size={12} className="text-blue-500" />
          Oro Verde
        </div>
      </div>

      {/* Sun & Moon Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-2 text-orange-500 mb-3">
            <Sun size={20} />
            <span className="text-[10px] font-black uppercase">Sol</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
               <span className="text-[10px] text-slate-400 flex items-center gap-1"><ArrowDown size={10} /> Puesta</span>
               <span className="text-xs font-bold dark:text-white">{data?.sunset || '--:--'}</span>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-[10px] text-slate-400 flex items-center gap-1"><ArrowUp size={10} /> Salida</span>
               <span className="text-xs font-bold dark:text-white">{data?.sunrise || '--:--'}</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Moon size={20} />
            <span className="text-[10px] font-black uppercase">Luna</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold dark:text-white">{data?.moon?.phase}</p>
            <p className="text-[10px] text-slate-400">Iluminación: {data?.moon?.illumination}</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN: CLIMA Y NUBOSIDAD (WINDY EMBED) */}
      <section className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
           <div className="flex items-center gap-2">
              <Cloud size={18} className="text-blue-500" />
              <h3 className="text-xs font-black uppercase tracking-widest dark:text-white">Radar de Nubosidad</h3>
           </div>
           <a 
             href="https://www.windy.com/-31.742/-60.511?clouds,-31.742,-60.511,10" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-1 text-[9px] font-bold text-blue-500 hover:text-blue-600 uppercase tracking-tighter"
           >
              Abrir Web <ExternalLink size={10} />
           </a>
        </div>
        
        <div className="relative aspect-video w-full bg-slate-900">
           {/* Widget de Windy Embed v2 - Más estable y compatible con móviles */}
           <iframe 
             width="100%" 
             height="100%" 
             src={windyUrl}
             frameBorder="0"
             className="absolute inset-0"
             title="Mapa Meteorológico Oro Verde"
             allowFullScreen
           />
           
           {/* Overlay sutil para indicar interactividad si el iframe tarda en cargar */}
           <div className="absolute bottom-2 right-2 pointer-events-none opacity-50">
             <div className="bg-black/80 px-2 py-1 rounded text-[8px] text-white font-bold uppercase">ECMWF Model</div>
           </div>
        </div>

        <div className="p-4 bg-slate-50/50 dark:bg-white/5 space-y-3">
           <div className="flex items-start gap-3">
              <Wind size={16} className="text-blue-400 mt-0.5 shrink-0" />
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug font-medium">
                Usa los controles del mapa para cambiar entre capas (Lluvia, Viento, Temperatura). 
                <strong> El mapa está centrado exactamente sobre el domo AEA.</strong>
              </p>
           </div>
        </div>
      </section>

      {/* Planets Section */}
      <section className="bg-blue-600/5 dark:bg-blue-500/5 border border-blue-500/10 p-5 rounded-3xl">
        <h3 className="text-xs font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-blue-600 dark:text-blue-400">
          <Binoculars size={16} />
          Planetas Visibles
        </h3>
        <div className="flex flex-wrap gap-2">
          {data?.planets?.map((p: string, i: number) => (
            <div key={i} className="bg-white dark:bg-[#0b0e14] border border-blue-200 dark:border-blue-900/50 px-4 py-2 rounded-xl text-xs font-bold shadow-sm dark:text-white">
              {p}
            </div>
          ))}
          {(!data?.planets || data?.planets.length === 0) && <p className="text-xs text-slate-500 italic">No hay planetas visibles destacados para esta sesión.</p>}
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h3 className="text-xs font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-500">
          <Star size={16} className="text-yellow-500" />
          Objetos de Cielo Profundo
        </h3>
        <div className="space-y-3">
          {data?.recommendations?.map((obj: any, i: number) => (
            <div key={i} className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-blue-500 transition-colors shadow-sm">
              <div>
                <h4 className="text-sm font-bold dark:text-white group-hover:text-blue-500 transition-colors">{obj.name}</h4>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{obj.type}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Star size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-[#161b22] dark:bg-black/60 border border-slate-800 p-4 rounded-2xl text-center">
        <p className="text-[10px] text-slate-400 leading-relaxed italic">
          "Datos meteorológicos provistos por Windy.com y efemérides astronómicas procesadas por Gemini AI para AEA."
        </p>
      </div>
    </div>
  );
};

export default SkyToday;
