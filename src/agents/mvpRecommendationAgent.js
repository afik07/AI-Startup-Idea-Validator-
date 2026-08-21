// Milestone 3 - Agent 6: MVP Feature Recommendation Agent (MoSCoW Framework)
import { callOpenRouter } from "./openRouterClient.js";

export async function runMvpRecommendationAgent({ idea, customerData, competitorData, options, logCallback }) {
  logCallback("Prioritizing MVP product roadmap features using MoSCoW Framework...");

  const systemPrompt = `You are a Principal Product Manager & Technical Architect.
Your task is to analyze the startup idea and customer pain points to generate an actionable MVP Feature Prioritization Blueprint using the MoSCoW Framework (Must Have, Should Have, Could Have, Won't Have).

Return JSON ONLY matching this schema:
{
  "mvpOverview": "string",
  "recommendedLaunchWeeks": number, // Estimated time to build MVP in weeks (e.g. 6)
  "moscowFeatures": {
    "mustHave": [
      {
        "featureName": "string",
        "userStory": "string",
        "impact": "High" | "Critical",
        "effort": "Low" | "Medium" | "High"
      }
    ],
    "shouldHave": [
      {
        "featureName": "string",
        "userStory": "string",
        "impact": "Medium" | "High",
        "effort": "Low" | "Medium" | "High"
      }
    ],
    "couldHave": [
      {
        "featureName": "string",
        "userStory": "string",
        "impact": "Medium" | "Low",
        "effort": "Low" | "Medium"
      }
    ],
    "wontHave": [
      {
        "featureName": "string",
        "reason": "string"
      }
    ]
  },
  "architectureAdvice": ["string"]
}`;

  const userPrompt = `Generate MVP MoSCoW Feature Prioritization for:
Idea: ${idea.title}
Domain: ${idea.domain}
Description: ${idea.description}
Customer Pain Point: ${customerData.personas?.[0]?.corePainPoint || customerData.icpSummary}`;

  const fallbackFn = () => {
    logCallback("Generating tailored MoSCoW feature roadmap...");
    return {
      mvpOverview: "Focus v1 exclusively on solving the primary friction point with a 1-click automated workflow before adding complex enterprise bells and whistles.",
      recommendedLaunchWeeks: 6,
      moscowFeatures: {
        mustHave: [
          {
            featureName: "Core AI Workflow Engine",
            userStory: "As a user, I want instant automated analysis of my input data so I save 10+ hours per week.",
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: "1-Click Interactive Dashboard",
            userStory: "As a founder/user, I want clean visual scorecards and metrics so I can digest insights immediately.",
            impact: "Critical",
            effort: "Low"
          },
          {
            featureName: "Exportable Audit Reports (Markdown/JSON)",
            userStory: "As a professional, I want to download report artifacts to share with stakeholders.",
            impact: "High",
            effort: "Low"
          }
        ],
        shouldHave: [
          {
            featureName: "Third-Party Workspace Integrations (Slack/Email)",
            userStory: "As a user, I want automated notifications sent to my daily communication channels.",
            impact: "High",
            effort: "Medium"
          },
          {
            featureName: "Custom User Template Library",
            userStory: "As a user, I want to save reusable analysis prompts for future runs.",
            impact: "Medium",
            effort: "Low"
          }
        ],
        couldHave: [
          {
            featureName: "Multi-User Team Workspace Collaboration",
            userStory: "As a manager, I want to invite team members to review shared audits.",
            impact: "Medium",
            effort: "Medium"
          },
          {
            featureName: "Custom Brand Watermark & Styling",
            userStory: "As an agency, I want custom branded PDF exports.",
            impact: "Low",
            effort: "Low"
          }
        ],
        wontHave: [
          {
            featureName: "Complex Enterprise Single-Sign-On (SSO / SAML)",
            reason: "Out of scope for v1 MVP; targeted at enterprise tiers in Phase 2."
          },
          {
            featureName: "Native Mobile Apps (iOS/Android)",
            reason: "Web app responsive mobile layout is sufficient for launch validation."
          }
        ]
      },
      architectureAdvice: [
        "Use modular micro-services for AI model calls to allow seamless LLM swapping.",
        "Store state client-side or in lightweight DB to maximize speed during initial beta.",
        "Implement event-driven telemetry logging to observe user workflow completion rates."
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

  logCallback(`MVP Feature Agent complete. Prioritized ${result.moscowFeatures.mustHave.length} Must-Have core features.`);
  return result;
}
