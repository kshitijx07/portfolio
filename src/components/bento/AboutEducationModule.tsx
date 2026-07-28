"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

export default function AboutEducationModule() {
  return (
    <PinterestCardWrapper stampText="ACADEMICS" rotateDeg={-0.5}>
      <div className="w-full flex flex-col justify-between h-full" data-cursor="About">
        <div>
          <span className="bento-label">ABOUT & ACADEMICS // CHAPTER 01</span>
          
          <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-3 transition-colors">
            Engineering Background
          </h3>

          <p className="text-xs md:text-sm text-[#6E6C68] dark:text-[#A3A098] leading-relaxed mb-6 font-sans transition-colors">
            Computer Engineering student specializing in cloud infrastructure automation, Kubernetes orchestration, and high-concurrency microservices.
          </p>

          {/* Academic Timeline Rows */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm hover:border-[#C86D51] dark:hover:border-[#E07A5F] transition-colors">
              <div className="flex items-center justify-between text-[#1A1918] dark:text-[#FAF9F7] font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-[#C86D51] dark:text-[#E07A5F]" />
                  MIT Academy of Engineering, Pune
                </span>
                <span className="text-[#C86D51] dark:text-[#E07A5F]">2023 – 2027</span>
              </div>
              <span className="text-[#6E6C68] dark:text-[#A3A098] block">B.Tech – Computer Engineering • CGPA: 8.48 / 10</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] hover:border-[#2D4030] dark:hover:border-[#4E6E52] transition-colors">
              <div className="flex items-center justify-between text-[#1A1918] dark:text-[#FAF9F7] font-bold mb-0.5">
                <span>Yashwantrao Chavan Institute of Science</span>
                <span className="text-[#2D4030] dark:text-[#4E6E52]">84.17%</span>
              </div>
              <span className="text-[#6E6C68] dark:text-[#A3A098] block">HSC – Maharashtra State Board (2023)</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] hover:border-[#2D4030] dark:hover:border-[#4E6E52] transition-colors">
              <div className="flex items-center justify-between text-[#1A1918] dark:text-[#FAF9F7] font-bold mb-0.5">
                <span>Maharaja Sayajirao Vidyalaya</span>
                <span className="text-[#2D4030] dark:text-[#4E6E52]">97.00%</span>
              </div>
              <span className="text-[#6E6C68] dark:text-[#A3A098] block">SSC – Maharashtra State Board (2021)</span>
            </div>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
