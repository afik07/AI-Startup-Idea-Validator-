import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { DocsModal } from "./components/DocsModal";
import { HeroConsole } from "./components/HeroConsole";
import { AgentRouterHub } from "./components/AgentRouterHub";
import { IdeaInputForm } from "./components/IdeaInputForm";
import { PipelineStepper } from "./components/PipelineStepper";
import { ValidationScorecard } from "./components/ValidationScorecard";
import { MarketAnalysisView } from "./components/MarketAnalysisView";
import { CustomerSegmentationView } from "./components/CustomerSegmentationView";
import { CompetitorDiscoveryView } from "./components/CompetitorDiscoveryView";
import { ComparisonMatrixView } from "./components/ComparisonMatrixView";
import { SwotRiskView } from "./components/SwotRiskView";
import { MvpFeatureView } from "./components/MvpFeatureView";
import { GtmStrategyView } from "./components/GtmStrategyView";
import { StartupAdvisorChat } from "./components/StartupAdvisorChat";
import { ReportExportView } from "./components/ReportExportView";
import { AgentOrchestrator } from "./agents/agentOrchestrator";
import { parseStartupDocumentOrImage } from "./agents/documentParserAgent";
import { AGENT_STEPS } from "./agents/types";
import { Sparkles, BarChart3, Users, Search, TrendingUp, Download, ShieldAlert, Layers, Rocket, Bot } from "lucide-react";

