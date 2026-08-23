import React from "react";
import { X, Network, Cpu, ArrowRight, TrendingUp, Users, Search, BarChart3, ShieldAlert, Layers, Rocket, Bot, Sparkles, Database, FileText, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const flowSteps = [
    {
      stage: "STAGE 01: INGESTION & VISION",
      color: "from-slate-900 to-indigo-950 text-white",
      badge: "Input Layer",
      title: "Multimodal Problem-Solution Ingestion",
      desc: "Accepts founder pitch text, pitch decks, or architecture schematics. Vision OCR agent extracts problem-solution primitives, target geography, and pricing hypothesis."
    },
    {
      stage: "STAGE 02: 8-AGENT SEQUENTIAL MAS PROPAGATION",
      color: "from-indigo-600 to-purple-600 text-white",
      badge: "Core Engine",
      title: "Sequential Context Passing & Validation Pipeline",
      desc: "Each specialized agent receives upstream context and executes deterministic financial, customer, competitive, and risk algorithms."
    },
    {
      stage: "STAGE 03: SYNTHESIS & VC MEMORANDUM",
      color: "from-emerald-600 to-teal-600 text-white",
      badge: "Output Layer",
      title: "Executive Scorecard & Multi-Turn Knowledge Base",
      desc: "Compiles composite 0–100 viability score, vector-rendered executive PDF reports, and primes the Conversational AI Co-Pilot with full audit memory."
    }
  ];

  const agentNodes = [
    { step: "01", name: "Market Opportunity", role: "TAM / SAM / SOM Sizing", icon: TrendingUp, color: "bg-blue-600" },
    { step: "02", name: "Customer Segmentation", role: "ICP & Persona Profiler", icon: Users, color: "bg-purple-600" },
    { step: "03", name: "Competitor Discovery", role: "Tavily Live Web Search", icon: Search, color: "bg-emerald-600" },
    { step: "04", name: "Strategic Comparison", role: "Scorecard & Moat Matrix", icon: BarChart3, color: "bg-amber-500" },
    { step: "05", name: "SWOT & Risk Profile", role: "Quant Risk Engine", icon: ShieldAlert, color: "bg-rose-600" },
    { step: "06", name: "MVP Feature Roadmap", role: "MoSCoW Sprint Specs", icon: Layers, color: "bg-cyan-600" },
    { step: "07", name: "Go-To-Market Plan", role: "90-Day GTM Playbook", icon: Rocket, color: "bg-fuchsia-600" },
    { step: "08", name: "AI Advisor Chatbot", role: "Live Knowledge Ingestion", icon: Bot, color: "bg-teal-600" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-left">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <Network className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  TOTAL FLOW ARCHITECTURE
                </span>
                <span className="text-[10px] font-mono text-slate-400">v4.0 Spec</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                8-Agent Multi-Agent System (MAS) Architecture
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto scrollbar-thin text-xs text-slate-700 font-sans">
          {/* Architecture 3-Stage Pipeline Diagram */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              End-to-End Pipeline Execution Flow
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {flowSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2.5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {s.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">0{idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{s.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 8 Agent Nodes Interaction Map */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              8 Sequential Autonomous Agent Roles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {agentNodes.map((agent) => {
                const Icon = agent.icon;
                return (
                  <div
                    key={agent.step}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-indigo-300 transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        AGENT_{agent.step}
                      </span>
                      <div className={`p-1.5 rounded-lg ${agent.color} text-white shadow-2xs`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{agent.name}</h5>
                      <span className="text-[11px] font-mono text-slate-500">{agent.role}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Data Flow Contract */}
          <div className="p-6 rounded-3xl bg-slate-950 text-slate-300 space-y-4 border border-slate-800 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                Context Propagation & Orchestration Contract
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                Zero-Loss Memory
              </span>
            </div>

            <div className="space-y-2 text-[11px] leading-relaxed text-slate-400">
              <p>
                <strong className="text-white">1. Input:</strong> Founder Pitch Brief $\rightarrow$ Vision OCR Transcriber $\rightarrow$ Normalized Problem-Solution Struct.
              </p>
              <p>
                <strong className="text-white">2. Execution:</strong> Event-driven asynchronous pipeline with real-time WebSocket/EventEmitter telemetry.
              </p>
              <p>
                <strong className="text-white">3. Knowledge Ingestion:</strong> Ingests all 7 upstream vector datasets into the Step 8 Conversational Co-Pilot.
              </p>
              <p>
                <strong className="text-white">4. Export:</strong> Multi-page vector PDF generation (`jspdf`), JSON AST, and persistent Project Vault.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500 shrink-0">
          <span>GammaVal™ Multi-Agent System (MAS) • Milestone 4 Architecture</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold transition cursor-pointer"
          >
            Close Flow Guide
          </button>
        </div>
      </div>
    </div>
  );
}
