import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gig, Application } from '../types';
import GigCard from '../components/gigs/GigCard';
import GigDetailModal from '../components/gigs/GigDetailModal';
import ProofSubmitModal from '../components/gigs/ProofSubmitModal';
import JiffyIdCard from '../components/common/JiffyIdCard';
import {
  Compass,
  Briefcase,
  Wallet,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  IndianRupee,
  Share2,
  Check,
  Instagram,
  Star,
  MapPin,
  Utensils
} from 'lucide-react';

interface StudentDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const {
    currentStudent,
    gigs,
    applications,
    payouts,
    updateApplicationStatus,
    rateGigExperience,
    updateStudentUPI,
  } = useApp();

  // Modals state
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [proofModalAppId, setProofModalAppId] = useState<string | null>(null);
  const [ratingModalApp, setRatingModalApp] = useState<Application | null>(null);

  // Discover Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'payout' | 'spots'>('recommended');

  // UPI edit state
  const [editingUpi, setEditingUpi] = useState(false);
  const [tempUpi, setTempUpi] = useState(currentStudent.upiId);

  // Filtered Gigs
  const filteredGigs = gigs.filter((gig) => {
    if (gig.status !== 'active') return false;
    const matchesSearch =
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNeighborhood =
      selectedNeighborhood === 'All' || gig.neighborhood.includes(selectedNeighborhood);
    const matchesCuisine =
      selectedCuisine === 'All' || gig.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
    return matchesSearch && matchesNeighborhood && matchesCuisine;
  }).sort((a, b) => {
    if (sortBy === 'payout') return b.cashReward - a.cashReward;
    if (sortBy === 'spots') return b.spotsLeft - a.spotsLeft;
    return 0;
  });

  // Student's applications
  const myApplications = applications.filter((a) => a.studentId === currentStudent.id);

  const neighborhoods = ['All', 'Koramangala', 'Indiranagar', 'Church Street', 'Residency Road', 'Lavelle Road'];
  const cuisines = ['All', 'Burgers', 'Coffee', 'Pizza', 'Biryani', 'Bakery'];

  // Calculations for Wallet
  const completedEarnings = payouts
    .filter((p) => p.studentId === currentStudent.id && p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingEarnings = payouts
    .filter((p) => p.studentId === currentStudent.id && p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-8">
      {/* Tab: DISCOVER GIGS */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          {/* Creator Welcome Hero Card */}
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-slate-950 via-slate-900 to-jiffy-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-jiffy-500/20 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jiffy-500/20 border border-jiffy-400/30 text-jiffy-300 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Christ University Creator Hub • Bengaluru</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                  Eat Free. Post Reels. <span className="text-jiffy-400">Get Paid.</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                  Welcome back, <span className="font-bold text-white">{currentStudent.name}</span>! You have{' '}
                  <span className="text-emerald-400 font-bold">{(currentStudent.followersCount / 1000).toFixed(1)}k verified followers</span>. Top restaurants in Koramangala & Indiranagar are looking for food creators today.
                </p>
              </div>

              {/* Quick stats badge */}
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-3.5 rounded-3xl border border-white/10 shrink-0">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                    Total Earned
                  </span>
                  <span className="text-xl font-extrabold text-white">
                    ₹{currentStudent.totalEarnings.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                    Reviews Done
                  </span>
                  <span className="text-xl font-extrabold text-amber-400">
                    {currentStudent.completedGigsCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="space-y-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-sm">
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cafes, burgers, biryani, or restaurant name..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-jiffy-500 focus:bg-white transition"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-jiffy-500"
                >
                  <option value="recommended">✨ Recommended</option>
                  <option value="payout">💰 Highest Cash Reward</option>
                  <option value="spots">⚡ Most Spots Open</option>
                </select>
              </div>
            </div>

            {/* Neighborhood quick chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-jiffy-500" />
                <span>Area:</span>
              </span>
              {neighborhoods.map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNeighborhood(n)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                    selectedNeighborhood === n
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Cuisine quick chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                <Utensils className="w-3 h-3 text-amber-500" />
                <span>Cuisine:</span>
              </span>
              {cuisines.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCuisine(c)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                    selectedCuisine === c
                      ? 'bg-jiffy-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Gigs Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Available Food Review Gigs{' '}
                <span className="text-slate-400 font-normal text-sm">
                  ({filteredGigs.length} available)
                </span>
              </h2>
            </div>

            {filteredGigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGigs.map((gig) => (
                  <GigCard
                    key={gig.id}
                    gig={gig}
                    onSelect={(g) => setSelectedGig(g)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-700">No gigs matched your filter</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try clearing the neighborhood or cuisine filter to view all active gigs in Bengaluru.
                </p>
                <button
                  onClick={() => {
                    setSelectedNeighborhood('All');
                    setSelectedCuisine('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: MY GIGS & APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              My Gigs & Applications
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track your restaurant visits, submit proof of your reels, and check approval status.
            </p>
          </div>

          <div className="space-y-4">
            {myApplications.length > 0 ? (
              myApplications.map((app) => {
                const gig = gigs.find((g) => g.id === app.gigId);
                if (!gig) return null;

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition space-y-4"
                  >
                    {/* Top Row: Restaurant info & Status Pill */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={gig.restaurantLogo}
                          alt={gig.restaurantName}
                          className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-100 shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-bold text-slate-900">{gig.restaurantName}</h3>
                            <span className="text-xs text-slate-400">• {gig.neighborhood}</span>
                          </div>
                          <p className="text-xs font-medium text-slate-600 line-clamp-1">{gig.title}</p>
                        </div>
                      </div>

                      {/* Status Chip */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            app.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : app.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : app.status === 'proof_submitted'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : app.status === 'invited'
                              ? 'bg-jiffy-50 text-jiffy-700 border border-jiffy-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Progress Pipeline bar */}
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      <div
                        className={`p-2 rounded-xl transition ${
                          ['applied', 'invited', 'visited', 'proof_submitted', 'approved', 'paid'].includes(app.status)
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        1. Applied
                      </div>
                      <div
                        className={`p-2 rounded-xl transition ${
                          ['invited', 'visited', 'proof_submitted', 'approved', 'paid'].includes(app.status)
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        2. Dine & Voucher
                      </div>
                      <div
                        className={`p-2 rounded-xl transition ${
                          ['proof_submitted', 'approved', 'paid'].includes(app.status)
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        3. Proof Sent
                      </div>
                      <div
                        className={`p-2 rounded-xl transition ${
                          ['paid'].includes(app.status)
                            ? 'bg-emerald-600 text-white'
                            : app.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        4. UPI Paid
                      </div>
                    </div>

                    {/* Content / Status specifics */}
                    <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left Specifics */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 font-medium">Perks:</span>
                          <span className="font-bold text-slate-900">
                            ₹{gig.freeMealValue} Meal Voucher + ₹{gig.cashReward} Cash via UPI
                          </span>
                        </div>

                        {app.voucherCode && (
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-slate-500 font-medium">Check-In Voucher:</span>
                            <span className="font-mono text-xs font-black bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 text-slate-800">
                              {app.voucherCode}
                            </span>
                          </div>
                        )}

                        {app.proof && (
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-slate-500 font-medium">Submitted Reel:</span>
                            <a
                              href={app.proof.postUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-jiffy-600 font-bold hover:underline flex items-center gap-1"
                            >
                              <span>{app.proof.viewsCount.toLocaleString()} views recorded</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        {app.payout?.utrNumber && (
                          <div className="flex items-center gap-2 pt-1 text-emerald-700 font-semibold">
                            <span>UPI UTR: {app.payout.utrNumber}</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="flex items-center gap-2">
                        {app.status === 'invited' && (
                          <button
                            onClick={() => setProofModalAppId(app.id)}
                            className="px-4 py-2.5 rounded-xl bg-jiffy-500 hover:bg-jiffy-600 text-white font-bold text-xs shadow-glow transition"
                          >
                            Submit Content Proof →
                          </button>
                        )}

                        {app.status === 'proof_submitted' && (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>In Restaurant Review</span>
                          </span>
                        )}

                        {app.status === 'approved' && (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                            Approved! Queued for Admin Payout
                          </span>
                        )}

                        {app.status === 'paid' && !app.studentRating && (
                          <button
                            onClick={() => setRatingModalApp(app)}
                            className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center gap-1"
                          >
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>Rate Dining Experience</span>
                          </button>
                        )}

                        {app.status === 'paid' && app.studentRating && (
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                            <span>Rated {app.studentRating}★</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-6">
                <p className="text-sm font-bold text-slate-700">No active gig applications yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Discover trending restaurant gigs and apply in 1 tap!
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="mt-4 px-4 py-2 rounded-xl bg-jiffy-500 text-white font-bold text-xs"
                >
                  Browse Gigs
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: WALLET & EARNINGS */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Creator Wallet & UPI Payouts
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Direct settlement to your bank account via UPI within 24 hours of gig approval.
            </p>
          </div>

          {/* Wallet Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Earned */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Lifetime Earned
              </span>
              <div className="text-3xl font-black text-slate-900 flex items-center">
                <span>₹{completedEarnings.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold">
                ✓ 100% cleared to your bank
              </p>
            </div>

            {/* Pending Clearance */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pending Payouts
              </span>
              <div className="text-3xl font-black text-amber-600 flex items-center">
                <span>₹{pendingEarnings.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Awaiting admin batch UPI dispatch
              </p>
            </div>

            {/* UPI Settings Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Primary Payout UPI ID
                </span>
                {editingUpi ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={tempUpi}
                      onChange={(e) => setTempUpi(e.target.value)}
                      className="text-xs font-mono font-bold py-1.5 px-2.5 rounded-lg border border-slate-300 w-full"
                    />
                    <button
                      onClick={() => {
                        updateStudentUPI(tempUpi);
                        setEditingUpi(false);
                      }}
                      className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-slate-800">
                      {currentStudent.upiId}
                    </span>
                    <button
                      onClick={() => setEditingUpi(true)}
                      className="text-xs text-jiffy-600 font-bold hover:underline"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified UPI VPA (HDFC/Axis Instant)</span>
              </span>
            </div>
          </div>

          {/* Payouts History Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Payout Settlements Log</h3>
              <span className="text-xs text-slate-400">Showing all gig payouts</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5">Restaurant & Gig</th>
                    <th className="py-3 px-5">Amount</th>
                    <th className="py-3 px-5">UPI Reference (UTR)</th>
                    <th className="py-3 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {payouts
                    .filter((p) => p.studentId === currentStudent.id)
                    .map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 px-5 text-slate-500">{pay.initiatedAt}</td>
                        <td className="py-4 px-5">
                          <span className="font-bold text-slate-900 block">{pay.restaurantName}</span>
                          <span className="text-[11px] text-slate-500 line-clamp-1">{pay.gigTitle}</span>
                        </td>
                        <td className="py-4 px-5 font-bold text-slate-900">
                          ₹{pay.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-5 font-mono text-[11px] text-slate-500">
                          {pay.utrNumber || 'Pending UTR creation'}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              pay.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {pay.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: PORTFOLIO & JIFFY ID */}
      {activeTab === 'jiffy-id' && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Digital Jiffy ID & Creator Portfolio
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Your verified pass to show restaurant managers for free tasting meals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Jiffy Holographic Creator Pass */}
            <div className="space-y-3">
              <JiffyIdCard student={currentStudent} />
              <p className="text-[11px] text-center text-slate-400 max-w-xs mx-auto">
                Present this digital pass at the restaurant counter when visiting for a scheduled food tasting.
              </p>
            </div>

            {/* Right: Portfolio and Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Creator Bio Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">Verified Creator Profile</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    KYC Verified
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{currentStudent.bio}</p>

                {/* Niches tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentStudent.niches.map((niche, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {niche}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">College</span>
                    <span className="font-bold text-slate-800">{currentStudent.college}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Degree</span>
                    <span className="font-bold text-slate-800">{currentStudent.degree}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Instagram</span>
                    <span className="font-bold text-pink-600 font-mono">@{currentStudent.instagramHandle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Followers</span>
                    <span className="font-bold text-slate-900">{currentStudent.followersCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Sample Reels Grid */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">Featured Food Review Reels</h3>
                  <span className="text-xs text-slate-400">Past restaurant content</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentStudent.sampleReels.map((reel, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-[9/14] border border-slate-200 shadow-xs cursor-pointer"
                    >
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold flex items-center gap-1">
                        <Instagram className="w-2.5 h-2.5 text-pink-400" />
                        <span>{reel.views}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs font-bold line-clamp-2 leading-snug">{reel.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedGig && (
        <GigDetailModal
          gig={selectedGig}
          onClose={() => setSelectedGig(null)}
          onOpenProofModal={(appId) => setProofModalAppId(appId)}
        />
      )}

      {proofModalAppId && (
        <ProofSubmitModal
          applicationId={proofModalAppId}
          onClose={() => setProofModalAppId(null)}
        />
      )}

      {/* Rating Modal for completed gig */}
      {ratingModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Rate Restaurant Experience
            </h3>
            <p className="text-xs text-slate-500">
              How was the food tasting and staff hospitality?
            </p>
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    rateGigExperience(
                      ratingModalApp.id,
                      star,
                      'Great food and generous meal portions!',
                      true
                    );
                    setRatingModalApp(null);
                  }}
                  className="text-3xl hover:scale-110 transition"
                >
                  ⭐
                </button>
              ))}
            </div>
            <button
              onClick={() => setRatingModalApp(null)}
              className="w-full py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentDashboard;
