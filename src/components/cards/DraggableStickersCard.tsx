"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Move, Sparkles, Heart } from "lucide-react";

const initialStickers = [
  { id: "1", name: "React.js", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" },
  { id: "2", name: "Next.js 15", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" },
  { id: "3", name: "AWS Cloud", bg: "#F2E4DF", text: "#C86D51", border: "#E8C8BE" },
  { id: "4", name: "Docker", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" },
  { id: "5", name: "Kubernetes", bg: "#E5EDE6", text: "#2D4030", border: "#C3D6C5" },
  { id: "6", name: "Jenkins CI/CD", bg: "#F2E4DF", text: "#C86D51", border: "#E8C8BE" },
  { id: "7", name: "Node.js", bg: "#E5EDE6", text: "#2D4030", border: "#C3D6C5" },
  { id: "8", name: "Spring Boot", bg: "#E5EDE6", text: "#2D4030", border: "#C3D6C5" },
  { id: "9", name: "MongoDB", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" },
  { id: "10", name: "MySQL", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" },
  { id: "11", name: "TypeScript", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" },
  { id: "12", name: "Tailwind CSS", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" },
  { id: "13", name: "Framer Motion", bg: "#F2E4DF", text: "#C86D51", border: "#E8C8BE" },
  { id: "14", name: "Linux OS", bg: "#E5EDE6", text: "#2D4030", border: "#C3D6C5" },
  { id: "15", name: "Git & GitHub", bg: "#FFFDF9", text: "#1A1918", border: "#E8E3DA" }
];

export default function DraggableStickersCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggedCount, setDraggedCount] = useState(0);

  const handleDragEnd = () => {
    setDraggedCount((prev) => prev + 1);
  };

  const isEasterEggRevealed = draggedCount >= 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 2 }}
      whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="Drag"
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
        Every skill card below behaves like a physical Pinterest note. Drag and move them around to discover what&apos;s underneath.
      </p>

      {/* Interactive Sticker Board Container */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[280px] bg-[#F9F7F4] rounded-2xl border border-[#E8E3DA] p-4 flex flex-wrap gap-2.5 items-center justify-center overflow-hidden"
      >
        {/* Hidden Easter Egg Note Card Underneath */}
        <div className="absolute inset-4 flex flex-col items-center justify-center text-center p-6 bg-[#FFFDF9] rounded-xl border border-dashed border-[#C86D51] z-0 shadow-inner">
          <Heart size={24} className="text-[#C86D51] fill-[#C86D51] mb-2 animate-bounce" />
          <h4 className="text-base font-editorial font-bold text-[#1A1918] mb-1">
            Nice! You found the hidden note 🎉
          </h4>
          <p className="text-xs text-[#6E6C68] max-w-sm italic">
            &ldquo;Fun fact: I architect production EKS clusters, build automated Jenkins pipelines, and love brewing artisan coffee.&rdquo;
          </p>
        </div>

        {/* Physics Draggable Stickers */}
        {initialStickers.map((s, idx) => (
          <motion.div
            key={s.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.15, zIndex: 40, cursor: "grabbing", boxShadow: "0 10px 25px rgba(200, 109, 81, 0.2)" }}
            whileHover={{ scale: 1.06 }}
            initial={{ rotate: (idx % 5 - 2) * 2.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-grab select-none px-4 py-2 rounded-xl text-xs font-mono font-semibold shadow-sm border transition-shadow z-10"
            style={{
              backgroundColor: s.bg,
              color: s.text,
              borderColor: s.border,
            }}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#C86D51]" />
              {s.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
