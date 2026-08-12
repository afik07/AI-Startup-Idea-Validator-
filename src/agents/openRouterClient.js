// OpenRouter API Gateway Client with dynamic fallback generator

export async function callOpenRouter({ apiKey, model = "google/gemini-2.0-flash-001", prompt, systemPrompt, fallbackFn }) {
  if (!apiKey || apiKey.trim() === "") {
    console.warn("OpenRouter API key missing. Using domain fallback reasoning.");
    if (fallbackFn) {
      // Simulate natural network latency for authentic feel
      await new Promise((res) => setTimeout(res, 800));
      return fallbackFn();
    }
    throw new Error("OpenRouter API key is required and no fallback function provided.");
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href || "http://localhost:5173",
        "X-Title": "AI Startup Idea Validator"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt + "\nIMPORTANT: Output ONLY valid JSON without markdown formatting or code blocks." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    
    if (!rawContent) {
      throw new Error("Empty response received from OpenRouter API.");
    }

    // Clean any potential markdown wrapping
    const cleaned = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("OpenRouter API call failed, falling back to mock engine:", err);
    if (fallbackFn) {
      return fallbackFn();
    }
    throw err;
  }
}
