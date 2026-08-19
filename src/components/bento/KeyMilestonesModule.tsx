"use client";

import React, { useState } from "react";
import { Trophy, Code2, Cloud, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import MilestoneStoryModal, { MilestoneDetail } from "@/components/modals/MilestoneStoryModal";

const milestonesData: MilestoneDetail[] = [
  {
    id: "colgate-devops",
    badge: "COLGATE-PALMOLIVE",
    title: "DevOps Intern (Mumbai Hybrid)",
    description: "Support application deployment, AWS cloud infrastructure, and Jenkins CI/CD automation workflows across Linux environments.",
    fullStory: "Working in a hybrid DevOps role at Colgate-Palmolive in Mumbai, contributing to automated CI/CD pipelines using Jenkins, Git, and GitHub. Managing containerized workloads with Docker and collaborating on Infrastructure as Code with Terraform.",
    date: "Jul 2026 – Present",
    category: "PROFESSIONAL // CLOUD",
  },
  {
    id: "leetcode-cp",
    badge: "LEETCODE 257+ XP",
    title: "Algorithmic Problem Solving",
    description: "Solved 257+ algorithmic challenges covering Arrays, Trees, Dynamic Programming, and Graph theory (@kshitij72).",
    fullStory: "Consistently practice competitive programming and algorithmic data structures on LeetCode (@kshitij72) with 257+ solved problems (104 Easy, 138 Medium, 15 Hard) and Codeforces (@kshitijx07) rating 1280 (Pupil).",
    date: "Active Telemetry",
    category: "ALGORITHMS // DSA",
  },
  {
    id: "ssc-merit",
    badge: "97.00% SSC MERIT",
    title: "Academic Distinction Standout",
    description: "Achieved 97.00% in Maharashtra State Board SSC examinations with institutional merit standing.",
    fullStory: "Secured 97.00% in the Secondary School Certificate (SSC) examinations from Maharaja Sayajirao Vidyalaya, Satara, establishing an early foundation in Mathematics and analytical sciences.",
    date: "2021",
    category: "ACADEMICS // MERIT",
  },
];

export default function KeyMilestonesModule() {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneDetail | null>(null);

  return (
    <>
      <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 flex flex-col justify-between h-full space-y-6" data-cursor="Milestone">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--accent-acid)] text-[#050505] flex items-center justify-center font-bold">
              <Trophy size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                  Verified Milestones & Honors
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                Key achievements across enterprise engineering & algorithms
              </p>
            </div>
          </div>
          <span className="hud-tag hud-tag-acid text-[9px] self-start sm:self-auto">
            <ShieldCheck size={11} />
            <span>Honors</span>
          </span>
        </div>

        {/* Milestone Cards */}
        <div className="space-y-4">
          {milestonesData.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMilestone(m)}
              className="p-5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] cursor-pointer transition-all duration-200 group space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="hud-tag hud-tag-acid text-[9px] font-bold">
                  {m.badge}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] font-bold">
                  {m.date}
                </span>
              </div>

              <div>
                <h4 className="text-base font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-acid)] transition-colors uppercase">
                  {m.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)]">
                <span>{m.category}</span>
                <span className="text-[var(--accent-acid)] font-bold group-hover:underline flex items-center gap-1">
                  <span>Inspect</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MilestoneStoryModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </>
  );
}
