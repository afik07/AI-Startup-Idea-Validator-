// Dynamic Startup Intelligence & Quantitative Scoring Engine
// Evaluates real text parameters, domain factors, moats, TAM economics, and risk profiles dynamically

export function evaluateStartupIdea(idea) {
  const title = (idea?.title || "").toLowerCase();
  const desc = ((idea?.description || "") + " " + (idea?.problem || "") + " " + (idea?.solution || "")).toLowerCase();
  const domain = (idea?.domain || "").toLowerCase();
  const region = (idea?.region || "Global").toLowerCase();

  // 1. Detect Core Industry Vertical & Real-World Competitors
  let industry = "B2B SaaS & Operational Intelligence";
  let baseTam = 24.5;
  let baseCagr = 18.2;
  let typicalPricing = "$49/mo - $199/mo";
  let defaultCompetitors = [
    { name: "Enterprise Legacy Suite", estimatedPricing: "$1,200/mo", targetTier: "Global 2000", primaryMoat: "Legacy Lock-in", coreOffer: "Broad enterprise workflow and tracking software." },
    { name: "Point Solution Co", estimatedPricing: "$99/mo", targetTier: "Mid-Market", primaryMoat: "Feature Focus", coreOffer: "Specialized modular operational tools." }
  ];

  // A0. AI Security, LLM Guardrails, Prompt Injection, Agent Firewalls & Observability
  if (
    title.includes("security") ||
    title.includes("guard") ||
    title.includes("patchguard") ||
    desc.includes("prompt injection") ||
    desc.includes("pii leakage") ||
    desc.includes("sidecar") ||
    desc.includes("guardrail") ||
    desc.includes("red-teaming") ||
    desc.includes("red teaming") ||
    desc.includes("ai security") ||
    desc.includes("llm security") ||
    desc.includes("agent security") ||
    desc.includes("firewall") ||
    desc.includes("token cost") ||
    domain.includes("security") ||
    domain.includes("cyber") ||
    domain.includes("guardrail")
  ) {
    industry = "Enterprise AI Security, LLM Guardrails & Autonomous Agent Observability";
    baseTam = 36.8;
    baseCagr = 38.4;
    typicalPricing = "$1,500/mo - $6,000/mo per cluster + token volume tiering";
    defaultCompetitors = [
      {
        name: "Lakera Guard",
        websiteUrl: "https://lakera.ai",
        estimatedPricing: "$2,500/mo Developer / Enterprise Custom",
        targetTier: "Enterprise AI & App Security Teams",
        primaryMoat: "Gandalf Global Threat Intelligence & Real-Time Prompt Firewall",
        coreOffer: "Real-time API gateway detecting jailbreaks, prompt injection, and toxic outputs in sub-50ms."
      },
      {
        name: "Aporia AI Guardrails",
        websiteUrl: "https://aporia.com",
        estimatedPricing: "$1,800/mo + Usage",
        targetTier: "Production GenAI & Financial Services",
        primaryMoat: "Sub-20ms Real-Time Hallucination & PII Interception",
        coreOffer: "Streaming AI proxy providing PII masking, factual verification, and compliance policy enforcement."
      },
      {
        name: "Palo Alto Networks (Prisma AIRM)",
        websiteUrl: "https://paloaltonetworks.com",
        estimatedPricing: "Enterprise Contract ($50k+/yr)",
        targetTier: "Global 2000 & Fortune 500 CISOs",
        primaryMoat: "Enterprise Security Operations Center (SOC) Ecosystem",
        coreOffer: "Full-stack enterprise AI runtime security, model access management, and shadow AI discovery."
      },
      {
        name: "Portkey.ai / Helicone AI Gateway",
        websiteUrl: "https://portkey.ai",
        estimatedPricing: "$99 - $999/mo",
        targetTier: "AI Engineers & Scale-ups",
        primaryMoat: "Multi-Model Fallback & Token Cost Optimization",
        coreOffer: "AI routing control plane with latency monitoring, caching, budgets, and automated retries."
      }
    ];
  }
  // A. Fatigue Monitoring, Worker Safety, Driver Alertness, Wearable Health
  else if (
    title.includes("fatigue") ||
    desc.includes("fatigue") ||
    desc.includes("driver") ||
    desc.includes("sleep") ||
    desc.includes("alertness") ||
    desc.includes("drowsy") ||
    desc.includes("microsleep") ||
    desc.includes("workplace safety") ||
    desc.includes("fleet safety") ||
    desc.includes("wearable") ||
    domain.includes("safety") ||
    domain.includes("fatigue")
  ) {
    industry = "AI Worker & Fleet Safety Telemetry (Fatigue Monitoring)";
    baseTam = 18.5;
    baseCagr = 22.4;
    typicalPricing = "$299 Device + $39/mo SaaS per operator";
    defaultCompetitors = [
      {
        name: "SmartCap Technologies (LifeBand)",
        websiteUrl: "https://smartcaptech.com",
        estimatedPricing: "$1,200/unit + $25/mo",
        targetTier: "Mining, Heavy Industry & Long-Haul Trucking",
        primaryMoat: "Medical-Grade EEG Brainwave Analysis",
        coreOffer: "Headband sensor detecting real-time driver fatigue levels before microsleeps occur."
      },
      {
        name: "Seeing Machines (Guardian System)",
        websiteUrl: "https://seeingmachines.com",
        estimatedPricing: "$2,500/vehicle + Enterprise SaaS",
        targetTier: "Commercial Fleets & Automotive OEMs",
        primaryMoat: "In-Cabin Optical Computer Vision & Eye-Gaze Tracking",
        coreOffer: "Automotive-grade optical driver monitoring tracking eyelid movement, head position, and distractions."
      },
      {
        name: "Optalert (Eagle Wearable)",
        websiteUrl: "https://optalert.com",
        estimatedPricing: "$1,500/unit",
        targetTier: "Aviation, Transport & Logistics Fleets",
        primaryMoat: "Patented Blepharometry (Eyelid Velocity Measurement)",
        coreOffer: "Infrared LED glasses providing continuous early-warning drowsiness risk scores (JDS scale)."
      },
      {
        name: "Samsara AI Fleet Dashcams",
        websiteUrl: "https://samsara.com",
        estimatedPricing: "$35 - $60/vehicle/mo",
        targetTier: "General Logistics & Commercial Fleets",
        primaryMoat: "Unified Telematics & Fleet Cloud Ecosystem",
        coreOffer: "Dual-facing AI dashcams detecting yawning, phone distraction, and lane departures."
      }
    ];
  }
  // B. AgriTech & Precision Agriculture
  else if (domain.includes("agri") || desc.includes("farm") || desc.includes("soil") || desc.includes("crop") || desc.includes("fertilizer")) {
    industry = "AgriTech & Precision Farming IoT";
    baseTam = 28.4;
    baseCagr = 24.1;
    typicalPricing = "$199 Hardware + $29/mo SaaS";
    defaultCompetitors = [
      { name: "John Deere Operations Center", websiteUrl: "https://deere.com", estimatedPricing: "$5,000+ Hardware", targetTier: "Large Commercial Farms", primaryMoat: "OEM Tractor Integration", coreOffer: "Unified farm management ecosystem connected directly to heavy machinery." },
      { name: "Arable Labs", websiteUrl: "https://arable.com", estimatedPricing: "$2,000/probe/yr", targetTier: "Enterprise Agribusiness", primaryMoat: "Microclimate & Canopy Telemetry", coreOffer: "All-in-one in-field weather and plant health monitoring stations." },
      { name: "CropX Soil Intelligence", websiteUrl: "https://cropx.com", estimatedPricing: "$1,500/yr", targetTier: "Mid-Market Growers", primaryMoat: "Adaptive Irrigation Algorithms", coreOffer: "Soil sensors measuring moisture, temperature, and electrical conductivity with automated irrigation." }
    ];
  }
  // C. HealthTech & Clinical Medicine
  else if (domain.includes("health") || desc.includes("patient") || desc.includes("doctor") || desc.includes("medical") || desc.includes("clinic") || desc.includes("biomarker")) {
    industry = "Digital HealthTech & Clinical AI";
    baseTam = 48.0;
    baseCagr = 21.6;
    typicalPricing = "$299/mo - $999/mo per clinic";
    defaultCompetitors = [
      { name: "Epic Systems / MyChart", websiteUrl: "https://epic.com", estimatedPricing: "$50k+ Enterprise", targetTier: "Hospitals & Health Systems", primaryMoat: "EHR Data Monopoly", coreOffer: "Comprehensive electronic health records and clinical workflow management." },
      { name: "Nuance DAX Copilot (Microsoft)", websiteUrl: "https://nuance.com", estimatedPricing: "$450/provider/mo", targetTier: "Practices & Outpatient Clinics", primaryMoat: "Ambient Clinical Voice AI", coreOffer: "Automated clinical ambient documentation listening to doctor-patient conversations." }
    ];
  }
  // D. FinTech, Payments & Invoicing
  else if (domain.includes("fintech") || desc.includes("crypto") || desc.includes("payment") || desc.includes("invoice") || desc.includes("bank") || desc.includes("billing")) {
    industry = "FinTech & Automated Embedded Finance";
    baseTam = 65.0;
    baseCagr = 23.5;
    typicalPricing = "0.5% - 2.5% per transaction + $49/mo";
    defaultCompetitors = [
      { name: "Stripe Billing", websiteUrl: "https://stripe.com", estimatedPricing: "0.5% - 0.8% on recurring", targetTier: "Developers & Digital Businesses", primaryMoat: "Global Payment Infrastructure", coreOffer: "Full-stack subscription billing, invoices, and multi-currency payouts." },
      { name: "Ramp / Brex", websiteUrl: "https://ramp.com", estimatedPricing: "Free / Interchange", targetTier: "Startups & Mid-Market", primaryMoat: "Corporate Card Ecosystem", coreOffer: "Automated expense management, smart corporate cards, and vendor invoice reconciliation." }
    ];
  }
  // E. EdTech & Learning AI
  else if (domain.includes("edtech") || desc.includes("student") || desc.includes("school") || desc.includes("learn") || desc.includes("teacher") || desc.includes("tutor")) {
    industry = "AI EdTech & Personalized Learning";
    baseTam = 16.8;
    baseCagr = 19.4;
    typicalPricing = "$12 - $29/mo per student / $5k per school";
    defaultCompetitors = [
      { name: "Duolingo", websiteUrl: "https://duolingo.com", estimatedPricing: "$7.99/mo", targetTier: "Consumers", primaryMoat: "Gamification & Habit Loops", coreOffer: "Gamified bite-sized language and subject learning with AI practice characters." },
      { name: "Khan Academy (Khanmigo)", websiteUrl: "https://khanacademy.org", estimatedPricing: "$4/mo", targetTier: "K-12 Students & Classrooms", primaryMoat: "Curriculum Trust & Socratic AI", coreOffer: "Socratic AI tutoring co-pilot guiding students through math and science problems." }
    ];
  }
  // F. ClimateTech & Energy
  else if (domain.includes("climate") || desc.includes("carbon") || desc.includes("energy") || desc.includes("solar") || desc.includes("recycle")) {
    industry = "ClimateTech & Sustainability Telemetry";
    baseTam = 32.0;
    baseCagr = 26.8;
    typicalPricing = "$500 - $2,500/mo";
    defaultCompetitors = [
      { name: "Watershed Climate", websiteUrl: "https://watershed.com", estimatedPricing: "$25k/yr", targetTier: "Enterprise Corporations", primaryMoat: "Scope 1-3 Carbon Accounting", coreOffer: "Enterprise carbon accounting software measuring supply chain emissions." },
      { name: "Persefoni", websiteUrl: "https://persefoni.com", estimatedPricing: "$15k/yr", targetTier: "Financial Institutions & Private Equity", primaryMoat: "SEC Compliance Reporting", coreOffer: "Financially audited carbon footprint calculations and ESG disclosure management." }
    ];
  }
  // G. LegalTech & Contracts
  else if (domain.includes("legal") || desc.includes("law") || desc.includes("contract") || desc.includes("attorney") || desc.includes("clause")) {
    industry = "LegalTech & Automated Contract Intelligence";
    baseTam = 22.0;
    baseCagr = 25.3;
    typicalPricing = "$199/mo per attorney seat";
    defaultCompetitors = [
      { name: "Robin AI", websiteUrl: "https://robinai.com", estimatedPricing: "$300/mo", targetTier: "In-House Counsel & Law Firms", primaryMoat: "Anthropic Claude Legal Fine-Tuning", coreOffer: "Contract drafting, review, and redlining assistant powered by legal LLMs." },
      { name: "Ironclad", websiteUrl: "https://ironcladapp.com", estimatedPricing: "$10k+/yr", targetTier: "Mid-Market & Enterprise Legal", primaryMoat: "Contract Lifecycle Management (CLM)", coreOffer: "End-to-end workflow automation for contract execution, signature, and repository." }
    ];
  }

  // 2. Dynamic Text & Moat Analysis
  let qualityScore = 50;

  // Problem Clarity & Specificity
  if (desc.length > 80) qualityScore += 14;
  else if (desc.length > 40) qualityScore += 8;
  else qualityScore -= 10;

  // Real-world Moat Detection
  const hasHardware = desc.includes("sensor") || desc.includes("iot") || desc.includes("hardware") || desc.includes("device") || desc.includes("probe") || desc.includes("wearable") || desc.includes("camera");
  const hasAI = desc.includes("ai") || desc.includes("machine learning") || desc.includes("telemetry") || desc.includes("predictive") || desc.includes("vision") || desc.includes("optical");
  const hasWorkflowLockIn = desc.includes("whatsapp") || desc.includes("slack") || desc.includes("integration") || desc.includes("api") || desc.includes("automated") || desc.includes("fleet");
  const isVagueOrSpam = desc.includes("free money") || desc.includes("magic") || title.length < 3 || desc.length < 15;

  if (hasHardware && hasAI) qualityScore += 16;
  else if (hasAI) qualityScore += 10;
  
  if (hasWorkflowLockIn) qualityScore += 8;
  if (isVagueOrSpam) qualityScore -= 35;

  // Normalize final score between 35 and 94
  const finalValidationScore = Math.max(35, Math.min(94, qualityScore));

  let verdict = "STRONG GO";
  if (finalValidationScore < 50) verdict = "HIGH RISK NO GO";
  else if (finalValidationScore < 70) verdict = "PIVOT RECOMMENDED";
  else if (finalValidationScore < 82) verdict = "PROCEED WITH CAUTION";

  // Dynamic TAM / SAM / SOM
  const tamVal = parseFloat((baseTam * (finalValidationScore / 80)).toFixed(1));
  const samVal = parseFloat((tamVal * 0.24).toFixed(1));
  const somVal = Math.round(samVal * 68);

  return {
    industry,
    tamVal,
    samVal,
    somVal,
    cagr: baseCagr,
    validationScore: finalValidationScore,
    verdict,
    marketOpportunityScore: Math.round(finalValidationScore * 0.95),
    customerWillingnessScore: Math.round(finalValidationScore * 0.92),
    competitiveMoatScore: hasHardware ? 88 : hasWorkflowLockIn ? 78 : 65,
    riskScore: Math.max(25, 100 - finalValidationScore),
    defaultCompetitors,
    hasHardware,
    hasAI,
    hasWorkflowLockIn
  };
}
