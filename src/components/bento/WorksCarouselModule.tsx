"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, FolderGit2, ArrowUpRight } from "lucide-react";
import { ProjectData } from "@/components/modals/CaseStudyModal";
import TiltCardWrapper from "@/components/ui/TiltCardWrapper";

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
    <TiltCardWrapper maxTilt={2}>
      <div className="bento-card bento-card-hover w-full flex flex-col justify-between" data-cursor="Carousel">
        {/* Header with 01/03 Counter Pagination */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="bento-label">RECENT WORKS // CHAPTER 02</span>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#C86D51]">
              0{currentIndex + 1} / 0{projects.length}
            </span>
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

        {/* Swipeable Carousel Content Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="cursor-pointer"
            onClick={() => onOpenCaseStudy(currentProject)}
          >
            {/* Image Banner */}
            <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden mb-5 border border-[#E8E3DA] bg-[#EFECE6]">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-medium shadow-sm">
                {currentProject.category}
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl md:text-3xl font-editorial font-bold text-[#1A1918] hover:text-[#C86D51] transition-colors mb-2">
              {currentProject.title}
            </h3>

            <p className="text-xs md:text-sm text-[#6E6C68] leading-relaxed mb-4 line-clamp-2">
              {currentProject.description}
            </p>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {currentProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-[#F9F7F4] border border-[#E8E3DA] text-[11px] font-mono text-[#2B2A29]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E8E3DA]">
          <span
            onClick={() => onOpenCaseStudy(currentProject)}
            className="text-xs font-medium text-[#1A1918] hover:text-[#C86D51] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FolderGit2 size={14} className="text-[#C86D51]" />
            Read Case Study
          </span>
          <div
            onClick={() => onOpenCaseStudy(currentProject)}
            className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white flex items-center justify-center transition-colors text-[#1A1918] cursor-pointer"
          >
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </TiltCardWrapper>
  );
}
