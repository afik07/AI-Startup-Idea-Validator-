// Agent 6: MVP Feature Recommendation Agent (MoSCoW Framework)
import { callOpenRouter } from "./openRouterClient.js";
import { createCanonicalStartupContext } from "./canonicalContext.js";

export async function runMvpRecommendationAgent({ idea, customerData, competitorData, options, logCallback }) {
  const ctx = idea?.startup_name ? idea : createCanonicalStartupContext(idea);

  logCallback(`Deriving tailored MoSCoW MVP Feature Blueprint for "${ctx.startup_name}"...`);

  const systemPrompt = `You are a Principal Product Manager & Technical Architect.
Analyze the canonical startup context and derive a lean, actionable MVP Feature Prioritization Blueprint using the MoSCoW Framework (Must Have, Should Have, Could Have, Won't Have).

MANDATORY RULES:
1. Features MUST be derived directly from:
   Problem: ${ctx.problem_statement}
   Solution: ${ctx.solution}
   Target Customers: ${ctx.target_customers.join(", ")}
   Key Features: ${ctx.key_features.join(", ")}
2. Do NOT recommend generic features such as "exportable audit reports", "custom prompt libraries", or "generic Slack integrations" unless they are central to this specific startup.
3. Every feature must have a user story explaining direct value to ${ctx.target_customers[0] || "the user"}.

Return JSON ONLY matching this schema:
{
  "mvpOverview": "string",
  "recommendedLaunchWeeks": number,
  "moscowFeatures": {
    "mustHave": [
      {
        "featureName": "string",
        "userStory": "string",
        "impact": "Critical" | "High",
        "effort": "Low" | "Medium" | "High"
      }
    ],
    "shouldHave": [
      {
        "featureName": "string",
        "userStory": "string",
        "impact": "High" | "Medium",
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
  "architectureAdvice": ["string"],
  "confidence": {
    "level": "High" | "Medium" | "Low",
    "reason": "string"
  }
}`;

  const userPrompt = `Generate MVP MoSCoW roadmap for:
Startup: ${ctx.startup_name}
Industry: ${ctx.industry}
Problem: ${ctx.problem_statement}
Solution: ${ctx.solution}
Key Features: ${ctx.key_features.join(", ")}
Target Customers: ${ctx.target_customers.join(", ")}`;

  const fallbackFn = () => {
    logCallback("Constructing startup-specific MoSCoW feature specification...");

    const fullText = `${ctx.startup_name} ${ctx.industry} ${ctx.problem_statement} ${ctx.solution}`.toLowerCase();
    let moscowFeatures = {};

    // A. Food Waste & Commercial Kitchen Demand Forecasting (WasteWise AI)
    if (/food waste|restaurant|kitchen|food demand/i.test(fullText)) {
      moscowFeatures = {
        mustHave: [
          {
            featureName: "Historical Sales & Inventory Data Ingestion",
            userStory: `As a kitchen manager, I want to upload past sales and food usage records so the model can learn our consumption patterns.`,
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: "Daily AI Food Demand Forecasting",
            userStory: "As a head chef, I want daily item-level prep recommendations so we prepare the right amount of perishable food without overproducing.",
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: "Perishable Inventory & Spoilage Alerting",
            userStory: "As a restaurant operator, I want automated warnings when ingredients approach expiration so we can prioritize them on the menu.",
            impact: "Critical",
            effort: "Low"
          },
          {
            featureName: "Kitchen Waste Tracking & Analytics Dashboard",
            userStory: "As a restaurant owner, I want a visual dashboard showing daily food waste metrics and estimated financial loss recovery.",
            impact: "High",
            effort: "Low"
          }
        ],
        shouldHave: [
          {
            featureName: "POS & Inventory Management Integration (Toast/Square/Lightspeed)",
            userStory: "As an operator, I want real-time POS sync so prep forecasts update automatically after every service shift.",
            impact: "High",
            effort: "Medium"
          },
          {
            featureName: "Weather & Local Event Data Feeds",
            userStory: "As a kitchen planner, I want rain, temperature, and local holiday signals factored into customer foot-traffic projections.",
            impact: "High",
            effort: "Low"
          }
        ],
        couldHave: [
          {
            featureName: "Multi-Location Kitchen Benchmarking",
            userStory: "As a chain director, I want to compare waste efficiency and forecasting accuracy across all regional restaurant branches.",
            impact: "Medium",
            effort: "Medium"
          },
          {
            featureName: "Automated Supplier Purchase Order Recommendations",
            userStory: "As a procurement manager, I want automated purchase order quantities sent to food distributors based on predicted demand.",
            impact: "Medium",
            effort: "High"
          }
        ],
        wontHave: [
          {
            featureName: "Custom Physical IoT Smart Kitchen Scales (v1 Scope)",
            reason: "Focus v1 on pure software forecasting using existing POS data to keep deployment friction and capital expenditure low."
          }
        ]
      };
    }

    // B. Retail Computer Vision Shelf Monitoring (ShelfSense AI)
    else if (/shelf|retail|supermarket|planogram|stock/i.test(fullText)) {
      moscowFeatures = {
        mustHave: [
          {
            featureName: "Real-Time Camera Stream Product & Shelf Ingestion",
            userStory: "As a store manager, I want optical cameras to continuously scan aisles and detect current shelf fill levels.",
            impact: "Critical",
            effort: "High"
          },
          {
            featureName: "Out-of-Stock & Low-Inventory Detection Engine",
            userStory: "As a category manager, I want immediate alerts when high-velocity SKUs are emptied from store shelves.",
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: "Store Staff Mobile Restock Task Dispatch",
            userStory: "As a store associate, I want a mobile notification with the exact aisle and SKU location to quickly replenish empty shelves.",
            impact: "Critical",
            effort: "Low"
          },
          {
            featureName: "Historical Stockout Revenue Loss Dashboard",
            userStory: "As a retail executive, I want weekly reports quantifying lost sales revenue caused by empty shelves.",
            impact: "High",
            effort: "Low"
          }
        ],
        shouldHave: [
          {
            featureName: "Planogram Compliance & Misplaced Item Detection",
            userStory: "As a visual merchandiser, I want to detect when items are stocked in incorrect locations or facing backwards.",
            impact: "High",
            effort: "Medium"
          },
          {
            featureName: "Handheld Barcode Scanner & Backroom Inventory Sync",
            userStory: "As an inventory clerk, I want shelf alerts linked to backroom inventory counts to verify if restock stock is on hand.",
            impact: "High",
            effort: "Medium"
          }
        ],
        couldHave: [
          {
            featureName: "Autonomous Robotic Scanner Integration (Tally/Simbe)",
            userStory: "As an enterprise retailer, I want automated mobile robots to conduct after-hours store wide inventory audits.",
            impact: "Medium",
            effort: "High"
          }
        ],
        wontHave: [
          {
            featureName: "Autonomous In-Aisle Robotic Restocking (v1 Scope)",
            reason: "Physical robotics manipulation is cost-prohibitive for MVP; focus strictly on vision detection and associate mobile alerts."
          }
        ]
      };
    }

    // C. Clinical Appointment Scheduling & No-Show Prediction (ClinicFlow AI)
    else if (/clinic|appointment|no-show|scheduling|patient|medical/i.test(fullText)) {
      moscowFeatures = {
        mustHave: [
          {
            featureName: "Predictive Patient No-Show Risk Scoring Engine",
            userStory: "As a practice manager, I want historical patient attendance analyzed so high-risk no-shows are flagged in advance.",
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: "Automated 2-Way SMS & WhatsApp Confirmation Dispatch",
            userStory: "As a clinic receptionist, I want automated conversational reminders sent to patients allowing 1-tap confirm or reschedule.",
            impact: "Critical",
            effort: "Low"
          },
          {
            featureName: "Smart Waitlist Auto-Filling & Cancellation Backfill",
            userStory: "As a physician, I want cancelled appointment slots automatically offered to standby patients to eliminate idle clinic time.",
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: "EHR / Practice Calendar Bidirectional Sync",
            userStory: "As a clinic administrator, I want appointment confirmations and cancellations updated live in our existing EHR schedule.",
            impact: "High",
            effort: "Medium"
          }
        ],
        shouldHave: [
          {
            featureName: "Multi-Provider Schedule Utilization Dashboard",
            userStory: "As a clinical director, I want visibility into provider chair-time efficiency and recovered appointment revenue.",
            impact: "High",
            effort: "Low"
          },
          {
            featureName: "Automated Digital Pre-Visit Intake Link",
            userStory: "As a nurse, I want patients to complete medical history and insurance forms on their phone prior to arrival.",
            impact: "Medium",
            effort: "Low"
          }
        ],
        couldHave: [
          {
            featureName: "Patient Transportation & Ride Booking Integration",
            userStory: "As a patient coordinator, I want patients with mobility barriers to have automated Uber Health ride booking.",
            impact: "Medium",
            effort: "Medium"
          }
        ],
        wontHave: [
          {
            featureName: "Autonomous Clinical Diagnosis or Triage (v1 Scope)",
            reason: "Maintain pure focus on administrative scheduling and no-show reduction to avoid complex FDA medical device regulations."
          }
        ]
      };
    }

    // D. Enterprise AI Security / Sidecar Proxy (PatchGuard AI)
    else if (/security|guardrail|injection|firewall|proxy|sidecar/i.test(fullText)) {
      moscowFeatures = {
        mustHave: [
          {
            featureName: "Sub-15ms Real-Time Token Interception Proxy",
            userStory: "As an AI engineer, I want all LLM inputs and outputs inspected with negligible latency overhead.",
            impact: "Critical",
            effort: "High"
          },
          {
            featureName: "Runtime Prompt Injection & Jailbreak Defense Engine",
            userStory: "As a security lead, I want adversarial system prompt attacks and jailbreaks blocked before reaching foundational models.",
            impact: "Critical",
            effort: "High"
          },
          {
            featureName: "Automated PII Masking & Sensitive Data Redaction",
            userStory: "As a compliance officer, I want SSNs, credit cards, and confidential enterprise keys automatically masked in streaming tokens.",
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: "API Budget Limiter & Rogue Agent Loop Termination",
            userStory: "As an infrastructure manager, I want runaway autonomous agent execution loops killed immediately when spending thresholds are breached.",
            impact: "High",
            effort: "Low"
          }
        ],
        shouldHave: [
          {
            featureName: "Continuous Synthetic Red-Teaming Simulation Sandbox",
            userStory: "As an app developer, I want new system prompts automatically stress-tested against thousands of synthetic attacks before production release.",
            impact: "High",
            effort: "Medium"
          },
          {
            featureName: "Live Threat Telemetry & SIEM / Datadog Integration",
            userStory: "As a SOC analyst, I want real-time prompt injection incidents streamed into our enterprise security monitoring dashboard.",
            impact: "High",
            effort: "Medium"
          }
        ],
        couldHave: [
          {
            featureName: "Automated Jailbreak Dataset Export & Model Fine-Tuning",
            userStory: "As an ML researcher, I want blocked attack vectors formatted into training datasets to fine-tune internal defenses.",
            impact: "Medium",
            effort: "Medium"
          }
        ],
        wontHave: [
          {
            featureName: "Full Endpoint Device Antivirus Protection (v1 Scope)",
            reason: "Keep focus strictly on LLM runtime proxy and autonomous agent guardrails rather than generic enterprise endpoint protection."
          }
        ]
      };
    }

    // E. Universal Contextual Fallback
    else {
      moscowFeatures = {
        mustHave: [
          {
            featureName: `Core ${ctx.key_features[0] || "Automated Workflow"} Engine`,
            userStory: `As a ${ctx.target_customers[0] || "user"}, I want to solve ${ctx.problem_statement.slice(0, 50)} automatically with minimal manual setup.`,
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: `Real-Time Data Ingestion & Integration Layer`,
            userStory: `As an operator, I want to connect our existing data sources to receive instant operational insights.`,
            impact: "Critical",
            effort: "Medium"
          },
          {
            featureName: `Operator Decision Dashboard & Actionable Alerts`,
            userStory: `As a decision-maker, I want clear recommendations and alerts so our team can act immediately.`,
            impact: "High",
            effort: "Low"
          }
        ],
        shouldHave: [
          {
            featureName: `Standard API Webhooks & Export Connectors`,
            userStory: `As a technical administrator, I want automated data syncing with our primary operational tools.`,
            impact: "High",
            effort: "Low"
          }
        ],
        couldHave: [
          {
            featureName: `Advanced Predictive Multi-Variable Modeling`,
            userStory: `As an analyst, I want granular historical trend forecasting across multi-period cohorts.`,
            impact: "Medium",
            effort: "Medium"
          }
        ],
        wontHave: [
          {
            featureName: "Custom On-Premise Enterprise Appliance Build (v1 Scope)",
            reason: "Launch initially on standard cloud multi-tenant architecture to accelerate time to market."
          }
        ]
      };
    }

    return {
      mvpOverview: `Focus v1 strictly on solving "${ctx.problem_statement.slice(0, 65)}" with a rapid, low-friction deployment before adding multi-location enterprise complexity.`,
      recommendedLaunchWeeks: ctx.technology.some(t => t.includes("Vision") || t.includes("Hardware")) ? 8 : 6,
      moscowFeatures: moscowFeatures,
      architectureAdvice: [
        `Prioritize serverless microservices for the core ${ctx.key_features[0] || "processing"} engine to ensure low idle operating costs.`,
        `Build modular API adapters so integrations with prevailing ${ctx.industry} software platforms can be added incrementally.`,
        `Implement end-to-end data encryption and audit logging to satisfy early customer security reviews.`
      ],
      confidence: {
        level: "High",
        reason: `MoSCoW features derived directly from ${ctx.startup_name}'s problem-solution architecture and target user requirements.`
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

  logCallback(`MVP Agent complete. Launch estimate: ${result.recommendedLaunchWeeks || 6} weeks.`);
  return result;
}
