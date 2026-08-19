"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, Layers, Sparkles, ShieldCheck } from "lucide-react";
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
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-white/95 dark:bg-[#181615]/95 text-[#1A1918] dark:text-[#FAF9F7] rounded-3xl border border-white/80 dark:border-white/10 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden glass-specular-edge backdrop-blur-2xl"
        >
          {/* Sticky Header with Fixed Close Button */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-[#181615]/90 backdrop-blur-xl border-b border-[#E8E3DA] dark:border-[#2E2C29]">
            <div className="flex items-center gap-3">
              <span className="y2k-pill text-xs text-[#C86D51] dark:text-[#E07A5F]">
                <Sparkles size={11} className="text-[#C86D51] dark:text-[#E07A5F]" />
                <span>{project.category}</span>
              </span>
              <span className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono font-bold">{project.year}</span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-2xl bg-white/60 dark:bg-white/5 hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white dark:hover:text-white border border-white/80 dark:border-white/10 flex items-center justify-center transition-all text-[#1A1918] dark:text-[#FAF9F7] shadow-sm active:scale-95 cursor-pointer"
              title="Close Case Study"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7]">
              {project.title}
            </h2>

            {/* Banner Image */}
            <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-white/40 dark:bg-black/40 shadow-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Executive Summary & Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2">
                <h3 className="text-lg font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-2 flex items-center gap-2">
                  <Layers size={18} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  <span>Executive Architecture Summary</span>
                </h3>
                <p className="text-sm md:text-base text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed font-sans">
                  {project.longDescription}
                </p>
              </div>

              {/* Links Box */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/80 dark:border-white/10 shadow-sm">
                <span className="text-xs font-mono text-[#5C5955] dark:text-[#A3A098] uppercase tracking-wider block mb-3 font-bold">
                  Links & Repositories
                </span>
                <div className="flex flex-col gap-2.5">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-white/10 border border-white/80 dark:border-white/10 text-xs font-mono font-bold text-[#1A1918] dark:text-[#FAF9F7] hover:border-[#C86D51] dark:hover:border-[#E07A5F] hover:text-[#C86D51] dark:hover:text-[#E07A5F] transition-all shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <FiGithub size={15} />
                        <span>GitHub Repository</span>
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#00E676] text-black text-xs font-mono font-bold hover:bg-[#00c966] transition-all shadow-md"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink size={15} />
                        <span>Live Production Deployment</span>
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Key Deliverables & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/80 dark:border-white/10 shadow-sm">
                <h4 className="text-base font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#00E676]" />
                  <span>Key Engineering Deliverables</span>
                </h4>
                <ul className="space-y-3">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7]">
                      <span className="text-[#C86D51] dark:text-[#E07A5F] font-bold mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/80 dark:border-white/10 shadow-sm">
                <h4 className="text-base font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-4 flex items-center gap-2">
                  <Cpu size={18} className="text-[#00D2FF]" />
                  <span>Architecture & Security</span>
                </h4>
                <ul className="space-y-3">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7]">
                      <span className="text-[#00D2FF] font-bold mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="pb-4">
              <span className="text-xs font-mono text-[#5C5955] dark:text-[#A3A098] uppercase tracking-wider block mb-3 font-bold">
                Technologies & Infrastructure Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 text-[#1A1918] dark:text-[#FAF9F7] text-xs font-mono font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

