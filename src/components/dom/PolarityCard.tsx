"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface PolarityCardProps {
  src: string;
  name: string;
}

export default function PolarityCard({ src, name }: PolarityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <div ref={ref} className="relative w-64 h-80 overflow-hidden border border-white/10 rounded-sm bg-black group">
      {/* Film developing polarity filter */}
      <motion.img
        src={src}
        alt={name}
        className="w-full h-full object-cover grayscale contrast-125"
        initial={{ filter: "invert(1) brightness(0.8)" }}
        animate={{
          filter: isInView
            ? "invert(0) brightness(1)"
            : "invert(1) brightness(0.8)",
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Decorative Handwritten Overlay Signature */}
      <div className="absolute top-4 left-4 font-serif italic text-2xl text-[#B4F342] pointer-events-none drop-shadow-md select-none">
        {name}
      </div>

      {/* Telemetry Tag */}
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-white/70 uppercase">
        PRN // 202301040119
      </div>
    </div>
  );
}
