"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Server,
  Database,
  Cpu,
  Terminal,
  Code2,
  ArrowUpRight,
  Download,
} from "lucide-react";

// WebGL Scenes & Shaders
import HeroAboutScene from "@/components/canvas/HeroAboutScene";
import ContinuousSectionsBg from "@/components/canvas/ContinuousSectionsBg";

// DOM & HUD Components
import HeroHUD from "@/components/dom/HeroHUD";
import PolarityCard from "@/components/dom/PolarityCard";
import Projects from "@/components/sections/Projects";
import ContactClosingSection from "@/components/dom/ContactClosingSection";
import { Badge } from "@/components/ui/badge";
import { getScrollEngine } from "@/lib/scroll-engine";
import { subscribeScroll, ScrollSnapshot } from "@/lib/bus";

export default function PortfolioPage() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // ── ADVANCED SCROLL & PARALLAX ORCHESTRATION ──────────────────────────────
  useEffect(() => {
    const engine = getScrollEngine();
    const cleanup = engine.initMasterChoreography(mainContainerRef.current);

    // Scroll-Linked Top Laser Progress Bar
    const unsubScroll = subscribeScroll((snap: ScrollSnapshot) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${snap.progress})`;
      }
    });

    return () => {
      cleanup();
      unsubScroll();
    };
  }, []);

  return (
    <div
      ref={mainContainerRef}
      className="relative w-full bg-[#00104A] text-white selection:bg-[#ED3C3F] selection:text-white"
    >
      {/* ── 1. Scroll-Linked Viewport Top Laser Rail ─────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-[#ED3C3F] via-[#FF5A3C] to-[#3B82F6] origin-left scale-x-0 shadow-[0_0_14px_rgba(237,60,63,0.95)] will-change-transform"
        />
      </div>

      {/* ── Fixed 3D Canvas Scene for Hero (3D Spider & Web) ───── */}
      <HeroAboutScene />

      {/* ── Fixed HUD Overlay (Coordinates, Nav, Weather, Grid) ── */}
      <HeroHUD />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO VIEWPORT
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative z-10 flex h-screen w-full flex-col justify-end p-8 md:p-14 pb-20"
      >
        <div className="hero-parallax-content max-w-4xl space-y-4 will-change-transform">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.98] text-white">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                I Bring
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Craft &amp; Taste
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                To Digital Work
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-sm sm:text-base text-zinc-300 max-w-xl font-mono leading-relaxed pt-2"
          >
            Building automated, containerized, cloud-native systems — from CI/CD pipelines to Kubernetes-orchestrated microservices on AWS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-wrap items-center gap-3 pt-4 pointer-events-auto"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="min-h-[46px] px-6 py-3 bg-[#ED3C3F] text-white font-mono text-xs font-black uppercase tracking-wider hover:bg-[#ED3C3F]/90 transition-colors rounded-xs flex items-center gap-2 shadow-xl shadow-[#ED3C3F]/30 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowUpRight size={15} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="min-h-[46px] px-6 py-3 bg-[#252324] border border-white/20 text-white font-mono text-xs font-black uppercase tracking-wider hover:border-[#ED3C3F] transition-colors rounded-xs flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Download CV (PDF)</span>
              <Download size={15} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="min-h-[46px] px-6 py-3 bg-transparent border border-white/20 text-white/80 font-mono text-xs font-black uppercase tracking-wider hover:border-[#ED3C3F] hover:text-[#ED3C3F] transition-colors rounded-xs cursor-pointer"
            >
              Contact
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: ABOUT / BIO & RESUME SUMMARY (Enhanced Parallax)
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="relative z-10 flex min-h-screen w-full items-center bg-[#050505]/90 backdrop-blur-md px-8 py-24 md:px-14 border-t border-white/10 [content-visibility:auto] [contain-intrinsic-size:1px_800px]"
      >
        <div className="about-content-wrapper grid w-full grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          {/* Left Column: Deep 3D Portrait Card Parallax Float */}
          <div className="about-portrait-card lg:col-span-4 lg:sticky lg:top-28 flex flex-col items-center lg:items-start space-y-4 will-change-transform">
            <PolarityCard src="/me.webp" alt="Kshitij Kumbhar" />
          </div>

          {/* Right Column: Exact Resume Summary with Bio Counter-Drift */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 text-[#ED3C3F] font-mono text-xs uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED3C3F]" />
              <span>01 // PROFESSIONAL SUMMARY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-snug tracking-tight text-white/95">
              I explore how to shape <span className="font-semibold text-white">cloud infrastructure</span> and <span className="font-semibold text-white">microservices</span> with craft and taste, building the next generation of scalable architectures.
            </h2>

            <div className="about-bio-text space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans will-change-transform">
              <p>
                Computer Engineering student and DevOps Intern with hands-on experience designing CI/CD pipelines, containerized microservices, and cloud infrastructure on AWS. Delivered fully automated deployment workflows using Jenkins, Docker, and Kubernetes across two production-style projects, removing manual release effort entirely.
              </p>
              <p>
                Strong foundation in Data Structures, Object-Oriented Programming, and SQL, with active competitive programming practice on LeetCode and Codeforces. Seeking DevOps and cloud infrastructure roles focused on automation, scalability, and system reliability.
              </p>
            </div>

            {/* Competitive Programming & Direct Channels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15 pt-6 font-mono text-sm">
              <a
                href="https://leetcode.com/u/kshitij72/"
                target="_blank"
                rel="noreferrer"
                className="scroll-reveal-card p-3 bg-[#252324]/80 hover:bg-[#252324] border border-white/10 hover:border-[#ED3C3F]/60 rounded-sm block transition-colors group min-h-[52px]"
              >
                <span className="block text-white/60 text-xs font-bold uppercase tracking-wider">LEETCODE</span>
                <span className="text-[#ED3C3F] group-hover:underline font-bold text-sm">@kshitij72</span>
              </a>

              <a
                href="https://codeforces.com/profile/kshitijx07"
                target="_blank"
                rel="noreferrer"
                className="scroll-reveal-card p-3 bg-[#252324]/80 hover:bg-[#252324] border border-white/10 hover:border-[#ED3C3F]/60 rounded-sm block transition-colors group min-h-[52px]"
              >
                <span className="block text-white/60 text-xs font-bold uppercase tracking-wider">CODEFORCES</span>
                <span className="text-[#ED3C3F] group-hover:underline font-bold text-sm">@kshitijx07</span>
              </a>

              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noreferrer"
                className="scroll-reveal-card p-3 bg-[#252324]/80 hover:bg-[#252324] border border-white/10 hover:border-[#ED3C3F]/60 rounded-sm block transition-colors group min-h-[52px]"
              >
                <span className="block text-white/60 text-xs font-bold uppercase tracking-wider">GITHUB</span>
                <span className="text-[#ED3C3F] group-hover:underline font-bold text-sm">@kshitijx07</span>
              </a>

              <div className="scroll-reveal-card p-3 bg-[#ED3C3F]/10 border border-[#ED3C3F]/30 rounded-sm block min-h-[52px]">
                <span className="block text-white/60 text-xs font-bold uppercase tracking-wider">STATUS</span>
                <span className="text-[#ED3C3F] font-bold text-sm">OPEN TO ROLES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTIONS 3–6: UNIFIED SINGLE CONTINUOUS 3D BACKGROUND
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative w-full">
        {/* Single Vertically Continuous 3D Canvas Background */}
        <ContinuousSectionsBg />

        {/* ── SECTION 3: PROFESSIONAL EXPERIENCE (Enhanced 3D Parallax) ── */}
        <section
          id="experience"
          className="relative z-10 min-h-screen bg-[#080808]/75 px-6 sm:px-10 md:px-14 py-24 border-t border-white/10 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1px_900px]"
        >
          <div className="relative z-10 max-w-7xl mx-auto space-y-10">
            {/* Header Banner with Clean Spatial Margins (No Overlap) */}
            <div className="section-header-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-[#252324]/90 backdrop-blur-md p-6 rounded-sm shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-[#ED3C3F] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#ED3C3F] animate-pulse" />
                  <span>02 // WORK EXPERIENCE</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                  Production Experience
                </h2>
              </div>
              <span className="font-mono text-xs sm:text-sm text-white/60 font-bold">2025 — PRESENT</span>
            </div>

            {/* Experience Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-2">
              {/* Experience 1: Colgate-Palmolive (Parallax Left + Scroll Reveal) */}
              <div className="scroll-reveal-card velocity-skew-target exp-card-left border border-white/15 bg-[#252324]/95 p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#ED3C3F]/70 transition-colors rounded-sm shadow-2xl will-change-transform">
                <div className="space-y-5">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="bg-[#ED3C3F] text-white font-mono text-xs font-black px-3 py-1 uppercase tracking-wider rounded-xs shadow-md">
                        ENTERPRISE HYBRID
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">Colgate-Palmolive</h3>
                      <p className="font-mono text-sm sm:text-base text-[#ED3C3F] font-bold mt-1">DevOps Intern</p>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-white/60 font-semibold shrink-0">Jul 2026 – Present</span>
                  </div>

                  <div className="font-mono text-xs sm:text-sm text-white/50">
                    Mumbai, Maharashtra, India (Hybrid)
                  </div>

                  <ul className="space-y-3.5 text-sm sm:text-base text-zinc-300 leading-relaxed pt-2">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#ED3C3F] mt-1 shrink-0 font-bold">▹</span>
                      <span>Support application deployment and infrastructure automation workflows within a DevOps team, contributing to CI/CD pipelines built with Jenkins, Git, and GitHub.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#ED3C3F] mt-1 shrink-0 font-bold">▹</span>
                      <span>Assist with AWS cloud infrastructure management and containerized application deployment using Docker across Linux-based staging and production environments.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#ED3C3F] mt-1 shrink-0 font-bold">▹</span>
                      <span>Collaborate with cross-functional engineering teams on deployment automation, contributing to Infrastructure as Code with Terraform and to monitoring initiatives.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                  {["AWS", "Terraform", "Docker", "Jenkins", "Git", "GitHub Actions", "Linux CLI"].map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs font-mono font-semibold text-white/90 border-white/20 hover:border-[#ED3C3F]/50 px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience 2: Campus Credential (Parallax Right + Scroll Reveal) */}
              <div className="scroll-reveal-card velocity-skew-target exp-card-right border border-white/15 bg-[#252324]/95 p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#3B82F6]/70 transition-colors rounded-sm shadow-2xl will-change-transform">
                <div className="space-y-5">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="bg-[#3B82F6] text-white font-mono text-xs font-black px-3 py-1 uppercase tracking-wider rounded-xs shadow-md">
                        REMOTE INTERNSHIP
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">Campus Credential</h3>
                      <p className="font-mono text-sm sm:text-base text-[#3B82F6] font-bold mt-1">Full Stack Developer Intern</p>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-white/60 font-semibold shrink-0">Jun 2025 – Aug 2025</span>
                  </div>

                  <div className="font-mono text-xs sm:text-sm text-white/50">
                    Remote Sprint Delivery
                  </div>

                  <ul className="space-y-3.5 text-sm sm:text-base text-zinc-300 leading-relaxed pt-2">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#3B82F6] mt-1 shrink-0 font-bold">▹</span>
                      <span>Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#3B82F6] mt-1 shrink-0 font-bold">▹</span>
                      <span>Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#3B82F6] mt-1 shrink-0 font-bold">▹</span>
                      <span>Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                  {["Spring Boot", "MySQL", "React.js", "REST APIs", "Agile", "MVC Architecture"].map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs font-mono font-semibold text-white/90 border-white/20 hover:border-[#3B82F6]/50 px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FEATURED CLOUD & AI PROJECTS (2x2 Gallery Parallax) ── */}
        <Projects />

        {/* ── SECTION 5: TECHNICAL SKILLS (3-Column Waterfall Parallax) ── */}
        <section
          id="skills"
          className="relative z-10 min-h-screen bg-[#080808]/75 px-6 sm:px-10 md:px-14 py-24 border-t border-white/10 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1px_900px]"
        >
          <div className="relative z-10 max-w-7xl mx-auto space-y-10">
            {/* Header Banner (No Overlap) */}
            <div className="section-header-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-[#252324]/90 backdrop-blur-md p-6 rounded-sm shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-[#ED3C3F] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#ED3C3F] animate-pulse" />
                  <span>04 // TECHNICAL COMPETENCIES</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                  Technical Skills
                </h2>
              </div>
              <span className="font-mono text-xs sm:text-sm text-white/60 font-bold">RESUME SKILLS DIRECTORY</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-2">
              {/* 1. DevOps & Cloud Infrastructure (Column 0 Parallax) */}
              <div className="scroll-reveal-card velocity-skew-target skill-card-col-0 border border-white/15 bg-[#252324]/95 p-7 sm:p-8 space-y-5 rounded-sm hover:border-[#ED3C3F]/70 transition-colors shadow-xl will-change-transform">
                <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[#ED3C3F]">
                  <Cloud size={20} />
                  <span>DevOps &amp; Cloud Infrastructure</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AWS (EKS, ECR, CloudFront, VPC, ALB, IAM, EC2, S3, Auto Scaling)",
                    "Terraform (IaC)",
                    "Docker",
                    "Kubernetes",
                    "Jenkins",
                    "GitHub Actions",
                    "CI/CD Pipelines",
                  ].map((skill) => (
                    <span key={skill} className="bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-xs font-medium text-white/90 rounded-xs hover:border-[#ED3C3F] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Databases & Vector Stores (Column 1 Parallax) */}
              <div className="scroll-reveal-card velocity-skew-target skill-card-col-1 border border-white/15 bg-[#252324]/95 p-7 sm:p-8 space-y-5 rounded-sm hover:border-[#3B82F6]/70 transition-colors shadow-xl will-change-transform">
                <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[#3B82F6]">
                  <Database size={20} />
                  <span>Databases &amp; Vector Stores</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Pinecone (Vector Store)", "MongoDB Atlas", "MySQL"].map((skill) => (
                    <span key={skill} className="bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-xs font-medium text-white/90 rounded-xs hover:border-[#3B82F6] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Backend Development (Column 2 Parallax) */}
              <div className="scroll-reveal-card velocity-skew-target skill-card-col-2 border border-white/15 bg-[#252324]/95 p-7 sm:p-8 space-y-5 rounded-sm hover:border-[#ED3C3F]/70 transition-colors shadow-xl will-change-transform">
                <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[#ED3C3F]">
                  <Server size={20} />
                  <span>Backend Development</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express.js", "Spring Boot", "RESTful APIs"].map((skill) => (
                    <span key={skill} className="bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-xs font-medium text-white/90 rounded-xs hover:border-[#ED3C3F] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. AI & Multi-Agent Systems (Column 0 Parallax) */}
              <div className="scroll-reveal-card velocity-skew-target skill-card-col-0 border border-white/15 bg-[#252324]/95 p-7 sm:p-8 space-y-5 rounded-sm hover:border-[#ED3C3F]/70 transition-colors shadow-xl will-change-transform">
                <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[#ED3C3F]">
                  <Cpu size={20} />
                  <span>AI &amp; Multi-Agent Systems</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "LangGraph",
                    "RAG (Retrieval-Augmented Generation)",
                    "Model Context Protocol (MCP)",
                    "LangChain",
                    "Vector Embeddings",
                  ].map((skill) => (
                    <span key={skill} className="bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-xs font-medium text-white/90 rounded-xs hover:border-[#ED3C3F] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. Frontend Development (Column 1 Parallax) */}
              <div className="scroll-reveal-card velocity-skew-target skill-card-col-1 border border-white/15 bg-[#252324]/95 p-7 sm:p-8 space-y-5 rounded-sm hover:border-[#3B82F6]/70 transition-colors shadow-xl will-change-transform">
                <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[#3B82F6]">
                  <Code2 size={20} />
                  <span>Frontend Development</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React.js", "Vite", "Tailwind CSS", "HTML", "CSS", "JavaScript", "TypeScript"].map((skill) => (
                    <span key={skill} className="bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-xs font-medium text-white/90 rounded-xs hover:border-[#3B82F6] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6. Core Computer Science Concepts (Column 2 Parallax) */}
              <div className="scroll-reveal-card velocity-skew-target skill-card-col-2 border border-white/15 bg-[#252324]/95 p-7 sm:p-8 space-y-5 rounded-sm hover:border-[#ED3C3F]/70 transition-colors shadow-xl will-change-transform">
                <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[#ED3C3F]">
                  <Terminal size={20} />
                  <span>Core CS Concepts &amp; Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Data Structures and Algorithms (DSA)",
                    "Object-Oriented Programming (OOP)",
                    "DBMS",
                    "Operating Systems",
                    "Linux CLI",
                    "Git",
                    "GitHub",
                    "DockerHub",
                    "Postman",
                  ].map((skill) => (
                    <span key={skill} className="bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-xs font-medium text-white/90 rounded-xs hover:border-[#ED3C3F] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: EDUCATION & ACADEMIC STANDING ───────────── */}
        <section
          id="education"
          className="relative z-10 min-h-screen bg-[#050505]/75 px-6 sm:px-10 md:px-14 py-24 border-t border-white/10 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1px_800px]"
        >
          <div className="relative z-10 max-w-7xl mx-auto space-y-10">
            {/* Header Banner (No Overlap) */}
            <div className="section-header-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-[#252324]/90 backdrop-blur-md p-6 rounded-sm shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-[#ED3C3F] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#ED3C3F] animate-pulse" />
                  <span>05 // ACADEMIC PROFILE</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                  Education
                </h2>
              </div>
              <span className="font-mono text-xs sm:text-sm text-white/60 font-bold">VERIFIED ACADEMIC RECORD</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
              {/* 1. B.Tech Computer Engineering (Parallax Card 1) */}
              <div className="scroll-reveal-card velocity-skew-target edu-card-1 border border-white/15 bg-[#252324]/95 p-8 sm:p-10 space-y-6 rounded-sm hover:border-[#ED3C3F]/70 transition-colors flex flex-col justify-between shadow-2xl will-change-transform">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#ED3C3F] text-white font-mono text-xs font-black px-3 py-1 uppercase rounded-xs shadow-md">
                      UNDERGRADUATE
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-white/60 font-bold">2023 – 2027</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Bachelor of Technology in Computer Engineering</h3>
                  <p className="text-sm text-zinc-300 font-mono leading-relaxed">
                    MIT Academy of Engineering, Pune, Maharashtra
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 font-mono text-sm sm:text-base">
                  <span className="text-white/60">CGPA: </span>
                  <span className="text-[#ED3C3F] font-black text-lg">8.48 / 10</span>
                </div>
              </div>

              {/* 2. HSC (Parallax Card 2) */}
              <div className="scroll-reveal-card velocity-skew-target edu-card-2 border border-white/15 bg-[#252324]/95 p-8 sm:p-10 space-y-6 rounded-sm hover:border-[#ED3C3F]/70 transition-colors flex flex-col justify-between shadow-2xl will-change-transform">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/15 text-white font-mono text-xs font-black px-3 py-1 uppercase rounded-xs border border-white/20">
                      HSC // STATE BOARD
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-white/60 font-bold">2023</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Higher Secondary Certificate (HSC)</h3>
                  <p className="text-sm text-zinc-300 font-mono leading-relaxed">
                    Yashwantrao Chavan Institute of Science, Satara, Maharashtra
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 font-mono text-sm sm:text-base">
                  <span className="text-white/60">Percentage: </span>
                  <span className="text-[#ED3C3F] font-black text-lg">84.17%</span>
                </div>
              </div>

              {/* 3. SSC (Parallax Card 3) */}
              <div className="scroll-reveal-card velocity-skew-target edu-card-3 border border-white/15 bg-[#252324]/95 p-8 sm:p-10 space-y-6 rounded-sm hover:border-[#ED3C3F]/70 transition-colors flex flex-col justify-between shadow-2xl will-change-transform">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/15 text-white font-mono text-xs font-black px-3 py-1 uppercase rounded-xs border border-white/20">
                      SSC // STATE BOARD
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-white/60 font-bold">2021</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Secondary School Certificate (SSC)</h3>
                  <p className="text-sm text-zinc-300 font-mono leading-relaxed">
                    Maharaja Sayajirao Vidyalaya, Satara, Maharashtra
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 font-mono text-sm sm:text-base">
                  <span className="text-white/60">Percentage: </span>
                  <span className="text-[#ED3C3F] font-black text-lg">97.00%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: FINAL CONTACT & CLOSING VIEWPORT
      ═══════════════════════════════════════════════════════════ */}
      <ContactClosingSection />
    </div>
  );
}
