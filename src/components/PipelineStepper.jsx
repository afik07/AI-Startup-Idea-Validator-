import React from "react";
import { CheckCircle2, Loader2, Circle, Terminal, Search, Users, TrendingUp, BarChart3, Cpu, Zap, Activity } from "lucide-react";
import { AGENT_STEPS } from "../agents/types";

export function PipelineStepper({ stepStatuses, logs, currentStep }) {
  const stepsConfig = [
    {
      id: AGENT_STEPS.MARKET,
      title: "Market Opportunity",
      agentName: "Industry & Financials Agent",
      icon: TrendingUp,
      desc: "TAM, SAM, SOM & CAGR Analysis",
      color: "indigo"
    },
    {
      id: AGENT_STEPS.CUSTOMER,
      title: "Customer Segmentation",
      agentName: "Consumer & ICP Agent",
      icon: Users,
      desc: "ICPs, Personas & WTP Rating",
      color: "purple"
    },
    {
      id: AGENT_STEPS.COMPETITOR,
      title: "Competitor Discovery",
      agentName: "Tavily Web Rivals Search",
      icon: Search,
      desc: "Live Web Search & Offering Matrix",
      color: "emerald"
    },
    {
      id: AGENT_STEPS.COMPARISON,
      title: "Comparison & Strategy",
      agentName: "Validation Scorecard Agent",
      icon: BarChart3,
      desc: "Us vs Rivals & 0-100 Verdict",
      color: "amber"
    }
  ];

  return (
    <div className="glass-card-glow rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              MAS ORCHESTRATION PIPELINE ENGINE
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Sequential Context Passing • Multi-Model Gateway & Live Web Search
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 shadow-inner">
          <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
          <span>PIPELINE EXECUTION IN PROGRESS</span>
        </div>
      </div>

      {/* Active Pipeline Agent Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stepsConfig.map((step, idx) => {
          const status = stepStatuses[step.id] || "pending";
          const isRunning = status === "running";
          const isCompleted = status === "completed";
          const IconComponent = step.icon;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                isRunning
                  ? "bg-gradient-to-br from-indigo-950/80 to-slate-950 border-indigo-500 shadow-xl shadow-indigo-500/20 scale-[1.03]"
                  : isCompleted
                  ? "bg-slate-950/80 border-emerald-500/40 text-slate-200"
                  : "bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    NODE_0{idx + 1}
                  </span>
                </div>
                <div>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {isRunning && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                  {!isCompleted && !isRunning && <Circle className="w-4 h-4 text-slate-700" />}
                </div>
              </div>

              <div className="flex items-center gap-2 my-1">
                <IconComponent className={`w-4 h-4 ${isRunning ? "text-indigo-400 animate-pulse" : isCompleted ? "text-emerald-400" : "text-slate-500"}`} />
                <span className="text-xs font-bold text-slate-100">{step.title}</span>
              </div>
              <div className="text-[11px] font-semibold text-indigo-400 font-mono mt-0.5">{step.agentName}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{step.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Agent Telemetry Live Console Feed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            TELEMETRY STREAM CONSOLE LOG
          </span>
          <span className="text-[11px] text-slate-500">{logs.length} EVENTS CAPTURED</span>
        </div>
        
        <div className="h-44 overflow-y-auto rounded-2xl bg-slate-950/90 p-4 border border-slate-800 font-mono text-[11px] space-y-2 scrollbar-thin scrollbar-thumb-slate-800 shadow-inner">
          {logs.length === 0 ? (
            <div className="text-slate-600 text-center py-8">Initializing Multi-Agent system pipelines...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex items-start gap-2.5 animate-fade-in border-b border-slate-900/60 pb-1">
                <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                <span className="text-indigo-400 font-bold shrink-0">
                  [{log.step ? log.step.toUpperCase() : "ORCHESTRATOR"}]
                </span>
                <span className="text-slate-300">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
