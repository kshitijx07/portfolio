"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Cloud, Terminal, Code2, ShieldCheck, X } from "lucide-react";

const milestones = [
  {
    id: "aws-eks",
    title: "AWS Cloud Architect",
    issuer: "AWS & Kubernetes",
    icon: Cloud,
    color: "#B7FF00",
    story: "Designed decoupled AWS CloudFront distributions routing to private S3 and EKS microservices with zero CORS overhead."
  },
  {
    id: "jenkins",
    title: "CI/CD Automation",
    issuer: "Jenkins & Docker",
    icon: Terminal,
    color: "#B7FF00",
    story: "Engineered multi-stage Docker builds and split Jenkins pipelines automating 100% of rolling Kubernetes updates."
  },
  {
    id: "cp-solver",
    title: "DSA & CP Solver",
    issuer: "LeetCode & Codeforces",
    icon: Code2,
    color: "#B7FF00",
    story: "Solved 257+ problems across LeetCode & Codeforces focusing on dynamic programming, graph theory, and algorithmic optimization."
  },
  {
    id: "fullstack",
    title: "Full Stack Craftsman",
    issuer: "Spring Boot & React",
    icon: ShieldCheck,
    color: "#00D2FF",
    story: "Built three-portal web ecosystems with real-time mapping, payment gateways, and scalable MySQL/MongoDB schema architecture."
  }
];

export default function KeyMilestonesModule() {
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);

  return (
    <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 flex flex-col justify-between h-full" data-cursor="Badges">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--accent-acid)]" />
            <h3 className="text-xl md:text-2xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
              Honors & Accolades
            </h3>
          </div>
          <span className="hud-tag hud-tag-acid text-[9px]">
            <Trophy size={11} />
            <span>4 Milestones</span>
          </span>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
          Key engineering achievements spanning cloud architecture, CI/CD automation, and algorithmic mastery.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMilestone(m)}
              className="p-4 border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--accent-acid)] cursor-pointer transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 bg-[var(--bg-surface)] border border-[var(--border-color)] group-hover:border-[var(--accent-acid)] flex items-center justify-center text-[var(--accent-acid)] mb-2.5 transition-colors">
                <m.icon size={18} />
              </div>
              <h4 className="text-xs font-display font-bold text-[var(--text-primary)] uppercase mb-0.5">
                {m.title}
              </h4>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                {m.issuer}
              </span>
            </div>
          ))}
        </div>
      </div>

      <span className="text-[10px] font-mono text-[var(--text-muted)] block text-center mt-4">
        ✦ Click any badge to inspect story
      </span>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[var(--bg-surface)] border border-[var(--accent-acid)] p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--accent-acid)]" />
                  <h4 className="text-base font-display font-bold text-[var(--text-primary)] uppercase">
                    {selectedMilestone.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="hud-btn p-1"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                {selectedMilestone.story}
              </p>

              <div className="pt-2 border-t border-[var(--border-color)] flex justify-between items-center font-mono text-[10px] text-[var(--text-muted)]">
                <span>ISSUER // {selectedMilestone.issuer}</span>
                <span className="text-[var(--accent-acid)]">VERIFIED</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
