"use client";

import React, { useEffect, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

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
    <PinterestCardWrapper pinLabel="Pin Profiles">
      <div className="w-full space-y-4" data-cursor="Profiles">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
              Coding Profiles & Platform Analytics
            </h3>
            <p className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono transition-colors">
              Live algorithmic and software engineering metrics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* GitHub Tile */}
          <div className="p-5 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] flex flex-col justify-between h-full transition-colors shadow-sm hover:border-[#C86D51] dark:hover:border-[#E07A5F]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <FiGithub size={20} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  <span className="font-mono text-sm font-bold text-[#1A1918] dark:text-[#FAF9F7]">GitHub</span>
                </div>
                <a
                  href="https://github.com/kshitijx07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5C5955] dark:text-[#A3A098] hover:text-[#C86D51] dark:hover:text-[#E07A5F] font-mono transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>@kshitijx07</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="space-y-3 mb-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5C5955] dark:text-[#A3A098] font-medium">Public Repositories:</span>
                  <span className="font-bold text-[#1A1918] dark:text-[#FAF9F7] text-sm">{githubData?.publicRepos || 38}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C5955] dark:text-[#A3A098] font-medium">Total Stargazers:</span>
                  <span className="font-bold text-[#C86D51] dark:text-[#E07A5F] flex items-center gap-1 text-sm">
                    <Star size={13} className="fill-[#C86D51] dark:fill-[#E07A5F]" />
                    {githubData?.totalStars ?? 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex justify-between items-center text-[11px] font-mono text-[#5C5955] dark:text-[#A3A098]">
              <span>Docker • TS • Java • Python</span>
              <span className="text-[10px] text-[#C86D51] dark:text-[#E07A5F] font-bold">LIVE API</span>
            </div>
          </div>

          {/* LeetCode Tile */}
          <div className="p-5 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] flex flex-col justify-between h-full transition-colors shadow-sm hover:border-[#FFA116]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#FFA116] text-black font-bold text-xs flex items-center justify-center">LC</span>
                  <span className="font-mono text-sm font-bold text-[#1A1918] dark:text-[#FAF9F7]">LeetCode</span>
                </div>
                <a
                  href="https://leetcode.com/u/kshitij72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5C5955] dark:text-[#A3A098] hover:text-[#FFA116] font-mono transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>@kshitij72</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="space-y-3 mb-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5C5955] dark:text-[#A3A098] font-medium">Total Solved:</span>
                  <span className="font-bold text-[#1A1918] dark:text-[#FAF9F7] text-sm">{leetcodeData?.totalSolved || 257}</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-[#5C5955] dark:text-[#A3A098] font-medium">
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
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex justify-between items-center text-[11px] font-mono text-[#5C5955] dark:text-[#A3A098]">
              <span>Global Rank #{leetcodeData?.ranking || 605333}</span>
              <span className="text-[10px] text-[#FFA116] font-bold">GRAPHQL</span>
            </div>
          </div>

          {/* Codeforces Tile */}
          <div className="p-5 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] flex flex-col justify-between h-full transition-colors shadow-sm hover:border-[#1F8ACB]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#1F8ACB] text-white font-bold text-xs flex items-center justify-center">CF</span>
                  <span className="font-mono text-sm font-bold text-[#1A1918] dark:text-[#FAF9F7]">Codeforces</span>
                </div>
                <a
                  href="https://codeforces.com/profile/kshitij___x07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5C5955] dark:text-[#A3A098] hover:text-[#1F8ACB] font-mono transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>@kshitij___x07</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="space-y-3 mb-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5C5955] dark:text-[#A3A098] font-medium">Rating:</span>
                  <span className="font-bold text-[#1F8ACB] text-sm">{codeforcesData?.rating || 1280}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C5955] dark:text-[#A3A098] font-medium">Max Rank:</span>
                  <span className="font-bold text-[#C86D51] dark:text-[#E07A5F] capitalize text-sm">{codeforcesData?.maxRank || "pupil"}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex justify-between items-center text-[11px] font-mono text-[#5C5955] dark:text-[#A3A098]">
              <span>Contests: {codeforcesData?.contestsCount || 14}</span>
              <span className="text-[10px] text-[#1F8ACB] font-bold">LIVE API</span>
            </div>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
