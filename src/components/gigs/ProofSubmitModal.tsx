import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Instagram, UploadCloud, Eye, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';

interface ProofSubmitModalProps {
  applicationId: string;
  onClose: () => void;
}

export const ProofSubmitModal: React.FC<ProofSubmitModalProps> = ({
  applicationId,
  onClose,
}) => {
  const { applications, gigs, submitProof } = useApp();
  const application = applications.find((a) => a.id === applicationId);
  const gig = application ? gigs.find((g) => g.id === application.gigId) : null;

  const [postUrl, setPostUrl] = useState('https://www.instagram.com/reel/DBa94mKqx89/');
  const [platform, setPlatform] = useState<'instagram_reel' | 'instagram_story' | 'youtube_short'>('instagram_reel');
  const [viewsCount, setViewsCount] = useState('16400');
  const [likesCount, setLikesCount] = useState('1420');
  const [commentsCount, setCommentsCount] = useState('68');
  const [screenshotUrl, setScreenshotUrl] = useState('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80');
  const [notes, setNotes] = useState('Shot 4K 60fps vertical reel with trending audio. Tagged restaurant in caption and pinned location!');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!application || !gig) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      submitProof(application.id, {
        postUrl,
        platform,
        viewsCount: parseInt(viewsCount, 10) || 0,
        likesCount: parseInt(likesCount, 10) || 0,
        commentsCount: parseInt(commentsCount, 10) || 0,
        screenshotUrl,
        creatorNotes: notes,
      });
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jiffy-50 text-jiffy-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-jiffy-500" />
            <span>Step 2: Submit Content Proof</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display">
            Submit Review for {gig.restaurantName}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Provide the live post URL and reach analytics to release your ₹{gig.cashReward} UPI payout.
          </p>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Proof Submitted Successfully!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {gig.restaurantName} will review your post within 24 hours. Your ₹{gig.cashReward} payout is lined up!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Deliverables summary reminder */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">Expected Deliverables:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {gig.deliverables.map((d, i) => (
                  <li key={i} className="text-[11px] text-slate-600">{d}</li>
                ))}
              </ul>
            </div>

            {/* Platform Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Content Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform('instagram_reel')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    platform === 'instagram_reel'
                      ? 'bg-pink-50 border-pink-500 text-pink-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Instagram Reel
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('instagram_story')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    platform === 'instagram_story'
                      ? 'bg-pink-50 border-pink-500 text-pink-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Instagram Story
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('youtube_short')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    platform === 'youtube_short'
                      ? 'bg-red-50 border-red-500 text-red-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  YouTube Short
                </button>
              </div>
            </div>

            {/* Live Reel Link */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Live Post / Reel URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  className="w-full text-xs text-slate-800 py-2.5 px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-jiffy-500"
                  placeholder="https://www.instagram.com/reel/..."
                  required
                />
              </div>
            </div>

            {/* Performance Stats: Views, Likes, Comments */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-slate-400" />
                  <span>Views</span>
                </label>
                <input
                  type="number"
                  value={viewsCount}
                  onChange={(e) => setViewsCount(e.target.value)}
                  className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-jiffy-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-slate-400" />
                  <span>Likes</span>
                </label>
                <input
                  type="number"
                  value={likesCount}
                  onChange={(e) => setLikesCount(e.target.value)}
                  className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-jiffy-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-slate-400" />
                  <span>Comments</span>
                </label>
                <input
                  type="number"
                  value={commentsCount}
                  onChange={(e) => setCommentsCount(e.target.value)}
                  className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-jiffy-500"
                  required
                />
              </div>
            </div>

            {/* Screenshot Insights Mock URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Insights Screenshot URL / Demo Proof
              </label>
              <input
                type="text"
                value={screenshotUrl}
                onChange={(e) => setScreenshotUrl(e.target.value)}
                className="w-full text-xs text-slate-800 py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-jiffy-500"
                placeholder="Image URL of reach insights..."
              />
              <div className="mt-1.5 flex items-center gap-2">
                <img
                  src={screenshotUrl}
                  alt="Proof preview"
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                />
                <span className="text-[11px] text-slate-400">Preview of creator insights</span>
              </div>
            </div>

            {/* Creator remarks */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Creator Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-jiffy-500"
                placeholder="Any special remarks for the restaurant manager..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-jiffy-500 hover:bg-jiffy-600 text-white font-extrabold text-xs shadow-glow transition active:scale-98"
            >
              {submitting ? 'Submitting Proof...' : 'Confirm & Submit for Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default ProofSubmitModal;
