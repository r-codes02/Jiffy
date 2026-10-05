import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Award, Utensils, Shield, CheckCircle2, X } from 'lucide-react';

interface PersonaSwitcherModalProps {
  onClose: () => void;
}

export const PersonaSwitcherModal: React.FC<PersonaSwitcherModalProps> = ({ onClose }) => {
  const { role, setRole, currentStudent, currentRestaurant } = useApp();

  const handleSelectRole = (newRole: UserRole) => {
    setRole(newRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jiffy-50 text-jiffy-600 text-xs font-bold uppercase tracking-wider mb-2">
            ⚡ Instant Role Switcher
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display">
            Select Your Jiffy Experience
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Test the marketplace end-to-end as a student creator, a restaurant host, or the platform admin.
          </p>
        </div>

        <div className="space-y-3">
          {/* Student Persona */}
          <div
            onClick={() => handleSelectRole('student')}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              role === 'student'
                ? 'border-jiffy-500 bg-jiffy-50/50 shadow-sm'
                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <img
                src={currentStudent.avatarUrl}
                alt={currentStudent.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{currentStudent.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-jiffy-100 text-jiffy-700 text-[10px] font-bold">
                    Student Creator
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentStudent.college} • {(currentStudent.followersCount / 1000).toFixed(1)}K followers
                </p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                  Discovers gigs, posts reels & earns UPI payouts
                </p>
              </div>
            </div>
            {role === 'student' && <CheckCircle2 className="w-5 h-5 text-jiffy-500 shrink-0" />}
          </div>

          {/* Restaurant Persona */}
          <div
            onClick={() => handleSelectRole('restaurant')}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              role === 'restaurant'
                ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <img
                src={currentRestaurant.logoUrl}
                alt={currentRestaurant.brandName}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{currentRestaurant.brandName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    Restaurant
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentRestaurant.neighborhood} • {currentRestaurant.cuisine[0]}
                </p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                  Posts food gigs, reviews student creators & approves reels
                </p>
              </div>
            </div>
            {role === 'restaurant' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          </div>

          {/* Super Admin Persona */}
          <div
            onClick={() => handleSelectRole('admin')}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              role === 'admin'
                ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Jiffy Super Admin</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Platform Ops
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verifications & Manual UPI Settlements
                </p>
                <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                  Verifies college IDs, oversees gigs & marks UPI payouts
                </p>
              </div>
            </div>
            {role === 'admin' && <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Bengaluru Alpha Hub</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 transition"
          >
            Continue Exploring →
          </button>
        </div>
      </div>
    </div>
  );
};
export default PersonaSwitcherModal;
