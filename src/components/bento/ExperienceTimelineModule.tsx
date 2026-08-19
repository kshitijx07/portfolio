"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "DevOps Intern",
    company: "Colgate-Palmolive",
    location: "Mumbai, Maharashtra, India (Hybrid)",
    duration: "Jul 2026 – Present",
    tag: "ENTERPRISE // DEVOPS & CLOUD",
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
    tag: "SPRING BOOT // GROCITO",
    points: [
      "Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.",
      "Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.",
      "Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases."
    ]
  }
];

export default function ExperienceTimelineModule() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const lineHeight = useSpring(scrollYProgress, { damping: 25, stiffness: 200 });

  return (
    <section ref={containerRef} id="experience" className="py-16 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 space-y-6" data-cursor="Timeline">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--accent-acid)] text-[#050505] flex items-center justify-center font-bold">
              <Briefcase size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                  Professional Engineering Timeline
                </h3>
                <span className="hud-tag hud-tag-acid text-[9px]">
                  <span>2 Roles</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline with Progressive Thread Line */}
        <div className="relative pl-6 md:pl-8 space-y-6">
          {/* Background Track Line */}
          <div className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-white/10" />

          {/* Animated Thread Line */}
          <motion.div
            style={{ scaleY: lineHeight }}
            className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-[var(--accent-acid)] origin-top shadow-[0_0_10px_rgba(183,255,0,0.6)]"
          />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative p-6 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] transition-colors space-y-4"
            >
              {/* Timeline Pin Indicator */}
              <div className="absolute -left-[27px] md:-left-[35px] top-6 w-3 h-3 bg-[var(--accent-acid)] border-2 border-[#050505] shadow-[0_0_8px_rgba(183,255,0,0.8)]" />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="hud-tag hud-tag-acid text-[10px]">
                  {exp.tag}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5 font-bold">
                  <Calendar size={13} className="text-[var(--accent-acid)]" />
                  {exp.duration}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-display font-extrabold text-[var(--text-primary)] uppercase">
                  {exp.role}
                </h4>
                <p className="text-xs md:text-sm font-semibold text-[var(--accent-acid)] font-mono mt-0.5">
                  <span>{exp.company}</span>
                  <span className="text-[var(--text-muted)] font-normal"> • {exp.location}</span>
                </p>
              </div>

              <ul className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                    <span className="text-[var(--accent-acid)] font-bold mt-0.5">▹</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
