import React from "react";
import { Sparkles, Key, FileText, Activity } from "lucide-react";

export function Header({ apiKeys, onOpenKeyModal, onOpenDocsModal }) {
  const hasOpenRouter = Boolean(apiKeys.openRouterApiKey);
  const hasTavily = Boolean(apiKeys.tavilyApiKey);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-2xl transition-all">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
              VentureVal<sup className="text-xs font-mono text-indigo-400">™ AI</sup>
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 uppercase tracking-wider">
              MAS Engine
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
            Autonomous Startup Idea Due Diligence & Market Intelligence Engine
          </p>
        </div>
      </div>

      {/* Action Controls & API Gateway Pills */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* API Gateway Button */}
        <button
          onClick={onOpenKeyModal}
          className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl border bg-slate-900/90 hover:bg-slate-800 transition border-slate-800 text-slate-200 font-medium hover:border-slate-700 shadow-md group"
        >
          <Key className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span className="hidden md:inline font-mono">API Gateways</span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <span className={`px-2 py-0.5 rounded font-bold ${hasOpenRouter ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-slate-800 text-slate-400"}`}>
              OpenRouter {hasOpenRouter ? "✓" : "Demo"}
            </span>
            <span className={`px-2 py-0.5 rounded font-bold ${hasTavily ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-slate-800 text-slate-400"}`}>
              Tavily {hasTavily ? "✓" : "Demo"}
            </span>
          </div>
        </button>

        {/* Documentation Button */}
        <button
          onClick={onOpenDocsModal}
          className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl border bg-indigo-950/40 hover:bg-indigo-900/60 border-indigo-500/30 text-indigo-200 transition font-bold shadow-lg shadow-indigo-500/10"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Project Docs</span>
        </button>
      </div>
    </header>
  );
}
