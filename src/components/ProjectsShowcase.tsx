import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, Github, Code2, ArrowUpRight, Cpu, Activity, Terminal } from 'lucide-react';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filterOptions: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'mcp', label: 'MCP & Agent Runtimes' },
    { id: 'systems', label: 'Distributed Systems' },
    { id: 'infra', label: 'Dev Tools & CLI' },
    { id: 'protocols', label: 'On-Chain Protocols' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="works" className="py-24 border-t border-white/[0.06] bg-[#060609] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/80 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
                Selected Works
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display text-balance">
              Engineered for Production
            </h2>
          </div>

          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Scalable protocols, agent runtimes, and low-latency storage engines built with rigorous distributed invariants.
          </p>
        </div>

        {/* Filter Segmented Control (Zero-Pill compliant: functional buttons with clean segmented container) */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900/80 border border-white/10 rounded-xl mb-12 overflow-x-auto max-w-fit">
          {filterOptions.map((opt) => {
            const isActive = activeCategory === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveCategory(opt.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => {
            const isLarge = project.bentoSpan === 'large';
            const colSpan = isLarge ? 'lg:col-span-8' : project.bentoSpan === 'medium' ? 'lg:col-span-6' : 'lg:col-span-4';

            return (
              <div
                key={project.id}
                className={`group relative rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${colSpan} p-7`}
                onClick={() => onSelectProject(project)}
              >
                {/* Background glow hover */}
                <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top Metadata Line (clean unboxed text with typographic separators) */}
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-4">
                    <div className="flex items-center gap-2">
                      <span className="uppercase text-zinc-300 font-medium">{project.status}</span>
                      <span aria-hidden="true">·</span>
                      <span>0{idx + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 group-hover:text-white transition-colors">Inspect System</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display group-hover:text-zinc-100 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="text-xs text-zinc-400 font-mono mb-4">
                    {project.subtitle}
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Project Metrics Display */}
                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/[0.06] mb-6 bg-black/30 px-3 rounded-xl">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-xs text-zinc-400 font-mono truncate">{m.label}</span>
                        <span className="text-base sm:text-lg font-bold text-white font-mono tabular-nums tracking-tight">
                          {m.value}
                        </span>
                        {m.detail && (
                          <span className="text-[10px] text-zinc-400 truncate">{m.detail}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Stack & Action Links */}
                <div>
                  {/* Unboxed tech stack with typographic separators */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono">
                    {project.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tech}>
                        <span className="text-zinc-300">{tech}</span>
                        {tIdx < project.technologies.length - 1 && (
                          <span className="text-zinc-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
