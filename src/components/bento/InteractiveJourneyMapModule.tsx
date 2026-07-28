"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, MapPin, Compass, Play, Pause, Activity, ShieldCheck, ArrowUpRight, ListFilter, Cpu, Globe2, Radio } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";
import { ProjectData } from "@/components/modals/CaseStudyModal";

export interface InfrastructureNode {
  id: string;
  name: string;
  category: "ENTERPRISE DEVOPS" | "KUBERNETES CLUSTER" | "SERVERLESS MESH" | "FULL STACK EDGE" | "ENGINEERING BASE";
  region: string;
  latLong: string;
  coords: { x: number; y: number }; // percentage on map
  ping: string;
  uptime: string;
  status: "ACTIVE" | "PRODUCTION" | "VERIFIED";
  title: string;
  description: string;
  architecture: string[];
  tech: string[];
  image: string;
  projectDataTitle?: string;
}

const cloudNodes: InfrastructureNode[] = [
  {
    id: "colgate-mumbai",
    name: "Mumbai DevOps Hub",
    category: "ENTERPRISE DEVOPS",
    region: "Colgate-Palmolive Production Hub",
    latLong: "19.0760° N, 72.8777° E",
    coords: { x: 67, y: 56 },
    ping: "8ms",
    uptime: "99.99%",
    status: "PRODUCTION",
    title: "Colgate-Palmolive DevOps Pipeline",
    description: "Enterprise infrastructure automation and continuous deployment workflows within a hybrid corporate environment.",
    architecture: [
      "Jenkins CI/CD automation pipelines for containerized services",
      "AWS cloud management across Linux staging & production nodes",
      "Terraform Infrastructure as Code & deployment monitoring"
    ],
    tech: ["AWS Cloud", "Jenkins", "Docker", "Terraform", "Linux", "GitHub"],
    image: "/serverless_xray_ui.png"
  },
  {
    id: "aws-eks-mumbai",
    name: "AWS ap-south-1 (EKS Cluster)",
    category: "KUBERNETES CLUSTER",
    region: "AWS Asia Pacific (Mumbai)",
    latLong: "18.9200° N, 72.8300° E",
    coords: { x: 62, y: 50 },
    ping: "14ms",
    uptime: "99.95%",
    status: "ACTIVE",
    title: "HostelHub — AWS EKS Cloud Native Architecture",
    description: "Decoupled React frontend on Amazon S3 with Node.js REST APIs running on AWS EKS (Kubernetes) with Horizontal Pod Autoscaler.",
    architecture: [
      "CloudFront OAC routing to S3 & NGINX Ingress-backed ALB",
      "HPA auto-scaling 2 to 5 pod replicas at 70% CPU threshold",
      "Jenkins split pipeline for automated rollout & cache invalidation"
    ],
    tech: ["AWS EKS", "Kubernetes", "CloudFront", "Docker", "S3", "Node.js"],
    image: "/hostelhub_ui.png",
    projectDataTitle: "HostelHub"
  },
  {
    id: "grocito-remote",
    name: "Campus Credential Node",
    category: "FULL STACK EDGE",
    region: "Remote Full Stack Cluster",
    latLong: "28.6139° N, 77.2090° E",
    coords: { x: 44, y: 38 },
    ping: "22ms",
    uptime: "99.90%",
    status: "VERIFIED",
    title: "Grocito — 3-Portal Ecosystem",
    description: "Three-portal grocery ordering engine (Customer, Admin, Delivery) handling high-frequency concurrent transactions with sub-200ms latency.",
    architecture: [
      "Spring Boot Modular MVC backend with tokenized security",
      "Optimized MySQL relational schema for live inventory management",
      "Real-time order tracking map integration & Razorpay payments"
    ],
    tech: ["Spring Boot", "React.js", "MySQL", "REST APIs", "Real-Time Tracking"],
    image: "/grocito_ui.png",
    projectDataTitle: "Grocito"
  },
  {
    id: "serverless-global",
    name: "AWS Global Serverless Mesh",
    category: "SERVERLESS MESH",
    region: "AWS Serverless Edge Network",
    latLong: "37.7749° N, 122.4194° W",
    coords: { x: 25, y: 34 },
    ping: "34ms",
    uptime: "100%",
    status: "PRODUCTION",
    title: "Serverless AI X-Ray Analyzer",
    description: "Event-driven medical imaging platform on AWS using MobileNet TFLite to classify chest X-rays in under 1 second at zero idle cost.",
    architecture: [
      "S3 presigned URL flow bypassing API Gateway memory limits",
      "Three-Lambda orchestrator behind throttled API Gateway",
      "Terraform IAC automation & real-time DynamoDB AI confidence streaming"
    ],
    tech: ["AWS Lambda", "Terraform", "DynamoDB", "API Gateway", "Python"],
    image: "/serverless_xray_ui.png",
    projectDataTitle: "Serverless AI X-Ray Analyzer"
  },
  {
    id: "mitaoe-pune",
    name: "Pune Engineering Base",
    category: "ENGINEERING BASE",
    region: "MIT Academy of Engineering, Pune",
    latLong: "18.5204° N, 73.8567° E",
    coords: { x: 74, y: 62 },
    ping: "2ms",
    uptime: "100%",
    status: "ACTIVE",
    title: "MITAOE Computer Engineering Base",
    description: "Academic research hub focusing on data structures, algorithms, cloud computing systems, and operating systems (CGPA 8.48 / 10).",
    architecture: [
      "B.Tech Computer Engineering candidate (2023 – 2027)",
      "Distributed systems design & microservice performance analysis",
      "Active problem solver on LeetCode & Codeforces"
    ],
    tech: ["C++", "Java", "DSA", "System Design", "DBMS", "Linux"],
    image: "/hostelhub_ui.png"
  }
];

