import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { ArchitectureModal } from "./components/ArchitectureModal";
import { SavedProjectsModal } from "./components/SavedProjectsModal";
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
import { InteractiveMascotEyes } from "./components/InteractiveMascotEyes";
import { AgentOrchestrator } from "./agents/agentOrchestrator";
import { parseStartupDocumentOrImage } from "./agents/documentParserAgent";
import { AGENT_STEPS } from "./agents/types";
import { Sparkles, BarChart3, Users, Search, TrendingUp, Download, ShieldAlert, Layers, Rocket, Bot, Bookmark, CheckCircle2 } from "lucide-react";

export default function App() {
  const agentsRef = useRef(null);
  const stepperRef = useRef(null);
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

  const [savedProjects, setSavedProjects] = useState(() => {
    const saved = localStorage.getItem("gammaval_saved_projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [selectedModel, setSelectedModel] = useState("openai/gpt-4o-mini");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isSavedProjectsModalOpen, setIsSavedProjectsModalOpen] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [stepStatuses, setStepStatuses] = useState({
    [AGENT_STEPS.MARKET]: "pending",
    [AGENT_STEPS.CUSTOMER]: "pending",
    [AGENT_STEPS.COMPETITOR]: "pending",
    [AGENT_STEPS.COMPARISON]: "pending",
    [AGENT_STEPS.SWOT_RISK]: "pending",
    [AGENT_STEPS.MVP]: "pending",
    [AGENT_STEPS.GTM]: "pending",
    [AGENT_STEPS.ADVISOR]: "pending"
  });
  const [logs, setLogs] = useState([]);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("scorecard");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToAgents = () => {
    if (agentsRef.current) {
      agentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToStepper = () => {
    setTimeout(() => {
      if (stepperRef.current) {
        stepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleLoginSuccess = (user) => {
    setUserSession(user);
    localStorage.setItem("gammaval_user_session", JSON.stringify(user));
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setUserSession(null);
    localStorage.removeItem("gammaval_user_session");
    showToast("Signed out successfully.");
  };

  const handleSaveApiKeys = (keys) => {
    setApiKeys(keys);
    localStorage.setItem("gammaval_api_keys", JSON.stringify(keys));
    showToast("API Keys saved securely!");
  };

  const handleSaveProject = (reportToSave) => {
    if (!reportToSave) return;
    const projectEntry = {
      ...reportToSave,
      id: reportToSave.id || `proj_${Date.now()}`,
      savedAt: new Date().toLocaleString()
    };

    setSavedProjects((prev) => {
      const existingIdx = prev.findIndex((p) => p.idea?.title === projectEntry.idea?.title);
      let updated;
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = projectEntry;
      } else {
        updated = [projectEntry, ...prev];
      }
      localStorage.setItem("gammaval_saved_projects", JSON.stringify(updated));
      return updated;
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    showToast(`Saved "${projectEntry.idea?.title}" to your Project Vault!`);
  };

  const handleDeleteProject = (projectId) => {
    setSavedProjects((prev) => {
      const updated = prev.filter((p, i) => p.id !== projectId && i !== projectId);
      localStorage.setItem("gammaval_saved_projects", JSON.stringify(updated));
      return updated;
    });
    showToast("Project removed from vault.");
  };

  const handleLoadProject = (project) => {
    setReport(project);
    setActiveTab("scorecard");
    showToast(`Loaded audit: ${project.idea?.title}`);
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
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
      [AGENT_STEPS.GTM]: "pending",
      [AGENT_STEPS.ADVISOR]: "pending"
    });

    scrollToStepper();

    const orchestrator = new AgentOrchestrator({
      openRouterApiKey: apiKeys.openRouterApiKey,
      tavilyApiKey: apiKeys.tavilyApiKey,
      model: selectedModel
    });

    orchestrator.onEvent((type, data) => {
      if (type === "agent_log") {
        setLogs((prev) => [...prev, data]);
      } else if (type === "agent_start") {
        setCurrentStep(data.step);
        setStepStatuses((prev) => ({ ...prev, [data.step]: "running" }));
      } else if (type === "agent_complete") {
        setStepStatuses((prev) => ({ ...prev, [data.step]: "completed" }));
      } else if (type === "agent_status") {
        if (data.status === "running") {
          setCurrentStep(data.step);
        }
        setStepStatuses((prev) => ({ ...prev, [data.step]: data.status }));
      } else if (type === "pipeline_complete") {
        setIsRunning(false);
        setReport(data);
        setCurrentStep(null);
        setStepStatuses({
          [AGENT_STEPS.MARKET]: "completed",
          [AGENT_STEPS.CUSTOMER]: "completed",
          [AGENT_STEPS.COMPETITOR]: "completed",
          [AGENT_STEPS.COMPARISON]: "completed",
          [AGENT_STEPS.SWOT_RISK]: "completed",
          [AGENT_STEPS.MVP]: "completed",
          [AGENT_STEPS.GTM]: "completed",
          [AGENT_STEPS.ADVISOR]: "completed"
        });

        if (data.comparison?.validationScore >= 75) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }

        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 250);
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
      scrollToStepper();
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
        domain: parsed.domain || "AgriTech / Precision Farming",
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
        domain: "AgriTech / Precision Farming",
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
    else if (actionType === "advisor") setActiveTab("advisor");
  };

  const isCurrentReportSaved = report && savedProjects.some((p) => p.idea?.title === report.idea?.title);

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col relative overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-950 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navbar */}
      <Header
        apiKeys={apiKeys}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenSavedProjectsModal={() => setIsSavedProjectsModalOpen(true)}
        savedProjectsCount={savedProjects.length}
        userSession={userSession}
        onLogout={handleLogout}
        onTriggerDownload={() => {
          setActiveTab("export");
          if (resultsRef.current) resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }}
        onScrollToAgents={scrollToAgents}
      />

      {/* Hero Console */}
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

        {/* 8-Agent System Specification & Architecture Guide */}
        <div ref={agentsRef} className="scroll-mt-20">
          <AgentRouterHub />
        </div>

        {/* Animated Stepper Telemetry Console during/after execution */}
        <div ref={stepperRef} className="scroll-mt-20">
          {(isRunning || logs.length > 0) && (
            <PipelineStepper
              stepStatuses={stepStatuses}
              logs={logs}
              currentStep={currentStep}
            />
          )}
        </div>

        {/* Validation Results Dashboard (Vibrant & Animated) */}
        {report && (
          <div ref={resultsRef} className="space-y-6 animate-fade-in scroll-mt-20">
            {/* Results Navigation Bar with Dynamic Colors */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 overflow-x-auto gap-2 scrollbar-thin">
              <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
                {/* Scorecard Tab */}
                <button
                  onClick={() => setActiveTab("scorecard")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "scorecard"
                      ? "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md ring-2 ring-indigo-500/30 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${activeTab === "scorecard" ? "text-indigo-400 animate-pulse" : "text-slate-400"}`} />
                  <span>Scorecard & Verdict</span>
                </button>

                {/* Market Tab */}
                <button
                  onClick={() => setActiveTab("market")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "market"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Market TAM/SAM/SOM</span>
                </button>

                {/* Customer Tab */}
                <button
                  onClick={() => setActiveTab("customer")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "customer"
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-purple-600 border border-slate-200 hover:border-purple-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Customer ICP</span>
                </button>

                {/* Competitors Tab */}
                <button
                  onClick={() => setActiveTab("competitors")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "competitors"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-emerald-600 border border-slate-200 hover:border-emerald-200"
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Tavily Rivals & 2x2</span>
                </button>

                {/* Feature Matrix Tab */}
                <button
                  onClick={() => setActiveTab("comparison")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "comparison"
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-amber-600 border border-slate-200 hover:border-amber-200"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Feature Matrix</span>
                </button>

                {/* SWOT & Risk Tab */}
                <button
                  onClick={() => setActiveTab("swotRisk")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "swotRisk"
                      ? "bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-md shadow-rose-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200"
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>SWOT & Risk</span>
                </button>

                {/* MoSCoW MVP Tab */}
                <button
                  onClick={() => setActiveTab("mvp")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "mvp"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-cyan-600 border border-slate-200 hover:border-cyan-200"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>MoSCoW MVP</span>
                </button>

                {/* GTM Plan Tab */}
                <button
                  onClick={() => setActiveTab("gtm")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "gtm"
                      ? "bg-gradient-to-r from-fuchsia-600 to-pink-700 text-white shadow-md shadow-fuchsia-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-fuchsia-600 border border-slate-200 hover:border-fuchsia-200"
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>GTM Plan</span>
                </button>

                {/* AI Advisor Chat Tab */}
                <button
                  onClick={() => setActiveTab("advisor")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "advisor"
                      ? "bg-gradient-to-r from-teal-600 to-emerald-700 text-white shadow-md shadow-teal-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-teal-600 border border-slate-200 hover:border-teal-200"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-teal-400" />
                  <span>AI Advisor Chat</span>
                </button>

                {/* Export Audit Tab */}
                <button
                  onClick={() => setActiveTab("export")}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeTab === "export"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md shadow-indigo-500/25 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export & PDF</span>
                </button>
              </div>
            </div>

            {/* Tab Views with Fluid Transitions */}
            <div className="transition-all duration-300">
              {activeTab === "scorecard" && <ValidationScorecard report={report} />}
              {activeTab === "market" && <MarketAnalysisView market={report.market} />}
              {activeTab === "customer" && <CustomerSegmentationView customer={report.customer} />}
              {activeTab === "competitors" && <CompetitorDiscoveryView competitors={report.competitors} />}
              {activeTab === "comparison" && <ComparisonMatrixView comparison={report.comparison} competitors={report.competitors} />}
              {activeTab === "swotRisk" && <SwotRiskView swotRisk={report.swotRisk} />}
              {activeTab === "mvp" && <MvpFeatureView mvp={report.mvp} />}
              {activeTab === "gtm" && <GtmStrategyView gtm={report.gtm} />}
              {activeTab === "advisor" && (
                <StartupAdvisorChat
                  report={report}
                  apiKeys={apiKeys}
                  selectedModel={selectedModel}
                  onSaveApiKeys={handleSaveApiKeys}
                />
              )}
              {activeTab === "export" && (
                <ReportExportView
                  report={report}
                  onSaveProject={handleSaveProject}
                  isSaved={isCurrentReportSaved}
                />
              )}
            </div>
          </div>
        )}

        {/* Interactive Cursor-Tracking Mascot Eyes (Located right below the Output) */}
        <InteractiveMascotEyes report={report} />
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

      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      <SavedProjectsModal
        isOpen={isSavedProjectsModalOpen}
        onClose={() => setIsSavedProjectsModalOpen(false)}
        savedProjects={savedProjects}
        onLoadProject={handleLoadProject}
        onDeleteProject={handleDeleteProject}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-mono relative z-10 bg-white">
        <p>GammaVal™ AI • 8-Agent Autonomous Startup Validation Engine • MIT License</p>
      </footer>
    </div>
  );
}
