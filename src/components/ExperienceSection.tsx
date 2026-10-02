import React from 'react';
import { EXPERIENCE_ITEMS, TECH_PILLARS } from '../data/portfolioData';
import { Briefcase, ArrowUpRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-t border-white/[0.06] bg-[#060609] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/80 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
              Track Record & Leadership
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-display text-balance">
            Engineering Experience
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed text-balance">
            Over eight years of leading distributed infrastructure teams, authoring open-source developer toolchains, and shipping fault-tolerant systems.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12 mb-20">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div 
              key={item.company + item.period}
              className="relative pl-8 sm:pl-10 border-l border-white/10 group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-800 border-2 border-zinc-500 group-hover:border-white transition-colors" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <h3 className="text-xl font-bold text-white font-display">
                  {item.role}
                </h3>
                <span className="text-xs font-mono text-zinc-400 tabular-nums">
                  {item.period} · {item.location}
                </span>
              </div>

              <div className="text-sm font-mono text-zinc-300 mb-4">
                {item.company}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {item.summary}
              </p>

              <ul className="space-y-2 mb-6 text-sm text-zinc-300">
                {item.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="text-zinc-500 mt-1 font-mono text-xs">▹</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies unboxed */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono">
                {item.technologies.map((tech, tIdx) => (
                  <React.Fragment key={tech}>
                    <span className="text-zinc-400">{tech}</span>
                    {tIdx < item.technologies.length - 1 && (
                      <span className="text-zinc-700" aria-hidden="true">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Competencies Matrix */}
        <div className="p-8 rounded-2xl bg-zinc-950/80 border border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-6 font-display">
            Core Competency Spectrum
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TECH_PILLARS.map((pillar) => (
              <div key={pillar.title} className="space-y-3">
                <div className="text-sm font-semibold text-white font-mono">
                  {pillar.title}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {pillar.techs.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-900 border border-white/5 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
