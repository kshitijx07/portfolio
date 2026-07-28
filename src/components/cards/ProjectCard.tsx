"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { ProjectData } from "@/components/modals/CaseStudyModal";

interface ProjectCardProps {
  project: ProjectData;
  rotation?: number;
  onOpenCaseStudy: (project: ProjectData) => void;
}

export default function ProjectCard({ project, rotation = 1, onOpenCaseStudy }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="Read"
      className="relative w-full paper-texture rounded-3xl p-6 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group cursor-pointer flex flex-col justify-between"
      onClick={() => onOpenCaseStudy(project)}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#F2E4DF] text-[#C86D51] text-xs font-mono font-medium">
            {project.category}
          </span>
          <span className="text-xs font-mono text-[#6E6C68]">{project.year}</span>
        </div>

        {/* Thumbnail Image with Soft 1.04x Zoom */}
        <div className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden mb-5 border border-[#E8E3DA] bg-[#EFECE6]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-editorial font-bold text-[#1A1918] group-hover:text-[#C86D51] transition-colors mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-[#6E6C68] leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-md bg-[#F9F7F4] border border-[#E8E3DA] text-[11px] font-mono text-[#2B2A29]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-[#EFECE6] text-[11px] font-mono text-[#6E6C68]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer Read Case Study Button */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E8E3DA]">
        <span className="text-xs font-medium text-[#1A1918] group-hover:text-[#C86D51] transition-colors flex items-center gap-1.5">
          <FolderGit2 size={14} className="text-[#C86D51]" />
          Read Case Study
        </span>
        <div className="w-8 h-8 rounded-full bg-[#EFECE6] group-hover:bg-[#C86D51] group-hover:text-white flex items-center justify-center transition-colors text-[#1A1918]">
          <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}
