"use client";

import React, { useEffect, useState } from "react";
import { Star, ExternalLink, Activity } from "lucide-react";
import { FiGithub } from "react-icons/fi";

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
    <section className="py-16 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 space-y-6" data-cursor="Profiles">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[var(--accent-acid)]" />
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                Coding Profiles & Telemetry Feeds
              </h3>
              <span className="hud-tag hud-tag-acid text-[9px]">
                <Activity size={11} className="animate-pulse" />
                <span>Live Streams</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Live algorithmic and software engineering telemetry synchronized via REST & GraphQL
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* GitHub Tile */}
          <div className="p-5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] flex flex-col justify-between h-full transition-colors group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)]">
                    <FiGithub size={17} />
                  </div>
                  <span className="font-mono text-sm font-bold text-[var(--text-primary)]">GitHub</span>
                </div>
                <a
                  href="https://github.com/kshitijx07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-acid)] font-mono transition-colors flex items-center gap-1 font-bold"
                >
                  <span>@kshitijx07</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              <div className="space-y-3 mb-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Public Repos:</span>
                  <span className="font-bold text-[var(--text-primary)] text-sm">{githubData?.publicRepos || 38}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Total Stars:</span>
                  <span className="font-bold text-[var(--accent-acid)] flex items-center gap-1 text-sm">
                    <Star size={13} className="fill-[var(--accent-acid)]" />
                    {githubData?.totalStars ?? 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
              <span>Docker • TS • Java • Python</span>
              <span className="hud-tag text-[9px]">
                REST API
              </span>
            </div>
          </div>

          {/* LeetCode Tile */}
          <div className="p-5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] flex flex-col justify-between h-full transition-colors group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[var(--accent-acid)] text-[#050505] font-mono font-bold text-xs flex items-center justify-center">
                    LC
                  </div>
                  <span className="font-mono text-sm font-bold text-[var(--text-primary)]">LeetCode</span>
                </div>
                <a
                  href="https://leetcode.com/u/kshitij72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-acid)] font-mono transition-colors flex items-center gap-1 font-bold"
                >
                  <span>@kshitij72</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              <div className="space-y-3 mb-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Total Solved:</span>
                  <span className="font-bold text-[var(--text-primary)] text-sm">{leetcodeData?.totalSolved || 257}</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-[var(--text-muted)]">
                    <span>Easy: {leetcodeData?.easySolved || 104}</span>
                    <span>Med: {leetcodeData?.mediumSolved || 138}</span>
                    <span>Hard: {leetcodeData?.hardSolved || 15}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--border-color)] overflow-hidden flex">
                    <div className="bg-[var(--accent-acid)] h-full" style={{ width: "40%" }} />
                    <div className="bg-[var(--accent-blue)] h-full" style={{ width: "53%" }} />
                    <div className="bg-[#FF375F] h-full" style={{ width: "7%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
              <span>Rank #{leetcodeData?.ranking || 605333}</span>
              <span className="hud-tag text-[9px]">
                GRAPHQL
              </span>
            </div>
          </div>

          {/* Codeforces Tile */}
          <div className="p-5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] flex flex-col justify-between h-full transition-colors group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[var(--accent-blue)] text-white font-mono font-bold text-xs flex items-center justify-center">
                    CF
                  </div>
                  <span className="font-mono text-sm font-bold text-[var(--text-primary)]">Codeforces</span>
                </div>
                <a
                  href="https://codeforces.com/profile/kshitij___x07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-acid)] font-mono transition-colors flex items-center gap-1 font-bold"
                >
                  <span>@kshitij___x07</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              <div className="space-y-3 mb-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Rating:</span>
                  <span className="font-bold text-[var(--accent-acid)] text-sm">{codeforcesData?.rating || 1280}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Max Rank:</span>
                  <span className="font-bold text-[var(--text-primary)] capitalize text-sm">{codeforcesData?.maxRank || "pupil"}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
              <span>Contests: {codeforcesData?.contestsCount || 14}</span>
              <span className="hud-tag text-[9px]">
                LIVE API
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
