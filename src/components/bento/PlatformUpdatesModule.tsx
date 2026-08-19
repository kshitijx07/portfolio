"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

interface PlatformCardData {
  id: string;
  platform: "linkedin" | "leetcode" | "github" | "codeforces";
  title: string;
  subtitle: string;
  tag: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  icon: any;
  metaLeft: string;
  metaRight: string;
  link: string;
  linkText: string;
  content: React.ReactNode;
}

export default function PlatformUpdatesModule() {
  const [githubData, setGithubData] = useState<any>(null);
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [codeforcesData, setCodeforcesData] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/api/github").then((res) => res.json()).then(setGithubData).catch(() => {});
    fetch("/api/leetcode").then((res) => res.json()).then(setLeetcodeData).catch(() => {});
    fetch("/api/codeforces").then((res) => res.json()).then(setCodeforcesData).catch(() => {});
  }, []);

  const cards: PlatformCardData[] = [
    {
      id: "linkedin",
      platform: "linkedin",
      title: "LinkedIn Update",
      subtitle: "DevOps Intern @ Colgate-Palmolive",
      tag: "CAREER // HYBRID",
      color: "#0A66C2",
      badgeBg: "bg-[#0A66C2]/15 dark:bg-[#0A66C2]/25",
      badgeText: "text-[#0A66C2] dark:text-[#388DFF]",
      icon: FiLinkedin,
      metaLeft: "Jul 2026 – Present",
      metaRight: "Mumbai (Hybrid)",
      link: "https://www.linkedin.com/in/kshitij-kumbhar-369777x/",
      linkText: "View Post",
      content: (
        <p className="text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed font-sans">
          Supporting CI/CD pipelines with Jenkins & Git, containerized deployments using Docker, and AWS cloud infrastructure management across staging & production environments.
        </p>
      ),
    },
    {
      id: "leetcode",
      platform: "leetcode",
      title: "LeetCode Live",
      subtitle: `${leetcodeData?.totalSolved || 257} Problems Solved`,
      tag: "GRAPHQL // XP",
      color: "#FFA116",
      badgeBg: "bg-[#FFA116]/15 dark:bg-[#FFA116]/25",
      badgeText: "text-[#FFA116]",
      icon: ({ size }: { size: number }) => (
        <span className="w-5 h-5 rounded-lg bg-[#FFA116] text-black font-bold text-[10px] flex items-center justify-center">LC</span>
      ),
      metaLeft: `Rank #${leetcodeData?.ranking || 605333}`,
      metaRight: "@kshitij72",
      link: "https://leetcode.com/u/kshitij72",
      linkText: "LeetCode Profile",
      content: (
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between text-[#5C5955] dark:text-[#A3A098] text-[11px] font-semibold">
            <span>Easy: {leetcodeData?.easySolved || 104}</span>
            <span>Med: {leetcodeData?.mediumSolved || 138}</span>
            <span>Hard: {leetcodeData?.hardSolved || 15}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#EFECE6] dark:bg-[#1C1B19] overflow-hidden flex shadow-inner">
            <div className="bg-[#00B8A3] h-full" style={{ width: "40%" }} />
            <div className="bg-[#FFC01E] h-full" style={{ width: "53%" }} />
            <div className="bg-[#FF375F] h-full" style={{ width: "7%" }} />
          </div>
        </div>
      ),
    },
    {
      id: "github",
      platform: "github",
      title: "GitHub Live",
      subtitle: `${githubData?.publicRepos || 38} Public Repositories`,
      tag: "REST API // LIVE",
      color: "#C86D51",
      badgeBg: "bg-[#F2E4DF] dark:bg-[#38241E]",
      badgeText: "text-[#C86D51] dark:text-[#E07A5F]",
      icon: FiGithub,
      metaLeft: `@${githubData?.username || "kshitijx07"}`,
      metaRight: "Active Commits",
      link: "https://github.com/kshitijx07",
      linkText: "GitHub Profile",
      content: (
        <p className="text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed font-sans">
          Active commits across cloud infrastructure projects including HostelHub (EKS), Grocito (Spring Boot), and Serverless AI X-Ray Analyzer (AWS Lambda).
        </p>
      ),
    },
    {
      id: "codeforces",
      platform: "codeforces",
      title: "Codeforces",
      subtitle: "Active CP Competitor",
      tag: "ALGORITHMS // RATING",
      color: "#1F8ACB",
      badgeBg: "bg-[#1F8ACB]/15 dark:bg-[#1F8ACB]/25",
      badgeText: "text-[#1F8ACB]",
      icon: ({ size }: { size: number }) => (
        <span className="w-5 h-5 rounded-lg bg-[#1F8ACB] text-white font-bold text-[10px] flex items-center justify-center">CF</span>
      ),
      metaLeft: "@kshitij___x07",
      metaRight: "Rating: 1280",
      link: "https://codeforces.com/profile/kshitij___x07",
      linkText: "Codeforces Profile",
      content: (
        <p className="text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed font-sans">
          Solving competitive programming problems in dynamic programming, graph algorithms, data structures, and mathematical optimization.
        </p>
      ),
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // 3D position offset relative to active card
  const getCardStyle = (index: number) => {
    const total = cards.length;
    const diff = (index - activeIndex + total) % total;

    // Center Active Card
    if (diff === 0) {
      return {
        zIndex: 30,
        x: "0%",
        scale: 1,
        rotateY: 0,
        opacity: 1,
        filter: "blur(0px)",
      };
    }
    // Right Card
    if (diff === 1) {
      return {
        zIndex: 20,
        x: "65%",
        scale: 0.88,
        rotateY: -14,
        opacity: 0.65,
        filter: "blur(1px)",
      };
    }
    // Left Card
    if (diff === total - 1) {
      return {
        zIndex: 20,
        x: "-65%",
        scale: 0.88,
        rotateY: 14,
        opacity: 0.65,
        filter: "blur(1px)",
      };
    }
    // Back Card
    return {
      zIndex: 10,
      x: diff === 2 ? "115%" : "-115%",
      scale: 0.75,
      rotateY: diff === 2 ? -28 : 28,
      opacity: 0.25,
      filter: "blur(3px)",
    };
  };

  return (
    <section id="stats" className="py-16 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8" data-cursor="3D Deck">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[var(--accent-acid)]" />
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                Live Activity & Platform Telemetry
              </h3>
              <span className="hud-tag hud-tag-acid text-[9px]">
                <span>3D Spatial Deck</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Real-time synchronization across LinkedIn, LeetCode (257+ solved), GitHub & Codeforces
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="hud-btn p-2"
              title="Previous Layer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="hud-btn p-2"
              title="Next Layer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 3D Perspective Stage Container */}
        <div className="relative w-full h-[320px] md:h-[300px] flex items-center justify-center perspective-1000 my-2">
          {cards.map((card, idx) => {
            const cardStyle = getCardStyle(idx);
            const isActive = idx === activeIndex;

            return (
              <motion.div
                key={card.id}
                onClick={() => setActiveIndex(idx)}
                initial={false}
                animate={{
                  x: cardStyle.x,
                  scale: cardStyle.scale,
                  rotateY: cardStyle.rotateY,
                  opacity: cardStyle.opacity,
                  filter: cardStyle.filter,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: cardStyle.zIndex }}
                className={`absolute w-[92%] sm:w-[75%] md:w-[490px] p-6 md:p-7 border cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between h-[270px] ${
                  isActive
                    ? "bg-[var(--bg-surface)] border-[var(--accent-acid)] shadow-[0_12px_32px_rgba(183,255,0,0.15)]"
                    : "bg-[var(--bg-primary)] border-[var(--border-color)] hover:border-[var(--accent-acid)]/50"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center text-[#050505] font-mono font-bold text-xs"
                        style={{ backgroundColor: card.color === "#0A66C2" ? "var(--accent-blue)" : "var(--accent-acid)" }}
                      >
                        <card.icon size={18} />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-[var(--text-primary)] block">
                          {card.title}
                        </span>
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">
                          {card.metaRight}
                        </span>
                      </div>
                    </div>

                    <span className="hud-tag text-[9px] font-mono">
                      {card.tag}
                    </span>
                  </div>

                  {/* Card Subtitle */}
                  <h4 className="text-lg font-display font-bold text-[var(--text-primary)] uppercase mb-2">
                    {card.subtitle}
                  </h4>

                  {/* Card Main Content */}
                  <div className="mb-4 font-sans text-xs text-[var(--text-secondary)]">{card.content}</div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
                  <span>{card.metaLeft}</span>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 font-bold text-[var(--text-primary)] hover:text-[var(--accent-acid)] transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deck Navigation Indicator Rectangles */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-8 bg-[var(--accent-acid)]"
                  : "w-2 bg-[var(--border-color)] hover:bg-[var(--accent-acid)]"
              }`}
              title={`Switch to ${card.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

