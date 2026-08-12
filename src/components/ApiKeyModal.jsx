import React, { useState } from "react";
import { X, Key, Shield, CheckCircle2, Info, Search, Cpu } from "lucide-react";

export function ApiKeyModal({ isOpen, onClose, apiKeys, onSaveApiKeys }) {
  const [openRouterKey, setOpenRouterKey] = useState(apiKeys.openRouterApiKey || "");
  const [tavilyKey, setTavilyKey] = useState(apiKeys.tavilyApiKey || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKeys({
      openRouterApiKey: openRouterKey.trim(),
      tavilyApiKey: tavilyKey.trim()
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">API Keys Configuration</h2>
              <p className="text-xs text-slate-400">Configure OpenRouter & Tavily API integrations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* OpenRouter API Key Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              OpenRouter API Key (LLM Inference)
            </label>
            <input
              type="password"
              placeholder="sk-or-v1-..."
              value={openRouterKey}
              onChange={(e) => setOpenRouterKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 font-mono placeholder:text-slate-600"
            />
            <p className="text-[11px] text-slate-400">
              Used for OpenRouter model access (Gemini 2.0 Flash, Claude 3.5, GPT-4o).
            </p>
          </div>

          {/* Tavily API Key Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-400" />
              Tavily API Key (Live Competitor Web Search)
            </label>
            <input
              type="password"
              placeholder="tvly-..."
              value={tavilyKey}
              onChange={(e) => setTavilyKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 font-mono placeholder:text-slate-600"
            />
            <p className="text-[11px] text-slate-400">
              Used by Competitor Discovery Agent for real-time web competitor research.
            </p>
          </div>

          {/* Demo Mode Alert Notice */}
          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Built-in Demo Mode Active:</span> If left blank, the application will use high-fidelity domain heuristics so you can test the entire pipeline & visualizations seamlessly out-of-the-box!
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/25 transition flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Saved!
                </>
              ) : (
                "Save Configuration"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
