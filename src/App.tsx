import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import MobileTabBar from './components/layout/MobileTabBar';
import StudentDashboard from './pages/StudentDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PersonaSwitcherModal from './components/common/PersonaSwitcherModal';
import { Sparkles, Users, Utensils, Shield } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { role, currentStudent, currentRestaurant } = useApp();
  const [studentActiveTab, setStudentActiveTab] = useState('discover');
  const [showPersonaSwitcher, setShowPersonaSwitcher] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-900 selection:bg-jiffy-500 selection:text-white pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar
        activeTab={studentActiveTab}
        setActiveTab={setStudentActiveTab}
      />

      {/* Main Dynamic View Based on Active Role */}
      <main className="flex-1">
        {role === 'student' && (
          <StudentDashboard
            activeTab={studentActiveTab}
            setActiveTab={setStudentActiveTab}
          />
        )}

        {role === 'restaurant' && <RestaurantDashboard />}

        {role === 'admin' && <AdminDashboard />}
      </main>

      {/* Mobile Bottom Tab Bar (Visible only when in Student Role) */}
      {role === 'student' && (
        <MobileTabBar
          activeTab={studentActiveTab}
          setActiveTab={setStudentActiveTab}
        />
      )}

      {/* Floating Quick Role Switcher Trigger (Helpful across all viewports) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
        <button
          onClick={() => setShowPersonaSwitcher(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold shadow-2xl backdrop-blur-md border border-white/20 transition transform hover:scale-105"
        >
          <div className="w-2 h-2 rounded-full bg-jiffy-500 animate-ping" />
          <span>Role: {role.toUpperCase()}</span>
          <span className="text-[10px] text-slate-400">⇄</span>
        </button>
      </div>

      {/* Persona Switcher Modal */}
      {showPersonaSwitcher && (
        <PersonaSwitcherModal onClose={() => setShowPersonaSwitcher(false)} />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
