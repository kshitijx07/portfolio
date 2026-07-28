"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Bento Instrument Panel Modules
import HeroIdentityPanel from "@/components/bento/HeroIdentityPanel";
import AboutEducationModule from "@/components/bento/AboutEducationModule";
import KeyMilestonesModule from "@/components/bento/KeyMilestonesModule";
import WorksCarouselModule from "@/components/bento/WorksCarouselModule";
import InteractiveJourneyMapModule from "@/components/bento/InteractiveJourneyMapModule";
import CodingProfilesBento from "@/components/bento/CodingProfilesBento";
import ExperienceTimelineModule from "@/components/bento/ExperienceTimelineModule";
import ContactResumePanel from "@/components/bento/ContactResumePanel";

// 3D & UI Components
import Parallax3DBackground from "@/components/ui/Parallax3DBackground";
import Skills3DSphere from "@/components/ui/Skills3DSphere";
import CaseStudyModal, { ProjectData } from "@/components/modals/CaseStudyModal";

const projectsData: ProjectData[] = [
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
      "Engineered a split Jenkins CI/CD pipeline automating npm build, S3 sync, CloudFront invalidation, DockerHub image build, and kubectl rollout."
    ],
    architecture: [
      "Secured workloads with Kubernetes Secrets for MongoDB Atlas, Cloudinary, and JWT.",
      "Enforced private S3 access through a CloudFront OAC policy, removing public bucket exposure entirely."
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
      "Deployed a secure three-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling.",
      "Streamlined uploads with an S3 presigned URL flow directly from browser to S3, increasing upload cap 5x (10 MB to 50 MB).",
      "Automated infrastructure for all 3 Lambdas using modular Terraform & GitHub Actions CI/CD with real-time DynamoDB AI confidence streaming."
    ],
    architecture: [
      "Modular Terraform Infrastructure as Code setup.",
      "Event-driven S3 presigned URL uploads and DynamoDB polling loop."
    ]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <main className="min-h-screen px-4 md:px-10 py-10 max-w-[1500px] mx-auto space-y-8 relative z-10">
      {/* 3D Ambient Parallax Background */}
      <Parallax3DBackground />

      {/* CHAPTER 01: IDENTITY & HERO PANEL (Full-Width Top) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <HeroIdentityPanel />
      </motion.section>

      {/* CHAPTER 01 CONTINUED: ABOUT & MILESTONES (Bento Row) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
      >
        <AboutEducationModule />
        <KeyMilestonesModule />
      </motion.section>

      {/* CHAPTER 02: CRAFT & RECENT WORKS CAROUSEL */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <WorksCarouselModule
          projects={projectsData}
          onOpenCaseStudy={setSelectedProject}
        />
      </motion.section>

      {/* CHAPTER 02 CONTINUED: INTERACTIVE GEOGRAPHIC JOURNEY MAP */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <InteractiveJourneyMapModule
          projects={projectsData}
          onOpenCaseStudy={setSelectedProject}
        />
      </motion.section>

      {/* CHAPTER 03: PROOF & CODING PROFILES (Elevated Bento Tiles) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <CodingProfilesBento />
      </motion.section>

      {/* CHAPTER 04: SKILLS SYSTEM (Interactive 3D Constellation Sphere) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Skills3DSphere />
      </motion.section>

      {/* CHAPTER 05: CAREER TIMELINE */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <ExperienceTimelineModule />
      </motion.section>

      {/* CHAPTER 05 CONTINUED: CONTACT & RESUME CONTROL PANEL */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <ContactResumePanel />
      </motion.section>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
