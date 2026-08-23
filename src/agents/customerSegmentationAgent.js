// Agent 2: Customer Segmentation Agent (ICP, Personas & Willingness-To-Pay)
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";

export async function runCustomerSegmentationAgent({ idea, marketData, options, logCallback }) {
  logCallback("Profiling target Ideal Customer Profile (ICP), pain point severity, and buyer personas...");

  const systemPrompt = `You are an expert Startup Product Strategist & User Research Specialist.
Your task is to define the exact Ideal Customer Profile (ICP), quantify customer pain point severity (1-10), assess Willingness to Pay (High/Medium/Low), estimate Average Revenue Per User (ARPU), and identify primary acquisition channels for this venture.
Return JSON ONLY matching this schema:
{
  "icpSummary": "string",
  "painPointSeverity": number, // 1.0 to 10.0
  "willingnessToPay": "High" | "Medium" | "Low",
  "estimatedArpu": "string", // e.g. "$199/mo"
  "primaryPersona": {
    "role": "string",
    "goals": "string",
    "frustrations": "string"
  },
  "secondaryPersona": {
    "role": "string",
    "goals": "string",
    "frustrations": "string"
  },
  "acquisitionChannels": ["string"],
  "customerSegmentScore": number // 0-100 scale rating customer urgency and accessibility
}`;

  const userPrompt = `Analyze the customer base for:
Title: ${idea.title}
Domain: ${idea.domain}
Description: ${idea.description || `${idea.problem} ${idea.solution}`}
Target Region: ${idea.region}
Pricing: ${idea.pricingModel}`;

  const fallbackFn = () => {
    logCallback("Formulating dynamic customer persona profile...");
    const evaluated = evaluateStartupIdea(idea);
    const painSeverity = parseFloat((Math.min(9.8, Math.max(5.0, (evaluated.validationScore / 10)))).toFixed(1));

    return {
      icpSummary: idea.targetAudience || `${evaluated.industry} Practitioners & Operations Managers`,
      painPointSeverity: painSeverity,
      willingnessToPay: evaluated.validationScore >= 75 ? "High" : evaluated.validationScore >= 55 ? "Medium" : "Low",
      estimatedArpu: idea.pricingModel?.includes("Hardware") ? "$199/mo" : "$49/mo - $199/mo",
      primaryPersona: {
        role: "Lead Operational Manager / Founder",
        goals: `Eliminate operational blind spots, automate repetitive workflows, and increase bottom-line margin.`,
        frustrations: `Current solutions take 2+ weeks, cost $10k+, and fail to deliver real-time actionable intelligence.`
      },
      secondaryPersona: {
        role: "Financial & Procurement Director",
        goals: "Maximize return on capital investment and maintain auditable efficiency metrics.",
        frustrations: "Hidden enterprise setup fees and unproven vendor software integration."
      },
      acquisitionChannels: [
        "Direct founder-led outbound to regional co-ops & industry groups",
        "Targeted B2B LinkedIn ABM & community forum engagement",
        "Product-led growth referral loop and free audit calculators"
      ],
      customerSegmentScore: evaluated.customerWillingnessScore
    };
  };

  const result = await callOpenRouter({
    apiKey: options.openRouterApiKey,
    model: options.model,
    prompt: userPrompt,
    systemPrompt,
    fallbackFn
  });

  logCallback(`Customer Segmentation Agent complete. ICP: ${result.icpSummary}, Pain Severity: ${result.painPointSeverity}/10`);
  return result;
}
