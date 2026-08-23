import React from "react";
import { Key, ArrowDown, LogOut, Sparkles, FolderOpen, Network } from "lucide-react";

export function Header({
  apiKeys,
  onOpenKeyModal,
  onOpenArchitectureModal,
  onOpenAuthModal,
  onOpenSavedProjectsModal,
  savedProjectsCount = 0,
  userSession,
  onLogout,
  onTriggerDownload,
  onScrollToAgents
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs transition-all">
      {/* GammaVal™ AI Project Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-base shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-slate-900 tracking-tight font-sans">
            GammaVal™ AI
          </span>
          <span className="text-[10px] font-mono font-semibold text-slate-400">/ Startup Validator</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
        <button
          onClick={onScrollToAgents}
          className="hover:text-slate-950 transition cursor-pointer font-bold flex items-center gap-1.5"
        >
          <span>8-Agent AI Engine</span>
        </button>

        {/* Total Flow Architecture Modal Trigger */}
        <button
          onClick={onOpenArchitectureModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition cursor-pointer border border-indigo-200 shadow-2xs"
        >
          <Network className="w-3.5 h-3.5 text-indigo-600" />
          <span>Total Flow Architecture</span>
        </button>
      </div>

      {/* Right Action Group */}
      <div className="flex items-center gap-2.5">
        {/* Saved Projects Button */}
        <button
          onClick={onOpenSavedProjectsModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer border border-slate-200"
          title="View Saved Projects Vault"
        >
          <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">Projects</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px] font-bold">
            {savedProjectsCount}
          </span>
        </button>

        {/* Download Audit Report Button */}
        <button
          onClick={onTriggerDownload}
          className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          <span>Audit Report</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        {/* API Key Config Button */}
        <button
          onClick={onOpenKeyModal}
          className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
          title="Configure API Keys"
        >
          <Key className="w-3.5 h-3.5 text-amber-500" />
        </button>

        {/* Sign In / User Session */}
        {userSession ? (
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full pl-2 pr-3 py-1">
            <img
              src={userSession.avatarUrl}
              alt="Avatar"
              className="w-5 h-5 rounded-full object-cover border border-slate-300"
            />
            <span className="text-slate-900 font-bold text-xs">{userSession.name}</span>
            <button onClick={onLogout} className="p-0.5 text-slate-400 hover:text-rose-600 transition ml-0.5">
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
