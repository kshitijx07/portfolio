"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Activity, ShieldCheck, ArrowUpRight } from "lucide-react";

export interface SystemBootLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const BOOT_LOGS = [
  "INITIALIZING GRAPHICS ENGINE & HARDWARE MATRICES",
  "COMPILING OPTICAL FBO GLASS SHADERS",
  "HYDRATING SINGLE-SOURCE TELEMETRY BUS",
  "PRE-WARMING RETRO MATRIX DOT GRID",
  "SYNCHRONIZING REALTIME DOM UV COORDINATES",
  "BOOT SEQUENCE COMPLETE // SYSTEM DISPATCHED",
];

export default function SystemBootLoader({
  onComplete,
  minDuration = 1500,
}: SystemBootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Guarantee top scroll immediately
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
          setIsExiting(true);
          setTimeout(() => {
            setIsDone(true);
            if (typeof window !== "undefined") {
              document.body.style.overflow = "";
              window.scrollTo(0, 0);
            }
            if (onComplete) onComplete();
          }, 600); // Allow optical distortion shutter to sweep
        }, 200);
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
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-[#00104A] text-white select-none overflow-hidden"
        >
          {/* ── 1. Retro Grid Lines & Subtle Crosshairs matching Landing Page ── */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-0 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="relative border-[0.5px] border-white/20">
                <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-xs text-white/40 font-mono">
                  +
                </span>
              </div>
            ))}
          </div>

          {/* Ambient Royal Navy Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* ── 2. Top Header HUD matching Landing Page ────────────── */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 items-start font-mono uppercase tracking-wider text-xs">
            <div>
              <span className="font-bold text-white text-sm sm:text-base tracking-widest block">
                KSHITIJ.ENG
              </span>
              <div className="text-[#B4F342] text-xs font-bold mt-1">
                DEVOPS & CLOUD SYSTEMS
              </div>
            </div>

            <div className="hidden md:block text-zinc-300 text-xs leading-relaxed">
              THINKING IN SYSTEMS.
              <br />
              DESIGNING WITH SCALE.
            </div>

            <div className="hidden md:block text-zinc-300 text-xs leading-relaxed">
              BRIDGING HIGH-PERFORMANCE MICROSERVICES, CI/CD AUTOMATION, AND CLOUD INFRASTRUCTURE.
            </div>

            <div className="flex justify-end items-center gap-3">
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-xs text-[#4DEEEA] font-bold text-xs">
                {progress < 100 ? `INITIALIZING // ${progress}%` : "SYSTEM_READY"}
              </span>
            </div>
          </div>

          {/* ── 3. Center Glassmorphic One-Line Style Loading Capsule ── */}
          <div className="relative z-10 max-w-xl mx-auto w-full space-y-6 my-auto">
            {/* Tagline pill matching landing hero */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-[#4DEEEA]/30 text-[#4DEEEA] font-mono text-xs font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#B4F342] animate-pulse" />
              <span>DEVOPS ENGINEER & CLOUD INFRASTRUCTURE DEVELOPER</span>
            </div>

            {/* Title Mock Silhouette */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                I BRING <span className="text-[#B4F342]">CRAFT</span> &{" "}
                <span className="text-[#4DEEEA]">TASTE</span>
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white/40 leading-none">
                TO DIGITAL WORK
              </h2>
            </div>

            {/* High-Tech Glassmorphic Line Loading Box */}
            <div className="relative rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-4">
              {/* Top Row: Progress & Status */}
              <div className="flex items-center justify-between font-mono text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#4DEEEA]" />
                  <span className="font-bold text-zinc-200">BOOT SEQUENCE</span>
                </div>
                <div className="font-black text-[#B4F342] text-sm tracking-widest">
                  {progress.toString().padStart(3, "0")}%
                </div>
              </div>

              {/* Glowing High-Precision Progress Line */}
              <div className="relative h-[4px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4DEEEA] via-[#B4F342] to-[#4DEEEA] rounded-full shadow-[0_0_15px_rgba(180,243,66,0.9)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Terminal Log Ticker */}
              <div className="flex items-center justify-between font-mono text-xs text-white/60">
                <div className="truncate text-xs text-zinc-300 font-medium pr-2">
                  {BOOT_LOGS[logIndex]}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#B4F342] font-bold shrink-0">
                  <Activity size={12} className="animate-spin" />
                  <span>{progress < 100 ? "SYNCING" : "READY"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Bottom Telemetry Bar ────────────────────────────── */}
          <div className="relative z-10 flex justify-between items-center border-t border-white/15 pt-4 font-mono text-xs text-white/70">
            <div>UTC+5:30 // IST 17:40</div>
            <div className="font-bold text-[#4DEEEA] tracking-widest hidden sm:inline">
              SECURE TLS 1.3 // 256-BIT
            </div>
            <div className="flex items-center gap-2 text-[#B4F342] font-bold">
              <ShieldCheck size={14} />
              <span>SYSTEM ARMED</span>
            </div>
          </div>

          {/* ── 5. Optical Distortion & Shutter Curtain Reveal Animation on Complete ── */}
          {isExiting && (
            <>
              {/* Top Shutter Curtain wiping up */}
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
                style={{ originY: 0 }}
                className="absolute inset-0 bg-[#00104A] z-40 border-b-2 border-[#4DEEEA]"
              />

              {/* Laser Scanline Flash Distortion Bar */}
              <motion.div
                initial={{ y: "-100%", opacity: 1 }}
                animate={{ y: "200%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B4F342] to-transparent z-50 shadow-[0_0_25px_#B4F342]"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
