"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { globalRectSampler } from "@/lib/DomTargetRectSampler";

export interface ProjectCardProps {
  id: string;
  tag: string;
  year: string;
  title: string;
  description: string;
  technologies: string[];
  bannerText?: string;
  bgColor?: string;
  githubUrl?: string;
  demoUrl?: string;
  bullets?: string[];
}

export default function ProjectCardSync({
  id,
  tag,
  year,
  title,
  description,
  technologies,
  bannerText,
  bgColor = "bg-[#0A0A0A]",
  githubUrl,
  demoUrl,
  bullets = [],
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    globalRectSampler.register(id, el);
    return () => {
      globalRectSampler.unregister(id);
    };
  }, [id]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative min-h-[420px] w-full rounded-sm border border-white/10 ${bgColor} p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#B4F342] select-none shadow-2xl`}
    >
      {/* 1. Card Top HUD */}
      <div className="flex justify-between items-start z-10">
        <span className="bg-[#B4F342] px-2.5 py-0.5 font-mono text-[10px] font-bold text-black uppercase tracking-wider">
          {tag}
        </span>
        <div className="flex items-center gap-3 font-mono text-xs text-white/50">
          <span>{year}</span>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#B4F342] transition-colors p-1"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Middle Graphic / Interactive Visual Feature */}
      <div className="my-6 flex flex-col items-center justify-center text-center z-10 space-y-4">
        {bannerText ? (
          <div className="font-mono text-lg md:text-2xl font-bold tracking-tight text-white group-hover:text-[#B4F342] transition-colors">
            {bannerText}
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-[#FF4500] px-6 py-4 rounded-full text-black font-black text-2xl tracking-tighter shadow-lg">
            <span>{title.slice(0, 6)}</span>
            <span className="bg-white text-black px-3 py-0.5 rounded-full text-base">
              {title.slice(6) || "CORE"}
            </span>
          </div>
        )}

        <h4 className="text-xl font-bold text-white group-hover:text-[#B4F342] transition-colors">
          {title}
        </h4>

        <p className="max-w-xl text-xs text-[#8A8F98] leading-relaxed">
          {description}
        </p>

        {bullets.length > 0 && (
          <ul className="text-left space-y-2 text-xs text-zinc-300 leading-relaxed pt-2 w-full">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#B4F342] mt-0.5">▹</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3. Bottom Architectural Metadata */}
      <div className="flex flex-wrap justify-between items-end border-t border-white/10 pt-4 font-mono text-[11px] text-[#8A8F98] z-10 gap-2">
        <div className="flex flex-wrap gap-1.5 text-white/70">
          {technologies.map((t) => (
            <span key={t} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-xs text-[10px]">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#B4F342] hover:underline flex items-center gap-1 font-bold"
            >
              <span>DEMO</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          <span className="text-white/40">2026 // PUNE</span>
        </div>
      </div>

      {/* Subtle Screen UV Bounding Frame for Shader Alignment */}
      <div
        className={`pointer-events-none absolute inset-0 border-2 border-[#B4F342] transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
