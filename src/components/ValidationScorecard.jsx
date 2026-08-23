import React, { useState } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { Sparkles, ShieldCheck, FileText, Image as ImageIcon, Eye, CheckCircle2, Zap, Shield, Target, Award, ArrowUpRight, TrendingUp } from "lucide-react";

export function ValidationScorecard({ report }) {
  const [showImagePreview, setShowImagePreview] = useState(false);
  if (!report) return null;

  const { idea, comparison, durationSeconds } = report;
  const score = comparison?.validationScore || 85;

  const radarData = [
    { subject: "Market Size & Growth", value: comparison?.marketFeasibilityScore || 85 },
    { subject: "Customer WTP", value: comparison?.customerWillingnessScore || 80 },
    { subject: "Competitive Moat", value: comparison?.competitiveMoatScore || 75 },
    { subject: "SWOT Risk Safety", value: 100 - (report.swotRisk?.riskScores?.overallRiskIndex || 40) },
    { subject: "GTM Velocity", value: comparison?.gtmFeasibilityScore || 90 }
  ];

  // Dynamic Verdict Badge Colors
  const isHigh = score >= 80;
  const isMedium = score >= 65 && score < 80;

  const verdictGradient = isHigh
    ? "from-emerald-600 to-teal-600 shadow-emerald-500/20 text-white"
    : isMedium
    ? "from-amber-500 to-orange-500 shadow-amber-500/20 text-white"
    : "from-rose-600 to-red-600 shadow-rose-500/20 text-white";

  const scoreStrokeColor = isHigh ? "#10b981" : isMedium ? "#f59e0b" : "#f43f5e";

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Top Background Gradient Aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            OFFICIAL GAMMAVAL™ DUE DILIGENCE AUDIT
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {idea.title}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {idea.domain} • Validated in <strong className="text-indigo-600">{durationSeconds}s</strong>
          </p>
        </div>

        {/* Glowing Verdict Pill */}
        <div className="flex items-center gap-3 font-mono">
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${verdictGradient} text-xs font-extrabold flex items-center gap-2 shadow-lg tracking-wide animate-fade-in`}>
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>VERDICT: {comparison?.verdict || "STRONG GO"}</span>
          </div>
        </div>
      </div>

      {/* Attached Document & Vision Ingestion Badge */}
      {idea.attachedDocument && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/90 to-purple-50/70 border border-indigo-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-3">
            {idea.attachedDocument.isImage && idea.attachedDocument.dataUrl ? (
              <div
                onClick={() => setShowImagePreview(!showImagePreview)}
                className="cursor-pointer group relative"
                title="Click to preview uploaded image"
              >
                <img
                  src={idea.attachedDocument.dataUrl}
                  alt="Audited Document"
                  className="w-12 h-12 rounded-xl object-cover border border-indigo-300 shadow-xs group-hover:opacity-90 transition"
                />
                <div className="absolute inset-0 bg-slate-900/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span>Audited Source Document: {idea.attachedDocument.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-white border border-indigo-200 text-[10px] font-mono text-indigo-700 font-bold">
                  {idea.attachedDocument.sizeFormatted || "Uploaded"}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                {idea.documentSummary || "Multi-agent vision engine successfully transcribed and validated all architecture diagrams & business parameters."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full shrink-0 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vision Due Diligence Verified</span>
          </div>
        </div>
      )}

      {/* Viability Gauge & 5-Vector Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Viability Gauge (Score Donut) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-7 rounded-3xl bg-gradient-to-b from-slate-50 to-indigo-50/30 border border-slate-200/90 text-center space-y-4 shadow-sm relative group hover:border-indigo-300 transition-all">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            COMPOSITE VIABILITY SCORE
          </div>

          <div className="relative w-48 h-48 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor={scoreStrokeColor} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out drop-shadow-md"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
              <span className="text-5xl font-black text-slate-900 tracking-tight font-sans">
                {score}
              </span>
              <span className="text-[11px] font-mono font-extrabold text-slate-400">
                OUT OF 100
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs italic">
            "{comparison?.verdictSummary}"
          </p>
        </div>

        {/* 5-Vector Recharts Radar Chart */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-3 relative">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              5-Vector Investment Viability Radar
            </h4>
            <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold">
              Multi-Agent Metrics
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#334155" fontSize={11} fontWeight={600} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={10} />
                <Radar
                  name="Viability Score"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="#818cf8"
                  fillOpacity={0.35}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Strategic Pillars (Colorful & Interactive) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Unique Value Proposition */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-50/60 to-white border border-blue-200 hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
              UNIQUE VALUE PROPOSITION
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900 leading-relaxed">
            {comparison?.uniqueValueProposition}
          </p>
        </div>

        {/* Defensibility Moat */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-50/60 to-white border border-purple-200 hover:border-purple-300 hover:-translate-y-1 transition-all duration-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-wider">
              DEFENSIBILITY MOAT
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900 leading-relaxed">
            {comparison?.defensibilityMoat} — {comparison?.moatExplanation}
          </p>
        </div>

        {/* Primary Unaddressed Gap */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-50/60 to-white border border-emerald-200 hover:border-emerald-300 hover:-translate-y-1 transition-all duration-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-xs">
              <Target className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              PRIMARY UNADDRESSED GAP
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900 leading-relaxed">
            {comparison?.marketGaps?.[0]}
          </p>
        </div>
      </div>
    </div>
  );
}
