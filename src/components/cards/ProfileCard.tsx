"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="Profile"
      className="relative w-full paper-texture rounded-3xl p-6 md:p-8 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Washi Tape strip */}
      <div className="tape-strip hidden sm:block" />

      {/* Header section */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://github.com/kshitijx07.png"
              alt="Kshitij Kumbhar"
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-[#EFECE6] shadow-sm group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2D4030] border-2 border-white rounded-full" title="Active" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDE6] text-[#2D4030] text-xs font-medium tracking-wide mb-1">
              <Sparkles size={12} className="animate-pulse text-[#C86D51]" />
              <span>Open to Opportunities</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-editorial font-bold text-[#1A1918]">
              Kshitij Kumbhar
            </h2>
            <p className="text-xs md:text-sm text-[#6E6C68] font-mono">
              DevOps & Cloud Systems Engineer
            </p>
          </div>
        </div>

        <span className="postmark-stamp text-[10px] hidden md:block">
          PUNE • IND
        </span>
      </div>

      {/* Bio section */}
      <p className="text-sm md:text-base text-[#2B2A29] leading-relaxed mb-6 font-sans">
        Computer Engineering student based in Pune, India. Bridging high-performance backend microservices with automated cloud delivery pipelines.
      </p>

      {/* Pinned quote box */}
      <div className="bg-[#F9F7F4] border-l-2 border-[#C86D51] p-4 rounded-r-2xl mb-6">
        <p className="text-xs md:text-sm italic font-editorial text-[#1A1918]">
          &ldquo;Architecting cloud digital systems with Scandinavian precision and calm engineering.&rdquo;
        </p>
      </div>

      {/* Location & Quick Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8E3DA]">
        <div className="flex items-center gap-1.5 text-xs text-[#6E6C68]">
          <MapPin size={14} className="text-[#C86D51]" />
          <span>Pune, MH, India</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/kshitijx07"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918]"
            title="GitHub"
          >
            <FiGithub size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/kshitij-kumbhar-369777x/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918]"
            title="LinkedIn"
          >
            <FiLinkedin size={16} />
          </a>
          <a
            href="mailto:kshitijkumbhar007@gmail.com"
            className="w-9 h-9 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918]"
            title="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
