// Dynamic Startup Intelligence & Universal Quantitative Scoring Engine
// Evaluates any startup idea dynamically across 20+ verticals or via smart NLP context extraction

export function evaluateStartupIdea(idea) {
  const rawTitle = idea?.title || "New Startup Venture";
  const title = rawTitle.toLowerCase();
  const rawProblem = idea?.problem || "";
  const rawSolution = idea?.solution || "";
  const rawDesc = idea?.description || `${rawProblem} ${rawSolution}`;
  const desc = ((idea?.description || "") + " " + rawProblem + " " + rawSolution).toLowerCase();
  const domain = (idea?.domain || "").toLowerCase();
  const region = (idea?.region || "Global").toLowerCase();

  // Extract primary capitalized keyword from title for dynamic fallback naming
  const titleWords = rawTitle.split(/[\s-_]+/).filter(w => w.length > 2 && !["the", "and", "for", "with", "app", "pro"].includes(w.toLowerCase()));
  const primaryKeyword = titleWords[0] || "Venture";
  const secondaryKeyword = titleWords[1] || "Intelligence";

  let industry = "B2B SaaS & Enterprise Workflow Automation";
  let baseTam = 28.5;
  let baseCagr = 21.2;
  let typicalPricing = "$49/mo - $299/mo SaaS";
  let defaultCompetitors = [];

  // =========================================================================
  // 1. DYNAMIC VERTICAL DETECTION & REAL-WORLD COMPETITORS
  // =========================================================================

  // A. AI Startup Idea Validators, Venture Due Diligence & Business Intelligence
  if (
    title.includes("validator") ||
    title.includes("idea") ||
    title.includes("startup") ||
    desc.includes("validate") ||
    desc.includes("validation") ||
    desc.includes("entrepreneur") ||
    desc.includes("loss or profit") ||
    desc.includes("predict profit") ||
    desc.includes("business plan") ||
    desc.includes("pitch deck") ||
    desc.includes("feasibility") ||
    desc.includes("due diligence")
  ) {
    industry = "AI Startup Due Diligence, Venture Feasibility & Market Validation Tools";
    baseTam = 14.8;
    baseCagr = 31.5;
    typicalPricing = "$29 - $99/mo or $49/report";
    defaultCompetitors = [
      {
        name: "DimeADozen.ai",
        websiteUrl: "https://dimeadozen.ai",
        estimatedPricing: "$39/report or $199/mo",
        targetTier: "Early-stage Founders & Accelerators",
        primaryMoat: "Instant 30-Page Market Research Report Generator",
        coreOffer: "AI-driven business idea validation covering competitor research, marketing strategy, and monetization models."
      },
      {
        name: "ValidatorAI",
        websiteUrl: "https://validatorai.com",
        estimatedPricing: "Free / $29/mo Pro",
        targetTier: "Aspiring Entrepreneurs & Indie Hackers",
        primaryMoat: "100,000+ Validated Startup Pitch Dataset",
        coreOffer: "Instant AI mentor critique assessing business viability, customer pain points, and launch roadmaps."
      },
      {
        name: "VenturusAI",
        websiteUrl: "https://venturus.ai",
        estimatedPricing: "$25/mo - $60/mo",
        targetTier: "Founders, Consultants & Angel Investors",
        primaryMoat: "Structured PESTEL & SWOT Analytical Frameworks",
        coreOffer: "Comprehensive business analysis generating revenue model suggestions, risk analysis, and target personas."
      },
      {
        name: "Traditional Venture Mentors & Incubators (Y Combinator Startup School)",
        websiteUrl: "https://startupschool.org",
        estimatedPricing: "Free / 7% Equity (Accelerator)",
        targetTier: "High-Growth Tech Startups",
        primaryMoat: "Global Alumni Network & VC Partner Due Diligence",
        coreOffer: "Manual pitch feedback, partner office hours, and structured peer validation cycles."
      }
    ];
  }

  // B. AI Security, LLM Guardrails, Prompt Injection, Firewalls & Observability
  else if (
    title.includes("security") ||
    title.includes("guard") ||
    title.includes("patchguard") ||
    desc.includes("prompt injection") ||
    desc.includes("pii leakage") ||
    desc.includes("sidecar") ||
    desc.includes("guardrail") ||
    desc.includes("red-teaming") ||
    desc.includes("ai security") ||
    desc.includes("llm security") ||
    desc.includes("agent security") ||
    desc.includes("firewall") ||
    desc.includes("token cost") ||
    domain.includes("security") ||
    domain.includes("cyber")
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

  // C. Fatigue Monitoring, Worker Safety, Driver Alertness, Wearable Health
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
    domain.includes("safety")
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

  // D. AgriTech & Precision Agriculture
  else if (domain.includes("agri") || desc.includes("farm") || desc.includes("soil") || desc.includes("crop") || desc.includes("fertilizer") || desc.includes("drone crop")) {
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

  // E. HealthTech & Clinical Medicine
  else if (domain.includes("health") || desc.includes("patient") || desc.includes("doctor") || desc.includes("medical") || desc.includes("clinic") || desc.includes("biomarker") || desc.includes("hospital")) {
    industry = "Digital HealthTech & Clinical AI";
    baseTam = 48.0;
    baseCagr = 21.6;
    typicalPricing = "$299/mo - $999/mo per clinic";
    defaultCompetitors = [
      { name: "Epic Systems / MyChart", websiteUrl: "https://epic.com", estimatedPricing: "$50k+ Enterprise", targetTier: "Hospitals & Health Systems", primaryMoat: "EHR Data Monopoly", coreOffer: "Comprehensive electronic health records and clinical workflow management." },
      { name: "Nuance DAX Copilot (Microsoft)", websiteUrl: "https://nuance.com", estimatedPricing: "$450/provider/mo", targetTier: "Practices & Outpatient Clinics", primaryMoat: "Ambient Clinical Voice AI", coreOffer: "Automated clinical ambient documentation listening to doctor-patient conversations." },
      { name: "Teladoc Health", websiteUrl: "https://teladoc.com", estimatedPricing: "$75/consult", targetTier: "Patients & Insurers", primaryMoat: "Licensed Physician Telehealth Network", coreOffer: "Virtual care telemedicine platform providing 24/7 on-demand medical consultations." }
    ];
  }

  // F. FinTech, Payments, Crypto & Invoicing
  else if (domain.includes("fintech") || desc.includes("crypto") || desc.includes("payment") || desc.includes("invoice") || desc.includes("bank") || desc.includes("billing") || desc.includes("payroll")) {
    industry = "FinTech & Automated Embedded Finance";
    baseTam = 65.0;
    baseCagr = 23.5;
    typicalPricing = "0.5% - 2.5% per transaction + $49/mo";
    defaultCompetitors = [
      { name: "Stripe Billing", websiteUrl: "https://stripe.com", estimatedPricing: "0.5% - 0.8% on recurring", targetTier: "Developers & Digital Businesses", primaryMoat: "Global Payment Infrastructure", coreOffer: "Full-stack subscription billing, invoices, and multi-currency payouts." },
      { name: "Ramp / Brex", websiteUrl: "https://ramp.com", estimatedPricing: "Free / Interchange", targetTier: "Startups & Mid-Market", primaryMoat: "Corporate Card Ecosystem", coreOffer: "Automated expense management, smart corporate cards, and vendor invoice reconciliation." },
      { name: "Plaid", websiteUrl: "https://plaid.com", estimatedPricing: "API Volume Pricing", targetTier: "Fintech Apps & Banks", primaryMoat: "Universal Bank Account Verification API", coreOffer: "Secure financial data aggregation connecting consumer bank accounts to apps." }
    ];
  }

  // G. EdTech & Learning AI
  else if (domain.includes("edtech") || desc.includes("student") || desc.includes("school") || desc.includes("learn") || desc.includes("teacher") || desc.includes("tutor") || desc.includes("course")) {
    industry = "AI EdTech & Personalized Learning";
    baseTam = 16.8;
    baseCagr = 19.4;
    typicalPricing = "$12 - $29/mo per student / $5k per school";
    defaultCompetitors = [
      { name: "Duolingo", websiteUrl: "https://duolingo.com", estimatedPricing: "$7.99/mo", targetTier: "Consumers", primaryMoat: "Gamification & Habit Loops", coreOffer: "Gamified bite-sized language and subject learning with AI practice characters." },
      { name: "Khan Academy (Khanmigo)", websiteUrl: "https://khanacademy.org", estimatedPricing: "$4/mo", targetTier: "K-12 Students & Classrooms", primaryMoat: "Curriculum Trust & Socratic AI", coreOffer: "Socratic AI tutoring co-pilot guiding students through math and science problems." },
      { name: "Coursera", websiteUrl: "https://coursera.org", estimatedPricing: "$399/yr", targetTier: "Professionals & Universities", primaryMoat: "Accredited University Degree Partnerships", coreOffer: "Online higher education courses and enterprise career upskilling certificates." }
    ];
  }

  // H. ClimateTech, Clean Energy & Carbon
  else if (domain.includes("climate") || desc.includes("carbon") || desc.includes("energy") || desc.includes("solar") || desc.includes("recycle") || desc.includes("sustainability")) {
    industry = "ClimateTech & Sustainability Telemetry";
    baseTam = 32.0;
    baseCagr = 26.8;
    typicalPricing = "$500 - $2,500/mo";
    defaultCompetitors = [
      { name: "Watershed Climate", websiteUrl: "https://watershed.com", estimatedPricing: "$25k/yr", targetTier: "Enterprise Corporations", primaryMoat: "Scope 1-3 Carbon Accounting", coreOffer: "Enterprise carbon accounting software measuring supply chain emissions." },
      { name: "Persefoni", websiteUrl: "https://persefoni.com", estimatedPricing: "$15k/yr", targetTier: "Financial Institutions & Private Equity", primaryMoat: "SEC Compliance Reporting", coreOffer: "Financially audited carbon footprint calculations and ESG disclosure management." }
    ];
  }

  // I. LegalTech & Contracts
  else if (domain.includes("legal") || desc.includes("law") || desc.includes("contract") || desc.includes("attorney") || desc.includes("clause") || desc.includes("compliance")) {
    industry = "LegalTech & Automated Contract Intelligence";
    baseTam = 22.0;
    baseCagr = 25.3;
    typicalPricing = "$199/mo per attorney seat";
    defaultCompetitors = [
      { name: "Robin AI", websiteUrl: "https://robinai.com", estimatedPricing: "$300/mo", targetTier: "In-House Counsel & Law Firms", primaryMoat: "Anthropic Claude Legal Fine-Tuning", coreOffer: "Contract drafting, review, and redlining assistant powered by legal LLMs." },
      { name: "Ironclad", websiteUrl: "https://ironcladapp.com", estimatedPricing: "$10k+/yr", targetTier: "Mid-Market & Enterprise Legal", primaryMoat: "Contract Lifecycle Management (CLM)", coreOffer: "End-to-end workflow automation for contract execution, signature, and repository." }
    ];
  }

  // J. DevTools, APIs & Cloud Infrastructure
  else if (domain.includes("dev") || desc.includes("developer") || desc.includes("api") || desc.includes("backend") || desc.includes("database") || desc.includes("sdk") || desc.includes("cloud")) {
    industry = "Developer Tools, API Platforms & Cloud Infrastructure";
    baseTam = 42.0;
    baseCagr = 27.5;
    typicalPricing = "$29 - $499/mo + usage";
    defaultCompetitors = [
      { name: "Supabase", websiteUrl: "https://supabase.com", estimatedPricing: "Free / $25/mo Pro", targetTier: "Full-Stack Developers", primaryMoat: "Open Source PostgreSQL Ecosystem", coreOffer: "Backend-as-a-service providing real-time database, auth, storage, and edge functions." },
      { name: "Postman", websiteUrl: "https://postman.com", estimatedPricing: "$14/user/mo", targetTier: "API Engineers & Teams", primaryMoat: "Universal API Collaboration Standard", coreOffer: "API development, testing, documentation, and mock server orchestration." },
      { name: "Vercel", websiteUrl: "https://vercel.com", estimatedPricing: "$20/user/mo + usage", targetTier: "Frontend & Next.js Developers", primaryMoat: "Global Edge Network & Framework Integration", coreOffer: "Zero-configuration deployment platform and serverless edge infrastructure." }
    ];
  }

  // K. E-Commerce, D2C & Retail AI
  else if (domain.includes("commerce") || desc.includes("shop") || desc.includes("store") || desc.includes("retail") || desc.includes("cart") || desc.includes("d2c") || desc.includes("brand")) {
    industry = "E-Commerce Infrastructure & D2C Commerce Automation";
    baseTam = 54.0;
    baseCagr = 21.0;
    typicalPricing = "$39 - $399/mo + 1% GMV";
    defaultCompetitors = [
      { name: "Shopify Plus", websiteUrl: "https://shopify.com", estimatedPricing: "$39/mo - $2,000/mo", targetTier: "Independent Merchants & Global Brands", primaryMoat: "Merchant App Store & Checkout Lock-in", coreOffer: "Omnichannel e-commerce storefront, inventory management, and POS ecosystem." },
      { name: "Klaviyo", websiteUrl: "https://klaviyo.com", estimatedPricing: "$45 - $800/mo", targetTier: "D2C E-Commerce Brands", primaryMoat: "Customer Data Platform & Event Trigger Engine", coreOffer: "Automated SMS, email marketing, and predictive customer lifetime value scoring." }
    ];
  }

  // L. Universal NLP Fallback for ANY Other Novel Concept
  else {
    industry = `${rawTitle} Solutions (${domain.includes("saas") ? "B2B SaaS" : "Digital Platform"})`;
    baseTam = 19.5;
    baseCagr = 22.0;
    typicalPricing = "$49/mo - $199/mo";
    defaultCompetitors = [
      {
        name: `${primaryKeyword}Pro Cloud`,
        websiteUrl: "https://example.com/industry-leader",
        estimatedPricing: "$149/mo",
        targetTier: "Commercial & Mid-Market Operators",
        primaryMoat: `Specialized ${secondaryKeyword} Algorithm & Proprietary Data`,
        coreOffer: `Commercial cloud solution offering automated ${rawProblem ? rawProblem.slice(0, 70) : "workflow efficiency"}.`
      },
      {
        name: `Global ${secondaryKeyword} Systems`,
        websiteUrl: "https://example.com/incumbent",
        estimatedPricing: "$850/mo Enterprise",
        targetTier: "Enterprise Corporations & Global Operators",
        primaryMoat: "Established Enterprise Distribution & Legacy Vendor Lock-in",
        coreOffer: `Comprehensive end-to-end software suite handling operational compliance and legacy data pipelines.`
      },
      {
        name: "Manual Workflows & Traditional Excel / Agency Consulting",
        websiteUrl: "https://example.com/manual-alternatives",
        estimatedPricing: "$3,000 - $15,000/project",
        targetTier: "Early Stage Operators & SMBs",
        primaryMoat: "Zero Software Setup / High Custom Touch",
        coreOffer: "Manual bespoke analysis and spreadsheet tracking with high human labor overhead."
      }
    ];
  }

  // =========================================================================
  // 2. DYNAMIC TEXT & MOAT ANALYSIS
  // =========================================================================
  let qualityScore = 52;

  // Problem Clarity & Depth
  if (desc.length > 100) qualityScore += 16;
  else if (desc.length > 40) qualityScore += 10;
  else qualityScore -= 6;

  // Real-world Moat Detection
  const hasHardware = desc.includes("sensor") || desc.includes("iot") || desc.includes("hardware") || desc.includes("device") || desc.includes("probe") || desc.includes("wearable") || desc.includes("camera") || desc.includes("drone");
  const hasAI = desc.includes("ai") || desc.includes("machine learning") || desc.includes("telemetry") || desc.includes("predictive") || desc.includes("vision") || desc.includes("llm") || desc.includes("prompt") || desc.includes("agent") || desc.includes("algorithm");
  const hasWorkflowLockIn = desc.includes("whatsapp") || desc.includes("slack") || desc.includes("integration") || desc.includes("api") || desc.includes("automated") || desc.includes("fleet") || desc.includes("container") || desc.includes("pipeline") || desc.includes("database");
  const isVagueOrSpam = desc.includes("free money") || desc.includes("magic") || title.length < 3 || desc.length < 10;

  if (hasHardware && hasAI) qualityScore += 16;
  else if (hasAI) qualityScore += 10;
  
  if (hasWorkflowLockIn) qualityScore += 8;
  if (isVagueOrSpam) qualityScore -= 30;

  // Normalize final score between 40 and 94
  const finalValidationScore = Math.max(40, Math.min(94, qualityScore));

  let verdict = "STRONG GO";
  if (finalValidationScore < 50) verdict = "HIGH RISK NO GO";
  else if (finalValidationScore < 70) verdict = "PIVOT RECOMMENDED";
  else if (finalValidationScore < 82) verdict = "PROCEED WITH CAUTION";

  // Dynamic TAM / SAM / SOM
  const tamVal = parseFloat((baseTam * (finalValidationScore / 78)).toFixed(1));
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
    competitiveMoatScore: hasHardware ? 88 : hasWorkflowLockIn ? 82 : 72,
    riskScore: Math.max(20, 100 - finalValidationScore),
    defaultCompetitors,
    hasHardware,
    hasAI,
    hasWorkflowLockIn
  };
}
