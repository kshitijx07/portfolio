"use client";

import React from "react";
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
  showTape = true,
  rotateDeg = 0,
}: PinterestCardWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group rounded-[2rem] bg-[#FFFDF9] dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(200,109,81,0.12)] dark:hover:shadow-[0_16px_40px_rgba(224,122,95,0.2)] hover:border-[#C86D51] dark:hover:border-[#E07A5F] transition-all duration-300 ${className}`}
      style={{ transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined }}
    >
      {/* Semi-transparent Washi Tape Strip at Top Center */}
      {showTape && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#EFECE6]/90 dark:bg-[#2B2926]/90 backdrop-blur-sm border border-[#D8C4B6]/50 dark:border-[#3E3B37]/50 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.03)] -rotate-1 z-20 pointer-events-none transition-colors" />
      )}

      {/* Card Content */}
      <div className="relative z-10 pt-2">{children}</div>
    </motion.div>
  );
}
