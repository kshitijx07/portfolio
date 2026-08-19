"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Terminal, Cloud, Server, Database, Cpu, Layers,
  ArrowUpRight, Mail, Phone, Download, Code2,
  Menu, X, ExternalLink, ChevronDown, Globe
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageStreamHero from "@/components/ui/image-stream-hero";
import BlackHoleHeroSection from "@/components/ui/blackhole-hero-section";
import ScrambleText from "@/components/ui/ScrambleText";

/* ── Technical Images for Corridor ── */
const ARCH_IMAGES = [
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop", alt: "Cloud Infrastructure" },
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop", alt: "Server Rack Grid" },
  { src: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop", alt: "Kubernetes Pods Orchestration" },
  { src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop", alt: "AI Multi-Agent RAG Swarms" },
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", alt: "Distributed Cloud Topology" },
  { src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop", alt: "Enterprise Systems Network" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", alt: "Global Cloud CDN Backbone" },
  { src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop", alt: "Abstract Systems Matrix" },
];

/* ── Resume Projects ── */
const PROJECTS = [
  {
    index: "/01",
    badge: "CLOUD DEVOPS",
    title: "HostelHub",
    period: "Jan – Mar 2026",
    tags: ["AWS EKS", "Kubernetes", "Jenkins", "Docker", "CloudFront", "S3", "ALB", "Node.js", "React.js", "MongoDB Atlas"],
    summary: "Cloud-native hostel management platform with decoupled React frontend on S3 and Node.js REST API on AWS EKS with role-based access control. Unified CloudFront distribution routing static and API traffic through OAC-secured S3 and an NGINX Ingress-backed ALB, eliminating CORS overhead. Docker multi-stage builds with HPA scaling 2→5 replicas at 70% CPU. Split Jenkins CI/CD pipeline covering full frontend S3 sync/invalidation and backend DockerHub/kubectl rollout.",
    github: "https://github.com/kshitijx07/Hostelhub",
    live: "https://hostelhub-ruby.vercel.app",
  },
  {
    index: "/02",
    badge: "SERVERLESS AI",
    title: "Serverless AI X-Ray Analyzer",
    period: "Apr – May 2026",
    tags: ["AWS Lambda", "Terraform", "GitHub Actions", "API Gateway", "S3", "DynamoDB", "MobileNet TFLite"],
    summary: "Event-driven medical imaging platform using MobileNet TFLite for chest X-ray classification in under 1 second at zero idle cost. Three-Lambda backend behind API Gateway with CORS enforcement and per-second throttling. S3 presigned-URL upload flow increasing effective limit 5× (10MB → 50MB). Fully automated Terraform IaC with GitHub Actions CI/CD pipeline and real-time DynamoDB polling for AI confidence scores.",
    github: "https://github.com/kshitijx07/serverless-ai-xray",
    live: null,
  },
  {
    index: "/03",
    badge: "MULTI-AGENT RAG",
    title: "DSA Swarm AI",
    period: "2026",
    tags: ["AWS EKS", "LangGraph", "MCP Server", "Pinecone", "RAG", "Gemini 2.5 Flash", "Terraform", "Docker", "GitHub Actions", "Node.js"],
    summary: "Distributed Multi-Agent RAG Swarm and Model Context Protocol (MCP) Server using LangGraph, Gemini 2.5 Flash, and Pinecone (768-dim vector store) with autonomous Supervisor routing and sub-second retrieval. 4-key API rotation pool multiplying throughput from 15 RPM to 60 RPM (4× quota expansion). Sub-6s end-to-end latency on AWS EKS behind CloudFront CDN with automated GitOps CI/CD to Amazon ECR.",
    github: "https://github.com/kshitijx07",
    live: null,
  },
];

/* ── 6 Categorized Bento Skills ── */
const SKILLS = [
  {
    icon: Cloud,
    category: "DevOps & Cloud Infrastructure",
    items: ["AWS (EKS, ECR, CloudFront, VPC, ALB, IAM, EC2, S3, Auto Scaling)", "Terraform (IaC)", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "CI/CD Pipelines"],
  },
  {
    icon: Database,
    category: "Databases & Vector Stores",
    items: ["Pinecone (Vector DB)", "MongoDB Atlas", "MySQL"],
  },
  {
    icon: Server,
    category: "Backend Engineering",
    items: ["Node.js", "Express.js", "Spring Boot", "RESTful APIs", "Microservices"],
  },
  {
    icon: Cpu,
    category: "AI & Multi-Agent Systems",
    items: ["LangGraph", "RAG (Retrieval-Augmented Generation)", "Model Context Protocol (MCP)", "LangChain"],
  },
  {
    icon: Layers,
    category: "Frontend Development",
    items: ["React.js", "Vite", "Tailwind CSS", "HTML5", "CSS3", "JavaScript (ES6+)"],
  },
  {
    icon: Terminal,
    category: "Core CS & Toolchain",
    items: ["Data Structures & Algorithms (DSA)", "OOP", "DBMS", "Operating Systems", "Linux CLI", "Git", "GitHub", "DockerHub", "Postman"],
  },
];

const NAV_LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#skills", label: "SKILLS" },
  { href: "#education", label: "EDUCATION" },
  { href: "#contact", label: "CONTACT" },
];

function SectionHeader({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 mb-10 sm:mb-14 border-b border-white/10">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#C0FE04] font-bold tracking-[0.2em]">{index}</span>
        <span className="w-6 h-px bg-[#C0FE04]/40" />
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">{title}</h2>
      </div>
      {subtitle && <span className="font-mono text-xs text-[#6b6b6b] uppercase tracking-widest">{subtitle}</span>}
    </div>
  );
}

function ProjectArchiveCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 rounded-none transition-all duration-300"
      style={{ borderColor: hovered ? "rgba(192,254,4,0.4)" : "rgba(255,255,255,0.08)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top right HAOQI Neon Tag */}
      <div className="absolute top-0 right-0 bg-[#C0FE04] text-black font-mono font-bold text-[10px] sm:text-xs px-3 py-1 uppercase tracking-wider shadow-[0_0_12px_rgba(192,254,4,0.4)]">
        {project.badge}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-4">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-[#6b6b6b]">{project.index}</span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6b6b6b]">{project.period}</span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-white/10 text-[#6b6b6b] hover:text-[#C0FE04] hover:border-[#C0FE04]/40 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
            aria-label={`${project.title} GitHub`}
          >
            <FiGithub size={15} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 text-[#6b6b6b] hover:text-[#C0FE04] hover:border-[#C0FE04]/40 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
              aria-label={`${project.title} Live`}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm sm:text-base text-[#8a8a8a] leading-relaxed mb-6 max-w-4xl">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-[#ededed]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 124, y: 63 });
  const [timeString, setTimeString] = useState("");

  /* Live Pointer Coordinate Bus */
  useEffect(() => {
    const handlePointer = (e: MouseEvent) => {
      setPointer({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handlePointer);
    return () => window.removeEventListener("mousemove", handlePointer);
  }, []);

  /* Live Clock */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setTimeString(`IST IN ${hours}:${mins} 28°C`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(10,10,10,0)", "rgba(10,10,10,0.95)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-[#C0FE04] selection:text-black relative pb-20">
      
      {/* ── Fixed Technical Background Crosshairs Grid ── */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dot-grid opacity-50" />

      {/* ── Fixed Bottom HUD Bar (HAOQI Signature) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-2.5 flex items-center justify-between font-mono text-[11px] text-[#6b6b6b] select-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C0FE04] animate-pulse" />
          <span className="text-[#ededed] font-medium">{timeString || "IST IN 15:21 28°C"}</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 font-mono text-zinc-400 bg-white/5 px-3 py-0.5 rounded border border-white/5">
          <span>{String(pointer.x).padStart(4, '0')} X {String(pointer.y).padStart(4, '0')} Y</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#ededed] hidden md:inline">SYSTEM[OK]</span>
          <Globe size={14} className="text-[#C0FE04] animate-spin-slow" />
        </div>
      </div>

      {/* ── Persistent Top Nav ── */}
      <motion.header
        style={{ backgroundColor: navBg, borderColor: navBorder }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="#" className="font-bold font-mono text-sm tracking-tight text-white flex items-center gap-2">
              <span className="bg-[#C0FE04] text-black px-1.5 py-0.5 font-extrabold text-xs">KK</span>
              <span className="tracking-wider">KSHITIJ.DESIGN</span>
            </a>
            <span className="hidden lg:inline font-mono text-xs text-[#6b6b6b] border-l border-white/10 pl-6">
              Thinking in systems. Automating with precision.
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-[#6b6b6b]">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#C0FE04] transition-colors tracking-widest py-2">
                [{l.label}]
              </a>
            ))}
            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="bg-[#C0FE04] text-black font-bold px-3 py-1.5 hover:bg-[#d4ff1a] transition-all flex items-center gap-1.5 min-h-[34px]"
            >
              <span>RESUME</span>
              <Download size={12} />
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#6b6b6b] hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-white/10 bg-[#0a0a0a] px-6 py-6 space-y-4"
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-mono text-sm text-[#8a8a8a] hover:text-[#C0FE04] py-1"
                >
                  [{l.label}]
                </a>
              ))}
              <div className="pt-3 border-t border-white/10">
                <a
                  href="/Kshitij_Kumbhar_Resume.pdf"
                  download="Kshitij_Kumbhar_Resume.pdf"
                  className="flex items-center justify-center gap-2 bg-[#C0FE04] text-black font-bold font-mono text-xs py-3 w-full min-h-[44px]"
                >
                  DOWNLOAD RESUME (PDF) <Download size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── § 1 HERO SECTION ── */}
      <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-16">
        {/* Calibrated Spacetime Raymarched Backdrop */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <BlackHoleHeroSection
            distance={26}
            elevation={-6}
            spinSpeed={0.04}
            doppler={0.28}
            glow={0.7}
            steps={160}
            resolution={0.65}
            hotColor="#E0F7FA"
            midColor="#00E5FF"
            coolColor="#006064"
            focus={[0.74, 0.44]}
            scrim="left"
            scrimStrength={0.92}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#C0FE04]/10 border border-[#C0FE04]/30 text-[#C0FE04] font-mono text-xs px-3 py-1 font-bold uppercase tracking-wider">
                DEVOPS & CLOUD INFRASTRUCTURE
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[0.96]">
              I BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                SCALABLE SYSTEMS
              </span> <br />
              <span className="text-white">& CLOUD PIPELINES</span>
            </h1>

            <div className="font-mono text-sm sm:text-base text-[#C0FE04] font-semibold pt-1">
              <ScrambleText text="Kshitij Kumbhar — DevOps & Cloud Infrastructure Engineer" speed={28} />
            </div>

            <p className="text-base sm:text-lg text-[#8a8a8a] leading-relaxed max-w-2xl">
              Computer Engineering student who has shipped fully automated Jenkins/Docker/Kubernetes deployment pipelines on AWS across production-style projects, with a strong DSA/OOP/SQL foundation and active competitive programming on LeetCode and Codeforces.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="bg-[#C0FE04] text-black font-bold font-mono text-xs sm:text-sm px-7 py-3.5 hover:bg-[#d4ff1a] transition-all min-h-[44px] flex items-center justify-center shadow-[0_0_20px_rgba(192,254,4,0.25)]"
              >
                EXPLORE WORK
              </a>
              <a
                href="#contact"
                className="border border-white/20 bg-black/40 text-white font-mono text-xs sm:text-sm px-6 py-3.5 hover:border-[#C0FE04] hover:text-[#C0FE04] transition-all min-h-[44px] flex items-center justify-center"
              >
                CONTACT ME
              </a>
              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="border border-white/10 bg-white/5 text-[#ededed] font-mono text-xs sm:text-sm px-6 py-3.5 hover:bg-white/10 transition-all min-h-[44px] flex items-center gap-2 justify-center"
              >
                <Download size={14} className="text-[#C0FE04]" />
                <span>RESUME PDF</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs text-[#6b6b6b]">
              <a href="https://github.com/kshitijx07" target="_blank" rel="noopener noreferrer" className="hover:text-[#C0FE04] flex items-center gap-1.5 py-1">
                <FiGithub size={14} /> <span>@kshitijx07</span>
              </a>
              <a href="https://linkedin.com/in/kshitij-kumbhar" target="_blank" rel="noopener noreferrer" className="hover:text-[#C0FE04] flex items-center gap-1.5 py-1">
                <FiLinkedin size={14} /> <span>/kshitij-kumbhar</span>
              </a>
              <a href="https://leetcode.com/u/kshitij72/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C0FE04] flex items-center gap-1.5 py-1">
                <Code2 size={14} /> <span>LeetCode @kshitij72</span>
              </a>
              <a href="https://codeforces.com/profile/kshitijx07" target="_blank" rel="noopener noreferrer" className="hover:text-[#C0FE04] flex items-center gap-1.5 py-1">
                <Terminal size={14} /> <span>Codeforces @kshitijx07</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── § 2 ARCHITECTURE CORRIDOR (ImageStreamHero) ── */}
      <section className="border-y border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between font-mono text-[10px] text-[#6b6b6b] uppercase tracking-widest">
          <div className="flex items-center gap-2 text-[#C0FE04]">
            <span className="w-1.5 h-1.5 bg-[#C0FE04]" />
            <span>LIVE 3D PERSPECTIVE STREAM // CONTAINERIZED WORKLOADS</span>
          </div>
          <span className="hidden sm:inline">SYSTEMS • CLOUD • AUTOMATION</span>
        </div>

        <ImageStreamHero
          images={ARCH_IMAGES}
          cards={9}
          speed={28}
          axis={50}
          className="h-[320px] sm:h-[380px] w-full bg-[#0a0a0a]"
        >
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none">
            <span className="font-mono text-xs text-[#C0FE04] tracking-[0.3em] uppercase mb-2">
              DISTRIBUTED TOPOLOGY
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AWS EKS • KUBERNETES • MULTI-AGENT RAG
            </h3>
          </div>
        </ImageStreamHero>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-28 sm:space-y-36">

        {/* ── § 3 ABOUT SECTION ── */}
        <section id="about" className="scroll-mt-24">
          <SectionHeader index="01" title="About Me" subtitle="SYSTEMS & PHILOSOPHY" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
            <div className="space-y-4">
              <div className="font-mono text-6xl sm:text-8xl font-light text-white/5 select-none">
                01
              </div>
              <p className="font-mono text-xs text-[#C0FE04] uppercase tracking-widest">
                AUTOMATION • SCALABILITY • RELIABILITY
              </p>
            </div>

            <div className="space-y-6 text-base sm:text-lg text-[#8a8a8a] leading-relaxed max-w-3xl">
              <p>
                Computer Engineering student and DevOps Intern with hands-on experience designing CI/CD pipelines, containerized microservices, and cloud infrastructure on AWS. I have delivered fully automated deployment workflows using Jenkins, Docker, and Kubernetes across production-style projects, removing manual release effort entirely.
              </p>
              <p>
                My foundation spans Data Structures, Object-Oriented Programming, and SQL — sharpened through active competitive programming on LeetCode and Codeforces. I am currently seeking DevOps and cloud infrastructure roles focused on automation, scalability, and system reliability.
              </p>
            </div>
          </div>
        </section>

        {/* ── § 4 EXPERIENCE SECTION ── */}
        <section id="experience" className="scroll-mt-24">
          <SectionHeader index="02" title="Experience" subtitle="PRODUCTION & INDUSTRY" />

          <div className="space-y-10">
            {/* Colgate-Palmolive */}
            <div className="border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 space-y-4 relative">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">DevOps Intern</h3>
                  <p className="font-mono text-sm text-[#C0FE04]">Colgate-Palmolive • Mumbai, Maharashtra (Hybrid)</p>
                </div>
                <span className="font-mono text-xs text-[#8a8a8a] bg-white/5 px-3 py-1 border border-white/10 w-fit">
                  Jul 2026 – Present
                </span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#8a8a8a] leading-relaxed pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#C0FE04] font-bold mt-0.5">▹</span>
                  <span>Support application deployment and infrastructure automation workflows within a DevOps team, contributing to CI/CD pipelines built with Jenkins, Git, and GitHub.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C0FE04] font-bold mt-0.5">▹</span>
                  <span>Assist with AWS cloud infrastructure management and containerized application deployment using Docker across Linux-based staging and production environments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C0FE04] font-bold mt-0.5">▹</span>
                  <span>Collaborate with cross-functional engineering teams on deployment automation, contributing to Infrastructure as Code with Terraform and to monitoring initiatives.</span>
                </li>
              </ul>
            </div>

            {/* Campus Credential */}
            <div className="border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 space-y-4 relative">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">Full Stack Developer Intern</h3>
                  <p className="font-mono text-sm text-[#C0FE04]">Campus Credential • Remote</p>
                </div>
                <span className="font-mono text-xs text-[#8a8a8a] bg-white/5 px-3 py-1 border border-white/10 w-fit">
                  Jun 2025 – Aug 2025
                </span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#8a8a8a] leading-relaxed pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#C0FE04] font-bold mt-0.5">▹</span>
                  <span>Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C0FE04] font-bold mt-0.5">▹</span>
                  <span>Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C0FE04] font-bold mt-0.5">▹</span>
                  <span>Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── § 5 PROJECTS SECTION ── */}
        <section id="projects" className="scroll-mt-24">
          <SectionHeader index="03" title="Featured Work" subtitle="SYSTEMS & ARCHITECTURE ARCHIVE" />

          <div className="space-y-8">
            {PROJECTS.map((p) => (
              <ProjectArchiveCard key={p.index} project={p} />
            ))}
          </div>
        </section>

        {/* ── § 6 SKILLS BENTO SECTION ── */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeader index="04" title="Skills & Tools" subtitle="TECHNICAL COMPETENCIES" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.category} className="border border-white/10 bg-[#0d0d0d] p-6 space-y-4 hover:border-[#C0FE04]/40 transition-colors">
                  <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                    <Icon size={16} className="text-[#C0FE04] shrink-0" />
                    <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      {s.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="text-xs font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-[#ededed]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── § 7 EDUCATION SECTION ── */}
        <section id="education" className="scroll-mt-24">
          <SectionHeader index="05" title="Education" subtitle="ACADEMIC BACKGROUND" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/10 bg-[#0d0d0d] p-6 space-y-2">
              <div className="bg-[#C0FE04]/10 border border-[#C0FE04]/30 text-[#C0FE04] font-mono text-xs px-2.5 py-1 w-fit font-bold">
                CGPA: 8.48 / 10
              </div>
              <h3 className="text-lg font-bold text-white pt-2">B.Tech in Computer Engineering</h3>
              <p className="text-xs text-[#8a8a8a]">MIT Academy of Engineering, Pune</p>
              <p className="font-mono text-xs text-[#6b6b6b]">2023 – 2027</p>
            </div>

            <div className="border border-white/10 bg-[#0d0d0d] p-6 space-y-2">
              <div className="bg-white/5 border border-white/10 text-white font-mono text-xs px-2.5 py-1 w-fit">
                84.17%
              </div>
              <h3 className="text-lg font-bold text-white pt-2">Higher Secondary Certificate (HSC)</h3>
              <p className="text-xs text-[#8a8a8a]">YCIS, Satara</p>
              <p className="font-mono text-xs text-[#6b6b6b]">2021 – 2023</p>
            </div>

            <div className="border border-white/10 bg-[#0d0d0d] p-6 space-y-2">
              <div className="bg-white/5 border border-white/10 text-white font-mono text-xs px-2.5 py-1 w-fit">
                97.00%
              </div>
              <h3 className="text-lg font-bold text-white pt-2">Secondary School Certificate (SSC)</h3>
              <p className="text-xs text-[#8a8a8a]">Maharaja Sayajirao Vidyalaya, Satara</p>
              <p className="font-mono text-xs text-[#6b6b6b]">2021</p>
            </div>
          </div>
        </section>

        {/* ── § 8 CONTACT SECTION (HAOQI Closing Moment) ── */}
        <section id="contact" className="scroll-mt-24 border border-white/10 bg-[#0d0d0d] p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C0FE04]/10 blur-3xl pointer-events-none" />

          <div className="space-y-8 max-w-3xl relative z-10">
            <SectionHeader index="06" title="Contact" subtitle="GET IN TOUCH" />

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              INNOVATE WITH <span className="bg-[#C0FE04] text-black px-2 py-0.5">PURPOSE</span> & AUTOMATION
            </h2>

            <p className="text-base text-[#8a8a8a] leading-relaxed max-w-xl">
              Open for DevOps, Cloud Infrastructure, Multi-Agent AI, and Systems Engineering opportunities. Let&apos;s build reliable, automated infrastructure together.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="mailto:kshitijkumbhar007@gmail.com"
                className="bg-[#C0FE04] text-black font-bold font-mono text-xs sm:text-sm px-6 py-3.5 hover:bg-[#d4ff1a] transition-all flex items-center gap-2 min-h-[44px]"
              >
                <Mail size={16} />
                <span>kshitijkumbhar007@gmail.com</span>
              </a>

              <a
                href="tel:+917058157357"
                className="border border-white/20 bg-black/40 text-white font-mono text-xs sm:text-sm px-6 py-3.5 hover:border-[#C0FE04] hover:text-[#C0FE04] transition-all flex items-center gap-2 min-h-[44px]"
              >
                <Phone size={16} />
                <span>+91-7058157357</span>
              </a>

              <a
                href="https://linkedin.com/in/kshitij-kumbhar"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 bg-white/5 text-[#ededed] font-mono text-xs sm:text-sm px-5 py-3.5 hover:bg-white/10 transition-all flex items-center gap-2 min-h-[44px]"
              >
                <FiLinkedin size={16} className="text-[#C0FE04]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 bg-white/5 text-[#ededed] font-mono text-xs sm:text-sm px-5 py-3.5 hover:bg-white/10 transition-all flex items-center gap-2 min-h-[44px]"
              >
                <FiGithub size={16} className="text-[#C0FE04]" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 font-mono text-xs text-[#6b6b6b]">
              <a href="https://leetcode.com/u/kshitij72/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C0FE04] flex items-center gap-1.5 py-1">
                <Code2 size={14} className="text-[#C0FE04]" /> <span>LeetCode: @kshitij72</span>
              </a>
              <a href="https://codeforces.com/profile/kshitijx07" target="_blank" rel="noopener noreferrer" className="hover:text-[#C0FE04] flex items-center gap-1.5 py-1">
                <Terminal size={14} className="text-[#C0FE04]" /> <span>Codeforces: @kshitijx07</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Minimal Footer ── */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-8 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#6b6b6b]">
        <span>© {new Date().getFullYear()} KSHITIJ KUMBHAR • DEVOPS & CLOUD</span>
        <span>NEXT.JS • TYPESCRIPT • TAILWIND CSS • THREE.JS</span>
      </footer>

    </div>
  );
}
