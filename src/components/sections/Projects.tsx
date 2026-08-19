"use client";

import React, { useState } from "react";
import ProjectBlackHoleBg from "@/components/canvas/ProjectBlackHoleBg";
import ProjectCardSync, {
  ProjectMetric,
} from "@/components/dom/ProjectCardSync";
import {
  Layers,
  Cloud,
  Cpu,
  Server,
  Database,
  Terminal,
  Activity,
  Filter,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { ScrambleText } from "@/components/ui/scramble-text";

type ProjectCategory =
  | "ALL"
  | "KUBERNETES & CLOUD"
  | "AI MULTI-AGENT & RAG"
  | "SERVERLESS & IAC"
  | "FULL STACK ARCHITECTURE";

interface ProjectData {
  id: string;
  category: ProjectCategory;
  subCategory: string;
  tag: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  bannerText?: string;
  bgColor?: string;
  accentColor?: string;
  githubUrl?: string;
  demoUrl?: string;
  cliCommand?: string;
  metrics: ProjectMetric[];
  bullets: string[];
}

const PROJECTS_REGISTRY: ProjectData[] = [
  {
    id: "project-hostelhub",
    category: "KUBERNETES & CLOUD",
    subCategory: "CONTAINER ORCHESTRATION & CI/CD",
    tag: "AWS EKS + K8S",
    year: "2026",
    title: "HostelHub",
    subtitle: "Cloud-Native Hostel Management Platform",
    description:
      "Decoupled React frontend on Amazon S3 and Node.js REST API on AWS EKS with role-based access control.",
    technologies: [
      "AWS EKS",
      "Kubernetes",
      "CloudFront (OAC)",
      "AWS ALB",
      "Jenkins CI/CD",
      "Docker",
      "MongoDB Atlas",
      "HPA",
    ],
    bgColor: "bg-[#0A0A0A]",
    accentColor: "#B4F342",
    githubUrl: "https://github.com/kshitijx07/Hostelhub",
    demoUrl: "https://hostelhub-ruby.vercel.app",
    metrics: [
      { label: "Auto-Scale", value: "2 → 5 Pods", sub: "@ >70% CPU" },
      { label: "Origin", value: "CloudFront OAC", sub: "0% Public S3" },
      { label: "Pipeline", value: "Dual Jenkins", sub: "Zero-Downtime" },
    ],
    bullets: [
      "Designed unified AWS CloudFront distribution routing traffic through OAC-secured S3 and NGINX Ingress ALB, eliminating CORS overhead.",
      "Configured Horizontal Pod Autoscaler scaling from 2 to 5 replicas when CPU exceeds 70% for zero-downtime rolling updates.",
      "Engineered split Jenkins CI/CD pipeline covering S3 sync, CloudFront invalidation, DockerHub builds, and kubectl rollout.",
      "Secured workloads with Kubernetes Secrets for MongoDB Atlas, Cloudinary, and JWT with CloudFront OAC private bucket policies.",
    ],
  },
  {
    id: "project-dsa-swarm",
    category: "AI MULTI-AGENT & RAG",
    subCategory: "AUTONOMOUS AGENTS & VECTOR SEARCH",
    tag: "LANGGRAPH + MCP",
    year: "2026",
    title: "DSA Swarm AI",
    subtitle: "Distributed Multi-Agent RAG on AWS EKS",
    bannerText: "npx @kshitij/dsa-swarm-ai",
    cliCommand: "npx @kshitij/dsa-swarm-ai",
    description:
      "Distributed Multi-Agent RAG Swarm & MCP Server using LangGraph, Gemini 2.5 Flash, and Pinecone on AWS EKS.",
    technologies: [
      "AWS EKS",
      "Terraform",
      "LangGraph",
      "MCP Server",
      "Pinecone 768-dim",
      "Gemini 2.5 Flash",
      "Docker",
      "GitHub Actions",
    ],
    bgColor: "bg-[#0D0D0D]",
    accentColor: "#4DEEEA",
    githubUrl: "https://github.com/kshitijx07",
    metrics: [
      { label: "Quota Pool", value: "15 → 60 RPM", sub: "4-Key Expansion" },
      { label: "Vector Latency", value: "<120ms", sub: "Pinecone 768-dim" },
      { label: "Security", value: "UID 10001", sub: "Non-Root Worker" },
    ],
    bullets: [
      "Autonomous Supervisor routing with sub-second retrieval across complex Data Structure & Algorithm queries.",
      "Provisioned cloud-native AWS EKS infrastructure via Terraform (IaC) with unprivileged Docker containers (UID 10001) behind ALB and CloudFront.",
      "Engineered 4-key API rotation pool and exponential backoff for Gemini 2.5 Flash LLM endpoints, multiplying throughput from 15 RPM to 60 RPM.",
      "Optimized RAG vector search with custom 768-dim Gemini embeddings and Pinecone cosine similarity (topK=6).",
    ],
  },
  {
    id: "project-xray",
    category: "SERVERLESS & IAC",
    subCategory: "EVENT-DRIVEN INFERENCE & TERRAFORM",
    tag: "LAMBDA + TERRAFORM",
    year: "2026",
    title: "Serverless AI X-Ray",
    subtitle: "Medical Imaging Diagnostic Pipeline",
    description:
      "Serverless medical imaging platform on AWS using MobileNet TFLite to classify chest X-rays in under 1 second at zero idle cost.",
    technologies: [
      "AWS Lambda",
      "Terraform",
      "GitHub Actions",
      "API Gateway",
      "Amazon S3",
      "DynamoDB",
      "MobileNet TFLite",
      "Python",
    ],
    bgColor: "bg-[#0A0A0A]",
    accentColor: "#FF3E1D",
    githubUrl: "https://github.com/kshitijx07/serverless-ai-xray",
    metrics: [
      { label: "Inference", value: "<1.00s", sub: "MobileNet TFLite" },
      { label: "Upload Limit", value: "5x (50MB)", sub: "S3 Presigned URL" },
      { label: "Idle Cost", value: "$0.00", sub: "100% Serverless" },
    ],
    bullets: [
      "Deployed secure 3-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling.",
      "Streamlined uploads with S3 presigned URL direct flow increasing upload limits 5x (10 MB to 50 MB) bypassing API Gateway caps.",
      "Automated infrastructure with modular Terraform and GitHub Actions streaming DynamoDB confidence scores in real-time.",
    ],
  },
  {
    id: "project-grocito",
    category: "FULL STACK ARCHITECTURE",
    subCategory: "MULTI-PORTAL ENTERPRISE PLATFORM",
    tag: "SPRING BOOT + REACT",
    year: "2025",
    title: "Grocito Enterprise Platform",
    subtitle: "Campus Credential Full-Stack Production Sprint",
    description:
      "Modular MVC architecture platform supporting parallel operations across three distinct user and administrator portals.",
    technologies: [
      "Spring Boot",
      "MySQL",
      "React.js",
      "REST APIs",
      "MVC Architecture",
      "Docker",
      "Postman",
    ],
    bgColor: "bg-[#0D0D0D]",
    accentColor: "#4DEEEA",
    githubUrl: "https://github.com/kshitijx07",
    metrics: [
      { label: "Sprint", value: "6 Weeks", sub: "Req to Prod" },
      { label: "Portals", value: "3 Systems", sub: "Parallel MVC" },
      { label: "Database", value: "MySQL Relational", sub: "Indexed" },
    ],
    bullets: [
      "Owned end-to-end delivery of the Grocito platform within a six-week sprint at Campus Credential.",
      "Led backend architecture using Spring Boot and MySQL with modular MVC structure across 3 portals.",
      "Designed and documented RESTful API endpoints for product catalogues, auth, and orders.",
      "Built responsive component-driven React.js interfaces with edge-case validation.",
    ],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("ALL");

  const filteredProjects =
    activeFilter === "ALL"
      ? PROJECTS_REGISTRY
      : PROJECTS_REGISTRY.filter((p) => p.category === activeFilter);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: "ALL", value: "ALL" },
    { label: "KUBERNETES", value: "KUBERNETES & CLOUD" },
    { label: "AI & RAG", value: "AI MULTI-AGENT & RAG" },
    { label: "SERVERLESS", value: "SERVERLESS & IAC" },
    { label: "FULL STACK", value: "FULL STACK ARCHITECTURE" },
  ];

  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen bg-[#050505] px-6 sm:px-10 md:px-14 py-20 border-t border-white/10 overflow-hidden"
    >
      {/* ── Relativistic Black Hole Accretion & Velocity UV Curl Layer ── */}
      <ProjectBlackHoleBg />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* ── 1. Section Header & Telemetry Status ────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-[#050505]/85 backdrop-blur-md p-5 sm:p-6 rounded-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA] animate-pulse" />
              <span>03 // FLAGSHIP PRODUCTION WORKLOADS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Featured Projects
            </h2>
          </div>

          {/* System Telemetry Readout */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-white/60">
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-sm text-[11px]">
              <Activity size={12} className="text-[#B4F342]" />
              <span>2 CLUSTERS RUNNING</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-sm text-[11px]">
              <ShieldCheck size={12} className="text-[#4DEEEA]" />
              <span>OAC SECURED</span>
            </div>
          </div>
        </div>

        {/* ── 2. Category Filter Navigation Tabs ──────────────────── */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-white/40 mr-1.5 flex items-center gap-1 text-[11px]">
            <Filter size={11} />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-3 py-1 rounded-xs transition-all border font-bold uppercase text-[10px] cursor-pointer ${
                activeFilter === cat.value
                  ? "bg-[#B4F342] text-black border-[#B4F342] shadow-sm"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── 3. Pinterest-Style Masonry Grid ─────────────────────── */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project) => (
            <ProjectCardSync
              key={project.id}
              id={project.id}
              tag={project.tag}
              category={project.subCategory}
              year={project.year}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              technologies={project.technologies}
              bannerText={project.bannerText}
              bgColor={project.bgColor}
              accentColor={project.accentColor}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              cliCommand={project.cliCommand}
              metrics={project.metrics}
              bullets={project.bullets}
            />
          ))}
        </div>

        {/* ── 4. Architectural Summary Footer ─────────────────────── */}
        <div className="p-4 bg-black/40 border border-white/10 rounded-sm font-mono text-xs text-white/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-[#B4F342]" />
            <span>All systems verified against production AWS workloads.</span>
          </div>
          <a
            href="https://github.com/kshitijx07"
            target="_blank"
            rel="noreferrer"
            className="text-[#4DEEEA] hover:underline font-bold text-xs"
          >
            Explore all repositories on GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
