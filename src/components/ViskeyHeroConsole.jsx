import React, { useState } from "react";
import { Plus, ArrowUp, TrendingUp, Users, Search, ShieldAlert, Layers, Rocket } from "lucide-react";

export function ViskeyHeroConsole({ onTriggerPrompt, onOpenPitchModal }) {
  const [promptText, setPromptText] = useState("");

  const handleChipClick = (actionType) => {
    if (actionType === "pitch") {
      onOpenPitchModal();
    } else {
      onTriggerPrompt(actionType, promptText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    onTriggerPrompt("general", promptText.trim());
  };

  return (
    <div className="relative w-full py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto animate-fade-in">
      {/* Viskey Hero Split Grid with Animated Black Doll Mascot on Left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column (35%): 3D Black Doll Mascot Animation coming from the left */}
        <div className="lg:col-span-4 relative flex items-center justify-center animate-mascot-enter">
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-slate-200/80 flex items-center justify-center relative bg-gradient-to-b from-slate-50 to-white shadow-sm">
            <div className="w-48 h-48 rounded-full border border-slate-200/60 flex items-center justify-center">
              {/* Animated Black Doll Mascot Asset */}
              <div className="relative animate-mascot-float">
                <div className="w-40 h-40 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-850 rounded-full shadow-2xl flex items-center justify-center border-4 border-white relative overflow-hidden">
                  {/* Mascot Face & Blinking Eyes */}
                  <div className="flex items-center gap-5 relative z-10 animate-eye-blink">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md">
                      <div className="w-4 h-4 rounded-full bg-slate-950 translate-x-0.5"></div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md">
                      <div className="w-4 h-4 rounded-full bg-slate-950 translate-x-0.5"></div>
                    </div>
                  </div>

                  {/* Mascot Ears */}
                  <div className="absolute -top-5 left-7 w-7 h-14 bg-slate-900 rounded-t-full border-2 border-white"></div>
                  <div className="absolute -top-5 right-7 w-7 h-14 bg-slate-900 rounded-t-full border-2 border-white"></div>
                  {/* Cute Tail */}
                  <div className="absolute bottom-2 right-2 w-5 h-8 bg-slate-900 rounded-r-full rotate-45 border border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (65%): Headline, Subtext, Floating Input Box tailored to AI Startup Validator */}
        <div className="lg:col-span-8 space-y-6 text-left">
          <div className="space-y-3">
            <h1
              className="text-4xl sm:text-6xl font-normal text-slate-900 tracking-tight leading-[1.08]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Let your AI startup validator get started.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-semibold">
              Tell VentureVal what startup concept you want to validate.
            </p>
          </div>

          {/* Floating Input Box tailored to AI Startup Idea Validator */}
          <form
            onSubmit={handleSubmit}
            className="viskey-input-box p-4 rounded-3xl bg-white space-y-4 max-w-2xl border border-slate-200 shadow-lg"
          >
            <input
              type="text"
              placeholder="Ask VentureVal to validate a startup idea or pitch a vision..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-transparent px-2 py-1 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />

            {/* Project Action Chips Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => handleChipClick("pitch")}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  title="Pitch Custom Vision"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-300">|</span>

                <button
                  type="button"
                  onClick={() => handleChipClick("market")}
                  className="viskey-chip px-2.5 py-1 flex items-center gap-1 cursor-pointer"
                >
                  <TrendingUp className="w-3 h-3 text-indigo-600" />
                  <span>Market TAM</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChipClick("customer")}
                  className="viskey-chip px-2.5 py-1 flex items-center gap-1 cursor-pointer"
                >
                  <Users className="w-3 h-3 text-purple-600" />
                  <span>Customer ICP</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChipClick("competitors")}
                  className="viskey-chip px-2.5 py-1 flex items-center gap-1 cursor-pointer"
                >
                  <Search className="w-3 h-3 text-emerald-600" />
                  <span>Tavily Rivals</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChipClick("mvp")}
                  className="viskey-chip px-2.5 py-1 flex items-center gap-1 cursor-pointer"
                >
                  <Layers className="w-3 h-3 text-amber-600" />
                  <span>MoSCoW MVP</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChipClick("gtm")}
                  className="viskey-chip px-2.5 py-1 flex items-center gap-1 cursor-pointer"
                >
                  <Rocket className="w-3 h-3 text-sky-600" />
                  <span>GTM Strategy</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center transition cursor-pointer shrink-0 shadow-xs"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
