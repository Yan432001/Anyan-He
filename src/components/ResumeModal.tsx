import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO, EXPERIENCE_ITEMS, PROJECTS } from '../data/portfolioData';
import { X, Download, Printer, Check, Copy, FileText, ArrowRight } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onNavigateToContact }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
ANYAN HE
Principal Systems & AI Protocol Architect
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}

SUMMARY:
${PERSONAL_INFO.bio}

CORE TECHNICAL SKILLS:
Languages: Rust, Go, TypeScript, C, Python, SQL
Architecture: Model Context Protocol (MCP), CRDTs, Vector Clocks, Active-Active Replication
Infrastructure: Kubernetes, Docker, eBPF, Redis, QUIC, gRPC, Kafka, Google Cloud

PROFESSIONAL EXPERIENCE:
${EXPERIENCE_ITEMS.map(e => `
* ${e.role} | ${e.company} (${e.period})
  ${e.summary}
  Key Achievements:
  ${e.achievements.map(a => `  - ${a}`).join('\n')}
`).join('\n')}

SELECTED KEY PROJECTS:
${PROJECTS.map(p => `
* ${p.title} (${p.status})
  ${p.summary}
  Tech: ${p.technologies.join(', ')}
`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-300" />
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              Curriculum Vitae · Executive Summary
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable / Viewable Resume Document */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-10 text-zinc-200 font-sans leading-relaxed">
          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-sm font-mono text-zinc-400 mt-1">
                {PERSONAL_INFO.title}
              </div>
            </div>
            <div className="text-xs font-mono text-zinc-400 sm:text-right space-y-1">
              <div>{PERSONAL_INFO.email}</div>
              <div>{PERSONAL_INFO.location}</div>
              <div className="text-emerald-400">Available for Strategic Architecture</div>
            </div>
          </div>

          {/* Executive Overview */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              Executive Overview
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Core Technical Matrix */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono bg-zinc-900/60 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-white block font-semibold mb-1">Systems & Protocols:</span>
                <span className="text-zinc-400">Rust, Go, C/eBPF, Model Context Protocol (MCP), CRDTs, QUIC, gRPC</span>
              </div>
              <div>
                <span className="text-white block font-semibold mb-1">Distributed & Cloud:</span>
                <span className="text-zinc-400">Kubernetes, Docker, Redis Cluster, Kafka, RocksDB, Google Cloud, AWS</span>
              </div>
              <div>
                <span className="text-white block font-semibold mb-1">Full-Stack & Web:</span>
                <span className="text-zinc-400">TypeScript, React 19, Node.js, WebSockets, WebRTC, Tailwind CSS</span>
              </div>
            </div>
          </div>

          {/* Career Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">
              Leadership & Systems Track Record
            </h2>
            <div className="space-y-8">
              {EXPERIENCE_ITEMS.map((item) => (
                <div key={item.company + item.period} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="text-base font-bold text-white font-display">
                      {item.role} · {item.company}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 tabular-nums">
                      {item.period} · {item.location}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    {item.summary}
                  </p>
                  <ul className="space-y-1.5 pt-1 text-xs text-zinc-300">
                    {item.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-zinc-500 font-mono">▹</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Open Source */}
          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              Education & Open Source Governance
            </h2>
            <div className="text-xs font-mono text-zinc-300 space-y-1">
              <div>B.S. in Computer Science & Distributed Engineering</div>
              <div className="text-zinc-400">Active maintainer of PlugStack CLI and contributor to Model Context Protocol specification working groups.</div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-white/10 bg-zinc-900/80 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">
            Document generated for verified evaluation
          </span>
          <button
            onClick={() => {
              onClose();
              onNavigateToContact();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-black bg-white hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            <span>Proceed to Contact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
