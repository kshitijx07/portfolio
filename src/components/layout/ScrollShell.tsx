"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { addEffect } from "@react-three/fiber";
import {
  bindLenisScrollBus,
  subscribeScroll,
  ScrollSnapshot,
  isLowPowerDevice,
  prefersReducedMotion,
} from "@/lib/bus";
import { ChevronUp } from "lucide-react";
import SystemBootLoader from "@/components/ui/SystemBootLoader";

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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ── 1. ALWAYS START FROM TOP ON MOUNT / REFRESH ───────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  // ── 2. LENIS SMOOTH SCROLL & ADAPTIVE FRAME BRIDGE ─────────────
  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const isLowEnd = isLowPowerDevice();

    // Instantiate Lenis with device-adaptive smoothing
    const lenis = new Lenis({
      autoRaf: false,
      duration: isReduced ? 0.01 : isLowEnd ? 0.85 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !isReduced,
      wheelMultiplier: isLowEnd ? 1.1 : 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Reset scroll position in Lenis immediately
    lenis.scrollTo(0, { immediate: true });

    // Bind Lenis to global single-source telemetry bus
    bindLenisScrollBus(lenis);

    // Single-Frame Bridge: R3F drives Lenis RAF via addEffect
    let r3fActive = false;
    const unsubscribeEffect = addEffect((time: number) => {
      r3fActive = true;
      lenis.raf(time);
    });

    // Fallback RAF loop if Three.js canvas is not mounted
    let fallbackRafId: number | null = null;
    const fallbackRaf = (time: number) => {
      if (!r3fActive && lenisRef.current) {
        lenisRef.current.raf(time);
      }
      fallbackRafId = requestAnimationFrame(fallbackRaf);
    };
    fallbackRafId = requestAnimationFrame(fallbackRaf);

    // Page Visibility API optimization (suspend during tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Global Keyboard Quick Navigation Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.0 });
      } else if (e.key === "End") {
        e.preventDefault();
        lenis.scrollTo(document.documentElement.scrollHeight, { duration: 1.2 });
      } else if (e.key >= "1" && e.key <= "7") {
        const idx = parseInt(e.key, 10) - 1;
        if (SECTION_ANCHORS[idx]) {
          const el = document.getElementById(SECTION_ANCHORS[idx].id);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el, { duration: 1.0, offset: -20 });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      unsubscribeEffect();
      if (fallbackRafId) cancelAnimationFrame(fallbackRafId);
      bindLenisScrollBus(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── 3. SCROLL MONITOR FOR BACK-TO-TOP TRIGGER ─────────────────
  useEffect(() => {
    const unsubscribeScroll = subscribeScroll((state: ScrollSnapshot) => {
      setShowBackToTop(state.scrollTop > 450);
    });

    return () => {
      unsubscribeScroll();
    };
  }, []);

  // ── 4. PROGRAMMATIC SCROLL DISPATCHER ──────────────────────────
  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsLoaded(true);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* ── One-Line Style System Boot Loader Badge ────────────────── */}
      <SystemBootLoader onComplete={handleBootComplete} minDuration={1400} />

      {/* ── Main Page Content ──────────────────────────────────── */}
      {children}

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
          className="p-3.5 bg-black/85 hover:bg-[#B4F342] text-white hover:text-black border border-white/20 hover:border-[#B4F342] rounded-xs transition-all shadow-2xl flex items-center justify-center group backdrop-blur-md cursor-pointer min-h-[44px] min-w-[44px]"
          title="Smooth scroll to top (Home key)"
        >
          <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
