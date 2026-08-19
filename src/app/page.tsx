"use client";

import { useEffect, useState } from "react";
import HeroCanvas from "@/components/canvas/HeroCanvas";
import { subscribePointer } from "@/lib/bus";
import { ScrambleText } from "@/components/ui/scramble-text";
import PolarityCard from "@/components/dom/PolarityCard";
import ProjectCardSync from "@/components/dom/ProjectCardSync";
import RetroDotMatrixBg from "@/components/canvas/RetroDotMatrixBg";
import DomSyncProjectGrid from "@/components/canvas/DomSyncProjectGrid";
import { Canvas } from "@react-three/fiber";
import {
  Globe,
  ArrowUpRight,
  Cloud,
  Database,
  Server,
  Cpu,
  Terminal,
  Code2,
  Check,
  Copy,
  Mail,
  Phone,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
  const [coords, setCoords] = useState("0124 X 0063 Y");
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

  useEffect(() => {
    return subscribePointer((state) => {
      const x = Math.round(state.x * 1000).toString().padStart(4, "0");
      const y = Math.round((1.0 - state.y) * 1000).toString().padStart(4, "0");
      setCoords(`${x} X ${y} Y`);
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#00104A] text-white selection:bg-[#B4F342] selection:text-black">
      {/* ── 1. Synchronized WebGL Layer ───────────────────────── */}
      <HeroCanvas />

      {/* ── 2. Retro Crosshair Grid ──────────────────────────── */}
      <div className="fixed inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none z-10 opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/30" />
        ))}
      </div>

      {/* ── 3. Top Header HUD ─────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-20 flex justify-between items-center p-6 md:p-10 font-mono text-xs text-white/80 backdrop-blur-xs">
        <div className="font-bold tracking-wider">KSHITIJ.ENG // SYSTEM ARCHITECT</div>
        <div className="hidden md:flex gap-8 text-[11px] text-white/60">
          <span>LAT: 18.5204° N</span>
          <span>LON: 73.8567° E</span>
          <span className="text-[#B4F342] font-semibold">STATUS: RUNNING (AWS EKS)</span>
        </div>
        <div className="flex gap-6 pointer-events-auto text-[11px]">
          <a href="#about" className="hover:text-[#B4F342] transition-colors">ABOUT</a>
          <a href="#experience" className="hover:text-[#B4F342] transition-colors">EXP</a>
          <a href="#projects" className="hover:text-[#B4F342] transition-colors">WORK</a>
          <a href="#skills" className="hover:text-[#B4F342] transition-colors">SKILLS</a>
          <a href="#contact" className="hover:text-[#B4F342] transition-colors">CONTACT</a>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO VIEWPORT
      ═══════════════════════════════════════════════════════════ */}
      <section id="home" className="relative z-10 flex h-screen w-full flex-col justify-end p-8 md:p-16 pb-20">
        <div className="max-w-4xl space-y-4">
          <div className="mb-2">
            <ScrambleText
              text="DEVOPS & CLOUD INFRASTRUCTURE SPECIALIST"
              className="text-xs tracking-widest text-[#4DEEEA] font-bold"
            />
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.98]">
            I Bring
            <br />
            Scale & Craft
            <br />
            To Cloud Work
          </h1>
          <div className="pt-2 font-mono text-xs text-white/60 max-w-lg">
            Engineering resilient CI/CD pipelines, containerized microservices, and automated AWS infrastructure with zero release friction.
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: PROFESSIONAL SUMMARY & POLARITY BIO
      ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="relative z-10 min-h-screen bg-[#050505]/95 backdrop-blur-md px-8 py-24 md:px-16 border-t border-white/10">
        <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <PolarityCard src="/profile.png" name="Kshitij" />
            <div className="font-mono text-[11px] text-white/50 space-y-1">
              <div>// OPERATOR: KSHITIJ KUMBHAR</div>
              <div>// FOCUS: DEVOPS / CLOUD / DISTRIBUTED SYSTEMS</div>
              <div>// LOCATION: PUNE, MAHARASHTRA, INDIA</div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 text-white">
            <div className="flex items-center gap-2 text-[#B4F342] font-mono text-xs uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B4F342]" />
              <span>01 // PROFESSIONAL PROFILE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-snug">
              DevOps & Cloud Engineer specializing in Kubernetes, AWS, and Infrastructure Automation.
            </h2>

            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
              Computer Engineering student and DevOps Intern with hands-on experience designing CI/CD pipelines, containerized microservices, and cloud infrastructure on AWS. Delivered fully automated deployment workflows using Jenkins, Docker, and Kubernetes across production-style projects, removing manual release effort entirely.
            </p>

            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
              Strong foundation in Data Structures, Object-Oriented Programming, and SQL, with active competitive programming practice on LeetCode and Codeforces. Seeking DevOps and cloud infrastructure roles focused on automation, scalability, and system reliability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-xs">
              <div className="border border-white/10 p-4 rounded-sm bg-[#0D0D0D]">
                <div className="text-white/50 text-[10px] uppercase">Competitive Practice</div>
                <div className="text-white font-bold mt-1">LeetCode: @kshitij72</div>
                <div className="text-white font-bold">Codeforces: @kshitijx07</div>
              </div>
              <div className="border border-white/10 p-4 rounded-sm bg-[#0D0D0D]">
                <div className="text-white/50 text-[10px] uppercase">Infrastructure Philosophy</div>
                <div className="text-[#B4F342] font-bold mt-1">Zero-Downtime Releases</div>
                <div className="text-white/70">Terraform IaC & EKS GitOps</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: PROFESSIONAL EXPERIENCE
      ═══════════════════════════════════════════════════════════ */}
      <section id="experience" className="relative z-10 min-h-screen bg-[#080808] px-8 py-24 md:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#B4F342] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B4F342]" />
                <span>02 // PRODUCTION HISTORY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Work Experience
              </h2>
            </div>
            <span className="font-mono text-xs text-white/50">ENTERPRISE & DISTRIBUTED SYSTEMS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Experience 1: Colgate-Palmolive */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 flex flex-col justify-between space-y-6 hover:border-[#B4F342] transition-colors rounded-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-[#B4F342] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      HYBRID INTERNSHIP
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">Colgate-Palmolive</h3>
                    <p className="font-mono text-sm text-[#B4F342] font-semibold">DevOps Intern</p>
                  </div>
                  <span className="font-mono text-xs text-white/50">Jul 2026 – Present</span>
                </div>

                <div className="font-mono text-xs text-white/40">
                  Mumbai, Maharashtra, India // Enterprise DevOps
                </div>

                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Design, build, and maintain automated CI/CD pipelines using Jenkins and GitHub Actions, supporting consistent and repeatable software releases across hybrid environments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B4F342] mt-1">▹</span>
                    <span>Containerize internal applications and microservices using Docker, streamlining local development workflows and standardizing staging runtime environments.</span>
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
                    <span>Developed interactive frontend modules in React.js and designed normalized database schemas with foreign key constraints, indexing, and transactional integrity.</span>
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
          SECTION 4: FEATURED PROJECTS (DOM-Sync + Retro Dot Matrix)
      ═══════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative z-10 min-h-screen bg-[#050505] px-8 py-24 md:px-16 border-t border-white/10 overflow-hidden">
        {/* WebGL Retro Dot Matrix & Velocity UV Semicircular Curl Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <RetroDotMatrixBg />
            <DomSyncProjectGrid />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-12">
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
            <span className="font-mono text-xs text-white/50">AWS // EKS // LANGGRAPH // SERVERLESS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1: HostelHub */}
            <ProjectCardSync
              id="project-hostelhub"
              tag="AWS EKS + JENKINS"
              year="2026"
              title="HostelHub"
              description="Cloud-native platform with NGINX Ingress-backed ALB, HPA auto-scaling (2-5 replicas), OAC-secured S3 caching, and split Jenkins CI/CD pipelines."
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
              tag="LANGGRAPH + MCP"
              year="2026"
              title="DSA Swarm AI"
              bannerText="npx @kshitij/dsa-swarm-ai"
              bgColor="bg-[#FF3E1D]"
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

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: TECHNICAL SKILLS DIRECTORY
      ═══════════════════════════════════════════════════════════ */}
      <section id="skills" className="relative z-10 min-h-screen bg-[#080808] px-8 py-24 md:px-16 border-t border-white/10">
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
                {["Pinecone", "MongoDB", "MySQL", "DynamoDB", "PostgreSQL"].map((skill) => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Backend Development */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#B4F342] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#B4F342]">
                <Server size={18} />
                <span>Backend Development</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "Spring Boot", "RESTful APIs", "Microservices Architecture"].map((skill) => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-xs text-white/80 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. AI Engineering */}
            <div className="border border-white/10 bg-[#0D0D0D] p-6 space-y-4 rounded-sm hover:border-[#4DEEEA] transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#4DEEEA]">
                <Cpu size={18} />
                <span>AI Engineering & Multi-Agent</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "LangGraph",
                  "Google Gemini 2.5 Flash API",
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
      <section id="education" className="relative z-10 min-h-screen bg-[#050505] px-8 py-24 md:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#4DEEEA] font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEEA]" />
                <span>05 // ACADEMIC FOUNDATIONS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Education
              </h2>
            </div>
            <span className="font-mono text-xs text-white/50">VERIFIED ACADEMIC RECORDS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. B.Tech */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 space-y-4 rounded-sm hover:border-[#4DEEEA] transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-[#4DEEEA] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
                    B.TECH // UNDERGRADUATE
                  </span>
                  <span className="font-mono text-xs text-white/50">2023 – 2027</span>
                </div>
                <h3 className="text-xl font-bold text-white">B.Tech in Computer Engineering</h3>
                <p className="text-sm text-white/70 font-mono">
                  MIT Academy of Engineering, Pune, Maharashtra
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-sm">
                <span className="text-white/50">Cumulative CGPA: </span>
                <span className="text-[#4DEEEA] font-bold">8.48 / 10.0</span>
              </div>
            </div>

            {/* 2. HSC */}
            <div className="border border-white/10 bg-[#0D0D0D] p-8 space-y-4 rounded-sm hover:border-[#B4F342] transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-[#B4F342] text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
                    HSC // HIGHER SECONDARY
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
          SECTION 7: CONTACT & FOOTER TELEMETRY
      ═══════════════════════════════════════════════════════════ */}
      <footer id="contact" className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end p-8 md:p-16 gap-6 font-mono text-xs text-white/80 border-t border-white/10 bg-[#00104A]">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="text-white hover:text-[#B4F342] underline underline-offset-4 transition-colors font-bold text-sm"
            >
              {email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-1 text-white/60 hover:text-white transition-colors"
              title="Copy Email"
            >
              {emailCopied ? <Check size={14} className="text-[#B4F342]" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="flex items-center gap-3 text-white/70">
            <span>{phone}</span>
            <button
              onClick={handleCopyPhone}
              className="p-1 text-white/60 hover:text-white transition-colors"
              title="Copy Phone"
            >
              {phoneCopied ? <Check size={14} className="text-[#B4F342]" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="text-white/40 text-[10px] pt-2">
            KSHITIJ KUMBHAR (C) 2026 // PUNE, MAHARASHTRA, INDIA
          </div>
        </div>

        <div className="hidden md:block font-bold text-white tracking-widest text-sm bg-black/40 px-4 py-2 border border-white/10 rounded-xs">
          {coords}
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <a
            href="https://github.com/kshitijx07"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#B4F342] transition-colors flex items-center gap-1"
          >
            <FiGithub size={14} />
            <span>GITHUB</span>
          </a>
          <a
            href="https://linkedin.com/in/kshitij-kumbhar"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#B4F342] transition-colors flex items-center gap-1"
          >
            <FiLinkedin size={14} />
            <span>LINKEDIN</span>
          </a>
          <a
            href="https://leetcode.com/u/kshitij72"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#B4F342] transition-colors"
          >
            LEETCODE
          </a>
          <Globe className="w-4 h-4 text-white/60 animate-spin" />
        </div>
      </footer>
    </main>
  );
}
