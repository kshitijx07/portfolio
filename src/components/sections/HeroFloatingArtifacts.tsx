"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, MousePointer2, Cloud, Terminal, Cpu, Box, Sparkles } from "lucide-react";

export default function HeroFloatingArtifacts() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* 1. Glowing Pink Heart Sticker (Layered behind 3D ribbon loop, Reference Screenshot) */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-6, 6, -6],
          scale: [0.98, 1.04, 0.98],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[32%] left-[42%] md:left-[44%] -translate-x-1/2 z-0 hidden sm:block"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FF2E7E] to-[#FF0055] rounded-3xl p-3 shadow-[0_0_35px_rgba(255,46,126,0.6)] flex items-center justify-center rotate-[-12deg] border-2 border-white/40">
          <Heart size={36} className="text-white fill-white animate-pulse" />
        </div>
      </motion.div>

      {/* 2. Retro Illustrated Engineer Character Sticker (Bottom Right, Reference Screenshot) */}
      <motion.div
        animate={{
          y: [6, -10, 6],
          rotate: [8, -4, 8],
        }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-[52%] right-[8%] md:right-[12%] z-20 hidden md:block"
      >
        <div className="p-3 bg-[#FAF9F6] border-2 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rotate-[12deg] text-[#050505] flex items-center gap-2">
          <div className="w-9 h-9 bg-[var(--accent-acid)] rounded-full border border-black flex items-center justify-center font-bold text-sm">
            KK
          </div>
          <div className="font-mono text-[10px] leading-tight font-bold">
            <span>DEVOPS</span>
            <span className="text-[#FF0055] block">2026</span>
          </div>
        </div>
      </motion.div>

      {/* 3. 3D Cyan Cursor Pointer Sticker (Reference Screenshot) */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [-4, 6, -4],
          rotate: [-14, -6, -14],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute top-[68%] right-[14%] md:right-[18%] z-20 hidden sm:block"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-[#00D2FF] to-[#203DFF] rounded-2xl p-2.5 shadow-[0_0_25px_rgba(0,210,255,0.5)] border-2 border-white/50 flex items-center justify-center rotate-[-20deg]">
          <MousePointer2 size={26} className="text-white fill-white" />
        </div>
      </motion.div>

      {/* 4. Kubernetes Geometric Badge (Top Right) */}
      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [6, -6, 6],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-[18%] right-[6%] md:right-[10%] z-20 hidden lg:block"
      >
        <div className="px-3 py-1.5 bg-[#0D0D0D]/90 border border-[var(--accent-acid)] font-mono text-[10px] font-bold text-[var(--accent-acid)] shadow-[0_0_15px_rgba(183,255,0,0.3)] flex items-center gap-1.5 backdrop-blur-md">
          <Cpu size={12} />
          <span>EKS // K8S</span>
        </div>
      </motion.div>

      {/* 5. Cloud Infrastructure Pixel Badge (Top Left) */}
      <motion.div
        animate={{
          y: [-6, 8, -6],
          rotate: [-8, 4, -8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-[48%] left-[4%] md:left-[8%] z-20 hidden md:block"
      >
        <div className="px-3 py-1.5 bg-[#0D0D0D]/90 border border-white/20 font-mono text-[10px] font-bold text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md">
          <Cloud size={12} className="text-[var(--accent-acid)]" />
          <span>AWS CLOUD</span>
        </div>
      </motion.div>
    </div>
  );
}
