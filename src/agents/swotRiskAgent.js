// Agent 5: SWOT & Risk Analysis Agent
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";
import { createCanonicalStartupContext } from "./canonicalContext.js";

export async function runSwotRiskAgent({ idea, marketData, customerData, competitorData, options, logCallback }) {
  const ctx = idea?.startup_name ? idea : createCanonicalStartupContext(idea);
  const evaluated = evaluateStartupIdea(ctx);

  logCallback(`Conducting domain-specific SWOT and Quantitative Risk Assessment for "${ctx.startup_name}"...`);

  const rivals = competitorData?.competitors || evaluated.defaultCompetitors;
  const mainRival = rivals[0]?.name || "Legacy Incumbents";

  const systemPrompt = `You are a Venture Capital Risk Analyst.
Generate a structured 2x2 SWOT Matrix (Strengths, Weaknesses, Opportunities, Threats) and calculate quantified risk metrics.

MANDATORY RULES:
1. Every SWOT point MUST directly connect to ${ctx.startup_name}, its problem (${ctx.problem_statement}), its product (${ctx.solution}), its customers (${ctx.target_customers.join(", ")}), and industry (${ctx.industry}).
2. Do NOT mention unrelated industries, generic e-commerce, or irrelevant prompt libraries.
3. Every Weakness and Threat must have a practical, realistic mitigation strategy.

Return JSON ONLY matching this schema:
{
  "swot": {
    "strengths": [{ "title": "string", "description": "string" }],
    "weaknesses": [{ "title": "string", "description": "string" }],
    "opportunities": [{ "title": "string", "description": "string" }],
    "threats": [{ "title": "string", "description": "string" }]
  },
  "riskScores": {
    "competitorRisk": number, // 0-100
    "marketDemandRisk": number, // 0-100
    "regulatoryRisk": number, // 0-100
    "executionRisk": number, // 0-100
    "overallRiskIndex": number // 0-100
  },
  "riskMitigations": [
    {
      "category": "Competitor" | "Market Demand" | "Regulatory" | "Execution",
      "riskFactor": "string",
      "mitigationStrategy": "string"
    }
  ],
  "confidence": {
    "level": "High" | "Medium" | "Low",
    "reason": "string"
  }
}`;

  const userPrompt = `Perform SWOT and Risk Analysis for:
Startup: ${ctx.startup_name}
Industry: ${ctx.industry}
Problem Statement: ${ctx.problem_statement}
Solution: ${ctx.solution}
Key Features: ${ctx.key_features.join(", ")}
Target Customers: ${ctx.target_customers.join(", ")}
Competitors: ${rivals.map(r => r.name).join(", ")}`;

  const fallbackFn = () => {
    logCallback("Formulating product-grounded SWOT matrix & risk model...");

    const compRisk = evaluated.subScores.competitiveIntensity.score;
    const demandRisk = 100 - evaluated.subScores.customerPain.score;
    const regRisk = 100 - evaluated.subScores.regulatoryRisk.score;
    const execRisk = 100 - evaluated.subScores.technicalFeasibility.score;
    const overallRisk = Math.round((compRisk + demandRisk + regRisk + execRisk) / 4);

    return {
      swot: {
        strengths: [
          {
            title: `Dedicated ${ctx.industry} Automation`,
            description: `Specifically designed to solve "${ctx.problem_statement.slice(0, 70)}" faster and with lower overhead than legacy tools.`
          },
          {
            title: "Rapid Time-to-Value & Agile Deployment",
            description: `Lightweight digital architecture allows ${ctx.target_customers[0] || "operators"} to onboard in days rather than months.`
          }
        ],
        weaknesses: [
          {
            title: "Early Customer Trust & Case Study Scarcity",
            description: `Requires verifiable production proof-points to convince conservative enterprise buyers to replace established systems like ${mainRival}.`
          },
          {
            title: ctx.technology.some(t => t.includes("Vision") || t.includes("Hardware")) ? "Hardware & Sensor Installation Friction" : "API & Cloud Dependency",
            description: ctx.technology.some(t => t.includes("Vision") || t.includes("Hardware"))
              ? "On-premise device mounting and camera angle calibration require physical coordination."
              : "Ongoing reliance on third-party cloud infrastructure and foundational AI endpoints."
          }
        ],
        opportunities: [
          {
            title: `Expansion Across ${ctx.target_customers[1] || "Adjacent Commercial Tiers"}`,
            description: `Core algorithms can be expanded from initial pilot cohorts into multi-location enterprise chains.`
          },
          {
            title: "Ecosystem Integrations & Data Partnerships",
            description: `Pre-built connectors into prevailing industry operational platforms create sticky distribution moats.`
          }
        ],
        threats: [
          {
            title: `Incumbent Fast-Following by ${mainRival}`,
            description: `Established legacy software vendors could introduce basic bundled features to defend their installed base.`
          },
          {
            title: "Operational Inertia & Status Quo Resistance",
            description: "Staff reluctance to alter ingrained manual workflows or adopt new software interfaces."
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
          riskFactor: `Incumbent bundle pricing from players like ${mainRival}`,
          mitigationStrategy: `Maintain hyper-focus on solving "${ctx.problem_statement.slice(0, 50)}" with superior ease-of-use and measurable ROI.`
        },
        {
          category: "Market Demand",
          riskFactor: "Customer hesitation to change daily operational routines",
          mitigationStrategy: "Provide zero-friction automated onboarding with guaranteed pilot performance milestones."
        },
        {
          category: "Execution",
          riskFactor: "Integration bottlenecks with legacy customer databases/APIs",
          mitigationStrategy: "Build robust standard CSV/Excel import fallbacks alongside native automated API webhooks."
        }
      ],
      confidence: {
        level: "High",
        reason: `SWOT quadrants and mitigations strictly aligned with ${ctx.startup_name}'s technical scope and buyer profiles.`
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

  logCallback(`SWOT & Risk Agent complete. Overall Risk Index: ${result.riskScores?.overallRiskIndex || 38}/100`);
  return result;
}
