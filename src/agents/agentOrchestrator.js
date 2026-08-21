// Multi-Agent Pipeline Orchestrator (Milestone 1, 2 & 3)
import { runMarketOpportunityAgent } from "./marketOpportunityAgent.js";
import { runCustomerSegmentationAgent } from "./customerSegmentationAgent.js";
import { runCompetitorDiscoveryAgent } from "./competitorDiscoveryAgent.js";
import { runComparisonAgent } from "./comparisonAgent.js";
import { runSwotRiskAgent } from "./swotRiskAgent.js";
import { runMvpRecommendationAgent } from "./mvpRecommendationAgent.js";
import { runGtmStrategyAgent } from "./gtmStrategyAgent.js";
import { AGENT_STEPS } from "./types.js";

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
      swotRiskData: null,
      mvpData: null,
      gtmData: null,
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

      // Step 5: SWOT & Risk Analysis Agent (Milestone 3)
      this.emit("agent_status", { step: AGENT_STEPS.SWOT_RISK, status: "running" });
      addLog(AGENT_STEPS.SWOT_RISK, "Starting SWOT & Risk Analysis Agent evaluation...");
      context.swotRiskData = await runSwotRiskAgent({
        idea,
        marketData: context.marketData,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.SWOT_RISK, msg)
      });
      this.emit("agent_status", { step: AGENT_STEPS.SWOT_RISK, status: "completed", data: context.swotRiskData });

      // Step 6: MVP Feature Recommendation Agent (MoSCoW) (Milestone 3)
      this.emit("agent_status", { step: AGENT_STEPS.MVP, status: "running" });
      addLog(AGENT_STEPS.MVP, "Starting MVP MoSCoW Feature Recommendation Agent...");
      context.mvpData = await runMvpRecommendationAgent({
        idea,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.MVP, msg)
      });
      this.emit("agent_status", { step: AGENT_STEPS.MVP, status: "completed", data: context.mvpData });

      // Step 7: Go-To-Market (GTM) Strategy Agent (Milestone 3)
      this.emit("agent_status", { step: AGENT_STEPS.GTM, status: "running" });
      addLog(AGENT_STEPS.GTM, "Starting Go-To-Market Strategy Agent roadmap generation...");
      context.gtmData = await runGtmStrategyAgent({
        idea,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.GTM, msg)
      });
      this.emit("agent_status", { step: AGENT_STEPS.GTM, status: "completed", data: context.gtmData });

      const durationMs = Date.now() - startTime;
      const finalReport = {
        idea,
        market: context.marketData,
        customer: context.customerData,
        competitors: context.competitorData,
        comparison: context.comparisonData,
        swotRisk: context.swotRiskData,
        mvp: context.mvpData,
        gtm: context.gtmData,
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
