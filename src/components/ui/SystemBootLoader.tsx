"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, Sparkles } from "lucide-react";

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
        }, 300);
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
            y: -12,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00081C] text-white select-none px-6"
        >
          {/* Subtle Ambient Grid in Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Center One-Line Style Loading Terminal Badge */}
          <div className="relative w-full max-w-md space-y-4">
            {/* Top Bar Status */}
            <div className="flex items-center justify-between font-mono text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B4F342] animate-ping" />
                <span className="font-bold text-white tracking-widest uppercase">
                  KSHITIJ.ENG // BOOT
                </span>
              </div>
              <div className="font-bold text-[#4DEEEA] tracking-wider">
                {progress.toString().padStart(3, "0")}%
              </div>
            </div>

            {/* High-Tech Ultra-Sleek One-Line Loading Bar */}
            <div className="relative h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4DEEEA] via-[#B4F342] to-[#4DEEEA] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Bottom Real-time Telemetry & Log Output */}
            <div className="flex items-center justify-between font-mono text-xs text-white/50">
              <div className="flex items-center gap-1.5 truncate">
                <Terminal size={12} className="text-[#4DEEEA] shrink-0" />
                <span className="truncate text-[11px] text-zinc-300">
                  {BOOT_LOGS[logIndex]}
                </span>
              </div>
              <span className="text-[10px] text-[#B4F342] font-semibold shrink-0 ml-2">
                TLS_OK
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
