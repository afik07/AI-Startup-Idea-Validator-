// Milestone 3 - Agent 8: Conversational Startup Advisor Chatbot Engine (KB Ingestion)
import { callOpenRouter } from "./openRouterClient.js";

export async function askStartupAdvisor({ report, chatHistory, userQuestion, options }) {
  const { idea, market, customer, competitors, comparison, swotRisk, mvp, gtm } = report;

  const knowledgeBaseContext = `
YOU ARE THE CONVERSATIONAL STARTUP ADVISOR (GammaVal AI).
You have full knowledge base context of the validated startup pitch below:

--- STARTUP PROFILE ---
Title: ${idea.title}
Domain: ${idea.domain}
Description: ${idea.description}

--- MARKET FINANCIALS (Market Opportunity Agent) ---
Industry: ${market?.industryName}
TAM: $${market?.tamVal}B | SAM: $${market?.samVal}B | SOM: $${market?.somVal}M | CAGR: ${market?.cagr}%
Stage: ${market?.marketStage}
Drivers: ${market?.marketDrivers?.join("; ")}

--- CUSTOMER SEGMENTATION (Customer Agent) ---
ICP: ${customer?.icpSummary}
Pain Severity: ${customer?.painPointSeverity}/10 | WTP: ${customer?.willingnessToPay} | ARPU: ${customer?.estimatedArpu}
Target Channels: ${customer?.acquisitionChannels?.join(", ")}

--- COMPETITOR DISCOVERY (Tavily Agent) ---
Discovered Rivals: ${competitors?.competitors?.map((c) => c.name + " (" + c.estimatedPricing + ")").join(", ")}
Market Saturation: ${competitors?.marketSaturation}

--- COMPARISON & STRATEGY ---
Validation Score: ${comparison?.validationScore}/100 | Verdict: ${comparison?.verdict}
Unique Value Proposition: ${comparison?.uniqueValueProposition}
Moat: ${comparison?.defensibilityMoat} (${comparison?.moatExplanation})

--- SWOT & RISK ANALYSIS ---
Strengths: ${swotRisk?.swot?.strengths?.map((s) => s.title).join("; ")}
Weaknesses: ${swotRisk?.swot?.weaknesses?.map((w) => w.title).join("; ")}
Overall Risk Index: ${swotRisk?.riskScores?.overallRiskIndex}/100

--- MVP MOSCOW ROADMAP ---
Must Have: ${mvp?.moscowFeatures?.mustHave?.map((m) => m.featureName).join("; ")}
Launch Estimate: ${mvp?.recommendedLaunchWeeks} Weeks

--- GTM LAUNCH STRATEGY ---
Positioning: ${gtm?.positioningStatement}
First 100 Customers: ${gtm?.first100CustomersPlaybook}
`;

  const systemPrompt = `${knowledgeBaseContext}

INSTRUCTIONS FOR THE ADVISOR:
1. Provide concise, highly strategic, actionable VC-level advice.
2. Directly reference specific details from the knowledge base above (e.g. TAM numbers, competitor names, MoSCoW features, GTM channels).
3. If the user asks for a pitch deck slide script, cold email template, marketing headline, or competitor objection handling, generate it immediately in clean markdown!`;

  const messagesPrompt = `Previous Conversation History:
${chatHistory.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join("\n")}

USER QUESTION: ${userQuestion}`;

  const fallbackFn = () => {
    const qLower = userQuestion.toLowerCase();

    if (qLower.includes("pitch") || qLower.includes("investor") || qLower.includes("deck")) {
      return {
        answer: `Here is your **Elevator Pitch** tailored to investors:\n\n> "${gtm?.positioningStatement || idea.description}"\n\n**Key Metrics to Highlight:**\n- **Target TAM:** $${market?.tamVal || 15}B growing at ${market?.cagr || 20}% CAGR.\n- **Validation Score:** ${comparison?.validationScore || 85}/100 (${comparison?.verdict || "STRONG GO"}).\n- **Primary Moat:** ${comparison?.defensibilityMoat || "Medium"} Moat — ${comparison?.moatExplanation || "Proprietary workflow speed"}.`
      };
    } else if (qLower.includes("competitor") || qLower.includes("rival") || qLower.includes("compete")) {
      return {
        answer: `Based on Tavily Web Search data, your primary competitors are **${competitors?.competitors?.[0]?.name || "Enterprise rivals"}**.\n\n**Your Competitive Advantage Strategy:**\n1. **Price & Speed:** Offer 1/5th the enterprise cost at ${customer?.estimatedArpu || "$199/mo"}.\n2. **Unaddressed Gap:** Focus on ${comparison?.marketGaps?.[0] || "underserved SMB practitioners"}.\n3. **UVP:** "${comparison?.uniqueValueProposition || "Fastest automated AI audit"}"`
      };
    } else if (qLower.includes("customer") || qLower.includes("acquisition") || qLower.includes("marketing") || qLower.includes("gtm")) {
      return {
        answer: `**GTM Acquisition Playbook for ${idea.title}:**\n\n1. **First 100 Customers:** ${gtm?.first100CustomersPlaybook || "Direct LinkedIn & Reddit community outreach"}.\n2. **Top Channels:** ${customer?.acquisitionChannels?.join(", ") || "Community marketing & LinkedIn ABM"}.\n3. **Freemium Trigger:** ${gtm?.pricingOptimization?.freemiumStrategy || "3 free audit runs per month"}.`
      };
    } else {
      return {
        answer: `Analyzing your validation context for **${idea.title}**...\n\n- **Target ICP:** ${customer?.icpSummary || "Target Users"}\n- **Primary MVP Core:** ${mvp?.moscowFeatures?.mustHave?.[0]?.featureName || "Core AI Engine"}\n- **Recommended Next Step:** Launch closed alpha within ${mvp?.recommendedLaunchWeeks || 6} weeks and target your first 10 design partners.`
      };
    }
  };

  try {
    const res = await callOpenRouter({
      apiKey: options.openRouterApiKey,
      model: options.model,
      prompt: messagesPrompt,
      systemPrompt,
      fallbackFn
    });

    return typeof res === "string" ? res : res.answer || JSON.stringify(res);
  } catch (err) {
    console.error("Chatbot advisor error:", err);
    return fallbackFn().answer;
  }
}
