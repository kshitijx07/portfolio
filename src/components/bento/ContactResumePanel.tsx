"use client";

import React, { useState } from "react";
import { Send, Download, CheckCircle2, Copy, Check, Mail } from "lucide-react";

export default function ContactResumePanel() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kshitijkumbhar007@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-10 space-y-8" data-cursor="Contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Encrypted Communication Terminal */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent-acid)]" />
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                  Direct Transmission Channel
                </h3>
              </div>
              <span className="hud-tag hud-tag-acid text-[9px]">
                <Mail size={11} />
                <span>Encrypted</span>
              </span>
            </div>

            {submitted ? (
              <div className="p-6 border border-[var(--accent-acid)] bg-[var(--bg-primary)] text-center">
                <CheckCircle2 size={28} className="text-[var(--accent-acid)] mx-auto mb-2" />
                <h4 className="text-lg font-display font-bold text-[var(--text-primary)] uppercase mb-1">
                  Transmission Delivered!
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans">
                  Thank you for reaching out. Kshitij will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-mono underline text-[var(--accent-acid)] cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:border-[var(--accent-acid)] focus:outline-none font-mono"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:border-[var(--accent-acid)] focus:outline-none font-mono"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Write your note or engineering inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:border-[var(--accent-acid)] focus:outline-none resize-none font-mono"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="hud-btn hud-tag-acid w-full justify-center py-3 font-bold"
                >
                  <Send size={14} />
                  <span>{sending ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Quick Telemetry & CV Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent-acid)]" />
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                  Verified Coordinates & CV
                </h3>
              </div>
            </div>

            <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">CURRENT LOCATION:</span>
                <span className="text-[var(--text-primary)] font-bold">PUNE, INDIA (GMT+5:30)</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">EMAIL CHANNEL:</span>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-[var(--accent-acid)] hover:underline cursor-pointer font-bold"
                >
                  <span>kshitijkumbhar007@gmail.com</span>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">ACADEMIC STATUS:</span>
                <span className="text-[var(--text-primary)] font-bold">B.TECH CS (CGPA 8.48/10)</span>
              </div>

              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="hud-btn hud-tag-acid w-full justify-center py-3 font-bold mt-2"
              >
                <Download size={14} />
                <span>DOWNLOAD VERIFIED CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
