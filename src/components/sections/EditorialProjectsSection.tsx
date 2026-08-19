"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active project based on scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const numProjects = projects.length;
      const index = Math.min(Math.floor(latest * numProjects), numProjects - 1);
      setActiveIdx(index);
    });
  }, [scrollYProgress, projects.length]);

  const activeProject = projects[activeIdx] || projects[0];
  const archDiagram = architectureDiagrams[activeProject.title] || [];
  const meta = projectThemes[activeProject.title] || { badge: "CODING PROJECT", tag: "SYSTEM" };

  return (
    <section id="work" className="border-t border-[var(--border-color)] relative bg-[#050505]">
      {/* Pinned Desktop Experience Track */}
      <div ref={containerRef} className="relative hidden lg:block h-[320vh]">
        <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-between py-12 px-8 max-w-[1500px] mx-auto overflow-hidden">
          {/* Top Stage Bar with Live Progress Indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-white/15">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] shadow-[0_0_8px_rgba(183,255,0,0.6)]" />
              <span className="font-mono text-xs text-[var(--accent-acid)] tracking-wider uppercase font-extrabold">
                01 // PINNED DIGITAL ARCHIVE
              </span>
            </div>

            <div className="font-mono text-xs flex items-center gap-4 text-white/80 font-bold">
              <span>PROJECT 0{activeIdx + 1} / 0{projects.length}</span>
              <div className="w-24 h-1.5 bg-white/10 overflow-hidden flex">
                <div
                  className="bg-[var(--accent-acid)] h-full transition-all duration-200"
                  style={{ width: `${((activeIdx + 1) / projects.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main Pinned Stage Composition */}
          <div className="grid grid-cols-12 gap-8 items-center my-auto">
            {/* Left Column: Cross-fading Narrative & Flow Blueprint */}
            <div className="col-span-5 flex flex-col justify-between space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-white/60">
                    <span className="hud-tag hud-tag-acid text-[9px]">
                      {meta.badge}
                    </span>
                    <span>• {meta.tag}</span>
                  </div>

                  <h3
                    onClick={() => onOpenCaseStudy(activeProject)}
                    className="text-3xl xl:text-4xl font-display font-extrabold text-white hover:text-[var(--accent-acid)] transition-colors cursor-pointer uppercase tracking-tight flex items-center justify-between"
                  >
                    <span>{activeProject.title}</span>
                    <ArrowUpRight size={26} className="text-[var(--accent-acid)]" />
                  </h3>

                  <p className="text-xs xl:text-sm text-white/70 leading-relaxed font-sans">
                    {activeProject.description}
                  </p>

                  {/* Flow Blueprint Box */}
                  <div className="p-3.5 bg-[#141414] border border-white/10 font-mono text-[10px] space-y-1">
                    <div className="flex items-center gap-1 text-[var(--accent-acid)] font-bold mb-1">
                      <GitBranch size={11} />
                      <span>SYSTEM ARCHITECTURE BLUEPRINT</span>
                    </div>
                    {archDiagram.slice(0, 5).map((line, lIdx) => (
                      <p key={lIdx} className={line.startsWith("▼") ? "text-[var(--accent-acid)] font-bold" : "text-white/80"}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div>
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block mb-2 font-bold">
                      INFRASTRUCTURE MATRIX
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 border border-white/15 bg-white/5 font-mono text-[10px] text-white/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trigger Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onOpenCaseStudy(activeProject)}
                      className="hud-btn hud-tag-acid flex-1 justify-center py-2.5 font-bold"
                    >
                      <span>Inspect Case Study</span>
                      <ArrowUpRight size={14} />
                    </button>

                    {activeProject.github && activeProject.github !== "#" && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hud-btn p-2.5 border-white/20 text-white hover:border-[var(--accent-acid)]"
                        title="GitHub Repository"
                      >
                        <FiGithub size={15} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Warm Paper Showcase Visual */}
            <div className="col-span-7 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0, scale: 0.96, x: 25 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.96, x: -25 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onOpenCaseStudy(activeProject)}
                  className="relative bg-[#FAF9F6] p-6 border border-white/20 text-[#050505] cursor-pointer group shadow-2xl"
                  data-cursor="Project"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 font-mono text-[11px] text-black/60 font-semibold">
                    <span>SYSTEM_VIEW // PRODUCTION</span>
                    <span className="text-black font-bold uppercase">{activeProject.category}</span>
                  </div>

                  <div className="relative w-full h-[380px] xl:h-[440px] overflow-hidden bg-black/5 border border-black/10">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between font-mono text-[11px] text-black/80">
                    <span className="font-bold uppercase tracking-wider">{activeProject.title}™ ARCHITECTURE</span>
                    <span className="text-black/60">CLICK TO EXPAND FULL BLUEPRINT →</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Stage Status */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-xs text-white/50">
            <span>SCROLL DOWN TO PROGRESS ARCHIVE</span>
            <span>KSHITIJ.DESIGN // 2026</span>
          </div>
        </div>
      </div>

      {/* Mobile / Small Screen Natural Scroll List Fallback */}
      <div className="lg:hidden py-16 px-4 space-y-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[var(--accent-acid)]" />
          <span className="font-mono text-xs text-[var(--accent-acid)] font-bold uppercase">
            01 // INDEXED WORKS
          </span>
        </div>

        {projects.map((project) => (
          <div
            key={project.title}
            onClick={() => onOpenCaseStudy(project)}
            className="p-5 border border-white/15 bg-[#0D0D0D] space-y-4 cursor-pointer"
          >
            <div className="relative w-full h-[240px] overflow-hidden bg-black/10 border border-white/10">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <span className="hud-tag hud-tag-acid text-[9px] mb-1.5 inline-block">
                {project.category}
              </span>
              <h4 className="text-xl font-display font-extrabold text-white uppercase">
                {project.title}
              </h4>
              <p className="text-xs text-white/70 mt-1 font-sans">
                {project.description}
              </p>
            </div>

            <button className="hud-btn hud-tag-acid w-full justify-center py-2 font-bold text-xs">
              <span>Inspect Case Study</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
