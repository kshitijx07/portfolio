"use client";

import React, { useState } from "react";
import { Send, FileText, Download, CheckCircle2, Copy, Check, Sparkles, Mail } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

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
    <PinterestCardWrapper stampText="COMM_CHANNEL // ACTIVE">
      <div className="w-full overflow-hidden" data-cursor="Contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pt-2">
          {/* Left: Contact Form */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7]">
                  Send a Direct Message
                </h3>
                <span className="y2k-pill text-[10px] text-[#00D2FF]">
                  <Mail size={11} className="text-[#00D2FF]" />
                  <span>Encrypted</span>
                </span>
              </div>
            </div>

            {submitted ? (
              <div className="bg-[#E5EDE6] dark:bg-[#1E2A20] p-6 rounded-3xl border border-[#2D4030]/20 dark:border-[#4E6E52]/20 text-center transition-colors">
                <CheckCircle2 size={32} className="text-[#00E676] mx-auto mb-2 animate-bounce" />
                <h4 className="text-lg font-editorial font-bold text-[#2D4030] dark:text-[#FAF9F7] mb-1">
                  Transmission Delivered!
                </h4>
                <p className="text-xs text-[#2D4030] dark:text-[#A3A098]">
                  Thank you for reaching out. Kshitij will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-mono underline text-[#2D4030] dark:text-[#E07A5F] cursor-pointer"
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
                  className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 text-xs text-[#1A1918] dark:text-[#FAF9F7] focus:border-[#C86D51] dark:focus:border-[#E07A5F] focus:outline-none transition-all duration-300 font-mono shadow-sm"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 text-xs text-[#1A1918] dark:text-[#FAF9F7] focus:border-[#C86D51] dark:focus:border-[#E07A5F] focus:outline-none transition-all duration-300 font-mono shadow-sm"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Write your note or engineering inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 text-xs text-[#1A1918] dark:text-[#FAF9F7] focus:border-[#C86D51] dark:focus:border-[#E07A5F] focus:outline-none transition-all duration-300 resize-none font-mono shadow-sm"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-2xl bg-[#C86D51] dark:bg-[#E07A5F] hover:bg-[#1A1918] dark:hover:bg-[#FAF9F7] text-white dark:hover:text-[#1A1918] text-xs font-mono font-bold tracking-wide transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Send size={14} />
                  <span>{sending ? "Sending..." : "Transmit Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Details & Downloadable Resume Row */}
          <div className="flex flex-col justify-between space-y-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E8E3DA] dark:border-[#2E2C29] lg:pl-8">
            <div>
              <span className="text-xs font-mono text-[#5C5955] dark:text-[#A3A098] uppercase block mb-3 font-semibold">
                Direct Recipient Information
              </span>
              <div className="space-y-3 font-mono text-xs text-[#1A1918] dark:text-[#FAF9F7]">
                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[#5C5955] dark:text-[#A3A098] block text-[10px] font-semibold">EMAIL ADDRESS:</span>
                    <a href="mailto:kshitijkumbhar007@gmail.com" className="font-bold hover:text-[#C86D51] dark:hover:text-[#E07A5F] transition-colors">
                      kshitijkumbhar007@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white transition-colors text-[#5C5955] dark:text-[#A3A098]"
                    title="Copy Email"
                  >
                    {copied ? <Check size={14} className="text-[#00E676]" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 shadow-sm">
                  <span className="text-[#5C5955] dark:text-[#A3A098] block text-[10px] font-semibold">LOCATION:</span>
                  <span className="font-bold">Pune, Maharashtra, 411001, India</span>
                </div>
              </div>
            </div>

            {/* Resume Download Row with Last Updated Chip */}
            <div className="p-4 rounded-3xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 shadow-sm backdrop-blur-md">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  <span className="font-editorial font-bold text-sm text-[#1A1918] dark:text-[#FAF9F7]">Curriculum Vitae</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] text-[10px] font-mono font-bold">
                  Updated July 2026
                </span>
              </div>
              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="w-full py-2.5 rounded-2xl bg-[#1A1918] dark:bg-[#FAF9F7] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] text-white dark:text-[#1A1918] dark:hover:text-white text-xs font-mono font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Download size={14} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex items-center justify-between text-xs text-[#5C5955] dark:text-[#A3A098] font-mono">
          <span>© 2026 Kshitij Kumbhar</span>
          <span className="text-[#C86D51] dark:text-[#E07A5F] font-bold">Glassmorphism • Pixel Art • Y2K • Ethereal</span>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}

