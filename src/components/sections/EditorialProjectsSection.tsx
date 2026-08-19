"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { ProjectData } from "@/components/modals/CaseStudyModal";

interface EditorialProjectsSectionProps {
  projects: ProjectData[];
  onOpenCaseStudy: (project: ProjectData) => void;
}

const architectureDiagrams: Record<string, string[]> = {
  "DSA Swarm AI": [
    "CLIENT / MCP PROTOCOL",
    "▼",
    "CLOUDFRONT CDN ──► AWS ALB",
    "▼",
    "AWS EKS (KUBERNETES) / DOCKER",
    "├──► LANGGRAPH MULTI-AGENT SWARM",
    "├──► PINECONE (768-DIM VECTOR RAG)",
    "└──► GEMINI 2.5 FLASH (4-KEY POOL)",
  ],
  HostelHub: [
    "CLIENT BROWSER",
    "▼",
    "AWS CLOUDFRONT (OAC)",
    "├──► S3 BUCKET (STATIC REACT)",
    "└──► AWS EKS / NGINX INGRESS",
    "     └──► NODE.JS PODS (HPA 2→5)",
    "          └──► MONGODB ATLAS (SECRETS)",
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
  Grocito: [
    "CLIENT / ADMIN / DRIVER APPS",
    "▼",
    "SPRING BOOT REST BACKEND",
    "├──► RAZORPAY PAYMENT GATEWAY",
    "├──► REAL-TIME MAPPING SERVICE",
    "└──► OPTIMIZED MYSQL SCHEMAS",
  ],
};

const projectThemes: Record<string, { badge: string; tag: string }> = {
  "DSA Swarm AI": { badge: "AI & CLOUD SYSTEM", tag: "01 / MULTI-AGENT RAG & EKS" },
  HostelHub: { badge: "CODING PROJECT", tag: "02 / CLOUD ARCHITECTURE" },
  "Serverless AI X-Ray Analyzer": { badge: "AI & SERVERLESS", tag: "03 / AWS LAMBDA & TERRAFORM" },
  Grocito: { badge: "FULL STACK SYSTEM", tag: "04 / SPRING BOOT & REACT" },
};

export default function EditorialProjectsSection({ projects, onOpenCaseStudy }: EditorialProjectsSectionProps) {
  const archivePixelSteps = [
    { top: "6%", left: "2%" },
    { top: "12%", left: "5%" },
    { top: "18%", left: "8%" },
    { top: "24%", left: "11%" },
    { top: "30%", left: "14%" },
  ];

  return (
    <section id="work" className="py-20 md:py-28 border-t border-[var(--border-color)] relative overflow-hidden bg-[#050505]">
      {/* Margin pixel steps */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        {archivePixelSteps.map((step, idx) => (
          <motion.div
            key={idx}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 3.5 + idx * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.2,
            }}
            style={{ top: step.top, left: step.left }}
            className="absolute w-3 h-3 bg-[var(--accent-acid)] shadow-[0_0_12px_rgba(183,255,0,0.4)]"
          />
        ))}
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 relative z-10 space-y-16">
        {/* Section Header (Matches user image reference) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] shadow-[0_0_8px_rgba(183,255,0,0.6)]" />
              <span className="font-mono text-xs text-[var(--accent-acid)] tracking-wider uppercase font-extrabold">
                01 // INDEXED WORKS
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white uppercase">
              Production Systems & Case Studies
            </h2>
          </div>
          <p className="font-mono text-xs text-white/60 max-w-sm">
            Architectural case studies across Kubernetes orchestration, multi-agent AI swarms, distributed backends, and serverless pipelines.
          </p>
        </div>

        {/* Digital Archive Editorial Case Study Cards */}
        <div className="space-y-20 md:space-y-28">
          {projects.map((project, idx) => {
            const archDiagram = architectureDiagrams[project.title] || [];
            const meta = projectThemes[project.title] || { badge: "CODING PROJECT", tag: "SYSTEM" };

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative border border-white/15 bg-[#0D0D0D] p-4 sm:p-6 md:p-8 space-y-6"
              >
                {/* Floating Acid-Lime Badge */}
                <div className="absolute -top-3 right-6 z-20">
                  <span className="px-3.5 py-1 bg-[var(--accent-acid)] text-[#050505] font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(183,255,0,0.5)]">
                    [{meta.badge}]
                  </span>
                </div>

                {/* Top Card Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 font-mono text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent-acid)] font-bold">{meta.tag}</span>
                    <span>• {project.title.toUpperCase()}</span>
                  </div>
                  <span>YEAR // {project.year}</span>
                </div>

                {/* Main Asymmetric Composition */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Warm Paper Showcase */}
                  <div
                    onClick={() => onOpenCaseStudy(project)}
                    className="lg:col-span-8 relative bg-[#FAF9F6] p-4 sm:p-6 md:p-8 border border-white/20 text-[#050505] cursor-pointer group"
                    data-cursor="Project"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 font-mono text-[11px] text-black/60 font-semibold">
                      <span>SYSTEM_VIEW // PRODUCTION</span>
                      <span className="text-black font-bold uppercase">{project.category}</span>
                    </div>

                    <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] overflow-hidden bg-black/5 border border-black/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>

                    <div className="pt-4 mt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-black/80">
                      <span className="font-bold uppercase tracking-wider">{project.title}™ ARCHITECTURE</span>
                      <span className="text-black/60">CLICK TO EXPAND FULL BLUEPRINT →</span>
                    </div>
                  </div>

                  {/* Right Column: Narrative & Flow Blueprint */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 pt-2">
                    <div className="space-y-4">
                      <h3
                        onClick={() => onOpenCaseStudy(project)}
                        className="text-2xl md:text-3xl font-display font-extrabold text-white hover:text-[var(--accent-acid)] transition-colors cursor-pointer uppercase tracking-tight flex items-center justify-between"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight size={22} className="text-[var(--accent-acid)]" />
                      </h3>

                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                        {project.description}
                      </p>

                      <div className="p-3.5 bg-[#141414] border border-white/10 font-mono text-[10px] space-y-1">
                        <div className="flex items-center gap-1 text-[var(--accent-acid)] font-bold mb-1">
                          <GitBranch size={11} />
                          <span>FLOW BLUEPRINT</span>
                        </div>
                        {archDiagram.slice(0, 5).map((line, lIdx) => (
                          <p key={lIdx} className={line.startsWith("▼") ? "text-[var(--accent-acid)] font-bold" : "text-white/80"}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <div>
                        <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block mb-2 font-bold">
                          INFRASTRUCTURE MATRIX
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 border border-white/15 bg-white/5 font-mono text-[10px] text-white/90"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => onOpenCaseStudy(project)}
                          className="hud-btn hud-tag-acid flex-1 justify-center py-2.5 font-bold"
                        >
                          <span>Inspect Case Study</span>
                          <ArrowUpRight size={14} />
                        </button>

                        {project.github && project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hud-btn p-2.5 border-white/20 text-white hover:border-[var(--accent-acid)]"
                            title="GitHub Repository"
                          >
                            <FiGithub size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
