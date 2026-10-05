import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MapPin, RefreshCw, UserCheck, Shield, Utensils, Award } from 'lucide-react';
import PersonaSwitcherModal from '../common/PersonaSwitcherModal';

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { role, currentStudent, currentRestaurant, activeCity, setActiveCity, resetDemoData } = useApp();
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);

  const getRoleBadge = () => {
    switch (role) {
      case 'student':
        return {
          label: 'Student Creator',
          icon: <Award className="w-3.5 h-3.5 text-jiffy-500" />,
          color: 'bg-jiffy-50 text-jiffy-700 border-jiffy-200',
          subtitle: currentStudent.name,
          subinfo: `${(currentStudent.followersCount / 1000).toFixed(1)}k followers`,
          avatar: currentStudent.avatarUrl,
        };
      case 'restaurant':
        return {
          label: 'Restaurant Partner',
          icon: <Utensils className="w-3.5 h-3.5 text-emerald-600" />,
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          subtitle: currentRestaurant.brandName,
          subinfo: currentRestaurant.neighborhood,
          avatar: currentRestaurant.logoUrl,
        };
      case 'admin':
        return {
          label: 'Super Admin',
          icon: <Shield className="w-3.5 h-3.5 text-amber-600" />,
          color: 'bg-amber-50 text-amber-800 border-amber-200',
          subtitle: 'Jiffy Platform Ops',
          subinfo: 'KYC & Payouts',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        };
    }
  };

  const badge = getRoleBadge();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Logo & Tagline */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab && setActiveTab('discover')}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-jiffy-600 via-jiffy-500 to-amber-400 flex items-center justify-center text-white shadow-glow transform group-hover:scale-105 transition-transform duration-200">
                  <span className="text-xl font-black tracking-tighter">⚡</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-display">
                      JIFFY
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-jiffy-500/10 text-jiffy-600">
                      MVP
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                    Eat. Create. Get Paid.
                  </p>
                </div>
              </div>

              {/* City Pill */}
              <div className="relative ml-2 sm:ml-4">
                <button
                  onClick={() => setCityDropdown(!cityDropdown)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition"
                >
                  <MapPin className="w-3.5 h-3.5 text-jiffy-500" />
                  <span>{activeCity}</span>
                  <span className="text-[10px] text-slate-400">▼</span>
                </button>

                {cityDropdown && (
                  <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95">
                    <button
                      onClick={() => {
                        setActiveCity('Bengaluru');
                        setCityDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-jiffy-50 hover:text-jiffy-600 flex items-center justify-between"
                    >
                      <span>Bengaluru (All Hubs)</span>
                      {activeCity === 'Bengaluru' && <span className="text-jiffy-500">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        setActiveCity('Delhi NCR');
                        setCityDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-jiffy-50 hover:text-jiffy-600 flex items-center justify-between"
                    >
                      <span>Delhi NCR (North Campus)</span>
                      {activeCity === 'Delhi NCR' && <span className="text-jiffy-500">✓</span>}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Center Navigation Links (if applicable) */}
            {role === 'student' && setActiveTab && (
              <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`px-4 py-1.5 rounded-full transition ${
                    activeTab === 'discover'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Discover Gigs
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-4 py-1.5 rounded-full transition ${
                    activeTab === 'applications'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'hover:text-slate-900'
                  }`}
                >
                  My Gigs
                </button>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`px-4 py-1.5 rounded-full transition ${
                    activeTab === 'wallet'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Wallet & UPI
                </button>
                <button
                  onClick={() => setActiveTab('jiffy-id')}
                  className={`px-4 py-1.5 rounded-full transition flex items-center gap-1 ${
                    activeTab === 'jiffy-id'
                      ? 'bg-white text-jiffy-600 shadow-sm font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Jiffy ID Card
                </button>
              </nav>
            )}

            {/* Right: Active Role & Switch Persona Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowPersonaModal(true)}
                className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border transition shadow-sm hover:shadow group ${badge.color}`}
                title="Click to switch between Student, Restaurant, and Admin dashboards"
              >
                <img
                  src={badge.avatar}
                  alt="avatar"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-white"
                />
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      {badge.label}
                    </span>
                    {badge.icon}
                  </div>
                  <div className="text-xs font-semibold truncate max-w-[130px] text-slate-800">
                    {badge.subtitle}
                  </div>
                </div>
                <div className="hidden lg:flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-slate-700 shadow-xs ml-1">
                  Switch Role
                </div>
              </button>

              {/* Reset Data Button */}
              <button
                onClick={() => {
                  if (window.confirm('Reset all Jiffy demo data back to default state?')) {
                    resetDemoData();
                  }
                }}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
                title="Reset Demo Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Persona Switcher Modal */}
      {showPersonaModal && (
        <PersonaSwitcherModal onClose={() => setShowPersonaModal(false)} />
      )}
    </>
  );
};
export default Navbar;
