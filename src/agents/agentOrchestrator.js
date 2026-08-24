// Multi-Agent Pipeline Orchestrator with Step Timing, Canonical Context & Consistency Enforcement
import { createCanonicalStartupContext } from "./canonicalContext.js";
import { runMarketOpportunityAgent } from "./marketOpportunityAgent.js";
import { runCustomerSegmentationAgent } from "./customerSegmentationAgent.js";
import { runCompetitorDiscoveryAgent } from "./competitorDiscoveryAgent.js";
import { runComparisonAgent } from "./comparisonAgent.js";
import { runSwotRiskAgent } from "./swotRiskAgent.js";
import { runMvpRecommendationAgent } from "./mvpRecommendationAgent.js";
import { runGtmStrategyAgent } from "./gtmStrategyAgent.js";
import { runConsistencyValidationAgent } from "./consistencyValidationAgent.js";
import { AGENT_STEPS } from "./types.js";

export class AgentOrchestrator {
  constructor(options = {}) {
    this.options = {
      openRouterApiKey: options.openRouterApiKey || "",
      tavilyApiKey: options.tavilyApiKey || "",
      model: options.model || "openai/gpt-4o-mini"
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

    // 1. Establish the Single Source of Truth Canonical Startup Context
    const startupContext = createCanonicalStartupContext(idea);
    this.emit("pipeline_start", { startupContext, idea, timestamp: new Date().toISOString() });

    const context = {
      startupContext,
      idea: {
        ...idea,
        title: startupContext.startup_name,
        domain: startupContext.industry,
        problem: startupContext.problem_statement,
        solution: startupContext.solution,
        description: `${startupContext.problem_statement} Solution: ${startupContext.solution}`
      },
      marketData: null,
      customerData: null,
      competitorData: null,
      comparisonData: null,
      swotRiskData: null,
      mvpData: null,
      gtmData: null,
      consistencyData: null,
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
      addLog("orchestrator", `Established Canonical Startup Context for "${startupContext.startup_name}" in ${startupContext.industry}.`);

      // Step 1: Market Opportunity Agent
      this.emit("agent_start", { step: AGENT_STEPS.MARKET });
      this.emit("agent_status", { step: AGENT_STEPS.MARKET, status: "running" });
      addLog(AGENT_STEPS.MARKET, `Evaluating global & regional industry metrics for ${startupContext.industry}...`);
      context.marketData = await runMarketOpportunityAgent({
        idea: startupContext,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.MARKET, msg)
      });
      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.MARKET, data: context.marketData });
      this.emit("agent_status", { step: AGENT_STEPS.MARKET, status: "completed", data: context.marketData });

