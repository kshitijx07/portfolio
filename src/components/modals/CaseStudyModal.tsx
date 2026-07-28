"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Cpu, Layers } from "lucide-react";
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-[#FFFDF9] dark:bg-[#1C1B19] text-[#1A1918] dark:text-[#FAF9F7] rounded-3xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden transition-colors"
        >
          {/* Sticky Header with Fixed Close Button */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FFFDF9]/95 dark:bg-[#1C1B19]/95 backdrop-blur-md border-b border-[#E8E3DA] dark:border-[#2E2C29]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#F2E4DF] dark:bg-[#38241E] text-[#C86D51] dark:text-[#E07A5F] text-xs font-mono font-bold">
                {project.category}
              </span>
              <span className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono font-medium">{project.year}</span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white dark:hover:text-white flex items-center justify-center transition-colors text-[#1A1918] dark:text-[#FAF9F7] shadow-sm active:scale-95"
              title="Close Case Study"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
              {project.title}
            </h2>

            {/* Banner Image */}
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-[#E8E3DA] dark:border-[#2E2C29] bg-[#EFECE6] dark:bg-[#242220] shadow-sm">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Executive Summary & Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2">
                <h3 className="text-lg font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-2 flex items-center gap-2 transition-colors">
                  <Layers size={18} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  Executive Summary
                </h3>
                <p className="text-sm md:text-base text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed transition-colors font-sans">
                  {project.longDescription}
                </p>
              </div>

              {/* Links Box */}
              <div className="bg-[#F9F7F4] dark:bg-[#242220] p-5 rounded-2xl border border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
                <span className="text-xs font-mono text-[#5C5955] dark:text-[#A3A098] uppercase tracking-wider block mb-3 font-semibold">
                  Links & Repositories
                </span>
                <div className="flex flex-col gap-2.5">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29] text-xs font-mono font-medium text-[#1A1918] dark:text-[#FAF9F7] hover:border-[#C86D51] dark:hover:border-[#E07A5F] hover:text-[#C86D51] dark:hover:text-[#E07A5F] transition-all shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <FiGithub size={15} />
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
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#2D4030] dark:bg-[#4E6E52] text-white text-xs font-mono font-medium hover:bg-[#1A1918] dark:hover:bg-[#E07A5F] transition-all shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink size={15} />
                        Live Deployment
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Key Deliverables & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F9F7F4] dark:bg-[#242220] p-6 rounded-2xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm transition-colors">
                <h4 className="text-base font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-4 flex items-center gap-2 transition-colors">
                  <CheckCircle2 size={18} className="text-[#2D4030] dark:text-[#4E6E52]" />
                  Key Engineering Deliverables
                </h4>
                <ul className="space-y-3">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] transition-colors">
                      <span className="text-[#C86D51] dark:text-[#E07A5F] font-bold mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F9F7F4] dark:bg-[#242220] p-6 rounded-2xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm transition-colors">
                <h4 className="text-base font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-4 flex items-center gap-2 transition-colors">
                  <Cpu size={18} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  Architecture & Security
                </h4>
                <ul className="space-y-3">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] transition-colors">
                      <span className="text-[#2D4030] dark:text-[#4E6E52] font-bold mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="pb-4">
              <span className="text-xs font-mono text-[#5C5955] dark:text-[#A3A098] uppercase tracking-wider block mb-3 font-semibold transition-colors">
                Technologies & Infrastructure Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] text-[#1A1918] dark:text-[#FAF9F7] text-xs font-mono transition-colors"
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
