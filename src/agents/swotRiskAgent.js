// Milestone 3 - Agent 5: SWOT & Risk Analysis Agent
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";

export async function runSwotRiskAgent({ idea, marketData, customerData, competitorData, options, logCallback }) {
  logCallback("Evaluating structured SWOT Matrix and calculating multi-dimensional Risk Metrics...");

  const systemPrompt = `You are a Venture Capital Risk Management Specialist & Strategic Analyst.
Your task is to generate a comprehensive 2x2 SWOT Matrix (Strengths, Weaknesses, Opportunities, Threats) and calculate structured risk scores across 4 key categories: Competitor Risk, Market Demand Risk, Regulatory Risk, and Technical Execution Risk.

Return JSON ONLY matching this schema:
{
  "swot": {
    "strengths": [
      { "title": "string", "description": "string" }
    ],
    "weaknesses": [
      { "title": "string", "description": "string" }
    ],
    "opportunities": [
      { "title": "string", "description": "string" }
    ],
    "threats": [
      { "title": "string", "description": "string" }
    ]
  },
  "riskScores": {
    "competitorRisk": number, // 0-100 risk score
    "marketDemandRisk": number, // 0-100 risk score
    "regulatoryRisk": number, // 0-100 risk score
    "executionRisk": number, // 0-100 risk score
    "overallRiskIndex": number // 0-100 average risk index
  },
  "riskMitigations": [
    {
      "category": "Competitor" | "Market Demand" | "Regulatory" | "Execution",
      "riskFactor": "string",
      "mitigationStrategy": "string"
    }
  ]
}`;

  const userPrompt = `Perform SWOT and Risk Analysis for this startup idea:
Title: ${idea.title}
Domain: ${idea.domain}
Description: ${idea.description || `${idea.problem} ${idea.solution}`}

Market Info: TAM $${marketData.tamVal}B, CAGR ${marketData.cagr}%.
Customer ICP: ${customerData.icpSummary}, WTP: ${customerData.willingnessToPay}.
Competitors Discovered: ${competitorData.competitors?.map((c) => c.name).join(", ")}.`;

  const fallbackFn = () => {
    logCallback("Generating dynamic SWOT & Risk assessment model...");
    const evaluated = evaluateStartupIdea(idea);
    const rivals = competitorData.competitors || [];
    const mainRival = rivals[0]?.name || "Enterprise Competitor";

    const compRisk = evaluated.hasHardware ? 42 : rivals.length > 2 ? 65 : 48;
    const demandRisk = Math.max(20, 100 - evaluated.validationScore);
    const regRisk = evaluated.industry.includes("Health") ? 68 : evaluated.industry.includes("FinTech") ? 62 : 32;
    const execRisk = evaluated.hasHardware ? 55 : 38;
    const overallRisk = Math.round((compRisk + demandRisk + regRisk + execRisk) / 4);

    return {
      swot: {
        strengths: [
          {
            title: `Specialized ${evaluated.industry} Intelligence`,
            description: `Solves acute daily operational friction faster than generic legacy tools like ${mainRival}.`
          },
          {
            title: "Accessible Pricing & Fast Time-to-Value",
            description: "Low-friction self-serve pricing enables rapid pilot adoption without lengthy sales cycles."
          }
        ],
        weaknesses: [
          {
            title: "Early-Stage Brand Awareness",
            description: `Requires disciplined organic marketing to build customer trust against established players like ${mainRival}.`
          },
          {
            title: evaluated.hasHardware ? "Hardware Supply Chain Logistics" : "Dependence on Foundational AI APIs",
            description: evaluated.hasHardware 
              ? "Initial manufacturing lead times and sensor inventory financing."
              : "Relies on cloud LLM gateways for core generative summaries."
          }
        ],
        opportunities: [
          {
            title: "Expansion into Adjacent Vertical Markets",
            description: "Core automation engine can be adapted to neighboring industry workflows with minimal refactoring."
          },
          {
            title: "B2B Partnership & Integration Ecosystems",
            description: "Strategic partnerships with regional co-ops and software suites create strong distribution leverage."
          }
        ],
        threats: [
          {
            title: "Incumbent Feature Parity Copycats",
            description: "Established competitors adding simplified low-cost tiers to block user migration."
          },
          {
            title: "Evolving Regulatory & Data Compliance",
            description: "Emerging data privacy regulations requiring strict audit trails and local data residency."
          }
        ]
      },
      riskScores: {
        competitorRisk: compRisk,
        marketDemandRisk: demandRisk,
        regulatoryRisk: regRisk,
        executionRisk: execRisk,
        overallRiskIndex: overallRisk
      },
      riskMitigations: [
        {
          category: "Competitor",
          riskFactor: "Price undercut by incumbent rivals",
          mitigationStrategy: "Focus on proprietary workflow integrations and superior user experience speed."
        },
        {
          category: "Market Demand",
          riskFactor: "Customer churn due to initial onboarding complexity",
          mitigationStrategy: "Implement 1-click template setup and guided interactive onboarding flows."
        },
        {
          category: "Regulatory",
          riskFactor: "Data privacy & LLM compliance concerns",
          mitigationStrategy: "Offer enterprise zero-data-retention guarantees and local encryption."
        },
        {
          category: "Execution",
          riskFactor: "Feature creep slowing down initial v1 MVP launch",
          mitigationStrategy: "Enforce strict MoSCoW feature prioritization focused purely on core value."
        }
      ]
    };
  };

  const result = await callOpenRouter({
    apiKey: options.openRouterApiKey,
    model: options.model,
    prompt: userPrompt,
    systemPrompt,
    fallbackFn
  });

  logCallback(`SWOT & Risk Agent complete. Overall Risk Index: ${result.riskScores.overallRiskIndex}/100.`);
  return result;
}
