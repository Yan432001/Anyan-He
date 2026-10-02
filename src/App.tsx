/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { InteractivePlayground } from './components/InteractivePlayground';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './types/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string>('');

  // Global keyboard shortcuts (C for Contact, R for Resume, when not typing in an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        const contactEl = document.getElementById('contact');
        contactEl?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setIsResumeOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateToContact = () => {
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectInquiry = (projectTitle: string) => {
    setContactSubject(projectTitle);
    setSelectedProject(null);
    handleNavigateToContact();
  };

  const handleExploreClick = () => {
    const worksEl = document.getElementById('works');
    worksEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPlayground = () => {
    const archEl = document.getElementById('architecture');
    archEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060609] text-zinc-100 flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Top Bar Navigation Contract */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onNavigateToContact={handleNavigateToContact}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with Atmospheric Dark Wave Horizon Canvas */}
        <Hero
          onExploreClick={handleExploreClick}
          onOpenPlayground={handleOpenPlayground}
        />

        {/* Philosophy & Core Architecture Section */}
        <Philosophy
          onLearnMore={handleOpenPlayground}
        />

        {/* Selected Works - Dynamic Bento Grid */}
        <ProjectsShowcase
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Interactive Architecture & Playground Mode */}
        <InteractivePlayground />

        {/* Experience & Track Record */}
        <ExperienceSection />

        {/* Robust Contact Form & Inquiries */}
        <ContactSection
          initialSubject={contactSubject}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleProjectInquiry}
      />

      {/* Executive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onNavigateToContact={() => {
          setIsResumeOpen(false);
          handleNavigateToContact();
        }}
      />
    </div>
  );
}
