import React from "react";
import { Download, FileText, Printer, Check, Copy } from "lucide-react";

export function ReportExportView({ report }) {
  const [copied, setCopied] = React.useState(false);

  if (!report) return null;

  const generateMarkdown = () => {
    const { idea, market, customer, competitors, comparison, durationSeconds, completedAt } = report;
    
    return `# AI Startup Idea Validation Report
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
- **Key Market Drivers:**
${market.marketDrivers?.map((d) => `  - ${d}`).join("\n")}
- **Regulatory & Industry Risks:**
${market.keyRisks?.map((r) => `  - ${r}`).join("\n")}

---

## 2. Customer Segmentation & ICP (Consumer Agent)
- **Ideal Customer Profile (ICP):** ${customer.icpSummary}
- **Pain Point Severity Rating:** ${customer.painPointSeverity}/10
- **Willingness to Pay:** ${customer.willingnessToPay}
- **Estimated ARPU:** ${customer.estimatedArpu}
- **Target Personas:**
${customer.personas?.map((p) => `  ### ${p.role}\n  - **Demographics:** ${p.demographics}\n  - **Core Pain Point:** ${p.corePainPoint}\n  - **Workaround:** ${p.currentWorkaround}\n  - **Buying Trigger:** ${p.buyingTrigger}`).join("\n\n")}

---

## 3. Competitor Discovery (Tavily Search Agent)
- **Market Saturation Level:** ${competitors.marketSaturation}
- **Discovered Competitors:**
${competitors.competitors?.map((c) => `  - **${c.name}** (${c.websiteUrl}) - Pricing: ${c.estimatedPricing}\n    - Target: ${c.targetTier} | Moat: ${c.primaryMoat}`).join("\n")}

---

## 4. Competitive Comparison & Strategy Matrix
- **Defensibility Moat:** ${comparison.defensibilityMoat} (${comparison.moatExplanation})
- **Market Gaps:**
${comparison.marketGaps?.map((g) => `  - ${g}`).join("\n")}
- **Actionable Recommendations:**
${comparison.actionableRecommendations?.map((a) => `  - ${a}`).join("\n")}
`;
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateMarkdown();
    const blob = new Blob([mdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.idea.title.toLowerCase().replace(/[^a-z0-0]/g, "_")}_validation_report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const jsonContent = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.idea.title.toLowerCase().replace(/[^a-z0-0]/g, "_")}_raw_report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <Download className="w-4 h-4" />
            Report Exporter & Shareable Artifacts
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Export Validation Audit</h3>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Download Markdown (.md)
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download JSON
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
        <div className="text-slate-300 font-bold">// Sample Markdown Artifact Preview</div>
        <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-400 max-h-48 scrollbar-thin">
          {generateMarkdown().substring(0, 800)}...
        </pre>
      </div>
    </div>
  );
}
