import React from 'react';
import { Cpu, Mic, Database, ArrowRight } from 'lucide-react';

interface PhilosophyProps {
  onLearnMore: () => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ onLearnMore }) => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Decentralized MCP Marketplace',
      tagline: 'Isolated Agent Runtimes',
      description: 'Zero-trust WebAssembly sandboxes exposing validated tool schemas for AI model execution without host privilege escalation.'
    },
    {
      icon: Mic,
      title: 'Real-Time, Voice-Driven Execution',
      tagline: 'Streaming Acoustic Pipeline',
      description: 'Sub-180ms voice-to-tool dispatch coupling continuous audio streaming with deterministic function-calling orchestrators.'
    },
    {
      icon: Database,
      title: 'Protocol Layer for Chain & App Interoperability',
      tagline: 'Causal State Synchronization',
      description: 'Active-active CRDT memory and verifiable state anchoring between enterprise platforms, Web APIs, and on-chain logs.'
    }
  ];

  return (
    <section id="overview" className="py-24 border-t border-white/[0.06] relative bg-[#060609]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/80 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
              Core Architecture & Philosophy
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 font-display text-balance">
            Autonomous Compute Protocol
          </h2>
          
          <p className="text-base text-zinc-400 leading-relaxed text-balance">
            A voice-native modular compute engine built on CORA — bridging real-world developer platforms like GitHub, Google Cloud, and Redis with deterministic agentic logic.
          </p>
        </div>

        {/* 3 Pillar Cards matching the reference screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative p-8 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glow hint on hover */}
                <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-zinc-200" />
                  </div>

                  {/* Title & Metadata (clean unboxed text) */}
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    {pillar.tagline}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 font-display">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>SPEC 0{idx + 1}</span>
                  <span className="group-hover:text-white transition-colors flex items-center gap-1">
                    VERIFIED <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
