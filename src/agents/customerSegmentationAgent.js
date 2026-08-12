// Agent 2: Customer Segmentation Agent (Consumer & ICP Evaluation)
import { callOpenRouter } from "./openRouterClient";

export async function runCustomerSegmentationAgent({ idea, marketData, options, logCallback }) {
  logCallback("Defining Ideal Customer Profiles (ICPs) and analyzing target segment behavior...");

  const systemPrompt = `You are a Senior Product Strategist & Customer Insights Specialist.
Your task is to identify key target customer segments, construct Ideal Customer Profiles (ICPs), evaluate pain point urgency, and estimate willingness to pay for a startup idea.
Return JSON ONLY matching this schema:
{
  "icpSummary": "string",
  "painPointSeverity": number, // Scale 1 to 10
  "willingnessToPay": "Low" | "Medium" | "High" | "Very High",
  "estimatedArpu": "string", // Average Revenue Per User/Account (e.g. "$150/month")
  "personas": [
    {
      "role": "string", // Persona name/title
      "demographics": "string",
      "corePainPoint": "string",
      "currentWorkaround": "string",
      "buyingTrigger": "string"
    }
  ],
  "acquisitionChannels": ["string"],
  "customerSegmentScore": number // 0-100 score rating customer alignment
}`;

  const userPrompt = `Evaluate the customer segments for this startup idea:
Idea: ${idea.title}
Description: ${idea.description}
Target Audience: ${idea.targetAudience}
Market Context: Industry: ${marketData.industryName}, Growth: ${marketData.cagr}% CAGR.`;

  const fallbackFn = () => {
    logCallback("Generating domain-tailored customer persona insights...");
    const domainLower = idea.domain.toLowerCase();

    if (domainLower.includes("legal") || domainLower.includes("b2b")) {
      return {
        icpSummary: "Solo Practitioners & Boutique Law Firms (1-10 attorneys) lacking dedicated paralegal audit teams.",
        painPointSeverity: 9,
        willingnessToPay: "High",
        estimatedArpu: "$199 - $350 / month",
        personas: [
          {
            role: "Managing Partner at Boutique Law Firm",
            demographics: "40-55 yrs old, 15+ years experience, billable hour rate $350/hr",
            corePainPoint: "Spends 8-12 unpaid hours weekly manually scanning contracts for non-standard indemnity and compliance risks.",
            currentWorkaround: "Manual line-by-line reading or paying expensive freelance junior associates.",
            buyingTrigger: "Near-miss liability error or losing a client contract bid due to audit speed."
          },
          {
            role: "Solo Commercial Attorney",
            demographics: "32-48 yrs old, operates independent practice, tech-savvy",
            corePainPoint: "Inability to take on high-volume contract review jobs without drowning in workload.",
            currentWorkaround: "Turning down large contracts or using generic Word spell-checks.",
            buyingTrigger: "Overwhelmed by backlogged contract reviews during peak client periods."
          }
        ],
        acquisitionChannels: [
          "State Bar Association newsletter sponsorships",
          "LinkedIn ABM (Account-Based Marketing) targeting Legal Practice Management",
          "LegalTech trade conference live demonstrations"
        ],
        customerSegmentScore: 88
      };
    } else if (domainLower.includes("health") || domainLower.includes("consumer")) {
      return {
        icpSummary: "Performance-oriented Biohackers & Individuals with Metabolic Health Goals.",
        painPointSeverity: 8,
        willingnessToPay: "Medium",
        estimatedArpu: "$29 - $49 / month",
        personas: [
          {
            role: "Performance Biohacker & Fitness Enthusiast",
            demographics: "28-45 yrs old, disposable income $80k+, uses Apple Watch / Oura ring",
            corePainPoint: "Generic diets fail to account for daily glucose spikes and personal blood biomarker variances.",
            currentWorkaround: "Manual spreadsheet logging of food intake against wearable metric graphs.",
            buyingTrigger: "Plateau in athletic performance or unexplained fatigue despite strict dieting."
          },
          {
            role: "Pre-Diabetic Health Seeker",
            demographics: "35-60 yrs old, guided by preventive health targets",
            corePainPoint: "Confusing medical lab reports and lack of actionable daily grocery guidelines.",
            currentWorkaround: "Standard nutritionist consultations ($150/session) twice a year.",
            buyingTrigger: "Receiving elevated HbA1c lab results during annual medical physical."
          }
        ],
        acquisitionChannels: [
          "Health & Longevity podcast sponsorships (Huberman, Attia listeners)",
          "Instagram / TikTok influencer unboxing of CGM & blood kits",
          "Strava & Fitness App integration partner channels"
        ],
        customerSegmentScore: 82
      };
    } else if (domainLower.includes("edtech") || domainLower.includes("kids")) {
      return {
        icpSummary: "Tech-Forward Parents (30-48 yrs) seeking high-value STEM education for ages 8-14.",
        painPointSeverity: 7,
        willingnessToPay: "Medium",
        estimatedArpu: "$15 - $25 / month",
        personas: [
          {
            role: "Tech-Forward Parent (Software/Corporate Professional)",
            demographics: "32-46 yrs old, household income $100k+, values screen-time productivity",
            corePainPoint: "Guilt over passive iPad screen time and video game consumption.",
            currentWorkaround: "Enrolling kids in expensive $200/mo in-person coding camps (CodeNinjas).",
            buyingTrigger: "Kid asks how games are built or expresses interest in Roblox/Minecraft modding."
          },
          {
            role: "After-School STEM Program Lead",
            demographics: "28-50 yrs old, runs elementary enrichment programs",
            corePainPoint: "Lack of engaging curriculum that holds kids' attention without heavy teacher intervention.",
            currentWorkaround: "Basic Scratch blocks that kids outgrow within a few weeks.",
            buyingTrigger: "Searching for interactive software to boost program enrollment."
          }
        ],
        acquisitionChannels: [
          "Parenting & Mom-blog micro-influencer reviews",
          "Facebook/Meta ad campaigns targeted at parents interested in STEM",
          "Elementary school PTA partnership discount programs"
        ],
        customerSegmentScore: 79
      };
    } else {
      return {
        icpSummary: "Independent Digital Freelancers, Micro-Agencies & Remote Consultants.",
        painPointSeverity: 9,
        willingnessToPay: "High",
        estimatedArpu: "$19 - $39 / month",
        personas: [
          {
            role: "Freelance Software Developer / Designer",
            demographics: "24-40 yrs old, works across 3-5 clients simultaneously",
            corePainPoint: "Loses $300-$800 monthly in unbilled 'quick favors' discussed on Slack/WhatsApp.",
            currentWorkaround: "Manual end-of-month calendar hunting or Toggl timers they forget to start.",
            buyingTrigger: "Realizing client unpaid scope creep ate into monthly rent/expenses."
          },
          {
            role: "Independent Marketing Consultant",
            demographics: "28-45 yrs old, manages monthly client retainers & ad hoc requests",
            corePainPoint: "Awkwardness in chasing late invoices and tracking micro billable hours.",
            currentWorkaround: "Generic PayPal invoice emails that get ignored.",
            buyingTrigger: "Client invoice goes 30+ days overdue without follow-up."
          }
        ],
        acquisitionChannels: [
          "ProductHunt & HackerNews launch campaigns",
          "Freelancer community forums (Indie Hackers, Reddit /r/freelance)",
          "Integrations in Slack App Directory & Chrome Web Store"
        ],
        customerSegmentScore: 89
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

  logCallback(`Customer Segmentation Agent complete. ICP: ${result.icpSummary.substring(0, 50)}...`);
  return result;
}
