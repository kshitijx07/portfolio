"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, MousePointer2, Cpu } from "lucide-react";

export default function HeroFloatingArtifacts() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* 1. Glowing Pink Heart Sticker (Layered behind 3D ribbon loop) */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[34%] left-[44%] -translate-x-1/2 z-0 hidden sm:block"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FF2E7E] to-[#FF0055] rounded-2xl p-2.5 shadow-[0_0_30px_rgba(255,46,126,0.5)] flex items-center justify-center rotate-[-10deg] border-2 border-white/30">
          <Heart size={28} className="text-white fill-white animate-pulse" />
        </div>
      </motion.div>

      {/* 2. 3D Cyan Cursor Pointer Sticker (Bottom Right) */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          x: [-3, 5, -3],
          rotate: [-12, -4, -12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-[65%] right-[12%] md:right-[16%] z-20 hidden sm:block"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-[#00D2FF] to-[#203DFF] rounded-xl p-2 shadow-[0_0_20px_rgba(0,210,255,0.45)] border-2 border-white/40 flex items-center justify-center rotate-[-18deg]">
          <MousePointer2 size={22} className="text-white fill-white" />
        </div>
      </motion.div>

      {/* 3. Kubernetes Geometric Marker (Top Right) */}
      <motion.div
        animate={{
          y: [6, -6, 6],
          rotate: [4, -4, 4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="absolute top-[20%] right-[8%] md:right-[12%] z-20 hidden md:block"
      >
        <div className="px-2.5 py-1 bg-[#0D0D0D]/90 border border-[var(--accent-acid)] font-mono text-[9px] font-bold text-[var(--accent-acid)] shadow-[0_0_12px_rgba(183,255,0,0.25)] flex items-center gap-1.5 backdrop-blur-md">
          <Cpu size={11} />
          <span>EKS // K8S</span>
        </div>
      </motion.div>
    </div>
  );
}
