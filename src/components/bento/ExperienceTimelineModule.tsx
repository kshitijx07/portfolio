"use client";

import React from "react";
import { Briefcase, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import AnimatedThreadLine from "@/components/ui/AnimatedThreadLine";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

const experiences = [
  {
    role: "DevOps Intern",
    company: "Colgate-Palmolive",
    location: "Mumbai, Maharashtra, India (Hybrid)",
    duration: "Jul 2026 – Present",
    tag: "ENTERPRISE // CLOUD",
    points: [
      "Support application deployment and infrastructure automation workflows within a DevOps team, contributing to CI/CD pipelines built with Jenkins, Git, and GitHub.",
      "Assist with AWS cloud infrastructure management and containerized application deployment using Docker across Linux-based staging and production environments.",
      "Collaborate with cross-functional engineering teams on deployment automation, contributing to Infrastructure as Code with Terraform and to monitoring initiatives."
    ]
  },
  {
    role: "Full Stack Developer Intern",
    company: "Campus Credential",
    location: "Remote",
    duration: "Jun 2025 – Aug 2025",
    tag: "SPRING BOOT // REACT",
    points: [
      "Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.",
      "Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.",
      "Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases."
    ]
  }
];

export default function ExperienceTimelineModule() {
  return (
    <PinterestCardWrapper stampText="CAREER // TIMELINE">
      <div className="w-full overflow-hidden" data-cursor="Timeline">
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA] dark:border-[#2E2C29]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2D4030] to-[#4E6E52] text-white flex items-center justify-center shadow-md">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7]">
                  Professional Engineering Timeline
                </h3>
                <span className="y2k-pill text-[10px] text-[#00E676]">
                  <Sparkles size={11} className="animate-pulse" />
                  <span>2 Industry Roles</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline with Thread Line */}
        <div className="relative pl-8 md:pl-10 space-y-8">
          <AnimatedThreadLine />

          {experiences.map((exp, idx) => (
            <div key={idx} className="relative z-10">
              <div className="absolute -left-[35px] md:-left-[43px] top-2 w-4 h-4 rounded-full bg-[#C86D51] dark:bg-[#E07A5F] border-2 border-white dark:border-[#1C1B19] shadow-md z-10 animate-pulse" />

              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-white/80 dark:border-white/10 shadow-sm hover:border-[#C86D51] dark:hover:border-[#E07A5F] hover:shadow-md transition-all duration-300 glass-specular-edge">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-full bg-[#C86D51]/10 dark:bg-[#E07A5F]/20 text-[#C86D51] dark:text-[#E07A5F] text-xs font-mono font-bold">
                    {exp.tag}
                  </span>
                  <span className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono flex items-center gap-1.5 font-semibold">
                    <Calendar size={13} className="text-[#00D2FF]" />
                    {exp.duration}
                  </span>
                </div>

                <h4 className="text-xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-0.5">
                  {exp.role}
                </h4>
                <p className="text-xs md:text-sm font-semibold text-[#00E676] dark:text-[#00E676] mb-3 flex items-center gap-1.5 font-mono">
                  <span>{exp.company}</span>
                  <span className="text-[#5C5955] dark:text-[#A3A098] font-normal">• {exp.location}</span>
                </p>

                <ul className="space-y-2 mt-3">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed">
                      <CheckCircle2 size={15} className="text-[#C86D51] dark:text-[#E07A5F] mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PinterestCardWrapper>
  );
}

