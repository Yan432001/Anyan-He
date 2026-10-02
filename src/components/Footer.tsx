import React from 'react';
import { ArrowUp, Github, Mail, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 border-t border-white/[0.08] bg-[#050508] relative text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Block */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-white font-display tracking-tight">
            {PERSONAL_INFO.name}
          </div>
          <p className="text-zinc-500 max-w-sm text-xs leading-relaxed font-sans">
            Designing resilient systems, low-latency distributed state, and modular agentic protocols.
          </p>
          <div className="text-zinc-600 text-[11px] pt-1">
            © {new Date().getFullYear()} Anyan He. All technical rights reserved.
          </div>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center gap-6 text-zinc-400">
          <a href="#overview" className="hover:text-white transition-colors">
            Overview
          </a>
          <a href="#works" className="hover:text-white transition-colors">
            Selected Works
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#experience" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`} 
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>

        {/* Right Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-zinc-600 tabular-nums">
            SF · UTC-7
          </span>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
