import React, { useState } from "react";
import { Download, FileText, Check, Copy, Printer, BookmarkCheck, Bookmark, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { exportAuditPdf } from "../utils/pdfGenerator.js";
import { generateStructuredReportDocument } from "../agents/reportGenerationAgent.js";

export function ReportExportView({ report, onSaveProject, isSaved }) {
  const [copied, setCopied] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!report) return null;

  const handleDownloadPdf = () => {
    setIsPdfGenerating(true);
    try {
      exportAuditPdf(report);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Error generating PDF. You can also export Markdown or use Print.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    const mdContent = generateStructuredReportDocument(report);
    navigator.clipboard.writeText(mdContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateStructuredReportDocument(report);
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

  const handleTriggerSave = () => {
    if (onSaveProject) {
      onSaveProject(report);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Download className="w-4 h-4 text-slate-900" />
            MILESTONE 4 REPORT GENERATION AGENT
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Export Executive Validation Audit & Deliverables
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Download Multi-Page PDF Memorandum, Markdown Specification, or Save to Project Vault
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Save Button */}
          <button
            onClick={handleTriggerSave}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isSaved || savedSuccess
                ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
            }`}
          >
            {isSaved || savedSuccess ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5 text-slate-700" />}
            <span>{savedSuccess ? "Saved to Projects!" : isSaved ? "Project Saved" : "Save Project"}</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isPdfGenerating}
            className="px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isPdfGenerating ? "Generating PDF..." : "Download Executive PDF"}</span>
          </button>

          {/* Copy Markdown Button */}
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-700" />}
            <span>{copied ? "Copied Markdown!" : "Copy Markdown"}</span>
          </button>
        </div>
      </div>

      {/* 3-Column Export Formats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PDF Executive Memo */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Executive PDF Memorandum</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete investor-grade PDF document formatted with cover stats, TAM models, competitor matrix, SWOT risk charts, and 90-day GTM roadmap.
            </p>
          </div>
          <button
            onClick={handleDownloadPdf}
            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .PDF</span>
          </button>
        </div>

        {/* Markdown Spec */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Copy className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Markdown Due Diligence (.md)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean GitHub-flavored Markdown text file ideal for pasting into Notion, Google Docs, Slack, or GitHub pull requests.
            </p>
          </div>
          <button
            onClick={handleDownloadMarkdown}
            className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>
        </div>

        {/* JSON Knowledge Base */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Machine JSON Payload</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full structured JSON knowledge base export containing raw agent metrics, Tavily competitor queries, and MoSCoW objects.
            </p>
          </div>
          <button
            onClick={handleDownloadJson}
            className="w-full py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .JSON</span>
          </button>
        </div>
      </div>

      {/* Raw Markdown Report Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            Synthesized Due Diligence Document Preview
          </h4>
          <span className="text-[11px] font-mono text-slate-400">
            {generateStructuredReportDocument(report).length} characters
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-5 text-xs font-mono leading-relaxed h-80 overflow-y-auto whitespace-pre-wrap selection:bg-slate-700 scrollbar-thin">
          {generateStructuredReportDocument(report)}
        </div>
      </div>
    </div>
  );
}
