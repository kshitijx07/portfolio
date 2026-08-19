"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Cloud, Server, Database, GitBranch, Cpu } from "lucide-react";

interface TopologyNode {
  id: string;
  category: "cloud" | "automation" | "ai" | "backend" | "data";
  title: string;
  desc: string;
  tech: string[];
  connections: string[];
}

const topologyData: TopologyNode[] = [
  {
    id: "cloud-infra",
    category: "cloud",
    title: "01 // DevOps & Cloud Infrastructure",
    desc: "AWS cloud architecture, containerized microservices, VPC routing, and Kubernetes orchestration.",
    tech: ["AWS (EKS, ECR, CloudFront, VPC, ALB, IAM, EC2, S3)", "Docker Multi-Stage", "Kubernetes Clusters", "Auto Scaling & HPA"],
    connections: ["automation-iac", "ai-multiagent", "backend-services", "data-persistence"],
  },
  {
    id: "automation-iac",
    category: "automation",
    title: "02 // Automation & CI/CD Pipelines",
    desc: "Infrastructure as Code provisioning and automated deployment workflows removing manual release effort.",
    tech: ["Terraform (IaC)", "Jenkins CI/CD", "GitHub Actions", "Linux CLI & Bash", "DockerHub"],
    connections: ["cloud-infra", "backend-services"],
  },
  {
    id: "ai-multiagent",
    category: "ai",
    title: "03 // AI & Multi-Agent Systems",
    desc: "Autonomous supervisor routing, Model Context Protocol servers, and high-throughput vector RAG pipelines.",
    tech: ["LangGraph Multi-Agent", "RAG (Retrieval-Augmented)", "Model Context Protocol (MCP)", "Pinecone (768-dim Vector)", "Gemini 2.5 Flash"],
    connections: ["cloud-infra", "backend-services"],
  },
  {
    id: "backend-services",
    category: "backend",
    title: "04 // Backend & Frontend Engineering",
    desc: "High-throughput RESTful microservices, MVC architectures, and responsive digital interfaces.",
    tech: ["Spring Boot", "Node.js & Express.js", "React.js & Vite", "Tailwind CSS", "RESTful APIs"],
    connections: ["cloud-infra", "data-persistence"],
  },
  {
    id: "data-persistence",
    category: "data",
    title: "05 // Databases & Core CS",
    desc: "Relational, document, and vector databases with solid foundation in algorithms and systems.",
    tech: ["Pinecone Vector Store", "MongoDB Atlas", "MySQL Relational", "Data Structures & Algorithms (DSA)", "OOP & Operating Systems"],
    connections: ["cloud-infra", "backend-services", "ai-multiagent"],
  },
];

export default function SystemsTopology() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState<string>("cloud-infra");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll activates nodes sequentially
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.2 && latest < 0.4) setActiveNode("cloud-infra");
      else if (latest >= 0.4 && latest < 0.6) setActiveNode("automation-iac");
      else if (latest >= 0.6 && latest < 0.75) setActiveNode("ai-multiagent");
      else if (latest >= 0.75 && latest < 0.9) setActiveNode("backend-services");
      else if (latest >= 0.9) setActiveNode("data-persistence");
    });
  }, [scrollYProgress]);

  const selectedNode = topologyData.find((n) => n.id === activeNode) || topologyData[0];

  return (
    <section ref={sectionRef} id="systems" className="py-20 md:py-28 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-10 space-y-8" data-cursor="System">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] shadow-[0_0_8px_rgba(183,255,0,0.6)]" />
              <span className="font-mono text-xs text-[var(--accent-acid)] tracking-wider uppercase font-extrabold">
                SYSTEMS // TOPOLOGY GRAPH
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
              Technical Competencies & Systems Topology
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm">
            Interactive architecture map connecting AWS infrastructure, automated CI/CD pipelines, multi-agent AI systems, and databases.
          </p>
        </div>

        {/* Topology Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Domain Nodes */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topologyData.map((node) => {
              const isActive = activeNode === node.id;
              const isConnected = selectedNode.connections.includes(node.id);

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-5 border transition-all cursor-pointer relative ${
                    isActive
                      ? "bg-[var(--bg-primary)] border-[var(--accent-acid)] shadow-[0_0_20px_rgba(183,255,0,0.15)]"
                      : isConnected
                      ? "bg-[var(--bg-surface)] border-[var(--accent-acid)]/50 text-[var(--text-primary)]"
                      : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent-acid)] animate-pulse" />
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    {node.category === "cloud" && <Cloud size={16} className="text-[var(--accent-acid)]" />}
                    {node.category === "automation" && <Cpu size={16} className="text-[var(--accent-acid)]" />}
                    {node.category === "ai" && <Cpu size={16} className="text-[var(--accent-acid)]" />}
                    {node.category === "backend" && <Server size={16} className="text-[var(--accent-acid)]" />}
                    {node.category === "data" && <Database size={16} className="text-[var(--accent-acid)]" />}
                    <span className="font-mono text-[11px] font-bold uppercase text-[var(--text-primary)]">
                      {node.title}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {node.desc}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-[var(--border-color)]">
                    {node.tech.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-1.5 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-muted)]"
                      >
                        {t.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Inspector */}
          <div className="lg:col-span-6 bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] font-mono text-xs">
              <span className="text-[var(--text-primary)] font-bold uppercase">
                ACTIVE DOMAIN // {selectedNode.title.split("//")[1]?.trim()}
              </span>
              <span className="hud-tag hud-tag-acid text-[9px]">
                BUS // ACTIVE
              </span>
            </div>

            <div>
              <h4 className="text-xl font-display font-extrabold text-[var(--text-primary)] uppercase mb-2">
                {selectedNode.title}
              </h4>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                {selectedNode.desc}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-2 font-bold">
                COMPONENTS & TECHNOLOGIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedNode.tech.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs text-[var(--text-primary)] flex items-center gap-2"
                  >
                    <span className="text-[var(--accent-acid)] font-bold">▹</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">
                CONNECTED SYSTEM DEPENDENCIES
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedNode.connections.map((connId) => {
                  const connNode = topologyData.find((n) => n.id === connId);
                  return (
                    <span
                      key={connId}
                      className="px-2.5 py-1 bg-[var(--bg-surface)] border border-[var(--accent-acid)]/50 text-[var(--text-primary)] font-mono text-[10px] flex items-center gap-1.5"
                    >
                      <GitBranch size={11} className="text-[var(--accent-acid)]" />
                      <span>{connNode?.title.split("//")[1]?.trim()}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
