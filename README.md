# 🚀 AI Startup Idea Validator

An AI-powered platform that validates startup ideas using **Large Language Models (LLMs)**, **real-time market research**, and **AI-driven competitor analysis**. The application helps entrepreneurs evaluate the feasibility of their startup ideas by analyzing market demand, competitors, target audience, business opportunities, and overall startup potential, providing actionable insights backed by live web data.

---

## ✨ Features

- 🤖 AI-powered startup idea validation
- 🌐 Real-time market research using Tavily Search API
- 📊 Competitor discovery and analysis
- 📈 Market fit evaluation
- ⚙️ Technical feasibility assessment
- 💡 Competitive advantage identification
- 🎯 Startup scoring based on AI analysis
- 📄 Comprehensive validation report

---

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js

### AI & APIs
- OpenRouter API (LLM)
- Tavily Search API

### Other
- REST API
- dotenv
- CORS

---

# 📂 Project Structure

```text
AI-Startup-Idea-Validator/
│
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│
├── public/
│
├── server.js
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .env.example
├── README.md
└── LICENSE
```

---

# ✅ Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or later recommended)
- npm
- Internet connection
- Tavily API Key
- OpenRouter API Key

Verify installation:

```bash
node -v
npm -v
```

---

# ⚙️ Installation

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/AI-Startup-Idea-Validator.git
```

Navigate into the project folder.

```bash
cd AI-Startup-Idea-Validator
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Configure Environment Variables

Create a `.env` file in the project root.

```env
TAVILY_API_KEY=your_tavily_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

# 🔑 Getting API Keys

## Tavily API

1. Visit https://tavily.com
2. Sign up for a free account.
3. Generate your API key.
4. Add it to your `.env` file.

## OpenRouter API

1. Visit https://openrouter.ai
2. Create an account.
3. Generate your API key.
4. Add it to your `.env` file.

---

# ▶️ Running the Application

## Start the Backend

```bash
npm run server
```

Output:

```text
✅ Validator API running on http://localhost:3001
```

## Start the Frontend

Open another terminal:

```bash
npm run dev
```

Output:

```text
VITE ready

Local: http://localhost:5173/
```

---

# 🚀 Using the Application

1. Enter:
   - Founder Name
   - Startup Name
   - Industry
   - Problem Statement
   - Proposed Solution
2. Click **Validate My Idea**.
3. Wait for the AI analysis.
4. Review:
   - Startup Score
   - Market Fit Analysis
   - Technical Feasibility
   - Competitive Advantage
   - Market Sources

---

# 🔄 Application Workflow

```text
User Input
     │
     ▼
React Frontend (Vite)
     │
     ▼
Express Backend
     │
     ▼
Tavily Search API
(Market Research)
     │
     ▼
OpenRouter LLM
(Startup Validation)
     │
     ▼
Validation Report
```

---

# 📊 AI Validation Includes

- ✅ Market Demand
- ✅ Competitor Analysis
- ✅ Market Opportunities
- ✅ Industry Trends
- ✅ Technical Feasibility
- ✅ Startup Score
- ✅ Competitive Advantage

---

# 📌 API Endpoint

### POST

```
/api/validate
```

### Sample Request

```json
{
  "founderName": "John Doe",
  "startupName": "HealthAI",
  "industry": "Healthcare",
  "problem": "Long patient waiting times",
  "solution": "AI-powered appointment scheduling"
}
```

### Sample Response

```json
{
  "success": true,
  "result": {
    "score": 87,
    "marketFitAnalysis": "Strong market demand with growing AI adoption.",
    "technicalFeasibility": "Technically feasible using existing cloud technologies.",
    "competitiveAdvantage": "Provides faster and more personalized healthcare scheduling."
  }
}
```

---

# 🌟 Future Enhancements

- Authentication
- PDF Report Export
- Investor Readiness Score
- SWOT Analysis
- Revenue Prediction
- Business Model Canvas
- Pitch Deck Generator
- Multi-Agent AI
- Database Integration
- Dashboard

---

# 👨‍💻 Authors

**Team Gamma**

- Afik Esmal A
- Vijayaragavan
- Jananipriyadharshini
- Bhargavi

---

# 📜 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, don't forget to star the repository!