interface InteractiveJourneyMapModuleProps {
  onOpenCaseStudy: (project: ProjectData) => void;
  projects: ProjectData[];
}

export default function InteractiveJourneyMapModule({ onOpenCaseStudy, projects }: InteractiveJourneyMapModuleProps) {
  const [selectedNode, setSelectedNode] = useState<InfrastructureNode>(cloudNodes[0]);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [isTouring, setIsTouring] = useState(false);

  // Guided Tour Interval
  useEffect(() => {
    if (!isTouring) return;
    const interval = setInterval(() => {
      setSelectedNode((prev) => {
        const currentIdx = cloudNodes.findIndex((n) => n.id === prev.id);
        const nextIdx = (currentIdx + 1) % cloudNodes.length;
        return cloudNodes[nextIdx];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isTouring]);

  const getAssociatedProject = (node: InfrastructureNode) => {
    if (node.projectDataTitle) {
      return projects.find((p) => p.title.toLowerCase().includes(node.projectDataTitle!.toLowerCase())) || projects[0];
    }
    return projects[0];
  };

  return (
    <PinterestCardWrapper pinLabel="Pin Cloud Mesh">
      <div className="w-full flex flex-col justify-between" data-cursor="Cloud Mesh">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
                Global Cloud Infrastructure & Career Node Mesh
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2D4030]/10 dark:bg-[#4E6E52]/20 text-[#2D4030] dark:text-[#4E6E52] text-[10px] font-mono font-bold uppercase">
                <Radio size={11} className="animate-pulse text-[#C86D51] dark:text-[#E07A5F]" />
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-[#6E6C68] dark:text-[#A3A098] font-mono transition-colors">
              Interactive topology mapping AWS cloud clusters, DevOps pipelines & engineering bases
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Tour Autoplay Toggle */}
            <button
              onClick={() => setIsTouring(!isTouring)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors flex items-center gap-1.5 shadow-sm ${
                isTouring
                  ? "bg-[#C86D51] dark:bg-[#E07A5F] text-white"
                  : "bg-[#F9F7F4] dark:bg-[#242220] text-[#1A1918] dark:text-[#FAF9F7] border border-[#E8E3DA] dark:border-[#2E2C29] hover:border-[#C86D51]"
              }`}
            >
              {isTouring ? <Pause size={13} /> : <Play size={13} />}
              <span>{isTouring ? "Pause Tour" : "Node Tour"}</span>
            </button>

            {/* View Switcher */}
            <button
              onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
              className="px-3 py-1.5 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white text-xs font-mono font-medium transition-colors text-[#1A1918] dark:text-[#FAF9F7] flex items-center gap-1.5"
            >
              {viewMode === "map" ? <ListFilter size={13} /> : <Globe2 size={13} />}
              <span>{viewMode === "map" ? "List View" : "Map View"}</span>
            </button>
          </div>
        </div>

        {/* View Switcher */}
        {viewMode === "map" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Vector World & Node Topology Canvas */}
            <div className="lg:col-span-8 relative w-full h-[400px] md:h-[460px] rounded-3xl border border-[#E8E3DA] dark:border-[#2E2C29] bg-[#FAF9F7] dark:bg-[#151413] overflow-hidden p-4 shadow-inner transition-colors">
              {/* Paper Grid & Lat/Long Mesh Lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C86D51_1px,transparent_1px)] dark:bg-[radial-gradient(#E07A5F_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              {/* Realistic World Map Continent Silhouettes */}
              <svg className="w-full h-full text-[#E8E3DA] dark:text-[#262422]" viewBox="0 0 1000 500" fill="none" stroke="currentColor">
                {/* North America */}
                <path
                  d="M120,120 Q180,60 280,90 Q340,140 290,240 Q210,290 140,220 Z"
                  fill="#F2E4DF"
                  className="dark:fill-[#221F1D]"
                  fillOpacity="0.6"
                  strokeWidth="1.5"
                />
                {/* South America */}
                <path
                  d="M260,280 Q320,290 350,360 Q320,440 260,420 Q220,360 260,280 Z"
                  fill="#E5EDE6"
                  className="dark:fill-[#1C261E]"
                  fillOpacity="0.5"
                  strokeWidth="1.5"
                />
                {/* Europe & Africa */}
                <path
                  d="M440,90 Q540,70 600,120 Q620,220 540,340 Q460,320 420,220 Z"
                  fill="#F2E4DF"
                  className="dark:fill-[#221F1D]"
                  fillOpacity="0.6"
                  strokeWidth="1.5"
                />
                {/* Asia & India Subcontinent */}
                <path
                  d="M620,100 Q780,70 900,140 Q940,240 820,340 Q700,360 620,260 Z"
                  fill="#E5EDE6"
                  className="dark:fill-[#1C261E]"
                  fillOpacity="0.6"
                  strokeWidth="1.5"
                />
                {/* Australia */}
                <path
                  d="M780,330 Q860,320 900,370 Q860,430 780,410 Z"
                  fill="#F2E4DF"
                  className="dark:fill-[#221F1D]"
                  fillOpacity="0.5"
                  strokeWidth="1.5"
                />

                {/* Animated Data Routing Paths between AWS & Engineering Nodes */}
                <motion.path
                  d="M 250,170 L 440,190 L 620,250 L 670,280 L 740,310"
                  stroke="#C86D51"
                  className="dark:stroke-[#E07A5F]"
                  strokeWidth="2.5"
                  strokeDasharray="6,6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />
              </svg>

              {/* Interactive Telemetry Node Pins */}
              {cloudNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <motion.div
                    key={node.id}
                    onClick={() => {
                      setSelectedNode(node);
                      setIsTouring(false);
                    }}
                    style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                    whileHover={{ scale: 1.3 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  >
                    {/* Pulsating Ping Ring */}
                    <div
                      className={`w-9 h-9 rounded-full absolute -top-2.5 -left-2.5 animate-ping opacity-75 ${
                        isSelected ? "bg-[#C86D51] dark:bg-[#E07A5F]" : "bg-[#2D4030] dark:bg-[#4E6E52]"
                      }`}
                    />

                    {/* Node Core Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-[#151413] transition-colors ${
                        isSelected
                          ? "bg-[#C86D51] dark:bg-[#E07A5F] scale-110"
                          : "bg-[#1A1918] dark:bg-[#FAF9F7] dark:text-[#1A1918] group-hover:bg-[#C86D51] dark:group-hover:bg-[#E07A5F] dark:group-hover:text-white"
                      }`}
                    >
                      <Server size={13} />
                    </div>

                    {/* Node Hover Tooltip Badge */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1918] dark:bg-[#FAF9F7] text-white dark:text-[#1A1918] text-[10px] font-mono px-3 py-1 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B8A3] animate-pulse" />
                      <span>{node.name}</span>
                      <span className="text-[#C86D51] dark:text-[#E07A5F]">({node.ping})</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Live Telemetry Status Footer Bar */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#FFFDF9]/90 dark:bg-[#1C1B19]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#E8E3DA] dark:border-[#2E2C29] text-[11px] font-mono text-[#6E6C68] dark:text-[#A3A098] flex flex-wrap items-center justify-between gap-2 shadow-sm transition-colors">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-[#C86D51] dark:text-[#E07A5F] animate-pulse" />
                  <span>Selected Node: <strong className="text-[#1A1918] dark:text-[#FAF9F7]">{selectedNode.name}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Ping: <strong className="text-[#00B8A3]">{selectedNode.ping}</strong></span>
                  <span>Uptime: <strong className="text-[#2D4030] dark:text-[#4E6E52]">{selectedNode.uptime}</strong></span>
                </div>
              </div>
            </div>

            {/* Selected Node Command Inspector Panel */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFFDF9] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] p-5 rounded-3xl shadow-sm flex flex-col justify-between h-full transition-colors"
                >
                  <div>
                    {/* Node Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#F2E4DF] dark:bg-[#38241E] text-[#C86D51] dark:text-[#E07A5F] text-[10px] font-mono font-bold tracking-wider">
                        {selectedNode.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E5EDE6] dark:bg-[#1E2A20] text-[#2D4030] dark:text-[#4E6E52] text-[10px] font-mono font-bold">
                        {selectedNode.status}
                      </span>
                    </div>

                    <h4 className="text-xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-1 transition-colors">
                      {selectedNode.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#6E6C68] dark:text-[#A3A098] mb-3">
                      <MapPin size={13} className="text-[#C86D51] dark:text-[#E07A5F]" />
                      <span>{selectedNode.region}</span>
                    </div>

                    <p className="text-xs text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed mb-4 transition-colors font-sans">
                      {selectedNode.description}
                    </p>

                    {/* Architecture Bullet Highlights */}
                    <div className="mb-4 space-y-1.5 bg-[#F9F7F4] dark:bg-[#1C1B19] p-3 rounded-2xl border border-[#E8E3DA] dark:border-[#2E2C29]">
                      <span className="text-[10px] font-mono text-[#6E6C68] dark:text-[#A3A098] uppercase block mb-1">
                        NODE ARCHITECTURE HIGHLIGHTS:
                      </span>
                      {selectedNode.architecture.map((arch, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-[#2B2A29] dark:text-[#FAF9F7]">
                          <span className="text-[#C86D51] dark:text-[#E07A5F] font-bold">▹</span>
                          <span>{arch}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {selectedNode.tech.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-md bg-[#EFECE6] dark:bg-[#2A2825] text-[10px] font-mono text-[#1A1918] dark:text-[#FAF9F7]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Case Study Action Button */}
                  <button
                    onClick={() => onOpenCaseStudy(getAssociatedProject(selectedNode))}
                    className="w-full py-3 rounded-full bg-[#1A1918] dark:bg-[#FAF9F7] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] text-white dark:text-[#1A1918] dark:hover:text-white text-xs font-mono font-medium transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Inspect System Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Accessibility List View */
          <div className="space-y-3 font-mono text-xs">
            {cloudNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => {
                  setSelectedNode(node);
                  setViewMode("map");
                }}
                className="p-4 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] hover:border-[#C86D51] dark:hover:border-[#E07A5F] cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#C86D51] dark:text-[#E07A5F] font-bold">{node.name}</span>
                    <span className="px-2 py-0.5 rounded bg-[#EFECE6] dark:bg-[#1C1B19] text-[10px]">{node.category}</span>
                  </div>
                  <span className="text-[#6E6C68] dark:text-[#A3A098] text-[11px] block">{node.description}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[#00B8A3] font-bold">{node.ping}</span>
                  <ArrowUpRight size={14} className="text-[#C86D51] dark:text-[#E07A5F]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PinterestCardWrapper>
  );
}
