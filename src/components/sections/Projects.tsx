"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import RetroDotMatrixBg from "@/components/canvas/RetroDotMatrixBg";
import DomSyncProjectGrid from "@/components/canvas/DomSyncProjectGrid";
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
    tag: "AWS EKS + KUBERNETES + JENKINS",
    year: "2026",
    title: "HostelHub",
    subtitle: "Cloud-Native Hostel Management & Student Operations Platform",
    description:
      "Enterprise cloud-native hostel management platform with a decoupled React frontend hosted on Amazon S3 and a Node.js REST API deployed on AWS EKS (Kubernetes), implementing granular role-based access control.",
    technologies: [
      "AWS EKS",
      "Kubernetes",
      "CloudFront",
      "S3 (OAC)",
      "AWS ALB",
      "Jenkins",
      "Docker",
      "React.js",
      "Node.js",
      "MongoDB Atlas",
      "HPA",
    ],
    bgColor: "bg-[#0A0A0A]",
    accentColor: "#B4F342",
    githubUrl: "https://github.com/kshitijx07/Hostelhub",
    demoUrl: "https://hostelhub-ruby.vercel.app",
    metrics: [
      { label: "Auto-Scaling (HPA)", value: "2 → 5 Replicas", sub: "@ >70% CPU" },
      { label: "Origin Architecture", value: "CloudFront OAC", sub: "0% Public S3" },
      { label: "Deployment Cycle", value: "Dual Jenkins", sub: "Zero-Downtime" },
    ],
    bullets: [
      "Built a cloud-native hostel management platform with a decoupled React frontend hosted on Amazon S3 and a Node.js REST API deployed on AWS EKS (Kubernetes), implementing role-based access control for students and administrators.",
      "Designed a unified AWS CloudFront distribution routing static and API traffic through OAC-secured S3 and an NGINX Ingress-backed ALB, eliminating CORS overhead and unifying all traffic under a single origin.",
      "Containerized the backend with Docker multi-stage builds and configured a Horizontal Pod Autoscaler that scales replicas from 2 to 5 when CPU utilization exceeds 70%, enabling zero-downtime rolling updates.",
      "Engineered a split Jenkins CI/CD pipeline covering the full deployment cycle: frontend pipeline runs npm build with S3 sync and CloudFront cache invalidation; backend builds Docker images to DockerHub and triggers kubectl rollout.",
      "Secured workloads with Kubernetes Secrets for MongoDB Atlas, Cloudinary, and JWT, and enforced private S3 access through a CloudFront OAC policy, removing public bucket exposure entirely.",
    ],
  },
  {
    id: "project-dsa-swarm",
    category: "AI MULTI-AGENT & RAG",
    subCategory: "AUTONOMOUS AGENTS & VECTOR SEARCH",
    tag: "LANGGRAPH + MCP + PINECONE RAG",
    year: "2026",
    title: "DSA Swarm AI",
    subtitle: "Distributed Multi-Agent RAG Swarm on AWS EKS",
    bannerText: "npx @kshitij/dsa-swarm-ai",
    cliCommand: "npx @kshitij/dsa-swarm-ai",
    description:
      "Distributed Multi-Agent RAG Swarm and Model Context Protocol (MCP) Server using LangGraph, Google Gemini 2.5 Flash, and Pinecone (768-dim vector store) processing complex Data Structure and Algorithm queries on AWS EKS.",
    technologies: [
      "AWS EKS",
      "Kubernetes",
      "Terraform (IaC)",
      "CloudFront",
      "LangGraph",
      "MCP Server",
      "Pinecone RAG",
      "Gemini 2.5 Flash",
      "Docker",
      "GitHub Actions",
    ],
    bgColor: "bg-[#0D0D0D]",
    accentColor: "#4DEEEA",
    githubUrl: "https://github.com/kshitijx07",
    metrics: [
      { label: "Quota Multiplier", value: "15 → 60 RPM", sub: "4-Key Pool (4x)" },
      { label: "Vector Latency", value: "<120ms", sub: "Pinecone 768-dim" },
      { label: "Container Security", value: "UID 10001", sub: "Non-Root Worker" },
    ],
    bullets: [
      "Architected a distributed Multi-Agent RAG Swarm and Model Context Protocol (MCP) Server using LangGraph, Google Gemini 2.5 Flash, and Pinecone (768-dim vector store), processing complex Data Structure and Algorithm queries with autonomous Supervisor routing and sub-second retrieval.",
      "Provisioned cloud-native AWS EKS infrastructure via Terraform (IaC), deploying multi-stage unprivileged Docker containers (UID 10001) behind an AWS ALB and CloudFront CDN, achieving <6s end-to-end latency and 0% CORS overhead.",
      "Engineered a 4-key API rotation pool and exponential backoff strategy for Gemini 2.5 Flash LLM endpoints, multiplying throughput from 15 RPM to 60 RPM (4x quota expansion) and eliminating HTTP 429 errors.",
      "Optimized RAG vector search and LLM latency with custom 768-dim Gemini embeddings, Pinecone cosine similarity (topK=6), and capped token generation (maxOutputTokens: 1200) to eliminate CloudFront 504 timeouts.",
      "Secured workloads and automated GitOps CI/CD by enforcing cross-Security Group ingress rules between ALB and EKS worker nodes, Kubernetes Secrets for keys, and automated GitHub Actions CI/CD to Amazon ECR.",
    ],
  },
  {
    id: "project-xray",
    category: "SERVERLESS & IAC",
    subCategory: "EVENT-DRIVEN INFERENCE & TERRAFORM",
    tag: "AWS LAMBDA + TERRAFORM + MOBILENET",
    year: "2026",
    title: "Serverless AI X-Ray Analyzer",
    subtitle: "High-Throughput Medical Imaging Diagnostic Pipeline",
    description:
      "Serverless, event-driven medical imaging platform on AWS that uses a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost.",
    technologies: [
      "AWS Lambda",
      "Terraform (IaC)",
      "GitHub Actions",
      "API Gateway",
      "Amazon S3",
      "Amazon DynamoDB",
      "MobileNet TFLite",
      "Python",
    ],
    bgColor: "bg-[#0A0A0A]",
    accentColor: "#FF3E1D",
    githubUrl: "https://github.com/kshitijx07/serverless-ai-xray",
    metrics: [
      { label: "Inference Latency", value: "<1.00s", sub: "MobileNet TFLite" },
      { label: "Upload Expansion", value: "5x Limit (50MB)", sub: "S3 Presigned URL" },
      { label: "Infrastructure Cost", value: "$0.00 Idle", sub: "100% Serverless" },
    ],
    bullets: [
      "Engineered a serverless, event-driven medical imaging platform on AWS that uses a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost.",
      "Deployed a secure three-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling to reduce DDoS exposure.",
      "Streamlined uploads with an S3 presigned URL flow sending images directly from the browser to S3, increasing the effective upload limit 5x (10 MB to 50 MB) while bypassing the API Gateway payload cap.",
      "Automated infrastructure for all three Lambda functions using modular Terraform and a GitHub Actions pipeline with real-time DynamoDB polling streaming AI confidence scores.",
    ],
  },
  {
    id: "project-grocito",
    category: "FULL STACK ARCHITECTURE",
    subCategory: "MULTI-PORTAL ENTERPRISE PLATFORM",
    tag: "SPRING BOOT + MYSQL + REACT.JS",
    year: "2025",
    title: "Grocito Enterprise Platform",
    subtitle: "Campus Credential Full-Stack Internship Production Sprint",
    description:
      "Modular MVC architecture platform developed during a six-week engineering sprint at Campus Credential, supporting parallel operations across three distinct user and administrator portals.",
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
      { label: "Sprint Delivery", value: "6 Weeks", sub: "Requirements to Prod" },
      { label: "Portal Operations", value: "3 Systems", sub: "Parallel MVC" },
      { label: "Database Layer", value: "MySQL Relational", sub: "Optimized Indices" },
    ],
    bullets: [
      "Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.",
      "Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.",
      "Designed and documented RESTful API endpoints for product catalogues, user authentication, and order processing, validating payloads with Postman.",
      "Built responsive, component-driven frontend interfaces in React.js, integrating backend services and handling edge-case validation across user flows.",
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
    { label: "ALL ARCHITECTURES", value: "ALL" },
    { label: "KUBERNETES & CLOUD", value: "KUBERNETES & CLOUD" },
    { label: "AI MULTI-AGENT & RAG", value: "AI MULTI-AGENT & RAG" },
    { label: "SERVERLESS & IAC", value: "SERVERLESS & IAC" },
    { label: "FULL STACK ARCHITECTURE", value: "FULL STACK ARCHITECTURE" },
  ];

  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen bg-[#050505] px-6 sm:px-10 md:px-14 py-24 border-t border-white/10 overflow-hidden"
    >
      {/* ── WebGL Retro Dot Matrix & Velocity UV Curl Layer ─────── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <RetroDotMatrixBg />
          <DomSyncProjectGrid />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* ── 1. Section Header & Telemetry Status ────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8 bg-[#050505]/85 backdrop-blur-md p-6 sm:p-8 rounded-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4DEEEA] animate-pulse" />
              <span>03 // FLAGSHIP PRODUCTION WORKLOADS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="font-mono text-xs sm:text-sm text-white/70 max-w-2xl pt-1">
              Production architectures deployed with automated CI/CD pipelines,
              Kubernetes orchestration on AWS, Terraform IaC, and distributed AI
              multi-agent swarms.
            </p>
          </div>

          {/* System Telemetry Readout */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/60">
            <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 rounded-sm">
              <Activity size={13} className="text-[#B4F342]" />
              <span>CLUSTERS: 2 RUNNING</span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 rounded-sm">
              <ShieldCheck size={13} className="text-[#4DEEEA]" />
              <span>OAC SECURED</span>
            </div>
          </div>
        </div>

        {/* ── 2. Category Filter Navigation Tabs ──────────────────── */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-white/40 mr-2 flex items-center gap-1">
            <Filter size={13} />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-3.5 py-1.5 rounded-xs transition-all border font-bold uppercase text-[11px] cursor-pointer ${
                activeFilter === cat.value
                  ? "bg-[#B4F342] text-black border-[#B4F342] shadow-md"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── 3. Synchronized Project Cards Grid ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={
                project.category === "SERVERLESS & IAC"
                  ? "md:col-span-2"
                  : undefined
              }
            >
              <ProjectCardSync
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
            </div>
          ))}
        </div>

        {/* ── 4. Architectural Summary Footer ─────────────────────── */}
        <div className="p-6 bg-black/40 border border-white/10 rounded-sm font-mono text-xs text-white/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#B4F342]" />
            <span>All systems verified against production AWS workloads.</span>
          </div>
          <a
            href="https://github.com/kshitijx07"
            target="_blank"
            rel="noreferrer"
            className="text-[#4DEEEA] hover:underline font-bold"
          >
            Explore all repositories on GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
