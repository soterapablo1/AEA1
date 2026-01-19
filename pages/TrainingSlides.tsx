
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X, Star, MapPin, Eye, Zap, MessageSquare, Telescope, GraduationCap, ShieldCheck, Heart } from 'lucide-react';

interface TrainingSlidesProps {
  onClose: () => void;
}

const slides = [
  {
    title: "Bienvenido a AEA Gestión",
    subtitle: "Nuestra nueva casa digital",
    content: "Esta herramienta ha sido creada por socios, para socios. Su misión es facilitar nuestra labor astronómica y científica en Oro Verde.",
    icon: <Telescope className="text-white" size={64} />,
    color: "bg-blue-600",
    detail: "Misión: Profesionalizar la gestión de nuestro observatorio."
  },
  {
    title: "Seguridad y Cuentas",
    subtitle: "Tu identidad como socio",
    content: "Cada cuenta es personal. Al registrarte, la comisión directiva valida tu membresía para habilitar el acceso a las funciones críticas.",
    icon: <ShieldCheck className="text-white" size={64} />,
    color: "bg-indigo-600",
    detail: "Estado PENDING: Revisión de datos por secretaría."
  },
  {
    title: "Asistencia Paso a Paso",
    subtitle: "Geolocalización con GPS",
    content: "Al llegar al predio, activa tu ubicación. El sistema detectará automáticamente si estás en el rango y te permitirá fichar tu entrada.",
    icon: <MapPin className="text-white" size={64} />,
    color: "bg-emerald-600",
    detail: "Importante: Debes estar a menos de 100m del domo principal."
  },
  {
    title: "Modo Observación",
    subtitle: "La ética del observador",
    content: "Presiona el ícono del ojo para activar la luz roja. Esto es vital para no deslumbrar y permitir que el ojo humano mantenga su sensibilidad nocturna.",
    icon: <Eye className="text-white" size={64} />,
    color: "bg-red-800",
    detail: "Protocolo: Luz roja obligatoria en el área de telescopios."
  },
  {
    title: "IA Astronómica",
    subtitle: "Efemérides con Gemini",
    content: "La pestaña 'Cielo' usa Inteligencia Artificial para decirte qué objetos observar hoy basándose en las condiciones locales de Entre Ríos.",
    icon: <Star className="text-white" size={64} />,
    color: "bg-slate-900",
    detail: "Gemini AI: Tu asistente astronómico personal."
  },
  {
    title: "Hacia el Ecosistema",
    subtitle: "Material Didáctico y Futuro",
    content: "Estamos construyendo un repositorio didáctico. Muy pronto podrás acceder a guías, cursos y material educativo directamente desde aquí.",
    icon: <GraduationCap className="text-white" size={64} />,
    color: "bg-orange-600",
    detail: "Próxima Fase: El Aula Virtual de la AEA."
  },
  {
    title: "¡Empecemos!",
    subtitle: "Unidos por el cielo",
    content: "Gracias por ser parte de esta evolución. Explora la app, reporta tus novedades y disfrutemos juntos de la astronomía.",
    icon: <Heart className="text-white" size={64} />,
    color: "bg-pink-600",
    detail: "Software oficial de la Asociación Entrerriana de Astronomía."
  }
];

const TrainingSlides: React.FC<TrainingSlidesProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prev = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const s = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-5xl aspect-[16/9] bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col md:flex-row">
        {/* Panel Izquierdo (Visual) */}
        <div className={`w-full md:w-2/5 ${s.color} flex flex-col items-center justify-center p-12 transition-all duration-700 ease-in-out relative overflow-hidden`}>
           <div className="p-10 bg-black/20 rounded-[2rem] backdrop-blur-xl border border-white/10 z-10 shadow-2xl scale-110">
              {s.icon}
           </div>
           <div className="mt-8 text-center z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Technical Insight</p>
              <p className="text-xs font-bold leading-relaxed max-w-[200px]">{s.detail}</p>
           </div>
           {/* Decoraciones de fondo */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-white rounded-full blur-[80px]" />
           </div>
        </div>

        {/* Panel Derecho (Contenido) */}
        <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center bg-gradient-to-br from-[#111] to-[#050505]">
          <div className="flex items-center gap-2 mb-6">
             {Array.from({length: slides.length}).map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/10'}`} />
             ))}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-2 leading-none tracking-tighter">{s.title}</h2>
          <h3 className="text-xl md:text-2xl text-blue-400 font-bold mb-8 italic">{s.subtitle}</h3>
          
          <div className="relative">
             <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500/50 to-transparent rounded-full" />
             <p className="text-lg md:text-xl text-slate-300 leading-relaxed pl-6 font-medium">
                {s.content}
             </p>
          </div>

          <div className="mt-16 flex items-center gap-4">
            <button 
              onClick={prev}
              disabled={currentSlide === 0}
              className="p-5 bg-white/5 hover:bg-white/10 disabled:opacity-10 rounded-2xl transition-all active:scale-95 border border-white/5"
            >
              <ArrowLeft size={28} />
            </button>
            <button 
              onClick={currentSlide === slides.length - 1 ? onClose : next}
              className={`flex-1 p-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl ${
                 currentSlide === slides.length - 1 ? 'bg-pink-600 hover:bg-pink-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {currentSlide === slides.length - 1 ? "Comenzar ahora" : "Continuar"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-6 opacity-20">
         <p className="text-[10px] uppercase font-black tracking-[0.8em]">Asociación Entrerriana de Astronomía • Capacitación 2024</p>
      </div>
    </div>
  );
};

export default TrainingSlides;
