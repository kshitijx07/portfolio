"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface PolarityCardProps {
  src?: string;
  alt?: string;
}

/**
 * Minimalist Interactive 3D Portrait Card.
 * Clean, modern presentation with smooth spring tilt physics and holographic glare.
 */
export default function PolarityCard({
  src = "/profile.webp",
  alt = "Kshitij Kumbhar",
}: PolarityCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse tilt spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
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
      className="relative flex items-center justify-center p-1"
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-72 h-[390px] sm:w-80 sm:h-[430px] rounded-2xl border border-white/15 bg-[#252324] p-2.5 overflow-hidden select-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] hover:border-[#ED3C3F]/60 transition-colors duration-500 cursor-pointer"
      >
        {/* ── Minimalist Portrait Image Container ──────────────── */}
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#161516] border border-white/10">
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            animate={{
              scale: hovered ? 1.04 : 1.0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Smooth Spider-Sense crimson & white holographic glare highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.85), rgba(237, 60, 63, 0.35) 45%, transparent 70%)`,
            }}
          />

          {/* Clean ambient corner vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>
      </motion.div>
    </div>
  );
}
