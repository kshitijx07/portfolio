"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Trophy, BookOpen, Volume2, VolumeX, Download, ExternalLink, Terminal, ArrowRight, UserCheck } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";
import { ProjectData } from "@/components/modals/CaseStudyModal";

interface RetroPixelGameRoomProps {
  onOpenCaseStudy: (project: ProjectData) => void;
  projects: ProjectData[];
}

export default function RetroPixelGameRoom({ onOpenCaseStudy, projects }: RetroPixelGameRoomProps) {
  const [activeObject, setActiveObject] = useState<"workstation" | "arcade" | "bookshelf" | "polaroid">("workstation");
  const [avatarPos, setAvatarPos] = useState({ x: 28, y: 55 }); // percentage position inside room
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [githubData, setGithubData] = useState<any>(null);
  const [leetcodeData, setLeetcodeData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/github").then((r) => r.json()).then(setGithubData).catch(() => {});
    fetch("/api/leetcode").then((r) => r.json()).then(setLeetcodeData).catch(() => {});
  }, []);

  // Play retro 8-bit Web Audio API sound effect if enabled
  const playRetroSfx = (freq = 440, type: OscillatorType = "square") => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  // Keyboard WASD/Arrow navigation controls inside pixel room
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 8;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setAvatarPos((prev) => ({ ...prev, x: Math.max(10, prev.x - step) }));
        playRetroSfx(350, "square");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setAvatarPos((prev) => ({ ...prev, x: Math.min(85, prev.x + step) }));
        playRetroSfx(420, "square");
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        setAvatarPos((prev) => ({ ...prev, y: Math.max(25, prev.y - step) }));
        playRetroSfx(500, "square");
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        setAvatarPos((prev) => ({ ...prev, y: Math.min(80, prev.y + step) }));
        playRetroSfx(300, "square");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [soundEnabled]);

  const selectObject = (obj: "workstation" | "arcade" | "bookshelf" | "polaroid", targetPos: { x: number; y: number }) => {
    setActiveObject(obj);
    setAvatarPos(targetPos);
    playRetroSfx(600, "sine");
  };

  return (
    <PinterestCardWrapper>
      <div className="w-full overflow-hidden" data-cursor="Pixel Room">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
              Kshitij's Retro Pixel Developer Room
            </h3>
            <p className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono transition-colors">
              Use WASD/Arrow keys or click room objects to explore projects, resume floppy disk & live stats
            </p>
          </div>

          {/* Sound Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors flex items-center gap-1.5 shadow-sm ${
                soundEnabled
                  ? "bg-[#C86D51] dark:bg-[#E07A5F] text-white"
                  : "bg-[#EFECE6] dark:bg-[#2A2825] text-[#1A1918] dark:text-[#FAF9F7] border border-[#E8E3DA] dark:border-[#2E2C29]"
              }`}
              title={soundEnabled ? "Mute 8-Bit Audio" : "Enable 8-Bit Audio"}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{soundEnabled ? "8-Bit SFX ON" : "Audio Muted"}</span>
            </button>
          </div>
        </div>

        {/* Player HUD Bar (Health, XP, Score) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-3 rounded-2xl bg-[#F9F7F4] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] font-mono text-xs transition-colors">
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29]">
            <span className="text-[#5C5955] dark:text-[#A3A098]">SYSTEM HEALTH:</span>
            <span className="text-[#00B8A3] font-bold">100% Uptime</span>
          </div>
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29]">
            <span className="text-[#5C5955] dark:text-[#A3A098]">LEETCODE XP:</span>
            <span className="text-[#FFA116] font-bold">{leetcodeData?.totalSolved || 257} Solved</span>
          </div>
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29]">
            <span className="text-[#5C5955] dark:text-[#A3A098]">GITHUB SCORE:</span>
            <span className="text-[#C86D51] dark:text-[#E07A5F] font-bold">{githubData?.publicRepos || 38} Repos</span>
          </div>
        </div>

        {/* 2D Interactive Pixel Room Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Pixel Art Room Canvas (Adapts dynamically to light & dark mode) */}
          <div className="lg:col-span-7 relative w-full h-[360px] md:h-[400px] rounded-3xl bg-[#F9F7F4] dark:bg-[#151413] border border-[#E8E3DA] dark:border-[#2E2C29] overflow-hidden p-4 shadow-sm transition-colors select-none">
            {/* Pixel Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1A1918_1px,transparent_1px)] dark:bg-[radial-gradient(#FAF9F7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Room Object 1: DevOps Workstation (Top-Left Laptop) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => selectObject("workstation", { x: 25, y: 35 })}
              style={{ left: "15%", top: "20%" }}
              className={`absolute cursor-pointer p-3.5 rounded-2xl border transition-all ${
                activeObject === "workstation"
                  ? "bg-[#C86D51] dark:bg-[#E07A5F] border-white text-white shadow-lg"
                  : "bg-white dark:bg-[#282522] border-[#E8E3DA] dark:border-[#3E3B37] text-[#1A1918] dark:text-[#A3A098] hover:border-[#C86D51]"
              }`}
            >
              <Laptop size={26} />
              <span className="text-[10px] font-mono block mt-1 font-bold">Workstation</span>
            </motion.div>

            {/* Room Object 2: Arcade Cabinet (Top-Right Scoreboard) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => selectObject("arcade", { x: 70, y: 35 })}
              style={{ left: "68%", top: "20%" }}
              className={`absolute cursor-pointer p-3.5 rounded-2xl border transition-all ${
                activeObject === "arcade"
                  ? "bg-[#FFA116] border-white text-black shadow-lg"
                  : "bg-white dark:bg-[#282522] border-[#E8E3DA] dark:border-[#3E3B37] text-[#1A1918] dark:text-[#A3A098] hover:border-[#FFA116]"
              }`}
            >
              <Trophy size={26} />
              <span className="text-[10px] font-mono block mt-1 font-bold">Arcade Cabinet</span>
            </motion.div>

            {/* Room Object 3: Bookshelf & Floppy Disk (Bottom-Left Eject) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => selectObject("bookshelf", { x: 25, y: 70 })}
              style={{ left: "15%", top: "65%" }}
              className={`absolute cursor-pointer p-3.5 rounded-2xl border transition-all ${
                activeObject === "bookshelf"
                  ? "bg-[#00B8A3] border-white text-black shadow-lg"
                  : "bg-white dark:bg-[#282522] border-[#E8E3DA] dark:border-[#3E3B37] text-[#1A1918] dark:text-[#A3A098] hover:border-[#00B8A3]"
              }`}
            >
              <BookOpen size={26} />
              <span className="text-[10px] font-mono block mt-1 font-bold">Resume Bookshelf</span>
            </motion.div>

            {/* Room Object 4: Desk Polaroid Album (Bottom-Right LinkedIn) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => selectObject("polaroid", { x: 70, y: 70 })}
              style={{ left: "68%", top: "65%" }}
              className={`absolute cursor-pointer p-3.5 rounded-2xl border transition-all ${
                activeObject === "polaroid"
                  ? "bg-[#0A66C2] border-white text-white shadow-lg"
                  : "bg-white dark:bg-[#282522] border-[#E8E3DA] dark:border-[#3E3B37] text-[#1A1918] dark:text-[#A3A098] hover:border-[#0A66C2]"
              }`}
            >
              <FiLinkedin size={26} />
              <span className="text-[10px] font-mono block mt-1 font-bold">Desk Album</span>
            </motion.div>

            {/* Player Character Avatar */}
            <motion.div
              animate={{ left: `${avatarPos.x}%`, top: `${avatarPos.y}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#C86D51] dark:bg-[#E07A5F] border-2 border-white text-white flex items-center justify-center font-mono font-bold text-xs shadow-xl animate-bounce">
                KK
              </div>
              <span className="px-2 py-0.5 rounded bg-[#1A1918] text-white text-[9px] font-mono block text-center mt-1 shadow-md whitespace-nowrap">
                Kshitij
              </span>
            </motion.div>
          </div>

          {/* Right Column: Selected Room Object Content Display Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <AnimatePresence mode="wait">
              {/* OBJECT 1: DevOps Workstation (Projects & GitHub Terminal) */}
              {activeObject === "workstation" && (
                <motion.div
                  key="workstation"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  className="bg-[#FFFDF9] dark:bg-[#242220] p-6 rounded-3xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm flex flex-col justify-between h-full transition-colors space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#F2E4DF] dark:bg-[#38241E] text-[#C86D51] dark:text-[#E07A5F] text-[10px] font-mono font-bold">
                        WORKSTATION LAPTOP
                      </span>
                      <Terminal size={16} className="text-[#C86D51] dark:text-[#E07A5F]" />
                    </div>

                    <h4 className="text-xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-2">
                      Engineering Terminal & Projects
                    </h4>

                    <p className="text-xs text-[#5C5955] dark:text-[#A3A098] leading-relaxed mb-4 font-sans">
                      Inspect Kshitij's deployed cloud architecture projects or browse public GitHub repositories.
                    </p>

                    <div className="space-y-2 mb-4">
                      {projects.map((p) => (
                        <div
                          key={p.title}
                          onClick={() => onOpenCaseStudy(p)}
                          className="p-3 rounded-2xl bg-[#F9F7F4] dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29] hover:border-[#C86D51] dark:hover:border-[#E07A5F] cursor-pointer transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.title} className="w-9 h-9 rounded-xl object-cover" />
                            <div>
                              <span className="text-xs font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] block">{p.title}</span>
                              <span className="text-[10px] font-mono text-[#5C5955] dark:text-[#A3A098]">{p.category}</span>
                            </div>
                          </div>
                          <ArrowRight size={14} className="text-[#C86D51] dark:text-[#E07A5F]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://github.com/kshitijx07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-[#1A1918] dark:bg-[#FAF9F7] hover:bg-[#C86D51] dark:hover:bg-[#E07A5F] text-white dark:text-[#1A1918] dark:hover:text-white text-xs font-mono font-medium transition-colors flex items-center justify-center gap-2 active:scale-95"
                  >
                    <FiGithub size={15} />
                    <span>Open @kshitijx07 on GitHub ({githubData?.publicRepos || 38} Repos)</span>
                  </a>
                </motion.div>
              )}

              {/* OBJECT 2: Arcade Cabinet (LeetCode & Codeforces) */}
              {activeObject === "arcade" && (
                <motion.div
                  key="arcade"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  className="bg-[#FFFDF9] dark:bg-[#242220] p-6 rounded-3xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm flex flex-col justify-between h-full transition-colors space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#FFA116]/10 dark:bg-[#FFA116]/20 text-[#FFA116] text-[10px] font-mono font-bold">
                        ARCADE SCOREBOARD
                      </span>
                      <Trophy size={16} className="text-[#FFA116]" />
                    </div>

                    <h4 className="text-xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-2">
                      Algorithmic Hall of Fame
                    </h4>

                    <div className="space-y-3 mb-4 font-mono text-xs">
                      <div className="p-3.5 rounded-2xl bg-[#F9F7F4] dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#1A1918] dark:text-[#FAF9F7]">LeetCode Score:</span>
                          <span className="text-[#FFA116] font-bold">{leetcodeData?.totalSolved || 257} Solved</span>
                        </div>
                        <span className="text-[10px] text-[#5C5955] dark:text-[#A3A098] block">Global Rank #{leetcodeData?.ranking || 605333}</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#F9F7F4] dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#1A1918] dark:text-[#FAF9F7]">Codeforces Rating:</span>
                          <span className="text-[#1F8ACB] font-bold">1280 (Pupil)</span>
                        </div>
                        <span className="text-[10px] text-[#5C5955] dark:text-[#A3A098] block">@kshitij___x07</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://leetcode.com/u/kshitij72"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-[#FFA116] hover:bg-[#e08c0d] text-black text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                  >
                    <span>View LeetCode Profile</span>
                    <ExternalLink size={14} />
                  </a>
                </motion.div>
              )}

              {/* OBJECT 3: Resume Bookshelf & Floppy Disk Cheat Code */}
              {activeObject === "bookshelf" && (
                <motion.div
                  key="bookshelf"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  className="bg-[#FFFDF9] dark:bg-[#242220] p-6 rounded-3xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm flex flex-col justify-between h-full transition-colors space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#00B8A3]/10 dark:bg-[#00B8A3]/20 text-[#00B8A3] text-[10px] font-mono font-bold">
                        FLOPPY DISK RECOVERY
                      </span>
                      <BookOpen size={16} className="text-[#00B8A3]" />
                    </div>

                    <h4 className="text-xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-2">
                      Curriculum Vitae Floppy Disk
                    </h4>

                    <p className="text-xs text-[#5C5955] dark:text-[#A3A098] leading-relaxed mb-4 font-sans">
                      Eject Kshitij's verified engineering resume containing B.Tech academic records (CGPA 8.48/10) and DevOps experience.
                    </p>

                    <div className="p-4 rounded-2xl bg-[#F9F7F4] dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29] space-y-1 font-mono text-xs">
                      <span className="text-[#00B8A3] font-bold block">MIT Academy of Engineering, Pune</span>
                      <span className="text-[#5C5955] dark:text-[#A3A098] block">B.Tech Computer Engineering (2023 – 2027)</span>
                      <span className="text-[#5C5955] dark:text-[#A3A098] block">CGPA: 8.48 / 10 • Updated July 2026</span>
                    </div>
                  </div>

                  <a
                    href="/Kshitij_Kumbhar_Resume.pdf"
                    download="Kshitij_Kumbhar_Resume.pdf"
                    className="w-full py-2.5 rounded-full bg-[#00B8A3] hover:bg-[#009c8a] text-black text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                  >
                    <Download size={15} />
                    <span>Eject Resume PDF</span>
                  </a>
                </motion.div>
              )}

              {/* OBJECT 4: Desk Polaroid Album (LinkedIn Updates) */}
              {activeObject === "polaroid" && (
                <motion.div
                  key="polaroid"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  className="bg-[#FFFDF9] dark:bg-[#242220] p-6 rounded-3xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm flex flex-col justify-between h-full transition-colors space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#388DFF] text-[10px] font-mono font-bold">
                        DESK POLAROID ALBUM
                      </span>
                      <FiLinkedin size={16} className="text-[#0A66C2] dark:text-[#388DFF]" />
                    </div>

                    <h4 className="text-xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] mb-2">
                      LinkedIn Career Log
                    </h4>

                    <div className="p-4 rounded-2xl bg-[#F9F7F4] dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29] space-y-2 mb-3 font-sans text-xs">
                      <div className="flex items-center gap-2">
                        <UserCheck size={14} className="text-[#0A66C2] dark:text-[#388DFF]" />
                        <span className="font-bold text-[#1A1918] dark:text-[#FAF9F7]">Colgate-Palmolive DevOps Intern</span>
                      </div>
                      <p className="text-[#5C5955] dark:text-[#A3A098] leading-relaxed">
                        Supporting CI/CD pipelines, Docker containerization & AWS cloud management in Mumbai (Hybrid).
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/kshitij-kumbhar-369777x/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                  >
                    <FiLinkedin size={15} />
                    <span>View LinkedIn Profile</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
