// Agent 3: Competitor Discovery Agent (Rivals Search & Tavily Web Search Integration)
import { searchTavily } from "./tavilyClient.js";
import { callOpenRouter } from "./openRouterClient.js";

export async function runCompetitorDiscoveryAgent({ idea, marketData, customerData, options, logCallback }) {
  logCallback(`Executing Tavily web search for live competitor offerings in ${marketData.industryName}...`);

  const searchQuery = `${idea.title} ${idea.domain} direct competitors solutions pricing features`;

  const fallbackTavilyFn = (q) => {
    logCallback(`Tavily fallback: Simulating web search hits for query "${q}"...`);
    const domainLower = idea.domain.toLowerCase();

    if (domainLower.includes("legal") || domainLower.includes("b2b")) {
      return {
        answer: "Top competitors in AI legal document audit include Casetext (CoCounsel), Harvey AI, and Lexion.",
        results: [
          {
            title: "Casetext CoCounsel - AI Legal Assistant",
            url: "https://casetext.com/cocounsel",
            snippet: "CoCounsel by Casetext performs document review, legal research, and contract analysis using fine-tuned GPT models specifically for law firms."
          },
          {
            title: "Harvey AI - Legal Intelligence Platform",
            url: "https://harvey.ai",
            snippet: "Harvey AI provides enterprise legal artificial intelligence for elite BigLaw firms and corporate legal departments, backed by OpenAI Startup Fund."
          },
          {
            title: "Lexion - Smart Contract Management & AI Audit",
            url: "https://lexion.ai",
            snippet: "Lexion is an AI-powered contract management system that automates intakes, repository tagging, and risk compliance audits."
          },
          {
            title: "Robin AI - AI Contract Editing & Review",
            url: "https://robinai.com",
            snippet: "Robin AI combines legal AI with human-in-the-loop review to edit contracts 80% faster for mid-market legal teams."
          }
        ]
      };
    } else if (domainLower.includes("health") || domainLower.includes("consumer")) {
      return {
        answer: "Key players in personalized AI health & nutrition include Nutrisense, Levels Health, and Zoe Science.",
        results: [
          {
            title: "Nutrisense - CGM & Personalized Nutrition",
            url: "https://nutrisense.io",
            snippet: "Nutrisense pairs Continuous Glucose Monitors (CGM) with registered dietitians and AI insights to track blood sugar responses."
          },
          {
            title: "Levels Health - Metabolic Health Tracker",
            url: "https://levelshealth.com",
            snippet: "Levels helps users optimize metabolic health by providing real-time biofeedback on bio-metrics, meals, and exercise."
          },
          {
            title: "Zoe Science & Nutrition - Personalized Gut & Metabolic AI",
            url: "https://zoe.com",
            snippet: "Zoe analyzes gut microbiome, blood fat, and sugar responses to recommend personalized food scores via mobile app."
          }
        ]
      };
    } else if (domainLower.includes("edtech") || domainLower.includes("kids")) {
      return {
        answer: "Leading competitors in AI coding for kids include Tynker AI, CodeMonkey, and Replit Kids.",
        results: [
          {
            title: "Tynker - Coding for Kids & AI Games",
            url: "https://tynker.com",
            snippet: "Tynker offers block-to-text coding courses for kids with interactive puzzles and game design modules."
          },
          {
            title: "CodeMonkey - Award-Winning Coding for Kids",
            url: "https://codemonkey.com",
            snippet: "CodeMonkey teaches Python and block coding through monkey game puzzles tailored for K-8 students."
          },
          {
            title: "Synthesis AI - Problem Solving & STEM for Children",
            url: "https://synthesis.is",
            snippet: "Synthesis provides AI-driven problem-solving simulations and collaborative STEM challenges for kids."
          }
        ]
      };
    } else {
      return {
        answer: "Top competitors in micro-invoicing & freelancer billing include Harvest, Bonsai, and Invoice2go.",
        results: [
          {
            title: "Hello Bonsai - All-in-One Freelance Software",
            url: "https://hellobonsai.com",
            snippet: "Bonsai manages freelance contracts, time tracking, proposal generation, and automated client invoicing."
          },
          {
            title: "Harvest - Time Tracking & Invoicing App",
            url: "https://getharvest.com",
            snippet: "Harvest makes time tracking and client invoicing seamless with team budget monitoring integrations."
          },
          {
            title: "Toggl Track & Invoice",
            url: "https://toggl.com",
            snippet: "Toggl provides effortless time tracking across browser extensions and instant billable client report export."
          }
        ]
      };
    }
  };

  // Perform live web search
  const searchOutput = await searchTavily({
    apiKey: options.tavilyApiKey,
    query: searchQuery,
    maxResults: 4,
    fallbackFn: fallbackTavilyFn
  });

  logCallback(`Tavily web search returned ${searchOutput.results.length} competitor sources. Synthesizing competitive findings...`);

  // Synthesize findings using OpenRouter LLM
  const systemPrompt = `You are a Competitive Intelligence Analyst.
Analyze web search findings and extract structured competitor details.
Return JSON ONLY matching this schema:
{
  "marketSaturation": "Low" | "Moderate" | "High" | "Extremely Concentrated",
  "competitors": [
    {
      "name": "string",
      "websiteUrl": "string",
      "targetTier": "Enterprise" | "Mid-Market" | "SMB" | "Consumer",
      "estimatedPricing": "string",
      "keyFeatures": ["string"],
      "primaryMoat": "string",
      "keyWeaknesses": ["string"]
    }
  ],
  "competitorDiscoverySummary": "string"
}`;

  const userPrompt = `Synthesize these live web search results for the startup idea:
Idea: ${idea.title}
Domain: ${idea.domain}
Target Audience: ${idea.targetAudience}

Web Search Results:
${searchOutput.results.map((r) => `- ${r.title} (${r.url}): ${r.snippet}`).join("\n")}
Web Search Answer Summary: ${searchOutput.answer}`;

  const fallbackSynthesizerFn = () => {
    return {
      marketSaturation: searchOutput.results.length > 3 ? "Moderate" : "Low",
      competitorDiscoverySummary: `Discovered ${searchOutput.results.length} active players. Market shows high enterprise focus, leaving boutique SMBs underserved.`,
      competitors: searchOutput.results.map((r, i) => {
        const nameClean = r.title.split("-")[0].split("|")[0].trim();
        return {
          name: nameClean,
          websiteUrl: r.url,
          targetTier: i === 0 ? "Enterprise" : i === 1 ? "Mid-Market" : "SMB",
          estimatedPricing: i === 0 ? "$1,000+/mo (Custom)" : i === 1 ? "$99/mo" : "$19-$49/mo",
          keyFeatures: [
            "Contract review & clause library",
            "AI automated risk flags",
            "Export audit reports"
          ],
          primaryMoat: i === 0 ? "High Brand Reputation & Legal Data Rights" : "First-Mover Integrations",
          keyWeaknesses: [
            "Prohibitive pricing for sole attorneys",
            "Complex setup required",
            "Lack of micro-task workflow focus"
          ]
        };
      })
    };
  };

  const synthesized = await callOpenRouter({
    apiKey: options.openRouterApiKey,
    model: options.model,
    prompt: userPrompt,
    systemPrompt,
    fallbackFn: fallbackSynthesizerFn
  });

  logCallback(`Competitor Discovery Agent complete. Evaluated ${synthesizerCompetitorCount(synthesized)} rivals.`);
  return synthesized;
}

function synthesizerCompetitorCount(synth) {
  return synth.competitors ? synth.competitors.length : 0;
}
