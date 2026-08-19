"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface PolarityCardProps {
  src?: string;
  name?: string;
}

export default function PolarityCard({
  src = "/profile.png",
  name = "Kshitij",
}: PolarityCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.35 });

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-80 sm:w-72 sm:h-90 overflow-hidden border border-white/10 rounded-sm bg-black group select-none shadow-2xl"
    >
      {/* Film Developing Negative-to-Positive Polarity Transition */}
      <motion.img
        src={src}
        alt={name}
        className="w-full h-full object-cover grayscale contrast-115"
        initial={{ filter: "invert(1) brightness(0.75)" }}
        animate={{
          filter: isInView
            ? "invert(0) brightness(1)"
            : "invert(1) brightness(0.75)",
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Decorative Handwritten Overlay Signature matching screenshot */}
      <div className="absolute top-4 left-4 font-serif italic text-2xl text-[#B4F342] pointer-events-none drop-shadow-md select-none tracking-wide">
        {name}
      </div>

      {/* Telemetry Tag matching screenshot */}
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-white/80 uppercase tracking-widest bg-black/40 px-1.5 py-0.5 rounded-xs backdrop-blur-xs">
        PRN // 202301040119
      </div>
    </div>
  );
}
