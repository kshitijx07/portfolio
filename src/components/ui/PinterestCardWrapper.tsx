"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface PinterestCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  pinLabel?: string;
  showTape?: boolean;
  stampText?: string;
  rotateDeg?: number;
}

export default function PinterestCardWrapper({
  children,
  className = "",
  showTape = false,
  stampText,
  rotateDeg = 0,
}: PinterestCardWrapperProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group rounded-[2rem] bg-white/70 dark:bg-[#181615]/70 backdrop-blur-xl border border-white/60 dark:border-white/10 p-6 md:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:border-[#C86D51]/50 dark:hover:border-[#E07A5F]/50 transition-all duration-300 overflow-hidden glass-specular-edge ${className}`}
      style={{ transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined }}
    >
      {/* Dynamic Cursor Spotlight Glow (Ethereal Design) */}
      {mousePosition && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--glass-glow), transparent 70%)`,
          }}
        />
      )}

      {/* Subtle Y2K Metadata Stamp */}
      {stampText && (
        <div className="absolute top-4 right-5 z-20 font-mono text-[9px] text-[#5C5955] dark:text-[#A3A098] opacity-60 tracking-wider flex items-center gap-1 uppercase pointer-events-none">
          <span className="text-[#C86D51] dark:text-[#E07A5F]">✦</span>
          <span>{stampText}</span>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

