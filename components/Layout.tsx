
import React from 'react';
import { Home, Calendar, Users, MessageSquare, AlertCircle, Settings, LogOut, Sun, Moon, Eye, Star, Share2 } from 'lucide-react';
import { ThemeType } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string;
  theme: ThemeType;
  toggleTheme: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userRole, theme, toggleTheme, onLogout }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'sky', icon: Star, label: 'Cielo' },
    { id: 'activities', icon: Calendar, label: 'Agenda' },
    { id: 'projects', icon: Users, label: 'Proyectos' },
    { id: 'news', icon: AlertCircle, label: 'Novedades' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
  ];

  if (userRole === 'ADMIN' || userRole === 'SUPERUSER') {
    navItems.push({ id: 'admin', icon: Settings, label: 'Admin' });
  }

  const handleShare = async () => {
    const shareData = {
      title: 'AEA Observatorio - ' + activeTab.toUpperCase(),
      text: 'Mira lo que está pasando en el Observatorio AEA Oro Verde.',
      url: window.location.origin + window.location.pathname + '#' + activeTab,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Enlace a la sección ' + activeTab + ' copiado al portapapeles');
      }
    } catch (err) {
      console.log('Error compartiendo:', err);
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Moon size={22} className="text-slate-600" />;
    if (theme === 'dark') return <Eye size={22} className="text-red-600 animate-pulse" />;
    return <Sun size={22} className="text-yellow-500" />;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Pasar a Oscuro';
    if (theme === 'dark') return 'Pasar a Modo Observación (Rojo)';
    return 'Pasar a Modo Claro';
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 py-3 flex justify-between items-center transition-colors">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-xs font-bold text-white">AEA</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight dark:text-white">Observatorio</h1>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleShare}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
            title="Compartir esta sección"
          >
            <Share2 size={20} />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all flex items-center gap-2 border border-transparent active:scale-95"
            title={getThemeLabel()}
          >
            {getThemeIcon()}
          </button>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-24 p-4 overflow-y-auto max-w-lg mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#161b22]/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 px-2 py-3 z-50 transition-colors">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center flex-1 px-1 transition-all duration-200 ${
                  isActive ? 'text-blue-600 dark:text-blue-500 scale-110 font-bold' : 'text-slate-400 dark:text-slate-500 opacity-70'
                }`}
              >
                <Icon size={isActive ? 24 : 20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]' : ''} />
                <span className="text-[9px] mt-1 uppercase tracking-tighter">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
