import React from "react";
import { BarChart3 } from "lucide-react";

export function ComparisonMatrixView({ comparison, competitors }) {
  if (!comparison) return null;

  const rivalNames = competitors?.competitors?.slice(0, 3).map((c) => c.name) || ["Enterprise Rival A", "Incumbent B"];

  const matrixFeatures = [
    { feature: "Automated AI Analysis Speed", us: true, rivals: [false, false] },
    { feature: "Self-Serve Pricing (< $200/mo)", us: true, rivals: [false, true] },
    { feature: "Exportable Audit Reports", us: true, rivals: [true, false] },
    { feature: "Live Tavily Competitor Web Search", us: true, rivals: [false, false] },
    { feature: "Zero Setup 1-Click Workflow", us: true, rivals: [false, false] }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4 text-slate-900" />
            STRATEGIC COMPARISON AGENT MATRIX
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Us vs Incumbent Feature Matrix
          </h3>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs font-medium">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold font-mono">
            <tr>
              <th className="p-4">CORE CAPABILITY</th>
              <th className="p-4 text-center bg-slate-100 text-slate-900 font-extrabold">GAMMAVAL™ (US)</th>
              {rivalNames.map((r, i) => (
                <th key={i} className="p-4 text-center text-slate-600">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {matrixFeatures.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition">
                <td className="p-4 font-bold text-slate-900">{row.feature}</td>
                <td className="p-4 text-center bg-slate-50/80 font-bold text-emerald-600">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">✓</span>
                </td>
                {row.rivals.map((has, rIdx) => (
                  <td key={rIdx} className="p-4 text-center text-slate-400">
                    {has ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">✕</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategic Moat & UVP Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">UNIQUE VALUE PROPOSITION</span>
          <p className="text-sm font-extrabold text-slate-900">{comparison.uniqueValueProposition}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">SUSTAINABLE DEFENSIBILITY MOAT</span>
          <p className="text-sm font-extrabold text-slate-900">{comparison.defensibilityMoat} — {comparison.moatExplanation}</p>
        </div>
      </div>
    </div>
  );
}
