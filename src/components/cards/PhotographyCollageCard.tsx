"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Maximize2, X, Heart } from "lucide-react";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    caption: "Minimalist Workspace & Terminal",
    tag: "Workspace"
  },
  {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
    caption: "Morning Artisan Coffee & Notes",
    tag: "Lifestyle"
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    caption: "Cloud Architecture & Observability",
    tag: "Systems"
  },
  {
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop",
    caption: "Architecture & Systems Design Books",
    tag: "Reading"
  }
];

export default function PhotographyCollageCard() {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 md:p-8 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D8C4B6]/30 text-[#1A1918] border border-[#D8C4B6] flex items-center justify-center">
            <Camera size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
              Visual Moodboard & Life
            </h3>
            <p className="text-xs text-[#6E6C68] font-mono">
              Curated Postcard Collages
            </p>
          </div>
        </div>

        <span className="postmark-stamp text-[10px]">PINTEREST</span>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {photos.map((p, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedPhoto(p)}
            className="relative h-36 md:h-44 rounded-2xl overflow-hidden border border-[#E8E3DA] cursor-pointer group/photo"
          >
            <img
              src={p.url}
              alt={p.caption}
              className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
              <span className="text-[10px] font-mono uppercase bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm self-start">
                {p.tag}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-editorial line-clamp-1">{p.caption}</span>
                <Maximize2 size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full paper-texture rounded-3xl p-6 border border-[#E8E3DA] shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918]"
              >
                <X size={18} />
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-80 md:h-96 object-cover rounded-2xl mb-4 border border-[#E8E3DA]"
              />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#C86D51] uppercase block mb-1">
                    {selectedPhoto.tag}
                  </span>
                  <h4 className="text-lg font-editorial font-bold text-[#1A1918]">
                    {selectedPhoto.caption}
                  </h4>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#6E6C68] font-mono">
                  <Heart size={14} className="text-[#C86D51] fill-[#C86D51]" />
                  <span>Pinned</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
