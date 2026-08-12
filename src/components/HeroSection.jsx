import React from "react";
import { ArrowDown, Sparkles, Zap, ShieldCheck, TrendingUp, Search } from "lucide-react";

export function HeroSection({ onBeginJourney }) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#001c33] text-white flex flex-col justify-between">
      {/* Fullscreen Looping Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-screen"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Glassmorphic Top Navigation Bar */}
      <nav className="relative z-10 flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <div
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white cursor-pointer select-none flex items-center gap-2.5"
          onClick={onBeginJourney}
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold tracking-tight">VentureVal</span>
          <sup className="text-xs font-mono font-bold text-indigo-400">™ AI</sup>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
          <button onClick={onBeginJourney} className="text-white font-bold transition-colors">
            Idea Validator
          </button>
          <button onClick={onBeginJourney} className="hover:text-white transition-colors">
            Agent Pipeline
          </button>
          <button onClick={onBeginJourney} className="hover:text-white transition-colors">
            Tavily Search
          </button>
          <button onClick={onBeginJourney} className="hover:text-white transition-colors">
            VC Scorecard
          </button>
        </div>

        {/* Top CTA Button */}
        <button
          onClick={onBeginJourney}
          className="liquid-glass rounded-full px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:scale-[1.03] transition-transform cursor-pointer shadow-lg shadow-indigo-500/10 flex items-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-300 fill-indigo-300" />
          Validate Pitch
        </button>
      </nav>

      {/* Hero Content Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-36 py-[90px] max-w-6xl mx-auto my-auto space-y-8">
        {/* Live System Badge */}
        <div className="animate-fade-rise inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-indigo-300 font-mono text-xs font-semibold shadow-inner backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>AUTONOMOUS MULTI-AGENT SYSTEM • OPENROUTER & TAVILY INTEGRATED</span>
        </div>

        {/* Main H1 Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.96] tracking-tight max-w-5xl text-white animate-fade-rise">
          Validate Your Vision. <br className="hidden sm:inline" />
          <em className="not-italic text-slate-400">Pitch Your Startup.</em>
        </h1>

        {/* Subtext Paragraph */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed animate-fade-rise-delay font-medium">
          Transform raw startup concepts into VC-grade due diligence reports. Powered by Autonomous AI Agents, live Tavily web competitor discovery, and TAM/SAM/SOM financial analytics.
        </p>

        {/* Main Hero CTA Button */}
        <div className="animate-fade-rise-delay-2 pt-2">
          <button
            onClick={onBeginJourney}
            className="liquid-glass rounded-full px-12 py-5 text-sm sm:text-base font-extrabold uppercase tracking-wider text-white hover:scale-[1.03] cursor-pointer transition-transform shadow-2xl flex items-center gap-3 group border border-indigo-500/40"
          >
            <span>Pitch Your Vision & Validate</span>
            <ArrowDown className="w-4 h-4 text-indigo-300 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Feature Pillar Badges */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-xl py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>1. Market Opportunity Agent (TAM/SAM/SOM)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>2. Customer ICP Segmentation Agent</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <span>3. Tavily Live Web Competitor Agent</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>4. VC Scorecard & Strategy Agent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
