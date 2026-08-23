import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Circle, Terminal, Search, Users, TrendingUp, BarChart3, ShieldAlert, Layers, Rocket, Cpu, Sparkles, Clock, Bot } from "lucide-react";
import { AGENT_STEPS } from "../agents/types";

export function PipelineStepper({ stepStatuses = {}, logs = [], currentStep }) {
  const terminalContainerRef = useRef(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const stepsConfig = [
    {
      id: AGENT_STEPS.MARKET,
      title: "Market Opportunity",
      agentName: "TAM/SAM/SOM Sizing",
      icon: TrendingUp,
      color: "blue",
      activeBg: "bg-blue-600",
      activeRing: "ring-blue-400/40 border-blue-500",
      activeText: "text-blue-600",
      completedBg: "bg-blue-50/80 border-blue-200 text-blue-900",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      id: AGENT_STEPS.CUSTOMER,
      title: "Customer Segmentation",
      agentName: "ICP & Persona Profiler",
      icon: Users,
      color: "purple",
      activeBg: "bg-purple-600",
      activeRing: "ring-purple-400/40 border-purple-500",
      activeText: "text-purple-600",
      completedBg: "bg-purple-50/80 border-purple-200 text-purple-900",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300"
    },
    {
      id: AGENT_STEPS.COMPETITOR,
      title: "Competitor Discovery",
      agentName: "Tavily Web Search",
      icon: Search,
      color: "emerald",
      activeBg: "bg-emerald-600",
      activeRing: "ring-emerald-400/40 border-emerald-500",
      activeText: "text-emerald-600",
      completedBg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: AGENT_STEPS.COMPARISON,
      title: "Comparison & Strategy",
      agentName: "Scorecard & Moat Matrix",
      icon: BarChart3,
      color: "amber",
      activeBg: "bg-amber-500",
      activeRing: "ring-amber-400/40 border-amber-500",
      activeText: "text-amber-600",
      completedBg: "bg-amber-50/80 border-amber-200 text-amber-900",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    },
    {
      id: AGENT_STEPS.SWOT_RISK,
      title: "SWOT & Risk Profile",
      agentName: "Quant Risk Engine",
      icon: ShieldAlert,
      color: "rose",
      activeBg: "bg-rose-600",
      activeRing: "ring-rose-400/40 border-rose-500",
      activeText: "text-rose-600",
      completedBg: "bg-rose-50/80 border-rose-200 text-rose-900",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300"
    },
    {
      id: AGENT_STEPS.MVP,
      title: "MVP Feature Roadmap",
      agentName: "MoSCoW Sprint Specs",
      icon: Layers,
      color: "cyan",
      activeBg: "bg-cyan-600",
      activeRing: "ring-cyan-400/40 border-cyan-500",
      activeText: "text-cyan-600",
      completedBg: "bg-cyan-50/80 border-cyan-200 text-cyan-900",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300"
    },
    {
      id: AGENT_STEPS.GTM,
      title: "Go-To-Market Plan",
      agentName: "90-Day GTM Playbook",
      icon: Rocket,
      color: "fuchsia",
      activeBg: "bg-fuchsia-600",
      activeRing: "ring-fuchsia-400/40 border-fuchsia-500",
      activeText: "text-fuchsia-600",
      completedBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",
      badgeColor: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300"
    },
    {
      id: AGENT_STEPS.ADVISOR,
      title: "AI Advisor Knowledge Base",
      agentName: "ChatGPT Co-Pilot Ingestion",
      icon: Bot,
      color: "teal",
      activeBg: "bg-teal-600",
      activeRing: "ring-teal-400/40 border-teal-500",
      activeText: "text-teal-600",
      completedBg: "bg-teal-50/80 border-teal-200 text-teal-900",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300"
    }
  ];

  // Auto-scroll inside terminal log container ONLY (never moves the browser window)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Elapsed timer ticker
  useEffect(() => {
    const isAnyRunning = Object.values(stepStatuses).some((s) => s === "running");
    let timer;
    if (isAnyRunning) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [stepStatuses]);

  const completedCount = Object.values(stepStatuses).filter((s) => s === "completed").length;
  const isAllComplete = completedCount === stepsConfig.length;
  const progressPercent = Math.round((completedCount / stepsConfig.length) * 100);

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-6 max-w-6xl mx-auto text-left shadow-xl border border-slate-200/90 relative overflow-hidden animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-slate-950 text-white shadow-md">
              <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            {!isAllComplete && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2 font-sans tracking-tight">
                8-AGENT MAS ORCHESTRATION PIPELINE
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {isAllComplete ? "AUDIT COMPLETED" : "LIVE REASONING"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Sequential Context Passing & Multi-Vector Venture Validation with Chatbot Ingestion
            </p>
          </div>
        </div>

        {/* Live Status Pill with Progress & Clock */}
        <div className="flex items-center gap-3 font-mono">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{elapsedSeconds > 0 ? `${elapsedSeconds}s` : "0.0s"}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            {!isAllComplete ? (
              <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span>{progressPercent}% Complete ({completedCount}/8 Agents)</span>
          </div>
        </div>
      </div>

      {/* Animated Connecting Progress Track */}
      <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 via-rose-500 to-teal-500 transition-all duration-500 ease-out relative"
          style={{ width: `${Math.max(4, progressPercent)}%` }}
        >
          {!isAllComplete && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/60 blur-xs animate-pulse"></div>
          )}
        </div>
      </div>

      {/* 8 Agent Grid Nodes with Vibrant Pop Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stepsConfig.map((step, idx) => {
          const status = stepStatuses[step.id] || "pending";
          const isRunning = status === "running" || currentStep === step.id;
          const isCompleted = status === "completed";
          const IconComponent = step.icon;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                isRunning
                  ? `bg-slate-950 text-white shadow-2xl scale-[1.05] ring-4 ${step.activeRing} z-20`
                  : isCompleted
                  ? `${step.completedBg} shadow-xs scale-100`
                  : "bg-slate-50 border-slate-200 text-slate-400 opacity-60 scale-100"
              }`}
            >
              {/* Animated top shimmer for running agent */}
              {isRunning && (
                <div className={`absolute inset-x-0 top-0 h-1.5 ${step.activeBg} animate-pulse`} />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  isRunning
                    ? "bg-slate-800 border-slate-700 text-white"
                    : isCompleted
                    ? step.badgeColor
                    : "bg-white border-slate-200 text-slate-500"
                }`}>
                  AGENT_0{idx + 1}
                </span>

                <div className="flex items-center gap-1.5">
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                      <span>DONE</span>
                    </span>
                  )}
                  {isRunning && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 animate-pulse">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>ACTIVATED</span>
                    </span>
                  )}
                  {!isCompleted && !isRunning && (
                    <Circle className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 my-1.5">
                <div className={`p-2 rounded-xl transition-all ${
                  isRunning
                    ? `${step.activeBg} text-white shadow-md animate-pulse`
                    : isCompleted
                    ? `${step.activeBg} text-white`
                    : "bg-slate-200 text-slate-500"
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className={`text-xs font-extrabold truncate ${isRunning ? "text-white" : ""}`}>
                  {step.title}
                </span>
              </div>

              <div className={`text-[11px] font-mono mt-1 truncate ${
                isRunning ? "text-slate-200 font-semibold" : isCompleted ? "text-slate-600 font-medium" : "text-slate-400"
              }`}>
                {step.agentName}
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetry Stream Output Console */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-2 font-bold text-slate-700">
            <Terminal className="w-4 h-4 text-slate-900" />
            LIVE TELEMETRY STREAM CONSOLE
          </span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            {logs.length} PIPELINE EVENTS
          </span>
        </div>

        <div
          ref={terminalContainerRef}
          className="h-44 overflow-y-auto rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-[11px] space-y-2 text-slate-300 scrollbar-thin shadow-inner"
        >
          {logs.length === 0 ? (
            <div className="text-slate-500 text-center py-10 flex flex-col items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
              <span>Initializing 8-agent pipeline and connecting knowledge graphs...</span>
            </div>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 border-b border-slate-900/60 pb-1.5 animate-fade-in hover:bg-slate-900/40 px-1 rounded transition"
              >
                <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
                <span className="text-indigo-400 font-bold shrink-0">
                  [{log.step ? log.step.toUpperCase() : "ORCHESTRATOR"}]
                </span>
                <span className="text-slate-200 leading-relaxed">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
