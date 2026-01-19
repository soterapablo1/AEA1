
import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, CheckCircle2, Clock } from 'lucide-react';
import { OBSERVATORY_LOCATION } from '../constants';
import { calculateDistance } from '../utils';

const AttendanceTracker: React.FC = () => {
  const [distance, setDistance] = useState<number | null>(null);
  const [isInside, setIsInside] = useState(false);
  const [timer, setTimer] = useState(0); 
  const [hasAutoCheckedIn, setHasAutoCheckedIn] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  const checkPosition = useCallback(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = calculateDistance(
          pos.coords.latitude,
          pos.coords.longitude,
          OBSERVATORY_LOCATION.lat,
          OBSERVATORY_LOCATION.lng
        );
        setDistance(dist);
        setIsInside(dist <= OBSERVATORY_LOCATION.radiusMeters);
      },
      (err) => {
        console.error("Location error", err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    checkPosition();
    const interval = setInterval(checkPosition, 10000);
    return () => clearInterval(interval);
  }, [checkPosition]);

  useEffect(() => {
    let interval: any;
    if (isInside) {
      interval = setInterval(() => {
        setTimer(prev => {
          const next = prev + 1;
          if (next >= 1200 && !hasAutoCheckedIn) {
            setHasAutoCheckedIn(true);
            addLog("Entrada automática registrada");
          }
          return next;
        });
      }, 1000);
    } else {
      if (hasAutoCheckedIn) {
        setHasAutoCheckedIn(false);
        addLog("Salida automática registrada");
      }
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isInside, hasAutoCheckedIn]);

  const handleManualCheckIn = () => {
    if (isInside) {
      setHasAutoCheckedIn(true);
      addLog("Asistencia manual registrada");
    } else {
      alert("No estás en el rango del observatorio.");
    }
  };

  return (
    <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/10 rounded-2xl p-5 mb-6 shadow-sm transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 dark:text-white transition-colors">
          <MapPin size={20} className="text-blue-500" />
          Ubicación
        </h3>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
          isInside ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
        }`}>
          {isInside ? 'En rango' : 'Fuera'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400 transition-colors">Distancia:</span>
          <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
            {distance !== null ? `${Math.round(distance)}m` : '...'}
          </span>
        </div>

        {isInside && (
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-500/10 p-3 rounded-xl border border-blue-100 dark:border-blue-500/20 transition-colors">
            <Clock className="text-blue-500 dark:text-blue-400" size={18} />
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 dark:text-slate-300 font-bold uppercase">Permanencia</p>
              <p className="text-sm font-bold dark:text-white transition-colors">
                {Math.floor(timer / 60)}m {timer % 60}s
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-blue-200 dark:border-blue-500/30 border-t-blue-500 animate-spin flex items-center justify-center transition-colors">
               <span className="text-[10px] animate-none text-blue-600 dark:text-blue-400 font-bold">{Math.round((timer/1200)*100)}%</span>
            </div>
          </div>
        )}

        <button
          onClick={handleManualCheckIn}
          disabled={!isInside || hasAutoCheckedIn}
          className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
            hasAutoCheckedIn 
              ? 'bg-green-600 text-white' 
              : isInside 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
          }`}
        >
          {hasAutoCheckedIn ? <CheckCircle2 size={20} /> : <Clock size={20} />}
          {hasAutoCheckedIn ? 'Registrada' : 'Marcar Asistencia'}
        </button>

        {logs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
             <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase transition-colors">Historial</p>
             {logs.map((log, i) => (
               <div key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 transition-colors">
                 <div className="w-1 h-1 rounded-full bg-blue-500" />
                 {log}
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
