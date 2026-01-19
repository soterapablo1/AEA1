
import React from 'react';
/* Added Activity and ShieldCheck to the lucide-react imports to fix compilation errors */
import { ArrowLeft, Printer, Shield, Cpu, Layout, MapPin, Star, AlertCircle, MessageSquare, BookOpen, CheckCircle, Telescope, GraduationCap, Globe, Database, Smartphone, Calendar, Rocket, Eye, UserCheck, ShieldAlert, Share2, Settings, Activity, ShieldCheck } from 'lucide-react';

interface PDRReportProps {
  onBack: () => void;
}

const PDRReport: React.FC<PDRReportProps> = ({ onBack }) => {
  const printReport = () => window.print();

  return (
    <div className="bg-white text-slate-900 min-h-screen p-0 md:p-8 animate-in fade-in duration-500 print:p-0">
      {/* Controles de Navegación (No imprimibles) */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center print:hidden px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Volver al Panel Administrativo
        </button>
        <button 
          onClick={printReport}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
        >
          <Printer size={18} /> Descargar Documentación Completa (PDF)
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-8 md:p-16 shadow-2xl border border-slate-100 print:shadow-none print:border-none print:p-12">
        {/* Cabecera Institucional */}
        <header className="border-b-[12px] border-slate-900 pb-12 mb-16 relative">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-blue-600 font-black text-xs uppercase tracking-[0.4em]">Documentación Oficial Integral v2.5</p>
              <h1 className="text-6xl font-black text-slate-900 uppercase leading-[0.9]">AEA GESTIÓN</h1>
              <p className="text-2xl text-slate-500 font-light tracking-tight">Sistema Centralizado del Observatorio Oro Verde</p>
            </div>
            <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center text-white rotate-3">
              <Telescope size={48} />
            </div>
          </div>
          <div className="mt-12 flex justify-between items-end border-t border-slate-100 pt-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organismo</p>
              <p className="font-bold text-sm">Asociación Entrerriana de Astronomía</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documento Técnico</p>
              <p className="font-bold text-sm">PDR + Manual + Guía + Estrategia</p>
            </div>
          </div>
        </header>

        {/* PARTE 1: PDR (PRELIMINARY DESIGN REVIEW) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 text-white p-2 rounded-lg"><Cpu size={24} /></div>
            <h2 className="text-3xl font-black uppercase tracking-tight">I. Preliminary Design Review (PDR)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-black text-blue-600 uppercase text-xs tracking-widest">1.1 Visión del Proyecto</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                La digitalización de la AEA responde a la necesidad de profesionalizar el registro de datos y la coordinación de proyectos científicos. El sistema actúa como un middleware entre el hardware del observatorio (telescopios, sensores) y el factor humano (socios, investigadores).
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-tighter">Métricas de Diseño</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xl font-black text-slate-900">0.8s</p>
                    <p className="text-[9px] text-slate-500">Tiempo de carga promedio</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">99.9%</p>
                    <p className="text-[9px] text-slate-500">Uptime proyectado</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">1.2 Arquitectura Tecnológica</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <Database size={16} className="text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">Estado Persistente Atómico</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <Globe size={16} className="text-indigo-600" />
                  <span className="text-xs font-bold text-slate-700">Service Workers para Offline-Ready</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-cyan-50/50 rounded-xl border border-cyan-100">
                  <Smartphone size={16} className="text-cyan-600" />
                  <span className="text-xs font-bold text-slate-700">Optimización Mobile-First PWA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTE 2: MANUAL DE USUARIO EXTENSO */}
        <section className="mb-20 page-break-before">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 text-white p-2 rounded-lg"><BookOpen size={24} /></div>
            <h2 className="text-3xl font-black uppercase tracking-tight">II. Manual de Usuario Detallado</h2>
          </div>

          <div className="space-y-16">
            {/* 2.1 Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h4 className="font-black text-blue-600 text-xs uppercase tracking-widest mb-2">2.1 Pantalla Principal</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Gestión de presencia y resumen operativo.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg"><Activity size={18} className="text-blue-500" /></div>
                  <div>
                    <h5 className="font-bold text-sm">Asistencia con Geovallado</h5>
                    <p className="text-xs text-slate-600">Calcula la distancia al domo principal. Permite el "Fichaje Digital" solo si se detecta presencia física en el predio, garantizando la veracidad de los anuarios.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg"><Activity size={18} className="text-blue-500" /></div>
                  <div>
                    <h5 className="font-bold text-sm">Métricas de Actividad</h5>
                    <p className="text-xs text-slate-600">Visualización de visitas acumuladas y participación en eventos para el ranking de socios activos.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.2 SkyToday */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100 pt-8">
              <div className="md:col-span-1">
                <h4 className="font-black text-orange-600 text-xs uppercase tracking-widest mb-2">2.2 Cielo de Hoy (IA)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Asistente de observación en tiempo real.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-xs text-slate-700 leading-relaxed">
                  Utiliza <strong>Google Gemini</strong> para interpretar datos astronómicos brutos y transformarlos en recomendaciones legibles:
                </p>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-[10px] font-bold">Puesta/Salida de Sol y Luna</li>
                  <li className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-[10px] font-bold">Planetas Visibles del Día</li>
                  <li className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-[10px] font-bold">Objetos de Cielo Profundo (IA)</li>
                  <li className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-[10px] font-bold">Seeing y Condiciones Locales</li>
                </ul>
              </div>
            </div>

            {/* 2.3 Agenda */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100 pt-8">
              <div className="md:col-span-1">
                <h4 className="font-black text-emerald-600 text-xs uppercase tracking-widest mb-2">2.3 Agenda y Actividades</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Coordinación de talleres y turnos.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-xs text-slate-700">El módulo permite:</p>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center text-xs">
                    <Calendar size={14} className="text-emerald-500" />
                    <span><strong>Solicitud de Eventos:</strong> Los socios pueden proponer talleres, mantenimiento o charlas públicas.</span>
                  </div>
                  <div className="flex gap-2 items-center text-xs">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span><strong>Validación Administrativa:</strong> Cada actividad requiere aprobación para evitar superposición de recursos.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.4 Projects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100 pt-8">
              <div className="md:col-span-1">
                <h4 className="font-black text-indigo-600 text-xs uppercase tracking-widest mb-2">2.4 Centro de Proyectos</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Investigación científica colaborativa.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="bg-indigo-900 text-white p-6 rounded-3xl">
                  <h5 className="font-bold text-sm mb-3">Flujo de Colaboración:</h5>
                  <div className="grid grid-cols-1 gap-4 text-[10px]">
                    <div className="flex gap-3 items-center border-b border-white/10 pb-2">
                      <Rocket size={14} className="text-indigo-400" />
                      <span><strong>Propuesta:</strong> Idea de investigación abierta a la comunidad.</span>
                    </div>
                    <div className="flex gap-3 items-center border-b border-white/10 pb-2">
                      <MessageSquare size={14} className="text-indigo-400" />
                      <span><strong>Discusión:</strong> Foro interno por proyecto para hilos técnicos.</span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Star size={14} className="text-indigo-400" />
                      <span><strong>Repositorio:</strong> Enlace a datos y resultados compartidos.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.5 News */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100 pt-8">
              <div className="md:col-span-1">
                <h4 className="font-black text-red-600 text-xs uppercase tracking-widest mb-2">2.5 Incidentes y Novedades</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Gestión de riesgos instrumental.</p>
              </div>
              <div className="md:col-span-2">
                <div className="border border-red-100 bg-red-50/30 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-red-600">
                    <ShieldAlert size={16} />
                    <span className="font-black text-[10px] uppercase">Clasificación por IA</span>
                  </div>
                  <p className="text-xs text-slate-700 italic">"La IA Gemini procesa el texto del reporte y asigna una prioridad instantánea para alertar a mantenimiento."</p>
                  <div className="flex justify-between text-[9px] font-bold text-slate-400 px-2 uppercase">
                    <span>Critical</span>
                    <span>High</span>
                    <span>Medium</span>
                    <span>Low</span>
                  </div>
                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2.6 Chat & Admin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-100 pt-8">
              <div className="space-y-4">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2"><MessageSquare size={14} className="text-blue-500" /> 2.6 Comunicación Real</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chat general con estados de presencia. Ideal para coordinar "viajes compartidos" al observatorio o avisar sobre cambios climáticos repentinos en la zona de Oro Verde.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2"><Settings size={14} className="text-slate-500" /> 2.7 Control Administrativo</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Panel exclusivo para la comisión. Gestión de usuarios (Aprobación/Rechazo), generación de reportes PDR y acceso a estadísticas de uso del ecosistema.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PARTE 3: GUÍA PASO A PASO */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-600 text-white p-2 rounded-lg"><CheckCircle size={24} /></div>
            <h2 className="text-3xl font-black uppercase tracking-tight">III. Guía de Inicio Rápido</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-slate-100 rounded-3xl space-y-4">
              <p className="text-xs font-black text-emerald-600 uppercase">Paso 1: Acceso</p>
              <h5 className="font-bold text-sm">Registro de Socio</h5>
              <p className="text-[11px] text-slate-500">Regístrese con su mail oficial. Espere la aprobación de la Comisión Directiva (Estado: PENDING).</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-3xl space-y-4">
              <p className="text-xs font-black text-emerald-600 uppercase">Paso 2: Campo</p>
              <h5 className="font-bold text-sm">Llegada al Predio</h5>
              <p className="text-[11px] text-slate-500">Al llegar, verifique que el GPS esté activo. El sistema mostrará "En Rango". Pulse "Marcar Asistencia".</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-3xl space-y-4">
              <p className="text-xs font-black text-emerald-600 uppercase">Paso 3: Operación</p>
              <h5 className="font-bold text-sm">Modo de Luz Roja</h5>
              <p className="text-[11px] text-slate-500">En el domo, use el botón del <Eye size={12} className="inline" /> para evitar el deslumbramiento de sus compañeros.</p>
            </div>
          </div>
        </section>

        {/* PARTE 4: EL ECOSISTEMA DIDÁCTICO */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-600 text-white p-2 rounded-lg"><GraduationCap size={24} /></div>
            <h2 className="text-3xl font-black uppercase tracking-tight">IV. Ecosistema Didáctico (Fase 2)</h2>
          </div>
          
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <h3 className="text-2xl font-black mb-4">Hacia la Academia AEA</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                El futuro de la plataforma integra el <strong>Aula Virtual</strong>. Un espacio donde socios nuevos podrán acceder a tutoriales de colimación, manejo de monturas EQ6-R y procesado de imágenes con PixInsight, todo certificado por la Asociación.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest">Tutoriales Interactivos</div>
                <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest">Certificaciones Digitales</div>
              </div>
            </div>
            <div className="absolute top-[-10%] right-[-10%] opacity-10 rotate-12">
              <Share2 size={300} />
            </div>
          </div>
        </section>

        {/* Cierre y Firma */}
        <footer className="mt-32 pt-12 border-t-2 border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-slate-400">
            <Smartphone size={32} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Arquitectura de Software</p>
              <p className="text-sm font-bold text-slate-900 italic">Advanced React & Gemini Engine</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs font-bold text-slate-400 uppercase mb-4">Validación Institucional</p>
            <div className="flex items-center justify-end gap-2 text-green-600">
              <CheckCircle size={16} />
              <span className="font-black text-xs uppercase tracking-tighter italic">Documento Oficial AEA - Comisión Directiva</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PDRReport;
