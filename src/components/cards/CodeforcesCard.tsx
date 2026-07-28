"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Zap, TrendingUp, BarChart2 } from "lucide-react";

export default function CodeforcesCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/codeforces")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const rating = data?.rating || 1280;
  const maxRating = data?.maxRating || 1350;
  const rank = data?.rank || "pupil";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1F8ACB]/10 text-[#1F8ACB] border border-[#1F8ACB]/20 flex items-center justify-center font-bold text-xl">
            CF
          </div>
          <div>
            <h3 className="text-xl font-editorial font-bold text-[#1A1918]">
              Codeforces Competitive
            </h3>
            <a
              href="https://codeforces.com/profile/kshitij___x07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6E6C68] hover:text-[#C86D51] font-mono transition-colors"
            >
              @kshitij___x07
            </a>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#E5EDE6] text-[#2D4030] text-xs font-mono font-medium capitalize">
          {loading ? "..." : rank}
        </span>
      </div>

      {/* Ratings Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F9F7F4] p-4 rounded-2xl border border-[#E8E3DA] text-center">
          <span className="text-xs font-mono text-[#6E6C68] block mb-1">
            Current Rating
          </span>
          <span className="text-2xl font-bold font-editorial text-[#1F8ACB]">
            {loading ? "..." : rating}
          </span>
        </div>

        <div className="bg-[#F9F7F4] p-4 rounded-2xl border border-[#E8E3DA] text-center">
          <span className="text-xs font-mono text-[#6E6C68] block mb-1">
            Max Rating
          </span>
          <span className="text-2xl font-bold font-editorial text-[#C86D51] flex items-center justify-center gap-1">
            <TrendingUp size={16} />
            {loading ? "..." : maxRating}
          </span>
        </div>
      </div>

      {/* Contest Practice Details */}
      <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8E3DA] mb-4">
        <div className="flex items-center justify-between text-xs text-[#2B2A29] mb-2 font-mono">
          <span className="flex items-center gap-1.5">
            <BarChart2 size={14} className="text-[#C86D51]" />
            Contests Participated
          </span>
          <span className="font-bold">{loading ? "..." : data?.contestsCount || 14}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-[#2B2A29] font-mono">
          <span className="flex items-center gap-1.5">
            <Zap size={14} className="text-[#2D4030]" />
            Active CP Practice
          </span>
          <span className="text-[#2D4030] font-semibold">DSA & Algorithms</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#E8E3DA] text-right">
        <span className="text-[11px] font-mono text-[#6E6C68]">
          Targeting Div 2 & Div 3 Contests
        </span>
      </div>
    </motion.div>
  );
}
