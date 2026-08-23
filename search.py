from google import genai
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def search_competitors(startup):

    prompt = f"""
You are a startup market research expert.

A startup idea is:

{startup}

List the top 5 closest competitors.

Rules:
- Return ONLY company or product names.
- One competitor per line.
- Do not number them.
- Do not explain anything.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    competitors = response.text.strip().split("\n")

    competitors = [c.strip("-• ").strip() for c in competitors]

    return competitors