"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import AnimatedThreadLine from "@/components/ui/AnimatedThreadLine";

const experiences = [
  {
    role: "DevOps Intern",
    company: "Colgate-Palmolive – DevOps Team",
    location: "Mumbai, Maharashtra, India (Hybrid)",
    duration: "Jul 2026 – Present",
    tag: "Enterprise DevOps & Cloud Automation",
    points: [
      "Working with enterprise DevOps workflows supporting production application deployment and infrastructure automation.",
      "Gaining hands-on experience with CI/CD pipelines using Jenkins, Git, and GitHub.",
      "Learning cloud infrastructure management on AWS and containerized application deployment using Docker.",
      "Assisting in Linux system administration, deployment automation, and environment configuration.",
      "Continuously improving knowledge of Kubernetes, Infrastructure as Code (Terraform), and cloud-native monitoring."
    ]
  },
  {
    role: "Full Stack Developer Intern",
    company: "Campus Credential",
    location: "Remote",
    duration: "Jun 2025 – Aug 2025",
    tag: "Full Stack Systems Delivery",
    points: [
      "Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design to production deployment, within a six-week sprint.",
      "Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.",
      "Facilitated daily standups and sprint reviews within an agile team of three, maintaining on-schedule releases."
    ]
  }
];

export default function ExperienceThreadCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 1 }}
      whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="Timeline"
      className="relative w-full paper-texture rounded-3xl p-6 md:p-8 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E3DA]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2D4030] text-white flex items-center justify-center shadow-sm">
            <Briefcase size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
              Career Experience Timeline
            </h3>
            <p className="text-xs text-[#6E6C68] font-mono">
              Professional Engineering Journey
            </p>
          </div>
        </div>

        <span className="postmark-stamp text-[10px] hidden sm:block">
          POSTCARD THREAD
        </span>
      </div>

      {/* Connected Postcards timeline */}
      <div className="relative pl-8 md:pl-10 space-y-10">
        {/* Animated Red Thread Line SVG */}
        <AnimatedThreadLine />

        {experiences.map((exp, idx) => (
          <div key={idx} className="relative z-10">
            {/* Thread Pin Dot */}
            <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-[#C86D51] border-2 border-white shadow-sm z-10" />

            <div className="bg-[#F9F7F4] p-5 md:p-6 rounded-2xl border border-[#E8E3DA] shadow-sm hover:border-[#C86D51] transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-medium">
                  {exp.tag}
                </span>
                <span className="text-xs text-[#6E6C68] font-mono flex items-center gap-1">
                  <Calendar size={12} />
                  {exp.duration}
                </span>
              </div>

              <h4 className="text-xl font-editorial font-bold text-[#1A1918]">
                {exp.role}
              </h4>
              <p className="text-xs md:text-sm font-semibold text-[#2D4030] mb-3 flex items-center gap-1">
                <span>{exp.company}</span>
                <span className="text-[#6E6C68] font-normal">• {exp.location}</span>
              </p>

              <ul className="space-y-2 mt-3">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-xs md:text-sm text-[#2B2A29]">
                    <CheckCircle2 size={14} className="text-[#C86D51] mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
