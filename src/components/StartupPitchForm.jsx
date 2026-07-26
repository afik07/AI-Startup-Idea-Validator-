import React, { useState } from 'react';
import { Rocket, Lightbulb, Target, Cpu, Send, User, CheckCircle, AlertCircle, TrendingUp, Zap, Shield } from 'lucide-react';

export default function StartupPitchForm() {
  const [formData, setFormData] = useState({
    founderName: '', startupName: '', industry: '', problem: '', solution: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `Server error ${res.status}` }));
        throw new Error(err.error || `Server error ${res.status}`);
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult({ ...data.result, sources: data.marketSources });
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message === 'Load failed') {
        setError('Cannot reach the backend. Make sure you ran: node server.js in a separate terminal.');
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 75) return 'from-green-500 to-emerald-500';
    if (score >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 sm:p-8 font-sans">
      <div className="max-w-3xl w-full space-y-6">

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative p-8 sm:p-12">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight">
                Pitch Your Vision
              </h1>
              <p className="text-gray-400 mt-3 text-lg">Submit your model. Validate your startup with live AI research.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="flex items-center text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                    <User className="w-4 h-4 mr-2" /> Founder Name
                  </label>
                  <input type="text" name="founderName" required value={formData.founderName} onChange={handleChange}
                    className="w-full bg-white/5 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
                </div>
                <div className="space-y-2 group">
                  <label className="flex items-center text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                    <Rocket className="w-4 h-4 mr-2" /> Project Name
                  </label>
                  <input type="text" name="startupName" placeholder="e.g. NexusGuard" required value={formData.startupName} onChange={handleChange}
                    className="w-full bg-white/5 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                  <Cpu className="w-4 h-4 mr-2" /> Target Industry
                </label>
                <select name="industry" required value={formData.industry} onChange={handleChange}
                  className="w-full bg-slate-800 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all">
                  <option value="" disabled>Select an Industry</option>
                  <option value="IoT & Hardware">Internet of Things (IoT) / Hardware</option>
                  <option value="AI & Machine Learning">Artificial Intelligence & ML</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthtech & Safety">Healthtech & Safety</option>
                  <option value="Enterprise SaaS">Enterprise SaaS</option>
                </select>
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                  <Target className="w-4 h-4 mr-2" /> The Problem
                </label>
                <textarea name="problem" rows="3" placeholder="What critical issue are you solving?" required value={formData.problem} onChange={handleChange}
                  className="w-full bg-white/5 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none" />
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                  <Lightbulb className="w-4 h-4 mr-2" /> The Solution
                </label>
                <textarea name="solution" rows="4" placeholder="Describe your technical approach..." required value={formData.solution} onChange={handleChange}
                  className="w-full bg-white/5 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none" />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Researching Market & Validating...
                    </div>
                  ) : (
                    <> Validate My Startup <Send className="w-5 h-5 ml-2" /> </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Card */}
        {result && (
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" /> Validation Report
              </h2>
              <div className="text-center">
                <div className={`text-5xl font-extrabold ${getScoreColor(result.score)}`}>{result.score}</div>
                <div className="text-xs text-gray-400 mt-1">/ 100</div>
              </div>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-white/10 rounded-full h-3">
              <div className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradient(result.score)} transition-all duration-1000`}
                style={{ width: `${result.score}%` }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                  <TrendingUp className="w-4 h-4" /> Market Fit
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{result.marketFitAnalysis}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  <Zap className="w-4 h-4" /> Technical Feasibility
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{result.technicalFeasibility}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                  <Shield className="w-4 h-4" /> Competitive Edge
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{result.competitiveAdvantage}</p>
              </div>
            </div>

            {/* Sources */}
            {result.sources?.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Live Research Sources</p>
                <div className="space-y-2">
                  {result.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-purple-500/50 transition-colors group">
                      <span className="text-purple-400 font-bold text-xs mt-0.5 shrink-0">{i + 1}</span>
                      <div>
                        <p className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">{s.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{s.content?.substring(0, 100)}...</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => { setResult(null); setFormData({ founderName: '', startupName: '', industry: '', problem: '', solution: '' }); }}
              className="w-full py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm font-medium">
              Validate Another Idea
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
