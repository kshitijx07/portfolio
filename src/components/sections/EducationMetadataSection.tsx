"use client";

import React from "react";
import { GraduationCap, Award, ShieldCheck } from "lucide-react";

export default function EducationMetadataSection() {
  return (
    <section className="py-12 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 space-y-6" data-cursor="Education">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--accent-acid)] text-[#050505] flex items-center justify-center font-bold">
              <GraduationCap size={16} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--accent-acid)] font-bold tracking-wider block">
                04 // ACADEMIC STANDING & FOUNDATION
              </span>
              <h3 className="text-xl md:text-2xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                Computer Engineering & Scientific Merit
              </h3>
            </div>
          </div>
          <span className="hud-tag hud-tag-acid text-[9px] hidden sm:inline-flex">
            VERIFIED CREDENTIALS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* B.Tech */}
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
            <span className="hud-tag hud-tag-acid text-[9px]">2023 – 2027</span>
            <h4 className="text-base font-display font-extrabold text-[var(--text-primary)] uppercase">
              B.Tech in Computer Engineering
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-sans">
              MIT Academy of Engineering, Pune
            </p>
            <div className="pt-2 border-t border-[var(--border-color)] font-mono text-xs text-[var(--accent-acid)] font-bold">
              CGPA // 8.48 / 10
            </div>
          </div>

          {/* HSC */}
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
            <span className="hud-tag text-[9px] text-[var(--text-secondary)]">2021 – 2023</span>
            <h4 className="text-base font-display font-extrabold text-[var(--text-primary)] uppercase">
              HSC (12th Science)
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-sans">
              Yashwantrao Chavan Institute of Science
            </p>
            <div className="pt-2 border-t border-[var(--border-color)] font-mono text-xs text-white/90 font-bold">
              SCORE // 84.17%
            </div>
          </div>

          {/* SSC */}
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
            <span className="hud-tag text-[9px] text-[var(--text-secondary)]">2021</span>
            <h4 className="text-base font-display font-extrabold text-[var(--text-primary)] uppercase">
              SSC (10th Board)
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-sans">
              Maharaja Sayajirao Vidyalaya, Satara
            </p>
            <div className="pt-2 border-t border-[var(--border-color)] font-mono text-xs text-white/90 font-bold">
              SCORE // 97.00% (Top Merit)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
