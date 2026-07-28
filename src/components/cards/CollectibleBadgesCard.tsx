"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cloud, Terminal, Code2, Sparkles, Info } from "lucide-react";

const badges = [
  {
    id: "aws-eks",
    title: "AWS Cloud Architect",
    issuer: "AWS & Kubernetes",
    icon: Cloud,
    color: "#FF9900",
    bg: "#FFF8ED",
    border: "#FFE8C8",
    story: "Designed decoupled AWS CloudFront distributions routing to private S3 and EKS microservices with zero CORS overhead."
  },
  {
    id: "jenkins",
    title: "CI/CD Automation",
    issuer: "Jenkins & Docker",
    icon: Terminal,
    color: "#D24939",
    bg: "#FFF5F5",
    border: "#FED7D7",
    story: "Engineered multi-stage Docker builds and split Jenkins pipelines automating 100% of rolling Kubernetes updates."
  },
  {
    id: "cp-solver",
    title: "DSA & CP Practitioner",
    issuer: "LeetCode & Codeforces",
    icon: Code2,
    color: "#2D4030",
    bg: "#E5EDE6",
    border: "#C3D6C5",
    story: "Solved 240+ problems across LeetCode & Codeforces focusing on dynamic programming, graph theory, and algorithmic optimization."
  },
  {
    id: "fullstack",
    title: "Full Stack Craftsman",
    issuer: "Next.js & Spring Boot",
    icon: ShieldCheck,
    color: "#C86D51",
    bg: "#F2E4DF",
    border: "#E8C8BE",
    story: "Built three-portal web ecosystems with real-time mapping, payment gateways, and scalable MySQL/MongoDB schema architecture."
  }
];

export default function CollectibleBadgesCard() {
  const [activeBadge, setActiveBadge] = useState<any>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 md:p-8 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#E5EDE6] text-[#2D4030] text-xs font-mono font-medium">
            Collectible Badges
          </span>
          <h3 className="text-2xl font-editorial font-bold text-[#1A1918] mt-1">
            Engineering Honors
          </h3>
        </div>

        <span className="postmark-stamp text-[10px]">VERIFIED</span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {badges.map((b, idx) => (
          <motion.div
            key={b.id}
            whileHover={{ scale: 1.05, rotate: 0 }}
            initial={{ rotate: (idx % 2 === 0 ? -2 : 2) }}
            onClick={() => setActiveBadge(b)}
            className="p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center group/badge shadow-sm"
            style={{ backgroundColor: b.bg, borderColor: b.border }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-white shadow-sm transition-transform group-hover/badge:scale-110"
              style={{ backgroundColor: b.color }}
            >
              <b.icon size={22} />
            </div>
            <h4 className="text-xs font-editorial font-bold text-[#1A1918] mb-1">
              {b.title}
            </h4>
            <span className="text-[10px] font-mono text-[#6E6C68]">
              {b.issuer}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="text-[11px] font-mono text-[#6E6C68] text-center">
        Click any badge to reveal its engineering story
      </p>

      {/* Story Reveal Modal */}
      <AnimatePresence>
        {activeBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-md w-full paper-texture rounded-3xl p-6 border border-[#E8E3DA] shadow-2xl text-center"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white mb-4 shadow-md"
                style={{ backgroundColor: activeBadge.color }}
              >
                <activeBadge.icon size={30} />
              </div>
              <span className="text-xs font-mono text-[#C86D51] uppercase tracking-wider block mb-1">
                {activeBadge.issuer}
              </span>
              <h3 className="text-2xl font-editorial font-bold text-[#1A1918] mb-3">
                {activeBadge.title}
              </h3>
              <p className="text-xs md:text-sm text-[#2B2A29] leading-relaxed mb-6 bg-[#F9F7F4] p-4 rounded-xl border border-[#E8E3DA]">
                {activeBadge.story}
              </p>
              <button
                onClick={() => setActiveBadge(null)}
                className="w-full py-2.5 rounded-full bg-[#1A1918] text-white text-xs font-mono hover:bg-[#C86D51] transition-colors"
              >
                Close Story
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
