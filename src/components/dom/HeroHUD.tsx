"use client";

import React, { useEffect, useRef, useState } from "react";
import { subscribePointer } from "@/lib/bus";
import { Globe, ArrowUpRight } from "lucide-react";

export default function HeroHUD() {
  const coordsRef = useRef<HTMLDivElement>(null);
  const [timeStr, setTimeStr] = useState("IST 17:30 29°C");

  // Zero-react-rerender pointer telemetry
  useEffect(() => {
    const unsub = subscribePointer((state) => {
      if (coordsRef.current) {
        const x = Math.round(state.x * 1000).toString().padStart(4, "0");
        const y = Math.round((1.0 - state.y) * 1000).toString().padStart(4, "0");
        coordsRef.current.textContent = `${x} X ${y} Y`;
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, "0");
      const mins = now.getMinutes().toString().padStart(2, "0");
      setTimeStr(`IST ${hrs}:${mins} 29°C`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 md:p-12 font-mono text-xs sm:text-sm uppercase tracking-wider text-white/90 select-none">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center w-full">
        <div>
          <span className="font-bold text-white text-sm sm:text-base tracking-widest block">
            KSHITIJ.ENG
          </span>
          <div className="text-[#B4F342] text-xs font-medium mt-0.5">
            DevOps & Cloud Systems
          </div>
        </div>

        <div className="flex items-center gap-6 sm:gap-8 pointer-events-auto">
          <a
            href="#projects"
            className="text-white/70 hover:text-white font-bold hover:underline transition-colors text-xs sm:text-sm"
          >
            PROJECTS
          </a>
          <a
            href="#contact"
            className="text-white/70 hover:text-[#4DEEEA] font-bold hover:underline transition-colors text-xs sm:text-sm"
          >
            CONTACT
          </a>
        </div>
      </div>

      {/* Floating 3D Vector Cursor Decorative Icon */}
      <a
        href="#projects"
        className="absolute right-8 sm:right-12 bottom-24 sm:bottom-28 pointer-events-auto hidden md:flex items-center justify-center min-w-[50px] min-h-[50px] rounded-xl bg-blue-600/90 shadow-xl shadow-blue-500/40 transform rotate-12 hover:scale-110 hover:rotate-0 transition-transform cursor-pointer"
        title="Explore flagship projects"
      >
        <ArrowUpRight className="w-6 h-6 text-white" />
      </a>

      {/* Bottom Telemetry Bar */}
      <div className="flex justify-between items-center border-t border-white/10 pt-4 text-xs sm:text-sm font-medium">
        <div className="text-zinc-400">UTC+5:30 // {timeStr}</div>
        <div ref={coordsRef} className="font-bold text-[#4DEEEA] tracking-widest">
          0124 X 0063 Y
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#B4F342] text-xs font-bold hidden sm:inline">LIVE GRID</span>
          <Globe className="w-4 h-4 text-[#B4F342] animate-spin" />
        </div>
      </div>
    </div>
  );
}
