"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";

export default function EditorialAboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const photoScale = useTransform(scrollYProgress, [0.1, 0.45], [0.92, 1.0]);
  const photoBlur = useTransform(scrollYProgress, [0.1, 0.45], ["blur(8px)", "blur(0px)"]);
  const signatureOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 border-t border-[var(--border-color)] relative overflow-hidden bg-[var(--bg-primary)]"
      data-cursor="About"
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left Column: Developing Framed Portrait & Dotted Curve Trail */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[360px] aspect-square">
              {/* Developing Portrait Container */}
              <motion.div
                style={{ scale: photoScale, filter: photoBlur }}
                className="relative w-full h-full border border-white/20 overflow-hidden bg-[#0D0D0D] shadow-2xl group"
              >
                <img
                  src="/hero_profile.jpg"
                  alt="Kshitij Kumbhar"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Corner Technical Metadata */}
                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 font-mono text-[9px] text-[var(--accent-acid)] font-bold">
                  // KSHITIJ_PORTRAIT.RAW
                </div>
              </motion.div>

              {/* Neon Lime Handwritten Signature (Kshitij) */}
              <motion.div
                style={{ opacity: signatureOpacity }}
                className="absolute -top-6 -left-6 z-20 pointer-events-none select-none"
              >
                <span className="font-serif italic text-4xl md:text-5xl text-[var(--accent-acid)] drop-shadow-[0_0_15px_rgba(183,255,0,0.8)] font-bold">
                  Kshitij
                </span>
              </motion.div>

              {/* Acid Lime Pixel Trail Curve (from reference screenshot) */}
              <div className="absolute -bottom-10 -right-10 pointer-events-none hidden sm:flex flex-col gap-2 z-10">
                <span className="w-2.5 h-2.5 bg-[var(--accent-acid)]" />
                <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] ml-3" />
                <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] ml-6" />
                <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] ml-9" />
              </div>
            </div>
          </div>

          {/* Right Column: Large Concise Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--text-primary)] leading-[1.12] tracking-tight">
                <ScrambleText text="I explore how to shape cloud infrastructure & AI workflows with craft and taste, building the next generation of scalable systems." />
              </h2>

              <p className="text-base sm:text-xl md:text-2xl text-[var(--text-secondary)] font-sans leading-relaxed">
                I'm a DevOps Intern at{" "}
                <span className="text-[var(--text-primary)] font-bold underline decoration-[var(--accent-acid)] decoration-2 underline-offset-4">
                  Colgate-Palmolive
                </span>
                , and previously engineered distributed systems across{" "}
                <a
                  href="#work"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-acid)] underline underline-offset-4 transition-colors"
                >
                  DSA Swarm AI
                </a>
                ,{" "}
                <a
                  href="#work"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-acid)] underline underline-offset-4 transition-colors"
                >
                  HostelHub
                </a>
                , and{" "}
                <a
                  href="#work"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-acid)] underline underline-offset-4 transition-colors"
                >
                  Campus Credential
                </a>
                .
              </p>
            </div>

            {/* Micro Metadata Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[var(--border-color)] font-mono text-xs text-[var(--text-secondary)]">
              <div>
                <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">ACADEMIC STANDING</span>
                <span className="text-[var(--text-primary)] font-bold">B.Tech CS @ MIT AOE (CGPA 8.48/10)</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">CORE DOMAINS</span>
                <span className="text-[var(--accent-acid)] font-bold">AWS EKS • TERRAFORM • RAG AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
