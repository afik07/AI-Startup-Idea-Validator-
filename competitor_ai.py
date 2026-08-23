from google import genai
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def analyze(startup, competitor):

    prompt = f"""
You are a Startup Business Analyst.

Compare the following startup with its competitor.

Startup:
{startup}

Competitor:
{competitor}

Respond using this exact format.

Overview:
(2-3 lines)

Strengths:
• Point 1
• Point 2
• Point 3

Weaknesses:
• Point 1
• Point 2
• Point 3

Market Opportunity:
(2-3 lines)

Threat Level:
Low / Medium / High

Overall Score:
/10

Keep the entire response under 250 words.
"""

    response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=prompt
    )

    return response.text