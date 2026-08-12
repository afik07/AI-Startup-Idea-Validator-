import React, { useState } from "react";
import { X, FileText, Cpu, Calendar, Code, CheckCircle, ExternalLink } from "lucide-react";

export function DocsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("architecture");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Project Technical Documentation</h2>
              <p className="text-xs text-slate-400">Architecture, MAS Justification & Agile Milestones (M1 & M2)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-5 gap-2 pt-2">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2 border-b-2 ${
              activeTab === "architecture"
                ? "border-indigo-500 text-indigo-400 bg-indigo-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Architecture Diagram & Spec
          </button>
          <button
            onClick={() => setActiveTab("framework")}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2 border-b-2 ${
              activeTab === "framework"
                ? "border-purple-500 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Framework & MAS Justification
          </button>
          <button
            onClick={() => setActiveTab("agile")}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2 border-b-2 ${
              activeTab === "agile"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Agile Plan (M1 & M2)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed font-sans">
          {activeTab === "architecture" && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                System Architecture & Multi-Agent Pipeline
              </h3>
              <p className="text-xs text-slate-400">
                Sequential context-passing pipeline with Tavily Web Search and OpenRouter LLM gateway integration.
              </p>

              {/* Visual Mermaid Representation */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
                <div className="text-indigo-400 font-bold mb-2">// HIGH LEVEL PIPELINE FLOW</div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-1/4">
                    <div className="text-indigo-400 font-bold text-xs">1. Market Opp</div>
                    <div className="text-[10px] text-slate-400">TAM/SAM/SOM, CAGR</div>
                  </div>
                  <div className="text-slate-500">→</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-1/4">
                    <div className="text-purple-400 font-bold text-xs">2. Customer Seg</div>
                    <div className="text-[10px] text-slate-400">ICPs, Pain Points</div>
                  </div>
                  <div className="text-slate-500">→</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-1/4">
                    <div className="text-emerald-400 font-bold text-xs">3. Tavily Rivals</div>
                    <div className="text-[10px] text-slate-400">Live Search & Rivals</div>
                  </div>
                  <div className="text-slate-500">→</div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-1/4">
                    <div className="text-amber-400 font-bold text-xs">4. Comparison</div>
                    <div className="text-[10px] text-slate-400">Matrix & 0-100 Score</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Core Architectural Principles</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Deterministic Context Pipeline:</strong> Eliminates circular hallucination loops by enforcing a linear data flow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>OpenRouter Unified LLM Gateway:</strong> Enables on-the-fly switching between Gemini 2.0 Flash, Claude 3.5 Sonnet, GPT-4o, and Llama 3.3.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Real-time Competitor Intelligence:</strong> Integrates Tavily Search API for up-to-date web query parsing.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "framework" && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">Framework Selection Rationale</h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="font-semibold text-indigo-400">Why Custom Lightweight Async MAS over Heavy Frameworks (CrewAI/LangChain)?</div>
                <p className="text-slate-300">
                  Heavy multi-agent frameworks often introduce massive server-side boilerplate, dynamic looping overhead, and strict Python dependencies. By implementing a lightweight custom JavaScript async orchestrator, we achieve:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-white mb-1">100% Web Native</div>
                    <div className="text-slate-400 text-[11px]">Runs directly in modern browsers without needing Python backend setup.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-white mb-1">Granular Event Streams</div>
                    <div className="text-slate-400 text-[11px]">Direct UI event listeners powering real-time step progress & logs.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "agile" && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">Agile Project Plan & Task Division (M1 & M2)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-indigo-400">Milestone 1: Setup & Architecture (Week 1-2)</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li>System Architecture Diagram & Mermaid workflow</li>
                    <li>OpenRouter API & Tavily Search integration</li>
                    <li>Data schema & mock heuristic engine</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-400">Milestone 2: Agent MAS & UI (Week 3-4)</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li>Market Opportunity & Customer Segmentation Agents</li>
                    <li>Competitor Discovery Agent (Tavily live search)</li>
                    <li>Comparison Agent & 0-100 Validation Scorecard</li>
                    <li>Interactive React Visualizations & Report Exporter</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                <span className="font-semibold text-white">Live Presentation Ready:</span> Prepared for presentation on July 27th-28th with live pipeline demo script.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
