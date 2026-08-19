"use client";

import React, { useState } from "react";

// Technical UI & HUD Framework
import TechnicalHeader from "@/components/ui/TechnicalHeader";
import TechnicalHUDBar from "@/components/ui/TechnicalHUDBar";
import TechnicalGridShell from "@/components/ui/TechnicalGridShell";

// Multi-Environment Sections (Inspired by HAOQI.DESIGN)
import TechnicalHeroSection from "@/components/sections/TechnicalHeroSection";
import EditorialAboutSection from "@/components/sections/EditorialAboutSection";
import PlatformUpdatesModule from "@/components/bento/PlatformUpdatesModule";
import EditorialProjectsSection from "@/components/sections/EditorialProjectsSection";
import SystemsTopology from "@/components/skills/SystemsTopology";
import ExperienceTimelineModule from "@/components/bento/ExperienceTimelineModule";
import RetroPixelGameRoom from "@/components/bento/RetroPixelGameRoom";
import AboutEducationModule from "@/components/bento/AboutEducationModule";
import KeyMilestonesModule from "@/components/bento/KeyMilestonesModule";
import CodingProfilesBento from "@/components/bento/CodingProfilesBento";
import ContactResumePanel from "@/components/bento/ContactResumePanel";
import CaseStudyModal, { ProjectData } from "@/components/modals/CaseStudyModal";

