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
          
          <h3 className="text-2xl font-editorial font-bold text-[#1A1918] mb-3">
            Engineering Background
          </h3>

          <p className="text-xs md:text-sm text-[#6E6C68] leading-relaxed mb-6 font-sans">
            Computer Engineering student specializing in cloud infrastructure automation, Kubernetes orchestration, and high-concurrency microservices.
          </p>

          {/* Academic Timeline Rows */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-[#F9F7F4] border border-[#E8E3DA] shadow-sm hover:border-[#C86D51] transition-colors">
              <div className="flex items-center justify-between text-[#1A1918] font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-[#C86D51]" />
                  MIT Academy of Engineering, Pune
                </span>
                <span className="text-[#C86D51]">2023 – 2027</span>
              </div>
              <span className="text-[#6E6C68] block">B.Tech – Computer Engineering • CGPA: 8.48 / 10</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E3DA] hover:border-[#2D4030] transition-colors">
              <div className="flex items-center justify-between text-[#1A1918] font-bold mb-0.5">
                <span>Yashwantrao Chavan Institute of Science</span>
                <span className="text-[#2D4030]">84.17%</span>
              </div>
              <span className="text-[#6E6C68] block">HSC – Maharashtra State Board (2023)</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E3DA] hover:border-[#2D4030] transition-colors">
              <div className="flex items-center justify-between text-[#1A1918] font-bold mb-0.5">
                <span>Maharaja Sayajirao Vidyalaya</span>
                <span className="text-[#2D4030]">97.00%</span>
              </div>
              <span className="text-[#6E6C68] block">SSC – Maharashtra State Board (2021)</span>
            </div>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
