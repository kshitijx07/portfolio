"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, RotateCw, CheckCircle, GraduationCap } from "lucide-react";

export default function ResumePrintCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full paper-texture rounded-3xl p-6 md:p-8 border border-[#E8E3DA] shadow-paper shadow-paper-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center shadow-sm">
            <FileText size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
              Official Curriculum Vitae
            </h3>
            <p className="text-xs text-[#6E6C68] font-mono">
              Kshitij_Kumbhar_Resume.pdf
            </p>
          </div>
        </div>

        <button
          onClick={() => setFlipped(!flipped)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white text-xs font-mono text-[#1A1918] transition-colors"
          title="Flip Resume View"
        >
          <RotateCw size={12} />
          <span>{flipped ? "Overview" : "Education & Scores"}</span>
        </button>
      </div>

      {/* Printed Paper Resume Document Card Container */}
      <div className="bg-[#FFFDF9] border border-[#E8E3DA] p-6 rounded-2xl shadow-sm mb-6 relative overflow-hidden">
        {!flipped ? (
          <div>
            <div className="border-b border-[#E8E3DA] pb-4 mb-4">
              <h4 className="text-xl font-editorial font-bold text-[#1A1918]">
                Kshitij Kumbhar
              </h4>
              <p className="text-xs text-[#6E6C68] font-mono">
                Computer Engineering Student • Pune, India
              </p>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-[#2B2A29]">
              <p>
                <strong className="font-semibold text-[#1A1918]">Summary:</strong> Computer Engineering student with hands-on experience in CI/CD pipelines, Docker, Kubernetes, and AWS. Reduced deployment effort through Jenkins automation and containerized microservice architectures.
              </p>
              <p>
                <strong className="font-semibold text-[#1A1918]">Focus:</strong> Enterprise DevOps Workflows, AWS EKS, Infrastructure as Code, Cloud Native Systems.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#2D4030]">
              <GraduationCap size={18} />
              <h4 className="text-lg font-editorial font-bold text-[#1A1918]">
                Academic Qualifications
              </h4>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-[#2B2A29]">
              <div className="border-l-2 border-[#C86D51] pl-3 py-1">
                <span className="font-bold text-[#1A1918] block">MIT Academy of Engineering, Pune (2023 – 2027)</span>
                <span className="text-xs text-[#6E6C68] font-mono block">B.Tech – Computer Engineering • CGPA: 8.46 / 10</span>
              </div>
              <div className="border-l-2 border-[#2D4030] pl-3 py-1">
                <span className="font-bold text-[#1A1918] block">Yashwantrao Chavan Institute of Science, Satara (2023)</span>
                <span className="text-xs text-[#6E6C68] font-mono block">HSC – Maharashtra State Board • Score: 84.17%</span>
              </div>
              <div className="border-l-2 border-[#D8C4B6] pl-3 py-1">
                <span className="font-bold text-[#1A1918] block">Maharaja Sayajirao Vidyalaya, Satara (2021)</span>
                <span className="text-xs text-[#6E6C68] font-mono block">SSC – Maharashtra State Board • Score: 97.00%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Download Action Bar */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-mono text-[#6E6C68]">
          Verified PDF Document
        </span>
        <a
          href="/Kshitij_Kumbhar_Resume.pdf"
          download="Kshitij_Kumbhar_Resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1918] hover:bg-[#C86D51] text-white text-xs font-medium tracking-wide transition-colors shadow-sm"
        >
          <Download size={14} />
          Download Resume (PDF)
        </a>
      </div>
    </motion.div>
  );
}
