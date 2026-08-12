# Framework Selection, MAS Workflow & Justification

## 1. Multi-Agent Framework Selection & Comparison

When designing the AI Startup Idea Validator, we evaluated three primary architectural frameworks for multi-agent coordination:

| Feature / Criteria | CrewAI | LangGraph / LangChain | Custom Async MAS Pipeline (Chosen) |
| :--- | :--- | :--- | :--- |
| **Execution Control** | Dynamic / Autonomous | Graph-based State Machine | Deterministic Async Context Pipeline |
| **API Overhead** | High (Heavy dependencies) | High (LangChain abstractions) | Zero (Pure JavaScript / REST APIs) |
| **Live Web Search Integration** | Requires custom tools wrapper | Requires custom tools wrapper | Direct Tavily API Search integration |
| **Multi-LLM Gateway** | Limited provider abstractions | Provider wrappers | Native OpenRouter API (Access to 100+ LLMs) |
| **Browser / Client Compatibility** | Server-only (Python) | Server-heavy (Python/JS) | 100% Web & Server Compatible |
| **UI Streaming & Event Hooks** | Complex callback hooks | Graph state streams | Native Event Listener / Stream Callback |

---

## 2. Rationale & Justification for Custom Async Pipeline

### Why Not Heavy Frameworks (CrewAI / AutoGen / LangChain)?
1. **Deterministic Execution**: Startup idea validation requires a strict logical sequence:
   $$\text{Market Opportunity} \rightarrow \text{Customer ICP} \rightarrow \text{Competitor Web Search} \rightarrow \text{Competitive Strategy Matrix} \rightarrow \text{Final Scorecard}$$
   Autonomous agents with open-ended looping often hallucinate redundant search calls, ballooning API costs and execution time.
2. **OpenRouter Flexibility**: OpenRouter provides unified access to top-tier LLMs (Gemini 2.0 Flash, Claude 3.5 Sonnet, GPT-4o-mini, Llama 3.3 70B). A direct lightweight REST adapter eliminates third-party SDK breaking changes and allows model swapping on a per-agent basis.
3. **Live Competitor Discovery with Tavily**: Real-time competitor discovery requires up-to-date web access. Integrating Tavily directly enables search query formulation by the Competitor Agent, parsing real domain URLs, features, and pricing snippet data.
4. **Rich UI Interactivity**: A web dashboard requires real-time progress steps, step logs, live confidence metrics, and instant error recovery—which light-weight custom event handlers deliver seamlessly.

---

## 3. Detailed MAS Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as React UI Dashboard
    participant Orchestrator as Agent Orchestrator
    participant M1 as 1. Market Opportunity Agent
    participant C2 as 2. Customer Segmentation Agent
    participant R3 as 3. Competitor Discovery Agent (Tavily)
    participant S4 as 4. Comparison Strategy Agent
    participant OR as OpenRouter Gateway
    participant TAV as Tavily Web Search API

    User->>UI: Input Idea & Choose Model / API Keys
    UI->>Orchestrator: startValidation(idea, options)
    Orchestrator->>UI: emit('agent_start', { agent: 'Market' })
    
    Orchestrator->>M1: analyzeMarket(idea)
    M1->>OR: POST /chat/completions (Prompt: Industry, TAM/SAM/SOM, CAGR)
    OR-->>M1: JSON (TAM/SAM/SOM breakdown & Trends)
    M1-->>Orchestrator: Return Market Context
    Orchestrator->>UI: emit('agent_complete', marketData)

    Orchestrator->>C2: analyzeCustomer(idea, marketContext)
    C2->>OR: POST /chat/completions (Prompt: ICPs, Personas, WTP)
    OR-->>C2: JSON (Personas, Pain Points & Willingness to Pay)
    C2-->>Orchestrator: Return Customer Context
    Orchestrator->>UI: emit('agent_complete', customerData)

    Orchestrator->>R3: discoverCompetitors(idea, marketContext)
    R3->>TAV: POST /search (Queries: Direct & Indirect Rivals)
    TAV-->>R3: Live Search Snippets & Web Links
    R3->>OR: POST /chat/completions (Synthesize Tavily Web Results)
    OR-->>R3: JSON (Competitor Matrix, Pricing & Features)
    R3-->>Orchestrator: Return Competitor Context
    Orchestrator->>UI: emit('agent_complete', competitorData)

    Orchestrator->>S4: generateComparison(fullContext)
    S4->>OR: POST /chat/completions (Prompt: Us vs Rivals, Gaps, UVP, Score)
    OR-->>S4: JSON (Validation Score 0-100, Verdict, Matrix)
    S4-->>Orchestrator: Return Final Validation Scorecard
    Orchestrator->>UI: emit('pipeline_complete', fullValidationReport)
    UI-->>User: Render Interactive Visualizations & Summary
```

---

## 4. OpenRouter & Tavily Integration Specifications

- **OpenRouter API Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
  - Default Model: `google/gemini-2.0-flash-001` (Fast, high reasoning capacity, cost-effective).
  - Alternative Models: `anthropic/claude-3.5-sonnet`, `openai/gpt-4o-mini`, `meta-llama/llama-3.3-70b-instruct`.
  - JSON Mode Enforcement: Enforces strict structured output parsing using JSON schema instructions in system prompts.

- **Tavily Search API Endpoint**: `https://api.tavily.com/search`
  - Deep Search Depth: `advanced`
  - Result Count: Top 5 relevant live web domain hits per competitor search query.
  - Snippet Synthesis: Extracts competitor product descriptions, pricing tiers, and market offerings directly from live web search results.
