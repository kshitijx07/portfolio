"use client";

import React, { useEffect, useState } from "react";
import { Star, Flame, ExternalLink, Code2 } from "lucide-react";
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
          <div className="bento-card bento-card-hover bg-[#1A1918] dark:bg-[#1C1B19] text-white border-[#2B2A29] dark:border-[#2E2C29] p-5 rounded-2xl shadow-xl flex flex-col justify-between transition-colors h-full">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <FiGithub size={20} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  <span className="font-mono text-xs font-bold text-white">GitHub</span>
                </div>
                <a
                  href="https://github.com/kshitijx07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#A3A098] hover:text-[#C86D51] dark:hover:text-[#E07A5F] font-mono transition-colors flex items-center gap-1"
                >
                  <span>@kshitijx07</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#A3A098]">Public Repositories:</span>
                  <span className="font-bold text-white text-sm">{githubData?.publicRepos || 38}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#A3A098]">Total Stargazers:</span>
                  <span className="font-bold text-[#C86D51] dark:text-[#E07A5F] flex items-center gap-1">
                    <Star size={12} className="fill-[#C86D51] dark:fill-[#E07A5F]" />
                    {githubData?.totalStars ?? 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2B2A29] dark:border-[#2E2C29] flex justify-between items-center text-[11px] font-mono text-[#A3A098]">
              <span>Docker • TS • Java • Python</span>
              <span className="text-[10px] text-[#C86D51] dark:text-[#E07A5F]">LIVE API</span>
            </div>
          </div>
        </TiltCardWrapper>

        {/* LeetCode Elevated Tile */}
        <TiltCardWrapper maxTilt={4}>
          <div className="bento-card bento-card-hover bg-[#1A1918] dark:bg-[#1C1B19] text-white border-[#2B2A29] dark:border-[#2E2C29] p-5 rounded-2xl shadow-xl flex flex-col justify-between transition-colors h-full">
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
                  className="text-xs text-[#A3A098] hover:text-[#C86D51] dark:hover:text-[#E07A5F] font-mono transition-colors flex items-center gap-1"
                >
                  <span>@kshitij72</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#A3A098]">Total Solved:</span>
                  <span className="font-bold text-white text-sm">{leetcodeData?.totalSolved || 257}</span>
                </div>

                {/* Difficulty Breakdown Bar */}
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-[#A3A098]">
                    <span>Easy: {leetcodeData?.easySolved || 104}</span>
                    <span>Med: {leetcodeData?.mediumSolved || 138}</span>
                    <span>Hard: {leetcodeData?.hardSolved || 15}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#2B2A29] overflow-hidden flex">
                    <div className="bg-[#00B8A3] h-full" style={{ width: "40%" }} />
                    <div className="bg-[#FFC01E] h-full" style={{ width: "53%" }} />
                    <div className="bg-[#FF375F] h-full" style={{ width: "7%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2B2A29] dark:border-[#2E2C29] flex justify-between items-center text-[11px] font-mono text-[#A3A098]">
              <span>Global Rank #{leetcodeData?.ranking || 605333}</span>
              <span className="text-[10px] text-[#FFA116]">GRAPHQL</span>
            </div>
          </div>
        </TiltCardWrapper>

        {/* Codeforces Elevated Tile */}
        <TiltCardWrapper maxTilt={4}>
          <div className="bento-card bento-card-hover bg-[#1A1918] dark:bg-[#1C1B19] text-white border-[#2B2A29] dark:border-[#2E2C29] p-5 rounded-2xl shadow-xl flex flex-col justify-between transition-colors h-full">
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
                  className="text-xs text-[#A3A098] hover:text-[#C86D51] dark:hover:text-[#E07A5F] font-mono transition-colors flex items-center gap-1"
                >
                  <span>@kshitij___x07</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#A3A098]">Rating:</span>
                  <span className="font-bold text-[#1F8ACB] text-sm">{codeforcesData?.rating || 1280}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#A3A098]">Max Rank:</span>
                  <span className="font-bold text-[#C86D51] dark:text-[#E07A5F] capitalize">{codeforcesData?.maxRank || "pupil"}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2B2A29] dark:border-[#2E2C29] flex justify-between items-center text-[11px] font-mono text-[#A3A098]">
              <span>Contests: {codeforcesData?.contestsCount || 14}</span>
              <span className="text-[10px] text-[#1F8ACB]">LIVE API</span>
            </div>
          </div>
        </TiltCardWrapper>
      </div>
    </div>
  );
}
