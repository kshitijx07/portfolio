"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
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
      tag: "CAREER",
      color: "#0A66C2",
      badgeBg: "bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20",
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
      tag: "GRAPHQL API",
      color: "#FFA116",
      badgeBg: "bg-[#FFA116]/10 dark:bg-[#FFA116]/20",
      badgeText: "text-[#FFA116]",
      icon: ({ size }: { size: number }) => (
        <span className="w-5 h-5 rounded bg-[#FFA116] text-black font-bold text-[10px] flex items-center justify-center">LC</span>
      ),
      metaLeft: `Rank #${leetcodeData?.ranking || 605333}`,
      metaRight: "@kshitij72",
      link: "https://leetcode.com/u/kshitij72",
      linkText: "LeetCode Profile",
      content: (
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between text-[#6E6C68] dark:text-[#A3A098] text-[11px]">
            <span>Easy: {leetcodeData?.easySolved || 104}</span>
            <span>Med: {leetcodeData?.mediumSolved || 138}</span>
            <span>Hard: {leetcodeData?.hardSolved || 15}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#EFECE6] dark:bg-[#1C1B19] overflow-hidden flex">
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
      tag: "REST API",
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
      tag: "ALGORITHMS",
      color: "#1F8ACB",
      badgeBg: "bg-[#1F8ACB]/10 dark:bg-[#1F8ACB]/20",
      badgeText: "text-[#1F8ACB]",
      icon: ({ size }: { size: number }) => (
        <span className="w-5 h-5 rounded bg-[#1F8ACB] text-white font-bold text-[10px] flex items-center justify-center">CF</span>
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

  // Helper to calculate 3D position offset relative to active card
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
    // Right Card (Front-right)
    if (diff === 1) {
      return {
        zIndex: 20,
        x: "65%",
        scale: 0.88,
        rotateY: -15,
        opacity: 0.65,
        filter: "blur(1px)",
      };
    }
    // Left Card (Front-left)
    if (diff === total - 1) {
      return {
        zIndex: 20,
        x: "-65%",
        scale: 0.88,
        rotateY: 15,
        opacity: 0.65,
        filter: "blur(1px)",
      };
    }
    // Deep Back Card
    return {
      zIndex: 10,
      x: diff === 2 ? "120%" : "-120%",
      scale: 0.75,
      rotateY: diff === 2 ? -30 : 30,
      opacity: 0.25,
      filter: "blur(3px)",
    };
  };

  return (
    <PinterestCardWrapper pinLabel="Pin 3D Deck">
      <div className="w-full overflow-hidden" data-cursor="3D Deck">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
              Live Activity & Platform Deck
            </h3>
            <p className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono transition-colors">
              Click any card or use navigation controls to cycle depth layers
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white dark:hover:text-white flex items-center justify-center transition-all text-[#1A1918] dark:text-[#FAF9F7] active:scale-90 shadow-sm"
              title="Previous Layer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white dark:hover:text-white flex items-center justify-center transition-all text-[#1A1918] dark:text-[#FAF9F7] active:scale-90 shadow-sm"
              title="Next Layer"
            >
              <ChevronRight size={18} />
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
                className={`absolute w-[88%] sm:w-[70%] md:w-[480px] p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#242220] border cursor-pointer transition-colors shadow-2xl flex flex-col justify-between h-[270px] ${
                  isActive
                    ? "border-[#C86D51] dark:border-[#E07A5F] shadow-[0_12px_36px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
                    : "border-[#E8E3DA] dark:border-[#2E2C29] hover:border-[#C86D51] dark:hover:border-[#E07A5F]"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                        style={{ backgroundColor: card.color }}
                      >
                        <card.icon size={18} />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1A1918] dark:text-[#FAF9F7] block">
                          {card.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#6E6C68] dark:text-[#A3A098]">
                          {card.metaRight}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${card.badgeBg} ${card.badgeText}`}>
                      {card.tag}
                    </span>
                  </div>

                  {/* Card Subtitle */}
                  <h4 className="text-lg font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-2 transition-colors">
                    {card.subtitle}
                  </h4>

                  {/* Card Main Content */}
                  <div className="mb-4">{card.content}</div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex items-center justify-between font-mono text-xs text-[#6E6C68] dark:text-[#A3A098] transition-colors">
                  <span>{card.metaLeft}</span>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 font-medium hover:text-[#C86D51] dark:hover:text-[#E07A5F] transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deck Navigation Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-8 bg-[#C86D51] dark:bg-[#E07A5F]"
                  : "w-2 bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#C86D51]"
              }`}
              title={`Switch to ${card.title}`}
            />
          ))}
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
