"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Shield,
  Zap,
  Activity,
  Layers,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Cpu,
  Server,
  Cloud,
  Database,
  Terminal,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { globalRectSampler } from "@/lib/DomTargetRectSampler";

export interface ProjectMetric {
  label: string;
  value: string;
  sub?: string;
}

export interface ProjectCardProps {
  id: string;
  tag: string;
  category?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  bannerText?: string;
  bgColor?: string;
  accentColor?: string;
  githubUrl?: string;
  demoUrl?: string;
  bullets?: string[];
  metrics?: ProjectMetric[];
  cliCommand?: string;
  architectureHighlights?: {
    title: string;
    detail: string;
  }[];
}

export default function ProjectCardSync({
  id,
  tag,
  category = "CLOUD INFRASTRUCTURE",
  year,
  title,
  subtitle,
  description,
  technologies,
  bannerText,
  bgColor = "bg-[#0A0A0A]",
  accentColor = "#B4F342",
  githubUrl,
  demoUrl,
  bullets = [],
  metrics = [],
  cliCommand,
  architectureHighlights = [],
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    globalRectSampler.register(id, el);
    return () => {
      globalRectSampler.unregister(id);
    };
  }, [id]);

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cliCommand) return;
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative w-full rounded-sm border border-white/10 ${bgColor} p-6 sm:p-8 md:p-9 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[${accentColor}] select-none shadow-2xl space-y-6`}
      style={{
        borderColor: hovered ? accentColor : "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* ── 1. Top HUD Header & Links ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10 border-b border-white/10 pb-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className="px-2.5 py-0.5 font-mono text-[10px] font-bold text-black uppercase tracking-wider rounded-xs"
            style={{ backgroundColor: accentColor }}
          >
            {tag}
          </span>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest hidden sm:inline">
            // {category}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-white/60">
          <span className="text-white/40">{year}</span>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-white/5 hover:bg-white/15 text-white hover:text-[#B4F342] rounded-xs transition-colors flex items-center gap-1.5 text-[11px]"
              title="View source repository"
            >
              <FiGithub size={13} />
              <span className="hidden sm:inline font-bold">SOURCE</span>
            </a>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-[#B4F342]/10 border border-[#B4F342]/30 text-[#B4F342] hover:bg-[#B4F342] hover:text-black rounded-xs transition-colors flex items-center gap-1.5 text-[11px] font-bold"
              title="Open live deployment"
            >
              <span>LIVE</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>

      {/* ── 2. Middle Visual Feature & Banner ───────────────────────── */}
      <div className="space-y-4 z-10">
        {bannerText ? (
          <div className="p-4 bg-black/60 border border-white/10 rounded-sm flex items-center justify-between font-mono text-sm sm:text-base text-white group-hover:text-[#B4F342] transition-colors">
            <div className="flex items-center gap-2 truncate">
              <Terminal size={16} className="text-[#4DEEEA] shrink-0" />
              <span className="truncate">{bannerText}</span>
            </div>
            {cliCommand && (
              <button
                onClick={handleCopyCli}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xs text-xs flex items-center gap-1 shrink-0 ml-2"
                title="Copy CLI command"
              >
                {copiedCli ? (
                  <>
                    <Check size={12} className="text-[#B4F342]" />
                    <span className="text-[10px]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span className="text-[10px]">COPY</span>
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FF4500] px-4 py-2 rounded-full text-black font-black text-lg tracking-tight shadow-md">
              <span>{title.slice(0, 8)}</span>
              <span className="bg-white text-black px-2 py-0.2 text-xs rounded-full uppercase">
                PROD
              </span>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#B4F342] transition-colors tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="font-mono text-xs text-[#4DEEEA] font-semibold">
              {subtitle}
            </p>
          )}
        </div>

        <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed font-mono">
          {description}
        </p>
      </div>

      {/* ── 3. Production Architecture Metrics Bar ───────────────────── */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 z-10 font-mono">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3 bg-white/5 border border-white/10 rounded-xs space-y-1"
            >
              <div className="text-[10px] text-white/40 uppercase truncate">
                {m.label}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#B4F342] truncate">
                {m.value}
              </div>
              {m.sub && (
                <div className="text-[9px] text-white/50 truncate">{m.sub}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── 4. Architectural Bullet Points & Highlights ─────────────── */}
      {bullets.length > 0 && (
        <div className="space-y-2.5 z-10">
          <div className="font-mono text-[11px] text-white/40 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={13} className="text-[#4DEEEA]" />
            <span>Key Engineering Highlights</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed font-mono">
            {bullets.slice(0, expanded ? bullets.length : 3).map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#B4F342] mt-0.5 shrink-0">▹</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {bullets.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="pt-1 font-mono text-[11px] text-[#4DEEEA] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>
                {expanded
                  ? "Collapse Architecture Details"
                  : `Expand Full Specification (+${bullets.length - 3} bullets)`}
              </span>
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          )}
        </div>
      )}

      {/* ── 5. Technologies Pill Directory ──────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-4 gap-2 z-10 font-mono text-[11px]">
        <div className="flex flex-wrap gap-1.5 text-white/70">
          {technologies.map((t) => (
            <span
              key={t}
              className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-xs text-[10px] hover:border-[#B4F342] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="text-white/30 text-[10px]">
          AWS // DEVOPS // 2026
        </span>
      </div>

      {/* ── 6. Dynamic Hover Frame for Shader DOM Alignment ─────────── */}
      <div
        className={`pointer-events-none absolute inset-0 border-2 border-[${accentColor}] transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          borderColor: accentColor,
        }}
      />
    </div>
  );
}
