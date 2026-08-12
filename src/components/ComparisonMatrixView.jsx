import React from "react";
import { BarChart3, CheckCircle2, XCircle, MinusCircle, ShieldCheck, Zap } from "lucide-react";

export function ComparisonMatrixView({ comparison, competitors }) {
  if (!comparison) return null;

  const featureMatrix = comparison.featureMatrix || [];
  const rivalA = competitors?.competitors?.[0]?.name || "Competitor A";
  const rivalB = competitors?.competitors?.[1]?.name || "Competitor B";

  const renderParityIcon = (val) => {
    if (val === "Full" || val === "Strong") {
      return <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />;
    } else if (val === "Partial" || val === "Moderate" || val === "Planned") {
      return <MinusCircle className="w-4 h-4 text-amber-400 mx-auto" />;
    } else {
      return <XCircle className="w-4 h-4 text-slate-600 mx-auto" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            Comparison & Strategy Agent
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Us vs Competitors Feature Parity Matrix</h3>
        </div>
      </div>

      {/* Feature Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
            <tr>
              <th className="p-4">Key Capability / Feature</th>
              <th className="p-4 text-center text-indigo-400 font-bold bg-indigo-500/10">Our Startup</th>
              <th className="p-4 text-center">{rivalA}</th>
              <th className="p-4 text-center">{rivalB}</th>
              <th className="p-4 text-center">Customer Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {featureMatrix.map((row, i) => (
              <tr key={i} className="hover:bg-slate-900/50 transition">
                <td className="p-4 text-slate-200 font-semibold">{row.featureName}</td>
                <td className="p-4 text-center bg-indigo-500/5 font-bold text-indigo-300">
                  <div className="flex items-center justify-center gap-1">
                    {renderParityIcon(row.ourCapability)}
                    <span>{row.ourCapability}</span>
                  </div>
                </td>
                <td className="p-4 text-center text-slate-300">
                  {renderParityIcon(row.competitorAScore)}
                </td>
                <td className="p-4 text-center text-slate-300">
                  {renderParityIcon(row.competitorBScore)}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    row.importanceToCustomer === "Critical" ? "bg-rose-500/20 text-rose-300" : "bg-slate-800 text-slate-400"
                  }`}>
                    {row.importanceToCustomer}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Market Gaps & SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unexploited Market Gaps */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            Unexploited Market Opportunities & Gaps
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {comparison.marketGaps?.map((gap, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SWOT Grid */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Strategic SWOT Matrix Summary
          </h4>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="font-bold text-emerald-400 block mb-1">Strengths</span>
              <ul className="text-slate-300 space-y-0.5">
                {comparison.swotAnalysis?.strengths?.map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="font-bold text-amber-400 block mb-1">Weaknesses</span>
              <ul className="text-slate-300 space-y-0.5">
                {comparison.swotAnalysis?.weaknesses?.map((w, i) => <li key={i}>• {w}</li>)}
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <span className="font-bold text-indigo-400 block mb-1">Opportunities</span>
              <ul className="text-slate-300 space-y-0.5">
                {comparison.swotAnalysis?.opportunities?.map((o, i) => <li key={i}>• {o}</li>)}
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <span className="font-bold text-rose-400 block mb-1">Threats</span>
              <ul className="text-slate-300 space-y-0.5">
                {comparison.swotAnalysis?.threats?.map((t, i) => <li key={i}>• {t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
