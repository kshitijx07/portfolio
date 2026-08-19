"use client";

import { useEffect, useState } from "react";
import { subscribePointer } from "@/lib/bus";
import { Globe, ArrowUpRight } from "lucide-react";

export default function HeroHUD() {
  const [coords, setCoords] = useState("0124 X 0063 Y");
  const [timeStr, setTimeStr] = useState("IN 15:19 29°C");

  useEffect(() => {
    const unsub = subscribePointer((state) => {
      const x = Math.round(state.x * 1000).toString().padStart(4, "0");
      const y = Math.round((1.0 - state.y) * 1000).toString().padStart(4, "0");
      setCoords(`${x} X ${y} Y`);
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
      setTimeStr(`IN ${hrs}:${mins} 29°C`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10 font-mono text-[11px] uppercase tracking-wider text-white/80 select-none">
      {/* Top Bar HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <span className="font-bold text-white tracking-widest">KSHITIJ.ENG</span>
          <div className="text-white/50 text-[10px] mt-1">DevOps & Cloud Systems</div>
        </div>

        <div className="hidden md:block text-white/60">
          Thinking in systems.
          <br />
          Designing with scale.
        </div>

        <div className="hidden md:block text-white/70">
          Bridging high-performance microservices, CI/CD automation, and cloud infrastructure.
        </div>

        <div className="flex justify-end gap-5 pointer-events-auto">
          <a href="#work" className="hover:text-white transition-colors">WORK</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
          <span className="text-white/40">THEME[D]</span>
        </div>
      </div>

      {/* Retro Grid Crosshairs */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="relative border-[0.5px] border-white/5">
            <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white/20 font-light">+</span>
          </div>
        ))}
      </div>

      {/* Floating 3D Vector Cursor Decorative Icon */}
      <div className="absolute right-12 bottom-28 pointer-events-auto hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/80 shadow-lg shadow-blue-500/30 transform rotate-12 hover:scale-110 transition-transform cursor-pointer">
        <ArrowUpRight className="w-6 h-6 text-white" />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex justify-between items-end border-t border-white/10 pt-4">
        <div>GMT+5:30 {timeStr}</div>
        <div className="font-bold text-white tracking-widest">{coords}</div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-white/60 animate-spin" />
        </div>
      </div>
    </div>
  );
}
