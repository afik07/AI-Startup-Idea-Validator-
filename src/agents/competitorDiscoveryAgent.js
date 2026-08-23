// Agent 3: Competitor Discovery Agent (Live Web Search & Domain Rival Extraction)
import { searchTavilyCompetitors } from "./tavilyClient.js";
import { evaluateStartupIdea } from "./dynamicIdeaEvaluator.js";
import { callOpenRouter } from "./openRouterClient.js";

export async function runCompetitorDiscoveryAgent({ idea, marketData, customerData, options, logCallback }) {
  const evaluated = evaluateStartupIdea(idea);
  logCallback(`Searching live web intelligence for "${idea.title}" in ${evaluated.industry}...`);

  const fallbackFn = () => {
    logCallback(`Mapping dynamic competitive landscape for ${evaluated.industry}...`);
    return {
      marketSaturation: evaluated.validationScore > 80 ? "Moderate (Fragmented)" : "High (Established Incumbents)",
      competitors: evaluated.defaultCompetitors,
      searchQueryUsed: `${idea.title} ${evaluated.industry} competitors products`
    };
  };

  // 1. If LLM API Key is provided, use LLM to discover accurate domain competitors
  if (options.openRouterApiKey && options.openRouterApiKey.trim() !== "") {
    try {
      logCallback(`Querying LLM Reasoning Engine for direct competitors to "${idea.title}"...`);
      const systemPrompt = `You are a venture capital competitor discovery agent.
Analyze the following startup idea and list 3 to 4 REAL-WORLD existing competitors, legacy incumbents, or direct commercial alternatives in the exact same domain.

Startup Details:
- Title: ${idea.title}
- Industry: ${evaluated.industry}
- Problem: ${idea.problem || idea.description}
- Solution: ${idea.solution || idea.description}

Output strictly a JSON object with this format:
{
  "marketSaturation": "Low" | "Moderate" | "High",
  "competitors": [
    {
      "name": "Competitor Company Name (e.g. SmartCap, Seeing Machines, etc.)",
      "websiteUrl": "https://competitor.com",
      "estimatedPricing": "$99/mo or $1,200/unit",
      "targetTier": "Enterprise / Mid-Market",
      "primaryMoat": "Core moat (e.g. EEG brainwave sensors, optical gaze tracking)",
      "coreOffer": "1-2 sentence description of what they sell."
    }
  ]
}`;

      const llmResult = await callOpenRouter({
        apiKey: options.openRouterApiKey,
        model: options.model || "openai/gpt-4o-mini",
        prompt: `Identify the 3 biggest competitors for ${idea.title} (${evaluated.industry}).`,
        systemPrompt,
        fallbackFn
      });

      if (llmResult && llmResult.competitors && llmResult.competitors.length > 0) {
        logCallback(`LLM successfully discovered ${llmResult.competitors.length} industry competitors.`);
        return llmResult;
      }
    } catch (err) {
      console.warn("LLM competitor discovery failed, attempting Tavily search / dynamic index:", err);
    }
  }

  // 2. Tavily Live Web Search (if available)
  if (options.tavilyApiKey && options.tavilyApiKey.trim() !== "") {
    try {
      const query = `"${idea.title}" OR "${evaluated.industry}" top products companies competitors pricing`;
      const searchResults = await searchTavilyCompetitors({
        apiKey: options.tavilyApiKey,
        query,
        maxResults: 4
      });

      if (searchResults && searchResults.results && searchResults.results.length > 0) {
        // Filter out generic blog articles
        const cleanResults = searchResults.results.filter(
          (r) => !r.title?.toLowerCase().includes("best competitor analysis tools for b2b saas")
        );

        if (cleanResults.length > 0) {
          const rivals = cleanResults.slice(0, 3).map((item, idx) => {
            const snippet = item.content || item.snippet || item.title || "";
            return {
              name: item.title?.split("-")[0]?.split("|")[0]?.trim() || `Competitor ${idx + 1}`,
              websiteUrl: item.url || "N/A",
              estimatedPricing: "$150 - $1,500/unit",
              targetTier: "Commercial & Fleet Operators",
              primaryMoat: "Established Brand & Distribution",
              coreOffer: snippet.length > 15 ? snippet.slice(0, 140) + "..." : "Commercial safety and telemetry monitoring solutions."
            };
          });

          return {
            marketSaturation: "Moderate",
            competitors: rivals,
            searchQueryUsed: query
          };
        }
      }
    } catch (err) {
      console.warn("Tavily search error, falling back to dynamic index:", err);
    }
  }

  return fallbackFn();
}
