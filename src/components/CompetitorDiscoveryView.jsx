import React from "react";
import { Search, ExternalLink } from "lucide-react";

export function CompetitorDiscoveryView({ competitors }) {
  if (!competitors) return null;

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Search className="w-4 h-4 text-slate-900" />
            TAVILY LIVE WEB SEARCH DISCOVERY AGENT
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Direct & Indirect Competitor Landscape
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            Market Saturation: {competitors.marketSaturation}
          </div>
        </div>
      </div>

      {/* Competitor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitors.competitors?.map((comp, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">{comp.name}</span>
                {comp.websiteUrl && comp.websiteUrl !== "N/A" && (
                  <a
                    href={comp.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-slate-400 hover:text-slate-900 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                {comp.estimatedPricing}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <div>
                <strong className="text-slate-900 font-extrabold block">Primary Value Proposition:</strong>
                <p className="text-slate-600 leading-relaxed text-xs">{comp.coreOffer}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-mono font-bold block text-[9px]">TARGET TIER</span>
                  <span className="font-bold text-slate-900">{comp.targetTier}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-mono font-bold block text-[9px]">PRIMARY MOAT</span>
                  <span className="font-bold text-slate-900">{comp.primaryMoat}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
