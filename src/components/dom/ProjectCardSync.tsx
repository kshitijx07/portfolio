"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Layers,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Terminal,
  Activity,
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
  defaultExpanded?: boolean;
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
  defaultExpanded = false,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpanded);
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
      className={`group relative w-full rounded-sm border border-white/15 ${bgColor} p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 select-none shadow-2xl space-y-6`}
      style={{
        borderColor: hovered ? accentColor : "rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* ── 1. Top Header Bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5 truncate">
          <span
            className="px-3 py-1 font-mono text-xs font-bold text-black uppercase tracking-wider rounded-xs shrink-0 shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {tag}
          </span>
          <span className="font-mono text-xs text-white/50 uppercase tracking-wider truncate hidden sm:inline font-semibold">
            // {year}
          </span>
        </div>

        <div className="flex items-center gap-2.5 font-mono text-sm text-white/80 shrink-0">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] min-w-[44px] p-2.5 bg-white/5 hover:bg-white/20 text-white hover:text-[#B4F342] border border-white/10 rounded-xs transition-colors flex items-center justify-center"
              title="View GitHub repository"
            >
              <FiGithub size={16} />
            </a>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] px-4 py-2 bg-[#B4F342]/15 border border-[#B4F342]/50 text-[#B4F342] hover:bg-[#B4F342] hover:text-black rounded-xs transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
              title="Open Live Deployment"
            >
              <span>LIVE DEMO</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      {/* ── 2. Visual Banner / CLI Trigger ───────────────────────────── */}
      {bannerText && (
        <div className="p-3.5 bg-black/80 border border-white/15 rounded-sm flex items-center justify-between font-mono text-xs text-white group-hover:border-[#B4F342]/40 transition-colors z-10">
          <div className="flex items-center gap-2 truncate">
            <Terminal size={15} className="text-[#4DEEEA] shrink-0" />
            <span className="truncate text-xs font-semibold text-zinc-200">
              {bannerText}
            </span>
          </div>
          {cliCommand && (
            <button
              onClick={handleCopyCli}
              className="min-h-[38px] px-3 py-1.5 bg-white/10 hover:bg-[#B4F342] text-white hover:text-black border border-white/20 rounded-xs text-xs font-bold flex items-center gap-1.5 shrink-0 ml-3 cursor-pointer transition-colors"
              title="Copy CLI command"
            >
              {copiedCli ? (
                <>
                  <Check size={13} className="text-[#B4F342]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>COPY</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* ── 3. Title & Description ──────────────────────────────────── */}
      <div className="space-y-2 z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#B4F342] transition-colors tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-mono text-xs sm:text-sm text-[#4DEEEA] font-bold tracking-wide">
            {subtitle}
          </p>
        )}
        <p className="text-sm text-zinc-300 leading-relaxed font-mono pt-1">
          {description}
        </p>
      </div>

      {/* ── 4. Key Metrics Grid ──────────────────────────────────────── */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 z-10 font-mono">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3 bg-white/5 border border-white/10 rounded-xs space-y-1"
            >
              <div className="text-xs text-white/50 uppercase font-semibold truncate">
                {m.label}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#B4F342] truncate">
                {m.value}
              </div>
              {m.sub && (
                <div className="text-xs text-white/40 truncate">{m.sub}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── 5. Architectural Bullets ────────────────────────────────── */}
      {bullets.length > 0 && (
        <div className="space-y-3 z-10 font-mono">
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {bullets.slice(0, expanded ? bullets.length : 2).map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-[#B4F342] mt-0.5 shrink-0 font-bold">
                  ▹
                </span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          {bullets.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="min-h-[40px] px-2 py-1 font-mono text-xs font-bold text-[#4DEEEA] hover:text-[#B4F342] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>
                {expanded
                  ? "Collapse Technical Details"
                  : `+${bullets.length - 2} Architecture Bullets`}
              </span>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      )}

      {/* ── 6. Tech Stack Pill Directory ────────────────────────────── */}
      <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4 z-10 font-mono">
        {technologies.map((t) => (
          <span
            key={t}
            className="bg-white/5 border border-white/10 px-3 py-1 rounded-xs text-xs font-medium text-white/80 hover:border-[#B4F342] hover:text-white transition-colors"
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── 7. Dynamic Hover Frame ───────────────────────────────────── */}
      <div
        className={`pointer-events-none absolute inset-0 border-2 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          borderColor: accentColor,
        }}
      />
    </div>
  );
}
