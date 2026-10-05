import React, { useState } from 'react';
import { Gig } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Utensils,
  IndianRupee,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  FileCheck,
  Send,
  Calendar,
  Share2,
  ShieldCheck
} from 'lucide-react';

interface GigDetailModalProps {
  gig: Gig;
  onClose: () => void;
  onOpenProofModal?: (applicationId: string) => void;
}

export const GigDetailModal: React.FC<GigDetailModalProps> = ({
  gig,
  onClose,
  onOpenProofModal,
}) => {
  const { currentStudent, applyToGig, applications } = useApp();
  const [pitch, setPitch] = useState(
    `Hey ${gig.restaurantName}! I'm a student at ${currentStudent.college} with ${(currentStudent.followersCount / 1000).toFixed(1)}k food-loving followers in ${currentStudent.collegeCity}. I'd love to visit and create a high-engagement Reel highlighting your signature dishes!`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const existingApp = applications.find(
    (a) => a.gigId === gig.id && a.studentId === currentStudent.id
  );

  const isEligible = currentStudent.followersCount >= gig.minFollowers;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible || gig.spotsLeft <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ok = applyToGig(gig.id, pitch);
      setIsSubmitting(false);
      if (ok) {
        setAppliedSuccess(true);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 relative overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white backdrop-blur-md transition shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative h-56 sm:h-64 w-full bg-slate-900">
            <img
              src={gig.restaurantCover}
              alt={gig.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            {/* Restaurant Logo & Neighborhood on top of image */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={gig.restaurantLogo}
                  alt={gig.restaurantName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-xl"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-white">
                    <h3 className="font-extrabold text-lg sm:text-xl drop-shadow">
                      {gig.restaurantName}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-jiffy-400" />
                    <span>{gig.neighborhood}, {gig.city}</span>
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                {gig.cuisine}
              </span>
            </div>
          </div>

          {/* Body Details */}
          <div className="p-6 space-y-6">
            {/* Title & Description */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-jiffy-50 text-jiffy-700 text-xs font-bold">
                  {gig.cuisine}
                </span>
                {gig.dietaryTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                {gig.title}
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {gig.description}
              </p>
            </div>

            {/* The Deal: Compensation Card */}
            <div className="bg-gradient-to-r from-amber-500/10 via-jiffy-500/10 to-emerald-500/10 rounded-3xl p-5 border border-slate-200">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-jiffy-500" />
                <span>The Jiffy Creator Deal</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                    🍔
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Free Meal Voucher
                    </span>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{gig.freeMealValue.toLocaleString('en-IN')} Voucher
                    </span>
                    <span className="text-[11px] text-slate-500 block">Valid for 2 persons</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                    💸
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Cash Payout via UPI
                    </span>
                    <span className="text-base font-extrabold text-emerald-600">
                      ₹{gig.cashReward.toLocaleString('en-IN')} Cash
                    </span>
                    <span className="text-[11px] text-slate-500 block">Within 24h of approval</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverables & Guidelines */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Content Deliverables</h4>
              <ul className="space-y-2">
                {gig.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-jiffy-500 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Creator Guidelines */}
            {gig.guidelines.length > 0 && (
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Restaurant Guidelines & Dos
                </h4>
                <ul className="space-y-1.5">
                  {gig.guidelines.map((guide, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-jiffy-500 font-bold">•</span>
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Eligibility Check Strip */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Creator Requirement</span>
                <span className="text-xs text-slate-500">
                  Min. {(gig.minFollowers / 1000).toFixed(1)}k Instagram / YouTube followers
                </span>
              </div>
              <div className="text-right">
                {isEligible ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Eligible ({currentStudent.followersCount} followers)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5" /> Below threshold
                  </span>
                )}
              </div>
            </div>

            {/* If Already Applied / In Progress */}
            {existingApp || appliedSuccess ? (
              <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-slate-900">
                <div className="flex items-center gap-2 font-extrabold text-emerald-700 mb-1">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Application Status: {existingApp ? existingApp.status.toUpperCase() : 'APPLIED'}</span>
                </div>
                <p className="text-xs text-slate-600">
                  Your profile and pitch have been received by {gig.restaurantName}.
                </p>

                {existingApp?.voucherCode && (
                  <div className="mt-4 p-3.5 bg-white rounded-2xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Your Meal Voucher Code
                      </span>
                      <span className="font-mono text-base font-black text-slate-900">
                        {existingApp.voucherCode}
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                      Ready for Visit
                    </span>
                  </div>
                )}

                {existingApp && onOpenProofModal && (
                  <div className="mt-4 flex gap-2">
                    {existingApp.status === 'invited' || existingApp.status === 'visited' ? (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenProofModal(existingApp.id);
                        }}
                        className="w-full py-3 rounded-2xl bg-jiffy-500 hover:bg-jiffy-600 text-white font-bold text-xs shadow-glow transition"
                      >
                        Submit Content Proof (Reel Link & Stats)
                      </button>
                    ) : existingApp.status === 'proof_submitted' ? (
                      <div className="w-full py-2.5 text-center text-xs font-bold text-amber-700 bg-amber-50 rounded-xl">
                        Proof Submitted & Awaiting Restaurant Approval
                      </div>
                    ) : existingApp.status === 'paid' ? (
                      <div className="w-full py-2.5 text-center text-xs font-bold text-emerald-700 bg-emerald-100 rounded-xl">
                        ✓ Completed & Paid via UPI ({existingApp.payout?.utrNumber || 'Settled'})
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ) : (
              /* Application Form */
              <form onSubmit={handleApply} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Your Pitch to {gig.restaurantName}
                  </label>
                  <textarea
                    rows={3}
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="w-full text-xs text-slate-800 p-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-jiffy-500 focus:border-transparent transition"
                    placeholder="Tell the restaurant why your followers will love visiting them..."
                    required
                  />
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Shows your verified Christ University & Instagram stats</span>
                    <span>{pitch.length} chars</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isEligible || gig.spotsLeft <= 0}
                  className="w-full py-3.5 rounded-2xl bg-jiffy-500 hover:bg-jiffy-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-glow flex items-center justify-center gap-2 transition-all transform active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit 1-Tap Application</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GigDetailModal;
