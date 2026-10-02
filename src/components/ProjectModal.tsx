import React, { useEffect, useState } from 'react';
import { Project } from '../types/portfolio';
import { X, ExternalLink, Github, Check, Copy, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400 uppercase">
              {project.status}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-mono text-zinc-300">
              System Specification
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Title Area */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">
              {project.title}
            </h2>
            <div className="text-sm font-mono text-zinc-400">
              {project.subtitle}
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08]">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-xs text-zinc-400 font-mono">{m.label}</span>
                <span className="text-xl font-bold text-white font-mono tabular-nums">
                  {m.value}
                </span>
                {m.detail && (
                  <span className="text-xs text-zinc-400">{m.detail}</span>
                )}
              </div>
            ))}
          </div>

          {/* Description & Problem Space */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300">
              System Architecture & Core Mechanics
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.description}
            </p>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 text-sm text-zinc-400 leading-relaxed">
              <span className="text-white font-semibold block mb-1">Architecture Summary:</span>
              {project.architectureSummary}
            </div>
          </div>

          {/* Code Viewer (if present) */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                  {project.codeSnippet.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="rounded-xl bg-black border border-white/10 p-4 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
                <pre>{project.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              Technologies & Infrastructure
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
              {project.technologies.map((t, idx) => (
                <span key={t} className="px-2.5 py-1 rounded bg-zinc-900 border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live System</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onInquire(project.title);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-black bg-white hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            <span>Inquire About This Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
