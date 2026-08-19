"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Volume2,
  VolumeX,
  Laptop,
  Trophy,
  BookOpen,
  ArrowRight,
  Download,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  UserCheck,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { ProjectData } from "@/components/modals/CaseStudyModal";

interface RetroPixelGameRoomProps {
  projects: ProjectData[];
  onOpenCaseStudy: (project: ProjectData) => void;
}

export default function RetroPixelGameRoom({ projects, onOpenCaseStudy }: RetroPixelGameRoomProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeObject, setActiveObject] = useState<"workstation" | "arcade" | "bookshelf" | "polaroid">("workstation");
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 50 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [githubData, setGithubData] = useState<any>(null);
  const [leetcodeData, setLeetcodeData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/github").then((res) => res.json()).then(setGithubData).catch(() => {});
    fetch("/api/leetcode").then((res) => res.json()).then(setLeetcodeData).catch(() => {});
  }, []);

  const playRetroSfx = (freq: number = 440, type: OscillatorType = "square") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (e) {}
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 6;
      setAvatarPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
          newX = Math.max(10, prev.x - step);
          playRetroSfx(300, "square");
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          newX = Math.min(90, prev.x + step);
          playRetroSfx(350, "square");
        } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          newY = Math.max(15, prev.y - step);
          playRetroSfx(400, "square");
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          newY = Math.min(85, prev.y + step);
          playRetroSfx(250, "square");
        }

        if (newX < 35 && newY < 45) setActiveObject("workstation");
        else if (newX > 60 && newY < 45) setActiveObject("arcade");
        else if (newX < 35 && newY > 55) setActiveObject("bookshelf");
        else if (newX > 60 && newY > 55) setActiveObject("polaroid");

        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [soundEnabled, isOpen]);

  const selectObject = (obj: typeof activeObject, targetCoords: { x: number; y: number }) => {
    setActiveObject(obj);
    setAvatarPos(targetCoords);
    playRetroSfx(600, "sine");
  };

  return (
    <section id="pixel-room" className="py-12 border-t border-[var(--border-color)]">
      <div className="w-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 space-y-6" data-cursor="Lab">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[var(--accent-acid)]" />
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                Experimental 2D Developer Room
              </h3>
              <span className="hud-tag hud-tag-acid text-[9px]">
                <Gamepad2 size={11} />
                <span>Lab Environment</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              An optional discovery simulation exploring cloud workstations, algorithmic scoreboards & resume floppy disk ejection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hud-btn hud-tag-acid font-bold flex items-center gap-2"
              data-cursor={isOpen ? "Close" : "Enter"}
            >
              <span>{isOpen ? "Collapse Lab" : "Enter The Lab"}</span>
              {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 overflow-hidden pt-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] font-mono text-xs">
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="text-[var(--text-muted)]">CONTROLS: WASD / ARROWS OR CLICK</span>
                  <span className="text-[var(--accent-acid)] font-bold">STATUS // 100% UPTIME</span>
                </div>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`hud-btn text-xs font-mono font-bold py-1 px-3 ${
                    soundEnabled ? "hud-tag-acid" : ""
                  }`}
                  data-cursor="Sound"
                >
                  {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  <span>{soundEnabled ? "8-Bit SFX ON" : "Audio Muted"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left: Pixel Art Canvas */}
                <div className="lg:col-span-7 relative w-full h-[360px] md:h-[400px] bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden p-4 select-none">
                  <div className="absolute inset-0 opacity-25 hud-dot-grid pointer-events-none" />

                  {/* Workstation */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => selectObject("workstation", { x: 25, y: 35 })}
                    style={{ left: "15%", top: "20%" }}
                    className={`absolute cursor-pointer p-4 border transition-all duration-200 ${
                      activeObject === "workstation"
                        ? "bg-[var(--accent-acid)] border-[var(--accent-acid)] text-[#050505] shadow-lg font-bold"
                        : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-acid)]"
                    }`}
                  >
                    <Laptop size={26} />
                    <span className="text-[10px] font-mono block mt-1 font-bold uppercase">Workstation</span>
                  </motion.div>

                  {/* Arcade */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => selectObject("arcade", { x: 70, y: 35 })}
                    style={{ left: "68%", top: "20%" }}
                    className={`absolute cursor-pointer p-4 border transition-all duration-200 ${
                      activeObject === "arcade"
                        ? "bg-[var(--accent-acid)] border-[var(--accent-acid)] text-[#050505] shadow-lg font-bold"
                        : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-acid)]"
                    }`}
                  >
                    <Trophy size={26} />
                    <span className="text-[10px] font-mono block mt-1 font-bold uppercase">Arcade</span>
                  </motion.div>

                  {/* Bookshelf */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => selectObject("bookshelf", { x: 25, y: 70 })}
                    style={{ left: "15%", top: "65%" }}
                    className={`absolute cursor-pointer p-4 border transition-all duration-200 ${
                      activeObject === "bookshelf"
                        ? "bg-[var(--accent-acid)] border-[var(--accent-acid)] text-[#050505] shadow-lg font-bold"
                        : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-acid)]"
                    }`}
                  >
                    <BookOpen size={26} />
                    <span className="text-[10px] font-mono block mt-1 font-bold uppercase">Resume Shelf</span>
                  </motion.div>

                  {/* Polaroid */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => selectObject("polaroid", { x: 70, y: 70 })}
                    style={{ left: "68%", top: "65%" }}
                    className={`absolute cursor-pointer p-4 border transition-all duration-200 ${
                      activeObject === "polaroid"
                        ? "bg-[var(--accent-acid)] border-[var(--accent-acid)] text-[#050505] shadow-lg font-bold"
                        : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-acid)]"
                    }`}
                  >
                    <FiLinkedin size={26} />
                    <span className="text-[10px] font-mono block mt-1 font-bold uppercase">Desk Album</span>
                  </motion.div>

                  {/* Player Character Avatar */}
                  <motion.div
                    animate={{ left: `${avatarPos.x}%`, top: `${avatarPos.y}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                  >
                    <div className="w-10 h-10 bg-[var(--text-primary)] text-[var(--bg-primary)] border-2 border-[var(--accent-acid)] flex items-center justify-center font-mono font-bold text-xs shadow-xl">
                      KK
                    </div>
                    <span className="px-2 py-0.5 bg-[var(--accent-acid)] text-[#050505] text-[9px] font-mono font-bold block text-center mt-1 shadow-md whitespace-nowrap">
                      Player 1
                    </span>
                  </motion.div>
                </div>

                {/* Right: Inspector */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <AnimatePresence mode="wait">
                    {/* Workstation */}
                    {activeObject === "workstation" && (
                      <motion.div
                        key="workstation"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-[var(--bg-surface)] p-6 md:p-7 border border-[var(--border-color)] flex flex-col justify-between h-full space-y-4"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="hud-tag hud-tag-acid text-[10px]">
                              <Terminal size={11} />
                              <span>Workstation Terminal</span>
                            </span>
                          </div>

                          <h4 className="text-xl font-display font-bold text-[var(--text-primary)] uppercase mb-2">
                            Engineering Systems & Codebases
                          </h4>

                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 font-sans">
                            Inspect Kshitij's deployed cloud architecture projects or browse live GitHub repositories.
                          </p>

                          <div className="space-y-2 mb-4">
                            {projects.map((p) => (
                              <div
                                key={p.title}
                                onClick={() => onOpenCaseStudy(p)}
                                className="p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-acid)] cursor-pointer transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-3">
                                  <img src={p.image} alt={p.title} className="w-9 h-9 object-cover border border-[var(--border-color)]" />
                                  <div>
                                    <span className="text-xs font-display font-bold text-[var(--text-primary)] block group-hover:text-[var(--accent-acid)] transition-colors uppercase">{p.title}</span>
                                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{p.category}</span>
                                  </div>
                                </div>
                                <ArrowRight size={14} className="text-[var(--accent-acid)] group-hover:translate-x-1 transition-transform" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <a
                          href="https://github.com/kshitijx07"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hud-btn hud-tag-acid w-full justify-center py-2.5"
                        >
                          <FiGithub size={15} />
                          <span>Open @kshitijx07 on GitHub ({githubData?.publicRepos || 38} Repos)</span>
                        </a>
                      </motion.div>
                    )}

                    {/* Arcade */}
                    {activeObject === "arcade" && (
                      <motion.div
                        key="arcade"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-[var(--bg-surface)] p-6 md:p-7 border border-[var(--border-color)] flex flex-col justify-between h-full space-y-4"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="hud-tag hud-tag-acid text-[10px]">
                              <Trophy size={11} />
                              <span>Arcade Scoreboard</span>
                            </span>
                          </div>

                          <h4 className="text-xl font-display font-bold text-[var(--text-primary)] uppercase mb-2">
                            Algorithmic Hall of Fame
                          </h4>

                          <div className="space-y-3 mb-4 font-mono text-xs">
                            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-[var(--text-primary)]">LeetCode XP:</span>
                                <span className="text-[var(--accent-acid)] font-bold">{leetcodeData?.totalSolved || 257} Solved</span>
                              </div>
                              <span className="text-[10px] text-[var(--text-muted)] block">Global Rank #{leetcodeData?.ranking || 605333} (@kshitij72)</span>
                            </div>

                            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-[var(--text-primary)]">Codeforces Rating:</span>
                                <span className="text-[var(--text-primary)] font-bold">1280 (Pupil)</span>
                              </div>
                              <span className="text-[10px] text-[var(--text-muted)] block">@kshitijx07</span>
                            </div>
                          </div>
                        </div>

                        <a
                          href="https://leetcode.com/u/kshitij72"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hud-btn hud-tag-acid w-full justify-center py-2.5"
                        >
                          <span>View LeetCode Profile (@kshitij72)</span>
                          <ExternalLink size={14} />
                        </a>
                      </motion.div>
                    )}

                    {/* Bookshelf */}
                    {activeObject === "bookshelf" && (
                      <motion.div
                        key="bookshelf"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-[var(--bg-surface)] p-6 md:p-7 border border-[var(--border-color)] flex flex-col justify-between h-full space-y-4"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="hud-tag hud-tag-acid text-[10px]">
                              <BookOpen size={11} />
                              <span>Floppy Disk Recovery</span>
                            </span>
                          </div>

                          <h4 className="text-xl font-display font-bold text-[var(--text-primary)] uppercase mb-2">
                            Curriculum Vitae Floppy Disk
                          </h4>

                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 font-sans">
                            Eject Kshitij's verified engineering resume containing academic credentials (CGPA 8.48/10) and DevOps experience.
                          </p>

                          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1 font-mono text-xs">
                            <span className="text-[var(--accent-acid)] font-bold block">MIT Academy of Engineering, Pune</span>
                            <span className="text-[var(--text-secondary)] block">B.Tech Computer Engineering (2023 – 2027)</span>
                            <span className="text-[var(--text-muted)] block">CGPA: <strong className="text-[var(--text-primary)]">8.48 / 10</strong></span>
                          </div>
                        </div>

                        <a
                          href="/Kshitij_Kumbhar_Resume.pdf"
                          download="Kshitij_Kumbhar_Resume.pdf"
                          className="hud-btn hud-tag-acid w-full justify-center py-2.5"
                        >
                          <Download size={15} />
                          <span>Eject Resume PDF</span>
                        </a>
                      </motion.div>
                    )}

                    {/* Polaroid */}
                    {activeObject === "polaroid" && (
                      <motion.div
                        key="polaroid"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-[var(--bg-surface)] p-6 md:p-7 border border-[var(--border-color)] flex flex-col justify-between h-full space-y-4"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="hud-tag hud-tag-acid text-[10px]">
                              <FiLinkedin size={11} />
                              <span>Desk Polaroid Album</span>
                            </span>
                          </div>

                          <h4 className="text-xl font-display font-bold text-[var(--text-primary)] uppercase mb-2">
                            LinkedIn Career Log
                          </h4>

                          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 mb-3 font-sans text-xs">
                            <div className="flex items-center gap-2">
                              <UserCheck size={15} className="text-[var(--accent-acid)]" />
                              <span className="font-bold text-[var(--text-primary)]">Colgate-Palmolive DevOps Intern</span>
                            </div>
                            <p className="text-[var(--text-secondary)] leading-relaxed font-mono text-[11px]">
                              Supporting CI/CD pipelines, Docker containerization & AWS cloud management in Mumbai (Hybrid).
                            </p>
                          </div>
                        </div>

                        <a
                          href="https://linkedin.com/in/kshitij-kumbhar"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hud-btn hud-tag-acid w-full justify-center py-2.5"
                        >
                          <FiLinkedin size={15} />
                          <span>View LinkedIn Profile</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
