"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Flame, Award, ExternalLink, Activity, BookOpen } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import TiltCardWrapper from "@/components/ui/TiltCardWrapper";

export default function CodingProfilesBento() {
  const [githubData, setGithubData] = useState<any>(null);
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [codeforcesData, setCodeforcesData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/github").then((res) => res.json()).then(setGithubData).catch(() => {});
    fetch("/api/leetcode").then((res) => res.json()).then(setLeetcodeData).catch(() => {});
    fetch("/api/codeforces").then((res) => res.json()).then(setCodeforcesData).catch(() => {});
  }, []);

  return (
    <div className="w-full space-y-4" data-cursor="Profiles">
      <div className="bento-label">CODING PROFILES // CHAPTER 03</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GitHub Elevated Tile */}
        <TiltCardWrapper maxTilt={4}>
          <div className="bento-card bento-card-hover bg-[#1A1918] text-white border-[#2B2A29] p-5 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <FiGithub size={20} className="text-[#C86D51]" />
                  <span className="font-mono text-xs font-bold text-white">GitHub</span>
                </div>
                <a
                  href="https://github.com/kshitijx07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#6E6C68] hover:text-[#C86D51] font-mono transition-colors"
                >
                  @kshitijx07
                </a>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#6E6C68]">Public Repos:</span>
                  <span className="font-bold text-white">{githubData?.publicRepos || 18}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#6E6C68]">Total Stars:</span>
                  <span className="font-bold text-[#C86D51] flex items-center gap-1">
                    <Star size={12} className="fill-[#C86D51]" />
                    {githubData?.totalStars || 14}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2B2A29] flex justify-between items-center text-[11px] font-mono text-[#6E6C68]">
              <span>Docker • TS • Java</span>
              <ExternalLink size={12} />
            </div>
          </div>
        </TiltCardWrapper>

        {/* LeetCode Elevated Tile */}
        <TiltCardWrapper maxTilt={4}>
          <div className="bento-card bento-card-hover bg-[#1A1918] text-white border-[#2B2A29] p-5 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#FFA116] text-black font-bold text-[10px] flex items-center justify-center">LC</span>
                  <span className="font-mono text-xs font-bold text-white">LeetCode</span>
                </div>
                <a
                  href="https://leetcode.com/u/kshitij72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#6E6C68] hover:text-[#C86D51] font-mono transition-colors"
                >
                  @kshitij72
                </a>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#6E6C68]">Solved Problems:</span>
                  <span className="font-bold text-white">{leetcodeData?.totalSolved || 240}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#6E6C68]">Streak:</span>
                  <span className="font-bold text-[#FFA116] flex items-center gap-1">
                    <Flame size={12} className="fill-[#FFA116]" />
                    {leetcodeData?.currentStreak || 18} Days
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2B2A29] flex justify-between items-center text-[11px] font-mono text-[#6E6C68]">
              <span>Rank #{leetcodeData?.ranking || 142050}</span>
              <ExternalLink size={12} />
            </div>
          </div>
        </TiltCardWrapper>

        {/* Codeforces Elevated Tile */}
        <TiltCardWrapper maxTilt={4}>
          <div className="bento-card bento-card-hover bg-[#1A1918] text-white border-[#2B2A29] p-5 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#1F8ACB] text-white font-bold text-[10px] flex items-center justify-center">CF</span>
                  <span className="font-mono text-xs font-bold text-white">Codeforces</span>
                </div>
                <a
                  href="https://codeforces.com/profile/kshitij___x07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#6E6C68] hover:text-[#C86D51] font-mono transition-colors"
                >
                  @kshitij___x07
                </a>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#6E6C68]">Rating:</span>
                  <span className="font-bold text-[#1F8ACB]">{codeforcesData?.rating || 1280}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#6E6C68]">Max Rank:</span>
                  <span className="font-bold text-[#C86D51] capitalize">{codeforcesData?.maxRank || "pupil"}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2B2A29] flex justify-between items-center text-[11px] font-mono text-[#6E6C68]">
              <span>Contests: {codeforcesData?.contestsCount || 14}</span>
              <ExternalLink size={12} />
            </div>
          </div>
        </TiltCardWrapper>
      </div>
    </div>
  );
}
