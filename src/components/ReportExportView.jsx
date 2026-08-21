import React, { useState } from "react";
import { Download, FileText, Check, Copy } from "lucide-react";

export function ReportExportView({ report }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const generateMarkdown = () => {
    const { idea, market, customer, competitors, comparison, swotRisk, mvp, gtm, durationSeconds, completedAt } = report;

    return `# GammaVal™ AI Startup Idea Validation Report
**Project Title:** ${idea.title}  
**Domain:** ${idea.domain}  
**Validation Date:** ${completedAt}  
**Orchestration Duration:** ${durationSeconds} seconds  

---

## Executive Summary & Verdict
- **Validation Score:** ${comparison.validationScore}/100
- **Official Verdict:** ${comparison.verdict}
- **Verdict Rationale:** ${comparison.verdictSummary}
- **Unique Value Proposition (UVP):** ${comparison.uniqueValueProposition}

---

## 1. Market Opportunity Analysis (Industry Agent)
- **Industry Category:** ${market.industryName}
- **Total Addressable Market (TAM):** $${market.tamVal} Billion
- **Serviceable Addressable Market (SAM):** $${market.samVal} Billion
- **Serviceable Obtainable Market (SOM):** $${market.somVal} Million
- **Growth Rate (CAGR):** ${market.cagr}%
- **Market Stage:** ${market.marketStage}

---

## 2. Customer Segmentation & ICP (Consumer Agent)
- **Ideal Customer Profile (ICP):** ${customer.icpSummary}
- **Pain Point Severity Rating:** ${customer.painPointSeverity}/10
- **Willingness to Pay:** ${customer.willingnessToPay}
- **Estimated ARPU:** ${customer.estimatedArpu}

---

## 3. Competitor Discovery (Tavily Search Agent)
- **Market Saturation Level:** ${competitors.marketSaturation}
- **Discovered Competitors:**
${competitors.competitors?.map((c) => `  - **${c.name}** (${c.websiteUrl}) - Pricing: ${c.estimatedPricing}\n    - Target: ${c.targetTier} | Moat: ${c.primaryMoat}`).join("\n")}

---

## 4. SWOT & Risk Profile (Agent 5 - Milestone 3)
- **Overall Risk Index:** ${swotRisk?.riskScores?.overallRiskIndex}/100
- **Competitor Risk:** ${swotRisk?.riskScores?.competitorRisk}/100 | **Demand Risk:** ${swotRisk?.riskScores?.marketDemandRisk}/100
- **Regulatory Risk:** ${swotRisk?.riskScores?.regulatoryRisk}/100 | **Execution Risk:** ${swotRisk?.riskScores?.executionRisk}/100
- **Strengths:** ${swotRisk?.swot?.strengths?.map((s) => s.title).join("; ")}
- **Weaknesses:** ${swotRisk?.swot?.weaknesses?.map((w) => w.title).join("; ")}

---

## 5. MVP MoSCoW Feature Roadmap (Agent 6 - Milestone 3)
- **MVP Overview:** ${mvp?.mvpOverview}
- **Estimated Build Time:** ${mvp?.recommendedLaunchWeeks} Weeks
- **Must Have Features:**
${mvp?.moscowFeatures?.mustHave?.map((m) => `  - **${m.featureName}:** ${m.userStory} (Impact: ${m.impact})`).join("\n")}

---

## 6. Go-To-Market Execution Plan (Agent 7 - Milestone 3)
- **Positioning Statement:** ${gtm?.positioningStatement}
- **First 100 Customers Playbook:** ${gtm?.first100CustomersPlaybook}
- **Pricing Tier:** ${gtm?.pricingOptimization?.recommendedTier}
- **90-Day Milestones:**
${gtm?.launchTimeline90Days?.map((m) => `  ### ${m.phase}\n${m.milestones?.map((step) => `  - ${step}`).join("\n")}`).join("\n\n")}
`;
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateMarkdown();
    const blob = new Blob([mdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.idea.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_gammaval_audit.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const jsonContent = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.idea.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_gammaval_kb.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-6 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Download className="w-4 h-4 text-slate-900" />
            REPORT EXPORTER & KNOWLEDGE BASE ARTIFACTS
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Export Full Milestone 1, 2 & 3 Validation Audit
          </h3>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-700" />}
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Download Markdown (.md)
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download JSON KB
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs space-y-2">
        <div className="text-slate-400 font-bold">// Sample Milestone 1-3 Markdown Artifact Preview</div>
        <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300 max-h-56 scrollbar-thin">
          {generateMarkdown().substring(0, 1000)}...
        </pre>
      </div>
    </div>
  );
}
