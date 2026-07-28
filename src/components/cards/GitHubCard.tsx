"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, BookOpen, ExternalLink, Activity } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export default function GitHubCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1918] text-white flex items-center justify-center shadow-sm">
            <FiGithub size={22} />
          </div>
          <div>
            <h3 className="text-xl font-editorial font-bold text-[#1A1918]">
              GitHub Activity
            </h3>
            <a
              href="https://github.com/kshitijx07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6E6C68] hover:text-[#C86D51] font-mono transition-colors"
            >
              @kshitijx07
            </a>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDE6] text-[#2D4030] text-xs font-mono">
          <Activity size={12} className="animate-spin" />
          <span>Live Synced</span>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-3 gap-3 mb-6 bg-[#F9F7F4] p-4 rounded-2xl border border-[#E8E3DA]">
        <div className="text-center">
          <span className="text-xs font-mono text-[#6E6C68] block">Repositories</span>
          <span className="text-xl font-bold font-editorial text-[#1A1918]">
            {loading ? "..." : data?.publicRepos || 18}
          </span>
        </div>
        <div className="text-center border-x border-[#E8E3DA]">
          <span className="text-xs font-mono text-[#6E6C68] block">Stars Earned</span>
          <span className="text-xl font-bold font-editorial text-[#C86D51] flex items-center justify-center gap-1">
            <Star size={14} className="fill-[#C86D51]" />
            {loading ? "..." : data?.totalStars || 14}
          </span>
        </div>
        <div className="text-center">
          <span className="text-xs font-mono text-[#6E6C68] block">Followers</span>
          <span className="text-xl font-bold font-editorial text-[#1A1918]">
            {loading ? "..." : data?.followers || 24}
          </span>
        </div>
      </div>

      {/* Top Languages Tags */}
      <div className="mb-6">
        <span className="text-xs font-mono text-[#6E6C68] uppercase tracking-wider block mb-2">
          Top Stack Breakdown
        </span>
        <div className="flex flex-wrap gap-1.5">
          {(data?.topLanguages || ["Docker", "TypeScript", "Java", "Python", "Go"]).map((lang: string) => (
            <span
              key={lang}
              className="px-2.5 py-1 rounded-full bg-[#EFECE6] text-[#1A1918] text-xs font-mono"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Repos */}
      <div>
        <span className="text-xs font-mono text-[#6E6C68] uppercase tracking-wider block mb-3">
          Pinned & Recent Repositories
        </span>
        <div className="space-y-2.5">
          {(data?.recentRepos || [
            { name: "Hostelhub", url: "https://github.com/kshitijx07/Hostelhub", stars: 8, language: "TypeScript" },
            { name: "Grocito-Copy", url: "https://github.com/kshitijx07/Grocito-Copy", stars: 5, language: "Java" },
            { name: "serverless-ai-xray", url: "https://github.com/kshitijx07/serverless-ai-xray", stars: 4, language: "Python" }
          ]).map((repo: any) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-[#FFFDF9] border border-[#E8E3DA] hover:border-[#C86D51] transition-all group/repo"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-[#C86D51]" />
                <span className="text-xs font-mono font-medium text-[#1A1918] group-hover/repo:text-[#C86D51]">
                  {repo.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6E6C68] font-mono">
                <span>{repo.language}</span>
                <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
