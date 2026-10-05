import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Application, Gig } from '../types';
import CreateGigModal from '../components/gigs/CreateGigModal';
import {
  Utensils,
  Plus,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  ExternalLink,
  IndianRupee,
  Sparkles,
  TrendingUp,
  MapPin,
  Star,
  Check,
  AlertCircle
} from 'lucide-react';

export const RestaurantDashboard: React.FC = () => {
  const {
    currentRestaurant,
    gigs,
    applications,
    updateApplicationStatus,
    reviewProof,
    students
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'applicants' | 'proofs' | 'gigs' | 'analytics'>('applicants');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState<{ [key: string]: string }>({});

  // Filter gigs belonging to this restaurant
  const restaurantGigs = gigs.filter((g) => g.restaurantId === currentRestaurant.id);
  const restaurantGigIds = restaurantGigs.map((g) => g.id);

  // Filter applications for this restaurant's gigs
  const restaurantApps = applications.filter((a) => restaurantGigIds.includes(a.gigId));

  // Applicants waiting for decision
  const pendingApplicants = restaurantApps.filter((a) => a.status === 'applied');

  // Proofs submitted waiting for review
  const pendingProofs = restaurantApps.filter(
    (a) => a.status === 'proof_submitted' && a.proof?.status === 'pending'
  );

  // Completed / approved gigs
  const approvedGigs = restaurantApps.filter(
    (a) => a.status === 'approved' || a.status === 'paid'
  );

  // Metrics
  const totalMealsValue = approvedGigs.reduce((sum, a) => {
    const gig = gigs.find((g) => g.id === a.gigId);
    return sum + (gig ? gig.freeMealValue : 1200);
  }, 0);

  const totalCashPaid = approvedGigs.reduce((sum, a) => {
    const gig = gigs.find((g) => g.id === a.gigId);
    return sum + (gig ? gig.cashReward : 1000);
  }, 0);

  const totalViewsGenerated = restaurantApps
    .filter((a) => a.proof)
    .reduce((sum, a) => sum + (a.proof?.viewsCount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-8">
      {/* Restaurant Header Hero */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentRestaurant.logoUrl}
              alt={currentRestaurant.brandName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover ring-2 ring-white/20 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
                  {currentRestaurant.brandName}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                  Verified Partner
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentRestaurant.neighborhood}, {currentRestaurant.city}</span>
                <span>•</span>
                <span className="text-amber-400 flex items-center gap-1 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" /> {currentRestaurant.rating}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Create Gig Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-glow-green transition transform active:scale-98 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Food Review Gig</span>
          </button>
        </div>
      </div>

      {/* Subtabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('applicants')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'applicants'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Applicants</span>
          {pendingApplicants.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-jiffy-500 text-white text-[10px]">
              {pendingApplicants.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('proofs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'proofs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Review Content Proofs</span>
          {pendingProofs.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
              {pendingProofs.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('gigs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'gigs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Hosted Gigs ({restaurantGigs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'analytics'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Campaign Spend & ROI</span>
        </button>
      </div>

      {/* TAB 1: APPLICANTS QUEUE */}
      {activeSubTab === 'applicants' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              College Creator Applicants{' '}
              <span className="text-slate-400 font-normal text-sm">
                ({pendingApplicants.length} pending review)
              </span>
            </h2>
          </div>

          {pendingApplicants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingApplicants.map((app) => {
                const gig = gigs.find((g) => g.id === app.gigId);
                const student = students.find((s) => s.id === app.studentId);

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      {/* Student Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.studentAvatar}
                            alt={app.studentName}
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-sm text-slate-900">{app.studentName}</h4>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            </div>
                            <p className="text-xs text-slate-500">{app.studentCollege}</p>
                            <p className="text-[11px] font-mono text-pink-600 mt-0.5">
                              @{student?.instagramHandle || 'studentcreator'}
                            </p>
                          </div>
                        </div>

                        {/* Creator Stats */}
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-900 block">
                            {(app.studentFollowers / 1000).toFixed(1)}k followers
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold block">
                            {app.studentEngagement}% Avg ER
                          </span>
                        </div>
                      </div>

                      {/* Gig applied for */}
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600">
                        <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                          Applied For:
                        </span>
                        <span className="font-medium">{gig?.title}</span>
                      </div>

                      {/* Student Pitch */}
                      <div className="mt-3 text-xs text-slate-600 bg-emerald-50/40 p-3 rounded-2xl border border-emerald-100/60">
                        <span className="font-bold text-slate-800 block text-[11px] mb-1">
                          Student Pitch:
                        </span>
                        <p className="italic">"{app.pitchNote}"</p>
                      </div>
                    </div>

                    {/* Action Buttons: Accept / Decline */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateApplicationStatus(app.id, 'invited', {
                            voucherCode: `JIFFY-${currentRestaurant.brandName.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
                          })
                        }
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept & Send Voucher</span>
                      </button>

                      <button
                        onClick={() => updateApplicationStatus(app.id, 'rejected')}
                        className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-xs transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-6">
              <p className="text-sm font-bold text-slate-700">No new applications pending</p>
              <p className="text-xs text-slate-400 mt-1">
                All student creator applications have been reviewed.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: REVIEW PROOFS */}
      {activeSubTab === 'proofs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Review Submitted Content Proofs{' '}
              <span className="text-slate-400 font-normal text-sm">
                ({pendingProofs.length} awaiting approval)
              </span>
            </h2>
          </div>

          {pendingProofs.length > 0 ? (
            <div className="space-y-4">
              {pendingProofs.map((app) => {
                const gig = gigs.find((g) => g.id === app.gigId);
                const proof = app.proof;
                if (!proof) return null;

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.studentAvatar}
                          alt={app.studentName}
                          className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-sm text-slate-900">{app.studentName}</h4>
                            <span className="text-xs text-slate-400">• {app.studentCollege}</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">{gig?.title}</p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Payout on Approval
                        </span>
                        <span className="text-lg font-black text-emerald-600">
                          ₹{gig?.cashReward} via UPI
                        </span>
                      </div>
                    </div>

                    {/* Proof Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Left: Live Link & Notes */}
                      <div className="md:col-span-2 space-y-3">
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            Live Content Post Link
                          </span>
                          <a
                            href={proof.postUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1.5"
                          >
                            <span>{proof.postUrl}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Performance metrics */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-semibold">
                              <Eye className="w-3.5 h-3.5 text-jiffy-500" />
                              <span>Views</span>
                            </div>
                            <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                              {proof.viewsCount.toLocaleString()}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-semibold">
                              <Heart className="w-3.5 h-3.5 text-rose-500" />
                              <span>Likes</span>
                            </div>
                            <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                              {proof.likesCount.toLocaleString()}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-semibold">
                              <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Comments</span>
                            </div>
                            <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                              {proof.commentsCount.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Creator notes */}
                        {proof.creatorNotes && (
                          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">
                            <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider mb-0.5">
                              Creator Notes
                            </span>
                            <p>{proof.creatorNotes}</p>
                          </div>
                        )}
                      </div>

                      {/* Right: Screenshot Preview */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Verified Reach Screenshot
                        </span>
                        <img
                          src={proof.screenshotUrl}
                          alt="Proof Screenshot"
                          className="w-full h-36 object-cover rounded-2xl border border-slate-200 shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Actions: Approve or Request Revision */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-slate-500">
                        Approving releases ₹{gig?.cashReward} to the creator's UPI wallet.
                      </span>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            const note = prompt('Please enter feedback or required changes for the creator:');
                            if (note) {
                              reviewProof(app.id, 'revision_requested', note);
                            }
                          }}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                        >
                          Request Revision
                        </button>

                        <button
                          onClick={() => reviewProof(app.id, 'approved', 'Great review video!')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-glow-green transition flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Release Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-6">
              <p className="text-sm font-bold text-slate-700">All submitted proofs have been reviewed!</p>
              <p className="text-xs text-slate-400 mt-1">
                New submissions from visiting students will appear here for 1-click verification.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: HOSTED GIGS */}
      {activeSubTab === 'gigs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Your Active Food Gigs
            </h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Gig</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurantGigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      {gig.cuisine} • {gig.neighborhood}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-0.5">{gig.title}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold shrink-0">
                    {gig.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold">Complimentary Meal</span>
                    <span className="font-extrabold text-slate-800">₹{gig.freeMealValue} Voucher</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold">Cash per Creator</span>
                    <span className="font-extrabold text-emerald-700">₹{gig.cashReward} via UPI</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Spots: {gig.spotsLeft} remaining of {gig.spotsTotal}</span>
                  <span className="font-bold text-slate-700">Min. {gig.minFollowers} followers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SPEND & ROI ANALYTICS */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Creator Marketing Spend & ROI Analytics
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real metrics generated by college micro-influencers for your restaurant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Spend (Vouchers + Cash)
              </span>
              <span className="text-2xl font-black text-slate-900 block">
                ₹{(totalMealsValue + totalCashPaid).toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400">
                ₹{totalMealsValue} meals + ₹{totalCashPaid} UPI
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Verified Video Impressions
              </span>
              <span className="text-2xl font-black text-emerald-600 block">
                {totalViewsGenerated.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">
                Across Instagram Reels
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Average Effective CPM
              </span>
              <span className="text-2xl font-black text-slate-900 block">
                ₹{totalViewsGenerated > 0 ? (((totalMealsValue + totalCashPaid) / totalViewsGenerated) * 1000).toFixed(1) : '85'}
              </span>
              <span className="text-[11px] text-slate-400">
                Per 1,000 hyper-local foodies
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Creators Collaborated
              </span>
              <span className="text-2xl font-black text-amber-500 block">
                {approvedGigs.length}
              </span>
              <span className="text-[11px] text-slate-400">
                Christ, RVCE & DU Students
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Create Gig Modal */}
      {showCreateModal && (
        <CreateGigModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
export default RestaurantDashboard;
