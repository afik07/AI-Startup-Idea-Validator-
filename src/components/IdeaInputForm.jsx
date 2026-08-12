import React, { useState } from "react";
import { User, Rocket, Briefcase, Target, Lightbulb, Send, Sparkles, Cpu, ChevronDown } from "lucide-react";
import { AVAILABLE_MODELS } from "../agents/types";

export function IdeaInputForm({ onSubmitIdea, isRunning, selectedModel, onSelectModel }) {
  const [founderName, setFounderName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [targetIndustry, setTargetIndustry] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim() || !problem.trim() || !solution.trim()) return;

    onSubmitIdea({
      founderName: founderName.trim() || "Anonymous Founder",
      title: projectName.trim(),
      domain: targetIndustry || "Artificial Intelligence & ML",
      description: `PROBLEM: ${problem.trim()}\n\nSOLUTION: ${solution.trim()}`,
      problem: problem.trim(),
      solution: solution.trim(),
      region: "Global",
      pricingModel: "Subscription / Usage SaaS"
    });
  };

  return (
    <div className="pitch-card rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8 max-w-4xl mx-auto border border-slate-800/80">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 tracking-tight">
          Pitch Your Vision
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-medium">
          Submit your model. Validate your startup.
        </p>
      </div>

      {/* Main Pitch Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Founder Name & Project Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Founder Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Founder Name
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Mercer"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl pitch-input text-slate-100 text-sm focus:outline-none placeholder:text-slate-600 font-medium"
            />
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-purple-400" />
              Project Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NexusGuard"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl pitch-input text-slate-100 text-sm focus:outline-none placeholder:text-slate-600 font-medium"
            />
          </div>
        </div>

        {/* Row 2: Target Industry Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            Target Industry *
          </label>
          <div className="relative">
            <select
              required
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl pitch-input text-slate-100 text-sm focus:outline-none appearance-none cursor-pointer font-medium pr-10"
            >
              <option value="" disabled className="bg-slate-900 text-slate-500">
                Select an Industry
              </option>
              <option value="Artificial Intelligence & Machine Learning" className="bg-slate-900 text-white">
                Artificial Intelligence & Machine Learning
              </option>
              <option value="B2B Enterprise SaaS" className="bg-slate-900 text-white">
                B2B Enterprise SaaS
              </option>
              <option value="FinTech & Financial Infrastructure" className="bg-slate-900 text-white">
                FinTech & Financial Infrastructure
              </option>
              <option value="HealthTech & BioTech" className="bg-slate-900 text-white">
                HealthTech & BioTech
              </option>
              <option value="Cybersecurity & Data Privacy" className="bg-slate-900 text-white">
                Cybersecurity & Data Privacy
              </option>
              <option value="EdTech & Workforce Learning" className="bg-slate-900 text-white">
                EdTech & Workforce Learning
              </option>
              <option value="E-Commerce & Consumer Retail" className="bg-slate-900 text-white">
                E-Commerce & Consumer Retail
              </option>
              <option value="ClimateTech & Clean Energy" className="bg-slate-900 text-white">
                ClimateTech & Clean Energy
              </option>
              <option value="LegalTech & Regulatory Compliance" className="bg-slate-900 text-white">
                LegalTech & Regulatory Compliance
              </option>
              <option value="DevTools & Cloud Infrastructure" className="bg-slate-900 text-white">
                DevTools & Cloud Infrastructure
              </option>
              <option value="Hardware & Robotics / IoT" className="bg-slate-900 text-white">
                Hardware & Robotics / IoT
              </option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Row 3: The Problem */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-400" />
            The Problem *
          </label>
          <textarea
            required
            rows={3}
            placeholder="What critical issue are you solving?"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl pitch-input text-slate-100 text-sm focus:outline-none placeholder:text-slate-600 leading-relaxed font-medium"
          />
        </div>

        {/* Row 4: The Solution */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            The Solution *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Describe your technical approach and how it addresses the problem..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl pitch-input text-slate-100 text-sm focus:outline-none placeholder:text-slate-600 leading-relaxed font-medium"
          />
        </div>

        {/* Row 5: LLM Model selector */}
        <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-mono">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            AI Orchestration Engine:
          </span>
          <select
            value={selectedModel}
            onChange={(e) => onSelectModel(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none cursor-pointer"
          >
            {AVAILABLE_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Row 6: Submit Pitch Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isRunning}
            className={`w-full py-4 rounded-2xl font-bold text-base text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isRunning
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                : "bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 hover:scale-[1.01] active:scale-[0.99]"
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Validating Pitch with Multi-Agent Intelligence...</span>
              </>
            ) : (
              <>
                <span>Submit Pitch</span>
                <Send className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
