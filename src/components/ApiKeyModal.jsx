import React, { useState } from "react";
import { X, Key, Shield, CheckCircle2, Info, Search, Cpu, Sparkles, ExternalLink, AlertCircle, RefreshCw } from "lucide-react";

export function ApiKeyModal({ isOpen, onClose, apiKeys, onSaveApiKeys }) {
  const [openRouterKey, setOpenRouterKey] = useState(apiKeys.openRouterApiKey || "");
  const [tavilyKey, setTavilyKey] = useState(apiKeys.tavilyApiKey || "");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    const keyToTest = openRouterKey.trim();
    if (!keyToTest) {
      setIsTesting(false);
      setTestResult({
        success: false,
        message: "Please enter an OpenRouter or Gemini API Key to test connection."
      });
      return;
    }

    try {
      const startTime = Date.now();
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${keyToTest}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.href || "http://localhost:5173",
          "X-Title": "GammaVal AI Connection Test"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [{ role: "user", content: "Say 'OK'" }],
          max_tokens: 5
        })
      });

      const latency = Date.now() - startTime;

      if (res.ok) {
        setTestResult({
          success: true,
          message: `✅ Verified! Connected to Google Gemini 2.0 Flash in ${latency}ms.`
        });
      } else {
        const errorData = await res.text();
        setTestResult({
          success: false,
          message: `❌ Connection Failed (${res.status}): ${errorData.slice(0, 100)}...`
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `❌ Network Error: ${err.message}`
      });
    } finally {
      setIsTesting(false);
    }
  };

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
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in text-left">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-xs">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">API Gateway Configuration</h2>
              <p className="text-xs text-slate-500 font-mono">Connect Live LLMs (Gemini / GPT-4o) & Tavily Search</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6">
          {/* OpenRouter API Key Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                OpenRouter API Key (LLM Inference)
              </label>
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-indigo-600 hover:underline flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              placeholder="sk-or-v1-..."
              value={openRouterKey}
              onChange={(e) => setOpenRouterKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white font-mono placeholder:text-slate-400"
            />
            <p className="text-[11px] text-slate-500 font-sans">
              Powers the multi-agent LLM reasoning (Gemini 2.0 Flash, GPT-4o, Claude 3.5 Sonnet).
            </p>
          </div>

          {/* Tavily API Key Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                Tavily API Key (Live Competitor Web Search)
              </label>
              <a
                href="https://tavily.com"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              placeholder="tvly-..."
              value={tavilyKey}
              onChange={(e) => setTavilyKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white font-mono placeholder:text-slate-400"
            />
            <p className="text-[11px] text-slate-500 font-sans">
              Powers real-time Google/Web competitor extraction and pricing discovery.
            </p>
          </div>

          {/* Test Connection Button & Result Box */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting || !openRouterKey.trim()}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>Pinging OpenRouter Gateway...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Test API Connection</span>
                </>
              )}
            </button>

            {testResult && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-start gap-2 ${
                  testResult.success
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Built-in Dynamic Intelligence Notice */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>Zero-Failure Dual Architecture:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              If left blank, our intelligent dynamic NLP engine analyzes your exact pitch text, computes variable TAM/SAM/SOM metrics, and runs the entire suite offline with zero latency!
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold rounded-full bg-slate-950 hover:bg-slate-800 text-white shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : null}
              <span>{savedSuccess ? "Saved!" : "Save Keys"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
