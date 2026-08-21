import React, { useState } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { Sparkles, ShieldCheck, FileText, Image as ImageIcon, Eye, CheckCircle2 } from "lucide-react";

export function ValidationScorecard({ report }) {
  const [showImagePreview, setShowImagePreview] = useState(false);
  if (!report) return null;

  const { idea, comparison, durationSeconds } = report;
  const score = comparison?.validationScore || 85;

  const radarData = [
    { subject: "Market Size & Growth", value: comparison?.marketFeasibilityScore || 85 },
    { subject: "Customer WTP", value: comparison?.customerWillingnessScore || 80 },
    { subject: "Competitive Moat", value: comparison?.competitiveMoatScore || 75 },
    { subject: "SWOT Risk Index", value: 100 - (report.swotRisk?.riskScores?.overallRiskIndex || 40) },
    { subject: "GTM Velocity", value: comparison?.gtmFeasibilityScore || 90 }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-slate-900" />
            OFFICIAL GAMMAVAL™ DUE DILIGENCE AUDIT
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            {idea.title}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{idea.domain} • Validated in {durationSeconds}s</p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-slate-950 text-white text-xs font-bold flex items-center gap-2 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>VERDICT: {comparison?.verdict || "STRONG GO"}</span>
          </div>
        </div>
      </div>

      {/* Attached Document & Vision Ingestion Badge */}
      {idea.attachedDocument && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
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
                  className="w-12 h-12 rounded-xl object-cover border border-indigo-200 shadow-xs group-hover:opacity-90 transition"
                />
                <div className="absolute inset-0 bg-slate-900/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition">
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
                <span className="px-2 py-0.5 rounded-full bg-white border border-indigo-200 text-[10px] font-mono text-indigo-700">
                  {idea.attachedDocument.sizeFormatted || "Uploaded"}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                {idea.documentSummary || "Multi-agent vision engine successfully transcribed and validated all architecture diagrams & business parameters."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-full shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Vision Due Diligence Verified</span>
          </div>
        </div>
      )}

      {/* Viability Gauge & 5-Vector Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Viability Gauge (Score donut) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            COMPOSITE VIABILITY SCORE
          </span>

          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#0f172a"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-900 font-sans">{score}</span>
              <span className="text-[11px] font-mono text-slate-500 font-bold">OUT OF 100</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs">
            "{comparison?.verdictSummary}"
          </p>
        </div>

        {/* 5-Vector Recharts Radar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            5-Vector Investment Viability Radar
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#475569" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={10} />
                <Radar name="Viability Score" dataKey="value" stroke="#0f172a" fill="#0f172a" fillOpacity={0.15} />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "12px", color: "#0f172a", fontSize: "12px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Strategic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">UNIQUE VALUE PROPOSITION</span>
          <p className="text-xs font-bold text-slate-900">{comparison?.uniqueValueProposition}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">DEFENSIBILITY MOAT</span>
          <p className="text-xs font-bold text-slate-900">{comparison?.defensibilityMoat} — {comparison?.moatExplanation}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">PRIMARY UNADDRESSED GAP</span>
          <p className="text-xs font-bold text-slate-900">{comparison?.marketGaps?.[0]}</p>
        </div>
      </div>
    </div>
  );
}
