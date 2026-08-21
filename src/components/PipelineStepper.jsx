import React from "react";
import { CheckCircle2, Loader2, Circle, Terminal, Search, Users, TrendingUp, BarChart3, ShieldAlert, Layers, Rocket, Activity } from "lucide-react";
import { AGENT_STEPS } from "../agents/types";

export function PipelineStepper({ stepStatuses, logs, currentStep }) {
  const stepsConfig = [
    { id: AGENT_STEPS.MARKET, title: "Market Opportunity", agentName: "Industry & Size Agent", icon: TrendingUp },
    { id: AGENT_STEPS.CUSTOMER, title: "Customer Segmentation", agentName: "Consumer & ICP Agent", icon: Users },
    { id: AGENT_STEPS.COMPETITOR, title: "Competitor Discovery", agentName: "Tavily Web Rivals Search", icon: Search },
    { id: AGENT_STEPS.COMPARISON, title: "Comparison & Strategy", agentName: "Validation Scorecard Agent", icon: BarChart3 },
    { id: AGENT_STEPS.SWOT_RISK, title: "SWOT & Risk Profile", agentName: "SWOT & Risk Agent (M3)", icon: ShieldAlert },
    { id: AGENT_STEPS.MVP, title: "MVP Feature Roadmap", agentName: "MoSCoW MVP Agent (M3)", icon: Layers },
    { id: AGENT_STEPS.GTM, title: "Go-To-Market Plan", agentName: "GTM Launch Agent (M3)", icon: Rocket }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-6 max-w-6xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-sans">
              7-AGENT MAS ORCHESTRATION PIPELINE ENGINE
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Context-Passing Pipeline & Knowledge Base Builder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold">
          <Loader2 className="w-4 h-4 text-slate-900 animate-spin" />
          <span>7-AGENT PIPELINE ACTIVE</span>
        </div>
      </div>

      {/* 7 Agent Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stepsConfig.map((step, idx) => {
          const status = stepStatuses[step.id] || "pending";
          const isRunning = status === "running";
          const isCompleted = status === "completed";
          const IconComponent = step.icon;

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                isRunning
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                  : isCompleted
                  ? "bg-emerald-50/50 border-emerald-200 text-slate-900"
                  : "bg-slate-50 border-slate-200 text-slate-400 opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  AGENT_0{idx + 1}
                </span>
                <div>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isRunning && <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />}
                  {!isCompleted && !isRunning && <Circle className="w-3.5 h-3.5 text-slate-300" />}
                </div>
              </div>

              <div className="flex items-center gap-2 my-1">
                <IconComponent className={`w-3.5 h-3.5 ${isRunning ? "text-white" : isCompleted ? "text-emerald-600" : "text-slate-400"}`} />
                <span className="text-xs font-bold truncate">{step.title}</span>
              </div>
              <div className="text-[10px] font-semibold text-slate-500 font-mono mt-0.5 truncate">{step.agentName}</div>
            </div>
          );
        })}
      </div>

      {/* Telemetry Stream Output Console */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-900" />
            TELEMETRY STREAM CONSOLE LOG
          </span>
          <span className="text-[11px] text-slate-400">{logs.length} EVENTS CAPTURED</span>
        </div>

        <div className="h-40 overflow-y-auto rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-[11px] space-y-2 text-slate-300 scrollbar-thin">
          {logs.length === 0 ? (
            <div className="text-slate-500 text-center py-6">Initializing agent execution pipeline...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex items-start gap-2.5 border-b border-slate-900/80 pb-1">
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className="text-indigo-400 font-bold shrink-0">
                  [{log.step ? log.step.toUpperCase() : "ORCHESTRATOR"}]
                </span>
                <span className="text-slate-200">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
