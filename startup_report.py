from google import genai
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_report(startup):

    prompt = f"""
You are an expert Startup Investor and Business Consultant.

Analyze this startup idea:

{startup}

Generate a complete report in the following format.

# Startup Health Report

Innovation: X/10

Market Demand: X/10

Scalability: X/10

Competition: X/10

Revenue Potential: X/10

Overall Score: X/10

## SWOT Analysis

Strengths
- ...

Weaknesses
- ...

Opportunities
- ...

Threats
- ...

## Recommended Revenue Model

Explain the best revenue model in 3-4 lines.

## Top 5 Competitors

List only company names.

## Competitor Comparison Table

| Competitor | Threat | Strength |
|------------|--------|----------|

## Final Verdict

Write 4-5 lines explaining whether this startup has a good chance of success.

Use Markdown formatting.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text