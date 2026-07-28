"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Bento Instrument Panel Modules
import HeroIdentityPanel from "@/components/bento/HeroIdentityPanel";
import AboutEducationModule from "@/components/bento/AboutEducationModule";
import KeyMilestonesModule from "@/components/bento/KeyMilestonesModule";
import WorksCarouselModule from "@/components/bento/WorksCarouselModule";
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
    title: "Serverless AI X-Ray Analyzer",
    category: "AI & Serverless",
    year: "2026",
    description: "Serverless event-driven medical imaging platform on AWS using MobileNet TFLite to classify chest X-rays in <1s at zero idle cost, with S3 presigned URL uploads & Terraform automation.",
    longDescription: "Engineered a serverless, event-driven medical imaging platform on AWS that uses a pre-trained MobileNet TFLite model to classify chest X-rays in under 1 second at zero idle cost. Deployed a secure three-Lambda backend behind API Gateway with CORS enforcement and per-second request throttling to reduce DDoS exposure. Streamlined uploads with an S3 presigned URL flow sending images directly from the browser to S3, increasing the effective upload limit 5x (10 MB to 50 MB) while bypassing the API Gateway payload cap. Automated infrastructure for all three Lambda functions using modular Terraform and a GitHub Actions pipeline that runs uninterrupted deployments; built a React UI with drag-and-drop uploads and a two-second DynamoDB polling loop streaming AI confidence scores in real time.",
    tech: ["AWS Lambda", "Terraform", "GitHub Actions", "API Gateway", "S3", "DynamoDB", "React.js", "Python"],
    github: "https://github.com/kshitijx07/serverless-ai-xray",
    demo: "#",
    image: "/serverless_xray_ui.png",
    highlights: [
      "Classifies chest X-rays in under 1 second at 0 idle cost using pre-trained MobileNet TFLite model",
      "Deployed 3 secure Lambdas behind API Gateway with CORS & per-second request throttling",
      "Engineered browser S3 presigned URL flow increasing upload cap 5x (10 MB to 50 MB)",
      "Automated infrastructure with modular Terraform & uninterrupted GitHub Actions pipeline"
    ],
    architecture: [
      "Event-driven S3 & DynamoDB 2-second real-time AI confidence score streaming loop",
      "Modular Terraform Infrastructure as Code deployment pipeline"
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
