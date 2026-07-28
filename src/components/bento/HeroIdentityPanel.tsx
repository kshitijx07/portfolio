"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Sparkles, MapPin, Clock, ArrowUpRight } from "lucide-react";
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
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PinterestCardWrapper stampText="PUNE // 2026" pinLabel="Hero Pin">
      <div className="w-full p-2 md:p-4" data-cursor="Identity">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
          {/* Left: Portrait & Identity info */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative group/avatar">
              <img
                src="https://github.com/kshitijx07.png"
                alt="Kshitij Kumbhar"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-[#EFECE6] dark:border-[#2E2C29] shadow-md group-hover/avatar:rotate-2 transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C86D51] dark:bg-[#E07A5F] text-white rounded-full flex items-center justify-center border-2 border-white dark:border-[#1C1B19] shadow-sm" title="Verified Architect">
                <CheckCircle2 size={13} />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-3xl md:text-5xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
                  Kshitij Kumbhar
                </h1>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E4DF] dark:bg-[#38241E] text-[#C86D51] dark:text-[#E07A5F] text-xs font-mono font-semibold transition-colors">
                  <Sparkles size={12} className="animate-pulse" />
                  <span>Open to Internships & Jobs</span>
                </div>
              </div>

              <p className="text-sm md:text-base font-mono text-[#6E6C68] dark:text-[#A3A098] transition-colors">
                DevOps Engineer & Cloud Systems Architect
              </p>
            </div>
          </div>

          {/* Right: Meta Strip & Social Actions */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
            <div className="space-y-1 font-mono text-xs text-[#6E6C68] dark:text-[#A3A098]">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#C86D51] dark:text-[#E07A5F]" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#2D4030] dark:text-[#4E6E52]" />
                <span>{time ? `${time} IST (GMT+5:30)` : "Pune Local Time"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white dark:hover:text-white flex items-center justify-center transition-colors text-[#1A1918] dark:text-[#FAF9F7]"
                title="GitHub Profile"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/kshitij-kumbhar-369777x/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white dark:hover:text-white flex items-center justify-center transition-colors text-[#1A1918] dark:text-[#FAF9F7]"
                title="LinkedIn Profile"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1A1918] dark:bg-[#FAF9F7] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] text-white dark:text-[#1A1918] dark:hover:text-white text-xs font-mono font-medium transition-colors shadow-sm"
              >
                <span>CV PDF</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
