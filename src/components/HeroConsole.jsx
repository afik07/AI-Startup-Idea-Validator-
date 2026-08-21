import React, { useState, useRef } from "react";
import { Plus, ArrowUp, TrendingUp, Users, Search, MonitorPlay, FileText, Image as ImageIcon, X, UploadCloud, CheckCircle2 } from "lucide-react";

export function HeroConsole({ onTriggerPrompt, onOpenPitchModal }) {
  const [promptText, setPromptText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoPhase, setVideoPhase] = useState("entry"); // "entry" -> "idle"

  const fileInputRef = useRef(null);
  const entryVideoRef = useRef(null);
  const idleVideoRef = useRef(null);

  const entrySrc = "https://vida-web-assets.einsia.com/_astro/hero-enter.BlnsRWwY.webm";
  const idleSrc = "https://vida-web-assets.einsia.com/_astro/hero-idle-loop.Dyyoz8_a.webm";

  const formatFileSize = (bytes) => {
    if (!bytes) return "1.2 MB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = (file) => {
    if (!file) return;

    const isImg = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|bmp|gif)$/i.test(file.name);
    const sizeFormatted = formatFileSize(file.size);

    if (isImg) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAttachedFile({
          name: file.name,
          type: file.type || "image/jpeg",
          size: file.size,
          sizeFormatted,
          isImage: true,
          dataUrl: e.target.result,
          textContent: null
        });
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAttachedFile({
          name: file.name,
          type: file.type || "application/pdf",
          size: file.size,
          sizeFormatted,
          isImage: false,
          dataUrl: null,
          textContent: e.target.result
        });
      };
      // Try text read for txt/md/json, or dataUrl for others
      if (/\.(txt|md|json|csv)$/i.test(file.name)) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChipClick = (actionType) => {
    if (actionType === "pitch") {
      onOpenPitchModal();
    } else {
      onTriggerPrompt(actionType, promptText, attachedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!promptText.trim() && !attachedFile) return;
    onTriggerPrompt("general", promptText.trim(), attachedFile);
  };

  const handleEntryEnded = () => {
    setVideoPhase("idle");
    if (idleVideoRef.current) {
      idleVideoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="viskey-hero" aria-labelledby="viskey-hero-title">
      <div className="viskey-shell viskey-hero-shell">
        <div className="viskey-hero-copy">
          <h1 id="viskey-hero-title" className="viskey-hero-title">
            <span>Let your AI</span>
            <span>startup companion</span>
            <span>get started.</span>
          </h1>
          <p className="viskey-hero-subtitle">Tell GammaVal what you want to achieve or upload your startup document.</p>
          
          <div className="viskey-hero-composer">
            {/* Hidden File Picker Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.md,.json,.csv,.jpg,.jpeg,.png,.webp"
              className="hidden"
            />

            <form
              onSubmit={handleSubmit}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`viskey-composer viskey-composer--hero ${
                isDragging ? "ring-2 ring-indigo-500 bg-indigo-50/50" : ""
              }`}
            >
              {/* Attached Document / Image Preview Pill */}
              {attachedFile && (
                <div className="mb-2 p-2 px-3 rounded-xl bg-slate-100/90 border border-slate-200/80 flex items-center justify-between gap-3 text-xs animate-fade-in">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {attachedFile.isImage && attachedFile.dataUrl ? (
                      <img
                        src={attachedFile.dataUrl}
                        alt="Doc Preview"
                        className="w-7 h-7 rounded-lg object-cover border border-slate-300 shrink-0"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-xs">
                        <FileText className="w-4 h-4 text-indigo-600" />
                      </div>
                    )}
                    <div className="truncate">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 truncate">
                        <span className="truncate">{attachedFile.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-medium">({attachedFile.sizeFormatted})</span>
                      </div>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Document ready for vision validation
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition shrink-0"
                    title="Remove attached document"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="viskey-composer-editor">
                <input
                  type="text"
                  placeholder={
                    attachedFile
                      ? `Add specific validation focus for ${attachedFile.name} or press Enter…`
                      : "Ask GammaVal anything or upload a startup document / pitch deck image…"
                  }
                  aria-label="Ask GammaVal anything or upload startup document"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="viskey-composer-input"
                />
              </div>

              <div className="viskey-composer-toolbar">
                <div className="viskey-composer-tools">
                  {/* File Upload Trigger Button (+) */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="viskey-icon-button"
                    aria-label="Upload startup document or pitch image"
                    title="Upload document, pitch deck, or image (PDF, JPG, PNG, DOCX)"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <span className="viskey-toolbar-divider" aria-hidden="true"></span>
                  <div className="viskey-chip-list">
                    <button
                      type="button"
                      onClick={() => handleChipClick("pitch")}
                      className="viskey-chip"
                    >
                      <MonitorPlay className="w-3 h-3 text-zinc-500" />
                      <span>Create Pitch</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("market")}
                      className="viskey-chip"
                    >
                      <TrendingUp className="w-3 h-3 text-zinc-500" />
                      <span>Market TAM</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("customer")}
                      className="viskey-chip"
                    >
                      <Users className="w-3 h-3 text-zinc-500" />
                      <span>Customer ICP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("competitors")}
                      className="viskey-chip"
                    >
                      <Search className="w-3 h-3 text-zinc-500" />
                      <span>Research Industry</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!promptText.trim() && !attachedFile}
                  className="viskey-send-button disabled:opacity-40"
                  aria-label="Send prompt and validate document"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="viskey-hero-art" aria-hidden="true">
          <span className="viskey-hero-ring viskey-hero-ring--outer"></span>
        </div>
      </div>

      {/* 1:1 Exact 1440x732 Video Overlay Layer */}
      <div className="viskey-hero-media" data-phase={videoPhase} aria-hidden="true">
        <video
          ref={entryVideoRef}
          src={entrySrc}
          autoPlay
          muted
          playsInline
          onEnded={handleEntryEnded}
          className={`viskey-hero-media-layer viskey-hero-media-entry ${
            videoPhase === "entry" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
        <video
          ref={idleVideoRef}
          src={idleSrc}
          autoPlay
          loop
          muted
          playsInline
          className={`viskey-hero-media-layer viskey-hero-media-idle ${
            videoPhase === "idle" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </div>
    </section>
  );
}
