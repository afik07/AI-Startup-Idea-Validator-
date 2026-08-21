import React from "react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { TrendingUp, DollarSign, PieChart, Globe } from "lucide-react";

export function MarketAnalysisView({ market }) {
  if (!market) return null;

  const chartData = [
    { year: "Year 1", TAM: Math.round(market.tamVal * 0.7), SOM: market.somVal },
    { year: "Year 2", TAM: Math.round(market.tamVal * 0.8), SOM: Math.round(market.somVal * 1.5) },
    { year: "Year 3", TAM: Math.round(market.tamVal * 0.9), SOM: Math.round(market.somVal * 2.4) },
    { year: "Year 4", TAM: market.tamVal, SOM: Math.round(market.somVal * 3.8) },
    { year: "Year 5", TAM: Math.round(market.tamVal * 1.2), SOM: Math.round(market.somVal * 6.0) }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-slate-900" />
            MARKET OPPORTUNITY AGENT ANALYSIS
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            {market.industryName} Financial Breakdown
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            CAGR: {market.cagr}% Growth Rate
          </div>
        </div>
      </div>

      {/* Key TAM / SAM / SOM Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase">
            <span>TAM (Total Addressable)</span>
            <Globe className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">${market.tamVal} Billion</div>
          <p className="text-[11px] text-slate-500 font-medium">{market.tamRationale}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase">
            <span>SAM (Serviceable Addressable)</span>
            <PieChart className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">${market.samVal} Billion</div>
          <p className="text-[11px] text-slate-500 font-medium">{market.samRationale}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase">
            <span>SOM (Serviceable Obtainable)</span>
            <DollarSign className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">${market.somVal} Million</div>
          <p className="text-[11px] text-slate-500 font-medium">{market.somRationale}</p>
        </div>
      </div>

      {/* Recharts Composed Chart (TAM vs SOM 5-Year Projection) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            5-Year Market Expansion vs SOM Capture Projection
          </h4>
          <span className="text-[10px] font-mono text-slate-400">Values in $B (TAM) & $M (SOM)</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "12px", color: "#0f172a", fontSize: "12px" }} />
              <Legend />
              <Bar dataKey="TAM" fill="#0f172a" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="SOM" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Growth Drivers */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
          Industry Growth Tailwinds & Key Drivers
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
          {market.marketDrivers?.map((driver, i) => (
            <li key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <span>{driver}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
