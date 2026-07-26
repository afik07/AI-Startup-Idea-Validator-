import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || "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";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_new_openrouter_key_here') {
  console.error('❌ OPENROUTER_API_KEY is missing in .env file!');
  process.exit(1);
}

app.get('/', (req, res) => res.json({ status: '✅ Validator API is running', endpoint: 'POST /api/validate' }));

app.post('/api/validate', async (req, res) => {
  const { founderName, startupName, industry, problem, solution } = req.body;

  try {
    // Step 1: Tavily market research
    const tavilyRes = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: `Market competitors and solutions for ${startupName} in ${industry}: ${problem}`,
        search_depth: "advanced",
        include_answer: true,
        max_results: 3
      })
    });

    if (!tavilyRes.ok) throw new Error(`Tavily error: ${tavilyRes.status}`);
    const tavilyData = await tavilyRes.json();
    const marketSummary = tavilyData.answer || tavilyData.results.map(r => r.content).join('\n');

    // Step 2: OpenRouter LLM validation
    const prompt = `You are an elite Tech Startup Validator. Analyze this startup against live market research.

STARTUP:
- Founder: ${founderName}
- Name: ${startupName}
- Industry: ${industry}
- Problem: ${problem}
- Solution: ${solution}

LIVE MARKET RESEARCH:
${marketSummary}

Respond ONLY with valid JSON, no extra text:
{
  "score": <number 1-100>,
  "marketFitAnalysis": "<2-sentence market placement analysis>",
  "technicalFeasibility": "<2-sentence technical viability breakdown>",
  "competitiveAdvantage": "<1 key advantage over existing competitors>"
}`;

    const llmRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'AI Startup Validator'
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    if (!llmRes.ok) {
      const errBody = await llmRes.json().catch(() => ({}));
      throw new Error(`OpenRouter error ${llmRes.status}: ${errBody?.error?.message || 'Check your API key at openrouter.ai/keys'}`);
    }
    const llmData = await llmRes.json();

    const rawText = llmData.choices[0].message.content;
    // Extract JSON even if model wraps it in markdown code blocks
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Model did not return valid JSON");

    const result = JSON.parse(jsonMatch[0]);
    res.json({ success: true, result, marketSources: tavilyData.results });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => console.log('✅ Validator API running on http://localhost:3001'));
