"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Server,
  Cloud,
  Cpu,
  ArrowUpRight,
  Mail,
  Phone,
  Download,
  Code2,
  Menu,
  X,
  Layers,
  Database,
  Wrench,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Separator } from "@/components/ui/separator";
import ImageStreamHero from "@/components/ui/image-stream-hero";
import BlackHoleHeroSection from "@/components/ui/blackhole-hero-section";
import ScrambleText from "@/components/ui/ScrambleText";

const ARCHITECTURE_STREAM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "Cloud Infrastructure & Distributed Networks",
  },
  {
    src: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
    alt: "Automated Kubernetes Pod Orchestration & CI/CD Pipeline",
  },
  {
    src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop",
    alt: "AI Multi-Agent RAG Swarm & Vector Index Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    alt: "High-Availability Serverless Cloud Infrastructure",
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    alt: "Abstract Gravitational Gradient Field & System Telemetry",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    alt: "Production Server Rack & Enterprise Network Grid",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-cyan-500 selection:text-zinc-950 font-sans">
      {/* ── Navigation Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-zinc-100 hover:text-cyan-400 transition-colors py-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-base font-bold">Kshitij Kumbhar</span>
            <span className="text-zinc-500 hidden sm:inline text-xs font-mono">/ DevOps & Cloud</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-zinc-100 transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="text-xs font-mono px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400 hover:bg-zinc-800 hover:border-cyan-500/50 transition-all flex items-center gap-1.5 min-h-[36px]"
            >
              <span>Resume PDF</span>
              <Download size={13} />
            </a>
          </nav>

          {/* Mobile Menu Toggle Button (44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-zinc-400 hover:text-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md border border-zinc-800/60"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-5 py-5 space-y-4 backdrop-blur-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-zinc-300 hover:text-cyan-400 py-1.5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-800/80">
              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 text-sm font-mono px-4 py-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400 w-full min-h-[44px]"
              >
                <span>Download Resume (PDF)</span>
                <Download size={15} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content Container ────────────────────────────────── */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28 py-8 sm:py-12">
        {/* ── 1. Hero Section (#home) ──────────────────────────────── */}
        <section id="home" className="relative scroll-mt-24 rounded-2xl border border-zinc-800/80 overflow-hidden bg-zinc-950 shadow-2xl">
          {/* Calibrated Spacetime Raymarched Backdrop (Cool Cyan/Zinc Palette) */}
          <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
            <BlackHoleHeroSection
              distance={26}
              elevation={-6}
              spinSpeed={0.04}
              doppler={0.25}
              glow={0.8}
              steps={isMobile ? 180 : 280}
              resolution={isMobile ? 0.6 : 0.7}
              hotColor="#E0F7FA"
              midColor="#00E5FF"
              coolColor="#006064"
              focus={[0.8, 0.45]}
              scrim="left"
              scrimStrength={0.92}
            />
          </div>

          {/* Hero Foreground Content */}
          <div className="relative z-10 p-6 sm:p-12 md:p-16 flex flex-col justify-center space-y-8 min-h-[500px] sm:min-h-[560px]">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" className="text-xs uppercase tracking-wider py-1 px-3 border-cyan-500/40 bg-cyan-950/60 text-cyan-300 font-mono">
                  DevOps & Cloud Infrastructure Engineer
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.08]">
                <span className="block text-zinc-100 mb-1">Kshitij Kumbhar</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-mono text-cyan-400 font-semibold block mt-2">
                  <ScrambleText text="DevOps Engineer & Cloud Infrastructure Developer" speed={30} />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl pt-2">
                Computer Engineering student who has shipped fully automated Jenkins/Docker/Kubernetes deployment pipelines on AWS across production-style projects, with a strong DSA/OOP/SQL foundation and active competitive programming on LeetCode and Codeforces.
              </p>
            </div>

            {/* CTAs & Quick Direct Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <Button asChild size="lg" className="min-h-[44px] px-6 text-sm font-semibold bg-cyan-500 text-zinc-950 hover:bg-cyan-400">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-[44px] px-6 text-sm font-medium border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-100">
                  <a href="#contact">Contact Me</a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="min-h-[44px] px-5 text-sm font-medium border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200">
                  <a href="/Kshitij_Kumbhar_Resume.pdf" download="Kshitij_Kumbhar_Resume.pdf">
                    <Download className="mr-2 h-4 w-4 text-cyan-400" />
                    Resume PDF
                  </a>
                </Button>
              </div>

              {/* Verified Handles & Direct Coordinates */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 font-mono text-xs text-zinc-400">
                <a
                  href="https://github.com/kshitijx07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
                >
                  <FiGithub size={15} className="text-cyan-400" />
                  <span>GitHub: @kshitijx07</span>
                </a>
                <a
                  href="https://linkedin.com/in/kshitij-kumbhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
                >
                  <FiLinkedin size={15} className="text-cyan-400" />
                  <span>LinkedIn: /kshitij-kumbhar</span>
                </a>
                <a
                  href="https://leetcode.com/u/kshitij72/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
                >
                  <Code2 size={15} className="text-cyan-400" />
                  <span>LeetCode: @kshitij72</span>
                </a>
                <a
                  href="https://codeforces.com/profile/kshitijx07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
                >
                  <Terminal size={15} className="text-cyan-400" />
                  <span>Codeforces: @kshitijx07</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Systems Architecture Corridor (ImageStreamHero) ─────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Systems Architecture & Workloads Stream</span>
            </div>
            <span className="text-zinc-500 hidden sm:inline font-mono">LIVE 3D CORRIDOR // PERSPECTIVE RAILS</span>
          </div>

          <ImageStreamHero
            images={ARCHITECTURE_STREAM_IMAGES}
            cards={9}
            speed={22}
            axis={52}
            className="h-[360px] sm:h-[400px] w-full rounded-xl border border-zinc-800 bg-zinc-950 relative shadow-lg"
          >
            <div className="relative z-10 flex h-full flex-col items-center justify-between py-8 px-6 text-center pointer-events-none select-none">
              <div className="space-y-2">
                <Badge variant="cyan" className="text-[10px] uppercase font-mono">
                  CLOUD INFRASTRUCTURE & ARTIFACTS
                </Badge>
                <h3 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight max-w-xl">
                  Automated Pipelines & Distributed Topologies
                </h3>
              </div>
              <p className="max-w-md font-mono text-xs text-zinc-300 bg-zinc-950/80 px-3 py-1.5 rounded border border-zinc-800/80 backdrop-blur-md">
                Continuous 3D perspective stream of containerized services, Kubernetes clusters, and AI RAG pipelines.
              </p>
            </div>
          </ImageStreamHero>
        </section>

        {/* ── 3. About Section (#about) ────────────────────────────── */}
        <section id="about" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>01 // About</span>
          </div>

          <div className="space-y-5 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Engineering reliable infrastructure and automated cloud workflows.
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed">
              Computer Engineering student and DevOps Intern with hands-on experience designing CI/CD pipelines, containerized microservices, and cloud infrastructure on AWS. I've delivered fully automated deployment workflows using Jenkins, Docker, and Kubernetes across two production-style projects, removing manual release effort entirely.
            </p>
            <p className="text-base text-zinc-300 leading-relaxed">
              My foundation spans Data Structures, Object-Oriented Programming, and SQL, sharpened through active competitive programming on LeetCode and Codeforces. I'm currently looking for DevOps and cloud infrastructure roles focused on automation, scalability, and system reliability.
            </p>
          </div>
        </section>

        <Separator className="bg-zinc-800/80" />

        {/* ── 4. Experience Section (#experience) ──────────────────── */}
        <section id="experience" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>02 // Experience</span>
          </div>

          <div className="space-y-6">
            {/* Colgate-Palmolive */}
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                    DevOps Intern
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-cyan-400">
                    Colgate-Palmolive · Mumbai, Maharashtra, India (Hybrid)
                  </p>
                </div>
                <Badge variant="outline" className="w-fit text-xs font-mono text-zinc-300 border-zinc-700">
                  Jul 2026 – Present
                </Badge>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                <p className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                  <span>Support application deployment and infrastructure automation workflows within a DevOps team, contributing to CI/CD pipelines built with Jenkins, Git, and GitHub.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                  <span>Assist with AWS cloud infrastructure management and containerized application deployment using Docker across Linux-based staging and production environments.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                  <span>Collaborate with cross-functional engineering teams on deployment automation, contributing to Infrastructure as Code with Terraform and to monitoring initiatives.</span>
                </p>
              </div>
            </SpotlightCard>

            {/* Campus Credential */}
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                    Full Stack Developer Intern
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-cyan-400">
                    Campus Credential · Remote
                  </p>
                </div>
                <Badge variant="outline" className="w-fit text-xs font-mono text-zinc-300 border-zinc-700">
                  Jun 2025 – Aug 2025
                </Badge>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                <p className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                  <span>Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                  <span>Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                  <span>Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases.</span>
                </p>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <Separator className="bg-zinc-800/80" />

        {/* ── 5. Projects Section (#projects) ──────────────────────── */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>03 // Featured Projects</span>
          </div>

          <div className="space-y-6">
            {/* Project 1: HostelHub */}
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <span>HostelHub</span>
                    <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">Jan 2026 – Mar 2026</span>
                  </h3>
                  <p className="text-sm text-zinc-300 mt-1">
                    Cloud-native hostel management platform with decoupled React frontend on S3 and Node.js REST API on AWS EKS.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="h-9 text-xs gap-1.5 border-zinc-700">
                    <a href="https://github.com/kshitijx07/Hostelhub" target="_blank" rel="noopener noreferrer">
                      <FiGithub size={14} />
                      <span>GitHub</span>
                    </a>
                  </Button>
                  <Button asChild variant="default" size="sm" className="h-9 text-xs gap-1.5 bg-cyan-500 text-zinc-950 hover:bg-cyan-400">
                    <a href="https://hostelhub-ruby.vercel.app" target="_blank" rel="noopener noreferrer">
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Built a cloud-native hostel management platform with a decoupled React frontend on Amazon S3 and a Node.js REST API on AWS EKS, with role-based access control for students and administrators.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Designed a unified CloudFront distribution routing static and API traffic through OAC-secured S3 and an NGINX Ingress-backed ALB, eliminating CORS overhead.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Containerized the backend with Docker multi-stage builds and a Horizontal Pod Autoscaler (2→5 replicas at 70% CPU) for zero-downtime rolling updates.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Engineered a split Jenkins CI/CD pipeline: frontend build → S3 sync → CloudFront invalidation; backend → DockerHub image → kubectl rollout.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Secured workloads with Kubernetes Secrets and a CloudFront OAC policy, removing public bucket exposure.</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/80">
                  {["AWS EKS", "Kubernetes", "CloudFront", "S3", "ALB", "Jenkins", "Docker", "React.js", "Node.js", "MongoDB Atlas"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-zinc-800 text-zinc-200 border-zinc-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Project 2: Serverless AI X-Ray Analyzer */}
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <span>Serverless AI X-Ray Analyzer</span>
                    <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">Apr 2026 – May 2026</span>
                  </h3>
                  <p className="text-sm text-zinc-300 mt-1">
                    Event-driven medical imaging platform on AWS using MobileNet TFLite for &lt;1s inference at zero idle cost.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="h-9 text-xs gap-1.5 border-zinc-700">
                  <a href="https://github.com/kshitijx07/serverless-ai-xray" target="_blank" rel="noopener noreferrer">
                    <FiGithub size={14} />
                    <span>GitHub</span>
                  </a>
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Built a serverless, event-driven medical imaging platform using a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Deployed a three-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Implemented an S3 presigned-URL upload flow, increasing the effective upload limit 5x (10MB → 50MB) while bypassing the API Gateway payload cap.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Automated all infrastructure with modular Terraform and a GitHub Actions pipeline; built a React UI with drag-and-drop uploads and real-time DynamoDB polling for AI confidence scores.</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/80">
                  {["AWS Lambda", "Terraform", "GitHub Actions", "API Gateway", "S3", "DynamoDB", "MobileNet TFLite"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-zinc-800 text-zinc-200 border-zinc-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Project 3: DSA Swarm AI */}
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <span>DSA Swarm AI</span>
                    <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">2026</span>
                  </h3>
                  <p className="text-sm text-zinc-300 mt-1">
                    Distributed Multi-Agent RAG Swarm & Model Context Protocol (MCP) Server deployed on AWS EKS.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="h-9 text-xs gap-1.5 border-zinc-700">
                  <a href="https://github.com/kshitijx07" target="_blank" rel="noopener noreferrer">
                    <FiGithub size={14} />
                    <span>GitHub</span>
                  </a>
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Architected a distributed Multi-Agent RAG Swarm and MCP Server using LangGraph, Gemini 2.5 Flash, and Pinecone (768-dim vector store) for autonomous DSA query routing with sub-second retrieval.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Provisioned AWS EKS infrastructure via Terraform, deploying multi-stage unprivileged Docker containers behind an ALB and CloudFront CDN — under 6-second end-to-end latency.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Built a 4-key API rotation pool with exponential backoff, taking Gemini throughput from 15 RPM to 60 RPM (4x quota expansion).</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Optimized RAG search with custom 768-dim Gemini embeddings, Pinecone cosine similarity (topK=6), and output-token capping to eliminate CloudFront 504 timeouts.</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                    <span>Automated GitOps CI/CD to Amazon ECR with cross-Security-Group ingress rules and Kubernetes Secrets for key management.</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/80">
                  {["AWS EKS", "Kubernetes", "Terraform", "CloudFront", "LangGraph", "MCP Server", "Pinecone", "RAG", "Docker", "GitHub Actions", "Node.js"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-zinc-800 text-zinc-200 border-zinc-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <Separator className="bg-zinc-800/80" />

        {/* ── 6. Skills Section (#skills) ──────────────────────────── */}
        <section id="skills" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>04 // Skills & Competencies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Cloud & DevOps */}
            <SpotlightCard className="p-6 md:col-span-2 lg:col-span-2">
              <h3 className="text-base font-mono text-cyan-400 flex items-center gap-2 pb-4">
                <Cloud size={18} />
                <span>Cloud & DevOps</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["AWS (EKS, ECR, CloudFront, VPC, ALB, IAM, EC2, S3, Auto Scaling)", "Terraform", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "CI/CD"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs py-1 px-2.5 border-zinc-700 bg-zinc-900/60 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>

            {/* 2. Databases & Vector Stores */}
            <SpotlightCard className="p-6">
              <h3 className="text-base font-mono text-cyan-400 flex items-center gap-2 pb-4">
                <Database size={18} />
                <span>Databases & Vector Stores</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["MongoDB", "MySQL", "Pinecone"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs py-1 px-2.5 border-zinc-700 bg-zinc-900/60 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>

            {/* 3. Backend */}
            <SpotlightCard className="p-6">
              <h3 className="text-base font-mono text-cyan-400 flex items-center gap-2 pb-4">
                <Server size={18} />
                <span>Backend</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "Spring Boot", "REST APIs"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs py-1 px-2.5 border-zinc-700 bg-zinc-900/60 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>

            {/* 4. AI & Multi-Agent Systems */}
            <SpotlightCard className="p-6">
              <h3 className="text-base font-mono text-cyan-400 flex items-center gap-2 pb-4">
                <Cpu size={18} />
                <span>AI & Multi-Agent Systems</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["LangGraph", "RAG", "Model Context Protocol (MCP)"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs py-1 px-2.5 border-zinc-700 bg-zinc-900/60 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>

            {/* 5. Frontend */}
            <SpotlightCard className="p-6">
              <h3 className="text-base font-mono text-cyan-400 flex items-center gap-2 pb-4">
                <Layers size={18} />
                <span>Frontend</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Vite", "Tailwind CSS", "HTML", "CSS", "JavaScript"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs py-1 px-2.5 border-zinc-700 bg-zinc-900/60 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>

            {/* 6. CS Fundamentals */}
            <SpotlightCard className="p-6">
              <h3 className="text-base font-mono text-cyan-400 flex items-center gap-2 pb-4">
                <BookOpen size={18} />
                <span>CS Fundamentals</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["DSA", "OOP", "DBMS", "Operating Systems", "Linux"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs py-1 px-2.5 border-zinc-700 bg-zinc-900/60 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>

            {/* 7. Tools & Platforms */}
            <SpotlightCard className="p-6 md:col-span-2 lg:col-span-2">
              <h3 className="text-base font-mono text-cyan-400 flex items-center gap-2 pb-4">
                <Wrench size={18} />
                <span>Tools & Platforms</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "GitHub", "DockerHub", "Postman", "Linux CLI"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs py-1 px-2.5 border-zinc-700 bg-zinc-900/60 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </section>

        <Separator className="bg-zinc-800/80" />

        {/* ── 7. Education Section (#education) ────────────────────── */}
        <section id="education" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>05 // Education</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* B.Tech */}
            <SpotlightCard className="p-6">
              <Badge variant="cyan" className="w-fit text-xs mb-2 border-cyan-500/40 bg-cyan-950/60 text-cyan-300 font-mono">
                CGPA: 8.48 / 10
              </Badge>
              <h3 className="text-base font-bold text-zinc-100">
                B.Tech in Computer Engineering
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                MIT Academy of Engineering, Pune
              </p>
              <p className="text-xs text-zinc-500 font-mono mt-3">
                2023 – 2027
              </p>
            </SpotlightCard>

            {/* HSC */}
            <SpotlightCard className="p-6">
              <Badge variant="outline" className="w-fit text-xs mb-2 border-zinc-700 text-zinc-300 font-mono">
                84.17%
              </Badge>
              <h3 className="text-base font-bold text-zinc-100">
                Higher Secondary Certificate (HSC)
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Yashwantrao Chavan Institute of Science, Satara
              </p>
              <p className="text-xs text-zinc-500 font-mono mt-3">
                2021 – 2023
              </p>
            </SpotlightCard>

            {/* SSC */}
            <SpotlightCard className="p-6">
              <Badge variant="outline" className="w-fit text-xs mb-2 border-zinc-700 text-zinc-300 font-mono">
                97.00%
              </Badge>
              <h3 className="text-base font-bold text-zinc-100">
                Secondary School Certificate (SSC)
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Maharaja Sayajirao Vidyalaya, Satara
              </p>
              <p className="text-xs text-zinc-500 font-mono mt-3">
                2021
              </p>
            </SpotlightCard>
          </div>
        </section>

        <Separator className="bg-zinc-800/80" />

        {/* ── 8. Contact & Footer (#contact) ──────────────────────── */}
        <section id="contact" className="scroll-mt-24 space-y-8 pb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>06 // Contact</span>
          </div>

          <SpotlightCard className="p-8 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                Let's discuss infrastructure, automation, or engineering roles.
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed">
                Open for DevOps, Cloud Infrastructure, Multi-Agent AI, and Systems Engineering opportunities. Reach out directly via email or telephone.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button asChild size="lg" className="min-h-[44px] bg-cyan-500 text-zinc-950 hover:bg-cyan-400 font-semibold">
                <a href="mailto:kshitijkumbhar007@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  kshitijkumbhar007@gmail.com
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="min-h-[44px] border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-100">
                <a href="tel:+917058157357">
                  <Phone className="mr-2 h-4 w-4 text-cyan-400" />
                  +91-7058157357
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="min-h-[44px] border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-100">
                <a
                  href="https://linkedin.com/in/kshitij-kumbhar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiLinkedin className="mr-2 h-4 w-4 text-cyan-400" />
                  LinkedIn
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="min-h-[44px] border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-100">
                <a
                  href="https://github.com/kshitijx07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub className="mr-2 h-4 w-4 text-cyan-400" />
                  GitHub
                </a>
              </Button>
            </div>

            {/* Competitive Programming Coordinates */}
            <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
              <a
                href="https://leetcode.com/u/kshitij72/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <Code2 size={14} className="text-cyan-400" />
                <span>LeetCode: @kshitij72</span>
              </a>
              <a
                href="https://codeforces.com/profile/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <Terminal size={14} className="text-cyan-400" />
                <span>Codeforces: @kshitijx07</span>
              </a>
            </div>
          </SpotlightCard>
        </section>
      </main>

      {/* ── Minimal Footer ────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800/80 py-6 text-center text-xs font-mono text-zinc-400 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Kshitij Kumbhar — DevOps & Cloud Engineering</span>
          <span>Next.js · TypeScript · Tailwind CSS · shadcn/ui</span>
        </div>
      </footer>
    </div>
  );
}
