import React from "react";
import { Rocket, Target, Megaphone, Calendar, DollarSign, CheckCircle2, Sparkles, Zap, ArrowRight, TrendingUp } from "lucide-react";

export function GtmStrategyView({ gtm }) {
  if (!gtm) return null;

  const { positioningStatement, first100CustomersPlaybook, primaryChannels, pricingOptimization, launchTimeline90Days } = gtm;

  const phaseColors = [
    { bg: "from-fuchsia-50/70 to-white", border: "border-fuchsia-200", badge: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200", dot: "bg-fuchsia-600" },
    { bg: "from-indigo-50/70 to-white", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-800 border-indigo-200", dot: "bg-indigo-600" },
    { bg: "from-emerald-50/70 to-white", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", dot: "bg-emerald-600" }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Fuchsia Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-fuchsia-600 uppercase tracking-widest">
            <Rocket className="w-4 h-4 text-fuchsia-600 animate-pulse" />
            GO-TO-MARKET STRATEGY AGENT • 90-DAY LAUNCH PLAYBOOK
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            90-Day Commercialization Roadmap & Zero-to-One Acquisition Playbook
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Geoffrey Moore Positioning • First 100 Customer Flywheel • Monetization Optimization
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-extrabold shadow-md shadow-fuchsia-500/20 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>Target: 0 $\rightarrow$ 100 ICP Users</span>
          </div>
        </div>
      </div>

      {/* Positioning Statement Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-fuchsia-50/90 via-purple-50/60 to-white border border-fuchsia-200 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-fuchsia-600" />
          <span className="text-xs font-mono font-bold text-fuchsia-800 uppercase tracking-widest">
            Geoffrey Moore Product Positioning Formula
          </span>
        </div>
        <p className="text-sm font-bold text-slate-900 leading-relaxed italic">
          "{positioningStatement}"
        </p>
      </div>

      {/* First 100 Customers Playbook */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-fuchsia-200 hover:shadow-md transition space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-fuchsia-600" />
            Zero-to-One Acquisition Flywheel (First 100 Customers)
          </h4>
          <span className="text-[10px] font-mono font-bold bg-fuchsia-50 text-fuchsia-700 px-2.5 py-0.5 rounded-full border border-fuchsia-200">
            Founder-Led Outbound
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          {first100CustomersPlaybook}
        </p>
      </div>

      {/* Primary Channels & Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Acquisition Channels */}
        <div className="lg:col-span-7 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 shadow-2xs">
          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-fuchsia-600" />
            Top 3 High-Conversion Acquisition Channels
          </h4>
          <div className="space-y-3">
            {primaryChannels?.map((ch, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 hover:border-fuchsia-200 transition">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 text-xs">{ch.channelName}</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200">
                    Cost: {ch.expectedCost}
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{ch.tactics}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Strategy */}
        <div className="lg:col-span-5 bg-gradient-to-b from-fuchsia-50/50 to-white p-6 rounded-3xl border border-fuchsia-200 space-y-4 shadow-2xs">
          <h4 className="text-xs font-mono font-bold text-fuchsia-800 uppercase tracking-widest flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-fuchsia-600" />
            Monetization & Pricing Model
          </h4>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-fuchsia-100 space-y-1">
              <span className="font-bold text-fuchsia-700 text-[10px] block uppercase font-mono">Recommended Tier</span>
              <span className="font-black text-slate-900 text-base block">{pricingOptimization?.recommendedTier}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-fuchsia-100 space-y-1">
              <span className="font-bold text-slate-500 text-[10px] block uppercase font-mono">Freemium Lead Magnet</span>
              <span className="text-slate-700 text-xs font-medium block leading-relaxed">{pricingOptimization?.freemiumStrategy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 90-Day Step-by-Step Launch Timeline */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
          <Calendar className="w-4 h-4 text-fuchsia-600" />
          90-Day Launch Milestone Timeline (3-Phase Sprints)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {launchTimeline90Days?.map((month, idx) => {
            const phaseStyle = phaseColors[idx] || phaseColors[0];
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-gradient-to-b ${phaseStyle.bg} border ${phaseStyle.border} shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${phaseStyle.dot} animate-pulse`}></span>
                    <span className="font-black text-slate-900 text-xs truncate">{month.phase}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${phaseStyle.badge}`}>
                    Phase 0{idx + 1}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  {month.milestones?.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed font-semibold text-slate-800">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
