import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { CheckCircle, QrCode, Sparkles, Instagram, ShieldCheck, Share2, Award, Zap } from 'lucide-react';

interface JiffyIdCardProps {
  student: StudentProfile;
}

export const JiffyIdCard: React.FC<JiffyIdCardProps> = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const jiffyIdCode = `JFY-${student.collegeCity.slice(0, 3).toUpperCase()}-${student.gradYear}-${student.id.slice(-4).toUpperCase()}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(jiffyIdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-sm mx-auto perspective-1000">
      {/* Front of the Card */}
      {!isFlipped ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-jiffy-950 text-white p-6 shadow-2xl border border-slate-700/60 transition-all duration-300 transform hover:scale-[1.01]">
          {/* Holographic background ambient glow */}
          <div className="absolute -top-24 -right-24 w-52 h-52 bg-jiffy-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Subtle noise grid pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Header Row */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-jiffy-500 to-amber-400 flex items-center justify-center text-white font-black text-sm shadow-glow">
                ⚡
              </div>
              <div>
                <span className="font-extrabold tracking-wider text-sm font-display">JIFFY ID</span>
                <span className="text-[10px] text-jiffy-300 block font-semibold leading-none">
                  Official Creator Pass
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </div>
          </div>

          {/* Middle: Student Info */}
          <div className="relative z-10 mt-5 flex items-center gap-4">
            <div className="relative">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-jiffy-400/60 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-jiffy-500 text-white flex items-center justify-center text-xs shadow">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-base font-bold truncate text-white">{student.name}</h4>
              </div>
              <p className="text-xs text-slate-300 font-medium truncate mt-0.5">
                {student.college}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {student.degree} • Class of {student.gradYear}
              </p>

              {/* Creator Tier Badge */}
              <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                <Award className="w-3 h-3" />
                <span>{student.jiffyTier}</span>
              </div>
            </div>
          </div>

          {/* Social Stats Strip */}
          <div className="relative z-10 mt-5 grid grid-cols-3 gap-2 bg-white/5 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium">
                <Instagram className="w-3 h-3 text-pink-400" />
                <span>Followers</span>
              </div>
              <p className="text-sm font-extrabold text-white mt-0.5">
                {(student.followersCount / 1000).toFixed(1)}k
              </p>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Avg ER%</div>
              <p className="text-sm font-extrabold text-emerald-400 mt-0.5">
                {student.engagementRate}%
              </p>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Gigs Done</div>
              <p className="text-sm font-extrabold text-amber-400 mt-0.5">
                {student.completedGigsCount}
              </p>
            </div>
          </div>

          {/* Bottom Row: Scannable Check-in Token */}
          <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                Creator Token
              </span>
              <button
                onClick={handleCopyCode}
                className="font-mono text-xs font-bold text-jiffy-300 hover:text-white flex items-center gap-1 transition"
              >
                <span>{jiffyIdCode}</span>
                <span className="text-[10px]">{copied ? '✓' : '⧉'}</span>
              </button>
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition"
            >
              <QrCode className="w-4 h-4 text-jiffy-400" />
              <span>Show QR</span>
            </button>
          </div>
        </div>
      ) : (
        /* Back of the Card: Scannable QR for Restaurant Counter Check-In */
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-black text-white p-6 shadow-2xl border border-slate-700/60 text-center transition-all duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Restaurant Check-In Scan
            </span>
            <button
              onClick={() => setIsFlipped(false)}
              className="text-xs font-bold text-jiffy-400 hover:underline"
            >
              ← Back to ID
            </button>
          </div>

          {/* QR Code Container */}
          <div className="my-5 flex flex-col items-center justify-center">
            <div className="p-4 bg-white rounded-2xl shadow-xl inline-block">
              {/* High fidelity SVG simulated QR code */}
              <svg
                viewBox="0 0 100 100"
                className="w-36 h-36 text-slate-950 fill-current"
              >
                {/* Position Markers */}
                <rect x="0" y="0" width="28" height="28" rx="4" />
                <rect x="4" y="4" width="20" height="20" fill="white" rx="2" />
                <rect x="8" y="8" width="12" height="12" rx="2" />

                <rect x="72" y="0" width="28" height="28" rx="4" />
                <rect x="76" y="4" width="20" height="20" fill="white" rx="2" />
                <rect x="80" y="8" width="12" height="12" rx="2" />

                <rect x="0" y="72" width="28" height="28" rx="4" />
                <rect x="4" y="76" width="20" height="20" fill="white" rx="2" />
                <rect x="8" y="80" width="12" height="12" rx="2" />

                {/* Data blocks */}
                <rect x="36" y="10" width="8" height="8" />
                <rect x="52" y="10" width="12" height="8" />
                <rect x="36" y="26" width="16" height="8" />
                <rect x="12" y="38" width="8" height="12" />
                <rect x="28" y="42" width="16" height="16" />
                <rect x="52" y="36" width="20" height="8" />
                <rect x="80" y="42" width="12" height="14" />
                <rect x="36" y="68" width="12" height="16" />
                <rect x="56" y="62" width="16" height="10" />
                <rect x="78" y="74" width="14" height="14" />
              </svg>
            </div>
            <p className="font-mono text-xs font-bold text-slate-300 mt-3 tracking-wider">
              {jiffyIdCode}
            </p>
          </div>

          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            Show this QR pass to the restaurant host to verify your reservation and activate your meal voucher.
          </p>

          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>NFC Ready • Instant Check-in</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default JiffyIdCard;
