"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SystemBootLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const BOOT_LOGS = [
  "INITIALIZING RUNTIME & MEMORY POOLS",
  "COMPILING OPTICAL TWO-PASS FBO SHADERS",
  "HYDRATING SINGLE-SOURCE TELEMETRY BUS",
  "PRE-WARMING 3D DOT-MATRIX PERSPECTIVE MESH",
  "SYNCHRONIZING REALTIME DOM UV COORDINATES",
  "CALIBRATING GPU MATRICES // SYSTEM READY",
];

// Particle Dust Canvas for the Out-Animation
function DustDissolveCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numParticles = 180;
    const particles = Array.from({ length: numParticles }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 450,
      y: canvas.height / 2 + (Math.random() - 0.5) * 180,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 5 - 1.5,
      size: Math.random() * 2.5 + 1,
      alpha: 1,
      color: Math.random() > 0.4 ? "#B4F342" : "#4DEEEA",
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.94;
        p.size *= 0.98;

        if (p.alpha > 0.01) {
          alive++;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (alive > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-50"
    />
  );
}

export default function SystemBootLoader({
  onComplete,
  minDuration = 8000,
}: SystemBootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Lock scroll at (0, 0) immediately
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
          }, 800); // Synchronous dust & blur dispersion timing
        }, 250);
      }
    }, 30);

    // Quick skip on click or Space / Enter key
    const handleSkip = (e?: KeyboardEvent | MouseEvent) => {
      if (e && "key" in e && e.key !== " " && e.key !== "Enter") return;
      clearInterval(interval);
      setProgress(100);
      setLogIndex(BOOT_LOGS.length - 1);
      setIsExiting(true);
      setTimeout(() => {
        setIsDone(true);
        if (typeof window !== "undefined") {
          document.body.style.overflow = "";
          window.scrollTo(0, 0);
        }
        if (onComplete) onComplete();
      }, 700);
    };

    window.addEventListener("keydown", handleSkip);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleSkip);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="system-boot-loader-clean"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(14px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00104A] text-white select-none px-6"
        >
          {/* Dust Dissolve Canvas */}
          <DustDissolveCanvas active={isExiting} />

          {/* ── Exact Matching Minimalist Glass Capsule Card ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              y: isExiting ? -20 : 0,
              scale: isExiting ? 1.04 : 1,
              filter: isExiting ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[540px] rounded-2xl bg-[#000820]/90 backdrop-blur-2xl border border-white/15 p-6 sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4 font-mono"
          >
            {/* Top Row: Terminal Header & Progress % */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-white font-bold tracking-wider">
                <span className="text-[#4DEEEA] font-extrabold">&gt;_</span>
                <span>BOOT SEQUENCE</span>
              </div>
              <div className="font-extrabold text-[#B4F342] text-sm sm:text-base tracking-widest">
                {progress.toString().padStart(3, "0")}%
              </div>
            </div>

            {/* Glowing High-Precision Progress Line */}
            <div className="relative h-[3.5px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4DEEEA] via-[#B4F342] to-[#4DEEEA] rounded-full shadow-[0_0_14px_rgba(180,243,66,0.95)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Bottom Row: Dynamic Telemetry & Status Indicator */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="truncate text-white/70 font-medium pr-3 text-[11px] sm:text-xs">
                {BOOT_LOGS[logIndex]}
              </div>
              <div className="flex items-center gap-1.5 font-bold text-[#B4F342] shrink-0 text-[11px] sm:text-xs">
                <span>⚡</span>
                <span>{progress < 100 ? "SYNCING" : "ONLINE"}</span>
              </div>
            </div>

            {/* Subtle Minimal Skip Hint */}
            <div className="pt-2 text-center text-[10px] text-white/30 tracking-widest uppercase">
              PRESS SPACE OR TAP TO SKIP
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
