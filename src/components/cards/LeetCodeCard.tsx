"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Flame, Trophy, CheckCircle2 } from "lucide-react";

export default function LeetCodeCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const total = data?.totalSolved || 240;
  const easy = data?.easySolved || 110;
  const medium = data?.mediumSolved || 105;
  const hard = data?.hardSolved || 25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFA116]/10 text-[#FFA116] border border-[#FFA116]/20 flex items-center justify-center font-bold text-xl">
            LC
          </div>
          <div>
            <h3 className="text-xl font-editorial font-bold text-[#1A1918]">
              LeetCode Statistics
            </h3>
            <a
              href="https://leetcode.com/u/kshitij72"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6E6C68] hover:text-[#C86D51] font-mono transition-colors"
            >
              @kshitij72
            </a>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-medium">
          <Flame size={14} className="fill-[#C86D51]" />
          <span>{loading ? "..." : `${data?.currentStreak || 18} Day Streak`}</span>
        </div>
      </div>

      {/* Hero Stats counter */}
      <div className="bg-[#F9F7F4] p-5 rounded-2xl border border-[#E8E3DA] mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-[#6E6C68] block mb-1">
            Total Problems Solved
          </span>
          <span className="text-3xl font-bold font-editorial text-[#1A1918]">
            {loading ? "..." : total}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-[#6E6C68] block mb-1">
            Global Rank
          </span>
          <span className="text-sm font-bold font-mono text-[#2D4030]">
            #{loading ? "..." : (data?.ranking || 142050).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Solved Difficulty Bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1 text-[#1A1918]">
            <span className="text-[#00B8A3] font-semibold">Easy</span>
            <span>{loading ? "..." : easy}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#EFECE6] overflow-hidden">
            <div
              className="h-full bg-[#00B8A3] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (easy / (total || 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1 text-[#1A1918]">
            <span className="text-[#FFC01E] font-semibold">Medium</span>
            <span>{loading ? "..." : medium}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#EFECE6] overflow-hidden">
            <div
              className="h-full bg-[#FFC01E] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (medium / (total || 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1 text-[#1A1918]">
            <span className="text-[#FF375F] font-semibold">Hard</span>
            <span>{loading ? "..." : hard}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#EFECE6] overflow-hidden">
            <div
              className="h-full bg-[#FF375F] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (hard / (total || 1)) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between text-xs text-[#6E6C68] font-mono pt-3 border-t border-[#E8E3DA]">
        <span>Acceptance Rate: {loading ? "..." : `${data?.acceptanceRate || 68.4}%`}</span>
        <span className="text-[#C86D51] font-semibold">Active Solver</span>
      </div>
    </motion.div>
  );
}
