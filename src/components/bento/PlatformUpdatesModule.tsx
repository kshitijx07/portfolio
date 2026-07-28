"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Sparkles, ArrowRight, Star, Flame, Code2 } from "lucide-react";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

export default function PlatformUpdatesModule() {
  const [githubData, setGithubData] = useState<any>(null);
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [codeforcesData, setCodeforcesData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/github").then((res) => res.json()).then(setGithubData).catch(() => {});
    fetch("/api/leetcode").then((res) => res.json()).then(setLeetcodeData).catch(() => {});
    fetch("/api/codeforces").then((res) => res.json()).then(setCodeforcesData).catch(() => {});
  }, []);

  return (
    <PinterestCardWrapper pinLabel="Pin Updates">
      <div className="w-full overflow-hidden" data-cursor="Updates">
        {/* Module Header */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
              Latest Live Activity & Platform Updates
            </h3>
            <p className="text-xs text-[#6E6C68] dark:text-[#A3A098] font-mono transition-colors">
              Real-time feed across LinkedIn, LeetCode, GitHub & Codeforces
            </p>
          </div>
        </div>

        {/* Side-by-side Horizontal Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {/* 1. LinkedIn Card */}
          <div className="p-4 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] flex flex-col justify-between hover:border-[#0A66C2] transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center">
                    <FiLinkedin size={15} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1A1918] dark:text-[#FAF9F7]">LinkedIn Update</span>
                </div>
                <span className="text-[10px] font-mono text-[#0A66C2] dark:text-[#388DFF] font-bold">CAREER</span>
              </div>

              <h4 className="text-sm font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-1.5 line-clamp-2">
                DevOps Intern @ Colgate-Palmolive
              </h4>

              <p className="text-xs text-[#6E6C68] dark:text-[#A3A098] leading-relaxed mb-3 font-sans">
                Supporting CI/CD pipelines, Docker containerization & AWS cloud management in Mumbai (Hybrid).
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6E6C68] dark:text-[#A3A098]">Jul 2026 – Present</span>
              <a
                href="https://www.linkedin.com/in/kshitij-kumbhar-369777x/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#0A66C2] dark:text-[#388DFF] hover:underline flex items-center gap-1 font-medium"
              >
                <span>View</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* 2. LeetCode Live Card */}
          <div className="p-4 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] flex flex-col justify-between hover:border-[#FFA116] transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#FFA116] text-black font-bold text-xs flex items-center justify-center">LC</span>
                  <span className="font-mono text-xs font-bold text-[#1A1918] dark:text-[#FAF9F7]">LeetCode Live</span>
                </div>
                <span className="text-[10px] font-mono text-[#FFA116] font-bold">GRAPHQL</span>
              </div>

              <h4 className="text-sm font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-1.5">
                {leetcodeData?.totalSolved || 257} Problems Solved
              </h4>

              <div className="space-y-1.5 font-mono text-xs text-[#6E6C68] dark:text-[#A3A098] mb-3">
                <div className="flex justify-between text-[11px]">
                  <span>Easy: {leetcodeData?.easySolved || 104}</span>
                  <span>Med: {leetcodeData?.mediumSolved || 138}</span>
                  <span>Hard: {leetcodeData?.hardSolved || 15}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EFECE6] dark:bg-[#1C1B19] overflow-hidden flex">
                  <div className="bg-[#00B8A3] h-full" style={{ width: "40%" }} />
                  <div className="bg-[#FFC01E] h-full" style={{ width: "53%" }} />
                  <div className="bg-[#FF375F] h-full" style={{ width: "7%" }} />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6E6C68] dark:text-[#A3A098]">Rank #{leetcodeData?.ranking || 605333}</span>
              <a
                href="https://leetcode.com/u/kshitij72"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#FFA116] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* 3. GitHub Live Card */}
          <div className="p-4 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] flex flex-col justify-between hover:border-[#C86D51] dark:hover:border-[#E07A5F] transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1A1918] dark:bg-[#FAF9F7] text-white dark:text-[#1A1918] flex items-center justify-center">
                    <FiGithub size={15} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1A1918] dark:text-[#FAF9F7]">GitHub Live</span>
                </div>
                <span className="text-[10px] font-mono text-[#C86D51] dark:text-[#E07A5F] font-bold">REPOS</span>
              </div>

              <h4 className="text-sm font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-1.5">
                {githubData?.publicRepos || 38} Public Repositories
              </h4>

              <p className="text-xs text-[#6E6C68] dark:text-[#A3A098] leading-relaxed mb-3 font-sans">
                Active commits across HostelHub (EKS), Grocito (Spring), and Serverless AI X-Ray.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6E6C68] dark:text-[#A3A098]">@kshitijx07</span>
              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#C86D51] dark:text-[#E07A5F] hover:underline flex items-center gap-1 font-medium"
              >
                <span>GitHub</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* 4. Codeforces Card */}
          <div className="p-4 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] flex flex-col justify-between hover:border-[#1F8ACB] transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#1F8ACB] text-white font-bold text-xs flex items-center justify-center">CF</span>
                  <span className="font-mono text-xs font-bold text-[#1A1918] dark:text-[#FAF9F7]">Codeforces</span>
                </div>
                <span className="text-[10px] font-mono text-[#1F8ACB] font-bold">CP</span>
              </div>

              <h4 className="text-sm font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-1.5">
                Active CP Competitor
              </h4>

              <p className="text-xs text-[#6E6C68] dark:text-[#A3A098] leading-relaxed mb-3 font-sans">
                Solving competitive programming challenges in dynamic programming, graph theory & algorithms.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6E6C68] dark:text-[#A3A098]">@kshitij___x07</span>
              <a
                href="https://codeforces.com/profile/kshitij___x07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#1F8ACB] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
