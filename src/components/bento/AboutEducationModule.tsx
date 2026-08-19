"use client";

import React from "react";
import { GraduationCap, Award, Sparkles } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

export default function AboutEducationModule() {
  return (
    <PinterestCardWrapper stampText="ACADEMICS // 2023-2027" rotateDeg={-0.5}>
      <div className="w-full flex flex-col justify-between h-full" data-cursor="About">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7]">
              Engineering Foundation
            </h3>
            <span className="y2k-pill text-[10px] text-[#00D2FF]">
              <Sparkles size={11} className="animate-pulse" />
              <span>CGPA 8.48</span>
            </span>
          </div>

          <p className="text-xs md:text-sm text-[#5C5955] dark:text-[#A3A098] leading-relaxed mb-6 font-sans">
            Computer Engineering scholar focusing on distributed cloud systems, Kubernetes orchestration, and high-concurrency microservices.
          </p>

          {/* Academic Timeline Rows */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 shadow-sm hover:border-[#C86D51] dark:hover:border-[#E07A5F] transition-all duration-300">
              <div className="flex items-center justify-between text-[#1A1918] dark:text-[#FAF9F7] font-bold mb-1.5">
                <span className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  MIT Academy of Engineering, Pune
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C86D51]/10 dark:bg-[#E07A5F]/20 text-[#C86D51] dark:text-[#E07A5F] text-[10px] font-bold">
                  2023 – 2027
                </span>
              </div>
              <span className="text-[#5C5955] dark:text-[#A3A098] block text-[11px]">
                B.Tech – Computer Engineering • CGPA: <strong className="text-[#1A1918] dark:text-[#FAF9F7]">8.48 / 10</strong>
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:border-[#00D2FF] transition-all duration-300">
              <div className="flex items-center justify-between text-[#1A1918] dark:text-[#FAF9F7] font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-[#00D2FF]" />
                  Yashwantrao Chavan Institute of Science
                </span>
                <span className="text-[#00D2FF] font-bold">84.17%</span>
              </div>
              <span className="text-[#5C5955] dark:text-[#A3A098] block text-[11px]">
                HSC – Maharashtra State Board (2023)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:border-[#00E676] transition-all duration-300">
              <div className="flex items-center justify-between text-[#1A1918] dark:text-[#FAF9F7] font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-[#00E676]" />
                  Maharaja Sayajirao Vidyalaya
                </span>
                <span className="text-[#00E676] font-bold">97.00%</span>
              </div>
              <span className="text-[#5C5955] dark:text-[#A3A098] block text-[11px]">
                SSC – Maharashtra State Board (2021)
              </span>
            </div>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}

