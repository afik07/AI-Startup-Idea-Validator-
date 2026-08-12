import React from "react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { TrendingUp, Globe, Compass, AlertCircle, ArrowUpRight, DollarSign } from "lucide-react";

export function MarketAnalysisView({ market }) {
  if (!market) return null;

  const chartData = [
    { name: "TAM (Total Addressable)", value: market.tamVal, projection: (market.tamVal * 1.25).toFixed(1), color: "#6366f1" },
    { name: "SAM (Serviceable Addressable)", value: market.samVal, projection: (market.samVal * 1.25).toFixed(1), color: "#a855f7" },
    { name: "SOM (Serviceable Obtainable)", value: Number((market.somVal / 1000).toFixed(2)), projection: Number(((market.somVal * 1.25) / 1000).toFixed(2)), color: "#10b981" }
  ];

  return (
    <div className="glass-card-glow rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" />
            Market Opportunity Agent Analysis
          </div>
          <h3 className="text-xl font-bold text-white mt-1">{market.industryName}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono font-bold text-indigo-300">
            {market.cagr}% CAGR Growth
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-mono font-bold text-purple-300">
            Stage: {market.marketStage}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts Composed Financial Chart */}
        <div className="lg:col-span-7 bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Addressable Financial Scale & 5-Yr Growth Projection ($B)
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">TAM / SAM / SOM</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#090d16", borderColor: "#1e293b", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                  formatter={(val, name) => [`$${val} Billion`, name === "value" ? "Current Market" : "5-Yr Projected"]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Line type="monotone" dataKey="projection" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">TAM (Total)</div>
              <div className="text-base font-black text-indigo-400">${market.tamVal}B</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">SAM (Serviceable)</div>
              <div className="text-base font-black text-purple-400">${market.samVal}B</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">SOM (Obtainable)</div>
              <div className="text-base font-black text-emerald-400">${market.somVal}M</div>
            </div>
          </div>
        </div>

        {/* Drivers & Risk Factors */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Primary Growth Drivers & Tailwinds
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              {market.marketDrivers?.map((driver, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ArrowUpRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Industry Hurdles & Regulatory Risks
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              {market.keyRisks?.map((risk, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
