// Resilient Unified LLM Gateway Client with Multi-Model Failover & Direct Google Gemini API Support

export async function callChatGptLlm({ apiKey, model = "openai/gpt-4o-mini", messages = [], systemPrompt }) {
  const cleanKey = (apiKey || "").trim();

  if (!cleanKey) {
    throw new Error("NO_API_KEY");
  }

  // 1. If it's a Direct Google Gemini API Key (starts with AIzaSy)
  if (cleanKey.startsWith("AIzaSy")) {
    const geminiModels = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
    for (const gModel of geminiModels) {
      try {
        const contents = [];
        contents.push({
          role: "user",
          parts: [{ text: `System Context & Persona:\n${systemPrompt}` }]
        });
        contents.push({
          role: "model",
          parts: [{ text: "Understood. I am your elite VC & Startup Co-Pilot advisor. I will answer all questions directly, accurately, and comprehensively based on your startup idea context." }]
        });

        messages.forEach((m) => {
          contents.push({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          });
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${gModel}:generateContent?key=${cleanKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1800
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      } catch (err) {
        console.warn(`Direct Gemini API failed with ${gModel}:`, err);
      }
    }
  }

  // 2. OpenRouter API with Automatic Multi-Model Failover
  const candidateModels = [
    model,
    "openai/gpt-4o-mini",
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-flash-1.5",
    "meta-llama/llama-3.3-70b-instruct",
    "deepseek/deepseek-chat"
  ].filter(Boolean);

  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text
    }))
  ];

  let lastError = null;

  for (const candidate of candidateModels) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cleanKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.href || "http://localhost:5173",
          "X-Title": "GammaVal AI Startup Advisor Chat"
        },
        body: JSON.stringify({
          model: candidate,
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 1800
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) return reply;
      } else {
        const errText = await response.text();
        console.warn(`OpenRouter model ${candidate} failed (${response.status}): ${errText}`);
        lastError = new Error(`Model ${candidate} failed (${response.status})`);
      }
    } catch (err) {
      console.warn(`Network error with model ${candidate}:`, err);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate response from all available LLM models.");
}

export async function callOpenRouter({ apiKey, model = "openai/gpt-4o-mini", prompt, systemPrompt, fallbackFn }) {
  const cleanKey = (apiKey || "").trim();

  if (!cleanKey) {
    if (fallbackFn) return fallbackFn();
    throw new Error("NO_API_KEY");
  }

  // 1. If Direct Gemini
  if (cleanKey.startsWith("AIzaSy")) {
    const geminiModels = ["gemini-2.0-flash", "gemini-1.5-flash"];
    for (const gModel of geminiModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${gModel}:generateContent?key=${cleanKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Prompt:\n${typeof prompt === "string" ? prompt : JSON.stringify(prompt)}\n\nOutput strictly valid JSON only.` }]
                }
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.4
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(cleaned);
          }
        }
      } catch (e) {
        console.warn(`Direct Gemini JSON failed with ${gModel}:`, e);
      }
    }
  }

  // 2. OpenRouter with Failover
  const candidateModels = [
    model,
    "openai/gpt-4o-mini",
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-flash-1.5",
    "meta-llama/llama-3.3-70b-instruct"
  ].filter(Boolean);

  for (const candidate of candidateModels) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cleanKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.href || "http://localhost:5173",
          "X-Title": "GammaVal AI Startup Validator"
        },
        body: JSON.stringify({
          model: candidate,
          messages: [
            { role: "system", content: systemPrompt + "\nIMPORTANT: Output ONLY valid JSON." },
            { role: "user", content: typeof prompt === "string" ? prompt : JSON.stringify(prompt) }
          ],
          temperature: 0.4,
          response_format: { type: "json_object" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content;
        if (rawContent) {
          const cleaned = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
          return JSON.parse(cleaned);
        }
      }
    } catch (err) {
      console.warn(`OpenRouter JSON error with model ${candidate}:`, err);
    }
  }

  if (fallbackFn) return fallbackFn();
  throw new Error("Failed to process agent analysis via OpenRouter.");
}
