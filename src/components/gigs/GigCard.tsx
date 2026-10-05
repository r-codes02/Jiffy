import React from 'react';
import { Gig } from '../../types';
import { useApp } from '../../context/AppContext';
import { MapPin, Utensils, IndianRupee, Users, Sparkles, CheckCircle2, ChevronRight, Clock } from 'lucide-react';

interface GigCardProps {
  gig: Gig;
  onSelect: (gig: Gig) => void;
}

export const GigCard: React.FC<GigCardProps> = ({ gig, onSelect }) => {
  const { applications, currentStudent } = useApp();

  // Check if current student has applied
  const application = applications.find(
    (a) => a.gigId === gig.id && a.studentId === currentStudent.id
  );

  const isEligible = currentStudent.followersCount >= gig.minFollowers;

  return (
    <div
      onClick={() => onSelect(gig)}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-card-soft hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
    >
      {/* Top Banner Image with Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={gig.restaurantCover}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Free Meal Value Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold shadow-md border border-white/10">
          <Utensils className="w-3.5 h-3.5 text-amber-400" />
          <span>₹{gig.freeMealValue.toLocaleString('en-IN')} Meal for 2</span>
        </div>

        {/* Spots Left Pill */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-extrabold shadow-md flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${gig.spotsLeft > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <span>{gig.spotsLeft} spots left</span>
        </div>

        {/* Neighborhood and Cuisine on bottom of image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-jiffy-400" />
            <span>{gig.neighborhood}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md font-medium text-[11px]">
            {gig.cuisine}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant Brand Header */}
          <div className="flex items-center gap-2.5 mb-2">
            <img
              src={gig.restaurantLogo}
              alt={gig.restaurantName}
              className="w-6 h-6 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <span className="text-xs font-bold text-slate-600 truncate">
              {gig.restaurantName}
            </span>
          </div>

          {/* Gig Title */}
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-jiffy-600 transition-colors">
            {gig.title}
          </h3>

          {/* Deliverables summary */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {gig.deliverables.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-slate-50 text-slate-600 border border-slate-100"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Payout & Action Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            {/* Compensation */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                Cash Payout via UPI
              </span>
              <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-lg">
                <span>₹{gig.cashReward.toLocaleString('en-IN')}</span>
                <span className="text-[11px] font-semibold text-slate-400">+ Free Meal</span>
              </div>
            </div>

            {/* Action / Application Status Badge */}
            {application ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="capitalize">{application.status.replace('_', ' ')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-2xl bg-jiffy-500 group-hover:bg-jiffy-600 text-white shadow-sm transition">
                <span>View Gig</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            )}
          </div>

          {/* Followers requirement notice */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Min. {(gig.minFollowers / 1000).toFixed(1)}k followers</span>
            {!isEligible && (
              <span className="text-amber-600 font-medium">Needs more followers</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GigCard;
