"use client";

import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import { ImageStreamHero, type StreamImage } from "@/components/ui/image-stream-hero";
import { ScrambleText } from "@/components/ui/scramble-text";
import { Terminal, ShieldCheck, Cpu, Cloud, GitBranch, ArrowUpRight } from "lucide-react";

const STREAM_IMAGES: StreamImage[] = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "Cloud Infrastructure Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
    alt: "Kubernetes Microservices",
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    alt: "Cybersecurity and Systems",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    alt: "Distributed Networks",
  },
  {
    src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop",
    alt: "CI/CD Pipeline Automation",
  },
];

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-[#F3F4F6] selection:bg-[#B4F342] selection:text-black">
      {/* 1. HERO SECTION WITH BLACK HOLE RAYMARCHING CANVAS */}
      <section className="relative h-screen w-full overflow-hidden">
        <BlackHoleHeroSection
          className="absolute inset-0 h-full w-full"
          focus={[0.74, 0.48]}
          scrim="left"
          scrimStrength={0.92}
          hotColor="#4DEEEA"
          midColor="#001B6B"
          coolColor="#050505"
          doppler={0.45}
          steps={280}
          starBrightness={0.4}
        >
          {/* Overlay Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-16">
            {/* HUD Top Bar */}
            <div className="flex items-center justify-between font-mono text-xs text-[#8A8F98]">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[#B4F342] animate-pulse" />
                <span>KSHITIJ.ENG // SYSTEM ARCHITECT</span>
              </div>
              <div className="hidden gap-8 md:flex">
                <span>LAT: 18.5204° N</span>
                <span>LON: 73.8567° E</span>
                <span className="text-[#B4F342]">SYSTEM: ONLINE (AWS EKS)</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="max-w-3xl">
              <div className="mb-4">
                <ScrambleText
                  text="DEVOPS & CLOUD INFRASTRUCTURE SPECIALIST"
                  className="text-xs tracking-widest text-[#4DEEEA]"
                />
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tight md:text-8xl">
                I Bring Scale & Craft to Cloud Platforms
              </h1>
              <p className="mt-6 max-w-lg text-sm text-[#8A8F98] leading-relaxed">
                Computer Engineering student and DevOps Intern specializing in IaC, containerized microservices, 
                and automated CI/CD deployment pipelines on AWS.
              </p>
            </div>

            {/* Quick Stats / Telemetry Footer */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#8A8F98] md:grid-cols-4">
              <div>
                <span className="block text-white">AWS EKS / EC2</span>
                <span>Production Workloads</span>
              </div>
              <div>
                <span className="block text-white">TERRAFORM</span>
                <span>Automated IaC</span>
              </div>
              <div>
                <span className="block text-white">LANGGRAPH / MCP</span>
                <span>Multi-Agent AI</span>
              </div>
              <div>
                <span className="block text-white">0% CORS / OAC</span>
                <span>CloudFront Ingress</span>
              </div>
            </div>
          </div>
        </BlackHoleHeroSection>
      </section>

      {/* 2. IMAGE STREAM CORRIDOR TRANSITION (28s Calm Speed) */}
      <section className="relative z-20 border-y border-white/10 bg-[#000B3B]/40 py-16 backdrop-blur-md">
        <div className="mb-8 px-8 text-center font-mono text-xs tracking-widest text-[#4DEEEA]">
          // CONTINUOUS DEPLOYMENT ARCHITECTURE & VECTOR CORRIDOR
        </div>
        <ImageStreamHero
          images={STREAM_IMAGES}
          speed={28}
          cards={10}
          axis={50}
          className="h-[380px] w-full"
        >
          <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h3 className="font-mono text-lg tracking-widest text-white/90">
              [ ZERO-DOWNTIME ROLLOUTS ]
            </h3>
          </div>
        </ImageStreamHero>
      </section>

      {/* 3. EXPERIENCE & SELECTED PROJECTS SECTION */}
      <section className="relative z-20 px-8 py-20 md:px-16">
        <div className="mb-12 font-mono text-xs tracking-widest text-[#4DEEEA]">
          <ScrambleText text="// PRODUCTION CLOUD ARCHITECTURES" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* HostelHub */}
          <div className="group relative border border-white/10 bg-[#080808] p-8 transition-all hover:border-[#B4F342]">
            <div className="flex justify-between items-start">
              <span className="inline-block bg-[#B4F342] px-2 py-0.5 font-mono text-[10px] font-bold text-black">
                EKS + JENKINS
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#8A8F98] group-hover:text-[#B4F342] transition-colors" />
            </div>
            <h4 className="mt-6 text-2xl font-bold text-white">HostelHub</h4>
            <p className="mt-3 text-xs leading-relaxed text-[#8A8F98]">
              Cloud-native hostel management platform. Engineered unified CloudFront OAC routing and automated split Jenkins CI/CD pipelines deploying to AWS EKS with Horizontal Pod Autoscaling (HPA).
            </p>
          </div>

          {/* DSA Swarm AI */}
          <div className="group relative border border-white/10 bg-[#080808] p-8 transition-all hover:border-[#4DEEEA]">
            <div className="flex justify-between items-start">
              <span className="inline-block bg-[#4DEEEA] px-2 py-0.5 font-mono text-[10px] font-bold text-black">
                LANGGRAPH + MCP
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#8A8F98] group-hover:text-[#4DEEEA] transition-colors" />
            </div>
            <h4 className="mt-6 text-2xl font-bold text-white">DSA Swarm AI</h4>
            <p className="mt-3 text-xs leading-relaxed text-[#8A8F98]">
              Multi-Agent RAG swarm with Pinecone vector search and Gemini 2.5 Flash. Built 4-key API rotation pools (60 RPM) and Terraform-provisioned EKS clusters running behind an ALB.
            </p>
          </div>

          {/* Serverless AI X-Ray */}
          <div className="group relative border border-white/10 bg-[#080808] p-8 transition-all hover:border-[#FF3E1D]">
            <div className="flex justify-between items-start">
              <span className="inline-block bg-[#FF3E1D] px-2 py-0.5 font-mono text-[10px] font-bold text-black">
                SERVERLESS + TFLITE
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#8A8F98] group-hover:text-[#FF3E1D] transition-colors" />
            </div>
            <h4 className="mt-6 text-2xl font-bold text-white">Serverless X-Ray</h4>
            <p className="mt-3 text-xs leading-relaxed text-[#8A8F98]">
              Event-driven chest X-ray classifier using MobileNet TFLite on AWS Lambda. Features S3 direct pre-signed URL uploads and real-time DynamoDB polling loops.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FOOTER TELEMETRY */}
      <footer className="relative z-20 flex flex-col justify-between gap-4 border-t border-white/10 p-8 font-mono text-xs text-[#8A8F98] md:flex-row md:px-16">
        <div>KSHITIJ KUMBHAR (C) 2026 // SYSTEM TERMINAL</div>
        <div className="flex gap-6">
          <a href="https://github.com/kshitijx07" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/kshitij-kumbhar" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            LINKEDIN
          </a>
          <a href="https://leetcode.com/u/kshitij72" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            LEETCODE
          </a>
        </div>
      </footer>
    </main>
  );
}
