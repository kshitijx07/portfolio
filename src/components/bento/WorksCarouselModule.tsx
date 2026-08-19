"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { ProjectData } from "@/components/modals/CaseStudyModal";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

interface WorksCarouselModuleProps {
  projects: ProjectData[];
  onOpenCaseStudy: (project: ProjectData) => void;
}

export default function WorksCarouselModule({ projects, onOpenCaseStudy }: WorksCarouselModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <PinterestCardWrapper stampText="SHOWCASE // PRODUCTION">
      <div className="w-full flex flex-col justify-between" data-cursor="Carousel">
        {/* Header with 01/03 Counter & Direct Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA] dark:border-[#2E2C29]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7]">
                Featured Cloud Architecture Works
              </h3>
              <span className="y2k-pill text-[10px] text-[#C86D51] dark:text-[#E07A5F]">
                <Layers size={11} className="text-[#C86D51] dark:text-[#E07A5F]" />
                <span>0{currentIndex + 1} / 0{projects.length}</span>
              </span>
            </div>
            <p className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono">
              Click active showcase or thumbnails below to open full architecture case studies
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Project Quick Tabs */}
            <div className="flex items-center gap-1 bg-white/60 dark:bg-white/5 p-1 rounded-2xl border border-white/80 dark:border-white/10">
              {projects.map((p, idx) => (
                <button
                  key={p.title}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all font-bold ${
                    currentIndex === idx
                      ? "bg-[#C86D51] dark:bg-[#E07A5F] text-white shadow-sm"
                      : "text-[#5C5955] dark:text-[#A3A098] hover:text-[#1A1918] dark:hover:text-[#FAF9F7]"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-xl bg-white/60 dark:bg-white/5 hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white border border-white/80 dark:border-white/10 flex items-center justify-center transition-colors text-[#1A1918] dark:text-[#FAF9F7] active:scale-90 shadow-sm"
                title="Previous Project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-xl bg-white/60 dark:bg-white/5 hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] hover:text-white border border-white/80 dark:border-white/10 flex items-center justify-center transition-colors text-[#1A1918] dark:text-[#FAF9F7] active:scale-90 shadow-sm"
                title="Next Project"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Carousel Project Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center cursor-pointer mb-6 group/card"
            onClick={() => onOpenCaseStudy(currentProject)}
          >
            {/* Image Banner */}
            <div className="lg:col-span-7 relative w-full h-64 md:h-80 rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-white/40 dark:bg-black/40 shadow-xl group/img">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover group-hover/img:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/85 dark:bg-[#1C1B19]/85 backdrop-blur-md text-[#C86D51] dark:text-[#E07A5F] text-xs font-mono font-bold shadow-md border border-white/60 dark:border-white/10">
                {currentProject.category}
              </div>
            </div>

            {/* Title & Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-xs font-mono text-[#5C5955] dark:text-[#A3A098] uppercase block mb-1 font-bold">
                  PROJECT 0{currentIndex + 1} OF 0{projects.length} • {currentProject.year}
                </span>
                <h3 className="text-3xl md:text-4xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] group-hover/card:text-[#C86D51] dark:group-hover/card:text-[#E07A5F] transition-colors mb-3 flex items-center justify-between">
                  <span>{currentProject.title}</span>
                  <ArrowUpRight size={22} className="opacity-0 group-hover/card:opacity-100 transition-opacity text-[#C86D51] dark:text-[#E07A5F]" />
                </h3>
                <p className="text-xs md:text-sm text-[#5C5955] dark:text-[#A3A098] leading-relaxed mb-4">
                  {currentProject.description}
                </p>
              </div>

              {/* Tech Chips */}
              <div>
                <span className="text-[11px] font-mono text-[#5C5955] dark:text-[#A3A098] block mb-2 font-semibold">
                  KEY TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 text-[11px] font-mono text-[#1A1918] dark:text-[#FAF9F7] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project Thumbnail Bar */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8E3DA] dark:border-[#2E2C29]">
          {projects.map((p, idx) => (
            <div
              key={p.title}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-3 backdrop-blur-md ${
                currentIndex === idx
                  ? "bg-white/90 dark:bg-white/15 border-[#C86D51] dark:border-[#E07A5F] shadow-md scale-[1.02]"
                  : "bg-white/50 dark:bg-white/5 border-white/60 dark:border-white/10 hover:border-[#C86D51]/50"
              }`}
            >
              <img src={p.image} alt={p.title} className="w-11 h-11 rounded-xl object-cover border border-white/60 dark:border-white/10" />
              <div className="hidden sm:block">
                <span className="text-xs font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] block line-clamp-1">{p.title}</span>
                <span className="text-[10px] font-mono text-[#5C5955] dark:text-[#A3A098]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PinterestCardWrapper>
  );
}

