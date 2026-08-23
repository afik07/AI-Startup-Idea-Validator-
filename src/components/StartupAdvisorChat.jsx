import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Copy, Check, Trash2, ArrowUpRight, RotateCcw, ThumbsUp, MessageSquare, Zap, ShieldAlert, DollarSign, Mail, PieChart, Key, ExternalLink, ShieldCheck } from "lucide-react";
import { askStartupAdvisor } from "../agents/startupAdvisorChatbot.js";

export function StartupAdvisorChat({ report, apiKeys, selectedModel, onSaveApiKeys }) {
  const [messages, setMessages] = useState([
    {
      id: "intro-1",
      sender: "advisor",
      text: `Hello! I'm your AI Startup Co-Pilot & VC Advisor for **${report?.idea?.title || "your concept"}**.\n\nI've analyzed your complete multi-agent validation audit—including your **$${report?.market?.tamVal || 28}B TAM**, customer ICP, competitor moats, SWOT risks, and **${report?.comparison?.validationScore || 88}/100 viability score**.\n\nAsk me anything! For example:\n- *"Gimme the exact sensors that must be equipped on the soil probes"*\n- *"Tell me the 18-month budget plan and runway breakdown for this project"*\n- *"Write a 3-part cold email sequence to acquire my first 10 customers"*\n- *"What are the unit economics (CAC, LTV, payback period)?"*\n- *"Give me a 10-slide pitch deck structure for seed investors"*`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set());
  const [inlineApiKey, setInlineApiKey] = useState("");
  const [keySavedMessage, setKeySavedMessage] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  const hasApiKey = Boolean(apiKeys?.openRouterApiKey && apiKeys.openRouterApiKey.trim().length > 0);

  const promptCards = [
    {
      title: "Required Sensor Hardware",
      desc: "Exact sensor specs (NPK, pH, FDR moisture, ESP32)",
      icon: Zap,
      prompt: "Gimme the exact hardware sensors that must be equipped on the soil probes."
    },
    {
      title: "18-Month Budget Plan",
      desc: "Line-item $500k allocation, runway, and burn rate",
      icon: DollarSign,
      prompt: "Tell me the 18-month budget plan, financial runway, and capital allocation for this project."
    },
    {
      title: "Cold Email Sequence",
      desc: "Draft a 3-part outreach sequence to farm co-ops and target buyers",
      icon: Mail,
      prompt: "Write a high-converting 3-part cold email sequence targeting my ideal customer profile."
    },
    {
      title: "10-Slide Pitch Deck",
      desc: "Slide-by-slide investor deck structure with key metrics",
      icon: Sparkles,
      prompt: "Generate a 10-slide investor pitch deck outline with exact slide titles and talking points."
    },
    {
      title: "CAC / LTV Economics",
      desc: "Calculate 3-tier pricing, gross margins, and payback period",
      icon: PieChart,
      prompt: "Break down the unit economics: recommend a 3-tier pricing model, CAC, LTV, and payback period."
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Auto-resize textarea like ChatGPT
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputQuery]);

  const handleSaveInlineKey = () => {
    if (!inlineApiKey.trim()) return;
    const updated = {
      ...(apiKeys || {}),
      openRouterApiKey: inlineApiKey.trim()
    };
    if (onSaveApiKeys) {
      onSaveApiKeys(updated);
    } else {
      localStorage.setItem("gammaval_api_keys", JSON.stringify(updated));
    }
    setKeySavedMessage(true);
    setTimeout(() => setKeySavedMessage(false), 3000);
  };

  const handleSendMessage = async (customPrompt) => {
    const textToSend = customPrompt || inputQuery;
    if (!textToSend.trim() || isThinking) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const activeKey = apiKeys?.openRouterApiKey || inlineApiKey.trim();
      const reply = await askStartupAdvisor({
        report,
        chatHistory: messages,
        userQuestion: textToSend.trim(),
        options: {
          openRouterApiKey: activeKey,
          model: selectedModel || "google/gemini-2.0-flash-001"
        }
      });

      const assistantMsg = {
        id: `advisor-${Date.now()}`,
        sender: "advisor",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Advisor chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "advisor",
          text: `⚠️ **AI Gateway Notice:** ${err.message}. Please connect your free Google Gemini or OpenRouter API key above to chat in real-time.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleClearChat = () => {
    if (window.confirm("Clear current conversation history?")) {
      setMessages([
        {
          id: "intro-fresh",
          sender: "advisor",
          text: `Conversation reset. Ready to answer any custom question about **${report?.idea?.title || "your startup"}**!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  };

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-6 max-w-5xl mx-auto text-left shadow-xl border border-slate-200/90 relative overflow-hidden animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-slate-950 text-white shadow-md">
            <Bot className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-sans tracking-tight">
                GammaVal AI Startup Co-Pilot
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1 ${
                hasApiKey
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${hasApiKey ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
                {hasApiKey ? "Live LLM Active" : "Connect API Key for Real AI"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Discussing: <strong className="text-slate-700">{report?.idea?.title}</strong> • {report?.idea?.domain}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-mono text-slate-500 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer bg-white"
          title="Reset chat memory"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Inline Connect API Key Prompt (If not connected yet) */}
      {!hasApiKey && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-indigo-50/50 to-white border border-amber-200/90 space-y-2.5 animate-fade-in shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Key className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Connect Free Google Gemini or OpenRouter API Key for 100% Real Live AI Answering</span>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-mono font-bold text-indigo-600 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Get Free Gemini Key (Instant)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="Paste Google Gemini (AIzaSy...) or OpenRouter (sk-or-...) key here..."
              value={inlineApiKey}
              onChange={(e) => setInlineApiKey(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
            <button
              onClick={handleSaveInlineKey}
              disabled={!inlineApiKey.trim()}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition disabled:opacity-40 cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Activate Real AI</span>
            </button>
          </div>

          {keySavedMessage && (
            <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>API Key saved securely! You can now ask any question with full live AI.</span>
            </p>
          )}
        </div>
      )}

      {/* Quick Starter Prompt Cards */}
      {messages.length <= 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {promptCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(card.prompt)}
                disabled={isThinking}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-teal-600 transition flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-teal-600" />
                    {card.title}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-teal-500 transition" />
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {card.desc}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="h-[460px] overflow-y-auto rounded-3xl bg-slate-50/70 p-4 sm:p-6 border border-slate-200 space-y-5 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
              msg.sender === "user" ? "bg-slate-900 text-white" : "bg-slate-950 text-white"
            }`}>
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-teal-400" />}
            </div>

            {/* Message Bubble */}
            <div className={`p-4 sm:p-5 rounded-2xl max-w-2xl text-xs leading-relaxed space-y-2 relative group font-sans ${
              msg.sender === "user"
                ? "bg-slate-900 text-white rounded-tr-none shadow-md"
                : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-xs"
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed font-medium">
                {msg.text}
              </div>

              {/* Message Bottom Action Bar for Assistant */}
              {msg.sender === "advisor" && (
                <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-[10px]">{msg.timestamp || "Just now"}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(msg.id)}
                      className={`p-1 rounded hover:bg-slate-100 transition cursor-pointer ${
                        likedIds.has(msg.id) ? "text-teal-600 font-bold" : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Helpful response"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition flex items-center gap-1 cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4 text-teal-400 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-mono shadow-xs flex items-center gap-2.5">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span>Live LLM is reasoning and generating your custom answer...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ChatGPT-style Bottom Prompt Input Box */}
      <div className="relative rounded-2xl border border-slate-300 bg-white shadow-sm focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200 transition p-2 flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Ask anything about your startup (e.g. 'Gimme the exact sensors to equip' or 'What is our 18-month budget?')..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isThinking}
          className="flex-1 max-h-32 p-2.5 bg-transparent text-xs text-slate-900 placeholder:text-slate-400 font-medium resize-none focus:outline-none scrollbar-thin"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isThinking}
          className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white transition disabled:opacity-30 disabled:hover:bg-slate-950 flex items-center justify-center cursor-pointer shadow-xs shrink-0"
          title="Send message (Enter)"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
        <span>Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new line</span>
        <span>Connected to Google Gemini & OpenRouter Gateway</span>
      </div>
    </div>
  );
}
