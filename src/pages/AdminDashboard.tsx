import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PayoutRecord, StudentProfile, RestaurantProfile, Gig } from '../types';
import {
  Shield,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Users,
  Utensils,
  TrendingUp,
  Award,
  Search,
  ExternalLink,
  Sparkles,
  Send,
  Clock,
  Filter,
  Check
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    restaurants,
    gigs,
    applications,
    payouts,
    stats,
    verifyStudent,
    verifyRestaurant,
    markPayoutPaid,
    reviewProof,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'payouts' | 'verifications' | 'gigs' | 'proofs'>('payouts');
  const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null);
  const [customUtr, setCustomUtr] = useState('');

  // Pending Payouts
  const pendingPayouts = payouts.filter((p) => p.status !== 'paid');
  const completedPayouts = payouts.filter((p) => p.status === 'paid');

  const handleProcessPayout = (payout: PayoutRecord) => {
    const utr = customUtr.trim() || `UTR${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`;
    markPayoutPaid(payout.id, utr);
    setSelectedPayout(null);
    setCustomUtr('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-8">
      {/* Admin Header Hero */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Platform Ops Console • Bengaluru Alpha</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              Jiffy Admin & Payout Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Verify student creator IDs, oversee marketplace gigs, review proofs, and manually settle UPI payouts.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Pending UPI Settlement
              </span>
              <span className="text-xl font-extrabold text-amber-400">
                ₹{pendingPayouts.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {pendingPayouts.length} creators waiting
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Level Marketplace Analytics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Verified Creators (2K+)
          </span>
          <span className="text-2xl font-black text-slate-900 block">
            {students.length}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Christ, RVCE, St. Joseph's
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Restaurant Partners
          </span>
          <span className="text-2xl font-black text-slate-900 block">
            {restaurants.length}
          </span>
          <span className="text-[11px] text-slate-400">
            Koramangala, Indiranagar
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Total Creator Payouts
          </span>
          <span className="text-2xl font-black text-emerald-600 block">
            ₹{stats.totalPaidOutINR.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Paid via UPI Direct
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Total Content Views
          </span>
          <span className="text-2xl font-black text-amber-500 block">
            {(stats.totalImpressionsGenerated / 1000000).toFixed(1)}M
          </span>
          <span className="text-[11px] text-slate-400">
            Reels & Stories tracked
          </span>
        </div>
      </div>

      {/* Admin Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('payouts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'payouts'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <IndianRupee className="w-4 h-4" />
          <span>UPI Payouts Queue</span>
          {pendingPayouts.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
              {pendingPayouts.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('verifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'verifications'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Student & Restaurant KYC</span>
        </button>

        <button
          onClick={() => setActiveTab('gigs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'gigs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Marketplace Gigs ({gigs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('proofs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'proofs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Proof Oversight</span>
        </button>
      </div>

      {/* TAB 1: UPI PAYOUTS QUEUE */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          {/* Pending Settlements */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Pending UPI Creator Settlements
                </h3>
                <p className="text-xs text-slate-500">
                  Reviews approved by restaurants. Click "Mark as Paid" after initiating UPI transfer.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
                {pendingPayouts.length} Action Needed
              </span>
            </div>

            {pendingPayouts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {pendingPayouts.map((pay) => (
                  <div
                    key={pay.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          {pay.studentName}
                        </span>
                        <span className="text-xs text-slate-400">• {pay.restaurantName}</span>
                      </div>
                      <p className="text-xs text-slate-600">{pay.gigTitle}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-slate-400">UPI VPA:</span>
                        <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {pay.upiId}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-400 block">Amount</span>
                        <span className="text-lg font-black text-slate-900">
                          ₹{pay.amount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedPayout(pay)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark as Paid</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-400">
                🎉 No pending payouts! All creators have been settled.
              </div>
            )}
          </div>

          {/* Settled Payouts Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Settled Payouts History</h3>
              <span className="text-xs text-slate-400">{completedPayouts.length} settled</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-5">Creator & UPI ID</th>
                    <th className="py-3 px-5">Restaurant</th>
                    <th className="py-3 px-5">Amount</th>
                    <th className="py-3 px-5">UTR Reference</th>
                    <th className="py-3 px-5">Settled At</th>
                    <th className="py-3 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {completedPayouts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-5">
                        <span className="font-bold text-slate-900 block">{p.studentName}</span>
                        <span className="font-mono text-[11px] text-slate-400">{p.upiId}</span>
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800">{p.restaurantName}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900">
                        ₹{p.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-5 font-mono text-emerald-700 font-bold">
                        {p.utrNumber}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500">{p.paidAt}</td>
                      <td className="py-3.5 px-5 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                          PAID
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

      {/* TAB 2: VERIFICATIONS (STUDENT & RESTAURANT KYC) */}
      {activeTab === 'verifications' && (
        <div className="space-y-6">
          {/* Students Verification Section */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Student Creator Verifications (2K+ Filter)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{student.name}</h4>
                      <p className="text-xs text-slate-500">{student.college}</p>
                      <span className="font-mono text-[11px] text-pink-600">@{student.instagramHandle}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Followers</span>
                      <span className="font-bold text-slate-800">
                        {(student.followersCount / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Engagement</span>
                      <span className="font-bold text-emerald-600">{student.engagementRate}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <span className="font-semibold text-slate-600">
                      College ID: {student.collegeIdVerified ? 'Verified ✓' : 'Pending'}
                    </span>
                    <button
                      onClick={() => verifyStudent(student.id, !student.collegeIdVerified)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        student.collegeIdVerified
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {student.collegeIdVerified ? 'Revoke' : 'Verify ID'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurants Verification Section */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Restaurant Partner Listings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={restaurant.logoUrl}
                      alt={restaurant.brandName}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{restaurant.brandName}</h4>
                      <p className="text-xs text-slate-500">{restaurant.neighborhood}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <span className="font-semibold text-slate-600">
                      Status: {restaurant.isVerified ? 'Verified Partner ✓' : 'Unverified'}
                    </span>
                    <button
                      onClick={() => verifyRestaurant(restaurant.id, !restaurant.isVerified)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        restaurant.isVerified
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {restaurant.isVerified ? 'Unverify' : 'Verify'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GIGS MODERATION */}
      {activeTab === 'gigs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">City Marketplace Gigs Oversight</h3>
            <span className="text-xs text-slate-500">{gigs.length} total gigs</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-5">Gig Title</th>
                    <th className="py-3 px-5">Restaurant</th>
                    <th className="py-3 px-5">Perks</th>
                    <th className="py-3 px-5">Spots Left</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {gigs.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-bold text-slate-900 max-w-xs truncate">{g.title}</td>
                      <td className="py-3 px-5 text-slate-600">{g.restaurantName}</td>
                      <td className="py-3 px-5 font-semibold text-emerald-700">
                        ₹{g.freeMealValue} Meal + ₹{g.cashReward} Cash
                      </td>
                      <td className="py-3 px-5">{g.spotsLeft} / {g.spotsTotal}</td>
                      <td className="py-3 px-5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                          {g.status}
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

      {/* TAB 4: PROOF OVERSIGHT */}
      {activeTab === 'proofs' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900">All Content Proofs Submitted Across Gigs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications
              .filter((a) => a.proof)
              .map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{app.studentName}</h4>
                      <p className="text-xs text-slate-500">{app.studentCollege}</p>
                    </div>
                    <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {app.proof?.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={app.proof?.screenshotUrl}
                      alt="Proof"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                    <div className="text-xs space-y-1">
                      <a
                        href={app.proof?.postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pink-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>View Reel / Story</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-slate-600 font-medium">
                        {app.proof?.viewsCount.toLocaleString()} views • {app.proof?.likesCount} likes
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Mark As Paid Confirmation Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Confirm UPI Payout Settlement
            </h3>
            <p className="text-xs text-slate-500">
              Confirm that you have transferred ₹{selectedPayout.amount} to creator {selectedPayout.studentName} via UPI.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Creator:</span>
                <span className="font-bold text-slate-900">{selectedPayout.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">UPI VPA:</span>
                <span className="font-mono font-bold text-emerald-700">{selectedPayout.upiId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Amount:</span>
                <span className="font-extrabold text-slate-900 text-sm">₹{selectedPayout.amount}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Bank UTR / Transaction Reference (Optional)
              </label>
              <input
                type="text"
                value={customUtr}
                onChange={(e) => setCustomUtr(e.target.value)}
                placeholder="e.g. UTR481923019823 (or auto-generated)"
                className="w-full text-xs font-mono py-2 px-3 rounded-xl border border-slate-200"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setSelectedPayout(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleProcessPayout(selectedPayout)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-glow-green"
              >
                Confirm & Mark Paid ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
