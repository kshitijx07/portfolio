"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Sparkles, MessageSquare } from "lucide-react";

const notes = [
  {
    author: "Enterprise DevOps Lead",
    context: "Colgate-Palmolive Team",
    text: "Kshitij displays exceptional initiative in container automation, CI/CD pipeline optimization, and AWS cloud architecture setup."
  },
  {
    author: "Agile Project Mentor",
    context: "Campus Credential Sprint",
    text: "He led our Spring Boot and MySQL backend architecture seamlessly while ensuring all three portals stayed in sync for release."
  }
];

export default function TestimonialNotesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 md:p-8 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Tape Strip */}
      <div className="tape-strip hidden sm:block" />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F2E4DF] text-[#C86D51] border border-[#E8C8BE] flex items-center justify-center">
            <MessageSquare size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
              Peer Endorsements & Notes
            </h3>
            <p className="text-xs text-[#6E6C68] font-mono">
              Pinned Handwritten Testimonials
            </p>
          </div>
        </div>

        <Quote size={28} className="text-[#C86D51]/30 hidden sm:block" />
      </div>

      {/* Notes Stack */}
      <div className="space-y-4">
        {notes.map((n, idx) => (
          <div
            key={idx}
            className="bg-[#F9F7F4] p-5 rounded-2xl border border-[#E8E3DA] relative shadow-sm hover:border-[#C86D51] transition-colors"
          >
            <p className="text-xs md:text-sm italic font-editorial text-[#1A1918] mb-3 leading-relaxed">
              &ldquo;{n.text}&rdquo;
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#E8E3DA]">
              <span className="text-xs font-bold text-[#2D4030]">
                {n.author}
              </span>
              <span className="text-[11px] font-mono text-[#6E6C68]">
                {n.context}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
