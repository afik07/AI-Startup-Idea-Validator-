// Agent 4: Comparison & Strategy Agent (Rival Comparison Matrix & Final Validation Scorecard)
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";

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
Description: ${idea.description || `${idea.problem} ${idea.solution}`}

Market Summary: TAM $${marketData.tamVal}B, CAGR ${marketData.cagr}%, Score ${marketData.opportunityScore}/100.
Customer Summary: ICP: ${customerData.icpSummary}, Pain Severity: ${customerData.painPointSeverity}/10, WTP: ${customerData.willingnessToPay}.
Competitor Findings: Saturation: ${competitorData.marketSaturation}, Rivals Discovered: ${competitorData.competitors?.map((c) => c.name).join(", ")}.`;

  const fallbackFn = () => {
    logCallback("Calculating dynamic composite score matrix and strategic verdict...");
    const evaluated = evaluateStartupIdea(idea);
    const rivals = competitorData.competitors || [];
    const rivalA = rivals[0]?.name || "Enterprise Competitor A";
    const rivalB = rivals[1]?.name || "Legacy Solution B";

    const computedScore = evaluated.validationScore;
    const verdict = evaluated.verdict;

    return {
      validationScore: computedScore,
      verdict: verdict,
      verdictSummary: `The venture shows ${computedScore >= 80 ? "compelling commercial promise" : computedScore >= 65 ? "moderate viability requiring execution discipline" : "significant market risk"} (${computedScore}/100) based on acute customer pain and clear differentiation against ${rivalA}.`,
      featureMatrix: [
        {
          featureName: evaluated.hasHardware ? "Real-Time Sensor Telemetry" : "Automated AI Intelligence",
          ourCapability: "Strong",
          competitorAScore: "Partial",
          competitorBScore: "None",
          importanceToCustomer: "Critical"
        },
        {
          featureName: "Accessible Micro-Pricing ($19-$199/mo)",
          ourCapability: "Strong",
          competitorAScore: "None",
          competitorBScore: "Partial",
          importanceToCustomer: "Critical"
        },
        {
          featureName: "Instant 5-Minute Setup & Messaging Alerts",
          ourCapability: "Strong",
          competitorAScore: "None",
          competitorBScore: "Partial",
          importanceToCustomer: "High"
        },
        {
          featureName: "Deep Workflow Integration (WhatsApp/API)",
          ourCapability: "Strong",
          competitorAScore: "Partial",
          competitorBScore: "None",
          importanceToCustomer: "High"
        },
        {
          featureName: "Enterprise Custom SLA & Compliance",
          ourCapability: "Planned",
          competitorAScore: "Full",
          competitorBScore: "None",
          importanceToCustomer: "Medium"
        }
      ],
      marketGaps: [
        `Underserved mid-market operators priced out of $10k+ enterprise solutions like ${rivalA}.`,
        "Lack of real-time prescriptive mobile guidance in existing legacy desktop software.",
        "Overly complex manual onboarding requiring specialized consultants."
      ],
      uniqueValueProposition: `The fastest, most accessible AI platform tailored for ${customerData.icpSummary}, delivering immediate ROI at 1/5th the traditional cost.`,
      defensibilityMoat: evaluated.hasHardware ? "High" : evaluated.hasWorkflowLockIn ? "High" : "Medium",
      moatExplanation: evaluated.hasHardware 
        ? "Proprietary telemetry sensor datasets combined with continuous AI training creates a defensible predictive moat."
        : "Deep workflow integration and proprietary user interaction datasets create high switching costs.",
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
