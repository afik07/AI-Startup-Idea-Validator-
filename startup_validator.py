from google import genai
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def validate_startup(startup):

    prompt = f"""
You are an expert Startup Investor.

Analyze this startup idea:

{startup}

Return your answer exactly in this format.

Innovation: X/10

Market Demand: X/10

Scalability: X/10

Competition: X/10

Revenue Potential: X/10

Overall Score: X/10

Verdict:
(2-3 lines)

SWOT Analysis

Strengths:
- ...

Weaknesses:
- ...

Opportunities:
- ...

Threats:
- ...
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text