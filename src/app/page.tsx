"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Cloud,
  Server,
  Database,
  Cpu,
  Terminal,
  Code2,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  Globe,
  Check,
  Copy,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

// WebGL Scenes & Shaders
import HeroAboutScene from "@/components/canvas/HeroAboutScene";
import WarpCorridor from "@/components/canvas/WarpCorridor";
import ContactGlassScene from "@/components/canvas/ContactGlassScene";

// DOM & HUD Components
import HeroHUD from "@/components/dom/HeroHUD";
import PolarityCard from "@/components/dom/PolarityCard";
import { ScrambleText } from "@/components/ui/scramble-text";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const email = "kshitijkumbhar007@gmail.com";
  const phone = "+91-7058157357";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  return (
    <div className="relative w-full bg-[#00104A] text-white selection:bg-[#B4F342] selection:text-black">
      {/* ── Fixed 3D Canvas Scene for Hero & About Morph ───────── */}
      <HeroAboutScene />

      {/* ── Fixed HUD Overlay (Coordinates, Nav, Weather, Grid) ── */}
      <HeroHUD />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO VIEWPORT
      ═══════════════════════════════════════════════════════════ */}
      <section id="home" className="relative z-10 flex h-screen w-full flex-col justify-end p-8 md:p-14 pb-20">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#B4F342] animate-pulse" />
            <ScrambleText
              text="DEVOPS ENGINEER & CLOUD INFRASTRUCTURE DEVELOPER"
              className="text-xs tracking-widest text-[#4DEEEA] font-bold"
            />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.98]">
            I Bring
            <br />
            Craft & Taste
            <br />
            To Digital Work
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-xl font-mono leading-relaxed pt-2">
            Building automated, containerized, cloud-native systems — from CI/CD pipelines to Kubernetes-orchestrated microservices on AWS.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4 pointer-events-auto">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-[#4DEEEA] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B4F342] transition-colors rounded-sm flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="px-5 py-2.5 bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors rounded-sm flex items-center gap-2"
            >
              <span>Download CV (PDF)</span>
              <Download size={14} />
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-transparent border border-white/20 text-white/80 font-mono text-xs font-bold uppercase tracking-wider hover:border-[#4DEEEA] hover:text-[#4DEEEA] transition-colors rounded-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: ABOUT / BIO & RESUME SUMMARY
      ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="relative z-10 flex min-h-screen w-full items-center bg-[#050505]/90 backdrop-blur-md px-8 py-24 md:px-14 border-t border-white/10">
        <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column: Photo with Polarity Negative-to-Positive Entrance */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <PolarityCard
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
              name="Kshitij"
            />
            <div className="font-mono text-[11px] text-white/50 space-y-1">
              <div>// OPERATOR: KSHITIJ KUMBHAR</div>
              <div>// FOCUS: DEVOPS / CLOUD / DISTRIBUTED SYSTEMS</div>
              <div>// LOCATION: PUNE, MAHARASHTRA, INDIA</div>
            </div>
          </div>

          {/* Right Column: Exact Resume Summary & Verification */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA]" />
              <span>01 // PROFESSIONAL SUMMARY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-snug tracking-tight text-white/95">
              I explore how to shape <span className="font-semibold text-white">cloud infrastructure</span> and <span className="font-semibold text-white">microservices</span> with craft and taste, building the next generation of scalable architectures.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#8A8F98] leading-relaxed">
              <p>
                Computer Engineering student and DevOps Intern with hands-on experience designing CI/CD pipelines, containerized microservices, and cloud infrastructure on AWS. Delivered fully automated deployment workflows using Jenkins, Docker, and Kubernetes across two production-style projects, removing manual release effort entirely.
              </p>
              <p>
                Strong foundation in Data Structures, Object-Oriented Programming, and SQL, with active competitive programming practice on LeetCode and Codeforces. Seeking DevOps and cloud infrastructure roles focused on automation, scalability, and system reliability.
              </p>
            </div>

            {/* Competitive Programming & Direct Channels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6 font-mono text-xs text-[#8A8F98]">
              <div>
                <span className="block text-white font-bold">LEETCODE</span>
                <a href="https://leetcode.com/u/kshitij72/" target="_blank" rel="noreferrer" className="text-[#4DEEEA] hover:underline">
                  @kshitij72
                </a>
              </div>
              <div>
                <span className="block text-white font-bold">CODEFORCES</span>
                <a href="https://codeforces.com/profile/kshitijx07" target="_blank" rel="noreferrer" className="text-[#4DEEEA] hover:underline">
                  @kshitijx07
                </a>
              </div>
              <div>
                <span className="block text-white font-bold">GITHUB</span>
                <a href="https://github.com/kshitijx07" target="_blank" rel="noreferrer" className="text-[#4DEEEA] hover:underline">
                  @kshitijx07
                </a>
              </div>
              <div>
                <span className="block text-white font-bold">STATUS</span>
                <span className="text-[#B4F342]">OPEN TO ROLES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: PROFESSIONAL EXPERIENCE (Exact Resume History)
      ═══════════════════════════════════════════════════════════ */}
      <section id="experience" className="relative z-10 min-h-screen bg-[#080808] px-8 py-24 md:px-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA]" />
                <span>02 // WORK EXPERIENCE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Production Experience
              </h2>
            </div>
            <span className="font-mono text-xs text-white/50">2025 — PRESENT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience 1: Colgate-Palmolive */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 flex flex-col justify-between space-y-6 hover:border-[#B4F342] transition-colors rounded-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-[#B4F342] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      ENTERPRISE HYBRID
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">Colgate-Palmolive</h3>
                    <p className="font-mono text-sm text-[#4DEEEA] font-semibold">DevOps Intern</p>
                  </div>
                  <span className="font-mono text-xs text-white/50">Jul 2026 – Present</span>
                </div>

                <div className="font-mono text-xs text-white/40">
                  Mumbai, Maharashtra, India (Hybrid)
                </div>

                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Support application deployment and infrastructure automation workflows within a DevOps team, contributing to CI/CD pipelines built with Jenkins, Git, and GitHub.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Assist with AWS cloud infrastructure management and containerized application deployment using Docker across Linux-based staging and production environments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Collaborate with cross-functional engineering teams on deployment automation, contributing to Infrastructure as Code with Terraform and to monitoring initiatives.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {["AWS", "Terraform", "Docker", "Jenkins", "Git", "GitHub Actions", "Linux CLI"].map((tech) => (
                  <Badge key={tech} variant="outline" className="text-[10px] font-mono text-white/70 border-white/15">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience 2: Campus Credential */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 flex flex-col justify-between space-y-6 hover:border-[#4DEEEA] transition-colors rounded-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-[#4DEEEA] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      REMOTE INTERNSHIP
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">Campus Credential</h3>
                    <p className="font-mono text-sm text-[#4DEEEA] font-semibold">Full Stack Developer Intern</p>
                  </div>
                  <span className="font-mono text-xs text-white/50">Jun 2025 – Aug 2025</span>
                </div>

                <div className="font-mono text-xs text-white/40">
                  Remote Sprint Delivery
                </div>

                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {["Spring Boot", "MySQL", "React.js", "REST APIs", "Agile", "MVC Architecture"].map((tech) => (
                  <Badge key={tech} variant="outline" className="text-[10px] font-mono text-white/70 border-white/15">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: FEATURED CLOUD & AI PROJECTS WITH 3D VELOCITY WARP EFFECT
      ═══════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative z-10 min-h-screen bg-[#050505] px-8 py-24 md:px-14 border-t border-white/10 overflow-hidden">
        {/* 3D Velocity Warp Shader Layer behind Project Cards */}
        <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <WarpCorridor baseSpeed={0.8} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-[#050505]/70 backdrop-blur-sm p-4">
            <div>
              <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA]" />
                <span>03 // FLAGSHIP ARCHITECTURES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Featured Projects
              </h2>
            </div>
            <span className="font-mono text-xs text-white/50">AWS // EKS // LANGGRAPH // SERVERLESS</span>
          </div>

          <div className="space-y-8">
            {/* Project 1: HostelHub */}
            <div className="border border-white/10 bg-[#0A0A0A]/85 backdrop-blur-md p-8 md:p-10 rounded-sm hover:border-[#B4F342] transition-colors shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#B4F342] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      EKS + KUBERNETES + JENKINS
                    </span>
                    <span className="font-mono text-xs text-white/50">Jan 2026 – Mar 2026</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                    HostelHub — Cloud-Native Hostel Management Platform
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/kshitijx07/Hostelhub"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase rounded-sm flex items-center gap-2 transition-colors"
                  >
                    <FiGithub size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://hostelhub-ruby.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#B4F342] text-black hover:bg-white font-mono text-xs font-bold uppercase rounded-sm flex items-center gap-2 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Built a cloud-native hostel management platform with a decoupled React frontend hosted on Amazon S3 and a Node.js REST API deployed on AWS EKS (Kubernetes), implementing role-based access control for students and administrators.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Designed a unified AWS CloudFront distribution routing static and API traffic through OAC-secured S3 and an NGINX Ingress-backed ALB, eliminating CORS overhead and unifying all traffic under a single origin.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Containerized the backend with Docker multi-stage builds and configured a Horizontal Pod Autoscaler that scales replicas from 2 to 5 when CPU utilization exceeds 70%, enabling zero-downtime rolling updates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Engineered a split Jenkins CI/CD pipeline covering the full deployment cycle: frontend pipeline runs npm build with S3 sync and CloudFront cache invalidation; backend builds Docker images to DockerHub and triggers kubectl rollout.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Secured workloads with Kubernetes Secrets for MongoDB Atlas, Cloudinary, and JWT, and enforced private S3 access through a CloudFront OAC policy, removing public bucket exposure entirely.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                  {["AWS EKS", "Kubernetes", "CloudFront", "S3", "ALB", "Jenkins", "Docker", "React.js", "Node.js", "MongoDB Atlas"].map((tech) => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2.5 py-1 text-white/80 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 2: Serverless AI X-Ray Analyzer */}
            <div className="border border-white/10 bg-[#0A0A0A]/85 backdrop-blur-md p-8 md:p-10 rounded-sm hover:border-[#FF3E1D] transition-colors shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#FF3E1D] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      AWS LAMBDA + TERRAFORM + MOBILENET
                    </span>
                    <span className="font-mono text-xs text-white/50">Apr 2026 – May 2026 (Independent Project)</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                    Serverless AI X-Ray Analyzer
                  </h3>
                </div>

                <a
                  href="https://github.com/kshitijx07/serverless-ai-xray"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase rounded-sm flex items-center gap-2 transition-colors w-fit"
                >
                  <FiGithub size={14} />
                  <span>GitHub</span>
                </a>
              </div>

              <div className="space-y-4 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF3E1D] mt-1">▹</span>
                    <span>Engineered a serverless, event-driven medical imaging platform on AWS that uses a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF3E1D] mt-1">▹</span>
                    <span>Deployed a secure three-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling to reduce DDoS exposure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF3E1D] mt-1">▹</span>
                    <span>Streamlined uploads with an S3 presigned URL flow sending images directly from the browser to S3, increasing the effective upload limit 5x (10 MB to 50 MB) while bypassing the API Gateway payload cap.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF3E1D] mt-1">▹</span>
                    <span>Automated infrastructure for all three Lambda functions using modular Terraform and a GitHub Actions pipeline with real-time DynamoDB polling streaming AI confidence scores.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                  {["AWS Lambda", "Terraform", "GitHub Actions", "API Gateway", "S3", "DynamoDB", "MobileNet TFLite"].map((tech) => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2.5 py-1 text-white/80 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 3: DSA Swarm AI */}
            <div className="border border-white/10 bg-[#0A0A0A]/85 backdrop-blur-md p-8 md:p-10 rounded-sm hover:border-[#4DEEEA] transition-colors shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#4DEEEA] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      LANGGRAPH + MCP + PINECONE RAG
                    </span>
                    <span className="font-mono text-xs text-white/50">2026</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                    DSA Swarm AI — Distributed Multi-Agent RAG on AWS EKS
                  </h3>
                </div>

                <a
                  href="https://github.com/kshitijx07"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase rounded-sm flex items-center gap-2 transition-colors w-fit"
                >
                  <FiGithub size={14} />
                  <span>GitHub</span>
                </a>
              </div>

              <div className="space-y-4 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Architected a distributed Multi-Agent RAG Swarm and Model Context Protocol (MCP) Server using LangGraph, Google Gemini 2.5 Flash, and Pinecone (768-dim vector store), processing complex Data Structure and Algorithm queries with autonomous Supervisor routing and sub-second retrieval.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Provisioned cloud-native AWS EKS infrastructure via Terraform (IaC), deploying multi-stage unprivileged Docker containers (UID 10001) behind an AWS ALB and CloudFront CDN, achieving &lt;6s end-to-end latency and 0% CORS overhead.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Engineered a 4-key API rotation pool and exponential backoff strategy for Gemini 2.5 Flash LLM endpoints, multiplying throughput from 15 RPM to 60 RPM (4x quota expansion) and eliminating HTTP 429 errors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Optimized RAG vector search and LLM latency with custom 768-dim Gemini embeddings, Pinecone cosine similarity (topK=6), and capped token generation (maxOutputTokens: 1200) to eliminate CloudFront 504 timeouts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4DEEEA] mt-1">▹</span>
                    <span>Secured workloads and automated GitOps CI/CD by enforcing cross-Security Group ingress rules between ALB and EKS worker nodes, Kubernetes Secrets for keys, and automated GitHub Actions CI/CD to Amazon ECR.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                  {["AWS EKS", "Kubernetes", "Terraform", "CloudFront", "LangGraph", "MCP Server", "LangChain", "Pinecone", "RAG", "Docker", "GitHub Actions", "Node.js", "React.js"].map((tech) => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2.5 py-1 text-white/80 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: TECHNICAL SKILLS MATRIX
      ═══════════════════════════════════════════════════════════ */}
      <section id="skills" className="relative z-10 min-h-screen bg-[#080808] px-8 py-24 md:px-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA]" />
                <span>04 // TECHNICAL COMPETENCIES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Technical Skills
              </h2>
            </div>
            <span className="font-mono text-xs text-white/50">RESUME SKILLS DIRECTORY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. DevOps & Cloud Infrastructure */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#4DEEEA] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#4DEEEA]">
                <Cloud size={18} />
                <span>DevOps & Cloud Infrastructure</span>
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
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Databases & Vector Stores */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#B4F342] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#B4F342]">
                <Database size={18} />
                <span>Databases & Vector Stores</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Pinecone (Vector Store)", "MongoDB Atlas", "MySQL"].map((skill) => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Backend Development */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#4DEEEA] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#4DEEEA]">
                <Server size={18} />
                <span>Backend Development</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "Spring Boot", "RESTful APIs"].map((skill) => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. AI & Multi-Agent Systems */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#FF3E1D] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#FF3E1D]">
                <Cpu size={18} />
                <span>AI & Multi-Agent Systems</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "LangGraph",
                  "RAG (Retrieval-Augmented Generation)",
                  "Model Context Protocol (MCP)",
                  "LangChain",
                  "Vector Embeddings",
                ].map((skill) => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Frontend Development */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#4DEEEA] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#4DEEEA]">
                <Code2 size={18} />
                <span>Frontend Development</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Vite", "Tailwind CSS", "HTML", "CSS", "JavaScript", "TypeScript"].map((skill) => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Core Computer Science Concepts */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#B4F342] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#B4F342]">
                <Terminal size={18} />
                <span>Core CS Concepts & Tools</span>
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
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: EDUCATION & ACADEMIC STANDING
      ═══════════════════════════════════════════════════════════ */}
      <section id="education" className="relative z-10 min-h-screen bg-[#050505] px-8 py-24 md:px-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA]" />
                <span>05 // ACADEMIC PROFILE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Education
              </h2>
            </div>
            <span className="font-mono text-xs text-white/50">VERIFIED ACADEMIC RECORD</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. B.Tech Computer Engineering */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 space-y-4 rounded-sm hover:border-[#4DEEEA] transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-[#4DEEEA] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
                    UNDERGRADUATE
                  </span>
                  <span className="font-mono text-xs text-white/50">2023 – 2027</span>
                </div>
                <h3 className="text-xl font-bold text-white">Bachelor of Technology in Computer Engineering</h3>
                <p className="text-sm text-white/70 font-mono">
                  MIT Academy of Engineering, Pune, Maharashtra
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-sm">
                <span className="text-white/50">CGPA: </span>
                <span className="text-[#4DEEEA] font-bold">8.48 / 10</span>
              </div>
            </div>

            {/* 2. HSC */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 space-y-4 rounded-sm hover:border-[#B4F342] transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-white/10 text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
                    HSC // STATE BOARD
                  </span>
                  <span className="font-mono text-xs text-white/50">2023</span>
                </div>
                <h3 className="text-xl font-bold text-white">Higher Secondary Certificate (HSC)</h3>
                <p className="text-sm text-white/70 font-mono">
                  Yashwantrao Chavan Institute of Science, Satara, Maharashtra
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-sm">
                <span className="text-white/50">Percentage: </span>
                <span className="text-[#B4F342] font-bold">84.17%</span>
              </div>
            </div>

            {/* 3. SSC */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 space-y-4 rounded-sm hover:border-[#B4F342] transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-white/10 text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
                    SSC // STATE BOARD
                  </span>
                  <span className="font-mono text-xs text-white/50">2021</span>
                </div>
                <h3 className="text-xl font-bold text-white">Secondary School Certificate (SSC)</h3>
                <p className="text-sm text-white/70 font-mono">
                  Maharaja Sayajirao Vidyalaya, Satara, Maharashtra
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-sm">
                <span className="text-white/50">Percentage: </span>
                <span className="text-[#B4F342] font-bold">97.00%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: HYPER-SPEED WARP CORRIDOR ("INNOVATE WITH PURPOSE")
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden border-t border-white/10 bg-[#050505]">
        {/* WebGL Streak Shader Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <WarpCorridor baseSpeed={1.4} />
          </Canvas>
        </div>

        {/* Center Typography Lockup Matching Screenshot */}
        <div className="relative z-10 text-center select-none px-6">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
            INNOVATE
            <br />
            WITH
            <br />
            PURPOSE
          </h2>
          <div className="mt-8">
            <ScrambleText
              text="HIGH-PERFORMANCE ARCHITECTURES & CLOUD INFRASTRUCTURE"
              className="text-xs tracking-widest text-[#B4F342] font-bold"
            />
          </div>
        </div>

        {/* HUD Crosshairs Overlay */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/40" />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: FINAL CONTACT & CLOSING VIEWPORT
      ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative h-screen w-full overflow-hidden bg-[#00104A] text-white select-none border-t border-white/10">
        {/* 1. 3D Stacked Glass Letters & Stickers Canvas */}
        <ContactGlassScene />

        {/* 2. Foreground Bold Display Copy */}
        <div className="relative z-10 flex h-full w-full items-center justify-center pointer-events-none px-6">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-center leading-[0.95] max-w-5xl">
            Let's Create
            <br />
            Something
            <br />
            Extraordinary
          </h2>
        </div>

        {/* 3. HUD Crosshair Wireframe Overlay */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative border-[0.5px] border-white/5">
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">+</span>
            </div>
          ))}
        </div>

        {/* 4. Footer Telemetry & Interactive Actions */}
        <footer className="absolute bottom-0 left-0 w-full z-20 flex flex-col md:flex-row justify-between items-start md:items-end p-8 md:p-12 gap-6 font-mono text-xs text-white/80 border-t border-white/10">
          {/* Email & Phone Copy Triggers */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 text-white hover:text-[#B4F342] transition-colors pointer-events-auto group"
              >
                <Mail size={13} className="text-[#4DEEEA]" />
                <span className="underline underline-offset-4">{email}</span>
                {emailCopied ? (
                  <Check className="w-3.5 h-3.5 text-[#B4F342]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-[#B4F342]" />
                )}
              </button>

              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-2 text-white hover:text-[#B4F342] transition-colors pointer-events-auto group"
              >
                <Phone size={13} className="text-[#B4F342]" />
                <span className="underline underline-offset-4">{phone}</span>
                {phoneCopied ? (
                  <Check className="w-3.5 h-3.5 text-[#B4F342]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-[#B4F342]" />
                )}
              </button>
            </div>
            <div className="text-white/40 text-[10px]">KSHITIJ KUMBHAR (C) 2026 // SYSTEM TERMINAL</div>
          </div>

          {/* Social Links & Globe Status */}
          <div className="flex items-center gap-6 pointer-events-auto">
            <a
              href="https://github.com/kshitijx07"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FiGithub size={14} />
              <span>GITHUB</span>
            </a>
            <a
              href="https://linkedin.com/in/kshitij-kumbhar"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FiLinkedin size={14} />
              <span>LINKEDIN</span>
            </a>
            <a
              href="https://leetcode.com/u/kshitij72"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LEETCODE
            </a>
            <a
              href="https://codeforces.com/profile/kshitijx07"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              CODEFORCES
            </a>
            <Globe className="w-4 h-4 text-white/60 animate-spin" />
          </div>
        </footer>
      </section>
    </div>
  );
}
