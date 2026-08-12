import React from "react";
import { Users, Target, Flame, DollarSign, Megaphone, UserCheck } from "lucide-react";

export function CustomerSegmentationView({ customer }) {
  if (!customer) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            Customer Segmentation Agent Evaluation
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Target Customer Segments & ICP</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Pain Severity: {customer.painPointSeverity}/10
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            WTP: {customer.willingnessToPay}
          </div>
        </div>
      </div>

      {/* ICP Summary Card */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" />
          Primary Ideal Customer Profile (ICP)
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {customer.icpSummary}
        </p>
        <div className="text-xs text-slate-400 pt-1 flex items-center gap-2">
          <span>Estimated ARPU:</span>
          <span className="font-mono font-bold text-emerald-400">{customer.estimatedArpu}</span>
        </div>
      </div>

      {/* Persona Cards */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-purple-400" />
          Target Buyer Personas
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customer.personas?.map((persona, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{persona.role}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  Persona 0{i + 1}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">"{persona.demographics}"</p>

              <div className="space-y-2 text-xs pt-1 border-t border-slate-900">
                <div>
                  <span className="font-bold text-rose-400 block mb-0.5">Core Pain Point:</span>
                  <span className="text-slate-300">{persona.corePainPoint}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block mb-0.5">Current Workaround:</span>
                  <span className="text-slate-300">{persona.currentWorkaround}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-400 block mb-0.5">Buying Trigger:</span>
                  <span className="text-slate-300">{persona.buyingTrigger}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acquisition Channels */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-emerald-400" />
          Recommended Go-To-Market (GTM) Channels
        </h4>
        <div className="flex flex-wrap gap-2">
          {customer.acquisitionChannels?.map((ch, i) => (
            <span key={i} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium">
              🎯 {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
