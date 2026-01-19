
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Projects from './pages/Projects';
import News from './pages/News';
import Admin from './pages/Admin';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SkyToday from './pages/SkyToday';
import PDRReport from './pages/PDRReport';
import TrainingSlides from './pages/TrainingSlides';
import { UserRole, ApprovalStatus, NewsReport } from './types';

export type ThemeType = 'light' | 'dark' | 'red';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('aea_session_active') === 'true';
  });
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('aea_session_role') as UserRole) || UserRole.MEMBER;
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'activities', 'projects', 'news', 'chat', 'sky', 'admin'].includes(hash) ? hash : 'home';
  });
  
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [showPDR, setShowPDR] = useState(false);
  const [showTraining, setShowTraining] = useState(false);

  // Estado compartido de novedades
  const [reports, setReports] = useState<any[]>(() => {
    const saved = localStorage.getItem('aea_reports');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Falla en el motor del Domo', priority: 'critical', createdAt: new Date().toISOString(), status: 'In Progress', content: 'El motor de declinación no responde a los comandos del software.' },
      { id: '2', title: 'Limpieza de oculares', priority: 'low', createdAt: new Date().toISOString(), status: 'Completed', content: 'Se realizó limpieza preventiva.' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('aea_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'activities', 'projects', 'news', 'chat', 'sky', 'admin'];
      if (hash && validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'red');
    if (!showPDR && !showTraining) {
      root.classList.add(theme);
    } else {
      root.classList.add('light'); 
    }
  }, [theme, showPDR, showTraining]);

  const handleLogin = (status: ApprovalStatus, role: UserRole = UserRole.MEMBER) => {
    if (status === ApprovalStatus.APPROVED) {
      setUserRole(role);
      setIsLoggedIn(true);
      localStorage.setItem('aea_session_active', 'true');
      localStorage.setItem('aea_session_role', role);
      if (!window.location.hash) window.location.hash = activeTab;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('aea_session_active');
    localStorage.removeItem('aea_session_role');
    window.location.hash = 'home';
  };

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'red';
      return 'light';
    });
  };

  const changeTab = (tab: string) => {
    window.location.hash = tab;
    setActiveTab(tab);
    setShowPDR(false);
    setShowTraining(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showPDR) {
    return <PDRReport onBack={() => setShowPDR(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home reports={reports} />;
      case 'activities': return <Activities />;
      case 'projects': return <Projects />;
      case 'news': return <News reports={reports} setReports={setReports} userRole={userRole} />;
      case 'chat': return <Chat />;
      case 'sky': return <SkyToday />;
      case 'admin': return (
        <Admin 
          onOpenPDR={() => setShowPDR(true)} 
          onOpenTraining={() => setShowTraining(true)} 
        />
      );
      default: return <Home reports={reports} />;
    }
  };

  return (
    <>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={changeTab} 
        userRole={userRole} 
        theme={theme} 
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
      >
        {renderContent()}
      </Layout>
      {showTraining && <TrainingSlides onClose={() => setShowTraining(false)} />}
    </>
  );
};

export default App;
