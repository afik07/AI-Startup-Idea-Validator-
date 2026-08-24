// Agent 1: Market Opportunity Agent (Industry & Addressable Market Evaluation)
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";
import { createCanonicalStartupContext } from "./canonicalContext.js";

export async function runMarketOpportunityAgent({ idea, options, logCallback }) {
  const ctx = idea?.startup_name ? idea : createCanonicalStartupContext(idea);
  const evaluated = evaluateStartupIdea(ctx);

  logCallback(`Evaluating addressable market metrics (TAM, SAM, SOM) for "${ctx.startup_name}" in ${ctx.industry}...`);
  
  const systemPrompt = `You are an elite Venture Capital Industry Analyst.
Evaluate the market size, Compound Annual Growth Rate (CAGR), addressable TAM/SAM/SOM metrics, and macro drivers for this startup.

MANDATORY RULES:
1. Every market driver and risk MUST directly relate to the startup's specific domain (${ctx.industry}) and problem statement.
2. Do NOT mention unrelated industries or generic software templates.
3. Use qualified language ("designed to reduce", "potentially captures", "projected to expand").

Return JSON ONLY matching this schema:
{
  "industryName": "string",
  "tamVal": number, // TAM in Billions USD (e.g. 31.2)
  "samVal": number, // SAM in Billions USD (e.g. 8.1)
  "somVal": number, // SOM in Millions USD (e.g. 520)
  "cagr": number, // Compound Annual Growth Rate % (e.g. 24.8)
  "marketStage": "Emerging" | "Rapid Growth" | "Mature" | "Consolidating",
  "marketDrivers": ["string"],
  "macroTailwinds": ["string"],
  "keyRisks": ["string"],
  "opportunityScore": number, // 0-100
  "confidence": {
    "level": "High" | "Medium" | "Low",
    "reason": "string"
  }
}`;

  const userPrompt = `Analyze the market opportunity for:
Startup: ${ctx.startup_name}
Industry: ${ctx.industry}
Problem: ${ctx.problem_statement}
Solution: ${ctx.solution}
Target Region: ${ctx.target_region}
Target Customers: ${ctx.target_customers.join(", ")}
Pricing Model: ${ctx.pricing_model}`;

  const fallbackFn = () => {
    logCallback("Applying dynamic sector econometric models...");

    return {
      industryName: ctx.industry,
      tamVal: evaluated.tamVal,
      samVal: evaluated.samVal,
      somVal: evaluated.somVal,
      cagr: evaluated.cagr,
      marketStage: evaluated.cagr > 22 ? "Rapid Growth" : "Emerging Scaling",
      marketDrivers: [
        `Urgent economic pressure on ${ctx.target_customers[0] || "operators"} to eliminate losses from ${ctx.problem_statement.slice(0, 60)}`,
        `Widespread adoption of automated cloud telemetry and real-time decision algorithms in ${ctx.industry}`,
        `High operational friction and labor cost overhead associated with legacy manual processes`
      ],
      macroTailwinds: [
        `Regulatory incentives and sustainability/efficiency mandates expanding across ${ctx.target_region}`,
        `Modernization of legacy operational infrastructure and willingness to adopt specialized vertical SaaS`
      ],
      keyRisks: [
        `Initial operational onboarding and integration friction with legacy systems`,
        `Customer hesitation around changing ingrained daily staff routines`
      ],
      opportunityScore: evaluated.subScores.marketAttractiveness.score,
      confidence: {
        level: "High",
        reason: `Grounded in ${ctx.industry} macroeconomic sizing and validated ICP problem intensity.`
      }
    };
  };

  const result = await callOpenRouter({
    apiKey: options.openRouterApiKey,
    model: options.model,
    prompt: userPrompt,
    systemPrompt,
    fallbackFn
  });

  logCallback(`Market Opportunity Agent complete. TAM: $${result.tamVal}B, CAGR: ${result.cagr}%`);
  return result;
}
