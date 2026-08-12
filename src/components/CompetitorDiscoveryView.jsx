import React from "react";
import { Search, ExternalLink, ShieldAlert, Layers, DollarSign, CheckCircle2, AlertTriangle } from "lucide-react";

export function CompetitorDiscoveryView({ competitors }) {
  if (!competitors) return null;

  const rivalList = competitors.competitors || [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Search className="w-4 h-4" />
            Competitor Discovery Agent (Tavily Live Web Search)
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Discovered Market Competitors & Rivals</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-300">
            {rivalList.length} Active Competitors Found
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
            Saturation: {competitors.marketSaturation}
          </div>
        </div>
      </div>

      {/* Discovery Summary */}
      {competitors.competitorDiscoverySummary && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-emerald-400">Live Tavily Intelligence Summary: </span>
          {competitors.competitorDiscoverySummary}
        </div>
      )}

      {/* Competitor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rivalList.map((rival, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{rival.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {rival.targetTier}
                    </span>
                  </div>
                  <a
                    href={rival.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    {rival.websiteUrl}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                  {rival.estimatedPricing}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Key Features:</span>
                <div className="flex flex-wrap gap-1.5">
                  {rival.keyFeatures?.map((feat, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-800">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Moat */}
              <div className="text-xs pt-1">
                <span className="font-bold text-indigo-400">Primary Moat: </span>
                <span className="text-slate-300">{rival.primaryMoat}</span>
              </div>
            </div>

            {/* Key Weaknesses / Gaps */}
            <div className="pt-3 border-t border-slate-900 space-y-1">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                Vulnerabilities & Gaps:
              </span>
              <ul className="space-y-0.5 text-xs text-slate-400">
                {rival.keyWeaknesses?.map((w, idx) => (
                  <li key={idx}>• {w}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
