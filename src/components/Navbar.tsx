import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onNavigateToContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onNavigateToContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Works', href: '#works' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#060609]/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          className="text-base font-semibold tracking-tight text-white hover:text-white/80 transition-colors font-display"
        >
          Anyan He
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase text-zinc-400 font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-white/40"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Resume</span>
          </button>
          
          <button
            onClick={onNavigateToContact}
            className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium text-black bg-white hover:bg-zinc-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-lg bg-zinc-900 border border-white/10"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0a0a0f] px-6 py-5 flex flex-col gap-4">
          <nav className="flex flex-col gap-3 text-sm font-medium text-zinc-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-white/10 rounded-lg text-center"
            >
              View Resume
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToContact();
              }}
              className="flex-1 py-2 text-xs font-medium text-black bg-white rounded-lg text-center font-medium"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
