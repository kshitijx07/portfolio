"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import TiltCardWrapper from "@/components/ui/TiltCardWrapper";

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
    <TiltCardWrapper maxTilt={3}>
      <div className="bento-card bento-card-hover w-full p-6 md:p-8 paper-texture" data-cursor="Identity">
        <div className="bento-label">CHAPTER 01 // IDENTITY CONTROL PANEL</div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Portrait & Identity info */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <img
                src="https://github.com/kshitijx07.png"
                alt="Kshitij Kumbhar"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-[#EFECE6] shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#C86D51] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Verified Architect">
                <CheckCircle2 size={12} />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-3xl md:text-5xl font-editorial font-bold text-[#1A1918]">
                  Kshitij Kumbhar
                </h1>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-semibold">
                  <Sparkles size={12} className="animate-pulse" />
                  <span>Open to Internships & Jobs</span>
                </div>
              </div>

              <p className="text-sm md:text-base font-mono text-[#6E6C68]">
                DevOps Engineer & Cloud Systems Architect
              </p>
            </div>
          </div>

          {/* Right: Meta Strip & Social Actions */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E3DA]">
            <div className="space-y-1 font-mono text-xs text-[#6E6C68]">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#C86D51]" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#2D4030]" />
                <span>{time ? `${time} IST (GMT+5:30)` : "Pune Local Time"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/kshitijx07"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918]"
                title="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/kshitij-kumbhar-369777x/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918]"
                title="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="/Kshitij_Kumbhar_Resume.pdf"
                download="Kshitij_Kumbhar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1A1918] hover:bg-[#C86D51] text-white text-xs font-mono font-medium transition-colors shadow-sm"
              >
                <span>CV PDF</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </TiltCardWrapper>
  );
}
