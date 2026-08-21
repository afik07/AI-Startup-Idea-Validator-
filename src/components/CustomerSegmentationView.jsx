import React from "react";
import { Users, User } from "lucide-react";

export function CustomerSegmentationView({ customer }) {
  if (!customer) return null;

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Users className="w-4 h-4 text-slate-900" />
            CUSTOMER SEGMENTATION & ICP AGENT
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Target Customer Profile & Buyer Personas
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            Pain Severity: {customer.painPointSeverity}/10
          </div>
        </div>
      </div>

      {/* ICP Summary Banner */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
          PRIMARY IDEAL CUSTOMER PROFILE (ICP)
        </span>
        <p className="text-sm font-bold text-slate-900 leading-relaxed">
          {customer.icpSummary}
        </p>
      </div>

      {/* Persona Cards Grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
          Detailed Buyer Persona Breakdown
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customer.personas?.map((persona, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-900" />
                  <span className="font-extrabold text-slate-900 text-sm">{persona.roleTitle}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {persona.demographics}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-700 font-medium">
                <div>
                  <strong className="text-slate-900 font-extrabold block">Core Operational Pain Point:</strong>
                  <p className="text-slate-600 text-xs leading-relaxed">{persona.corePainPoint}</p>
                </div>
                <div>
                  <strong className="text-slate-900 font-extrabold block">Current Workaround:</strong>
                  <p className="text-slate-600 text-xs leading-relaxed">{persona.currentWorkaround}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WTP & Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
            Willingness To Pay (WTP) & ARPU Rating
          </span>
          <div className="text-lg font-bold text-slate-900">{customer.willingnessToPay}</div>
          <p className="text-xs text-slate-600 font-medium">Estimated ARPU: {customer.estimatedArpu}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
            Primary Acquisition Channels
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {customer.acquisitionChannels?.map((ch, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800">
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
