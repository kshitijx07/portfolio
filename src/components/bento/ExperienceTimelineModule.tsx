"use client";

import React from "react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import AnimatedThreadLine from "@/components/ui/AnimatedThreadLine";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

const experiences = [
  {
    role: "DevOps Intern",
    company: "Colgate-Palmolive",
    location: "Mumbai, Maharashtra, India (Hybrid)",
    duration: "Jul 2026 – Present",
    tag: "Enterprise DevOps & Cloud Automation",
    points: [
      "Support application deployment and infrastructure automation workflows within a DevOps team, contributing to CI/CD pipelines built with Jenkins, Git, and GitHub.",
      "Assist with AWS cloud infrastructure management and containerized application deployment using Docker across Linux-based staging and production environments.",
      "Collaborate with cross-functional engineering teams on deployment automation, contributing to Infrastructure as Code with Terraform and to monitoring initiatives."
    ]
  },
  {
    role: "Full Stack Developer Intern",
    company: "Campus Credential",
    location: "Remote",
    duration: "Jun 2025 – Aug 2025",
    tag: "Full Stack Systems Delivery",
    points: [
      "Owned end-to-end delivery of the Grocito platform, from requirements gathering and system design through production deployment, within a six-week sprint.",
      "Led backend architecture decisions using Spring Boot and MySQL, establishing a modular MVC structure that supported parallel development across three portals.",
      "Facilitated daily standups and sprint reviews within an agile team of three, coordinating feature delivery and code reviews to maintain on-schedule releases."
    ]
  }
];

export default function ExperienceTimelineModule() {
  return (
    <PinterestCardWrapper stampText="CAREER" pinLabel="Pin Experience">
      <div className="w-full overflow-hidden" data-cursor="Timeline">
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center shadow-sm">
              <Briefcase size={20} />
            </div>
            <div>
              <span className="bento-label !mb-0">CAREER JOURNEY // CHAPTER 05</span>
              <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
                Professional Timeline
              </h3>
            </div>
          </div>
        </div>

        {/* Timeline with Thread Line */}
        <div className="relative pl-8 md:pl-10 space-y-8">
          <AnimatedThreadLine />

          {experiences.map((exp, idx) => (
            <div key={idx} className="relative z-10">
              <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-[#C86D51] border-2 border-white shadow-sm z-10" />

              <div className="bg-[#F9F7F4] p-5 rounded-2xl border border-[#E8E3DA] shadow-sm hover:border-[#C86D51] transition-colors">
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
      </div>
    </PinterestCardWrapper>
  );
}
