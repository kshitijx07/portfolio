"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Cpu, ShieldCheck, Layers } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export interface ProjectData {
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  highlights: string[];
  architecture: string[];
}

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-[#1A1918]/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl paper-texture rounded-3xl p-6 md:p-10 border border-[#E8E3DA] shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918]"
          >
            <X size={20} />
          </button>

          {/* Category & Year */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-medium">
              {project.category}
            </span>
            <span className="text-xs text-[#6E6C68] font-mono">{project.year}</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-editorial font-bold text-[#1A1918] mb-4">
            {project.title}
          </h2>

          {/* Banner Image */}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border border-[#E8E3DA] shadow-sm">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Summary & Action buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-2">
              <h3 className="text-lg font-editorial font-bold text-[#1A1918] mb-2 flex items-center gap-2">
                <Layers size={18} className="text-[#C86D51]" />
                Executive Summary
              </h3>
              <p className="text-sm md:text-base text-[#2B2A29] leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="bg-[#F9F7F4] p-5 rounded-2xl border border-[#E8E3DA] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#6E6C68] uppercase tracking-wider block mb-3">
                  Links & Repositories
                </span>
                <div className="flex flex-col gap-2.5">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-[#E8E3DA] text-xs font-medium text-[#1A1918] hover:border-[#C86D51] hover:text-[#C86D51] transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <FiGithub size={14} />
                        GitHub Repository
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#2D4030] text-white text-xs font-medium hover:bg-[#1A1918] transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink size={14} />
                        Live Deployment
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E8E3DA] shadow-sm">
              <h4 className="text-base font-editorial font-bold text-[#1A1918] mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2D4030]" />
                Key Engineering Deliverables
              </h4>
              <ul className="space-y-3">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#2B2A29]">
                    <span className="text-[#C86D51] font-bold mt-0.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E8E3DA] shadow-sm">
              <h4 className="text-base font-editorial font-bold text-[#1A1918] mb-4 flex items-center gap-2">
                <Cpu size={16} className="text-[#C86D51]" />
                Architecture & Security
              </h4>
              <ul className="space-y-3">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#2B2A29]">
                    <span className="text-[#2D4030] font-bold mt-0.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <span className="text-xs font-mono text-[#6E6C68] uppercase tracking-wider block mb-3">
              Technologies & Infrastructure Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-[#EFECE6] text-[#1A1918] text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
