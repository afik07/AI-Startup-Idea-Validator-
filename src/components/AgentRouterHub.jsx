import React from "react";
import { TrendingUp, Users, Search, BarChart3, ShieldAlert, Layers, Rocket, Bot, Zap, Play, ArrowRight } from "lucide-react";
import { AGENT_STEPS } from "../agents/types";

export function AgentRouterHub({ onLaunchAgent, onLaunchFullPipeline, isRunning }) {
  const agentsCatalog = [
    {
      id: AGENT_STEPS.MARKET,
      title: "Market Opportunity Agent",
      domain: "Industry & Size",
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100",
      description: "Calculates TAM, SAM, SOM breakdown ($B/$M) and CAGR % growth velocity."
    },
    {
      id: AGENT_STEPS.CUSTOMER,
      title: "Customer Segmentation Agent",
      domain: "Consumer & ICP",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-100",
      description: "Identifies Ideal Customer Profiles (ICPs), personas, pain severity (1-10), and ARPU."
    },
    {
      id: AGENT_STEPS.COMPETITOR,
      title: "Competitor Discovery Agent",
      domain: "Tavily Web Search",
      icon: Search,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
      description: "Executes live web search via Tavily for direct/indirect rivals, pricing, and features."
    },
    {
      id: AGENT_STEPS.COMPARISON,
      title: "Strategic Comparison Agent",
      domain: "Rival Feature Parity",
      icon: BarChart3,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100",
      description: "Builds feature comparison matrix, market gaps, UVP, and 0-100 Validation Score."
    },
    {
      id: AGENT_STEPS.SWOT_RISK,
      title: "SWOT & Risk Analysis Agent",
      domain: "Risk Index & SWOT",
      icon: ShieldAlert,
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-100",
      description: "Generates 2x2 SWOT matrix and Risk Index scores across Competitor, Demand, and Regulatory factors."
    },
    {
      id: AGENT_STEPS.MVP,
      title: "MVP Feature Agent",
      domain: "MoSCoW Prioritization",
      icon: Layers,
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100",
      description: "Prioritizes features into Must Have, Should Have, Could Have, and Won't Have tiers."
    },
    {
      id: AGENT_STEPS.GTM,
      title: "Go-To-Market Strategy Agent",
      domain: "GTM Launch Playbook",
      icon: Rocket,
      color: "text-sky-600",
      bg: "bg-sky-50 border-sky-100",
      description: "Formulates positioning statement, acquisition playbook, and a 90-day step-by-step launch timeline."
    },
    {
      id: "advisor",
      title: "Conversational AI Advisor",
      domain: "KB Ingestion Chatbot",
      icon: Bot,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
      description: "Interactive AI Chatbot ingesting the full validation knowledge base for follow-up strategy advice."
    }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-6 max-w-6xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Zap className="w-4 h-4 text-slate-900" />
            GAMMAVAL™ DIRECT AGENT LAUNCHER & ROUTER
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Autonomous Startup Validation Suite
          </h3>
        </div>

        <button
          onClick={onLaunchFullPipeline}
          disabled={isRunning}
          className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Run Full 7-Agent Validation Pipeline</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentsCatalog.map((agent) => {
          const IconComp = agent.icon;
          return (
            <div
              key={agent.id}
              onClick={() => onLaunchAgent(agent.id)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 space-y-3 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${agent.bg}`}>
                    <IconComp className={`w-4 h-4 ${agent.color}`} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{agent.domain}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {agent.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">
                  {agent.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-700 font-bold group-hover:translate-x-1 transition-transform">
                <span>Launch Agent</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
