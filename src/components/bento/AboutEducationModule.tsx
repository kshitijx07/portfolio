"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";

export default function AboutEducationModule() {
  return (
    <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 flex flex-col justify-between h-full" data-cursor="About">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--accent-acid)]" />
            <h3 className="text-xl md:text-2xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
              Engineering Foundation
            </h3>
          </div>
          <span className="hud-tag hud-tag-acid text-[9px]">
            <span>CGPA 8.48 / 10</span>
          </span>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
          Computer Engineering scholar focusing on distributed cloud systems, Kubernetes orchestration on AWS EKS, and high-concurrency backend services.
        </p>

        {/* Academic Timeline Rows */}
        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] transition-colors">
            <div className="flex items-center justify-between text-[var(--text-primary)] font-bold mb-1.5">
              <span className="flex items-center gap-2">
                <GraduationCap size={16} className="text-[var(--accent-acid)]" />
                MIT Academy of Engineering, Pune
              </span>
              <span className="hud-tag text-[9px]">
                2023 – 2027
              </span>
            </div>
            <span className="text-[var(--text-secondary)] block text-[11px]">
              B.Tech – Computer Engineering • CGPA: <strong className="text-[var(--text-primary)]">8.48 / 10</strong>
            </span>
          </div>

          <div className="p-3.5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] transition-colors">
            <div className="flex items-center justify-between text-[var(--text-primary)] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Award size={14} className="text-[var(--accent-acid)]" />
                Yashwantrao Chavan Institute of Science
              </span>
              <span className="text-[var(--accent-acid)] font-bold">84.17%</span>
            </div>
            <span className="text-[var(--text-muted)] block text-[11px]">
              HSC – Maharashtra State Board (2023)
            </span>
          </div>

          <div className="p-3.5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] transition-colors">
            <div className="flex items-center justify-between text-[var(--text-primary)] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Award size={14} className="text-[var(--accent-acid)]" />
                Maharaja Sayajirao Vidyalaya
              </span>
              <span className="text-[var(--accent-acid)] font-bold">97.00%</span>
            </div>
            <span className="text-[var(--text-muted)] block text-[11px]">
              SSC – Maharashtra State Board (2021)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


