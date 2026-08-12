// Data Models, Presets and Constants for AI Startup Idea Validator

export const SAMPLE_PRESETS = [
  {
    id: "legal-ai",
    title: "AI Legal Document Auditor for Small Law Firms",
    domain: "B2B SaaS / LegalTech",
    region: "North America & Europe",
    description: "An automated AI contract & compliance audit tool tailored for sole practitioners and boutique law firms, performing deep clause verification, risk scoring, and formatting in minutes.",
    targetAudience: "Small law firms, solo attorneys, legal consultants",
    pricingModel: "Subscription ($199/month per seat)"
  },
  {
    id: "nutrition-ai",
    title: "Biomarker-Driven Personalized Nutrition AI",
    domain: "Consumer Health / HealthTech",
    region: "Global",
    description: "A mobile platform that combines blood marker diagnostics, wearable CGM data, and AI hyper-personalization to deliver daily dynamic meal plans and real-time glucose optimization.",
    targetAudience: "Biohackers, diabetics, endurance athletes, health-conscious professionals",
    pricingModel: "Freemium + $29/mo Premium tier"
  },
  {
    id: "kids-code-ai",
    title: "Interactive AI Story-Based Coding Tutor for Kids",
    domain: "EdTech / AI Gaming",
    region: "North America",
    description: "A gamified AI tutor that teaches Python and JavaScript through interactive fantasy quests where kids write code to cast spells and unlock story chapters.",
    targetAudience: "Parents of kids ages 8-14, STEM schools, after-school academies",
    pricingModel: "$15/month family subscription"
  },
  {
    id: "freelancer-invoicing",
    title: "Automated AI Micro-Invoicing & Revenue Recovery",
    domain: "FinTech / Creator Economy",
    region: "Global",
    description: "An intelligent micro-billing agent for freelancers that tracks billable client communication across Slack, Email, and WhatsApp, generating instant payment links and chasing overdue invoices.",
    targetAudience: "Freelancers, agency owners, remote consultants",
    pricingModel: "1.5% transaction fee + $9/mo pro features"
  }
];

export const AVAILABLE_MODELS = [
  { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash (Recommended)", provider: "Google" },
  { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "openai/gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
  { id: "meta-llama/llama-3.3-70b-instruct", name: "Llama 3.3 70B Instruct", provider: "Meta" }
];

export const AGENT_STEPS = {
  MARKET: "market_opportunity",
  CUSTOMER: "customer_segmentation",
  COMPETITOR: "competitor_discovery",
  COMPARISON: "comparison_strategy"
};
