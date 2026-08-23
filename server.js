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
    // Step 1: Tavily market research with Competitor Focus
    const tavilyRes = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: `Top market competitors, rival companies, and alternative solutions for ${startupName} in ${industry}: ${problem} ${solution}`,
        search_depth: "advanced",
        include_answer: true,
        max_results: 5
      })
    });

    if (!tavilyRes.ok) throw new Error(`Tavily error: ${tavilyRes.status}`);
    const tavilyData = await tavilyRes.json();
    const marketSummary = tavilyData.answer || tavilyData.results.map(r => r.content).join('\n');

    // Step 2: OpenRouter LLM validation with Competitor Discovery Agent
    const prompt = `You are an elite Startup Validator powered by a specialized Competitor Discovery Agent (Rival Identification). Analyze this startup against live market research.

STARTUP DETAILS:
- Founder: ${founderName}
- Project Name: ${startupName}
- Target Industry: ${industry}
- Problem Solved: ${problem}
- Proposed Solution: ${solution}

LIVE MARKET RESEARCH:
${marketSummary}

CRITICAL: You MUST identify 2-3 rival products, companies, or alternative solutions (direct or indirect competitors) based on the market research or industry standards.

Respond ONLY with valid JSON in this EXACT structure:
{
  "competitorAgent": {
    "rivals": [
      {
        "name": "<Competitor or Alternative Product/Company Name>",
        "type": "Direct Competitor",
        "keyFeatures": "<1-2 sentence overview of what they offer>",
        "vulnerability": "<1 sentence key flaw, missing capability, or user complaint>",
        "ourDifferentiation": "<1 sentence on how this startup outperforms them>"
      },
      {
        "name": "<Second Competitor Name>",
        "type": "Indirect Competitor",
        "keyFeatures": "<1-2 sentence overview of what they offer>",
        "vulnerability": "<1 sentence key flaw>",
        "ourDifferentiation": "<1 sentence on how this startup outperforms them>"
      }
    ],
    "marketGapSummary": "<2-sentence summary of the unaddressed market void that this startup can capture>"
  },
  "score": 75,
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
        model: "nvidia/nemotron-3-nano-30b-a3b:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    if (!llmRes.ok) {
      const errBody = await llmRes.json().catch(() => ({}));
      throw new Error(`OpenRouter error ${llmRes.status}: ${errBody?.error?.message || 'Check your API key at openrouter.ai/keys'}`);
    }
    const llmData = await llmRes.json();

    const rawText = llmData.choices[0]?.message?.content || "";
    // Extract JSON even if model wraps it in markdown code blocks
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Model did not return valid JSON");

    const result = JSON.parse(jsonMatch[0]);

    // Safety fallback: Ensure competitorAgent always exists with rich rival data
    if (!result.competitorAgent || !Array.isArray(result.competitorAgent.rivals) || result.competitorAgent.rivals.length === 0) {
      result.competitorAgent = {
        rivals: (tavilyData.results || []).slice(0, 3).map((s, idx) => ({
          name: s.title ? s.title.split('-')[0].split('|')[0].trim() : `Market Solution ${idx + 1}`,
          type: idx === 0 ? "Direct Competitor" : "Indirect Competitor",
          keyFeatures: s.content ? s.content.substring(0, 130) + '...' : 'Established market solution with standard feature set.',
          vulnerability: 'Lacks personalized edge-computing integration and real-time predictive analytics.',
          ourDifferentiation: `Provides superior real-time performance tailored for ${industry}.`
        })),
        marketGapSummary: `Existing solutions in ${industry} are fragmented or costly. ${startupName} fills the void with an agile, automated technical approach.`
      };
    }

    res.json({ success: true, result, marketSources: tavilyData.results });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => console.log('✅ Validator API running on http://localhost:3001'));
