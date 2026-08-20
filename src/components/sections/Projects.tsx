"use client";

import React, { useState } from "react";
import ProjectCardSync, {
  ProjectMetric,
} from "@/components/dom/ProjectCardSync";
import {
  Activity,
  Filter,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

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
    bgColor: "bg-[#252324]",
    accentColor: "#ED3C3F",
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
    bgColor: "bg-[#252324]",
    accentColor: "#3B82F6",
    githubUrl: "https://github.com/kshitijx07/dsa-swarm-ai",
    metrics: [
      { label: "Agents", value: "4 Agents", sub: "LangGraph Swarm" },
      { label: "Latency", value: "<180ms", sub: "Pinecone + Flash" },
      { label: "Protocol", value: "MCP Standard", sub: "Cursor + Claude" },
    ],
    bullets: [
      "Architected 4-node LangGraph multi-agent swarm coordinating Code Generator, Complexity Analyzer, and Unit Tester.",
      "Built Model Context Protocol (MCP) server integration allowing IDEs to execute live algorithmic agent workflows.",
      "Provisioned infrastructure with Terraform on AWS EKS with Kubernetes secrets and automated GitHub Actions CI/CD.",
      "Indexed 500+ LeetCode DSA patterns into Pinecone with 768-dim embeddings for sub-180ms semantic retrieval.",
    ],
  },
  {
    id: "project-serverless-resizer",
    category: "SERVERLESS & IAC",
    subCategory: "EVENT-DRIVEN CLOUD INFRASTRUCTURE",
    tag: "TERRAFORM + AWS LAMBDA",
    year: "2025",
    title: "Serverless Image Resizer",
    subtitle: "Event-Driven Thumbnail Pipeline",
    description:
      "Automated image processing pipeline built on AWS Lambda, S3 Event Notifications, and Terraform.",
    technologies: [
      "AWS Lambda",
      "Terraform (IaC)",
      "Amazon S3",
      "Sharp (Node.js)",
      "AWS IAM",
      "CloudWatch",
    ],
    bgColor: "bg-[#252324]",
    accentColor: "#ED3C3F",
    githubUrl: "https://github.com/kshitijx07",
    metrics: [
      { label: "Execution", value: "<800ms", sub: "Per Image" },
      { label: "Cost", value: "$0.00 / Idle", sub: "100% Serverless" },
      { label: "Infra", value: "100% IaC", sub: "Terraform Managed" },
    ],
    bullets: [
      "Built automated thumbnail generation triggered by S3 ObjectCreated events, processing uploads in under 800ms.",
      "Packaged Sharp Node.js binary in a Lambda Layer with strict IAM least-privilege roles.",
      "Maintained 100% Infrastructure as Code via Terraform for reproducible multi-region deployments.",
      "Monitored execution logs and invocation metrics via AWS CloudWatch dashboards and alarms.",
    ],
  },
  {
    id: "project-grocito",
    category: "FULL STACK ARCHITECTURE",
    subCategory: "SPRING BOOT & REACT DELIVERY",
    tag: "SPRING BOOT + MYSQL",
    year: "2025",
    title: "Grocito Platform",
    subtitle: "Three-Tier Grocery Commerce Ecosystem",
    description:
      "End-to-end full-stack commerce platform with dedicated Admin, Vendor, and Customer portals.",
    technologies: [
      "Spring Boot",
      "MySQL",
      "React.js",
      "REST APIs",
      "Tailwind CSS",
      "MVC Architecture",
    ],
    bgColor: "bg-[#252324]",
    accentColor: "#3B82F6",
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
      className="relative z-10 min-h-screen bg-[#050505]/80 px-6 sm:px-10 md:px-14 py-20 border-t border-white/10 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1px_1100px]"
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* ── 1. Section Header & Telemetry Status ────────────────── */}
        <div className="section-header-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-[#252324]/85 backdrop-blur-md p-5 sm:p-6 rounded-sm shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#ED3C3F] font-mono text-xs uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED3C3F] animate-pulse" />
              <span>03 // FLAGSHIP PRODUCTION WORKLOADS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Featured Projects
            </h2>
          </div>

          {/* System Telemetry Readout */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-white/60">
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-sm text-[11px]">
              <Activity size={12} className="text-[#ED3C3F]" />
              <span>2 CLUSTERS ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-sm text-[11px]">
              <ShieldCheck size={12} className="text-[#3B82F6]" />
              <span>OAC SECURED</span>
            </div>
          </div>
        </div>

        {/* ── 2. Category Filter Navigation Tabs ──────────────────── */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-sm">
          <span className="text-white/60 mr-2 flex items-center gap-1.5 text-xs font-bold">
            <Filter size={14} className="text-[#ED3C3F]" />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`min-h-[44px] px-5 py-2.5 rounded-xs transition-all border font-mono font-bold uppercase text-xs cursor-pointer shadow-sm ${
                activeFilter === cat.value
                  ? "bg-[#ED3C3F] text-white border-[#ED3C3F] shadow-[0_0_18px_rgba(237,60,63,0.4)]"
                  : "bg-[#252324]/80 text-white/80 border-white/15 hover:border-[#ED3C3F]/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── 3. Balanced 2x2 Grid with Staggered Parallax & Reveal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pt-2">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`scroll-reveal-card velocity-skew-target project-card-col-${idx % 2} will-change-transform`}
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
        <div className="p-4 bg-[#252324]/60 border border-white/10 rounded-sm font-mono text-xs text-white/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-[#ED3C3F]" />
            <span>All systems verified against production AWS workloads.</span>
          </div>
          <a
            href="https://github.com/kshitijx07"
            target="_blank"
            rel="noreferrer"
            className="text-[#ED3C3F] hover:underline font-bold text-xs"
          >
            Explore all repositories on GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
