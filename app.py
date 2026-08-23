from search import search_competitors
from competitor_ai import analyze

print("=" * 60)
print("      AI Startup Competitor Comparison Agent")
print("=" * 60)

startup = input("\nEnter your Startup Idea: ")

print("\nSearching for competitors...\n")

competitors = search_competitors(startup)

print("Competitors Found:\n")

for competitor in competitors:
    print("-", competitor)

print("\nAnalyzing competitors...\n")

for competitor in competitors:

    print("=" * 50)
    print(competitor)
    print("=" * 50)

    result = analyze(startup, competitor)

    print(result)
    print("\n")