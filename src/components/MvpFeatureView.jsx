import React from "react";
import { Layers, Clock, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function MvpFeatureView({ mvp }) {
  if (!mvp) return null;

  const { moscowFeatures, recommendedLaunchWeeks, mvpOverview } = mvp;

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left shadow-xl border border-slate-200/90 relative overflow-hidden">
      {/* Cyan Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 uppercase tracking-widest">
            <Layers className="w-4 h-4 text-cyan-600 animate-pulse" />
            MVP FEATURE AGENT • MOSCOW ROADMAP
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Core MVP Product Prioritization Blueprint
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Agile MoSCoW Prioritization • Sprint Scope • Time-To-Market Timeline
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-extrabold shadow-md shadow-cyan-500/20 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Est. Build Time: {recommendedLaunchWeeks || 6} Weeks</span>
          </div>
        </div>
      </div>

      {/* Strategic Overview Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-50/90 via-blue-50/60 to-white border border-cyan-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest">
            Lean MVP Launch Thesis
          </span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed font-bold italic">
          "{mvpOverview}"
        </p>
      </div>

      {/* MoSCoW Grid (4 Colorful Tiers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Must Have */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/60 to-white border border-emerald-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-mono font-extrabold text-emerald-950 uppercase tracking-wider">
                MUST HAVE (v1 Core)
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Non-Negotiable
            </span>
          </div>

          <div className="space-y-3">
            {moscowFeatures?.mustHave?.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-2xs space-y-1.5 hover:border-emerald-200 transition">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{f.featureName}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {f.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{f.userStory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Should Have */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50/60 to-white border border-indigo-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-mono font-extrabold text-indigo-950 uppercase tracking-wider">
                SHOULD HAVE (v1.1 Release)
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
              High Value Add
            </span>
          </div>

          <div className="space-y-3">
            {moscowFeatures?.shouldHave?.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs space-y-1.5 hover:border-indigo-200 transition">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{f.featureName}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {f.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{f.userStory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Could Have */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-50/60 to-white border border-purple-200 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-mono font-extrabold text-purple-950 uppercase tracking-wider">
                COULD HAVE (Growth Phase)
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              Nice to Have
            </span>
          </div>

          <div className="space-y-3">
            {moscowFeatures?.couldHave?.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-purple-100 shadow-2xs space-y-1.5 hover:border-purple-200 transition">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{f.featureName}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {f.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{f.userStory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Won't Have */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-50/60 to-white border border-rose-200 hover:border-rose-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-rose-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-rose-600 text-white shadow-xs">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-mono font-extrabold text-rose-950 uppercase tracking-wider">
                WON'T HAVE (Out of Scope)
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              Scope Guardrail
            </span>
          </div>

          <div className="space-y-3">
            {moscowFeatures?.wontHave?.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-1 hover:border-rose-200 transition">
                <span className="font-extrabold text-rose-950 text-xs block">• {f.featureName}</span>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  <strong className="text-slate-900 font-bold">Rationale: </strong>{f.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
