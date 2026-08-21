import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { ShieldAlert, Zap, AlertTriangle, TrendingUp, CheckCircle2, ShieldCheck } from "lucide-react";

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
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 text-slate-900" />
            SWOT & RISK ANALYSIS AGENT EVALUATION
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Structured SWOT Matrix & Risk Profile
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            Overall Risk Index: {riskScores?.overallRiskIndex || 40}/100
          </div>
        </div>
      </div>

      {/* 2x2 SWOT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
          <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Internal Strengths (S)
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.strengths?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-0.5">
                <span className="font-extrabold text-emerald-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
          <h4 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Internal Weaknesses (W)
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.weaknesses?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-amber-100 shadow-2xs space-y-0.5">
                <span className="font-extrabold text-amber-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
          <h4 className="text-xs font-mono font-bold text-indigo-800 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            External Opportunities (O)
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.opportunities?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-0.5">
                <span className="font-extrabold text-indigo-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Threats */}
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
          <h4 className="text-xs font-mono font-bold text-rose-800 uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            External Threats (T)
          </h4>
          <div className="space-y-2 text-xs">
            {swot?.threats?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-rose-100 shadow-2xs space-y-0.5">
                <span className="font-extrabold text-rose-950 block">{item.title}</span>
                <span className="text-slate-600 leading-relaxed block font-medium">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Metrics Visualizer & Mitigation Playbook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100">
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-slate-900" />
              Category Risk Index Breakdown (0-100 Score)
            </h4>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 10 }}>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} width={120} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "12px", color: "#0f172a", fontSize: "12px" }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-900" />
            Actionable Risk Mitigation Playbook
          </h4>
          <div className="space-y-2 text-xs">
            {riskMitigations?.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{m.riskFactor}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {m.category}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                  <strong className="text-slate-900 font-extrabold">Mitigation: </strong>{m.mitigationStrategy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
