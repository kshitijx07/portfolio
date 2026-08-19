"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, Sparkles, Activity } from "lucide-react";

export interface SystemBootLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const BOOT_LOGS = [
  "SYSTEM_INIT // ARCHITECTURE_V2.6",
  "COMPILING_GLSL_SHADERS // THREE.JS",
  "HYDRATING_TELEMETRY_BUS // BUS.TS",
  "PRE-WARMING_OPTICAL_GLASS_FBO",
  "CALIBRATING_VIEWPORT_MATRICES",
  "SYSTEM_ONLINE // DISPATCHING_UI",
];

export default function SystemBootLoader({
  onComplete,
  minDuration = 1600,
}: SystemBootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Force viewport to top immediately on boot
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    }

    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(pct);

      const nextLog = Math.min(
        BOOT_LOGS.length - 1,
        Math.floor((pct / 100) * BOOT_LOGS.length)
      );
      setLogIndex(nextLog);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (typeof window !== "undefined") {
            document.body.style.overflow = "";
            window.scrollTo(0, 0);
          }
          if (onComplete) onComplete();
        }, 350);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="system-boot-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            y: -16,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00081C]/95 backdrop-blur-md text-white select-none px-6"
        >
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

          {/* ── Glassmorphic Minimalist Rounded Capsule Badge ─────────────── */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-3xl bg-black/60 sm:bg-white/[0.04] backdrop-blur-2xl border border-white/20 sm:border-white/25 p-6 sm:p-7 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.25)] space-y-5 overflow-hidden"
          >
            {/* Frosted Glass Top Corner Glare Accent */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#4DEEEA]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#B4F342]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar Header */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B4F342] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B4F342]" />
                </span>
                <span className="font-bold text-white tracking-widest uppercase text-xs sm:text-sm">
                  KSHITIJ.ENG
                </span>
                <span className="text-white/40 text-xs hidden sm:inline">// BOOT</span>
              </div>

              {/* Progress Percentage Badge */}
              <div className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 font-bold text-[#4DEEEA] text-xs tracking-wider shadow-inner">
                {progress.toString().padStart(3, "0")}%
              </div>
            </div>

            {/* Ultra-Sleek Glassmorphic Progress Line Track */}
            <div className="relative z-10 h-[4px] w-full bg-black/50 border border-white/10 rounded-full overflow-hidden p-[0.5px]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4DEEEA] via-[#B4F342] to-[#4DEEEA] rounded-full shadow-[0_0_12px_rgba(180,243,66,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Bottom Real-time Telemetry & Log Output */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/70 pt-1">
              <div className="flex items-center gap-2 truncate">
                <Terminal size={14} className="text-[#4DEEEA] shrink-0" />
                <span className="truncate text-xs text-zinc-300 font-medium">
                  {BOOT_LOGS[logIndex]}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#B4F342] font-semibold shrink-0 ml-2">
                <Activity size={12} className="animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
