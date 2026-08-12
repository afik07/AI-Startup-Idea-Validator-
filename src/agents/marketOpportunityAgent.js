// Agent 1: Market Opportunity Agent (Industry & Addressable Market Evaluation)
import { callOpenRouter } from "./openRouterClient";

export async function runMarketOpportunityAgent({ idea, options, logCallback }) {
  logCallback("Evaluating global & regional industry metrics (TAM, SAM, SOM)...");
  
  const systemPrompt = `You are an expert Venture Capital Industry Analyst & Market Researcher. 
Your role is to rigorously evaluate market size, growth velocity (CAGR), TAM/SAM/SOM addressable metrics, macro trends, and market tailwinds for a startup idea.
Return JSON ONLY matching this schema:
{
  "industryName": "string",
  "tamVal": number, // TAM in Billions USD (e.g. 14.5)
  "samVal": number, // SAM in Billions USD (e.g. 3.2)
  "somVal": number, // SOM in Millions USD (e.g. 150)
  "cagr": number, // Compound Annual Growth Rate % (e.g. 18.4)
  "marketStage": "Emerging" | "Rapid Growth" | "Mature" | "Consolidating",
  "marketDrivers": ["string"],
  "macroTailwinds": ["string"],
  "keyRisks": ["string"],
  "opportunityScore": number // 0-100 scale rating market attractiveness
}`;

  const userPrompt = `Analyze the market opportunity for the following startup idea:
Title: ${idea.title}
Domain: ${idea.domain}
Target Region: ${idea.region}
Description: ${idea.description}
Pricing Model: ${idea.pricingModel}`;

  const fallbackFn = () => {
    logCallback("Applying domain-specific heuristic market models...");
    const domainLower = idea.domain.toLowerCase();
    
    if (domainLower.includes("legal") || domainLower.includes("b2b")) {
      return {
        industryName: "B2B SaaS & LegalTech Compliance",
        tamVal: 18.5,
        samVal: 4.2,
        somVal: 120,
        cagr: 21.4,
        marketStage: "Rapid Growth",
        marketDrivers: [
          "Rapid adoption of generative AI in document-intensive industries",
          "Rising legal compliance audits and regulatory complexity",
          "Solo and boutique law firms seeking cost parity with BigLaw"
        ],
        macroTailwinds: [
          "Shift towards fixed-fee legal billing models demanding speed",
          "Remote legal practice collaboration tools expansion"
        ],
        keyRisks: [
          "Data privacy concerns around cloud LLM document processing",
          "Liability risks for erroneous AI legal interpretation"
        ],
        opportunityScore: 84
      };
    } else if (domainLower.includes("health") || domainLower.includes("consumer")) {
      return {
        industryName: "Consumer HealthTech & Personalized Nutrition",
        tamVal: 42.0,
        samVal: 9.8,
        somVal: 280,
        cagr: 16.8,
        marketStage: "Rapid Growth",
        marketDrivers: [
          "Surging consumer demand for preventative metabolic health",
          "Widespread adoption of continuous glucose monitors (CGMs)",
          "Proliferation of affordable direct-to-consumer lab testing"
        ],
        macroTailwinds: [
          "Integration of AI health coaching with consumer wearables",
          "Shift from reactive medicine to proactive longevity"
        ],
        keyRisks: [
          "High user churn typical of consumer fitness apps",
          "Medical device regulatory boundaries (FDA/CE compliance)"
        ],
        opportunityScore: 79
      };
    } else if (domainLower.includes("edtech") || domainLower.includes("kids")) {
      return {
        industryName: "Gamified EdTech & Kids AI Learning",
        tamVal: 12.4,
        samVal: 2.9,
        somVal: 85,
        cagr: 19.2,
        marketStage: "Rapid Growth",
        marketDrivers: [
          "Parental demand for STEM literacy and early coding education",
          "Advancement of interactive conversational AI tutors",
          "Shift toward narrative-driven self-paced gamification"
        ],
        macroTailwinds: [
          "Global shortage of primary school Computer Science educators",
          "Increasing parental budget allocation for extra-curricular Tech skills"
        ],
        keyRisks: [
          "COPPA / GDPR-K child data protection regulations",
          "Maintaining child engagement beyond initial novelty"
        ],
        opportunityScore: 81
      };
    } else {
      return {
        industryName: "FinTech & Creator Economy Micro-Payments",
        tamVal: 28.0,
        samVal: 6.5,
        somVal: 190,
        cagr: 24.1,
        marketStage: "Rapid Growth",
        marketDrivers: [
          "Explosive growth of independent freelancers & gig economy workers",
          "High revenue leakage from unbilled informal micro-tasks",
          "Demand for instant cross-border billing and automation"
        ],
        macroTailwinds: [
          "Open Banking API adoption and real-time payment rails",
          "Multi-channel client communication sprawl (Slack, WhatsApp, Email)"
        ],
        keyRisks: [
          "Low fee margins requiring large scale distribution",
          "Platform lock-in from traditional accounting suites (QuickBooks)"
        ],
        opportunityScore: 86
      };
    }
  };

  const result = await callOpenRouter({
    apiKey: options.openRouterApiKey,
    model: options.model,
    prompt: userPrompt,
    systemPrompt,
    fallbackFn
  });

  logCallback(`Market Opportunity Agent complete. TAM: $${result.tamVal}B, CAGR: ${result.cagr}%`);
  return result;
}
