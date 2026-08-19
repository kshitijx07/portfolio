"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Server, Database, GitBranch, Cpu, ShieldCheck, Terminal, Layers } from "lucide-react";

interface TopologyNode {
  id: string;
  category: "cloud" | "automation" | "backend" | "data";
  title: string;
  desc: string;
  tech: string[];
  connections: string[];
}

const topologyData: TopologyNode[] = [
  {
    id: "cloud-infra",
    category: "cloud",
    title: "01 // Cloud & Compute",
    desc: "Production container orchestration, load balancing, and private cloud infrastructure on AWS.",
    tech: ["AWS Cloud (EC2, S3, CloudFront)", "EKS (Kubernetes Clusters)", "Docker Multi-Stage", "Horizontal Pod Autoscaler"],
    connections: ["automation-iac", "backend-services", "data-persistence"],
  },
  {
    id: "automation-iac",
    category: "automation",
    title: "02 // Automation & CI/CD",
    desc: "Infrastructure as Code provisioning and automated multi-branch deployment pipelines.",
    tech: ["Terraform (IaC)", "Jenkins CI/CD", "GitHub Actions", "Linux Bash / Shell"],
    connections: ["cloud-infra", "backend-services"],
  },
  {
    id: "backend-services",
    category: "backend",
    title: "03 // Distributed Backend",
    desc: "High-throughput RESTful microservices, RBAC security, and event-driven architectures.",
    tech: ["Spring Boot (Java)", "Node.js / Express", "React.js / Next.js", "REST APIs / GraphQL"],
    connections: ["cloud-infra", "data-persistence"],
  },
  {
    id: "data-persistence",
    category: "data",
    title: "04 // Data & Storage",
    desc: "Scalable relational and document database schemas with private cloud storage policies.",
    tech: ["Amazon S3 (OAC Private)", "MySQL Relational", "PostgreSQL", "MongoDB Atlas"],
    connections: ["cloud-infra", "backend-services"],
  },
];

export default function SystemsTopology() {
  const [activeNode, setActiveNode] = useState<string>("cloud-infra");

  const selectedNode = topologyData.find((n) => n.id === activeNode) || topologyData[0];

  return (
    <section className="py-16 md:py-24 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-10 space-y-8" data-cursor="System">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[var(--accent-acid)]" />
              <span className="font-mono text-xs text-[var(--accent-acid)] tracking-wider uppercase font-bold">
                SYSTEMS // TOPOLOGY GRAPH
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
              Infrastructure & Engineering Architecture
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm">
            Interactive systems topology mapping how cloud infrastructure, automated pipelines, backend services, and data storage interlock.
          </p>
        </div>

        {/* Interactive Systems Topology Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Topology Interactive Nodes */}
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
                  {/* Active Indicator Pin */}
                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent-acid)] animate-pulse" />
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    {node.category === "cloud" && <Cloud size={16} className="text-[var(--accent-acid)]" />}
                    {node.category === "automation" && <Cpu size={16} className="text-[var(--accent-acid)]" />}
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

          {/* Right Column: Live Architectural Flow Inspector */}
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

            {/* Complete Stack Matrix */}
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

            {/* Interconnected System Bus */}
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
