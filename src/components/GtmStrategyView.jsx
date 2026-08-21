import React from "react";
import { Rocket, Target, Megaphone, Calendar, DollarSign, CheckCircle2 } from "lucide-react";

export function GtmStrategyView({ gtm }) {
  if (!gtm) return null;

  const { positioningStatement, first100CustomersPlaybook, primaryChannels, pricingOptimization, launchTimeline90Days } = gtm;

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Rocket className="w-4 h-4 text-slate-900" />
            GO-TO-MARKET STRATEGY AGENT ("HOW TO GET STARTED?")
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            90-Day Execution Roadmap & Customer Acquisition Playbook
          </h3>
        </div>
      </div>

      {/* Positioning Statement Card */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Target className="w-4 h-4 text-slate-900" />
          Official Product Positioning Statement
        </span>
        <p className="text-sm font-extrabold text-slate-900 leading-relaxed italic">
          "{positioningStatement}"
        </p>
      </div>

      {/* First 100 Customers Playbook */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-slate-900" />
          First 100 Customers Acquisition Playbook (0 → 100 Users)
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          {first100CustomersPlaybook}
        </p>
      </div>

      {/* Primary Channels & Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Acquisition Channels */}
        <div className="lg:col-span-7 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            Top 3 High-Conversion Acquisition Channels
          </h4>
          <div className="space-y-3">
            {primaryChannels?.map((ch, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{ch.channelName}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Cost: {ch.expectedCost}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">{ch.tactics}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Strategy */}
        <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-slate-900" />
            Monetization & Pricing Strategy
          </h4>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-400 text-[10px] block uppercase">Recommended Pricing Tier</span>
              <span className="font-extrabold text-slate-900 text-sm block">{pricingOptimization?.recommendedTier}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-400 text-[10px] block uppercase">Freemium Lead Magnet</span>
              <span className="text-slate-700 text-[11px] font-medium block">{pricingOptimization?.freemiumStrategy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 90-Day Step-by-Step Launch Timeline */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-900" />
          90-Day Launch Milestone Timeline
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {launchTimeline90Days?.map((month, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  Phase 0{idx + 1}
                </span>
                <span className="font-extrabold text-slate-900 text-xs truncate">{month.phase}</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {month.milestones?.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[11px]">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
