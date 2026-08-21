import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { askStartupAdvisor } from "../agents/startupAdvisorChatbot";

export function StartupAdvisorChat({ report, apiKeys, selectedModel }) {
  const [messages, setMessages] = useState([
    {
      sender: "advisor",
      text: `Hello! I am your AI Startup Advisor for **${report?.idea?.title || "your pitch"}**.\n\nI have ingested your complete validation knowledge base (Market TAM, Customer ICP, Tavily Rivals, SWOT & Risk, MoSCoW MVP, GTM Strategy).\n\nAsk me any follow-up question, or click one of the quick prompt chips below!`
    }
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = [
    "🚀 Generate my 90-day launch playbook",
    "💬 Draft a cold outbound email to my ICP",
    "⚔️ How do I compete if a rival drops prices?",
    "🎤 Write a 30-second YC elevator pitch"
  ];

  const handleSendMessage = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isThinking) return;

    const userMsg = { sender: "user", text: textToSend.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);

    try {
      const answer = await askStartupAdvisor({
        report,
        chatHistory: messages,
        userQuestion: textToSend.trim(),
        options: {
          openRouterApiKey: apiKeys?.openRouterApiKey,
          model: selectedModel
        }
      });

      setMessages((prev) => [...prev, { sender: "advisor", text: answer }]);
    } catch (err) {
      console.error("Advisor chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "advisor", text: "I encountered an error retrieving advice. Please check your API keys or try again." }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="gamma-card p-6 sm:p-8 space-y-6 animate-fade-in text-left">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-950 text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              Conversational Startup Advisor
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                KB INGESTED
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Context-Aware AI Chatbot • Follow-up Queries & Strategic Execution
            </p>
          </div>
        </div>
      </div>

      {/* Quick Prompt Action Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
          Quick Action Prompts:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={isThinking}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 text-xs text-slate-700 font-semibold transition text-left cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="h-80 overflow-y-auto rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.sender === "user" ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-800"
            }`}>
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-4 rounded-2xl max-w-2xl text-xs leading-relaxed space-y-2 font-medium ${
              msg.sender === "user"
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-800 shadow-2xs"
            }`}>
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-slate-600 font-mono p-2">
            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            <span>Advisor is reasoning over your Knowledge Base...</span>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask your AI Startup Advisor any follow-up query..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          disabled={isThinking}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-400"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isThinking}
          className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
