"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, FolderGit2, ArrowUpRight } from "lucide-react";
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
    <PinterestCardWrapper stampText="PROJECT BOARD" pinLabel="Pin Project">
      <div className="w-full flex flex-col justify-between" data-cursor="Carousel">
        {/* Header with 01/03 Counter & Direct Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA]">
          <div>
            <span className="bento-label">RECENT WORKS // CHAPTER 02</span>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
              Featured Engineering Projects
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Project Quick Tabs */}
            <div className="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-full">
              {projects.map((p, idx) => (
                <button
                  key={p.title}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    currentIndex === idx
                      ? "bg-[#C86D51] text-white shadow-sm font-bold"
                      : "text-[#6E6C68] hover:text-[#1A1918]"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918] active:scale-90"
                title="Previous Project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918] active:scale-90"
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center cursor-pointer mb-6"
            onClick={() => onOpenCaseStudy(currentProject)}
          >
            {/* Image Banner */}
            <div className="lg:col-span-7 relative w-full h-60 md:h-80 rounded-2xl overflow-hidden border border-[#E8E3DA] bg-[#EFECE6] shadow-sm group/img">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover group-hover/img:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-medium shadow-sm">
                {currentProject.category}
              </div>
            </div>

            {/* Title & Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-mono text-[#6E6C68] uppercase block mb-1">
                  PROJECT 0{currentIndex + 1} OF 0{projects.length} • {currentProject.year}
                </span>
                <h3 className="text-3xl md:text-4xl font-editorial font-bold text-[#1A1918] hover:text-[#C86D51] transition-colors mb-3">
                  {currentProject.title}
                </h3>
                <p className="text-xs md:text-sm text-[#6E6C68] leading-relaxed mb-4">
                  {currentProject.description}
                </p>
              </div>

              {/* Tech Chips */}
              <div>
                <span className="text-[11px] font-mono text-[#6E6C68] block mb-2">KEY TECHNOLOGIES:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-[#F9F7F4] border border-[#E8E3DA] text-[11px] font-mono text-[#2B2A29]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project Thumbnail Bar for direct 1-click access to all 3 projects */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8E3DA]">
          {projects.map((p, idx) => (
            <div
              key={p.title}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                currentIndex === idx
                  ? "bg-[#FFFDF9] border-[#C86D51] shadow-sm"
                  : "bg-[#F9F7F4] border-[#E8E3DA] hover:border-[#C86D51]"
              }`}
            >
              <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover border border-[#E8E3DA]" />
              <div className="hidden sm:block">
                <span className="text-xs font-editorial font-bold text-[#1A1918] block line-clamp-1">{p.title}</span>
                <span className="text-[10px] font-mono text-[#6E6C68]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
