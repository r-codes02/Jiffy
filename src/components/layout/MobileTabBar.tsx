import React from 'react';
import { Compass, Briefcase, Wallet, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MobileTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({ activeTab, setActiveTab }) => {
  const { applications, currentStudent } = useApp();

  // Count active applications that need creator attention
  const activeCount = applications.filter(
    (a) => a.studentId === currentStudent.id && (a.status === 'invited' || a.status === 'applied')
  ).length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav px-3 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Discover */}
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'discover'
              ? 'text-jiffy-600 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <Compass className={`w-5 h-5 ${activeTab === 'discover' ? 'stroke-[2.5px]' : ''}`} />
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Discover</span>
        </button>

        {/* My Gigs */}
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'applications'
              ? 'text-jiffy-600 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <Briefcase className={`w-5 h-5 ${activeTab === 'applications' ? 'stroke-[2.5px]' : ''}`} />
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-jiffy-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {activeCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">My Gigs</span>
        </button>

        {/* Wallet */}
        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'wallet'
              ? 'text-jiffy-600 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <Wallet className={`w-5 h-5 ${activeTab === 'wallet' ? 'stroke-[2.5px]' : ''}`} />
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Wallet</span>
        </button>

        {/* Jiffy ID */}
        <button
          onClick={() => setActiveTab('jiffy-id')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'jiffy-id'
              ? 'text-jiffy-600 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-jiffy-500 to-amber-400 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Jiffy ID</span>
        </button>
      </div>
    </div>
  );
};
export default MobileTabBar;
