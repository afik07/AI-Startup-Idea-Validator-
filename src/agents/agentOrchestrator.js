// Multi-Agent Pipeline Orchestrator
import { runMarketOpportunityAgent } from "./marketOpportunityAgent";
import { runCustomerSegmentationAgent } from "./customerSegmentationAgent";
import { runCompetitorDiscoveryAgent } from "./competitorDiscoveryAgent";
import { runComparisonAgent } from "./comparisonAgent";
import { AGENT_STEPS } from "./types";

export class AgentOrchestrator {
  constructor(options = {}) {
    this.options = {
      openRouterApiKey: options.openRouterApiKey || "",
      tavilyApiKey: options.tavilyApiKey || "",
      model: options.model || "google/gemini-2.0-flash-001"
    };
    this.listeners = [];
  }

  onEvent(callback) {
    this.listeners.push(callback);
  }

  emit(eventType, payload) {
    this.listeners.forEach((listener) => {
      try {
        listener(eventType, payload);
      } catch (err) {
        console.error("Orchestrator event listener error:", err);
      }
    });
  }

  async runPipeline(idea) {
    const startTime = Date.now();
    this.emit("pipeline_start", { idea, timestamp: new Date().toISOString() });

    const context = {
      idea,
      marketData: null,
      customerData: null,
      competitorData: null,
      comparisonData: null,
      logs: []
    };

    const addLog = (agentStep, message) => {
      const logEntry = {
        step: agentStep,
        message,
        timestamp: new Date().toLocaleTimeString()
      };
      context.logs.push(logEntry);
      this.emit("agent_log", logEntry);
    };

    try {
      // Step 1: Market Opportunity Agent
      this.emit("agent_status", { step: AGENT_STEPS.MARKET, status: "running" });
      addLog(AGENT_STEPS.MARKET, "Starting Market Opportunity Agent analysis...");
      context.marketData = await runMarketOpportunityAgent({
        idea,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.MARKET, msg)
      });
      this.emit("agent_status", { step: AGENT_STEPS.MARKET, status: "completed", data: context.marketData });

      // Step 2: Customer Segmentation Agent
      this.emit("agent_status", { step: AGENT_STEPS.CUSTOMER, status: "running" });
      addLog(AGENT_STEPS.CUSTOMER, "Starting Customer Segmentation Agent analysis...");
      context.customerData = await runCustomerSegmentationAgent({
        idea,
        marketData: context.marketData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.CUSTOMER, msg)
      });
      this.emit("agent_status", { step: AGENT_STEPS.CUSTOMER, status: "completed", data: context.customerData });

      // Step 3: Competitor Discovery Agent (Tavily Live Web Search)
      this.emit("agent_status", { step: AGENT_STEPS.COMPETITOR, status: "running" });
      addLog(AGENT_STEPS.COMPETITOR, "Starting Competitor Discovery Agent (Tavily Search)...");
      context.competitorData = await runCompetitorDiscoveryAgent({
        idea,
        marketData: context.marketData,
        customerData: context.customerData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.COMPETITOR, msg)
      });
      this.emit("agent_status", { step: AGENT_STEPS.COMPETITOR, status: "completed", data: context.competitorData });

      // Step 4: Comparison & Strategy Agent
      this.emit("agent_status", { step: AGENT_STEPS.COMPARISON, status: "running" });
      addLog(AGENT_STEPS.COMPARISON, "Starting Comparison & Strategy Agent matrix evaluation...");
      context.comparisonData = await runComparisonAgent({
        idea,
        marketData: context.marketData,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.COMPARISON, msg)
      });
      this.emit("agent_status", { step: AGENT_STEPS.COMPARISON, status: "completed", data: context.comparisonData });

      const durationMs = Date.now() - startTime;
      const finalReport = {
        idea,
        market: context.marketData,
        customer: context.customerData,
        competitors: context.competitorData,
        comparison: context.comparisonData,
        logs: context.logs,
        durationSeconds: (durationMs / 1000).toFixed(1),
        completedAt: new Date().toLocaleString()
      };

      this.emit("pipeline_complete", finalReport);
      return finalReport;
    } catch (err) {
      console.error("Pipeline Orchestration failed:", err);
      this.emit("pipeline_error", { error: err.message });
      throw err;
    }
  }
}
