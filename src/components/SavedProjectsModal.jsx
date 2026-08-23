import React from "react";
import { X, Bookmark, Trash2, ArrowRight, ShieldCheck, Calendar, Sparkles, FolderOpen } from "lucide-react";

export function SavedProjectsModal({ isOpen, onClose, savedProjects = [], onLoadProject, onDeleteProject }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in text-left">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Saved Startup Projects Vault
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                  {savedProjects.length} Projects
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Locally saved Due Diligence Audits & Multi-Agent Analysis History
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {savedProjects.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">No Saved Projects Yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Run any startup idea validation and click "Save Project" to store it permanently in your vault.
              </p>
            </div>
          ) : (
            savedProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 transition space-y-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{project.idea?.title || "Untitled Startup"}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-white shrink-0">
                      {project.comparison?.validationScore || 85}/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {project.idea?.domain} • {project.comparison?.verdict || "STRONG GO"}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.savedAt || project.completedAt || "Recently Saved"}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onLoadProject(project);
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Load Audit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onDeleteProject(project.id || idx)}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
