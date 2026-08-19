"use client";

import React, { useState, useEffect, useRef } from "react";

export default function TechnicalHUDBar() {
  const [timeString, setTimeString] = useState("12:22:00");
  const coordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Live IST Clock (Updating every second)
    const updateTime = () => {
      const now = new Date();
      const istOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat([], istOptions).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // 2. High-Performance Frame-by-Frame Mouse Coordinates (Direct DOM update via rAF)
    let mouseX = 741;
    let mouseY = 384;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = Math.round(e.clientX);
      mouseY = Math.round(e.clientY);
    };

    const updateCoords = () => {
      if (coordsRef.current) {
        coordsRef.current.textContent = `[${String(mouseX).padStart(4, "0")} X ${String(mouseY).padStart(4, "0")} Y]`;
      }
      animId = requestAnimationFrame(updateCoords);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateCoords);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/85 backdrop-blur-md border-t border-[var(--border-color)] py-2 pointer-events-none select-none">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between font-mono text-[10px] text-[var(--text-secondary)]">
        {/* Bottom-Left: Live Cursor Coordinates (Frame-by-frame) */}
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-muted)] hidden sm:inline">LIVE_TELEMETRY //</span>
          <span className="text-[var(--text-primary)] font-bold">
            <span ref={coordsRef}>[0741 X 0384 Y]</span>
          </span>
        </div>

        {/* Center: Location Coordinates */}
        <div className="hidden md:flex items-center gap-3 text-[var(--text-muted)]">
          <span className="text-[var(--text-primary)] font-bold">GMT+05:30</span>
          <span>// IN / PUNE</span>
          <span className="text-[var(--accent-acid)] font-bold">[{timeString} IST]</span>
        </div>

        {/* Bottom-Right: System Status Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-muted)] hidden sm:inline">STATUS // 100% UPTIME</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-acid)] animate-pulse shadow-[0_0_8px_rgba(183,255,0,0.8)]" />
            <span className="font-bold text-[var(--text-primary)] tracking-wider">SYS // ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