      // Step 2: Customer Segmentation Agent
      this.emit("agent_start", { step: AGENT_STEPS.CUSTOMER });
      this.emit("agent_status", { step: AGENT_STEPS.CUSTOMER, status: "running" });
      addLog(AGENT_STEPS.CUSTOMER, `Profiling Ideal Customer Profile (${startupContext.target_customers[0] || "Target Buyers"})...`);
      context.customerData = await runCustomerSegmentationAgent({
        idea: startupContext,
        marketData: context.marketData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.CUSTOMER, msg)
      });
      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.CUSTOMER, data: context.customerData });
      this.emit("agent_status", { step: AGENT_STEPS.CUSTOMER, status: "completed", data: context.customerData });

      // Step 3: Competitor Discovery Agent (Verified Multi-Tier Discovery)
      this.emit("agent_start", { step: AGENT_STEPS.COMPETITOR });
      this.emit("agent_status", { step: AGENT_STEPS.COMPETITOR, status: "running" });
      addLog(AGENT_STEPS.COMPETITOR, "Discovering & verifying real commercial competitors (Direct, Indirect, Substitutes)...");
      context.competitorData = await runCompetitorDiscoveryAgent({
        idea: startupContext,
        marketData: context.marketData,
        customerData: context.customerData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.COMPETITOR, msg)
      });
      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.COMPETITOR, data: context.competitorData });
      this.emit("agent_status", { step: AGENT_STEPS.COMPETITOR, status: "completed", data: context.competitorData });

      // Step 4: Comparison & Strategy Agent
      this.emit("agent_start", { step: AGENT_STEPS.COMPARISON });
      this.emit("agent_status", { step: AGENT_STEPS.COMPARISON, status: "running" });
      addLog(AGENT_STEPS.COMPARISON, "Evaluating 2x2 positioning matrix and calculating 9 measurable sub-scores...");
      context.comparisonData = await runComparisonAgent({
        idea: startupContext,
        marketData: context.marketData,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.COMPARISON, msg)
      });
      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.COMPARISON, data: context.comparisonData });
      this.emit("agent_status", { step: AGENT_STEPS.COMPARISON, status: "completed", data: context.comparisonData });

      // Step 5: SWOT & Risk Analysis Agent
      this.emit("agent_start", { step: AGENT_STEPS.SWOT_RISK });
      this.emit("agent_status", { step: AGENT_STEPS.SWOT_RISK, status: "running" });
      addLog(AGENT_STEPS.SWOT_RISK, "Constructing domain-grounded 2x2 SWOT Matrix & Quantitative Risk Breakdown...");
      context.swotRiskData = await runSwotRiskAgent({
        idea: startupContext,
        marketData: context.marketData,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.SWOT_RISK, msg)
      });
      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.SWOT_RISK, data: context.swotRiskData });
      this.emit("agent_status", { step: AGENT_STEPS.SWOT_RISK, status: "completed", data: context.swotRiskData });

      // Step 6: MVP Feature Recommendation Agent (MoSCoW)
      this.emit("agent_start", { step: AGENT_STEPS.MVP });
      this.emit("agent_status", { step: AGENT_STEPS.MVP, status: "running" });
      addLog(AGENT_STEPS.MVP, "Deriving product-specific MoSCoW MVP feature blueprint...");
      context.mvpData = await runMvpRecommendationAgent({
        idea: startupContext,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.MVP, msg)
      });
      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.MVP, data: context.mvpData });
      this.emit("agent_status", { step: AGENT_STEPS.MVP, status: "completed", data: context.mvpData });

      // Step 7: Go-To-Market (GTM) Strategy Agent
      this.emit("agent_start", { step: AGENT_STEPS.GTM });
      this.emit("agent_status", { step: AGENT_STEPS.GTM, status: "running" });
      addLog(AGENT_STEPS.GTM, "Formulating ICP-specific acquisition channels & 90-day launch roadmap...");
      context.gtmData = await runGtmStrategyAgent({
        idea: startupContext,
        customerData: context.customerData,
        competitorData: context.competitorData,
        options: this.options,
        logCallback: (msg) => addLog(AGENT_STEPS.GTM, msg)
      });
      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.GTM, data: context.gtmData });
      this.emit("agent_status", { step: AGENT_STEPS.GTM, status: "completed", data: context.gtmData });

      // Step 8: Consistency Validation Agent & Advisor Knowledge Base Ingestion
      this.emit("agent_start", { step: AGENT_STEPS.ADVISOR });
      this.emit("agent_status", { step: AGENT_STEPS.ADVISOR, status: "running" });
      addLog(AGENT_STEPS.ADVISOR, "Running Consistency Validation Agent & ingesting audit data into AI Advisor...");
      
      context.consistencyData = await runConsistencyValidationAgent({
        idea: startupContext,
        marketData: context.marketData,
        customerData: context.customerData,
        competitorData: context.competitorData,
        comparisonData: context.comparisonData,
        swotRiskData: context.swotRiskData,
        mvpData: context.mvpData,
        gtmData: context.gtmData,
        logCallback: (msg) => addLog(AGENT_STEPS.ADVISOR, msg)
      });

      await stepDelay(400);
      this.emit("agent_complete", { step: AGENT_STEPS.ADVISOR, data: context.consistencyData });
      this.emit("agent_status", { step: AGENT_STEPS.ADVISOR, status: "completed" });

      const durationSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      addLog("orchestrator", `MAS Orchestration & Consistency Audit complete in ${durationSeconds}s. Report ready.`);

      const finalReport = {
        idea: context.idea,
        startupContext: startupContext,
        market: context.marketData,
        customer: context.customerData,
        competitors: context.competitorData,
        comparison: context.comparisonData,
        swotRisk: context.swotRiskData,
        mvp: context.mvpData,
        gtm: context.gtmData,
        consistencyAudit: context.consistencyData,
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
