"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Download, CheckCircle2, Mail, MapPin } from "lucide-react";
import TiltCardWrapper from "@/components/ui/TiltCardWrapper";

export default function ContactResumePanel() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

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
    <TiltCardWrapper maxTilt={2}>
      <div className="bento-card bento-card-hover w-full paper-texture overflow-hidden" data-cursor="Contact">
        <div className="bento-label">GET IN TOUCH // CHAPTER 05</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Contact Form */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
                Send a Message
              </h3>
              <span className="postmark-stamp text-[10px]">PAR AVION</span>
            </div>

            {submitted ? (
              <div className="bg-[#E5EDE6] p-6 rounded-2xl border border-[#2D4030]/20 text-center">
                <CheckCircle2 size={32} className="text-[#2D4030] mx-auto mb-2 animate-bounce" />
                <h4 className="text-lg font-editorial font-bold text-[#2D4030] mb-1">
                  Message Delivered!
                </h4>
                <p className="text-xs text-[#2D4030]">
                  Thank you for reaching out. Kshitij will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-mono underline text-[#2D4030]"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8E3DA] text-xs text-[#1A1918] focus:border-[#C86D51] focus:outline-none transition-colors font-mono"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8E3DA] text-xs text-[#1A1918] focus:border-[#C86D51] focus:outline-none transition-colors font-mono"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Write your note or project inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8E3DA] text-xs text-[#1A1918] focus:border-[#C86D51] focus:outline-none transition-colors resize-none font-mono"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-full bg-[#C86D51] hover:bg-[#1A1918] text-white text-xs font-medium tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send size={14} />
                  <span>{sending ? "Sending..." : "Post Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Details & Downloadable Resume Row */}
          <div className="flex flex-col justify-between space-y-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E8E3DA] lg:pl-8">
            <div>
              <span className="text-xs font-mono text-[#6E6C68] uppercase block mb-3">
                Direct Recipient Information
              </span>
              <div className="space-y-3 font-mono text-xs text-[#1A1918]">
                <div className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E3DA]">
                  <span className="text-[#6E6C68] block text-[10px]">EMAIL ADDRESS:</span>
                  <a href="mailto:kshitijkumbhar007@gmail.com" className="font-bold hover:text-[#C86D51] transition-colors">
                    kshitijkumbhar007@gmail.com
                  </a>
                </div>
                <div className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E3DA]">
                  <span className="text-[#6E6C68] block text-[10px]">LOCATION:</span>
                  <span className="font-bold">Pune, Maharashtra, 411001, India</span>
                </div>
              </div>
            </div>

            {/* Resume Download Row with Last Updated Chip */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E3DA] shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#C86D51]" />
                  <span className="font-editorial font-bold text-sm text-[#1A1918]">Curriculum Vitae</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5EDE6] text-[#2D4030] text-[10px] font-mono">
                  Updated July 2026
                </span>
              </div>
              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="w-full py-2.5 rounded-xl bg-[#1A1918] hover:bg-[#C86D51] text-white text-xs font-mono font-medium transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <Download size={14} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs text-[#6E6C68] font-mono">
          <span>© 2026 Kshitij Kumbhar</span>
          <span className="text-[#C86D51]">Bento Instrument Panel</span>
        </div>
      </div>
    </TiltCardWrapper>
  );
}
