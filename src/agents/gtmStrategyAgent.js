// Agent 7: Go-To-Market (GTM) Strategy Agent ("How to get started?")
import { callOpenRouter } from "./openRouterClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";
import { createCanonicalStartupContext } from "./canonicalContext.js";

export async function runGtmStrategyAgent({ idea, customerData, competitorData, options, logCallback }) {
  const ctx = idea?.startup_name ? idea : createCanonicalStartupContext(idea);
  const evaluated = evaluateStartupIdea(ctx);

  logCallback(`Generating tailored Go-To-Market launch strategy and customer acquisition roadmap for "${ctx.startup_name}"...`);

  const primaryTarget = ctx.target_customers[0] || "Target Operators";
  const rivals = competitorData?.competitors || evaluated.defaultCompetitors;
  const mainRival = rivals[0]?.name || "Legacy Incumbents";

  const systemPrompt = `You are a Principal Go-To-Market (GTM) & Growth Marketing Strategist.
Formulate a practical, domain-specific Go-To-Market playbook for ${ctx.startup_name} targeting ${primaryTarget}.

MANDATORY RULES:
1. Channels must be appropriate for this exact buyer (e.g. food-service networks for restaurant kitchens; EHR marketplaces for clinical practices; retail trade shows for store managers). Do NOT automatically suggest Product Hunt, Hacker News, or generic social media unless the ICP actually uses them.
2. Explain WHY each channel is appropriate.
3. No unsupported claims ("10x efficiency", "instant ROI"). Use qualified language ("designed to reduce", "potentially lowers operational waste", "aims to improve efficiency").
4. Pricing must consider unit economics, target customer, locations, and competitor benchmarks. If competitor pricing is unavailable, state "Competitor pricing was not publicly verified".

Return JSON ONLY matching this schema:
{
  "positioningStatement": "string",
  "first100CustomersPlaybook": "string",
  "primaryChannels": [
    {
      "channelName": "string",
      "tactics": "string",
      "expectedCost": "Low" | "Medium" | "High",
      "whyAppropriate": "string"
    }
  ],
  "pricingOptimization": {
    "recommendedTier": "string",
    "freemiumStrategy": "string",
    "monetizationTrigger": "string",
    "pricingAssumptions": "string",
    "pricingConfidence": "High" | "Medium" | "Low"
  },
  "launchTimeline90Days": [
    {
      "phase": "Month 1: Foundation & Closed Alpha",
      "milestones": ["string"]
    },
    {
      "phase": "Month 2: Public Beta & Community Launch",
      "milestones": ["string"]
    },
    {
      "phase": "Month 3: Monetization & Scale",
      "milestones": ["string"]
    }
  ],
  "confidence": {
    "level": "High" | "Medium" | "Low",
    "reason": "string"
  }
}`;

  const userPrompt = `Generate GTM Launch Strategy for:
Startup: ${ctx.startup_name}
Industry: ${ctx.industry}
Problem: ${ctx.problem_statement}
Solution: ${ctx.solution}
Target Customers: ${ctx.target_customers.join(", ")}
Region: ${ctx.target_region}
Pricing Model: ${ctx.pricing_model}
Competitors: ${rivals.map(r => r.name).join(", ")}`;

  const fallbackFn = () => {
    logCallback("Constructing grounded 90-day commercialization playbook...");

    const fullText = `${ctx.startup_name} ${ctx.industry} ${ctx.problem_statement}`.toLowerCase();
    let channels = [];
    let pricingDetails = {};

    // A. Food Waste & Commercial Kitchen Demand Forecasting (WasteWise AI)
    if (/food waste|restaurant|kitchen|food demand|hospitality/i.test(fullText)) {
      channels = [
        {
          channelName: "Direct Founder Outreach to Regional Restaurant Chains & Hotel F&B Directors",
          tactics: "Initiate direct phone and email outreach to multi-unit restaurant operators offering a 30-day baseline food waste measurement audit.",
          expectedCost: "Low",
          whyAppropriate: "Food-service directors have high operational authority and immediate economic incentive to lower food inventory costs."
        },
        {
          channelName: "POS & Inventory Vendor App Marketplaces (Toast, Square, Lightspeed)",
          tactics: "Build certified app marketplace listings allowing one-click data integration from existing kitchen point-of-sale systems.",
          expectedCost: "Medium",
          whyAppropriate: "Commercial kitchens rely on their POS as the central source of operational truth."
        },
        {
          channelName: "Food-Service Industry Conferences & Sustainability Summits (National Restaurant Association)",
          tactics: "Exhibit at regional restaurant association expos and publish pilot case studies detailing food waste loss reductions.",
          expectedCost: "Medium",
          whyAppropriate: "Culinary decision-makers actively attend trade events to discover commercial equipment and software efficiencies."
        }
      ];

      pricingDetails = {
        recommendedTier: "$199 - $499/location/month SaaS (Tiered by kitchen volume)",
        freemiumStrategy: "Provide a 14-day historical sales audit revealing estimated historical food overproduction losses.",
        monetizationTrigger: "Deploying active daily predictive prep recommendations and real-time inventory alerts.",
        pricingAssumptions: "Assumes average commercial kitchen wastes $2,000–$5,000/mo in perishable inventory; software recovers 3-5x its monthly cost.",
        pricingConfidence: "High"
      };
    }

    // B. Retail Computer Vision Shelf Monitoring (ShelfSense AI)
    else if (/shelf|retail|supermarket|planogram/i.test(fullText)) {
      channels = [
        {
          channelName: "Account-Based Sales (ABM) to VP of Retail Store Operations & Category Directors",
          tactics: "Target regional grocery chains with custom video demonstrations showcasing real-time out-of-stock detection on their actual store layouts.",
          expectedCost: "Medium",
          whyAppropriate: "Store operations executives are directly measured on on-shelf availability and store-level revenue."
        },
        {
          channelName: "Retail Technology & Grocery Trade Shows (NRF Big Show, Groceryshop)",
          tactics: "Deploy live interactive shelf-camera demonstration booths showing instant restock alerts.",
          expectedCost: "High",
          whyAppropriate: "Retail executives use annual trade shows to evaluate and procure enterprise in-store technology."
        },
        {
          channelName: "Partnerships with Security Camera OEMs & Store Network Integrators",
          tactics: "Partner with existing commercial IP camera providers to deploy software over existing in-store camera streams.",
          expectedCost: "Medium",
          whyAppropriate: "Leveraging existing camera hardware eliminates costly on-premise installation hurdles for retailers."
        }
      ];

      pricingDetails = {
        recommendedTier: "$150 - $350/aisle/month or $1,500 - $3,500/store/month",
        freemiumStrategy: "Deploy a single-aisle 30-day proof-of-concept to quantify undetected stockout incidents.",
        monetizationTrigger: "Expanding camera stream monitoring across full store footprint and automated staff dispatch.",
        pricingAssumptions: "Assumes store loses $10k+/mo in out-of-stock merchandise; software costs <20% of recovered revenue.",
        pricingConfidence: "High"
      };
    }

    // C. Clinical Appointment Scheduling & No-Show Prediction (ClinicFlow AI)
    else if (/clinic|appointment|no-show|scheduling|healthcare/i.test(fullText)) {
      channels = [
        {
          channelName: "Direct Outreach to Medical Practice Administrators & Clinic Managers",
          tactics: "Contact outpatient specialty clinics (Dentistry, Orthopedics, Dermatology) offering a free schedule efficiency analysis.",
          expectedCost: "Low",
          whyAppropriate: "Practice managers bear direct responsibility for clinic revenue, provider schedule density, and patient satisfaction."
        },
        {
          channelName: "Certified Electronic Health Record (EHR) App Marketplaces (Epic, Athenahealth, Cerner)",
          tactics: "Publish certified app connectors in EHR marketplaces allowing 1-click patient calendar synchronization.",
          expectedCost: "Medium",
          whyAppropriate: "Medical practices strongly prefer tools that integrate natively with their existing certified clinical software."
        },
        {
          channelName: "State Medical Societies & Healthcare Financial Management Association (HFMA) Events",
          tactics: "Present webinars and sponsor educational sessions demonstrating recovered clinical chair-time revenue.",
          expectedCost: "Medium",
          whyAppropriate: "Medical groups consult professional associations when adopting administrative technology."
        }
      ];

      pricingDetails = {
        recommendedTier: "$149 - $299/provider/month or 15% of recovered appointment revenue",
        freemiumStrategy: "Offer a free 14-day schedule audit predicting no-show probabilities on upcoming calendar bookings.",
        monetizationTrigger: "Automating 2-way patient SMS dispatch and smart waitlist backfilling.",
        pricingAssumptions: "Assumes an empty clinical appointment slot costs $150–$300 in lost provider billing; saving 2 appointments/month covers the software fee.",
        pricingConfidence: "High"
      };
    }

    // D. Enterprise AI Security / Sidecar Proxy (PatchGuard AI)
    else if (/security|guardrail|injection|firewall|proxy|sidecar/i.test(fullText)) {
      channels = [
        {
          channelName: "High-Intent AI Engineering Communities & Open-Source Security Benchmarks",
          tactics: "Publish open-source prompt injection benchmark results, red-teaming datasets, and sub-15ms proxy latency evaluations on GitHub and X.",
          expectedCost: "Low",
          whyAppropriate: "AI engineers and technical security architects evaluate security tools through reproducible technical benchmarks."
        },
        {
          channelName: "Direct Outbound to CISOs & VP of AI Engineering at GenAI Scale-ups",
          tactics: "Target enterprise tech leaders with customized red-teaming reports identifying vulnerabilities in their public AI endpoints.",
          expectedCost: "Medium",
          whyAppropriate: "CISOs require verifiable proof of runtime vulnerability before approving enterprise AI deployment."
        },
        {
          channelName: "Cloud Marketplace Listings (AWS Marketplace, Google Cloud, Azure)",
          tactics: "Enable 1-click sidecar container deployment deployable directly against enterprise cloud budget commitments.",
          expectedCost: "Medium",
          whyAppropriate: "Enterprise procurement is streamlined when software can be billed against existing cloud provider credits."
        }
      ];

      pricingDetails = {
        recommendedTier: "$1,500 - $5,000/month per container cluster + tiered token volume",
        freemiumStrategy: "Free developer tier supporting up to 50,000 tokens/day for local testing and synthetic red-teaming.",
        monetizationTrigger: "Deploying in production container clusters, enforcing PII data masking, and custom compliance reporting.",
        pricingAssumptions: "Enterprise AI security budgets typically allocate 5–10% of total inference compute spend to governance and guardrails.",
        pricingConfidence: "High"
      };
    }

    // E. Universal Contextual Fallback
    else {
      channels = [
        {
          channelName: `Direct Founder Outbound to ${primaryTarget}`,
          tactics: `Direct personalized outreach via LinkedIn and industry databases with custom 60-second video walkthroughs addressing ${ctx.problem_statement.slice(0, 50)}.`,
          expectedCost: "Low",
          whyAppropriate: `Direct founder selling is the highest-converting method to validate value proposition and secure initial design partners.`
        },
        {
          channelName: `Strategic Integration Partnerships within ${ctx.industry}`,
          tactics: `Build certified integrations with existing operational tools used daily by ${primaryTarget}.`,
          expectedCost: "Medium",
          whyAppropriate: `Integrations overcome software adoption friction and create trusted co-marketing distribution.`
        },
        {
          channelName: `Niche Industry Conferences & Professional Association Publications`,
          tactics: `Publish pilot case studies and sponsor targeted webinars demonstrating measurable operational loss reductions.`,
          expectedCost: "Medium",
          whyAppropriate: `Decision-makers in ${ctx.industry} seek evidence-backed solutions during procurement cycles.`
        }
      ];

      pricingDetails = {
        recommendedTier: evaluated.estimatedPricing,
        freemiumStrategy: "Provide a 14-day interactive diagnostic pilot showing immediate operational visibility.",
        monetizationTrigger: `Full access to automated predictive workflows and ongoing real-time operational alerts.`,
        pricingAssumptions: `Priced at a fraction of customer losses caused by ${ctx.problem_statement.slice(0, 40)}; Competitor pricing was not publicly verified.`,
        pricingConfidence: "Medium"
      };
    }

    return {
      positioningStatement: `For ${primaryTarget} struggling with ${ctx.problem_statement.slice(0, 75)}, ${ctx.startup_name} is an automated intelligence platform designed to reduce operational friction and prevent recurring financial losses, unlike slow, complex legacy software.`,
      first100CustomersPlaybook: `Secure first 10 pilot customers via direct founder outreach to ${primaryTarget} in ${ctx.target_region}. Deliver guaranteed time-to-value within 14 days, document before-and-after operational savings, and leverage those case studies to expand across regional industry networks.`,
      primaryChannels: channels,
      pricingOptimization: pricingDetails,
      launchTimeline90Days: [
        {
          phase: "Month 1: Closed Alpha & Design Partners",
          milestones: [
            `Onboard 5 design partner customers in ${ctx.target_region} to test core ${ctx.key_features[0] || "predictive"} workflow.`,
            `Benchmark baseline operational metrics and eliminate onboarding data bottlenecks.`,
            `Validate pilot pricing and finalize core value proposition.`
          ]
        },
        {
          phase: "Month 2: Public Beta & Partner Distribution",
          milestones: [
            `Publish 2 detailed customer case studies showing quantifiable loss reductions.`,
            `Launch integration with primary ${ctx.industry} operational software ecosystem.`,
            `Scale active beta cohort to 25 paying commercial accounts.`
          ]
        },
        {
          phase: "Month 3: Commercial Scaling & Flywheel",
          milestones: [
            `Expand outbound sales cadences to 100+ qualified ${primaryTarget} accounts.`,
            `Launch customer referral loop and automated operational ROI reporting.`,
            `Achieve consistent monthly recurring revenue growth with <2% churn.`
          ]
        }
      ],
      confidence: {
        level: "High",
        reason: `GTM strategy and acquisition playbook specifically customized to ${ctx.industry} purchasing behaviors.`
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

  logCallback(`GTM Strategy Agent complete. Playbook ready for ${primaryTarget}.`);
  return result;
}
