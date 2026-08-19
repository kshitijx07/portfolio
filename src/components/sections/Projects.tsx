"use client";

import { Canvas } from "@react-three/fiber";
import RetroDotMatrixBg from "@/components/canvas/RetroDotMatrixBg";
import DomSyncProjectGrid from "@/components/canvas/DomSyncProjectGrid";
import ProjectCardSync from "@/components/dom/ProjectCardSync";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen bg-[#050505] px-8 py-24 md:px-14 border-t border-white/10 overflow-hidden"
    >
      {/* WebGL Retro Dot Matrix & Velocity UV Semicircular Curl Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <RetroDotMatrixBg />
          <DomSyncProjectGrid />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-[#050505]/80 backdrop-blur-md p-4 rounded-sm">
          <div>
            <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA]" />
              <span>03 // FLAGSHIP ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              Featured Projects
            </h2>
          </div>
          <span className="font-mono text-xs text-white/50">
            AWS // EKS // LANGGRAPH // SERVERLESS
          </span>
        </div>

        {/* Synchronized Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1: HostelHub */}
          <ProjectCardSync
            id="project-hostelhub"
            tag="EKS + KUBERNETES + JENKINS"
            year="2026"
            title="HostelHub"
            description="Cloud-native hostel management platform with a decoupled React frontend hosted on Amazon S3 and a Node.js REST API deployed on AWS EKS (Kubernetes), implementing role-based access control."
            technologies={[
              "AWS EKS",
              "Kubernetes",
              "CloudFront",
              "S3",
              "ALB",
              "Jenkins",
              "Docker",
              "React.js",
              "Node.js",
              "MongoDB Atlas",
            ]}
            githubUrl="https://github.com/kshitijx07/Hostelhub"
            demoUrl="https://hostelhub-ruby.vercel.app"
            bullets={[
              "Designed unified AWS CloudFront distribution routing traffic through OAC-secured S3 and an NGINX Ingress-backed ALB, eliminating CORS overhead.",
              "Containerized backend with Docker multi-stage builds and configured HPA auto-scaling (2 to 5 replicas at >70% CPU) for zero-downtime rolling updates.",
              "Engineered split Jenkins CI/CD pipeline covering S3 sync, CloudFront invalidation, DockerHub builds, and kubectl rollouts.",
              "Secured workloads with Kubernetes Secrets for MongoDB Atlas, Cloudinary, and JWT with CloudFront OAC private bucket policies.",
            ]}
          />

          {/* Project 2: DSA Swarm AI */}
          <ProjectCardSync
            id="project-dsa-swarm"
            tag="LANGGRAPH + MCP + PINECONE RAG"
            year="2026"
            title="DSA Swarm AI"
            bannerText="npx @kshitij/dsa-swarm-ai"
            bgColor="bg-[#0D0D0D]"
            description="Distributed Multi-Agent RAG Swarm and Model Context Protocol (MCP) Server using LangGraph, Google Gemini 2.5 Flash, and Pinecone (768-dim vector store) on AWS EKS."
            technologies={[
              "AWS EKS",
              "Kubernetes",
              "Terraform",
              "CloudFront",
              "LangGraph",
              "MCP Server",
              "Pinecone",
              "Docker",
              "GitHub Actions",
            ]}
            githubUrl="https://github.com/kshitijx07"
            bullets={[
              "Autonomous Supervisor routing with sub-second retrieval across complex Data Structure and Algorithm queries.",
              "Provisioned cloud-native AWS EKS infrastructure via Terraform (IaC) with unprivileged Docker containers (UID 10001) behind ALB and CloudFront.",
              "Engineered 4-key API rotation pool and exponential backoff for Gemini 2.5 Flash LLM endpoints, multiplying throughput from 15 RPM to 60 RPM.",
              "Optimized RAG vector search with custom 768-dim Gemini embeddings and Pinecone cosine similarity (topK=6).",
            ]}
          />

          {/* Project 3: Serverless AI X-Ray Analyzer */}
          <div className="md:col-span-2">
            <ProjectCardSync
              id="project-xray"
              tag="AWS LAMBDA + TERRAFORM + MOBILENET"
              year="2026"
              title="Serverless AI X-Ray Analyzer"
              description="Serverless, event-driven medical imaging platform on AWS using a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost."
              technologies={[
                "AWS Lambda",
                "Terraform",
                "GitHub Actions",
                "API Gateway",
                "S3",
                "DynamoDB",
                "MobileNet TFLite",
              ]}
              githubUrl="https://github.com/kshitijx07/serverless-ai-xray"
              bullets={[
                "Deployed secure 3-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling.",
                "Streamlined S3 presigned URL direct upload flow increasing upload limits 5x (10 MB to 50 MB) while bypassing API Gateway payload caps.",
                "Automated infrastructure using modular Terraform and GitHub Actions with real-time DynamoDB polling streaming AI confidence scores.",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
