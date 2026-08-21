// Milestone 3 - Agent 7: Go-To-Market (GTM) Strategy Agent ("How to get started?")
import { callOpenRouter } from "./openRouterClient.js";

export async function runGtmStrategyAgent({ idea, customerData, competitorData, options, logCallback }) {
  logCallback("Generating Go-To-Market (GTM) launch roadmap & acquisition playbook...");

  const systemPrompt = `You are a Growth Marketing Director & Startup GTM Strategist.
Your task is to formulate a step-by-step Go-To-Market Strategy for a new startup concept, answering 'How to get started?' with clear positioning, channel tactics, pricing strategy, and a 90-day launch timeline.

Return JSON ONLY matching this schema:
{
  "positioningStatement": "string",
  "first100CustomersPlaybook": "string",
  "primaryChannels": [
    {
      "channelName": "string",
      "tactics": "string",
      "expectedCost": "Low" | "Medium" | "High"
    }
  ],
  "pricingOptimization": {
    "recommendedTier": "string",
    "freemiumStrategy": "string",
    "monetizationTrigger": "string"
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
  ]
}`;

  const userPrompt = `Generate GTM Launch Strategy for:
Idea: ${idea.title}
Domain: ${idea.domain}
Target ICP: ${customerData.icpSummary}
Acquisition Channels: ${customerData.acquisitionChannels?.join(", ")}`;

  const fallbackFn = () => {
    logCallback("Generating actionable 90-day GTM playbook...");
    return {
      positioningStatement: `For ${customerData.icpSummary} who are struggling with manual operational friction, ${idea.title} is the fastest automated AI solution that delivers immediate 10x efficiency, unlike slow legacy software.`,
      first100CustomersPlaybook: "Acquire first 100 beta users via targeted direct outreach on LinkedIn/X, engaging in active niche Reddit/community discussions, and offering free 1-on-1 onboarding audits.",
      primaryChannels: [
        {
          channelName: "Organic Community Marketing (Reddit / IndieHackers / X)",
          tactics: "Share transparent build-in-public metrics, value-first case studies, and free audit templates.",
          expectedCost: "Low"
        },
        {
          channelName: "Targeted Outbound LinkedIn & Micro-Influencer ABM",
          tactics: "Direct message decision makers matching the ICP with tailored 30-second loom videos.",
          expectedCost: "Medium"
        },
        {
          channelName: "ProductHunt & HackerNews Launch Event",
          tactics: "Coordinate a 24-hour launch push with early supporters to capture top daily product badges.",
          expectedCost: "Low"
        }
      ],
      pricingOptimization: {
        recommendedTier: "$29 - $199 / month tier with 14-day free trial",
        freemiumStrategy: "Offer 3 free automated runs per month to allow users to experience instant ROI before upgrading.",
        monetizationTrigger: "Exceeding monthly run limits or exporting custom branded PDF/JSON reports."
      },
      launchTimeline90Days: [
        {
          phase: "Month 1: Foundation & Closed Alpha",
          milestones: [
            "Finalize v1 MVP core feature set with 10 design partner users.",
            "Set up landing page with email waitlist and demo video.",
            "Gather feedback and fix initial user workflow bottlenecks."
          ]
        },
        {
          phase: "Month 2: Public Beta & Community Launch",
          milestones: [
            "Launch publicly on ProductHunt, HackerNews, and niche Subreddits.",
            "Onboard first 100 active beta users.",
            "Publish 3 detailed case studies showing real time/cost savings."
          ]
        },
        {
          phase: "Month 3: Monetization & Scale",
          milestones: [
            "Turn on paid subscription billing with early-bird 20% lifetime discount.",
            "Achieve first $1,000 MRR (Monthly Recurring Revenue).",
            "Launch affiliate partner referral program."
          ]
        }
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

  logCallback("GTM Strategy Agent complete. Formulated 90-day launch roadmap.");
  return result;
}
