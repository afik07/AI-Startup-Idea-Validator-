import React, { useState, useRef } from "react";
import { User, Rocket, Target, Lightbulb, ArrowRight, ChevronDown, Sparkles, Building2, UploadCloud, FileText, Image as ImageIcon, CheckCircle2, X } from "lucide-react";
import { AVAILABLE_MODELS } from "../agents/types";

export function IdeaInputForm({ onSubmitIdea, isRunning, selectedModel, onSelectModel }) {
  const [formData, setFormData] = useState({
    founderName: "",
    title: "",
    domain: "B2B SaaS / AI Tools",
    problem: "",
    solution: "",
    region: "Global",
    pricingModel: "Subscription SaaS"
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const industryOptions = [
    "AgriTech / Precision Farming",
    "Hardware / IoT",
    "ClimateTech / Sustainability",
    "B2B SaaS / AI Tools",
    "Consumer Health / HealthTech",
    "EdTech / AI Gaming",
    "FinTech / Creator Economy",
    "Cybersecurity / Enterprise",
    "E-Commerce / D2C AI",
    "LegalTech / Compliance",
    "DevTools / Infrastructure"
  ];

  const formatFileSize = (bytes) => {
    if (!bytes) return "1.2 MB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|bmp|gif)$/i.test(file.name);
    const sizeFormatted = formatFileSize(file.size);

    if (isImg) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedFile({
          name: file.name,
          type: file.type || "image/jpeg",
          size: file.size,
          sizeFormatted,
          isImage: true,
          dataUrl: event.target.result,
          textContent: null
        });

        // Auto-fill title if empty
        if (!formData.title) {
          const autoTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setFormData((prev) => ({ ...prev, title: autoTitle.charAt(0).toUpperCase() + autoTitle.slice(1) }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedFile({
          name: file.name,
          type: file.type || "application/pdf",
          size: file.size,
          sizeFormatted,
          isImage: false,
          dataUrl: null,
          textContent: event.target.result
        });

        if (!formData.title) {
          const autoTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setFormData((prev) => ({ ...prev, title: autoTitle.charAt(0).toUpperCase() + autoTitle.slice(1) }));
        }
      };

      if (/\.(txt|md|json|csv)$/i.test(file.name)) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title && !attachedFile) {
      alert("Please fill in the project title or attach a startup idea document/image.");
      return;
    }

    const problemText = formData.problem || `Critical market bottlenecks extracted from ${attachedFile?.name || "startup concept"}.`;
    const solutionText = formData.solution || `Automated intelligent architecture documented in ${attachedFile?.name || "product proposal"}.`;

    onSubmitIdea({
      ...formData,
      problem: problemText,
      solution: solutionText,
      description: `${problemText} Solution: ${solutionText}`,
      attachedDocument: attachedFile
    });
  };

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-6 max-w-4xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-slate-900" />
            PITCH YOUR VISION FORM
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Pitch Your Startup Concept
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter your custom idea or upload a pitch deck, whiteboard note, or PDF document for AI due diligence.
          </p>
        </div>

        {/* LLM Model Gateway Selector */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 font-bold hidden sm:inline">AI Gateway:</span>
          <select
            value={selectedModel}
            onChange={(e) => onSelectModel(e.target.value)}
            className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs focus:outline-none cursor-pointer"
          >
            {AVAILABLE_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional Document Upload Zone */}
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.txt,.md,.json,.csv,.jpg,.jpeg,.png,.webp"
          className="hidden"
        />

        {!attachedFile ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 px-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 transition flex items-center justify-center gap-3 cursor-pointer group text-slate-600"
          >
            <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition" />
            <div className="text-left text-xs">
              <span className="font-bold text-slate-900">Upload Startup Document or JPG/PNG Pitch Deck</span>
              <span className="text-slate-500 block text-[11px]">Supports PDF, JPG, PNG, DOCX, TXT — AI will inspect the document and validate</span>
            </div>
          </button>
        ) : (
          <div className="p-3 px-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 min-w-0">
              {attachedFile.isImage && attachedFile.dataUrl ? (
                <img
                  src={attachedFile.dataUrl}
                  alt="Doc Preview"
                  className="w-9 h-9 rounded-lg object-cover border border-indigo-200 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-white border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
              )}
              <div className="truncate">
                <div className="flex items-center gap-2 font-bold text-slate-900 truncate">
                  <span className="truncate">{attachedFile.name}</span>
                  <span className="text-[10px] font-mono text-indigo-700 font-semibold">({attachedFile.sizeFormatted})</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Document attached for vision due diligence
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setAttachedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="p-1.5 rounded-full hover:bg-indigo-100 text-slate-500 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Pitch Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Founder Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Founder Name
            </label>
            <input
              type="text"
              value={formData.founderName}
              onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-400"
            />
          </div>

          {/* Project Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-slate-500" />
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. AI Dental Radiology Co-Pilot"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-400"
            />
          </div>
        </div>

        {/* Industry Domain & Region */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              Industry Domain
            </label>
            <div className="relative">
              <select
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium appearance-none focus:outline-none focus:bg-white focus:border-slate-400 cursor-pointer"
              >
                {industryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-slate-500" />
              Target Region
            </label>
            <input
              type="text"
              required
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              placeholder="e.g. North America, EU, Global"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-slate-500" />
              Pricing Model
            </label>
            <input
              type="text"
              required
              value={formData.pricingModel}
              onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value })}
              placeholder="e.g. $199/mo B2B SaaS"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-400"
            />
          </div>
        </div>

        {/* Problem Statement */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-slate-500" />
            Problem Statement (What pain point are you solving?)
          </label>
          <textarea
            rows={2}
            value={formData.problem}
            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
            placeholder="Describe the critical bottleneck or market pain (or leave blank if documented in uploaded file)..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-400"
          />
        </div>

        {/* Solution Statement */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-slate-500" />
            Solution (How does your product solve it?)
          </label>
          <textarea
            rows={2}
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            placeholder="Describe your unique value proposition, tech architecture, or wedge (or leave blank if in uploaded document)..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-400"
          />
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isRunning}
            className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>{isRunning ? "Executing 7-Agent Vision Validation Pipeline..." : "Validate My Startup Concept"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
