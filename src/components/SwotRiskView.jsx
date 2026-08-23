import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { ShieldAlert, Zap, AlertTriangle, TrendingUp, CheckCircle2, ShieldCheck, Shield, Award } from "lucide-react";

export function SwotRiskView({ swotRisk }) {
  if (!swotRisk) return null;

  const { swot, riskScores, riskMitigations } = swotRisk;

  const riskData = [
    { name: "Competitor Risk", value: riskScores?.competitorRisk || 50, color: "#e11d48" },
    { name: "Market Demand Risk", value: riskScores?.marketDemandRisk || 30, color: "#d97706" },
    { name: "Regulatory Risk", value: riskScores?.regulatoryRisk || 40, color: "#7c3aed" },
    { name: "Execution Risk", value: riskScores?.executionRisk || 35, color: "#2563eb" }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            SWOT & QUANT RISK AGENT ANALYSIS
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Structured SWOT Matrix & Quantified Risk Profile
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            4-Quadrant SWOT Matrix • Category Risk Breakdown • Proactive Mitigations
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-extrabold shadow-md shadow-rose-500/20">
            Overall Risk Index: {riskScores?.overallRiskIndex || 40}/100
          </div>
        </div>
      </div>

      {/* 2x2 SWOT Grid with Colorful Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/80 to-white border border-emerald-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 space-y-3.5">
          <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span>Internal Strengths (S)</span>
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.strengths?.map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-emerald-100/80 shadow-2xs space-y-1 hover:border-emerald-200 transition">
                <span className="font-extrabold text-emerald-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50/80 to-white border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 space-y-3.5">
          <h4 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <span>Internal Weaknesses (W)</span>
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.weaknesses?.map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-amber-100/80 shadow-2xs space-y-1 hover:border-amber-200 transition">
                <span className="font-extrabold text-amber-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-50/80 to-white border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 space-y-3.5">
          <h4 className="text-xs font-mono font-bold text-blue-800 uppercase tracking-widest flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span>External Opportunities (O)</span>
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.opportunities?.map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-blue-100/80 shadow-2xs space-y-1 hover:border-blue-200 transition">
                <span className="font-extrabold text-blue-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Threats */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-50/80 to-white border border-rose-200 hover:border-rose-300 hover:shadow-md transition-all duration-200 space-y-3.5">
          <h4 className="text-xs font-mono font-bold text-rose-800 uppercase tracking-widest flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-600 text-white shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <span>External Threats (T)</span>
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.threats?.map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-rose-100/80 shadow-2xs space-y-1 hover:border-rose-200 transition">
                <span className="font-extrabold text-rose-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Risk Bar Chart */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-indigo-600" />
          Quantified Category Risk Indices (0-100 Scale)
        </h4>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontWeight={600} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} />
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
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
