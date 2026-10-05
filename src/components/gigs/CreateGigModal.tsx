import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Utensils, IndianRupee, CheckCircle2, Plus, Trash2 } from 'lucide-react';

interface CreateGigModalProps {
  onClose: () => void;
}

export const CreateGigModal: React.FC<CreateGigModalProps> = ({ onClose }) => {
  const { currentRestaurant, createGig, activeCity } = useApp();

  const [title, setTitle] = useState('');
  const [cuisine, setCuisine] = useState(currentRestaurant.cuisine[0] || 'Café & Continental');
  const [neighborhood, setNeighborhood] = useState(currentRestaurant.neighborhood);
  const [description, setDescription] = useState('');
  const [freeMealValue, setFreeMealValue] = useState('1500');
  const [cashReward, setCashReward] = useState('1000');
  const [minFollowers, setMinFollowers] = useState('2500');
  const [spotsTotal, setSpotsTotal] = useState('4');
  const [coverUrl, setCoverUrl] = useState(
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80'
  );
  const [deliverables, setDeliverables] = useState<string[]>([
    '1 Instagram Reel (30-45s) showcasing hero dish + ambiance',
    '2 Instagram Stories with @brand tag & geotag',
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setSubmitting(true);
    setTimeout(() => {
      createGig({
        restaurantId: currentRestaurant.id,
        restaurantName: currentRestaurant.brandName,
        restaurantLogo: currentRestaurant.logoUrl,
        restaurantCover: coverUrl,
        neighborhood,
        city: activeCity,
        title,
        cuisine,
        description,
        freeMealValue: parseInt(freeMealValue, 10) || 1000,
        cashReward: parseInt(cashReward, 10) || 500,
        deliverables,
        minFollowers: parseInt(minFollowers, 10) || 2000,
        spotsTotal: parseInt(spotsTotal, 10) || 3,
        dietaryTags: ['Signature Dishes', 'Student Friendly'],
        deadline: new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0],
        guidelines: [
          'High resolution vertical format (9:16) only',
          `Tag @${currentRestaurant.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')} as collaborator`,
          'Show Jiffy ID card upon restaurant arrival',
        ],
      });
      setSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 relative overflow-hidden my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Host New Food Review Gig</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display">
            Create Gig for {currentRestaurant.brandName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Set your deliverables, student perks, and target creator thresholds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Gig Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Gig Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs text-slate-800 py-2.5 px-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. Monsoon Sourdough Pizza Launch & Cheese Pull Reel"
              required
            />
          </div>

          {/* Cuisine & Neighborhood */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Cuisine / Category
              </label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="e.g. Burgers & Shakes"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Neighborhood
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Gig Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs text-slate-800 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Describe the dining experience, signature dishes to taste, and video aesthetic desired..."
              required
            />
          </div>

          {/* Compensation Settings: Meal Voucher & Cash */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
            <span className="text-xs font-bold text-emerald-900 block">
              Creator Perks & Compensation
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Complimentary Meal Voucher (₹)
                </label>
                <input
                  type="number"
                  value={freeMealValue}
                  onChange={(e) => setFreeMealValue(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400">For 2 dining guests</span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Cash Reward via UPI (₹)
                </label>
                <input
                  type="number"
                  value={cashReward}
                  onChange={(e) => setCashReward(e.target.value)}
                  className="w-full text-xs font-bold text-emerald-700 py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400">Paid upon proof approval</span>
              </div>
            </div>
          </div>

          {/* Follower threshold & Spots */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Min. Followers Required
              </label>
              <select
                value={minFollowers}
                onChange={(e) => setMinFollowers(e.target.value)}
                className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                <option value="2000">2,000+ (Jiffy Baseline)</option>
                <option value="3000">3,000+ (Mid Tier)</option>
                <option value="5000">5,000+ (Pro Creators)</option>
                <option value="8000">8,000+ (Top Influencers)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Total Spots Available
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={spotsTotal}
                onChange={(e) => setSpotsTotal(e.target.value)}
                className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                required
              />
            </div>
          </div>

          {/* Deliverables List */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Required Deliverables
            </label>
            <div className="space-y-1.5 mb-2">
              {deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                className="flex-1 text-xs text-slate-800 py-1.5 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Add another requirement (e.g. 1 YouTube Short)..."
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition active:scale-98"
            >
              {submitting ? 'Publishing Gig...' : 'Publish Gig to Student Feed ⚡'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateGigModal;
