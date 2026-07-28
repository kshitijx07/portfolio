"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/cards/ProfileCard";
import ProjectCard from "@/components/cards/ProjectCard";
import CaseStudyModal, { ProjectData } from "@/components/modals/CaseStudyModal";
import GitHubCard from "@/components/cards/GitHubCard";
import LeetCodeCard from "@/components/cards/LeetCodeCard";
import CodeforcesCard from "@/components/cards/CodeforcesCard";
import ExperienceThreadCard from "@/components/cards/ExperienceThreadCard";
import ResumePrintCard from "@/components/cards/ResumePrintCard";
import DraggableStickersCard from "@/components/cards/DraggableStickersCard";
import PhotographyCollageCard from "@/components/cards/PhotographyCollageCard";
import CollectibleBadgesCard from "@/components/cards/CollectibleBadgesCard";
import TestimonialNotesCard from "@/components/cards/TestimonialNotesCard";
import VintagePostcardContact from "@/components/cards/VintagePostcardContact";
import { Sparkles, Layers, Grid, Bookmark } from "lucide-react";

const projectsData: ProjectData[] = [
  {
    title: "HostelHub",
    category: "Cloud Architecture",
    year: "2026",
    description: "Decoupled cloud-native hostel management platform with a React frontend on Amazon S3 and a Node.js REST API on AWS EKS (Kubernetes), with role-based access control.",
    longDescription: "HostelHub is a production-grade cloud-native hostel management platform. The frontend React application is hosted statically on Amazon S3 secured via CloudFront Origin Access Control (OAC). The backend REST API is containerized with Docker multi-stage builds and deployed to AWS EKS with Horizontal Pod Autoscaling (HPA).",
    tech: ["AWS EKS", "Kubernetes", "CloudFront", "S3", "ALB", "Jenkins", "Docker", "React.js", "Node.js", "MongoDB Atlas"],
    github: "https://github.com/kshitijx07/Hostelhub",
    demo: "https://hostelhub-ruby.vercel.app",
    image: "/hostelhub_ui.png",
    highlights: [
      "Built decoupled architecture with S3 static hosting and EKS REST API",
      "Designed unified CloudFront distribution routing /* to private S3 and /api/* to ALB",
      "Configured Kubernetes rolling updates with zero downtime and HPA scaling on 70% CPU",
      "Engineered split Jenkins CI/CD pipeline automating 100% of deployments"
    ],
    architecture: [
      "Role-Based Access Control for Students & Administrators",
      "Kubernetes Secrets & ConfigMaps for MongoDB Atlas, Cloudinary & JWT",
      "Private S3 Bucket Access enforced via CloudFront OAC ARN policy"
    ]
  },
  {
    title: "Grocito",
    category: "Full Stack System",
    year: "2025",
    description: "A three-portal grocery ordering system (Customer, Admin, Delivery Partner) featuring real-time order tracking, payment processing, and live map integration.",
    longDescription: "Grocito is a multi-portal real-time grocery ordering and delivery ecosystem. Built with Spring Boot, React, and MySQL, it connects customers, warehouse admins, and delivery partners with live tracking and map integration.",
    tech: ["Spring Boot", "React.js", "MySQL", "REST APIs", "Real-Time Tracking", "TailwindCSS"],
    github: "https://github.com/kshitijx07/Grocito-Copy",
    demo: "https://grocito-user.vercel.app/",
    image: "/grocito_ui.png",
    highlights: [
      "Engineered three-portal ecosystem for Customer, Admin, and Delivery Partner",
      "Integrated real-time order tracking and map routing APIs",
      "Designed optimized MySQL schemas handling high-frequency concurrent transactions",
      "Built admin analytics dashboard surfacing inventory health and order KPIs"
    ],
    architecture: [
      "Spring Boot Modular MVC Architecture",
      "Razorpay payment gateway & donation tracking system",
      "Role-based authentication & tokenized security"
    ]
  },
  {
    title: "Serverless AI X-Ray",
    category: "AI & Serverless",
    year: "2026",
    description: "An AI-powered serverless observability tool that leverages AWS Lambda, AWS X-Ray, and OpenAI to analyze request traces and automatically generate performance diagnoses.",
    longDescription: "Serverless AI X-Ray is a next-gen developer observability tool. It intercepts AWS X-Ray distributed traces across Lambda functions, processes timing bottlenecks, and utilizes OpenAI models to generate human-readable performance tuning suggestions.",
    tech: ["AWS Lambda", "AWS X-Ray", "OpenAI API", "Node.js", "Serverless Framework", "Python"],
    github: "https://github.com/kshitijx07/serverless-ai-xray",
    demo: "#",
    image: "/serverless_xray_ui.png",
    highlights: [
      "Intercepts serverless distributed traces across AWS Lambda & DynamoDB",
      "Uses OpenAI API to synthesize root-cause latency analysis automatically",
      "Displays real-time execution flow charts and timing diagnostics"
    ],
    architecture: [
      "Serverless Framework Deployment",
      "AWS X-Ray SDK integration with zero overhead",
      "OpenAI GPT-4 trace diagnosis engine"
    ]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Projects", "Skills", "CP & GitHub", "Experience", "Postcard"];

  return (
    <main className="min-h-screen px-4 md:px-12 py-10 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <header className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E3DA] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE6] text-[#6E6C68] text-xs font-mono mb-3">
            <Sparkles size={12} className="text-[#C86D51]" />
            <span>PINTEREST EDITORIAL COLLECTION • VOLUME 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-editorial font-bold text-[#1A1918] tracking-tight">
            Kshitij Kumbhar
          </h1>
          <p className="text-sm md:text-base text-[#6E6C68] font-sans mt-2 max-w-xl leading-relaxed">
            Computer Engineering Student & Cloud Systems Architect. Designing digital systems with Scandinavian clarity and precision.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-[#1A1918] text-white shadow-sm"
                  : "bg-[#EFECE6] text-[#6E6C68] hover:bg-[#D8C4B6] hover:text-[#1A1918]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Pinterest Editorial Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* COLUMN 1 */}
        {(activeFilter === "All" || activeFilter === "Postcard") && (
          <div className="space-y-8">
            <ProfileCard />
            <DraggableStickersCard />
            <PhotographyCollageCard />
          </div>
        )}

        {/* COLUMN 2 */}
        {(activeFilter === "All" || activeFilter === "Projects" || activeFilter === "CP & GitHub") && (
          <div className="space-y-8">
            <ProjectCard
              project={projectsData[0]}
              rotation={-1.5}
              onOpenCaseStudy={setSelectedProject}
            />
            <GitHubCard />
            <ProjectCard
              project={projectsData[2]}
              rotation={1.5}
              onOpenCaseStudy={setSelectedProject}
            />
            <CollectibleBadgesCard />
          </div>
        )}

        {/* COLUMN 3 */}
        {(activeFilter === "All" || activeFilter === "Experience" || activeFilter === "CP & GitHub") && (
          <div className="space-y-8">
            <ProjectCard
              project={projectsData[1]}
              rotation={1}
              onOpenCaseStudy={setSelectedProject}
            />
            <LeetCodeCard />
            <CodeforcesCard />
            <ExperienceThreadCard />
            <ResumePrintCard />
            <TestimonialNotesCard />
          </div>
        )}
      </div>

      {/* Postcard Contact Section (Full Width Bottom) */}
      <div className="mt-16">
        <VintagePostcardContact />
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
