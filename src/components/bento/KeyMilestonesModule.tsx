"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Cloud, Terminal, Code2, ShieldCheck } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

const milestones = [
  {
    id: "aws-eks",
    title: "AWS Cloud Architect",
    issuer: "AWS & Kubernetes",
    icon: Cloud,
    color: "#C86D51",
    bg: "#F2E4DF",
    story: "Designed decoupled AWS CloudFront distributions routing to private S3 and EKS microservices with zero CORS overhead."
  },
  {
    id: "jenkins",
    title: "CI/CD Automation",
    issuer: "Jenkins & Docker",
    icon: Terminal,
    color: "#2D4030",
    bg: "#E5EDE6",
    story: "Engineered multi-stage Docker builds and split Jenkins pipelines automating 100% of rolling Kubernetes updates."
  },
  {
    id: "cp-solver",
    title: "DSA & CP Solver",
    issuer: "LeetCode & Codeforces",
    icon: Code2,
    color: "#1A1918",
    bg: "#EFECE6",
    story: "Solved 240+ problems across LeetCode & Codeforces focusing on dynamic programming, graph theory, and algorithm optimization."
  },
  {
    id: "fullstack",
    title: "Full Stack Craftsman",
    issuer: "Spring Boot & React",
    icon: ShieldCheck,
    color: "#C86D51",
    bg: "#F2E4DF",
    story: "Built three-portal web ecosystems with real-time mapping, payment gateways, and scalable MySQL/MongoDB schema architecture."
  }
];

export default function KeyMilestonesModule() {
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);

  return (
    <PinterestCardWrapper stampText="HONORS" rotateDeg={0.5}>
      <div className="w-full flex flex-col justify-between h-full" data-cursor="Badges">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="bento-label">KEY MILESTONES // CHAPTER 03</span>
            <Trophy size={16} className="text-[#C86D51]" />
          </div>

          <h3 className="text-2xl font-editorial font-bold text-[#1A1918] mb-4">
            Honors & Accolades
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {milestones.map((m) => (
              <motion.div
                key={m.id}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedMilestone(m)}
                className="p-3.5 rounded-2xl border border-[#E8E3DA] cursor-pointer transition-all flex flex-col items-center text-center shadow-sm hover:shadow-md"
                style={{ backgroundColor: m.bg }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-2 shadow-sm"
                  style={{ backgroundColor: m.color }}
                >
                  <m.icon size={20} />
                </div>
                <h4 className="text-xs font-editorial font-bold text-[#1A1918] mb-0.5">
                  {m.title}
                </h4>
                <span className="text-[10px] font-mono text-[#6E6C68]">
                  {m.issuer}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <span className="text-[10px] font-mono text-[#6E6C68] block text-center mt-4">
          Click any badge to unlock story
        </span>

        {/* Story Modal */}
        <AnimatePresence>
          {selectedMilestone && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-md w-full paper-texture rounded-3xl p-6 border border-[#E8E3DA] shadow-2xl text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white mb-4 shadow-md"
                  style={{ backgroundColor: selectedMilestone.color }}
                >
                  <selectedMilestone.icon size={26} />
                </div>
                <span className="text-xs font-mono text-[#C86D51] uppercase tracking-wider block mb-1">
                  {selectedMilestone.issuer}
                </span>
                <h3 className="text-2xl font-editorial font-bold text-[#1A1918] mb-3">
                  {selectedMilestone.title}
                </h3>
                <p className="text-xs md:text-sm text-[#2B2A29] leading-relaxed mb-6 bg-[#F9F7F4] p-4 rounded-xl border border-[#E8E3DA]">
                  {selectedMilestone.story}
                </p>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="w-full py-2.5 rounded-full bg-[#1A1918] text-white text-xs font-mono hover:bg-[#C86D51] transition-colors"
                >
                  Close Story
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PinterestCardWrapper>
  );
}
