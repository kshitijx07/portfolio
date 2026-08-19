"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Calendar, MapPin, Award, CheckCircle2, ExternalLink } from "lucide-react";

export interface EducationRecord {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  score: string;
  status: string;
  highlights: string[];
  credentialLink?: string;
}

interface EducationDetailModalProps {
  record: EducationRecord | null;
  onClose: () => void;
}

export default function EducationDetailModal({ record, onClose }: EducationDetailModalProps) {
  if (!record) return null;

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
                {record.status}
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white uppercase">
                {record.institution}
              </h3>
              <p className="text-sm text-white/80 font-sans mt-0.5">
                {record.degree}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 border border-white/20 hover:border-[var(--accent-acid)] text-white hover:text-[var(--accent-acid)] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Key Metadata Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-white/5 border border-white/10 space-y-1">
              <span className="text-white/50 text-[10px] block">DURATION</span>
              <span className="text-white font-bold">{record.duration}</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 space-y-1">
              <span className="text-white/50 text-[10px] block">SCORE / STANDING</span>
              <span className="text-[var(--accent-acid)] font-bold">{record.score}</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-white/50 text-[10px] block">LOCATION</span>
              <span className="text-white font-bold">{record.location}</span>
            </div>
          </div>

          {/* Highlights & Coursework */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[var(--accent-acid)] font-bold uppercase tracking-wider block">
              ACADEMIC HIGHLIGHTS & CORE CURRICULUM
            </span>
            <ul className="space-y-2">
              {record.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  <span className="text-[var(--accent-acid)] font-bold mt-0.5">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
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
