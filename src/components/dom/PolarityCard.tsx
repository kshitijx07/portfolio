"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

export interface PolarityCardProps {
  src?: string;
  name?: string;
  prn?: string;
  role?: string;
}

export default function PolarityCard({
  src = "/profile.png",
  name = "Kshitij",
  prn = "202301040119",
  role = "DEVOPS & CLOUD ARCHITECT",
}: PolarityCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.35 });

  const [hovered, setHovered] = useState(false);
  const [polarityMode, setPolarityMode] = useState<"positive" | "negative">("positive");

  // Mouse tilt spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative flex items-center justify-center p-2"
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setPolarityMode((m) => (m === "positive" ? "negative" : "positive"))}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-72 h-[390px] sm:w-84 sm:h-[430px] rounded-sm border border-white/25 bg-black/95 p-3.5 overflow-hidden select-none shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-[#B4F342] cursor-pointer"
      >
        {/* ── 1. Film Polarized Portrait Image ────────────────────── */}
        <div className="relative w-full h-full overflow-hidden rounded-xs bg-[#050505] border border-white/15">
          <motion.img
            src={src}
            alt={name}
            className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700"
            initial={{ filter: "invert(1) brightness(0.7) contrast(1.4)" }}
            animate={{
              filter:
                isInView && polarityMode === "positive"
                  ? hovered
                    ? "invert(0) brightness(1.05) contrast(1.3) hue-rotate(5deg)"
                    : "invert(0) brightness(1.0) contrast(1.2)"
                  : "invert(1) brightness(0.7) contrast(1.4)",
              scale: hovered ? 1.04 : 1.0,
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Holographic foil glare reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-45 transition-opacity duration-300 mix-blend-color-dodge"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(180, 243, 66, 0.6), rgba(77, 238, 234, 0.3) 40%, transparent 80%)`,
            }}
          />

          {/* CRT scanline texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
            style={{
              backgroundImage:
                "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.6) 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* Retro Film Grain Noise Tint */}
          <div className="absolute inset-0 pointer-events-none opacity-15 bg-repeat mix-blend-screen bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        {/* ── 2. Floating 3D HUD Viewfinder Crosshairs ────────────── */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="absolute inset-5 pointer-events-none flex flex-col justify-between"
        >
          {/* Top Row: Camera Telemetry & Status Badge */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#4DEEEA] bg-black/80 px-2.5 py-1 rounded-xs border border-white/20 backdrop-blur-md shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#B4F342] animate-ping" />
                <span className="font-bold">REC // LIVE</span>
              </div>
              <div className="text-xs font-mono text-white/70 pl-0.5 font-medium">
                ISO 400 // +0.7EV
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 font-mono text-xs text-white/90 bg-black/80 px-2.5 py-1 rounded-xs border border-white/20 backdrop-blur-md shadow-md">
              <span className="text-[#B4F342] font-black uppercase tracking-wider">
                {polarityMode.toUpperCase()}
              </span>
              <span className="text-xs text-white/50 font-semibold">CLICK TO FLIP</span>
            </div>
          </div>

          {/* Center Dynamic Crosshair Focus Reticle */}
          <div className="self-center flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
            <div className="relative w-12 h-12 border border-[#B4F342] rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-2.5 h-2.5 bg-[#4DEEEA] rounded-full" />
              <span className="absolute -top-1 w-2.5 h-[1.5px] bg-[#B4F342]" />
              <span className="absolute -bottom-1 w-2.5 h-[1.5px] bg-[#B4F342]" />
              <span className="absolute -left-1 h-2.5 w-[1.5px] bg-[#B4F342]" />
              <span className="absolute -right-1 h-2.5 w-[1.5px] bg-[#B4F342]" />
            </div>
          </div>

          {/* Bottom Row: PRN Telemetry & Role Badge */}
          <div className="space-y-2">
            <div className="flex justify-between items-end gap-2">
              <div className="font-mono text-xs text-white font-bold tracking-widest bg-black/85 px-2.5 py-1.5 rounded-xs border border-white/20 backdrop-blur-md shadow-xl">
                <span className="text-[#4DEEEA]">PRN // </span>
                <span>{prn}</span>
              </div>

              <div className="font-mono text-xs text-[#B4F342] font-bold bg-black/85 px-2 py-1 rounded-xs border border-[#B4F342]/50 backdrop-blur-md">
                VERIFIED ID
              </div>
            </div>

            <div className="font-mono text-xs text-white/80 bg-black/80 px-2.5 py-1 rounded-xs border border-white/15 backdrop-blur-md truncate font-semibold">
              ROLE // {role}
            </div>
          </div>
        </div>

        {/* ── 3. Handwritten Overlay Signature with Neon Glow ────── */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="absolute top-9 left-7 font-serif italic text-4xl text-[#B4F342] pointer-events-none drop-shadow-[0_0_15px_rgba(180,243,66,0.8)] select-none tracking-wide transition-transform duration-300 group-hover:scale-105"
        >
          {name}
        </div>

        {/* ── 4. Corner Crop Marks ────────────────────────────────── */}
        <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#B4F342] pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#B4F342] pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#B4F342] pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#B4F342] pointer-events-none" />
      </motion.div>
    </div>
  );
}
