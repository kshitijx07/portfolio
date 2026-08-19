"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Lenis from "lenis";
import { addEffect } from "@react-three/fiber";
import {
  bindLenisScrollBus,
  subscribeScroll,
  getScrollSnapshot,
  ScrollSnapshot,
} from "@/lib/bus";
import {
  ChevronUp,
  Activity,
  Compass,
  ArrowDown,
  Navigation,
  Layers,
  Terminal,
  MousePointer,
} from "lucide-react";

interface SectionAnchor {
  id: string;
  label: string;
  code: string;
}

const SECTION_ANCHORS: SectionAnchor[] = [
  { id: "home", label: "Hero Viewport", code: "01 // HOME" },
  { id: "about", label: "Bio & Summary", code: "02 // BIO" },
  { id: "experience", label: "Experience", code: "03 // EXP" },
  { id: "projects", label: "Flagship Projects", code: "04 // WORK" },
  { id: "skills", label: "Technical Skills", code: "05 // SKILLS" },
  { id: "education", label: "Education", code: "06 // EDU" },
  { id: "contact", label: "Dispatch Gateway", code: "07 // CONTACT" },
];

export interface ScrollShellProps {
  children: React.ReactNode;
}

export default function ScrollShell({ children }: ScrollShellProps) {
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll State Telemetry
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  // ── 1. LENIS SMOOTH SCROLL & R3F FRAME BRIDGE ──────────────────
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // 1. Instantiate Lenis with manual RAF mode (autoRaf: false)
    const lenis = new Lenis({
      autoRaf: false,
      duration: prefersReducedMotion ? 0.01 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });
    lenisRef.current = lenis;

    // 2. Bind Lenis to the global single-source ScrollBus
    bindLenisScrollBus(lenis);

    // 3. Single-Frame Loop Bridge: R3F drives Lenis RAF via addEffect
    const unsubscribeEffect = addEffect((time: number) => {
      lenis.raf(time);
    });

    // 4. Global Keyboard Navigation Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in form inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      } else if (e.key === "End") {
        e.preventDefault();
        lenis.scrollTo(document.documentElement.scrollHeight, { duration: 1.5 });
      } else if (e.key >= "1" && e.key <= "7") {
        const idx = parseInt(e.key, 10) - 1;
        if (SECTION_ANCHORS[idx]) {
          const el = document.getElementById(SECTION_ANCHORS[idx].id);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el, { duration: 1.2, offset: -20 });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unsubscribeEffect();
      bindLenisScrollBus(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── 2. SCROLL TELEMETRY & ACTIVE SECTION OBSERVER ─────────────
  useEffect(() => {
    let lastSectionCheck = 0;

    const unsubscribeScroll = subscribeScroll((state: ScrollSnapshot) => {
      setScrollProgress(Math.round((state.progress ?? 0) * 100));
      setScrollTop(Math.round(state.scrollTop));
      setScrollVelocity(Math.round(state.velocitySmoothed ?? state.velocity));
      setIsScrolling(state.isScrolling);
      setShowBackToTop(state.scrollTop > 450);

      // Throttled active section detection
      const now = performance.now();
      if (now - lastSectionCheck > 80) {
        lastSectionCheck = now;
        const scrollMiddle = state.scrollTop + window.innerHeight * 0.35;

        for (let i = SECTION_ANCHORS.length - 1; i >= 0; i--) {
          const anchor = SECTION_ANCHORS[i];
          const el = document.getElementById(anchor.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const elTop = state.scrollTop + rect.top;
            if (scrollMiddle >= elTop - 100) {
              setActiveSection(anchor.id);
              break;
            }
          }
        }
      }
    });

    return () => {
      unsubscribeScroll();
    };
  }, []);

  // ── 3. PROGRAMMATIC SCROLL DISPATCHER ──────────────────────────
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el || !lenisRef.current) {
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    lenisRef.current.scrollTo(el, { duration: 1.2, offset: -20 });
    setShowNavMenu(false);
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Format active section code
  const currentSectionCode = useMemo(() => {
    const match = SECTION_ANCHORS.find((s) => s.id === activeSection);
    return match ? match.code : "01 // HOME";
  }, [activeSection]);

  return (
    <div className="relative w-full min-h-screen">
      {/* ── Main Children Content ───────────────────────────────── */}
      {children}

      {/* ── HUD Right-Edge Vertical Minimap & Progress Rail ───────── */}
      <aside className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none select-none">
        {/* Active Section Telemetry Tag */}
        <div className="font-mono text-[9px] text-[#4DEEEA] bg-black/70 border border-white/10 px-2 py-1 rounded-xs backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B4F342] animate-pulse" />
          <span>{currentSectionCode}</span>
        </div>

        {/* Vertical Track Rail */}
        <div className="relative w-1.5 h-48 bg-white/10 rounded-full overflow-hidden border border-white/15 backdrop-blur-md">
          <div
            className="w-full bg-[#B4F342] rounded-full transition-all duration-75 shadow-[0_0_8px_#B4F342]"
            style={{ height: `${Math.max(scrollProgress, 4)}%` }}
          />
        </div>

        {/* Section Jump Nodes (Clickable) */}
        <div className="flex flex-col gap-2 pt-1 pointer-events-auto">
          {SECTION_ANCHORS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="group relative flex items-center justify-end cursor-pointer"
              title={`${s.code} — ${s.label}`}
            >
              {/* Tooltip on Hover */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[9px] text-white bg-black/85 border border-white/15 px-2 py-0.5 rounded-xs whitespace-nowrap pointer-events-none shadow-md">
                {s.label}
              </span>

              {/* Node Indicator Dot */}
              <span
                className={`w-2 h-2 rounded-full transition-all border ${
                  activeSection === s.id
                    ? "bg-[#B4F342] border-[#B4F342] scale-125 shadow-[0_0_6px_#B4F342]"
                    : "bg-white/15 border-white/30 hover:border-white/70"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Percentage & Pixel Metric */}
        <div className="font-mono text-[9px] text-white/50 bg-black/70 border border-white/10 px-2 py-0.5 rounded-xs backdrop-blur-md text-right">
          <div>{scrollProgress.toString().padStart(3, "0")}%</div>
          <div className="text-[8px] text-white/30">{scrollTop}PX</div>
        </div>
      </aside>

      {/* ── Fixed Bottom-Left Live Velocity & Loop Telemetry ───────── */}
      <div className="fixed bottom-4 left-4 z-30 hidden lg:flex items-center gap-2.5 font-mono text-[10px] text-white/60 bg-black/70 border border-white/10 px-3 py-1.5 rounded-sm backdrop-blur-md pointer-events-none select-none shadow-xl">
        <div className="flex items-center gap-1.5">
          <Activity
            size={12}
            className={isScrolling ? "text-[#B4F342] animate-spin-slow" : "text-white/40"}
          />
          <span className="text-white/40">VEL:</span>
          <span
            className={`font-bold ${
              Math.abs(scrollVelocity) > 800 ? "text-[#FF3E1D]" : "text-[#4DEEEA]"
            }`}
          >
            {scrollVelocity} PX/S
          </span>
        </div>

        <span className="text-white/20">|</span>

        <div className="flex items-center gap-1">
          <span className="text-white/40">FRAME:</span>
          <span className="text-[#B4F342] font-bold">R3F + LENIS RAF</span>
        </div>
      </div>

      {/* ── Floating Back-To-Top HUD Action Beacon ────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="p-3 bg-black/80 hover:bg-[#B4F342] text-white hover:text-black border border-white/20 hover:border-[#B4F342] rounded-sm transition-all shadow-2xl flex items-center justify-center group backdrop-blur-md cursor-pointer"
          title="Smooth scroll to top (Home key)"
        >
          <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
