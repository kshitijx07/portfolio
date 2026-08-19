"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, MapPin, Clock, ArrowUpRight, ShieldCheck, Terminal } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

export default function HeroIdentityPanel() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PinterestCardWrapper stampText="SYS_CORE // 2026.08">
      <div className="w-full" data-cursor="Identity">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Avatar with Ethereal Glowing Ring & Identity info */}
          <div className="flex items-center gap-5 md:gap-7">
            {/* Glowing Avatar Container */}
            <div className="relative group/avatar shrink-0">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#C86D51] via-[#00D2FF] to-[#9D7BFF] opacity-50 blur-sm group-hover/avatar:opacity-90 transition-opacity duration-500 animate-pulse" />
              
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/80 dark:border-white/20 shadow-xl bg-white/40 dark:bg-black/40 backdrop-blur-md">
                <img
                  src="https://github.com/kshitijx07.png"
                  alt="Kshitij Kumbhar"
                  className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500"
                />
              </div>

              <span
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C86D51] dark:bg-[#E07A5F] text-white rounded-full flex items-center justify-center border-2 border-white dark:border-[#1C1B19] shadow-md z-10"
                title="Verified Cloud Architect"
              >
                <ShieldCheck size={13} />
              </span>
            </div>

            {/* Typography & Role */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h1 className="text-3xl md:text-5xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] tracking-tight">
                  Kshitij Kumbhar
                </h1>
                
                {/* Y2K Cybernetic Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C86D51]/15 via-[#00D2FF]/15 to-[#9D7BFF]/15 border border-[#C86D51]/30 dark:border-[#E07A5F]/30 text-[#C86D51] dark:text-[#E07A5F] text-xs font-mono font-bold shadow-sm">
                  <span className="text-[10px]">✦</span>
                  <span>Open to Internships & Roles</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm md:text-base font-mono text-[#5C5955] dark:text-[#A3A098]">
                <Terminal size={15} className="text-[#C86D51] dark:text-[#E07A5F]" />
                <span className="font-semibold">DevOps Engineer & Cloud Systems Architect</span>
              </div>
            </div>
          </div>

          {/* Right: Y2K Cyber Coordinates & Glassmorphic Action Center */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E3DA] dark:border-[#2E2C29]">
            {/* Coordinates & Local Clock */}
            <div className="space-y-1.5 font-mono text-xs text-[#5C5955] dark:text-[#A3A098]">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#C86D51] dark:text-[#E07A5F]" />
                <span>18.5204° N, 73.8567° E // Pune, IN</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#00D2FF] dark:text-[#00E676]" />
                <span className="tabular-nums font-medium">{time ? `${time} IST (GMT+5:30)` : "Pune Local Time"}</span>
              </div>
            </div>

            {/* Glassmorphic Action Buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/60 dark:bg-white/5 hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white dark:hover:text-white border border-white/80 dark:border-white/10 flex items-center justify-center transition-all duration-300 text-[#1A1918] dark:text-[#FAF9F7] shadow-sm hover:scale-105 active:scale-95"
                title="GitHub Profile"
              >
                <FiGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/kshitij-kumbhar-369777x/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/60 dark:bg-white/5 hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] hover:text-white dark:hover:text-white border border-white/80 dark:border-white/10 flex items-center justify-center transition-all duration-300 text-[#1A1918] dark:text-[#FAF9F7] shadow-sm hover:scale-105 active:scale-95"
                title="LinkedIn Profile"
              >
                <FiLinkedin size={18} />
              </a>

              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1A1918] dark:bg-[#FAF9F7] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] text-white dark:text-[#1A1918] dark:hover:text-white text-xs font-mono font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span>RESUME PDF</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}

