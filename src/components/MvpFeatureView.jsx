import React from "react";
import { Layers, Clock } from "lucide-react";

export function MvpFeatureView({ mvp }) {
  if (!mvp) return null;

  const { moscowFeatures, recommendedLaunchWeeks, mvpOverview } = mvp;

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Layers className="w-4 h-4 text-slate-900" />
            MVP FEATURE RECOMMENDATION AGENT (MOSCOW)
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Core MVP Product Prioritization Blueprint
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-700" />
            Est. Build Time: {recommendedLaunchWeeks || 6} Weeks
          </div>
        </div>
      </div>

      {/* Overview Banner */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
          Strategic MVP Philosophy:
        </span>
        <p className="text-sm text-slate-800 leading-relaxed font-semibold">
          "{mvpOverview}"
        </p>
      </div>

      {/* MoSCoW Grid (4 Tiers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Must Have */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-200 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h4 className="text-xs font-mono font-extrabold text-emerald-900 uppercase tracking-widest">
                MUST HAVE (v1 Core)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Non-Negotiable</span>
          </div>

          <div className="space-y-2.5">
            {moscowFeatures?.mustHave?.map((f, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{f.featureName}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {f.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">{f.userStory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Should Have */}
        <div className="p-5 rounded-2xl bg-white border border-indigo-200 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <h4 className="text-xs font-mono font-extrabold text-indigo-900 uppercase tracking-widest">
                SHOULD HAVE (v1.1 Release)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">High Value Add</span>
          </div>

          <div className="space-y-2.5">
            {moscowFeatures?.shouldHave?.map((f, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{f.featureName}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    {f.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">{f.userStory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Could Have */}
        <div className="p-5 rounded-2xl bg-white border border-purple-200 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <h4 className="text-xs font-mono font-extrabold text-purple-900 uppercase tracking-widest">
                COULD HAVE (Growth Phase)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Nice to Have</span>
          </div>

          <div className="space-y-2.5">
            {moscowFeatures?.couldHave?.map((f, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{f.featureName}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    {f.impact} Impact
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">{f.userStory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Won't Have */}
        <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <h4 className="text-xs font-mono font-extrabold text-rose-900 uppercase tracking-widest">
                WON'T HAVE (Out of Scope)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Phase 2 Defeated</span>
          </div>

          <div className="space-y-2.5">
            {moscowFeatures?.wontHave?.map((f, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-extrabold text-slate-900 text-xs block">• {f.featureName}</span>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                  <strong className="text-slate-900 font-extrabold">Rationale: </strong>{f.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
