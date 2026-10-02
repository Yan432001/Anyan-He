import React from 'react';
import { DarkWaveHorizon } from './DarkWaveHorizon';
import { ArrowDown, Layers, Terminal, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenPlayground: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenPlayground }) => {
  return (
    <section id="top" className="relative min-h-[90vh] flex flex-col justify-between pt-16 pb-12 overflow-hidden">
      {/* 3D Dark Wave Horizon Background */}
      <DarkWaveHorizon />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col items-center justify-center">
        {/* Editorial Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-md mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-300">
            Systems & Autonomous Protocol Architect
          </span>
        </div>

        {/* Massive Headline with text-wrap: balance */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl text-balance font-display leading-[1.08]">
          Modular Compute <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            Powered By CORA Engine.
          </span>
        </h1>

        {/* Punchy Kicker */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 text-balance font-normal leading-relaxed">
          Voice-triggered. Chain-aware. Built to scale. Architecting deterministic Model Context Protocol runtimes and sub-millisecond distributed state.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreClick}
            className="px-6 py-3 rounded-full text-xs font-semibold tracking-wide uppercase text-black bg-white hover:bg-zinc-200 transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            Explore Selected Works
          </button>
          <button
            onClick={onOpenPlayground}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide uppercase text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/15 transition-all duration-200 backdrop-blur-md cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Launch MCP Playground</span>
          </button>
        </div>

        {/* Center Luminous Emblem (from the reference screenshot) */}
        <div className="relative group cursor-pointer" onClick={onExploreClick}>
          <div className="absolute -inset-2 bg-gradient-to-r from-zinc-500/20 via-white/20 to-zinc-500/20 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
          <div className="relative w-16 h-16 rounded-2xl bg-zinc-900/90 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-xl group-hover:scale-105 transition-transform duration-300">
            <svg 
              className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-45" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="9" height="9" rx="2" />
              <rect x="13" y="2" width="9" height="9" rx="2" />
              <rect x="2" y="13" width="9" height="9" rx="2" />
              <rect x="13" y="13" width="9" height="9" rx="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Partner / Ecosystem Strip (from the reference screenshot) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 md:gap-8 opacity-60 hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <span>GOOGLE CLOUD</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <span>BRAVE BROWSER</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <span>ALCHEMY MCP</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <span>SOLANA GEYSER</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <span>GITHUB CORE</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <span>REDIS EDGE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
