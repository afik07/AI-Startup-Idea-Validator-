import React from "react";
import { TrendingUp, Users, Search, BarChart3, ShieldAlert, Layers, Rocket, Bot, Sparkles, ArrowRight, CheckCircle, Info, BookOpen } from "lucide-react";

export function AgentRouterHub() {
  const agentSpecs = [
    {
      step: "01",
      name: "Market Opportunity Agent",
      pillar: "FINANCIAL SIZING & TAM",
      icon: TrendingUp,
      color: "blue",
      badge: "Step 1 • Macro Economics",
      description: "Calculates total addressable market (TAM $B), serviceable obtainable market (SOM $M), and CAGR % growth velocity using top-down & bottom-up models.",
      inputs: "Pitch Brief & Target Geography",
      outputs: "TAM/SAM/SOM, CAGR %, 5-Yr Growth Curve"
    },
    {
      step: "02",
      name: "Customer Segmentation Agent",
      pillar: "CONSUMER RESEARCH & ICP",
      icon: Users,
      color: "purple",
      badge: "Step 2 • Buyer Personas",
      description: "Identifies Ideal Customer Profiles (ICPs), decision-maker personas, quantifies pain severity (1–10), Willingness-To-Pay, and estimated ARPU.",
      inputs: "Market TAM & Value Proposition",
      outputs: "ICP Summary, Pain Score, Target ACV"
    },
    {
      step: "03",
      name: "Competitor Discovery Agent",
      pillar: "TAVILY WEB SEARCH INTELLIGENCE",
      icon: Search,
      color: "emerald",
      badge: "Step 3 • Live Web Search",
      description: "Scrapes Google & live web indices via Tavily API to identify direct/indirect competitors, active pricing tiers, feature parity, and market saturation.",
      inputs: "Industry Domain & Core Keyword",
      outputs: "Discovered Rivals, Pricing, Saturation"
    },
    {
      step: "04",
      name: "Strategic Comparison Agent",
      pillar: "SCORECARD & MOAT MATRIX",
      icon: BarChart3,
      color: "amber",
      badge: "Step 4 • Viability Verdict",
      description: "Synthesizes competitive advantages, builds 2x2 positioning matrices, computes defensibility moats, and calculates the 0–100 Composite Viability Score.",
      inputs: "Upstream Agent Findings",
      outputs: "0–100 Viability Score, Official Verdict"
    },
    {
      step: "05",
      name: "SWOT & Risk Analysis Agent",
      pillar: "QUANTITATIVE RISK MODELING",
      icon: ShieldAlert,
      color: "rose",
      badge: "Step 5 • Risk Indices",
      description: "Constructs 4-quadrant SWOT matrices and computes weighted risk indices across 4 categories: Competitor, Market Demand, Regulatory, and Execution.",
      inputs: "Competitive Vulnerabilities & Headwinds",
      outputs: "SWOT Matrix, Category Risk Indices"
    },
    {
      step: "06",
      name: "MVP Feature Roadmap Agent",
      pillar: "MOSCOW SPRINT SPECIFICATION",
      icon: Layers,
      color: "cyan",
      badge: "Step 6 • Agile Roadmap",
      description: "Prioritizes feature scope into Must-Have, Should-Have, Could-Have, and Won't-Have buckets, estimating time-to-market sprint duration in weeks.",
      inputs: "Unaddressed Customer Pain Gaps",
      outputs: "MoSCoW Specs, Build Timeline (Weeks)"
    },
    {
      step: "07",
      name: "Go-To-Market Strategy Agent",
      pillar: "ACQUISITION & COMMERCIALIZATION",
      icon: Rocket,
      color: "fuchsia",
      badge: "Step 7 • GTM Playbook",
      description: "Formulates Geoffrey Moore positioning statements, zero-to-one 'First 100 Customers' playbooks, and 90-day phased launch roadmaps.",
      inputs: "Target Channels & Unit Economics",
      outputs: "Positioning Statement, 90-Day Milestones"
    },
    {
      step: "08",
      name: "Conversational AI Advisor",
      pillar: "CHATGPT CO-PILOT WITH MEMORY",
      icon: Bot,
      color: "teal",
      badge: "Step 8 • Milestone 4 Ingestion",
      description: "Ingests the entire multi-agent due diligence audit into conversational memory to answer strategic questions (cold emails, pitch decks, CAC/LTV math).",
      inputs: "Full Audit Knowledge Base",
      outputs: "Multi-Turn VC Advisory & Cold Copy"
    }
  ];

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            MULTI-AGENT SYSTEM SPECIFICATION & ARCHITECTURE GUIDE
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            How the 8-Agent Autonomous Due Diligence Suite Works
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Sequential Context Propagation Architecture: Each specialized agent informs the next to deliver investor-grade validation
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>8 SPECIALIZED AI AGENTS</span>
        </div>
      </div>

      {/* 8 Agent Specification Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentSpecs.map((agent) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.step}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Badge & Step */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    AGENT_{agent.step}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    {agent.pillar}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-2.5 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950 text-white shadow-xs">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
                    {agent.name}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {agent.description}
                </p>
              </div>

              {/* Input / Output Tags */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-400">INPUT:</span>
                  <span className="text-slate-700 truncate max-w-[160px]">{agent.inputs}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-400">OUTPUT:</span>
                  <span className="text-indigo-600 font-bold truncate max-w-[160px]">{agent.outputs}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
