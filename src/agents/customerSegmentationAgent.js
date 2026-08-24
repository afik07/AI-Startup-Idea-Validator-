// Agent 2: Customer Segmentation Agent (ICP, Personas & Willingness-To-Pay)
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";
import { createCanonicalStartupContext } from "./canonicalContext.js";

export async function runCustomerSegmentationAgent({ idea, marketData, options, logCallback }) {
  const ctx = idea?.startup_name ? idea : createCanonicalStartupContext(idea);
  const evaluated = evaluateStartupIdea(ctx);

  logCallback(`Profiling target Ideal Customer Profile (ICP) for "${ctx.startup_name}"...`);

  const systemPrompt = `You are a Senior User Research & Product Strategist.
Define the exact Ideal Customer Profile (ICP), quantify pain severity (1-10), assess Willingness-to-Pay (High/Medium/Low), estimate ARPU, and identify realistic acquisition channels.

MANDATORY RULES:
1. Personas MUST be the actual decision-makers and users for this specific startup (${ctx.target_customers.join(", ")}).
2. Pain points must directly reflect "${ctx.problem_statement}".
3. Channels must be appropriate for this exact buyer (e.g. food-service networks for restaurants; EHR marketplaces for clinics; retail ops events for store managers). Do NOT suggest generic consumer social media or developer forums unless relevant.

Return JSON ONLY matching this schema:
{
  "icpSummary": "string",
  "painPointSeverity": number, // 1.0 to 10.0
  "willingnessToPay": "High" | "Medium" | "Low",
  "estimatedArpu": "string", // e.g. "$299/mo per location"
  "personas": [
    {
      "roleTitle": "string",
      "demographics": "string",
      "corePainPoint": "string",
      "currentWorkaround": "string"
    }
  ],
  "acquisitionChannels": ["string"],
  "customerSegmentScore": number,
  "confidence": {
    "level": "High" | "Medium" | "Low",
    "reason": "string"
  }
}`;

  const userPrompt = `Analyze target customers for:
Startup: ${ctx.startup_name}
Industry: ${ctx.industry}
Problem: ${ctx.problem_statement}
Solution: ${ctx.solution}
Target Customers: ${ctx.target_customers.join(", ")}
Region: ${ctx.target_region}
Pricing Model: ${ctx.pricing_model}`;

  const fallbackFn = () => {
    logCallback("Formulating domain-grounded customer persona profile...");
    const painSeverity = parseFloat((Math.min(9.8, Math.max(6.0, evaluated.subScores.customerPain.score / 10))).toFixed(1));
    const primaryBuyer = ctx.target_customers[0] || "Operations Director";
    const secondaryBuyer = ctx.target_customers[1] || "Finance & Procurement Lead";

    // Domain-Specific Acquisition Channels
    let channels = [];
    const fullText = `${ctx.startup_name} ${ctx.industry} ${ctx.problem_statement}`.toLowerCase();

    if (/food waste|restaurant|kitchen|hospitality/i.test(fullText)) {
      channels = [
        "Direct founder outreach to regional restaurant groups & hotel F&B directors",
        "Partnerships with commercial POS & inventory software vendors (Toast, Square, Oracle Simphony)",
        "Food-service industry associations & culinary sustainability trade expos",
        "Pilot case study distribution demonstrating monthly perishable waste savings"
      ];
    } else if (/retail|shelf|supermarket/i.test(fullText)) {
      channels = [
        "Account-based sales (ABM) targeting VP of Store Operations & Merchandising Directors",
        "Retail technology trade events (NRF Big Show, Groceryshop)",
        "Partnerships with security camera OEMs and retail POS system integrators"
      ];
    } else if (/clinic|appointment|healthcare|doctor/i.test(fullText)) {
      channels = [
        "Direct B2B outreach to independent practice managers and clinic administrators",
        "Integration partnerships with certified Electronic Health Record (EHR) app marketplaces",
        "State medical society conferences and healthcare operations webinars"
      ];
    } else if (/security|guardrail|injection|ciso/i.test(fullText)) {
      channels = [
        "High-intent security engineering communities (OWASP, AI Security Alliance, Discord)",
        "Direct outreach to CISOs & VP of AI Engineering deploying production GenAI",
        "Technical benchmarks and red-teaming vulnerability case studies on GitHub/X"
      ];
    } else {
      channels = [
        `Direct targeted outbound to ${primaryBuyer} via LinkedIn & industry directories`,
        `Value-focused pilot demos highlighting direct recovery of losses caused by ${ctx.problem_statement.slice(0, 40)}`,
        `Industry-specific trade association partnerships and webinars`
      ];
    }

    return {
      icpSummary: `${primaryBuyer} seeking to eliminate ${ctx.problem_statement.slice(0, 65)}`,
      painPointSeverity: painSeverity,
      willingnessToPay: evaluated.validationScore >= 75 ? "High" : "Medium",
      estimatedArpu: ctx.pricing_model.includes("Hardware") ? "$299/location/mo" : ctx.pricing_model.includes("Enterprise") ? "$2,500/mo" : "$149 - $499/mo",
      personas: [
        {
          roleTitle: primaryBuyer,
          demographics: `Experienced operational decision-maker in ${ctx.industry} managing daily workflow throughput.`,
          corePainPoint: `Lacks real-time predictive visibility, resulting in recurring losses from ${ctx.problem_statement.slice(0, 80)}.`,
          currentWorkaround: "Relies on manual spreadsheets, paper logs, and retrospective end-of-month reviews."
        },
        {
          roleTitle: secondaryBuyer,
          demographics: `Financial & Procurement Manager responsible for operating margins and vendor ROI.`,
          corePainPoint: "Frustrated by unbudgeted operational waste and lack of auditable efficiency metrics.",
          currentWorkaround: "Imposes strict manual approval checkpoints that slow down staff execution."
        }
      ],
      acquisitionChannels: channels,
      customerSegmentScore: evaluated.subScores.customerWillingnessToPay.score,
      confidence: {
        level: "High",
        reason: `Target personas and acquisition channels directly mapped to ${ctx.industry} buying authority.`
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

  logCallback(`Customer Segmentation Agent complete. ICP: ${result.icpSummary}, Pain Severity: ${result.painPointSeverity}/10`);
  return result;
}
