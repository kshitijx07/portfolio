"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface MilestoneDetail {
  id: string;
  badge: string;
  title: string;
  description: string;
  fullStory: string;
  date: string;
  category: string;
}

interface MilestoneStoryModalProps {
  milestone: MilestoneDetail | null;
  onClose: () => void;
}

export default function MilestoneStoryModal({ milestone, onClose }: MilestoneStoryModalProps) {
  if (!milestone) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/20 p-6 md:p-8 text-white shadow-2xl z-10 space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="hud-tag hud-tag-acid text-[10px] mb-2 inline-flex">
                {milestone.category}
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white uppercase">
                {milestone.title}
              </h3>
              <span className="font-mono text-xs text-white/60 block mt-1">
                TIMESTAMP // {milestone.date}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 border border-white/20 hover:border-[var(--accent-acid)] text-white hover:text-[var(--accent-acid)] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Full Verified Story */}
          <div className="p-4 bg-white/5 border border-white/10 space-y-2">
            <span className="font-mono text-xs text-[var(--accent-acid)] font-bold uppercase tracking-wider block">
              VERIFIED MILESTONE OVERVIEW
            </span>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              {milestone.fullStory}
            </p>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="hud-btn hud-tag-acid px-6 py-2 font-bold"
            >
              <span>Close Inspector</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
