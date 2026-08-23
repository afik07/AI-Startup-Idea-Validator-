// Milestone 4: Real Live LLM Startup Co-Pilot Advisor
import { callChatGptLlm } from "./openRouterClient.js";

export async function askStartupAdvisor({ report, chatHistory = [], userQuestion, options = {} }) {
  const { idea, market, customer, competitors, comparison, swotRisk, mvp, gtm } = report || {};

  const apiKey = (options.openRouterApiKey || "").trim();

  if (!apiKey) {
    return `### 🔑 Connect Your AI API Key to Chat Live!

To answer your specific question about **"${userQuestion}"** with real, unconstrained AI intelligence, please connect your **Google Gemini** or **OpenRouter** API key.

---

#### 🚀 How to activate real-time AI responses in 10 seconds:
1. Get a **100% Free Google Gemini API Key** at [Google AI Studio (aistudio.google.com)](https://aistudio.google.com/app/apikey) or from [OpenRouter (openrouter.ai/keys)](https://openrouter.ai/keys).
2. Click **"API Keys"** in the top navigation bar (or use the key prompt below).
3. Paste your key and click **"Save & Test Connection"**.

Once connected, I will provide live, intelligent, custom-tailored answers for **${idea?.title || "your startup"}** on any topic—including hardware sensors, tech stacks, financial budgets, cold emails, pitch decks, and investor diligence!`;
  }

  const startupContext = `
YOU ARE AN EXPERT STARTUP CO-FOUNDER, VENTURE CAPITALIST, AND CTO (GammaVal AI Co-Pilot).
You are having an active, live, conversational pair-programming and business advisory discussion with the founder.

=== COMPLETE STARTUP AUDIT CONTEXT ===
- Startup Title: ${idea?.title || "Validated Startup"}
- Domain / Industry: ${idea?.domain || "AgriTech / Precision Farming"}
- Problem Description: ${idea?.problem || idea?.description || "Market friction and operational delays"}
- Solution Description: ${idea?.solution || idea?.description || "Automated intelligence platform"}
- Founder Name: ${idea?.founderName || "Founder"}
- Pricing Model: ${idea?.pricingModel || "Subscription SaaS"}
- Target Region: ${idea?.region || "Global"}

--- FINANCIAL & MARKET DATA ---
- TAM: $${market?.tamVal || 28} Billion (${market?.cagr || 24.1}% CAGR)
- SAM: $${market?.samVal || 6.2} Billion
- SOM: $${market?.somVal || 420} Million
- Market Growth Drivers: ${market?.marketDrivers?.join("; ") || "Automation, digital telemetry, sustainability"}

--- CUSTOMER & UNIT ECONOMICS ---
- Ideal Customer Profile (ICP): ${customer?.icpSummary || "Commercial operators and agribusinesses"}
- Pain Severity Score: ${customer?.painPointSeverity || 8.5}/10
- Target ARPU / ACV: ${customer?.estimatedArpu || "$199/mo"}
- Willingness to Pay: ${customer?.willingnessToPay || "High"}
- Acquisition Channels: ${customer?.acquisitionChannels?.join(", ") || "Direct outbound, partnerships, co-ops"}

--- COMPETITIVE LANDSCAPE & MOATS ---
- Discovered Competitors: ${competitors?.competitors?.map((c) => `${c.name} (${c.estimatedPricing || "$150/mo"})`).join(", ") || "Legacy manual labs, high-cost enterprise suites"}
- Market Saturation: ${competitors?.marketSaturation || "Moderate"}
- Defensibility Moat: ${comparison?.defensibilityMoat || "High"} (${comparison?.moatExplanation || "Proprietary telemetry datasets and workflow integration"})
- Primary Wedge Gap: "${comparison?.marketGaps?.[0] || "Low-cost real-time telemetry for mid-market operators"}"

--- SWOT & RISK PROFILE ---
- Composite Score: ${comparison?.validationScore || 88}/100 (Verdict: ${comparison?.verdict || "STRONG GO"})
- Strengths: ${swotRisk?.swot?.strengths?.map((s) => s.title).join(", ") || "Real-time AI telemetry, 80% lower cost"}
- Risk Index: ${swotRisk?.riskScores?.overallRiskIndex || 42}/100

--- MVP SCOPE & GTM PLAN ---
- Recommended Build Time: ${mvp?.recommendedLaunchWeeks || 6} Weeks
- Must-Have Features: ${mvp?.moscowFeatures?.mustHave?.map((m) => m.featureName).join(", ") || "Sensor telemetry ingestion, automated WhatsApp alert engine"}
- Positioning Statement: "${gtm?.positioningStatement || "The premier real-time automated intelligence platform."}"
`;

  const systemPrompt = `${startupContext}

=== INSTRUCTIONS FOR YOUR LIVE CONVERSATIONAL PERSONA ===
1. Answer the user's question directly, accurately, and thoroughly!
2. If they ask about sensors/hardware (e.g. "Gimme the sensors that must be equipped"), give exact sensor model names (e.g. NPK Modbus RS485 soil sensor, capacitive FDR moisture probe, industrial pH electrode, DS18B20 temperature, ambient light/solar, LoRaWAN / ESP32-S3 IoT transmitter, waterproof IP67 casing) and explain how they work!
3. If they ask about budget, tech stacks, marketing, competitors, code, or pitch decks, provide exact numbers, detailed markdown tables, and step-by-step actionable blueprints.
4. Always respond with high analytical intelligence and practical domain expertise.`;

  try {
    const fullMessages = [
      ...chatHistory,
      { sender: "user", text: userQuestion }
    ];

    const reply = await callChatGptLlm({
      apiKey,
      model: options.model || "google/gemini-2.0-flash-001",
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
