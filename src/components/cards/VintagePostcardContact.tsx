"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle2, Stamp } from "lucide-react";

export default function VintagePostcardContact() {
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
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 md:p-10 border border-[#E8E3DA] shadow-postcard shadow-paper-hover transition-all duration-300 group overflow-hidden"
    >
      {/* Postal Header */}
      <div className="flex items-start justify-between gap-4 mb-8 pb-6 border-b-2 border-dashed border-[#E8E3DA]">
        <div>
          <span className="postmark-stamp mb-2">AIR MAIL • PAR AVION</span>
          <h2 className="text-3xl md:text-5xl font-editorial font-bold text-[#1A1918]">
            Send a Postcard
          </h2>
          <p className="text-xs md:text-sm text-[#6E6C68] font-mono mt-1">
            Let&apos;s build something extraordinary together.
          </p>
        </div>

        {/* Vintage Postal Stamp with animated hover rotation */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-20 h-24 rounded-lg bg-[#F2E4DF] border-4 border-dashed border-[#C86D51] p-2 flex flex-col items-center justify-between text-center cursor-pointer shadow-sm shrink-0"
        >
          <span className="text-[9px] font-mono font-bold text-[#C86D51]">INDIA</span>
          <div className="w-8 h-8 rounded-full bg-[#C86D51] text-white flex items-center justify-center">
            <Send size={14} />
          </div>
          <span className="text-[9px] font-mono font-bold text-[#2D4030]">2026</span>
        </motion.div>
      </div>

      {/* Postcard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Contact Form */}
        <div>
          {submitted ? (
            <div className="bg-[#E5EDE6] p-6 rounded-2xl border border-[#2D4030]/20 text-center">
              <CheckCircle2 size={36} className="text-[#2D4030] mx-auto mb-2" />
              <h4 className="text-xl font-editorial font-bold text-[#2D4030] mb-1">
                Postcard Delivered!
              </h4>
              <p className="text-xs text-[#2D4030] leading-relaxed">
                Thank you for your message. Kshitij will respond to your email as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-mono underline text-[#2D4030]"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#6E6C68] uppercase block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E8E3DA] text-sm text-[#1A1918] focus:border-[#C86D51] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#6E6C68] uppercase block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E8E3DA] text-sm text-[#1A1918] focus:border-[#C86D51] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#6E6C68] uppercase block mb-1">
                  Postcard Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your note or project inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E8E3DA] text-sm text-[#1A1918] focus:border-[#C86D51] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-full bg-[#C86D51] hover:bg-[#1A1918] text-white text-xs font-medium tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>{sending ? "Delivering..." : "Post Message"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Postal Lines & Direct Details */}
        <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#E8E3DA] pt-6 md:pt-0 md:pl-8">
          <div>
            <span className="text-xs font-mono text-[#6E6C68] uppercase tracking-wider block mb-4">
              Recipient Address
            </span>

            <div className="space-y-4 text-sm text-[#1A1918] font-editorial">
              <div className="border-b border-[#E8E3DA] pb-2">
                <span className="text-xs text-[#6E6C68] font-mono block">To:</span>
                <span className="font-bold">Kshitij Kumbhar</span>
              </div>

              <div className="border-b border-[#E8E3DA] pb-2">
                <span className="text-xs text-[#6E6C68] font-mono block">Location:</span>
                <span>Pune, Maharashtra, 411001, India</span>
              </div>

              <div className="border-b border-[#E8E3DA] pb-2">
                <span className="text-xs text-[#6E6C68] font-mono block">Email:</span>
                <a
                  href="mailto:kshitijkumbhar007@gmail.com"
                  className="hover:text-[#C86D51] font-mono text-xs transition-colors"
                >
                  kshitijkumbhar007@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs text-[#6E6C68] font-mono">
            <span>© 2026 Kshitij Kumbhar</span>
            <span className="text-[#C86D51]">Scandinavian Editorial</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
