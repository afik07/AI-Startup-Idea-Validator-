import React from "react";
import { BarChart3, CheckCircle2, XCircle, Zap, Shield, Sparkles, Award } from "lucide-react";

export function ComparisonMatrixView({ comparison, competitors }) {
  if (!comparison) return null;

  const rivalNames = competitors?.competitors?.slice(0, 3).map((c) => c.name) || ["Enterprise Rival A", "Incumbent B"];

  const matrixFeatures = [
    { feature: "Automated AI Analysis Speed (< 10s)", us: true, rivals: [false, false] },
    { feature: "Self-Serve Agile Pricing (< $200/mo)", us: true, rivals: [false, true] },
    { feature: "Exportable Executive PDF / Memorandums", us: true, rivals: [true, false] },
    { feature: "Live Tavily Competitor Web Intelligence", us: true, rivals: [false, false] },
    { feature: "Zero Setup 1-Click Multi-Agent Pipeline", us: true, rivals: [false, false] }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Amber Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4 text-amber-600 animate-pulse" />
            STRATEGIC COMPARISON AGENT • FEATURE PARITY
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Us vs Incumbent Feature & Moat Parity Matrix
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Competitive Benchmarking • Capability Breakdown • Switching Cost Advantage
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold shadow-md shadow-amber-500/20 flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Advantage: Asymmetric Agility</span>
          </div>
        </div>
      </div>

      {/* Comparison Table with Colorful Accents */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-xs font-medium">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold font-mono">
            <tr>
              <th className="p-4 sm:p-5">CORE CAPABILITY</th>
              <th className="p-4 sm:p-5 text-center bg-gradient-to-r from-indigo-900 to-slate-900 text-white font-extrabold rounded-t-xl">
                OUR PLATFORM (US)
              </th>
              {rivalNames.map((r, i) => (
                <th key={i} className="p-4 sm:p-5 text-center text-slate-600 font-bold">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {matrixFeatures.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>{row.feature}</span>
                </td>
                <td className="p-4 sm:p-5 text-center bg-indigo-50/40 font-bold">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 shadow-2xs font-black">
                    ✓
                  </span>
                </td>
                {row.rivals.map((has, rIdx) => (
                  <td key={rIdx} className="p-4 sm:p-5 text-center">
                    {has ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 font-bold">✕</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategic Moat & UVP Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50/60 to-white border border-amber-200 hover:border-amber-300 hover:shadow-md transition space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-xs">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              UNIQUE VALUE PROPOSITION
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 leading-relaxed">{comparison.uniqueValueProposition}</p>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-50/60 to-white border border-purple-200 hover:border-purple-300 hover:shadow-md transition space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">
              SUSTAINABLE DEFENSIBILITY MOAT
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 leading-relaxed">
            {comparison.defensibilityMoat} — {comparison.moatExplanation}
          </p>
        </div>
      </div>
    </div>
  );
}
