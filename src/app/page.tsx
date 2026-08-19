"use client";

import React, { useState } from "react";
import {
  Terminal,
  Server,
  Cloud,
  Cpu,
  Database,
  ArrowUpRight,
  Mail,
  Phone,
  Download,
  Code2,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BlackHoleHeroSection from "@/components/ui/blackhole-hero-section";
import ImageStreamHero from "@/components/ui/image-stream-hero";
import ScrambleText from "@/components/ui/ScrambleText";

const SYSTEM_STREAM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "Distributed Cloud Mesh & High Throughput Networking",
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

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-cyan-500 selection:text-zinc-950">
      {/* ── Navigation ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-zinc-100 hover:text-cyan-400 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Kshitij Kumbhar</span>
            <span className="text-zinc-500 hidden sm:inline">/ DevOps & Cloud</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-zinc-100 transition-colors focus-visible:text-cyan-400 focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="text-xs font-mono px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400 hover:bg-zinc-800 hover:border-cyan-500/50 transition-all flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <span>Resume PDF</span>
              <Download size={12} />
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-zinc-300 hover:text-cyan-400 py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="inline-flex items-center gap-2 text-sm font-mono px-4 py-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400 w-full justify-center mt-2"
            >
              <span>Download Resume PDF</span>
              <Download size={14} />
            </a>
          </div>
        )}
      </header>

      {/* ── Main Content Flow ────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28 py-10 sm:py-16">
        {/* ── 1. Hero Section (#home) ──────────────────────────────── */}
        <section id="home" className="scroll-mt-20 relative rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-950 shadow-2xl">
          {/* Calibrated Cool Spacetime Gravitational Lensing Backdrop */}
          <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
            <BlackHoleHeroSection
              distance={26}
              elevation={-6}
              spinSpeed={0.04}
              doppler={0.3}
              glow={0.8}
              steps={180}
              resolution={0.65}
              hotColor="#E0F7FA"
              midColor="#00B4D8"
              coolColor="#0077B6"
              focus={[0.8, 0.48]}
              scrim="left"
              scrimStrength={0.9}
            />
          </div>

          <div className="relative z-10 p-6 sm:p-12 md:p-16 flex flex-col justify-center space-y-8 max-w-3xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <Badge variant="cyan" className="text-xs uppercase tracking-wider py-1 px-3">
                  DevOps & Cloud Infrastructure Engineer
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.08]">
                Kshitij Kumbhar
              </h1>

              <div className="font-mono text-sm sm:text-base text-cyan-400 font-semibold tracking-wide">
                <ScrambleText text="Building Scalable Cloud Infrastructure & Automated Pipelines" />
              </div>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                Computer Engineering student who has shipped fully automated Jenkins/Docker/Kubernetes deployment pipelines on AWS across production-style projects, with a strong DSA/OOP/SQL foundation and active competitive programming on LeetCode and Codeforces.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" className="min-h-[44px] min-w-[120px]">
                <a href="#projects">View Projects</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px] min-w-[120px]">
                <a href="#contact">Contact Me</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="min-h-[44px] min-w-[120px]">
                <a href="/Kshitij_Kumbhar_Resume.pdf" download="Kshitij_Kumbhar_Resume.pdf">
                  <Download className="mr-2 h-4 w-4 text-cyan-400" />
                  Resume PDF
                </a>
              </Button>
            </div>

            {/* Quick Coordinate Badges */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <a
                href="mailto:kshitijkumbhar007@gmail.com"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <Mail size={14} className="text-cyan-400" />
                <span>kshitijkumbhar007@gmail.com</span>
              </a>
              <a
                href="tel:+917058157357"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <Phone size={14} className="text-cyan-400" />
                <span>+91-7058157357</span>
              </a>
              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <FiGithub size={14} className="text-cyan-400" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/kshitij-kumbhar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <FiLinkedin size={14} className="text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. System Artifacts Corridor (Secondary Signature Element) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2 text-cyan-400 uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>System Artifacts & Architecture Stream</span>
            </span>
            <span className="text-zinc-600 hidden sm:inline">LIVE PERSPECTIVE CORRIDOR</span>
          </div>

          <ImageStreamHero
            images={SYSTEM_STREAM_IMAGES}
            cards={8}
            speed={24}
            axis={52}
            className="h-[280px] sm:h-[340px] w-full rounded-xl border border-zinc-800/80 bg-zinc-950 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
            <div className="relative z-10 flex h-full flex-col items-center justify-end p-6 text-center pointer-events-none">
              <p className="font-mono text-xs text-zinc-400 bg-zinc-950/80 px-3 py-1.5 rounded-md border border-zinc-800 backdrop-blur-sm">
                Containerized workloads, Kubernetes microservices, and AI vector search topologies.
              </p>
            </div>
          </ImageStreamHero>
        </section>

        {/* ── 3. About Section (#about) ────────────────────────────── */}
        <section id="about" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>01 // About</span>
          </div>

          <div className="space-y-4 max-w-3xl">
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

        <Separator />

        {/* ── 4. Skills Section (#skills) ──────────────────────────── */}
        <section id="skills" className="scroll-mt-20 space-y-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>02 // Skills & Competencies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cloud & DevOps */}
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                  <Cloud size={16} />
                  <span>DevOps & Cloud</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "AWS (EKS, ECR, CloudFront, VPC, ALB, IAM, EC2, S3, Auto Scaling)",
                  "Terraform",
                  "Docker",
                  "Kubernetes",
                  "Jenkins",
                  "GitHub Actions",
                  "CI/CD",
                ].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Databases & Vector Stores */}
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                  <Database size={16} />
                  <span>Databases & Vector Stores</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Pinecone", "MongoDB", "MySQL"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Backend */}
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                  <Server size={16} />
                  <span>Backend</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "Spring Boot", "REST APIs"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* AI & Multi-Agent Systems */}
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                  <Cpu size={16} />
                  <span>AI & Multi-Agent Systems</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["LangGraph", "RAG", "Model Context Protocol (MCP)"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Frontend */}
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                  <Layers size={16} />
                  <span>Frontend</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["React.js", "Vite", "Tailwind CSS", "HTML/CSS/JS"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Core CS */}
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                  <Terminal size={16} />
                  <span>Core CS</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["DSA", "OOP", "DBMS", "OS", "Linux"].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ── 5. Experience Section (#experience) ──────────────────── */}
        <section id="experience" className="scroll-mt-20 space-y-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>03 // Experience</span>
          </div>

          <div className="space-y-6">
            {/* Experience 1: Colgate-Palmolive */}
            <Card className="border-zinc-800 bg-zinc-900/40">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                      <Briefcase size={16} className="text-cyan-400" />
                      <span>DevOps Intern</span>
                    </CardTitle>
                    <p className="text-sm font-medium text-cyan-400 mt-0.5">
                      Colgate-Palmolive · Mumbai, Maharashtra, India (Hybrid)
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs font-mono">
                    Jul 2026 – Present
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Support application deployment and infrastructure automation workflows within a DevOps team, contributing to CI/CD pipelines built with Jenkins, Git, and GitHub.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Assist with AWS cloud infrastructure management and containerized application deployment using Docker across Linux-based staging and production environments.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Collaborate with cross-functional engineering teams on deployment automation, contributing to Infrastructure as Code with Terraform and to monitoring initiatives.</span>
                </p>
              </CardContent>
            </Card>

            {/* Experience 2: Campus Credential */}
            <Card className="border-zinc-800 bg-zinc-900/40">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                      <Briefcase size={16} className="text-cyan-400" />
                      <span>Full Stack Developer Intern</span>
                    </CardTitle>
                    <p className="text-sm font-medium text-cyan-400 mt-0.5">
                      Campus Credential · Remote
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs font-mono">
                    Jun 2025 – Aug 2025
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases.</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ── 6. Projects Section (#projects) ──────────────────────── */}
        <section id="projects" className="scroll-mt-20 space-y-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>04 // Featured Projects</span>
          </div>

          <div className="space-y-6">
            {/* Project 1: HostelHub */}
            <Card className="border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                      <span>HostelHub</span>
                      <span className="text-xs font-normal text-zinc-500 font-mono">Jan 2026 – Mar 2026</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-400 mt-1">
                      Cloud-native hostel management platform with decoupled architecture and automated Kubernetes deployment.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1.5 min-h-[36px]">
                      <a href="https://github.com/kshitijx07/Hostelhub" target="_blank" rel="noopener noreferrer">
                        <FiGithub size={13} />
                        <span>Code</span>
                      </a>
                    </Button>
                    <Button asChild variant="default" size="sm" className="h-8 text-xs gap-1.5 min-h-[36px]">
                      <a href="https://hostelhub-ruby.vercel.app" target="_blank" rel="noopener noreferrer">
                        <span>Live Demo</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Built a cloud-native hostel management platform with a decoupled React frontend on Amazon S3 and a Node.js REST API on AWS EKS, with role-based access control for students and administrators.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Designed a unified CloudFront distribution routing static and API traffic through OAC-secured S3 and an NGINX Ingress-backed ALB, eliminating CORS overhead.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Containerized the backend with Docker multi-stage builds and a Horizontal Pod Autoscaler (2→5 replicas at 70% CPU) for zero-downtime rolling updates.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Engineered a split Jenkins CI/CD pipeline: frontend build → S3 sync → CloudFront invalidation; backend → DockerHub image → kubectl rollout.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Secured workloads with Kubernetes Secrets and a CloudFront OAC policy, removing public bucket exposure.</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                  {["AWS EKS", "Kubernetes", "CloudFront", "S3", "ALB", "Jenkins", "Docker", "React.js", "Node.js", "MongoDB Atlas"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project 2: Serverless AI X-Ray Analyzer */}
            <Card className="border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                      <span>Serverless AI X-Ray Analyzer</span>
                      <span className="text-xs font-normal text-zinc-500 font-mono">Apr 2026 – May 2026</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-400 mt-1">
                      Event-driven serverless medical imaging inference pipeline on AWS.
                    </CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1.5 min-h-[36px]">
                    <a href="https://github.com/kshitijx07/serverless-ai-xray" target="_blank" rel="noopener noreferrer">
                      <FiGithub size={13} />
                      <span>Code</span>
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Built a serverless, event-driven medical imaging platform using a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Deployed a three-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Implemented an S3 presigned-URL upload flow, increasing the effective upload limit 5x (10MB → 50MB) while bypassing the API Gateway payload cap.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Automated all infrastructure with modular Terraform and a GitHub Actions pipeline; built a React UI with drag-and-drop uploads and real-time DynamoDB polling for AI confidence scores.</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                  {["AWS Lambda", "Terraform", "GitHub Actions", "API Gateway", "S3", "DynamoDB", "MobileNet TFLite"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project 3: DSA Swarm AI */}
            <Card className="border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                      <span>DSA Swarm AI</span>
                      <span className="text-xs font-normal text-zinc-500 font-mono">2026</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-400 mt-1">
                      Distributed Multi-Agent RAG Swarm & Model Context Protocol (MCP) Server on AWS EKS.
                    </CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1.5 min-h-[36px]">
                    <a href="https://github.com/kshitijx07" target="_blank" rel="noopener noreferrer">
                      <FiGithub size={13} />
                      <span>Code</span>
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Architected a distributed Multi-Agent RAG Swarm and MCP Server using LangGraph, Gemini 2.5 Flash, and Pinecone (768-dim vector store) for autonomous DSA query routing with sub-second retrieval.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Provisioned AWS EKS infrastructure via Terraform, deploying multi-stage unprivileged Docker containers behind an ALB and CloudFront CDN — under 6-second end-to-end latency.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Built a 4-key API rotation pool with exponential backoff, taking Gemini throughput from 15 RPM to 60 RPM.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Optimized RAG search with custom 768-dim Gemini embeddings, Pinecone cosine similarity (topK=6), and output-token capping to eliminate CloudFront 504 timeouts.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Automated GitOps CI/CD to Amazon ECR with cross-Security-Group ingress rules and Kubernetes Secrets for key management.</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                  {["AWS EKS", "Kubernetes", "Terraform", "CloudFront", "LangGraph", "MCP Server", "Pinecone", "RAG", "Docker", "GitHub Actions", "Node.js"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ── 7. Education Section (#education) ────────────────────── */}
        <section id="education" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>05 // Education</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* B.Tech */}
            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <Badge variant="cyan" className="w-fit text-[10px] mb-1">
                  CGPA: 8.48 / 10
                </Badge>
                <CardTitle className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-cyan-400" />
                  <span>B.Tech Computer Engineering</span>
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  MIT Academy of Engineering, Pune
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-zinc-500 font-mono">
                2023 – 2027
              </CardContent>
            </Card>

            {/* HSC */}
            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit text-[10px] mb-1">
                  84.17%
                </Badge>
                <CardTitle className="text-sm font-bold text-zinc-100">
                  Higher Secondary Certificate (HSC)
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Yashwantrao Chavan Institute of Science, Satara
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-zinc-500 font-mono">
                2021 – 2023
              </CardContent>
            </Card>

            {/* SSC */}
            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit text-[10px] mb-1">
                  97.00%
                </Badge>
                <CardTitle className="text-sm font-bold text-zinc-100">
                  Secondary School Certificate (SSC)
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Maharaja Sayajirao Vidyalaya, Satara
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-zinc-500 font-mono">
                2021
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ── 8. Contact / Footer (#contact) ──────────────────────── */}
        <section id="contact" className="scroll-mt-20 space-y-8 pb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>06 // Contact</span>
          </div>

          <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-8 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                Let's build reliable cloud infrastructure.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                I am actively seeking DevOps and Cloud Engineering opportunities. Reach out directly via email, phone, or connect on LinkedIn and GitHub.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" className="min-h-[44px]">
                <a href="mailto:kshitijkumbhar007@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  kshitijkumbhar007@gmail.com
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                <a href="tel:+917058157357">
                  <Phone className="mr-2 h-4 w-4 text-cyan-400" />
                  +91-7058157357
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                <a
                  href="https://linkedin.com/in/kshitij-kumbhar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiLinkedin className="mr-2 h-4 w-4 text-cyan-400" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
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
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800/80 py-6 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Kshitij Kumbhar</span>
          <span>DevOps & Cloud Infrastructure Portfolio</span>
        </div>
      </footer>
    </div>
  );
}
