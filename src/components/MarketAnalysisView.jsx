import React from "react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { TrendingUp, DollarSign, PieChart, Globe, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";

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
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-blue-600 animate-pulse" />
            MARKET OPPORTUNITY AGENT • FINANCIAL SIZING
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            {market.industryName} Financial Sizing & Growth Forecast
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Top-down & Bottom-up Economic Sizing • CAGR Growth Acceleration
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4" />
            <span>CAGR: {market.cagr}% Growth Velocity</span>
          </div>
        </div>
      </div>

      {/* Key TAM / SAM / SOM Stat Cards with Gradient Accents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TAM */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-50/80 to-white border border-blue-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-blue-700 font-bold uppercase">
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-600" />
              TAM (Total Market)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px]">Global</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            ${market.tamVal} <span className="text-lg font-bold text-blue-600">Billion</span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">{market.tamRationale}</p>
        </div>

        {/* SAM */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50/80 to-white border border-indigo-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-indigo-700 font-bold uppercase">
            <span className="flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-indigo-600" />
              SAM (Serviceable)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px]">Target Region</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            ${market.samVal} <span className="text-lg font-bold text-indigo-600">Billion</span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">{market.samRationale}</p>
        </div>

        {/* SOM */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/80 to-white border border-emerald-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-700 font-bold uppercase">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              SOM (Obtainable)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Year 1-3</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            ${market.somVal} <span className="text-lg font-bold text-emerald-600">Million</span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">{market.somRationale}</p>
        </div>
      </div>

      {/* Recharts Composed Chart (TAM vs SOM 5-Year Projection) */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            5-Year Market Expansion vs SOM Capture Projection
          </h4>
          <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full font-bold">
            TAM ($B) & SOM ($M)
          </span>
        </div>

        <div className="h-68 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} fontWeight={600} />
              <YAxis stroke="#64748b" fontSize={11} />
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
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Bar dataKey="TAM" name="TAM ($B)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Line type="monotone" dataKey="SOM" name="SOM Capture ($M)" stroke="#10b981" strokeWidth={3.5} dot={{ r: 5, fill: "#10b981" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Growth Drivers */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
        <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Industry Growth Tailwinds & Key Drivers
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-800 font-medium">
          {market.marketDrivers?.map((driver, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold leading-relaxed">{driver}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
