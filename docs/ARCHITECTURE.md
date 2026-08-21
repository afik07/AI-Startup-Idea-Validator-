# System Architecture Specification - GammaVal™ AI

## Overview
GammaVal™ AI is an enterprise-grade Multi-Agent System (MAS) platform engineered to perform automated venture capital due diligence on startup concepts.

```mermaid
flowchart TD
    Founder[Founder Pitch Input] --> Orchestrator[Agent Orchestrator Pipeline]
    
    subgraph 7-Agent Sequential Due Diligence Pipeline
        Orchestrator --> Market[1. Market Opportunity Agent]
        Market --> Customer[2. Customer Segmentation Agent]
        Customer --> Tavily[3. Competitor Discovery Agent - Tavily Search]
        Tavily --> Matrix[4. Strategic Comparison Agent]
        Matrix --> Swot[5. SWOT & Risk Analysis Agent]
        Swot --> Mvp[6. MoSCoW MVP Feature Agent]
        Mvp --> Gtm[7. Go-To-Market Strategy Agent]
    end

    subgraph Knowledge Base Store & Conversational Chatbot
        Market & Customer & Tavily & Matrix & Swot & Mvp & Gtm --> KB[In-Memory Validation KB]
        KB --> Chatbot[8. Conversational AI Advisor Chatbot]
    end

    KB --> UI[GammaVal SOTA Results Dashboard]
```

## System Components
1. **Multi-Model LLM Gateway (`openRouterClient.js`)**: Routes requests across Gemini 2.0 Flash, Claude 3.5 Sonnet, GPT-4o, and Llama 3.3.
2. **Tavily Live Web Search Adapter (`tavilyClient.js`)**: Fetches real-time web search results for direct competitor discovery, pricing, and feature comparison.
3. **Agent Orchestrator Engine (`agentOrchestrator.js`)**: Manages sequential step transitions, emits telemetry log streams, and builds the unified Knowledge Base.
