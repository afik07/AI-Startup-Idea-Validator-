import React from "react";
import { Search, ExternalLink, Compass, Shield, Target, Zap, Sparkles, CheckCircle2, Globe } from "lucide-react";

export function CompetitorDiscoveryView({ competitors }) {
  if (!competitors) return null;

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Top Emerald Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">
            <Search className="w-4 h-4 text-emerald-600 animate-pulse" />
            TAVILY LIVE WEB SEARCH DISCOVERY AGENT
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Direct & Indirect Competitor Landscape & 2x2 Positioning Map
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Real-time web competitive intelligence • Feature Parity • Strategic Moats
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-1.5">
            <Globe className="w-4 h-4" />
            <span>Market Saturation: {competitors.marketSaturation || "Moderate"}</span>
          </div>
        </div>
      </div>

      {/* 2x2 Competitive Positioning Map (Vibrant & Animated) */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-50 to-emerald-50/20 border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            2x2 Strategic Competitor Positioning Matrix
          </h4>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold border border-emerald-200">
            ★ Disruptor Market Opportunity
          </span>
        </div>

        <div className="relative w-full h-80 bg-white rounded-3xl border border-slate-200 p-6 overflow-hidden shadow-inner">
          {/* Axis Labels */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-indigo-700 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 shadow-2xs">
            ▲ High AI Automation & Real-Time Telemetry
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-slate-500 uppercase bg-slate-50 px-3 py-0.5 rounded-full">
            ▼ Manual / Static Legacy Workflows
          </div>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono font-bold text-slate-400 uppercase">
            High Cost ($10k+)
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-mono font-bold text-emerald-700 uppercase">
            Accessible & Agile
          </div>

          {/* Grid Center Lines */}
          <div className="absolute inset-x-10 top-1/2 h-px bg-slate-200"></div>
          <div className="absolute inset-y-10 left-1/2 w-px bg-slate-200"></div>

          {/* Quadrant 1 (Top Right - Sweet Spot / Us) */}
          <div className="absolute top-14 right-14 z-10 flex flex-col items-center group cursor-pointer">
            <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-950 to-indigo-950 text-white text-xs font-black shadow-xl flex items-center gap-2 ring-4 ring-emerald-400/40 animate-pulse border border-emerald-400">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Our Platform (You)</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 mt-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              High Tech + Accessible
            </span>
          </div>

          {/* Quadrant 2 (Top Left - Enterprise Point Solutions) */}
          <div className="absolute top-16 left-16 flex flex-col items-center">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold shadow-2xs hover:scale-105 transition">
              {competitors.competitors?.[0]?.name || "Enterprise Suites"}
            </div>
            <span className="text-[9px] font-mono text-slate-400 mt-0.5">High Tech / High Cost</span>
          </div>

          {/* Quadrant 3 (Bottom Left - Legacy Consulting / Labs) */}
          <div className="absolute bottom-16 left-20 flex flex-col items-center">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold shadow-2xs hover:scale-105 transition">
              {competitors.competitors?.[1]?.name || "Traditional Labs"}
            </div>
            <span className="text-[9px] font-mono text-slate-400 mt-0.5">Manual / Slow Turnaround</span>
          </div>

          {/* Quadrant 4 (Bottom Right - Point Tools) */}
          <div className="absolute bottom-14 right-20 flex flex-col items-center">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold shadow-2xs hover:scale-105 transition">
              {competitors.competitors?.[2]?.name || "Point Tools"}
            </div>
            <span className="text-[9px] font-mono text-slate-400 mt-0.5">Low Cost / Basic Features</span>
          </div>
        </div>
      </div>

      {/* Competitor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitors.competitors?.map((comp, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-base tracking-tight">{comp.name}</span>
                {comp.websiteUrl && comp.websiteUrl !== "N/A" && (
                  <a
                    href={comp.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                {comp.estimatedPricing || "$150/mo"}
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div>
                <strong className="text-slate-900 font-bold block mb-1">Primary Value Proposition:</strong>
                <p className="text-slate-600 leading-relaxed text-xs">{comp.coreOffer}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-mono font-bold block text-[9px]">TARGET TIER</span>
                  <span className="font-bold text-slate-900">{comp.targetTier || "Mid-Enterprise"}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-mono font-bold block text-[9px]">PRIMARY MOAT</span>
                  <span className="font-bold text-slate-900">{comp.primaryMoat || "Legacy Distribution"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
