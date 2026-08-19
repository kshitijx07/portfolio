"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TechnicalHeaderProps {
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export default function TechnicalHeader({ soundEnabled = false, onToggleSound }: TechnicalHeaderProps) {
  const [activeSection, setActiveSection] = useState("work");
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { id: "work", label: "WORK", href: "#work" },
    { id: "about", label: "ABOUT", href: "#about" },
    { id: "systems", label: "SYSTEMS", href: "#systems" },
    { id: "experience", label: "EXP", href: "#experience" },
    { id: "pixel-room", label: "LAB", href: "#pixel-room" },
    { id: "contact", label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-md"
          : "bg-[#07145C]/60 backdrop-blur-md border-b border-white/10 py-3 md:py-3.5"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Brand Box */}
        <a
          href="#"
          className="inline-flex items-center gap-2 px-2.5 py-1 border border-dashed border-white/30 hover:border-[var(--accent-acid)] font-mono text-[11px] font-bold tracking-wider text-white hover:text-[var(--accent-acid)] transition-colors group"
        >
          <span className="w-1.5 h-1.5 bg-[var(--accent-acid)] animate-pulse" />
          <span>KSHITIJ.DESIGN</span>
        </a>

        {/* Right: Monospace Navigation System */}
        <nav className="flex items-center gap-4 md:gap-7 font-mono text-[11px] tracking-wider">
          <div className="hidden sm:flex items-center gap-5 md:gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className="relative group/link text-white/70 hover:text-white transition-all duration-200 py-1"
                >
                  <span className="inline-block transition-transform duration-200 group-hover/link:-translate-y-0.5">
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent-acid)] shadow-[0_0_6px_rgba(183,255,0,0.8)]"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5 pl-3 sm:border-l border-white/15">
            <button
              onClick={toggleTheme}
              className="text-[10px] font-mono text-white/70 hover:text-[var(--accent-acid)] transition-colors cursor-pointer px-1.5 py-0.5 border border-white/15 bg-white/5"
              title="Toggle Theme Mode"
            >
              THEME[{isDark ? "DARK" : "LIGHT"}]
            </button>

            {onToggleSound && (
              <button
                onClick={onToggleSound}
                className="text-[10px] font-mono text-white/70 hover:text-[var(--accent-acid)] transition-colors cursor-pointer px-1.5 py-0.5 border border-white/15 bg-white/5 hidden xs:inline-block"
                title="Toggle Synthesizer Sound"
              >
                SOUND[{soundEnabled ? "ON" : "/"}]
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
