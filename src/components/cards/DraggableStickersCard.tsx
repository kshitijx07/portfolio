"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Move, Sparkles } from "lucide-react";

const stickers = [
  { name: "React.js", bg: "#EBF8FF", text: "#2B6CB0", border: "#BEE3F8" },
  { name: "Next.js 15", bg: "#F7FAFC", text: "#1A202C", border: "#E2E8F0" },
  { name: "AWS Cloud", bg: "#FFFAF0", text: "#DD6B20", border: "#FEEBC8" },
  { name: "Docker", bg: "#EBF8FF", text: "#3182CE", border: "#BEE3F8" },
  { name: "Kubernetes", bg: "#EBF8FF", text: "#2B6CB0", border: "#BEE3F8" },
  { name: "Jenkins CI/CD", bg: "#FFF5F5", text: "#E53E3E", border: "#FED7D7" },
  { name: "Node.js", bg: "#F0FFF4", text: "#2F855A", border: "#C6F6D5" },
  { name: "Spring Boot", bg: "#F0FFF4", text: "#276749", border: "#C6F6D5" },
  { name: "MongoDB", bg: "#F0FFF4", text: "#22543D", border: "#C6F6D5" },
  { name: "MySQL", bg: "#EBF8FF", text: "#2C5282", border: "#BEE3F8" },
  { name: "TypeScript", bg: "#EBF8FF", text: "#2B6CB0", border: "#BEE3F8" },
  { name: "Tailwind CSS", bg: "#E6FFFA", text: "#234E52", border: "#B2F5EA" },
  { name: "Framer Motion", bg: "#FAF5FF", text: "#6B46C1", border: "#E9D8FD" },
  { name: "Linux OS", bg: "#FFFFF0", text: "#D69E2E", border: "#FEFCBF" },
  { name: "Git & GitHub", bg: "#FFF5F5", text: "#C53030", border: "#FED7D7" }
];

export default function DraggableStickersCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 2 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 md:p-8 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-medium">
            Interactive Stickers
          </span>
          <h3 className="text-2xl font-editorial font-bold text-[#1A1918] mt-1">
            Technical Arsenals Board
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#6E6C68] font-mono bg-[#EFECE6] px-3 py-1.5 rounded-full">
          <Move size={14} />
          <span>Drag Notes</span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-[#6E6C68] mb-6 font-sans">
        Every skill card below behaves like a physical Pinterest note. Feel free to drag, toss, and arrange them around the canvas.
      </p>

      {/* Interactive Sticker Board Area */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[260px] bg-[#F9F7F4] rounded-2xl border border-[#E8E3DA] p-4 flex flex-wrap gap-2.5 items-center justify-center overflow-hidden"
      >
        {stickers.map((s, idx) => (
          <motion.div
            key={s.name}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.15, zIndex: 40, cursor: "grabbing" }}
            whileHover={{ scale: 1.05 }}
            initial={{ rotate: (idx % 5 - 2) * 2 }}
            className="cursor-grab select-none px-4 py-2 rounded-xl text-xs font-mono font-semibold shadow-sm transition-shadow hover:shadow-md border"
            style={{
              backgroundColor: s.bg,
              color: s.text,
              borderColor: s.border,
            }}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} />
              {s.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
