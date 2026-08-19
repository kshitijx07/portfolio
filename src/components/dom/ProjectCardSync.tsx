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
      className={`group relative break-inside-avoid inline-block w-full rounded-sm border border-white/10 ${bgColor} p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 select-none shadow-xl space-y-4`}
      style={{
        borderColor: hovered ? accentColor : "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* ── 1. Compact Top Header Bar ───────────────────────────────── */}
      <div className="flex items-center justify-between gap-2 z-10 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 truncate">
          <span
            className="px-2 py-0.5 font-mono text-[9px] font-bold text-black uppercase tracking-wider rounded-xs shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {tag}
          </span>
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider truncate hidden sm:inline">
            // {year}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-white/60 shrink-0">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 bg-white/5 hover:bg-white/15 text-white hover:text-[#B4F342] rounded-xs transition-colors"
              title="View GitHub repository"
            >
              <FiGithub size={12} />
            </a>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-0.5 bg-[#B4F342]/10 border border-[#B4F342]/30 text-[#B4F342] hover:bg-[#B4F342] hover:text-black rounded-xs transition-colors flex items-center gap-1 text-[10px] font-bold"
              title="Open Live Deployment"
            >
              <span>LIVE</span>
              <ArrowUpRight size={11} />
            </a>
          )}
        </div>
      </div>

      {/* ── 2. Compact Visual Banner / CLI Trigger ─────────────────── */}
      {bannerText && (
        <div className="p-2.5 bg-black/70 border border-white/10 rounded-sm flex items-center justify-between font-mono text-xs text-white group-hover:text-[#B4F342] transition-colors z-10">
          <div className="flex items-center gap-1.5 truncate">
            <Terminal size={13} className="text-[#4DEEEA] shrink-0" />
            <span className="truncate text-[11px]">{bannerText}</span>
          </div>
          {cliCommand && (
            <button
              onClick={handleCopyCli}
              className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded-xs text-[9px] flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
              title="Copy CLI command"
            >
              {copiedCli ? (
                <>
                  <Check size={10} className="text-[#B4F342]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={10} />
                  <span>COPY</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* ── 3. Title & Description ──────────────────────────────────── */}
      <div className="space-y-1.5 z-10">
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#B4F342] transition-colors tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-mono text-[11px] text-[#4DEEEA] font-semibold">
            {subtitle}
          </p>
        )}
        <p className="text-xs text-[#8A8F98] leading-relaxed font-mono pt-1">
          {description}
        </p>
      </div>

      {/* ── 4. Key Metrics Grid (Compact Chips) ────────────────────── */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 z-10 font-mono">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-2 bg-white/5 border border-white/10 rounded-xs space-y-0.5"
            >
              <div className="text-[9px] text-white/40 uppercase truncate">
                {m.label}
              </div>
              <div className="text-xs font-bold text-[#B4F342] truncate">
                {m.value}
              </div>
              {m.sub && (
                <div className="text-[8px] text-white/50 truncate">{m.sub}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── 5. Architectural Bullets ────────────────────────────────── */}
      {bullets.length > 0 && (
        <div className="space-y-2 z-10 font-mono">
          <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
            {bullets.slice(0, expanded ? bullets.length : 2).map((b, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px]">
                <span className="text-[#B4F342] mt-0.5 shrink-0 text-[10px]">
                  ▹
                </span>
                <span className="leading-snug">{b}</span>
              </li>
            ))}
          </ul>

          {bullets.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="pt-0.5 font-mono text-[10px] text-[#4DEEEA] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>
                {expanded
                  ? "Collapse Details"
                  : `+${bullets.length - 2} Architecture Bullets`}
              </span>
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          )}
        </div>
      )}

      {/* ── 6. Tech Stack Pill Directory ────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3 z-10 font-mono">
        {technologies.map((t) => (
          <span
            key={t}
            className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-xs text-[9px] text-white/70 hover:border-[#B4F342] transition-colors"
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── 7. Dynamic Hover Frame for Shader DOM Alignment ─────────── */}
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
