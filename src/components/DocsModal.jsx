import React, { useState } from "react";
import { X, BookOpen, CheckCircle2 } from "lucide-react";

export function DocsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("m3");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col text-left">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                GammaVal™ AI System Documentation & Pricing
              </h3>
              <p className="text-xs text-slate-500 font-mono">Milestone 1, 2 & 3 Architecture Specifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-100 text-xs font-mono">
          <button
            onClick={() => setActiveTab("m3")}
            className={`pb-2 font-bold transition border-b-2 ${
              activeTab === "m3" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Milestone 3 Roadmap
          </button>
          <button
            onClick={() => setActiveTab("arch")}
            className={`pb-2 font-bold transition border-b-2 ${
              activeTab === "arch" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            7-Agent MAS Architecture
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`pb-2 font-bold transition border-b-2 ${
              activeTab === "pricing" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Tiered Pricing
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-600 font-medium">
          {activeTab === "m3" && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Milestone 3 (Week 5-6 | ~10 Hours) Requirements</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>SWOT & Risk Analysis Agent (Agent 5):</strong> Generates 2x2 SWOT matrix and Risk Index scores (Competitor, Demand, Regulatory, Execution).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>MVP Feature Recommendation Agent (Agent 6):</strong> MoSCoW Framework feature prioritization (Must, Should, Could, Won't Have).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Go-To-Market Strategy Agent (Agent 7):</strong> Positioning statement, first 100 customer playbook, and 90-day launch roadmap.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Conversational Startup Advisor Chatbot (Agent 8):</strong> Full Knowledge Base ingestion for follow-up strategy questions.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "arch" && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Sequential Context-Passing Pipeline Engine</h4>
              <p>GammaVal™ AI coordinates 7 specialized agents in sequence, building an in-memory Knowledge Base store that grounds all outputs and conversational advisor answers.</p>
              <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px]">
                Market Agent → Customer Agent → Tavily Search → Comparison Agent → SWOT/Risk Agent → MVP Agent → GTM Agent → AI Advisor KB
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">COMMUNITY</span>
                <div className="text-xl font-extrabold text-slate-900">$0 / mo</div>
                <p className="text-[11px] text-slate-500">3 Free Validation Runs per month with standard Gemini Flash model.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-white space-y-2">
                <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase">FOUNDER PRO</span>
                <div className="text-xl font-extrabold text-white">$29 / mo</div>
                <p className="text-[11px] text-slate-300">Unlimited runs, Claude 3.5 Sonnet, Tavily live web search & Markdown exports.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">ENTERPRISE STUDIO</span>
                <div className="text-xl font-extrabold text-slate-900">$199 / mo</div>
                <p className="text-[11px] text-slate-500">Multi-user team workspaces, custom branded PDF artifacts & dedicated API gateway.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
