"use client";

import React, { useState } from "react";
import { GraduationCap, Award, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import EducationDetailModal, { EducationRecord } from "@/components/modals/EducationDetailModal";

const educationData: EducationRecord[] = [
  {
    institution: "MIT Academy of Engineering",
    degree: "B.Tech in Computer Engineering",
    location: "Pune, Maharashtra, India",
    duration: "2023 – 2027",
    score: "CGPA: 8.48 / 10",
    status: "CURRENTLY PURSUING // PRE-FINAL YEAR",
    highlights: [
      "Core Courses: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, Linux Administration.",
      "DevOps focus: Architected cloud-native Kubernetes deployments on AWS EKS and automated multi-branch CI/CD pipelines.",
      "Active competitive programmer with 257+ solved algorithmic problems on LeetCode (@kshitij72)."
    ],
    credentialLink: "https://mitaoe.ac.in",
  },
  {
    institution: "Yashwantrao Chavan Institute of Science",
    degree: "Higher Secondary Certificate (HSC) — Science",
    location: "Satara, Maharashtra, India",
    duration: "2021 – 2023",
    score: "Percentage: 84.17%",
    status: "COMPLETED // DISTINCTION",
    highlights: [
      "Rigorous pre-engineering foundation in Physics, Chemistry, Mathematics, and Computer Science.",
      "Maharashtra State Board Higher Secondary examination."
    ],
  },
  {
    institution: "Maharaja Sayajirao Vidyalaya",
    degree: "Secondary School Certificate (SSC)",
    location: "Satara, Maharashtra, India",
    duration: "Completed 2021",
    score: "Percentage: 97.00%",
    status: "COMPLETED // MERIT STANDING",
    highlights: [
      "Scored 97.00% in Maharashtra State Board examinations with top merit rank in the institution.",
      "Early excellence in Mathematics and Applied Sciences."
    ],
  },
];

export default function AboutEducationModule() {
  const [selectedRecord, setSelectedRecord] = useState<EducationRecord | null>(null);

  return (
    <>
      <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 flex flex-col justify-between h-full space-y-6" data-cursor="Education">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--accent-acid)] text-[#050505] flex items-center justify-center font-bold">
              <GraduationCap size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                  Academic Foundation
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                Computer Engineering & foundational coursework records
              </p>
            </div>
          </div>
          <span className="hud-tag hud-tag-acid text-[9px] self-start sm:self-auto">
            <ShieldCheck size={11} />
            <span>Verified Records</span>
          </span>
        </div>

        {/* Academic List */}
        <div className="space-y-4">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedRecord(edu)}
              className="p-5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] cursor-pointer transition-all duration-200 group space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="hud-tag text-[9px] font-bold">
                  {edu.duration}
                </span>
                <span className="font-mono text-xs text-[var(--accent-acid)] font-bold">
                  {edu.score}
                </span>
              </div>

              <div>
                <h4 className="text-base font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-acid)] transition-colors uppercase">
                  {edu.institution}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans">
                  {edu.degree}
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)]">
                <span>{edu.location}</span>
                <span className="text-[var(--accent-acid)] font-bold group-hover:underline flex items-center gap-1">
                  <span>Inspect</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EducationDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </>
  );
}