const projectsData: ProjectData[] = [
  {
    title: "DSA Swarm AI",
    category: "AI & Cloud Architecture",
    year: "2026",
    description: "Distributed Multi-Agent RAG Swarm & Model Context Protocol (MCP) Server using LangGraph, Gemini 2.5 Flash, and Pinecone on AWS EKS.",
    longDescription: "Architected a distributed Multi-Agent RAG Swarm and Model Context Protocol (MCP) Server using LangGraph, Google Gemini 2.5 Flash, and Pinecone (768-dim vector store), processing complex Data Structure and Algorithm queries with autonomous Supervisor routing and sub-second retrieval.",
    tech: ["AWS EKS", "Kubernetes", "Terraform", "CloudFront", "LangGraph", "MCP Server", "Pinecone", "RAG", "Docker", "GitHub Actions", "Node.js", "React.js"],
    github: "https://github.com/kshitijx07",
    demo: "#",
    image: "/serverless_xray_ui.png",
    highlights: [
      "Architected a distributed Multi-Agent RAG Swarm and Model Context Protocol (MCP) Server using LangGraph, Google Gemini 2.5 Flash, and Pinecone (768-dim vector store).",
      "Provisioned cloud-native AWS EKS infrastructure via Terraform (IaC), deploying multi-stage unprivileged Docker containers (UID 10001) behind AWS ALB and CloudFront CDN.",
      "Engineered a 4-key API rotation pool and exponential backoff for Gemini 2.5 Flash endpoints, multiplying throughput from 15 to 60 RPM (4x quota expansion).",
      "Optimized RAG vector search with Pinecone cosine similarity (topK=6) and capped token generation to eliminate CloudFront 504 timeouts."
    ],
    architecture: [
      "Terraform IaC provisioning of AWS EKS cluster, ALB, and CloudFront CDN.",
      "Cross-Security Group ingress rules, Kubernetes Secrets for API keys, and automated GitHub Actions CI/CD to Amazon ECR."
    ]
  },
  {
    title: "HostelHub",
    category: "Cloud Architecture",
    year: "2026",
    description: "Decoupled cloud-native hostel management platform with a React frontend on Amazon S3 and a Node.js REST API on AWS EKS (Kubernetes), with role-based access control.",
    longDescription: "Built a cloud-native hostel management platform with a decoupled React frontend hosted on Amazon S3 and a Node.js REST API deployed on AWS EKS (Kubernetes), implementing role-based access control for students and administrators.",
    tech: ["AWS EKS", "Kubernetes", "CloudFront", "S3", "ALB", "Jenkins", "Docker", "React.js", "Node.js", "MongoDB Atlas"],
    github: "https://github.com/kshitijx07/Hostelhub",
    demo: "https://hostelhub-ruby.vercel.app",
    image: "/hostelhub_ui.png",
    highlights: [
      "Built a cloud-native hostel management platform with a decoupled React frontend hosted on Amazon S3 and a Node.js REST API deployed on AWS EKS (Kubernetes).",
      "Designed a unified AWS CloudFront distribution routing static and API traffic through OAC-secured S3 and an NGINX Ingress-backed ALB, eliminating CORS overhead.",
      "Containerized the backend with Docker multi-stage builds and configured a Horizontal Pod Autoscaler scaling replicas from 2 to 5 at 70% CPU.",
      "Engineered a split Jenkins CI/CD pipeline covering npm build with S3 sync and CloudFront invalidation, and backend DockerHub builds with kubectl rollout."
    ],
    architecture: [
      "Secured workloads with Kubernetes Secrets for MongoDB Atlas, Cloudinary, and JWT.",
      "Enforced private S3 access through a CloudFront OAC policy, removing public bucket exposure entirely."
    ]
  },
  {
    title: "Serverless AI X-Ray Analyzer",
    category: "AI & Serverless",
    year: "2026",
    description: "Serverless event-driven medical imaging platform on AWS using MobileNet TFLite to classify chest X-rays in <1s at zero idle cost.",
    longDescription: "Engineered a serverless, event-driven medical imaging platform on AWS that uses a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost.",
    tech: ["AWS Lambda", "Terraform", "GitHub Actions", "API Gateway", "S3", "DynamoDB"],
    github: "https://github.com/kshitijx07/serverless-ai-xray",
    demo: "#",
    image: "/serverless_xray_ui.png",
    highlights: [
      "Engineered a serverless, event-driven medical imaging platform on AWS using MobileNet TFLite to classify chest X-rays in <1s at zero idle cost.",
      "Deployed a secure three-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling to reduce DDoS exposure.",
      "Streamlined uploads with an S3 presigned URL flow sending images directly from browser to S3, increasing upload cap 5x (10 MB to 50 MB).",
      "Automated infrastructure for all 3 Lambdas using modular Terraform and a GitHub Actions pipeline with real-time DynamoDB AI confidence streaming."
    ],
    architecture: [
      "Modular Terraform Infrastructure as Code setup.",
      "Event-driven S3 presigned URL uploads and DynamoDB polling loop."
    ]
  },
  {
    title: "Grocito",
    category: "Full Stack System",
    year: "2025",
    description: "A three-portal grocery ordering system (Customer, Admin, Delivery Partner) featuring real-time order tracking, payment processing, and live map integration.",
    longDescription: "Developed a three-portal system for Customer, Admin, and Delivery Partner roles, supporting real-time order tracking, payment processing, and live map integration for 50+ concurrent simulated users.",
    tech: ["Spring Boot", "React.js", "MySQL", "REST APIs", "Real-Time Tracking"],
    github: "https://github.com/kshitijx07/Grocito-Copy",
    demo: "https://grocito-user.vercel.app/",
    image: "/grocito_ui.png",
    highlights: [
      "Developed a three-portal system for Customer, Admin, and Delivery Partner roles with real-time order tracking and map integration.",
      "Designed optimized MySQL schemas and backend REST APIs handling high-frequency concurrent transactions with sub-200ms response latency.",
      "Built an admin analytics dashboard surfacing sales trends, inventory health, and order KPIs, cutting manual reporting time by 30%.",
      "Integrated a secure payment gateway alongside a donation-tracking system giving donors full visibility across three order stages."
    ],
    architecture: [
      "Spring Boot Modular MVC Architecture with tokenized security.",
      "Razorpay payment gateway & donation tracking system integration."
    ]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="relative min-h-screen pb-16 bg-[#050505] text-white">
      {/* 12-Column Persistent Structural Grid & Crosshairs */}
      <TechnicalGridShell />

      {/* Fixed Monospace Navigation Header */}
      <TechnicalHeader
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Main Editorial Multi-Environment Content Flow */}
      <main className="relative z-10 space-y-0">
        {/* 1. HERO: ELECTRIC BLUE IMMERSIVE ENVIRONMENT */}
        <TechnicalHeroSection />

        {/* 2. EDITORIAL BIO: DARK VOID + PORTRAIT + PIXEL STAIRCASE */}
        <EditorialAboutSection />

        {/* 3. LIVE PLATFORM TELEMETRY DECK */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-8">
          <PlatformUpdatesModule />
        </div>

        {/* 4. SELECTED WORKS: DIGITAL ARCHIVE & PAPER CANVASES */}
        <EditorialProjectsSection
          projects={projectsData}
          onOpenCaseStudy={setSelectedProject}
        />

        {/* 5. SYSTEMS TOPOLOGY GRAPH (Interactive Infrastructure Diagram) */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <SystemsTopology />
        </div>

        {/* 6. PROFESSIONAL ENGINEERING TIMELINE */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <ExperienceTimelineModule />
        </div>

        {/* 7. EXPERIMENTAL DISCOVERY LAB (Playable 2D Developer Room) */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <RetroPixelGameRoom
            projects={projectsData}
            onOpenCaseStudy={setSelectedProject}
          />
        </div>

        {/* 8. ACADEMIC FOUNDATION & HONORS */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AboutEducationModule />
            <KeyMilestonesModule />
          </div>
        </div>

        {/* 9. CODING PROFILES & ALGORITHMIC TELEMETRY */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <CodingProfilesBento />
        </div>

        {/* 10. ENCRYPTED TRANSMISSION & CV DOWNLOAD */}
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <ContactResumePanel />
        </div>
      </main>

      {/* Persistent Bottom Technical HUD Telemetry Bar */}
      <TechnicalHUDBar />

      {/* Deep Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
