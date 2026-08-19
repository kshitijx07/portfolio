"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EditorialAboutSection() {
  const pixelStaircase = [
    { top: "8%", left: "4%" },
    { top: "14%", left: "8%" },
    { top: "20%", left: "12%" },
    { top: "28%", left: "16%" },
    { top: "36%", left: "20%" },
    { top: "45%", left: "24%" },
    { top: "54%", left: "28%" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-[var(--border-color)] relative overflow-hidden bg-[#050505]">
      {/* Generative Dotted Texture Background */}
      <div className="absolute inset-0 opacity-20 hud-dot-grid pointer-events-none" />

      {/* Cascading Acid-Lime Pixel Staircase Motif */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        {pixelStaircase.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.9, 1.1, 0.9],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3 + idx * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.25,
            }}
            style={{ top: step.top, left: step.left }}
            className="absolute w-3.5 h-3.5 bg-[var(--accent-acid)] shadow-[0_0_14px_rgba(183,255,0,0.5)]"
          />
        ))}
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Framed Portrait with Neon Signature & Crosshairs */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 border border-white/15 bg-[#0D0D0D] p-3 shadow-2xl group">
              <span className="absolute -top-2 -left-2 font-mono text-xs text-[var(--accent-acid)]">+</span>
              <span className="absolute -top-2 -right-2 font-mono text-xs text-[var(--accent-acid)]">+</span>
              <span className="absolute -bottom-2 -left-2 font-mono text-xs text-[var(--accent-acid)]">+</span>
              <span className="absolute -bottom-2 -right-2 font-mono text-xs text-[var(--accent-acid)]">+</span>

              <div className="w-full h-full relative overflow-hidden bg-black/40 border border-white/10">
                <img
                  src="/icon.png"
                  alt="Kshitij Kumbhar Portrait"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#07145C]/40 via-transparent to-[var(--accent-acid)]/10 mix-blend-color-dodge pointer-events-none" />
              </div>

              {/* Neon Acid-Lime Handwritten Script Signature (Reference 2 Overlay) */}
              <div className="absolute -top-5 -left-4 z-20 pointer-events-none rotate-[-12deg]">
                <span className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[var(--accent-acid)] font-bold tracking-wide drop-shadow-[0_0_12px_rgba(183,255,0,0.6)]">
                  Kshitij
                </span>
              </div>

              {/* Circular Progress & Telemetry Ring on Corner (Reference Screenshot) */}
              <div className="absolute -bottom-3 -left-3 z-20 bg-[#050505] border border-white/20 p-1.5 flex items-center gap-1.5 font-mono text-[9px] text-white/80 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full border border-[var(--accent-acid)] border-t-transparent animate-spin" />
                <span>12:22 31°C</span>
              </div>

              {/* Pixel Accent Squares on Corner */}
              <div className="absolute -bottom-3 -right-3 flex gap-1 pointer-events-none">
                <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] shadow-[0_0_8px_rgba(183,255,0,0.5)]" />
                <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] shadow-[0_0_8px_rgba(183,255,0,0.5)]" />
              </div>
            </div>
          </div>

          {/* Right Column: Large Editorial Narrative based on verified resume */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-acid)] font-bold">
              <span className="w-2 h-2 bg-[var(--accent-acid)]" />
              <span>02 // SUMMARY & PROFILE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-display font-extrabold text-white tracking-tight leading-[1.25]">
              Computer Engineering student and DevOps Intern designing automated CI/CD pipelines, containerized microservices, and cloud infrastructure on AWS.
            </h2>

            <div className="text-base sm:text-lg md:text-xl text-white/70 font-display leading-relaxed space-y-4 pt-2">
              <p>
                Currently working as a{" "}
                <a
                  href="https://www.linkedin.com/in/kshitij-kumbhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold underline underline-offset-4 decoration-[var(--accent-acid)] hover:text-[var(--accent-acid)] transition-colors"
                >
                  DevOps Intern @ Colgate-Palmolive
                </a>{" "}
                (Mumbai Hybrid), automating deployment workflows with Jenkins, Docker, and Kubernetes on AWS.
              </p>

              <p>
                Pursuing B.Tech in Computer Engineering at{" "}
                <strong className="text-white underline underline-offset-4 decoration-white/30 font-semibold">
                  MIT Academy of Engineering, Pune
                </strong>{" "}
                (CGPA: <span className="text-[var(--accent-acid)] font-bold">8.48 / 10</span>) with active competitive programming on LeetCode (@kshitij72) and Codeforces (@kshitijx07).
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-3 font-mono text-xs">
              <div className="px-3 py-1.5 border border-white/15 bg-white/5 text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--accent-acid)]" />
                <span>AWS EKS & TERRAFORM</span>
              </div>
              <div className="px-3 py-1.5 border border-white/15 bg-white/5 text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--accent-acid)]" />
                <span>LEETCODE @kshitij72</span>
              </div>
              <div className="px-3 py-1.5 border border-white/15 bg-white/5 text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--accent-acid)]" />
                <span>CODEFORCES @kshitijx07</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
