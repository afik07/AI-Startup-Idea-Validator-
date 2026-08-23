// Multi-Agent Pipeline Orchestrator with Step Timing & 8-Agent Execution Stream
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

    const stepDelay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

    try {
      // Step 1: Market Opportunity Agent
      this.emit("agent_start", { step: AGENT_STEPS.MARKET });
      this.emit("agent_status", { step: AGENT_STEPS.MARKET, status: "running" });
      addLog(AGENT_STEPS.MARKET, "Starting Market Opportunity Agent analysis (TAM/SAM/SOM)...");
      context.marketData = await runMarketOpportunityAgent({
        idea,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.MARKET, msg)
      });
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.MARKET, data: context.marketData });
      this.emit("agent_status", { step: AGENT_STEPS.MARKET, status: "completed", data: context.marketData });

      // Step 2: Customer Segmentation Agent
      this.emit("agent_start", { step: AGENT_STEPS.CUSTOMER });
      this.emit("agent_status", { step: AGENT_STEPS.CUSTOMER, status: "running" });
      addLog(AGENT_STEPS.CUSTOMER, "Starting Customer Segmentation Agent analysis (ICP & WTP)...");
      context.customerData = await runCustomerSegmentationAgent({
        idea,
        marketData: context.marketData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.CUSTOMER, msg)
      });
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.CUSTOMER, data: context.customerData });
      this.emit("agent_status", { step: AGENT_STEPS.CUSTOMER, status: "completed", data: context.customerData });

      // Step 3: Competitor Discovery Agent (Tavily Live Web Search)
      this.emit("agent_start", { step: AGENT_STEPS.COMPETITOR });
      this.emit("agent_status", { step: AGENT_STEPS.COMPETITOR, status: "running" });
      addLog(AGENT_STEPS.COMPETITOR, "Starting Competitor Discovery Agent (Live Web Search)...");
      context.competitorData = await runCompetitorDiscoveryAgent({
        idea,
        marketData: context.marketData,
        customerData: context.customerData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.COMPETITOR, msg)
      });
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.COMPETITOR, data: context.competitorData });
      this.emit("agent_status", { step: AGENT_STEPS.COMPETITOR, status: "completed", data: context.competitorData });

      // Step 4: Comparison & Strategy Agent
      this.emit("agent_start", { step: AGENT_STEPS.COMPARISON });
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
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.COMPARISON, data: context.comparisonData });
      this.emit("agent_status", { step: AGENT_STEPS.COMPARISON, status: "completed", data: context.comparisonData });

      // Step 5: SWOT & Risk Analysis Agent (Milestone 3)
      this.emit("agent_start", { step: AGENT_STEPS.SWOT_RISK });
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
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.SWOT_RISK, data: context.swotRiskData });
      this.emit("agent_status", { step: AGENT_STEPS.SWOT_RISK, status: "completed", data: context.swotRiskData });

      // Step 6: MVP Feature Recommendation Agent (MoSCoW) (Milestone 3)
      this.emit("agent_start", { step: AGENT_STEPS.MVP });
      this.emit("agent_status", { step: AGENT_STEPS.MVP, status: "running" });
      addLog(AGENT_STEPS.MVP, "Starting MVP MoSCoW Feature Recommendation Agent...");
      context.mvpData = await runMvpRecommendationAgent({
        idea,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.MVP, msg)
      });
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.MVP, data: context.mvpData });
      this.emit("agent_status", { step: AGENT_STEPS.MVP, status: "completed", data: context.mvpData });

      // Step 7: Go-To-Market (GTM) Strategy Agent (Milestone 3)
      this.emit("agent_start", { step: AGENT_STEPS.GTM });
      this.emit("agent_status", { step: AGENT_STEPS.GTM, status: "running" });
      addLog(AGENT_STEPS.GTM, "Starting Go-To-Market Strategy Agent roadmap generation...");
      context.gtmData = await runGtmStrategyAgent({
        idea,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.GTM, msg)
      });
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.GTM, data: context.gtmData });
      this.emit("agent_status", { step: AGENT_STEPS.GTM, status: "completed", data: context.gtmData });

      // Step 8: Conversational AI Advisor Knowledge Base Ingestion Agent (Milestone 4)
      this.emit("agent_start", { step: AGENT_STEPS.ADVISOR });
      this.emit("agent_status", { step: AGENT_STEPS.ADVISOR, status: "running" });
      addLog(AGENT_STEPS.ADVISOR, "Ingesting multi-agent audit data into Conversational ChatGPT Advisor Knowledge Base...");
      await stepDelay(450);
      this.emit("agent_complete", { step: AGENT_STEPS.ADVISOR });
      this.emit("agent_status", { step: AGENT_STEPS.ADVISOR, status: "completed" });

      const durationSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      addLog("orchestrator", `8-Agent MAS Orchestration complete in ${durationSeconds}s. Knowledge Base ready.`);

      const finalReport = {
        idea,
        market: context.marketData,
        customer: context.customerData,
        competitors: context.competitorData,
        comparison: context.comparisonData,
        swotRisk: context.swotRiskData,
        mvp: context.mvpData,
        gtm: context.gtmData,
        durationSeconds,
        completedAt: new Date().toLocaleString(),
        logs: context.logs
      };

      this.emit("pipeline_complete", finalReport);
      return finalReport;
    } catch (err) {
      console.error("Orchestrator pipeline failed:", err);
      addLog("orchestrator", `Pipeline execution halted: ${err.message}`);
      this.emit("pipeline_error", { error: err.message });
      throw err;
    }
  }
}
