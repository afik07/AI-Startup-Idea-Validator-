// Canonical Startup Context Generator for GammaVal™ AI
// Extracts, standardizes, and validates the single source of truth for all downstream agents

export function createCanonicalStartupContext(idea) {
  const rawTitle = (idea?.title || idea?.startupName || "Untitled Venture").trim();
  const rawFounder = (idea?.founderName || "Founder").trim();
  const rawDomain = (idea?.domain || idea?.industry || "B2B SaaS / AI Tools").trim();
  const rawRegion = (idea?.region || idea?.targetRegion || "Global").trim();
  const rawPricing = (idea?.pricingModel || "Subscription SaaS").trim();
  const rawProblem = (idea?.problem || idea?.problemStatement || "").trim();
  const rawSolution = (idea?.solution || "").trim();
  const rawDesc = (idea?.description || `${rawProblem} ${rawSolution}`).trim();
  const attachedDoc = idea?.attachedDocument || null;

  // 1. Synthesize Problem & Solution statements with high clarity
  const problemStatement = rawProblem || (rawDesc.length > 0 ? rawDesc : "Manual inefficiencies and unoptimized operational workflows.");
  const solutionStatement = rawSolution || (rawDesc.length > 0 ? rawDesc : `AI-powered intelligent software platform for ${rawDomain}.`);

  // 2. Extract Target Customers (ICP Cohorts)
  const fullText = `${rawTitle} ${rawProblem} ${rawSolution} ${rawDesc} ${rawDomain}`.toLowerCase();
  const targetCustomers = [];

  if (/restaurant|kitchen|chef|hotel|cafeteria|food|catering|hospitality/i.test(fullText)) {
    targetCustomers.push("Independent & Chain Restaurants", "Hotel Food & Beverage Operations", "Institutional & Corporate Cafeterias", "Cloud Kitchens & Food Service Operators");
  } else if (/retail|store|shelf|supermarket|grocer|merchandis|shop/i.test(fullText)) {
    targetCustomers.push("Supermarkets & Grocery Chains", "Big-Box Retail Store Managers", "Convenience Store Operations", "Category & Merchandising Directors");
  } else if (/clinic|doctor|patient|appointment|hospital|health|medical|physician|schedule|no-show/i.test(fullText)) {
    targetCustomers.push("Outpatient Medical Clinics", "Independent Physician Practices", "Dental & Specialty Care Centers", "Hospital Practice Operations Managers");
  } else if (/security|ciso|guardrail|injection|firewall|pii|llm security|red team/i.test(fullText)) {
    targetCustomers.push("Enterprise AI & Machine Learning Teams", "Chief Information Security Officers (CISOs)", "Production GenAI Application Developers", "Cloud Security Operations");
  } else if (/developer|engineer|api|database|devops|backend|code/i.test(fullText)) {
    targetCustomers.push("Backend & Full-Stack Software Engineers", "DevOps & Infrastructure Architects", "Technical Founders & CTOs", "Engineering Team Leads");
  } else if (/farmer|agri|crop|soil|farm|fertiliz|irrigation/i.test(fullText)) {
    targetCustomers.push("Commercial Farm Owners & Growers", "Agribusiness Agronomists", "Precision Farming Co-ops", "Agricultural Equipment Operators");
  } else if (/law|legal|attorney|contract|lawyer|clause/i.test(fullText)) {
    targetCustomers.push("Solo Practitioners & Boutique Law Firms", "In-House Corporate Legal Counsel", "Contract Management Teams", "Legal Operations Directors");
  } else if (/student|school|learn|teacher|tutor|education|edtech/i.test(fullText)) {
    targetCustomers.push("K-12 Students & Parents", "Online Self-Directed Learners", "School District Administrators", "Private Tutors & Learning Centers");
  } else if (/freelanc|creator|invoice|bill|payment|freelancer/i.test(fullText)) {
    targetCustomers.push("Independent Freelancers & Contractors", "Boutique Creative Agencies", "Remote Consultants & Solo Operators", "Gig Economy Professionals");
  } else if (/fleet|driver|fatigue|truck|sleep|logistics|transport/i.test(fullText)) {
    targetCustomers.push("Long-Haul Freight & Trucking Fleets", "Mining & Heavy Machinery Operators", "Logistics & Delivery Fleet Managers", "Commercial Transit Authorities");
  } else {
    targetCustomers.push(`Operations Managers in ${rawDomain}`, `SMB Owners & Operators`, `Enterprise Department Leads`);
  }

  // 3. Extract Key Domain Features from text
  const keyFeatures = [];
  if (/forecast|demand|predict|sales|weather|inventory/i.test(fullText)) {
    keyFeatures.push("Predictive Demand Forecasting Engine", "Historical Sales & Foot-Traffic Ingestion", "Automated Daily Prep & Production Recommendations", "Spoilage & Expiration Risk Alerting", "POS & Inventory API Integration");
  } else if (/computer vision|camera|shelf|stock|out of stock|misplaced/i.test(fullText)) {
    keyFeatures.push("Real-Time Computer Vision Shelf Scanning", "Out-of-Stock & Low-Inventory Detection", "Planogram Compliance & Misplacement Alerts", "Store Staff Mobile Restock Dispatch", "Historical Stockout Revenue Loss Analytics");
  } else if (/appointment|cancel|no-show|schedule|calendar|reminder|waiting list/i.test(fullText)) {
    keyFeatures.push("Predictive No-Show Risk Scoring", "Automated SMS/WhatsApp Dynamic Reminders", "Smart Waitlist Auto-Filling", "Direct EHR/Practice Management Integration", "Two-Way Patient Conversational Rescheduling");
  } else if (/security|guardrail|injection|firewall|proxy|sidecar/i.test(fullText)) {
    keyFeatures.push("Sub-15ms Real-Time Token Interception Proxy", "Runtime Prompt Injection & Jailbreak Defense", "Automated PII Masking & Data Redaction", "Continuous Red-Teaming Simulation Sandbox", "API Budget Limiter & Runaway Loop Termination");
  } else {
    keyFeatures.push(
      `Core Automated ${rawTitle} Engine`,
      "Real-Time Analytics & Decision Telemetry",
      "Automated Alerting & Communication Triggers",
      "Secure Third-Party API & Data Ingestion",
      "Executive Dashboard & Reporting Suite"
    );
  }

  // 4. Derive Precise Industry Classification
  let industry = rawDomain;
  if (/food waste|restaurant|kitchen|food demand/i.test(fullText)) {
    industry = "ClimateTech / Food-Service & Hospitality";
  } else if (/shelf|retail|supermarket|store|planogram/i.test(fullText)) {
    industry = "RetailTech & Computer Vision AI";
  } else if (/clinic|appointment|no-show|healthcare|medical/i.test(fullText)) {
    industry = "HealthTech & Clinical Practice Operations";
  } else if (/security|guardrail|firewall|pii|jailbreak/i.test(fullText)) {
    industry = "Enterprise AI Security & Observability";
  }

  // 5. Build Unique Value Proposition (UVP)
  const uniqueValueProp = `Enables ${targetCustomers[0] || "operators"} to resolve ${problemStatement.slice(0, 70)} through automated, real-time intelligence tailored specifically for ${industry}.`;

  // 6. Technology Stack & Assumptions
  const technology = [];
  if (/vision|camera|image/i.test(fullText)) technology.push("Edge Computer Vision", "Convolutional Neural Networks", "Real-Time Video Stream Processing");
  if (/predict|forecast|time series/i.test(fullText)) technology.push("Time-Series Forecasting Models", "Multimodal Weather & Event Signals", "Automated Regression & Gradient Boosting");
  if (/llm|nlp|agent|prompt/i.test(fullText)) technology.push("Large Language Models (LLMs)", "Autonomous Multi-Agent Orchestration", "Retrieval-Augmented Generation (RAG)");
  if (technology.length === 0) technology.push("Cloud SaaS Architecture", "Real-Time Event Streams", "Automated Algorithmic Decision Engine");

  const assumptions = [
    `Target customers in ${rawRegion} have sufficient digital data availability (POS, EHR, Cameras, or APIs).`,
    `Customers have an immediate economic incentive to reduce operational losses caused by this problem.`,
    `A streamlined MVP can demonstrate positive ROI within the first 30 days of deployment.`
  ];

  return {
    startup_name: rawTitle,
    founder_name: rawFounder,
    industry: industry,
    target_region: rawRegion,
    pricing_model: rawPricing,
    problem_statement: problemStatement,
    solution: solutionStatement,
    unique_value_proposition: uniqueValueProp,
    target_customers: targetCustomers,
    key_features: keyFeatures,
    business_model: rawPricing.includes("Free") ? "Freemium SaaS" : rawPricing.includes("Hardware") ? "Hardware + Recurring SaaS" : "B2B Subscription SaaS",
    technology: technology,
    assumptions: assumptions,
    attachedDocument: attachedDoc,
    validated_at: new Date().toISOString()
  };
}
