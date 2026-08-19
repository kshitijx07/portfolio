"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Cloud, Terminal, Code2, ShieldCheck, Sparkles, X } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

const milestones = [
  {
    id: "aws-eks",
    title: "AWS Cloud Architect",
    issuer: "AWS & Kubernetes",
    icon: Cloud,
    color: "#C86D51",
    bgGradient: "from-[#C86D51]/20 to-[#FFA116]/10",
    story: "Designed decoupled AWS CloudFront distributions routing to private S3 and EKS microservices with zero CORS overhead."
  },
  {
    id: "jenkins",
    title: "CI/CD Automation",
    issuer: "Jenkins & Docker",
    icon: Terminal,
    color: "#2D4030",
    bgGradient: "from-[#00E676]/20 to-[#00D2FF]/10",
    story: "Engineered multi-stage Docker builds and split Jenkins pipelines automating 100% of rolling Kubernetes updates."
  },
  {
    id: "cp-solver",
    title: "DSA & CP Solver",
    issuer: "LeetCode & Codeforces",
    icon: Code2,
    color: "#FFA116",
    bgGradient: "from-[#FFA116]/20 to-[#C86D51]/10",
    story: "Solved 257+ problems across LeetCode & Codeforces focusing on dynamic programming, graph theory, and algorithmic optimization."
  },
  {
    id: "fullstack",
    title: "Full Stack Craftsman",
    issuer: "Spring Boot & React",
    icon: ShieldCheck,
    color: "#00D2FF",
    bgGradient: "from-[#00D2FF]/20 to-[#9D7BFF]/10",
    story: "Built three-portal web ecosystems with real-time mapping, payment gateways, and scalable MySQL/MongoDB schema architecture."
  }
];

export default function KeyMilestonesModule() {
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);

  return (
    <PinterestCardWrapper stampText="HONORS // VERIFIED" rotateDeg={0.5}>
      <div className="w-full flex flex-col justify-between h-full" data-cursor="Badges">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7]">
              Honors & Accolades
            </h3>
            <span className="y2k-pill text-[10px] text-[#FFA116]">
              <Trophy size={11} className="text-[#FFA116]" />
              <span>4 Achievements</span>
            </span>
          </div>

          <p className="text-xs md:text-sm text-[#5C5955] dark:text-[#A3A098] leading-relaxed mb-6 font-sans">
            Key milestones spanning cloud architecture, CI/CD automation, and algorithmic engineering.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {milestones.map((m) => (
              <motion.div
                key={m.id}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03, y: -2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedMilestone(m)}
                className="p-4 rounded-2xl border border-white/80 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md cursor-pointer transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:border-[#C86D51]/50 group"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white mb-2.5 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: m.color }}
                >
                  <m.icon size={20} />
                </div>
                <h4 className="text-xs font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-0.5">
                  {m.title}
                </h4>
                <span className="text-[10px] font-mono text-[#5C5955] dark:text-[#A3A098] font-semibold">
                  {m.issuer}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <span className="text-[10px] font-mono text-[#5C5955] dark:text-[#A3A098] block text-center mt-4 font-semibold">
          ✦ Click any badge to inspect story
        </span>

        {/* Story Modal */}
        <AnimatePresence>
          {selectedMilestone && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative max-w-md w-full bg-white/95 dark:bg-[#1C1B19]/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/60 dark:border-white/10 shadow-2xl text-center glass-specular-edge"
              >
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 dark:bg-white/10 flex items-center justify-center text-[#1A1918] dark:text-[#FAF9F7] hover:bg-[#C86D51] hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                <div
                  className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white mb-4 shadow-xl"
                  style={{ backgroundColor: selectedMilestone.color }}
                >
                  <selectedMilestone.icon size={26} />
                </div>
                <span className="text-xs font-mono text-[#C86D51] dark:text-[#E07A5F] uppercase tracking-wider block mb-1 font-bold">
                  {selectedMilestone.issuer}
                </span>
                <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-3">
                  {selectedMilestone.title}
                </h3>
                <p className="text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed mb-6 bg-white/60 dark:bg-white/5 p-4 rounded-2xl border border-[#E8E3DA] dark:border-[#2E2C29]">
                  {selectedMilestone.story}
                </p>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="w-full py-2.5 rounded-full bg-[#1A1918] dark:bg-[#FAF9F7] text-white dark:text-[#1A1918] text-xs font-mono font-bold hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] dark:hover:text-white transition-all shadow-sm"
                >
                  Dismiss Story
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PinterestCardWrapper>
  );
}

