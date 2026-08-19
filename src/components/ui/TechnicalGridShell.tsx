"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TechnicalGridShell() {
  // Drifting pixel staircase steps
  const pixelSteps = [
    { top: "12%", left: "6%" },
    { top: "15%", left: "8%" },
    { top: "18%", left: "10%" },
    { top: "24%", left: "12%" },
    { top: "30%", left: "15%" },
    { top: "38%", left: "18%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 12-Column Vertical Guide Lines */}
      <div className="max-w-[1500px] h-full mx-auto px-4 md:px-8 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="border-r border-[var(--grid-line)] h-full relative"
          >
            {/* Crosshair marks on grid intervals */}
            {i % 3 === 0 && (
              <>
                <span className="absolute top-[20%] -right-[5px] text-[10px] font-mono text-[var(--grid-crosshair)] leading-none">
                  +
                </span>
                <span className="absolute top-[50%] -right-[5px] text-[10px] font-mono text-[var(--grid-crosshair)] leading-none">
                  +
                </span>
                <span className="absolute top-[80%] -right-[5px] text-[10px] font-mono text-[var(--grid-crosshair)] leading-none">
                  +
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Horizontal Structural Grid Lines */}
      <div className="absolute top-[20%] left-0 right-0 h-px bg-[var(--grid-line)]" />
      <div className="absolute top-[50%] left-0 right-0 h-px bg-[var(--grid-line)]" />
      <div className="absolute top-[80%] left-0 right-0 h-px bg-[var(--grid-line)]" />

      {/* Signature Drifting Pixel Staircase (From Reference Inspiration) */}
      <div className="hidden lg:block">
        {pixelSteps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{
              opacity: [0.35, 0.9, 0.35],
              scale: [0.95, 1.05, 0.95],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4 + idx * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.3,
            }}
            style={{ top: step.top, left: step.left }}
            className="absolute w-3.5 h-3.5 bg-[var(--accent-acid)] shadow-[0_0_12px_rgba(183,255,0,0.4)]"
          />
        ))}
      </div>
    </div>
  );
}
