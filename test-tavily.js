import fetch from 'node-fetch';

async function runTavilySearch() {
    // Replace this with your actual Tavily API key from tavily.com
    const TAVILY_API_KEY = "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"; 
    
    // We are testing a complex IoT/ML pitch to see how the engine handles it
    const searchQuery = "Current market competitors and solutions for AI worker fatigue prediction systems using ESP32 hardware and machine learning";

    console.log("Initiating Tavily Market Research...");

    try {
        const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query: searchQuery,
                search_depth: "advanced", // 'advanced' gives better technical results than 'basic'
                include_answer: true,     // Asks Tavily to generate a short AI summary of the search
                max_results: 3            // Keeps the payload small and focused
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log("\n✅ Search Complete!");
        console.log("--------------------------------------------------");
        console.log("🤖 Tavily's AI Summary:");
        console.log(data.answer);
        console.log("--------------------------------------------------");
        console.log("🔗 Top Sources Found:");
        
        data.results.forEach((result, index) => {
            console.log(`\n${index + 1}. ${result.title}`);
            console.log(`URL: ${result.url}`);
            console.log(`Snippet: ${result.content.substring(0, 150)}...`);
        });

    } catch (error) {
        console.error("❌ Error connecting to Tavily:", error.message);
    }
}

runTavilySearch();