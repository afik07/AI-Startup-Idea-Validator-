# System Architecture - AI Startup Idea Validator

## Executive Overview
The **AI Startup Idea Validator** is an industry-ready Multi-Agent System (MAS) designed to automatically research, evaluate, and score early-stage startup concepts. Utilizing sequential agent orchestration with **OpenRouter API** (LLM reasoning across Gemini, Claude, GPT-4, Llama) and **Tavily API** (real-time live web search), the system transforms raw business ideas into quantitative market assessments, competitor comparison matrices, and customer persona breakdowns.

---

## High-Level System Architecture Diagram

```mermaid
flowchart TB
    subgraph Client UI Layer (React + Vite)
        UI[Dashboard & Idea Input Form]
        Presets[Preset Startup Ideas]
        Config[OpenRouter & Tavily API Key Config]
        Stepper[Live Agent Pipeline Stepper]
        Visualizer[Interactive Charts: TAM/SAM/SOM, Radar & Matrix]
        Exporter[Report Exporter: Markdown / JSON / PDF]
    end

    subgraph MAS Orchestration Layer
        Orchestrator[Agent Orchestrator Pipeline Engine]
        Context[Pipeline Context Store & History]
    end

    subgraph Specialized AI Agents
        A1[1. Market Opportunity Agent]
        A2[2. Customer Segmentation Agent]
        A3[3. Competitor Discovery Agent]
        A4[4. Comparison & Strategy Agent]
    end

    subgraph External API Integrations
        Tavily[Tavily Web Search API]
        OpenRouter[OpenRouter Multi-LLM Gateway]
    end

    %% Flow Connections
    UI -->|Submit Idea| Orchestrator
    Presets -->|Populate Idea| UI
    Config -->|Inject API Keys| Orchestrator

    Orchestrator -->|Step 1: Execute| A1
    A1 -->|Query LLM| OpenRouter
    OpenRouter -->|Market Size, CAGR, Drivers| A1
    A1 -->|Update Context| Context

    Context -->|Step 2: Execute| A2
    A2 -->|Query LLM| OpenRouter
    OpenRouter -->|ICPs, Personas, Pain Points| A2
    A2 -->|Update Context| Context

    Context -->|Step 3: Execute| A3
    A3 -->|Live Web Search| Tavily
    Tavily -->|Search Results & Competitor URLs| A3
    A3 -->|Query LLM| OpenRouter
    OpenRouter -->|Competitor Offerings & Specs| A3
    A3 -->|Update Context| Context

    Context -->|Step 4: Execute| A4
    A4 -->|Query LLM| OpenRouter
    OpenRouter -->|Comparison Matrix & Validation Score| A4
    A4 -->|Final Pipeline Output| Orchestrator

    Orchestrator -->|Stream Agent Events| Stepper
    Orchestrator -->|Render Validation Results| Visualizer
    Visualizer -->|Generate Summary| Exporter
```

---

## Agent Responsibilities & Data Schema Pipeline

| Agent Name | Primary Input | External API Used | Core Responsibilities | Output Data Structure |
| :--- | :--- | :--- | :--- | :--- |
| **1. Market Opportunity Agent** | Raw Idea, Target Region, Industry | OpenRouter API | Evaluates global/regional TAM, SAM, SOM, CAGR, market momentum, macro tailwinds, regulatory hurdles. | `tam`, `sam`, `som`, `cagr`, `marketTrends`, `drivers`, `marketScore` |
| **2. Customer Segmentation Agent** | Market Analysis Context + Startup Idea | OpenRouter API | Identifies Ideal Customer Profiles (ICPs), target buyer personas, key pain points, willingness to pay, buying triggers. | `personas[]`, `icpSummary`, `painPointSeverity`, `willingnessToPay`, `customerScore` |
| **3. Competitor Discovery Agent** | Startup Idea + Industry Context | Tavily Search API + OpenRouter API | Conducts real-time web searches to discover direct competitors, indirect alternatives, pricing models, and key feature offerings. | `competitors[]` (Name, URL, Features, Pricing, Moat, Weaknesses), `marketSaturationScore` |
| **4. Comparison & Strategy Agent** | Full Context (Market, Customer, Rivals) | OpenRouter API | Generates feature parity matrix, market gaps, unique value proposition (UVP), moat defensibility, overall validation score (0-100), and verdict. | `featureMatrix[]`, `gaps[]`, `uvp`, `validationScore` (0-100), `verdict` (Go/Caution/Pivot), `swot` |

---

## Key Architectural Decisions

1. **Sequential Context Pipeline with Event Streaming**:
   - Each agent receives the enriched context of all preceding agents, preventing fragmented analysis.
   - The Orchestrator emits fine-grained lifecycle events (`agent_start`, `agent_log`, `agent_complete`, `agent_error`), driving live UI progress animations.

2. **Resilient Dual-Mode API Client**:
   - Direct integration with OpenRouter API for multi-model flexibility (`google/gemini-2.0-flash-001`, `anthropic/claude-3.5-sonnet`, `openai/gpt-4o-mini`, `meta-llama/llama-3.3-70b-instruct`).
   - Integrated Tavily API for live web search queries with real source links.
   - Fallback Mock Mode: Includes realistic domain-specific heuristics so the system executes and renders complete visualizations out of the box even if API keys are missing.

3. **Client-Side Privacy & Security**:
   - API keys are stored strictly in browser session/local storage or environment variables. No server-side retention of user keys or secret data.
