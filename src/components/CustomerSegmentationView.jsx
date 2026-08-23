import React from "react";
import { Users, User, Flame, DollarSign, Target, Sparkles, CheckCircle2, Award, Zap } from "lucide-react";

export function CustomerSegmentationView({ customer }) {
  if (!customer) return null;

  const painSeverity = customer.painPointSeverity || 8;
  const painPercent = (painSeverity / 10) * 100;

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Top Purple Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-600 uppercase tracking-widest">
            <Users className="w-4 h-4 text-purple-600 animate-pulse" />
            CUSTOMER SEGMENTATION & ICP PROFILING AGENT
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Target Customer Persona & Behavioral Archetypes
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Ideal Customer Profiles • Pain Severity Scoring • Willingness-To-Pay
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold shadow-md shadow-purple-500/20 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Pain Severity: {customer.painPointSeverity}/10</span>
          </div>
        </div>
      </div>

      {/* ICP Summary Banner (Vibrant Gradient Card) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50/90 via-indigo-50/60 to-white border border-purple-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest flex items-center gap-1.5">
            <Target className="w-4 h-4 text-purple-600" />
            PRIMARY IDEAL CUSTOMER PROFILE (ICP)
          </span>
          <span className="text-[11px] font-mono font-bold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
            High Conversion Cohort
          </span>
        </div>
        <p className="text-sm font-bold text-slate-900 leading-relaxed">
          {customer.icpSummary}
        </p>

        {/* Dynamic Pain Intensity Meter */}
        <div className="pt-2 space-y-1.5">
          <div className="flex justify-between text-xs font-mono font-bold text-slate-600">
            <span>PAIN URGENCY INTENSITY</span>
            <span className="text-purple-700 font-bold">{customer.painPointSeverity} / 10 ({painPercent >= 80 ? "Critical Hair-On-Fire Pain" : "High Friction"})</span>
          </div>
          <div className="w-full bg-purple-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-rose-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${painPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Persona Cards Grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          Detailed Buyer Persona Breakdown
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customer.personas?.map((persona, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm tracking-tight">{persona.roleTitle}</h5>
                    <span className="text-[11px] font-mono text-purple-600 font-medium">{persona.demographics}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                  PERSONA 0{idx + 1}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
                  <strong className="text-purple-950 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-600" />
                    Core Operational Pain Point:
                  </strong>
                  <p className="text-slate-600 leading-relaxed font-medium">{persona.corePainPoint}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <strong className="text-slate-900 font-bold flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-slate-500" />
                    Current Workaround & Flaws:
                  </strong>
                  <p className="text-slate-600 leading-relaxed font-medium">{persona.currentWorkaround}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WTP & Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-50/60 to-white border border-purple-200 space-y-2 hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">
              Willingness To Pay (WTP) & ARPU Rating
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 tracking-tight">{customer.willingnessToPay}</div>
          <p className="text-xs text-slate-600 font-bold font-mono">
            Target ACV / ARPU: <span className="text-purple-700 font-extrabold">{customer.estimatedArpu}</span>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50/60 to-white border border-indigo-200 space-y-2 hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
              <Target className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
              High-Converting Acquisition Channels
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {customer.acquisitionChannels?.map((ch, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800 shadow-2xs hover:border-indigo-400 hover:text-indigo-600 transition"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
