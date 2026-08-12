// Tavily Search API Client for Live Web Competitor Discovery

export async function searchTavily({ apiKey, query, maxResults = 5, fallbackFn }) {
  if (!apiKey || apiKey.trim() === "") {
    console.warn("Tavily API key missing. Using domain web search fallback.");
    if (fallbackFn) {
      await new Promise((res) => setTimeout(res, 600));
      return fallbackFn(query);
    }
    return { results: [] };
  }

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: apiKey.trim(),
        query: query,
        search_depth: "advanced",
        include_answer: true,
        include_images: false,
        max_results: maxResults
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Tavily API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return {
      answer: data.answer || "",
      results: (data.results || []).map((res) => ({
        title: res.title,
        url: res.url,
        snippet: res.content,
        score: res.score
      }))
    };
  } catch (err) {
    console.error("Tavily search failed, using fallback web results:", err);
    if (fallbackFn) {
      return fallbackFn(query);
    }
    return { results: [] };
  }
}
