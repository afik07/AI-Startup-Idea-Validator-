import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { HeroSection } from "./components/HeroSection";
import { Header } from "./components/Header";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { DocsModal } from "./components/DocsModal";
import { IdeaInputForm } from "./components/IdeaInputForm";
import { PipelineStepper } from "./components/PipelineStepper";
import { ValidationScorecard } from "./components/ValidationScorecard";
import { MarketAnalysisView } from "./components/MarketAnalysisView";
import { CustomerSegmentationView } from "./components/CustomerSegmentationView";
import { CompetitorDiscoveryView } from "./components/CompetitorDiscoveryView";
import { ComparisonMatrixView } from "./components/ComparisonMatrixView";
import { ReportExportView } from "./components/ReportExportView";
import { AgentOrchestrator } from "./agents/agentOrchestrator";
import { AGENT_STEPS } from "./agents/types";
import { Sparkles, BarChart3, Users, Search, TrendingUp, Download } from "lucide-react";

export default function App() {
  const studioRef = useRef(null);

  const [apiKeys, setApiKeys] = useState(() => {
    const saved = localStorage.getItem("validator_api_keys");
    return saved ? JSON.parse(saved) : { openRouterApiKey: "", tavilyApiKey: "" };
  });

  const [selectedModel, setSelectedModel] = useState("google/gemini-2.0-flash-001");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [stepStatuses, setStepStatuses] = useState({
    [AGENT_STEPS.MARKET]: "pending",
    [AGENT_STEPS.CUSTOMER]: "pending",
    [AGENT_STEPS.COMPETITOR]: "pending",
    [AGENT_STEPS.COMPARISON]: "pending"
  });
  const [logs, setLogs] = useState([]);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("scorecard");

  const scrollToStudio = () => {
    if (studioRef.current) {
      studioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSaveApiKeys = (keys) => {
    setApiKeys(keys);
    localStorage.setItem("validator_api_keys", JSON.stringify(keys));
  };

  const handleRunValidation = async (idea) => {
    setIsRunning(true);
    setReport(null);
    setLogs([]);
    setStepStatuses({
      [AGENT_STEPS.MARKET]: "pending",
      [AGENT_STEPS.CUSTOMER]: "pending",
      [AGENT_STEPS.COMPETITOR]: "pending",
      [AGENT_STEPS.COMPARISON]: "pending"
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

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-indigo-500 selection:text-white flex flex-col relative overflow-hidden">
      {/* Colorful Animated Background Backdrop */}
      <div className="colorful-bg-animation">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
        <div className="aurora-blob aurora-3"></div>
      </div>

      {/* Hero Section */}
      <HeroSection onBeginJourney={scrollToStudio} />

      {/* Validation Hub */}
      <div ref={studioRef} id="studio-hub" className="scroll-mt-6 relative z-10">
        <Header
          apiKeys={apiKeys}
          onOpenKeyModal={() => setIsKeyModalOpen(true)}
          onOpenDocsModal={() => setIsDocsModalOpen(true)}
          activeModel={selectedModel}
        />

        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Pitch Your Vision Input Form */}
          <IdeaInputForm
            onSubmitIdea={handleRunValidation}
            isRunning={isRunning}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />

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
            <div className="space-y-6 animate-fade-in">
              {/* Results Tab Bar Navigation */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("scorecard")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                      activeTab === "scorecard"
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Scorecard & Verdict
                  </button>
                  <button
                    onClick={() => setActiveTab("market")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                      activeTab === "market"
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Market TAM/SAM/SOM
                  </button>
                  <button
                    onClick={() => setActiveTab("customer")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                      activeTab === "customer"
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    Customer ICP & Personas
                  </button>
                  <button
                    onClick={() => setActiveTab("competitors")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                      activeTab === "competitors"
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    Tavily Live Rivals
                  </button>
                  <button
                    onClick={() => setActiveTab("comparison")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                      activeTab === "comparison"
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Feature Matrix & Gaps
                  </button>
                  <button
                    onClick={() => setActiveTab("export")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                      activeTab === "export"
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Audit Report
                  </button>
                </div>

                <div className="text-xs text-slate-400 hidden sm:block font-mono">
                  Validation Complete ({report.completedAt})
                </div>
              </div>

              {/* Tab Views */}
              {activeTab === "scorecard" && <ValidationScorecard report={report} />}
              {activeTab === "market" && <MarketAnalysisView market={report.market} />}
              {activeTab === "customer" && <CustomerSegmentationView customer={report.customer} />}
              {activeTab === "competitors" && <CompetitorDiscoveryView competitors={report.competitors} />}
              {activeTab === "comparison" && <ComparisonMatrixView comparison={report.comparison} competitors={report.competitors} />}
              {activeTab === "export" && <ReportExportView report={report} />}
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
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
      <footer className="border-t border-slate-900/80 py-8 text-center text-xs text-slate-500 font-mono relative z-10">
        <p>VentureVal™ AI • Multi-Agent Startup Validator • OpenRouter & Tavily Search Engine</p>
      </footer>
    </div>
  );
}
