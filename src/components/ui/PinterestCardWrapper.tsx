"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Bookmark, Sparkles, Check } from "lucide-react";

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
  pinLabel = "Pinned",
  showTape = true,
  stampText,
  rotateDeg = 0,
}: PinterestCardWrapperProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group rounded-[2rem] bg-[#FFFDF9] border border-[#E8E3DA] p-6 shadow-[0_4px_20px_rgba(26,25,24,0.04)] hover:shadow-[0_16px_40px_rgba(200,109,81,0.12)] hover:border-[#C86D51] transition-all duration-300 ${className}`}
      style={{ transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined }}
    >
      {/* Semi-transparent Washi Tape Strip at Top Center */}
      {showTape && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#EFECE6]/90 backdrop-blur-sm border border-[#D8C4B6]/50 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.03)] -rotate-1 z-20 pointer-events-none" />
      )}

      {/* Red Pinterest Pin Badge at Top Right */}
      <button
        onClick={handlePin}
        className={`absolute top-4 right-4 z-30 px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all duration-300 opacity-90 group-hover:opacity-100 ${
          isPinned
            ? "bg-[#C86D51] text-white shadow-md scale-105"
            : "bg-[#F9F7F4] text-[#6E6C68] hover:bg-[#C86D51] hover:text-white border border-[#E8E3DA]"
        }`}
        title={isPinned ? "Unpin Card" : "Pin Card to Board"}
      >
        <Pin size={13} className={isPinned ? "fill-white rotate-45" : "-rotate-45"} />
        <span>{isPinned ? "Saved" : "Pin"}</span>
      </button>

      {/* Postmark Stamp Badge if provided */}
      {stampText && (
        <div className="absolute top-4 left-6 z-20 border-2 border-dashed border-[#C86D51]/70 text-[#C86D51] font-mono text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded -rotate-6 uppercase pointer-events-none">
          {stampText}
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 pt-2">{children}</div>

      {/* Pin Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1A1918] text-white text-[11px] font-mono px-4 py-2 rounded-full shadow-xl flex items-center gap-2"
          >
            <Check size={14} className="text-[#C86D51]" />
            <span>{isPinned ? "Pinned to your collection!" : "Unpinned"}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
