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
      {/* Top Bar HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-start">
        <div>
          <span className="font-bold text-white text-sm sm:text-base tracking-widest block">
            KSHITIJ.ENG
          </span>
          <div className="text-[#B4F342] text-xs font-semibold mt-1">
            DevOps & Cloud Systems
          </div>
        </div>

        <div className="hidden md:block text-zinc-300 text-xs leading-relaxed">
          Thinking in systems.
          <br />
          Designing with scale.
        </div>

        <div className="hidden md:block text-zinc-300 text-xs leading-relaxed">
          Bridging high-performance microservices, CI/CD automation, and cloud infrastructure.
        </div>

        <div className="flex justify-end items-center gap-3 sm:gap-4 pointer-events-auto">
          <a
            href="#projects"
            className="min-h-[44px] px-3 flex items-center text-white/80 hover:text-white font-bold hover:underline transition-colors"
          >
            PROJECTS
          </a>
          <a
            href="#contact"
            className="min-h-[44px] px-3 flex items-center bg-white/10 hover:bg-[#B4F342] text-white hover:text-black border border-white/20 rounded-xs transition-colors"
          >
            CONTACT
          </a>
        </div>
      </div>

      {/* Retro Grid Crosshairs */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="relative border-[0.5px] border-white/5">
            <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-xs text-white/20 font-light">
              +
            </span>
          </div>
        ))}
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
      <div className="flex justify-between items-center border-t border-white/15 pt-4 text-xs sm:text-sm font-medium">
        <div className="text-zinc-300">UTC+5:30 // {timeStr}</div>
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
