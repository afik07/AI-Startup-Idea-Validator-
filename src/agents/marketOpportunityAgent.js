// Agent 1: Market Opportunity Agent (Industry & Addressable Market Evaluation)
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";

export async function runMarketOpportunityAgent({ idea, options, logCallback }) {
  logCallback("Evaluating global & regional industry metrics (TAM, SAM, SOM)...");
  
  const systemPrompt = `You are an expert Venture Capital Industry Analyst & Market Researcher. 
Your role is to rigorously evaluate market size, growth velocity (CAGR), TAM/SAM/SOM addressable metrics, macro trends, and market tailwinds for a startup idea.
Return JSON ONLY matching this schema:
{
  "industryName": "string",
  "tamVal": number, // TAM in Billions USD (e.g. 14.5)
  "samVal": number, // SAM in Billions USD (e.g. 3.2)
  "somVal": number, // SOM in Millions USD (e.g. 150)
  "cagr": number, // Compound Annual Growth Rate % (e.g. 18.4)
  "marketStage": "Emerging" | "Rapid Growth" | "Mature" | "Consolidating",
  "marketDrivers": ["string"],
  "macroTailwinds": ["string"],
  "keyRisks": ["string"],
  "opportunityScore": number // 0-100 scale rating market attractiveness
}`;

  const userPrompt = `Analyze the market opportunity for the following startup idea:
Title: ${idea.title}
Domain: ${idea.domain}
Target Region: ${idea.region}
Description: ${idea.description || `${idea.problem} ${idea.solution}`}
Pricing Model: ${idea.pricingModel}`;

  const fallbackFn = () => {
    logCallback("Applying dynamic NLP industry heuristic models...");
    const evaluated = evaluateStartupIdea(idea);

    return {
      industryName: evaluated.industry,
      tamVal: evaluated.tamVal,
      samVal: evaluated.samVal,
      somVal: evaluated.somVal,
      cagr: evaluated.cagr,
      marketStage: evaluated.cagr > 20 ? "Rapid Growth" : "Emerging Scaling",
      marketDrivers: [
        `Accelerating enterprise and consumer adoption of ${evaluated.industry} tools`,
        `High cost and slow legacy turnaround of manual alternative workflows`,
        `Proliferation of real-time cloud data pipelines and automated intelligence`
      ],
      macroTailwinds: [
        `Favorable regulatory incentives and digital infrastructure expansion in ${idea.region || "target markets"}`,
        `Rising labor and operational overhead forcing efficiency gains`
      ],
      keyRisks: [
        `Initial customer onboarding friction and behavioral change resistance`,
        `Potential margin compression from underlying infrastructure costs`
      ],
      opportunityScore: evaluated.marketOpportunityScore
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
