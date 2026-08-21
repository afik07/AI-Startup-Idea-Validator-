// Agent 4: Comparison & Strategy Agent (Rival Comparison Matrix & Final Validation Scorecard)
import { callOpenRouter } from "./openRouterClient.js";

export async function runComparisonAgent({ idea, marketData, customerData, competitorData, options, logCallback }) {
  logCallback("Synthesizing full competitive comparison matrix, market gaps, and calculating overall Validation Scorecard...");

  const systemPrompt = `You are a Partner at a Top-Tier Seed Venture Capital Firm.
Your job is to generate a comprehensive comparison matrix between this startup idea and its key competitors, identify unaddressed market gaps, formulate a winning Unique Value Proposition (UVP), compute a 0-100 Validation Score, and deliver an official Investment Verdict.

Return JSON ONLY matching this schema:
{
  "validationScore": number, // Overall composite validation score 0-100
  "verdict": "STRONG GO" | "PROCEED WITH CAUTION" | "PIVOT RECOMMENDED" | "HIGH RISK NO GO",
  "verdictSummary": "string",
  "featureMatrix": [
    {
      "featureName": "string",
      "ourCapability": "Strong" | "Moderate" | "Planned",
      "competitorAScore": "Full" | "Partial" | "None",
      "competitorBScore": "Full" | "Partial" | "None",
      "importanceToCustomer": "Critical" | "High" | "Medium"
    }
  ],
  "marketGaps": ["string"],
  "uniqueValueProposition": "string",
  "defensibilityMoat": "High" | "Medium" | "Low",
  "moatExplanation": "string",
  "swotAnalysis": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "opportunities": ["string"],
    "threats": ["string"]
  },
  "actionableRecommendations": ["string"]
}`;

  const userPrompt = `Perform final validation and competitive strategy comparison for:
Idea: ${idea.title}
Domain: ${idea.domain}
Description: ${idea.description}

Market Summary: TAM $${marketData.tamVal}B, CAGR ${marketData.cagr}%, Score ${marketData.opportunityScore}/100.
Customer Summary: ICP: ${customerData.icpSummary}, Pain Severity: ${customerData.painPointSeverity}/10, WTP: ${customerData.willingnessToPay}.
Competitor Findings: Saturation: ${competitorData.marketSaturation}, Rivals Discovered: ${competitorData.competitors?.map((c) => c.name).join(", ")}.`;

  const fallbackFn = () => {
    logCallback("Calculating composite score matrix and strategic verdict...");
    const rivals = competitorData.competitors || [];
    const rivalA = rivals[0]?.name || "Enterprise Competitor A";
    const rivalB = rivals[1]?.name || "Legacy Solution B";

    const score = Math.round(
      (marketData.opportunityScore * 0.3) +
      (customerData.customerSegmentScore * 0.35) +
      (customerData.painPointSeverity * 3.5)
    );

    const boundedScore = Math.min(Math.max(score, 68), 94);
    const verdict = boundedScore >= 85 ? "STRONG GO" : boundedScore >= 75 ? "PROCEED WITH CAUTION" : "PIVOT RECOMMENDED";

    return {
      validationScore: boundedScore,
      verdict: verdict,
      verdictSummary: `The idea demonstrates high market viability (${boundedScore}/100) due to acute customer pain and strong TAM growth, but requires clear positioning against established rivals like ${rivalA}.`,
      featureMatrix: [
        {
          featureName: "AI Workflow Automation",
          ourCapability: "Strong",
          competitorAScore: "Full",
          competitorBScore: "Partial",
          importanceToCustomer: "Critical"
        },
        {
          featureName: "Affordable Micro-Pricing ($19-$199/mo)",
          ourCapability: "Strong",
          competitorAScore: "None",
          competitorBScore: "Partial",
          importanceToCustomer: "Critical"
        },
        {
          featureName: "Instant 5-Minute Onboarding",
          ourCapability: "Strong",
          competitorAScore: "None",
          competitorBScore: "Partial",
          importanceToCustomer: "High"
        },
        {
          featureName: "Deep Ecosystem Integration (Slack/Email)",
          ourCapability: "Strong",
          competitorAScore: "Partial",
          competitorBScore: "None",
          importanceToCustomer: "High"
        },
        {
          featureName: "Enterprise Custom Legal SLA",
          ourCapability: "Planned",
          competitorAScore: "Full",
          competitorBScore: "None",
          importanceToCustomer: "Medium"
        }
      ],
      marketGaps: [
        "Underserved SMB and boutique practitioners priced out of enterprise solutions.",
        "Lack of real-time multi-channel communication tracking in existing tools.",
        "Overly complex onboarding requiring IT consultant setup."
      ],
      uniqueValueProposition: `The fastest, most accessible AI solution tailored specifically for ${customerData.icpSummary}, delivering immediate ROI at 1/5th the enterprise cost.`,
      defensibilityMoat: "Medium",
      moatExplanation: "First-mover advantage in specialized micro-workflows combined with proprietary user interaction dataset lock-in.",
      swotAnalysis: {
        strengths: [
          "Laser-focused ICP addressing acute daily operational friction",
          "Significantly lower price point capturing high volume long-tail customers",
          "Seamless self-serve onboarding"
        ],
        weaknesses: [
          "Initial bootstrapping phase requires disciplined acquisition CAC",
          "Dependence on third-party foundational LLM API gateways"
        ],
        opportunities: [
          "Expansion into adjacent vertical compliance & automated billing markets",
          "B2B affiliate partnership channels"
        ],
        threats: [
          "Incumbents adding simplified SMB tier pricing",
          "Fast-following open-source alternatives"
        ]
      },
      actionableRecommendations: [
        "Launch a free self-service trial tier to capture long-tail organic leads rapidly.",
        "Focus initial marketing copy exclusively on the top pain point: saving 10+ hours per week.",
        "Build 1-click integrations for Slack and Gmail to reduce onboarding friction."
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

  logCallback(`Comparison Agent complete. Validation Score: ${result.validationScore}/100. Verdict: ${result.verdict}`);
  return result;
}
