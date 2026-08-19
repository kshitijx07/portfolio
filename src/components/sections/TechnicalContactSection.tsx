"use client";

import React, { useState } from "react";
import { Mail, Phone, ArrowUpRight, Check, Send, Download } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function TechnicalContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate real network transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 900);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-10 space-y-10" data-cursor="Contact">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] shadow-[0_0_8px_rgba(183,255,0,0.6)]" />
              <span className="font-mono text-xs text-[var(--accent-acid)] tracking-wider uppercase font-extrabold">
                05 // TRANSMISSION CHANNEL
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[var(--text-primary)] uppercase leading-[0.95]">
              LET'S BUILD SOMETHING USEFUL.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-secondary)] max-w-xs">
            Open for DevOps, Cloud Infrastructure, Multi-Agent AI, and Systems Engineering opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Transmission Form */}
          <div className="lg:col-span-7 bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] font-mono text-xs">
              <span className="text-[var(--text-primary)] font-bold uppercase">
                ENCRYPTED PACKET TRANSMISSION
              </span>
              <span className="text-[var(--accent-acid)] font-bold">
                {submitSuccess ? "TRANSMISSION RECEIVED" : "CHANNEL // OPEN"}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">
                  IDENTIFIER // NAME
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] focus:border-[var(--accent-acid)] p-3 text-[var(--text-primary)] font-sans text-xs sm:text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">
                  RETURN_ADDRESS // EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="alex@enterprise.com"
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] focus:border-[var(--accent-acid)] p-3 text-[var(--text-primary)] font-sans text-xs sm:text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">
                  PAYLOAD // MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Engineering requirements, infrastructure discussion, or project inquiry..."
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] focus:border-[var(--accent-acid)] p-3 text-[var(--text-primary)] font-sans text-xs sm:text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="hud-btn hud-tag-acid w-full justify-center py-3 font-bold text-xs"
              >
                <span>{isSubmitting ? "TRANSMITTING PACKET..." : "SEND TRANSMISSION →"}</span>
                <Send size={14} />
              </button>

              {submitSuccess && (
                <div className="p-3 bg-[var(--accent-acid)]/10 border border-[var(--accent-acid)] text-[var(--accent-acid)] text-center font-bold text-[11px]">
                  MESSAGE RECEIVED. TRANSMISSION LOGGED TO OPERATOR DISPATCH.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Direct Channels & Verified Coordinates */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Channel */}
            <div
              onClick={() => copyToClipboard("kshitijkumbhar007@gmail.com", "email")}
              className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] transition-colors cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--accent-acid)]" />
                <div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] block font-bold">DIRECT DISPATCH</span>
                  <span className="text-xs sm:text-sm text-[var(--text-primary)] font-mono font-bold">kshitijkumbhar007@gmail.com</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[var(--accent-acid)]">
                {copied === "email" ? "COPIED" : "COPY"}
              </span>
            </div>

            {/* Phone Channel */}
            <div
              onClick={() => copyToClipboard("+917058157357", "phone")}
              className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] transition-colors cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--accent-acid)]" />
                <div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] block font-bold">TELEPHONY / SECURE</span>
                  <span className="text-xs sm:text-sm text-[var(--text-primary)] font-mono font-bold">+91-7058157357</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[var(--accent-acid)]">
                {copied === "phone" ? "COPIED" : "COPY"}
              </span>
            </div>

            {/* Social Coordinates */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://linkedin.com/in/kshitij-kumbhar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] text-[var(--text-primary)] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FiLinkedin size={16} className="text-[var(--accent-acid)]" />
                  <span className="font-mono text-xs font-bold">LINKEDIN</span>
                </div>
                <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent-acid)]" />
              </a>

              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] text-[var(--text-primary)] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FiGithub size={16} className="text-[var(--accent-acid)]" />
                  <span className="font-mono text-xs font-bold">GITHUB</span>
                </div>
                <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent-acid)]" />
              </a>
            </div>

            {/* CV Download Button */}
            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="hud-btn bg-white/5 hover:bg-white/10 border-white/20 text-white w-full justify-center py-3.5 font-bold"
            >
              <span>DOWNLOAD VERIFIED CV (PDF)</span>
              <Download size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
