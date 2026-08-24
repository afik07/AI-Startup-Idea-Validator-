// Milestone 4: Real Live LLM Startup Co-Pilot Advisor
import { callChatGptLlm } from "./openRouterClient.js";

export async function askStartupAdvisor({ report, chatHistory = [], userQuestion, options = {} }) {
  const { idea, startupContext: rawCtx, market, customer, competitors, comparison, swotRisk, mvp, gtm } = report || {};
  const ctx = rawCtx || idea || {};

  const apiKey = (options.openRouterApiKey || "").trim();

  if (!apiKey) {
    return `### 🔑 Connect Your AI API Key to Chat Live!

To answer your specific question about **"${userQuestion}"** with real, unconstrained AI intelligence, please connect your **Google Gemini** or **OpenRouter** API key.

---

#### 🚀 How to activate real-time AI responses in 10 seconds:
1. Get a **100% Free Google Gemini API Key** at [Google AI Studio (aistudio.google.com)](https://aistudio.google.com/app/apikey) or from [OpenRouter (openrouter.ai/keys)](https://openrouter.ai/keys).
2. Click **"API Keys"** in the top navigation bar.
3. Paste your key and click **"Save & Test Connection"**.

Once connected, I will provide live, intelligent, custom-tailored answers for **${ctx?.startup_name || ctx?.title || "your startup"}** on any topic—including technical architecture, sensor hardware, unit economics, cold outreach playbooks, pitch decks, and investor due diligence!`;
  }

  const startupContext = `
YOU ARE AN EXPERT STARTUP CO-FOUNDER, VENTURE CAPITALIST, AND CTO (GammaVal AI Co-Pilot).
You are having an active, live, conversational pair-programming and business advisory discussion with the founder.

=== COMPLETE CANONICAL STARTUP AUDIT CONTEXT ===
- Startup Name: ${ctx?.startup_name || ctx?.title || "Validated Startup"}
- Domain / Industry: ${ctx?.industry || ctx?.domain || "B2B SaaS / AI Tools"}
- Problem Description: ${ctx?.problem_statement || ctx?.problem || "Operational delays and loss"}
- Solution Description: ${ctx?.solution || "Automated intelligence platform"}
- Founder Name: ${ctx?.founder_name || ctx?.founderName || "Founder"}
- Pricing Model: ${ctx?.pricing_model || ctx?.pricingModel || "Subscription SaaS"}
- Target Region: ${ctx?.target_region || ctx?.region || "Global"}
- Target Customers: ${ctx?.target_customers?.join(", ") || "Target Operators"}
- Key Features: ${ctx?.key_features?.join(", ") || "Core Automation Engine"}

--- FINANCIAL & MARKET DATA ---
- TAM: $${market?.tamVal || 28} Billion (${market?.cagr || 24.1}% CAGR)
- SAM: $${market?.samVal || 6.2} Billion
- SOM: $${market?.somVal || 420} Million
- Market Growth Drivers: ${market?.marketDrivers?.join("; ") || "Automation, digital telemetry, sustainability"}

--- CUSTOMER & UNIT ECONOMICS ---
- Ideal Customer Profile (ICP): ${customer?.icpSummary || "Commercial operators"}
- Pain Severity Score: ${customer?.painPointSeverity || 8.5}/10
- Target ARPU / ACV: ${customer?.estimatedArpu || "$199/mo"}
- Willingness to Pay: ${customer?.willingnessToPay || "High"}
- Acquisition Channels: ${customer?.acquisitionChannels?.join(", ") || "Direct outbound, partnerships"}

--- COMPETITIVE LANDSCAPE & MOATS ---
- Discovered Competitors: ${competitors?.competitors?.map((c) => `${c.name} (${c.type || "Direct"}: ${c.estimatedPricing || "Verified"})`).join(", ") || "Legacy manual processes, enterprise suites"}
- Market Saturation: ${competitors?.marketSaturation || "Moderate"}
- Defensibility Moat: ${comparison?.defensibilityMoat || "High"} (${comparison?.moatExplanation || "Proprietary algorithms and workflow integration"})
- Primary Wedge Gap: "${comparison?.marketGaps?.[0] || "Low-cost real-time automation"}"

--- SWOT & RISK PROFILE ---
- Composite Score: ${comparison?.validationScore || 85}/100 (Verdict: ${comparison?.verdict || "STRONG GO"})
- Strengths: ${swotRisk?.swot?.strengths?.map((s) => s.title).join(", ") || "Real-time AI telemetry"}
- Risk Index: ${swotRisk?.riskScores?.overallRiskIndex || 40}/100

--- MVP SCOPE & GTM PLAN ---
- Recommended Build Time: ${mvp?.recommendedLaunchWeeks || 6} Weeks
- Must-Have Features: ${mvp?.moscowFeatures?.mustHave?.map((m) => m.featureName).join(", ") || "Core Data Engine"}
- Positioning Statement: "${gtm?.positioningStatement || "The premier real-time automated intelligence platform."}"
`;

  const systemPrompt = `${startupContext}

=== INSTRUCTIONS FOR YOUR LIVE CONVERSATIONAL PERSONA ===
1. Answer the user's question directly, accurately, and thoroughly based on ${ctx?.startup_name || ctx?.title}.
2. If they ask about sensors/hardware, provide exact technical component names and explain how they operate.
3. If they ask about budget, tech stacks, marketing, competitors, code, or pitch decks, provide exact numbers, detailed markdown tables, and step-by-step actionable blueprints.
4. Never mention unrelated industries (e.g. do not discuss e-commerce when asked about food waste or clinical scheduling).
5. Always respond with high analytical intelligence and practical domain expertise.`;

  try {
    const fullMessages = [
      ...chatHistory,
      { sender: "user", text: userQuestion }
    ];

    const reply = await callChatGptLlm({
      apiKey,
      model: options.model || "openai/gpt-4o-mini",
      messages: fullMessages,
      systemPrompt
    });

    return reply;
  } catch (err) {
    console.error("Chatbot advisor live LLM error:", err);
    if (err.message === "NO_API_KEY") {
      return `### 🔑 API Key Required
Please connect your Google Gemini or OpenRouter API key in settings to enable live AI responses.`;
    }
    return `### ⚠️ AI Gateway Error: ${err.message}
Please verify your API key in the top settings modal.`;
  }
}
