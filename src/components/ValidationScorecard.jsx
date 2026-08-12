import React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Award, AlertTriangle, CheckCircle2, RefreshCw, Zap, ShieldAlert, ShieldCheck, TrendingUp, Target, Layers } from "lucide-react";

export function ValidationScorecard({ report }) {
  if (!report || !report.comparison) return null;

  const { comparison, idea, market, customer } = report;
  const score = comparison.validationScore || 85;
  const verdict = comparison.verdict || "STRONG GO";

  // Multi-dimensional Radar Chart Data
  const radarData = [
    { subject: "Market Size & CAGR", score: Math.min(market?.opportunityScore || 80, 100) },
    { subject: "Customer ICP Urgency", score: (customer?.painPointSeverity || 8) * 10 },
    { subject: "Willingness To Pay", score: customer?.willingnessToPay === "Very High" ? 95 : customer?.willingnessToPay === "High" ? 85 : 70 },
    { subject: "Defensibility Moat", score: comparison?.defensibilityMoat === "High" ? 90 : comparison?.defensibilityMoat === "Medium" ? 75 : 55 },
    { subject: "Competitive Gap", score: 85 }
  ];

  const getVerdictStyle = (v) => {
    if (v.includes("STRONG") || v.includes("GO")) {
      return {
        bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        badge: "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20",
        icon: CheckCircle2
      };
    } else if (v.includes("CAUTION") || v.includes("PROCEED")) {
      return {
        bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        badge: "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20",
        icon: AlertTriangle
      };
    } else {
      return {
        bg: "bg-rose-500/10 border-rose-500/30 text-rose-400",
        badge: "bg-rose-500 text-white shadow-lg shadow-rose-500/20",
        icon: RefreshCw
      };
    }
  };

  const vStyle = getVerdictStyle(verdict);

  return (
    <div className="glass-card-glow rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 animate-fade-in relative overflow-hidden">
      {/* Top Hero Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
        {/* Radial Score Gauge */}
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-950 border-4 border-slate-800/80 flex items-center justify-center shadow-2xl shrink-0 group">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="7"
                className="text-slate-900"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="7"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * score) / 100}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  score >= 80 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-rose-400"
                }`}
                fill="transparent"
              />
            </svg>
            <div className="text-center z-10 font-mono">
              <span className="text-3xl sm:text-4xl font-black text-white">{score}</span>
              <span className="text-[10px] text-slate-400 block font-bold">VAL_INDEX</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest ${vStyle.badge}`}>
                {verdict}
              </span>
              <span className="text-xs text-slate-400 font-mono">Validated in {report.durationSeconds}s</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {idea.title}
            </h2>
            <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed font-medium">
              {comparison.verdictSummary}
            </p>
          </div>
        </div>

        {/* Strategic Moat & Risk Index */}
        <div className="w-full lg:w-auto p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 shrink-0 shadow-inner">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between gap-4">
            <span>Defensibility Moat</span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
              comparison.defensibilityMoat === "High" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            }`}>
              {comparison.defensibilityMoat} Moat
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-xs leading-relaxed font-medium">
            {comparison.moatExplanation}
          </p>
        </div>
      </div>

      {/* Dual Visualizer Grid: Radar Chart + UVP Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts Spider Radar Visualizer */}
        <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              5-Vector Viability Radar Index
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">0-100 Score Metric</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} />
                <Radar name="Startup Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Unique Value Proposition & Actionable Next Steps */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2 shadow-lg">
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              Winning Unique Value Proposition (UVP)
            </div>
            <p className="text-sm font-semibold text-slate-100 leading-relaxed italic">
              "{comparison.uniqueValueProposition}"
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-3">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Strategic Directives & Action Plan
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              {comparison.actionableRecommendations?.map((rec, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
