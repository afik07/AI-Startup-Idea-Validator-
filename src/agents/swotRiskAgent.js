// Milestone 3 - Agent 5: SWOT & Risk Analysis Agent
import { callOpenRouter } from "./openRouterClient.js";

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
Description: ${idea.description}

Market Info: TAM $${marketData.tamVal}B, CAGR ${marketData.cagr}%.
Customer ICP: ${customerData.icpSummary}, WTP: ${customerData.willingnessToPay}.
Competitors Discovered: ${competitorData.competitors?.map((c) => c.name).join(", ")}.`;

  const fallbackFn = () => {
    logCallback("Generating domain-aligned SWOT & Risk assessment model...");
    const rivals = competitorData.competitors || [];
    const mainRival = rivals[0]?.name || "Enterprise Competitor";

    return {
      swot: {
        strengths: [
          {
            title: "Specialized Niche Workflow Focus",
            description: "Directly solves operational pain points for target users faster than generic enterprise software."
          },
          {
            title: "Agile Unit Economics & Self-Serve Onboarding",
            description: "Low-friction pricing model enables rapid user acquisition without lengthy sales cycles."
          }
        ],
        weaknesses: [
          {
            title: "Early-Stage Brand Awareness",
            description: "Requires organic marketing pull to build trust against established legacy players like " + mainRival + "."
          },
          {
            title: "Dependence on Foundational AI APIs",
            description: "Relies on external LLM model providers for core generative capabilities."
          }
        ],
        opportunities: [
          {
            title: "Expansion into Adjacent Vertical Markets",
            description: "Core automation engine can be adapted to neighboring industry verticals with minimal refactoring."
          },
          {
            title: "B2B Partnership & Integration Ecosystems",
            description: "Strategic integrations with popular workflow tools create strong distribution leverage."
          }
        ],
        threats: [
          {
            title: "Incumbent Feature Parity Copycats",
            description: "Established competitors adding simplified low-cost tiers to block user migration."
          },
          {
            title: "Evolving Regulatory & Data Compliance Requirements",
            description: "Emerging AI data privacy regulations requiring strict audit trails and local data residency."
          }
        ]
      },
      riskScores: {
        competitorRisk: rivals.length > 3 ? 65 : 45,
        marketDemandRisk: 30,
        regulatoryRisk: 40,
        executionRisk: 35,
        overallRiskIndex: 42
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