export default function App() {
  const agentsRef = useRef(null);
  const resultsRef = useRef(null);

  const [apiKeys, setApiKeys] = useState(() => {
    const saved = localStorage.getItem("gammaval_api_keys");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.openRouterApiKey || parsed.tavilyApiKey) return parsed;
      } catch (e) {}
    }
    return {
      openRouterApiKey: import.meta.env.VITE_OPENROUTER_API_KEY || "",
      tavilyApiKey: import.meta.env.VITE_TAVILY_API_KEY || ""
    };
  });

  const [userSession, setUserSession] = useState(() => {
    const saved = localStorage.getItem("gammaval_user_session");
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedModel, setSelectedModel] = useState("google/gemini-2.0-flash-001");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [stepStatuses, setStepStatuses] = useState({
    [AGENT_STEPS.MARKET]: "pending",
    [AGENT_STEPS.CUSTOMER]: "pending",
    [AGENT_STEPS.COMPETITOR]: "pending",
    [AGENT_STEPS.COMPARISON]: "pending",
    [AGENT_STEPS.SWOT_RISK]: "pending",
    [AGENT_STEPS.MVP]: "pending",
    [AGENT_STEPS.GTM]: "pending"
  });
  const [logs, setLogs] = useState([]);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("scorecard");

  const scrollToAgents = () => {
    if (agentsRef.current) {
      agentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginSuccess = (user) => {
    setUserSession(user);
    localStorage.setItem("gammaval_user_session", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUserSession(null);
    localStorage.removeItem("gammaval_user_session");
  };

  const handleSaveApiKeys = (keys) => {
    setApiKeys(keys);
    localStorage.setItem("gammaval_api_keys", JSON.stringify(keys));
  };

  const handleRunValidation = async (idea) => {
    setIsRunning(true);
    setReport(null);
    setLogs([]);
    setStepStatuses({
      [AGENT_STEPS.MARKET]: "pending",
      [AGENT_STEPS.CUSTOMER]: "pending",
      [AGENT_STEPS.COMPETITOR]: "pending",
      [AGENT_STEPS.COMPARISON]: "pending",
      [AGENT_STEPS.SWOT_RISK]: "pending",
      [AGENT_STEPS.MVP]: "pending",
      [AGENT_STEPS.GTM]: "pending"
    });

    const orchestrator = new AgentOrchestrator({
      openRouterApiKey: apiKeys.openRouterApiKey,
      tavilyApiKey: apiKeys.tavilyApiKey,
      model: selectedModel
    });

    orchestrator.onEvent((type, data) => {
      if (type === "agent_status") {
        setStepStatuses((prev) => ({ ...prev, [data.step]: data.status }));
        if (data.status === "running") setCurrentStep(data.step);
      } else if (type === "agent_log") {
        setLogs((prev) => [...prev, data]);
      } else if (type === "pipeline_complete") {
        setReport(data);
        setIsRunning(false);
        setCurrentStep(null);
        setActiveTab("scorecard");

        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }

        if (data.comparison?.validationScore >= 80) {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
      } else if (type === "pipeline_error") {
        setIsRunning(false);
        alert(`Validation Error: ${data.error}`);
      }
    });

    try {
      await orchestrator.runPipeline(idea);
    } catch (err) {
      console.error("Pipeline run error:", err);
      setIsRunning(false);
    }
  };

  const handleTriggerPromptAction = async (actionType, promptText = "", attachedFile = null) => {
    let ideaToValidate;

    if (attachedFile) {
      setIsRunning(true);
      setLogs((prev) => [
        ...prev,
        {
          step: "market",
          message: `Vision Agent reading and transcribing startup document: ${attachedFile.name}...`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);

      const parsed = await parseStartupDocumentOrImage(attachedFile, promptText, {
        openRouterApiKey: apiKeys.openRouterApiKey,
        model: selectedModel
      });

      ideaToValidate = {
        founderName: parsed.founderName || userSession?.name || "Founder",
        title: parsed.title || attachedFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        domain: parsed.domain || "B2B SaaS / AI Tools",
        description: `${parsed.problem} Solution: ${parsed.solution}`,
        problem: parsed.problem,
        solution: parsed.solution,
        targetAudience: parsed.targetAudience,
        region: parsed.region || "Global",
        pricingModel: parsed.pricingModel || "Subscription SaaS",
        attachedDocument: parsed.attachedFileMeta || attachedFile,
        documentSummary: parsed.documentSummary,
        extractedKeyPoints: parsed.extractedKeyPoints
      };
    } else {
      const cleanPrompt = promptText.trim();
      ideaToValidate = {
        founderName: userSession?.name || "Founder",
        title: cleanPrompt ? (cleanPrompt.length > 50 ? cleanPrompt.slice(0, 50) + "..." : cleanPrompt) : "Custom AI Startup Idea",
        domain: "B2B SaaS / AI Tools",
        description: cleanPrompt || "An intelligent autonomous startup platform validated via multi-agent intelligence.",
        problem: cleanPrompt ? `Market friction and key challenges related to ${cleanPrompt}.` : "Founders struggle to validate demand, competitors, and market feasibility quickly.",
        solution: cleanPrompt ? `Specialized software platform built to solve ${cleanPrompt}.` : "Autonomous multi-agent system executing live due diligence in seconds.",
        region: "Global",
        pricingModel: "Subscription SaaS"
      };
    }

    handleRunValidation(ideaToValidate);

    if (actionType === "market") setActiveTab("market");
    else if (actionType === "customer") setActiveTab("customer");
    else if (actionType === "competitors") setActiveTab("competitors");
    else if (actionType === "mvp") setActiveTab("mvp");
    else if (actionType === "gtm") setActiveTab("gtm");
  };

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col relative overflow-hidden">
      {/* Header Navbar tailored to GammaVal AI */}
      <Header
        apiKeys={apiKeys}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenDocsModal={() => setIsDocsModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        userSession={userSession}
        onLogout={handleLogout}
        onTriggerDownload={() => {
          setActiveTab("export");
          if (resultsRef.current) resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }}
        onScrollToAgents={scrollToAgents}
      />

      {/* Hero Console with Black Mascot Doll on Left */}
      <HeroConsole
        onTriggerPrompt={handleTriggerPromptAction}
        onOpenPitchModal={() => {
          if (resultsRef.current) resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10">
        {/* Pitch Your Vision Form */}
        <IdeaInputForm
          onSubmitIdea={handleRunValidation}
          isRunning={isRunning}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />

        {/* Direct Agent Router Catalog */}
        <div ref={agentsRef} className="scroll-mt-20">
          <AgentRouterHub
            onLaunchAgent={(agentId) => {
              if (agentId === "advisor") {
                setActiveTab("advisor");
                if (resultsRef.current) resultsRef.current.scrollIntoView({ behavior: "smooth" });
              } else {
                handleTriggerPromptAction(agentId, "Direct Agent Launch Query");
              }
            }}
            onLaunchFullPipeline={() => {
              if (window.confirm("Enter custom idea details below or click OK to run live pipeline with current vision:")) {
                handleTriggerPromptAction("general", "Custom Startup Idea");
              }
            }}
            isRunning={isRunning}
          />
        </div>

        {/* Stepper Telemetry Console during/after execution */}
        {(isRunning || logs.length > 0) && (
          <PipelineStepper
            stepStatuses={stepStatuses}
            logs={logs}
            currentStep={currentStep}
          />
        )}

        {/* Validation Results Dashboard */}
        {report && (
          <div ref={resultsRef} className="space-y-6 animate-fade-in scroll-mt-20">
            {/* Results Navigation Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 overflow-x-auto gap-2">
              <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
                <button
                  onClick={() => setActiveTab("scorecard")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "scorecard"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Scorecard & Verdict
                </button>
                <button
                  onClick={() => setActiveTab("market")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "market"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Market TAM/SAM/SOM
                </button>
                <button
                  onClick={() => setActiveTab("customer")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "customer"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Customer ICP
                </button>
                <button
                  onClick={() => setActiveTab("competitors")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "competitors"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  Tavily Rivals
                </button>
                <button
                  onClick={() => setActiveTab("comparison")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "comparison"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Feature Matrix
                </button>
                <button
                  onClick={() => setActiveTab("swotRisk")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "swotRisk"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  SWOT & Risk
                </button>
                <button
                  onClick={() => setActiveTab("mvp")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "mvp"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  MoSCoW MVP
                </button>
                <button
                  onClick={() => setActiveTab("gtm")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "gtm"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  GTM Plan
                </button>
                <button
                  onClick={() => setActiveTab("advisor")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "advisor"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  AI Advisor Chat
                </button>
                <button
                  onClick={() => setActiveTab("export")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "export"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Audit
                </button>
              </div>
            </div>

            {/* Tab Views */}
            {activeTab === "scorecard" && <ValidationScorecard report={report} />}
            {activeTab === "market" && <MarketAnalysisView market={report.market} />}
            {activeTab === "customer" && <CustomerSegmentationView customer={report.customer} />}
            {activeTab === "competitors" && <CompetitorDiscoveryView competitors={report.competitors} />}
            {activeTab === "comparison" && <ComparisonMatrixView comparison={report.comparison} competitors={report.competitors} />}
            {activeTab === "swotRisk" && <SwotRiskView swotRisk={report.swotRisk} />}
            {activeTab === "mvp" && <MvpFeatureView mvp={report.mvp} />}
            {activeTab === "gtm" && <GtmStrategyView gtm={report.gtm} />}
            {activeTab === "advisor" && <StartupAdvisorChat report={report} apiKeys={apiKeys} selectedModel={selectedModel} />}
            {activeTab === "export" && <ReportExportView report={report} />}
          </div>
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKeys={apiKeys}
        onSaveApiKeys={handleSaveApiKeys}
      />

      <DocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-mono relative z-10 bg-white">
        <p>GammaVal™ AI • Multi-Agent Startup Idea Validator Engine</p>
      </footer>
    </div>
  );
}
