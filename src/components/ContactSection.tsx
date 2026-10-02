import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactSubmission } from '../types/portfolio';
import { 
  Send, 
  Mail, 
  Check, 
  Copy, 
  Download, 
  Clock, 
  ArrowUpRight, 
  AlertCircle,
  MessageSquare,
  Sparkles,
  Trash2
} from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Architecture Review',
    timeline: '3-6 Months',
    message: initialSubject ? `Hi Anyan,\n\nI'm reaching out regarding ${initialSubject}...` : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    if (initialSubject) {
      setFormData(prev => ({
        ...prev,
        message: `Hi Anyan,\n\nI'm reaching out regarding ${initialSubject}...`
      }));
    }
  }, [initialSubject]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('anyan_contact_submissions');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name or organization.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a contact email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters describing your project or inquiry.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: ContactSubmission = {
        id: `REQ-${Date.now().toString().slice(-6)}`,
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.timeline,
        message: formData.message,
        sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
      };

      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      try {
        localStorage.setItem('anyan_contact_submissions', JSON.stringify(updated));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formData.message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:He;Anyan;;;
FN:Anyan He
TITLE:Principal Systems & AI Protocol Architect
EMAIL;TYPE=INTERNET,PREF:${PERSONAL_INFO.email}
NOTE:Architecting modular compute engines, agentic MCP protocols, and fault-tolerant distributed infrastructure.
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Anyan_He.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteHistory = (id: string) => {
    const updated = submissions.filter(s => s.id !== id);
    setSubmissions(updated);
    try {
      localStorage.setItem('anyan_contact_submissions', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `[Inquiry] ${formData.projectType} - ${formData.name || 'Discussion'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.projectType}\nTimeline: ${formData.timeline}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-24 border-t border-white/[0.06] bg-[#07070b] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/80 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
              Get in Touch
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-display text-balance">
            Let's Build Something Resilient
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed text-balance">
            Available for systems architecture advisory, protocol design reviews, and high-concurrency distributed engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-zinc-950/80 border border-white/[0.08] space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Direct Inquiries</span>
                <div className="flex items-center justify-between">
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-lg font-mono text-white hover:underline transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 border border-white/5 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Location & Office Hours</span>
                <p className="text-sm text-zinc-300">
                  {PERSONAL_INFO.location}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Active response window: 09:00 — 18:00 PT
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-xs font-mono uppercase text-zinc-500 block mb-2">Availability Status</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-zinc-300 font-mono">
                    {PERSONAL_INFO.availability}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-2.5">
                <a
                  href={mailtoLink}
                  className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Open in Default Mail Client</span>
                </a>

                <button
                  onClick={handleDownloadVCard}
                  className="w-full py-2.5 px-4 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download vCard Contact (.vcf)</span>
                </button>
              </div>
            </div>

            {/* Submission History Drawer */}
            {submissions.length > 0 && (
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Sent Inquiries ({submissions.length})</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Stored in browser</span>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {submissions.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 text-xs font-mono flex items-center justify-between"
                    >
                      <div className="truncate mr-2">
                        <div className="text-zinc-200 font-medium truncate">{item.projectType}</div>
                        <div className="text-zinc-500 text-[10px] truncate">{item.sentAt} · {item.name}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteHistory(item.id)}
                        className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-white font-display">
                    Message Dispatched Successfully
                  </h3>

                  <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white">{formData.name}</span>. Your inquiry has been registered. Anyan typically reviews technical proposals within 24 business hours.
                  </p>

                  <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          projectType: 'Architecture Review',
                          timeline: '3-6 Months',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl text-xs font-mono text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition-colors"
                    >
                      Send Another Message
                    </button>

                    <a
                      href={mailtoLink}
                      className="px-6 py-2.5 rounded-xl text-xs font-mono text-black bg-white hover:bg-zinc-200 transition-colors"
                    >
                      Send Direct Email Copy
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Your Name / Organization <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Alex Rivera, Anthropic / Stanford"
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500/60 bg-red-950/20' : 'border-white/10 focus:border-white/30'
                        }`}
                      />
                      {errors.name && (
                        <div className="flex items-center gap-1 mt-1.5 text-xs text-red-400 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Work Email <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="alex@organization.com"
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500/60 bg-red-950/20' : 'border-white/10 focus:border-white/30'
                        }`}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1 mt-1.5 text-xs text-red-400 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Type & Scope */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Inquiry Scope
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      >
                        <option value="Architecture Review">Architecture & Systems Review</option>
                        <option value="Protocol Advisory">Autonomous MCP / Agentic Protocol</option>
                        <option value="High-Concurrency Engineering">High-Concurrency Distributed Systems</option>
                        <option value="Executive Advisory">Executive / Fractional Tech Advisory</option>
                        <option value="Open-Source Partnership">Open-Source Collaboration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Timeline & Urgency
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      >
                        <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                        <option value="1-3 Months">1 — 3 Months</option>
                        <option value="3-6 Months">3 — 6 Months</option>
                        <option value="Flexible / Exploratory">Flexible / Exploratory</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        Project Overview & Architecture Details <span className="text-zinc-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
                      >
                        {copiedMessage ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedMessage ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Outline your technical requirements, expected concurrency, current bottleneck, and ideal collaboration format..."
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors leading-relaxed ${
                        errors.message ? 'border-red-500/60 bg-red-950/20' : 'border-white/10 focus:border-white/30'
                      }`}
                    />
                    {errors.message && (
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-red-400 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 font-mono">
                      Target inbox: <span className="text-zinc-300">{PERSONAL_INFO.email}</span>
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
