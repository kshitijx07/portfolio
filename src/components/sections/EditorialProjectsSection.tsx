"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Layers, Terminal, GitBranch, ShieldCheck } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { ProjectData } from "@/components/modals/CaseStudyModal";

interface EditorialProjectsSectionProps {
  projects: ProjectData[];
  onOpenCaseStudy: (project: ProjectData) => void;
}

const architectureDiagrams: Record<string, string[]> = {
  HostelHub: [
    "CLIENT BROWSER",
    "▼",
    "AWS CLOUDFRONT (OAC)",
    "├──► S3 BUCKET (STATIC REACT)",
    "└──► AWS EKS / NGINX INGRESS",
    "     └──► NODE.JS PODS (HPA 2→5)",
    "          └──► MONGODB ATLAS (SECRETS)",
  ],
  Grocito: [
    "CLIENT / ADMIN / DRIVER APPS",
    "▼",
    "SPRING BOOT REST BACKEND",
    "├──► RAZORPAY PAYMENT GATEWAY",
    "├──► REAL-TIME MAPPING SERVICE",
    "└──► OPTIMIZED MYSQL SCHEMAS",
  ],
  "Serverless AI X-Ray Analyzer": [
    "BROWSER UPLOAD",
    "▼",
    "S3 PRESIGNED URL (DIRECT TO S3)",
    "▼",
    "AWS LAMBDA (TERRAFORM IAC)",
    "├──► MOBILENET TFLITE CLASSIFIER (<1s)",
    "└──► DYNAMODB REAL-TIME STREAMING",
  ],
};

export default function EditorialProjectsSection({ projects, onOpenCaseStudy }: EditorialProjectsSectionProps) {
  return (
    <section id="work" className="py-16 md:py-24 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[var(--accent-acid)]" />
            <span className="font-mono text-xs text-[var(--accent-acid)] tracking-wider uppercase font-bold">
              01 // INDEXED WORKS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            Selected Cloud Engineering Systems
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm">
          Architectural case studies across Kubernetes orchestration, distributed backend portals, and serverless AI pipelines.
        </p>
      </div>

      {/* Editorial Case Study List */}
      <div className="space-y-16 md:space-y-24">
        {projects.map((project, idx) => {
          const archDiagram = architectureDiagrams[project.title] || [];

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              {/* Left/Main Column: High-Impact Visual Asset Stage with Technical Overlay */}
              <div
                onClick={() => onOpenCaseStudy(project)}
                className="lg:col-span-8 relative border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden cursor-pointer group/img"
                data-cursor="Project"
              >
                {/* Top HUD Bar on Asset */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-primary)]/90 border-b border-[var(--border-color)] font-mono text-[11px] text-[var(--text-secondary)]">
                  <span className="text-[var(--text-primary)] font-bold">
                    {project.title.toUpperCase()} // SYSTEM_VIEW
                  </span>
                  <span className="hud-tag hud-tag-acid text-[9px] py-0.5 px-2">
                    {project.category}
                  </span>
                </div>

                {/* Asset Screenshot */}
                <div className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] overflow-hidden bg-black/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/img:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Technical System Architecture Blueprint Overlay */}
                <div className="p-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)] font-mono text-[10px] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[var(--accent-acid)] font-bold mb-1">
                    <GitBranch size={12} />
                    <span>SYSTEM TOPOLOGY & FLOW DIAGRAM</span>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-3 border border-[var(--border-color)] text-[var(--text-secondary)] leading-relaxed space-y-0.5 select-none">
                    {archDiagram.map((line, lIdx) => (
                      <p key={lIdx} className={line.startsWith("▼") ? "text-[var(--accent-acid)] font-bold" : "text-[var(--text-primary)]"}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bottom Asset Meta Strip */}
                <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-primary)]/90 border-t border-[var(--border-color)] font-mono text-[10px] text-[var(--text-muted)]">
                  <span>STAGE // PRODUCTION DEPLOYED</span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Right Column: Case Study Narrative & Technical Matrix */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 pt-2">
                <div>
                  {/* Project Number & Status */}
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] mb-3">
                    <span>0{idx + 1} / 0{projects.length}</span>
                    <span className="text-[var(--accent-acid)] font-semibold">✦ VERIFIED ARCHITECTURE</span>
                  </div>

                  {/* Project Title */}
                  <h3
                    onClick={() => onOpenCaseStudy(project)}
                    className="text-2xl md:text-3xl font-display font-extrabold text-[var(--text-primary)] hover:text-[var(--accent-acid)] transition-colors cursor-pointer mb-3 uppercase tracking-tight flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight size={20} className="text-[var(--accent-acid)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  {/* Project Description */}
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-sans mb-6">
                    {project.description}
                  </p>

                  {/* Key Deliverable Bullet Points */}
                  <div className="space-y-2 mb-6 font-mono text-xs border-l-2 border-[var(--accent-acid)] pl-3">
                    {project.highlights.slice(0, 2).map((h, hIdx) => (
                      <p key={hIdx} className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                        • {h}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Tech Matrix Chips & Action Buttons */}
                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                  <div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-2 font-bold">
                      TECH STACK INFRASTRUCTURE
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 border border-[var(--border-color)] bg-[var(--bg-secondary)] font-mono text-[10px] text-[var(--text-primary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="hud-btn hud-tag-acid flex-1 justify-center py-2"
                    >
                      <span>Inspect Case Study</span>
                      <ArrowUpRight size={13} />
                    </button>

                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hud-btn p-2"
                        title="GitHub Repository"
                      >
                        <FiGithub size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
