"use client";

import React, { useState, useEffect } from "react";

export default function TechnicalHUDBar() {
  const [coords, setCoords] = useState({ x: 741, y: 384 });
  const [timeString, setTimeString] = useState("12:22:00");

  useEffect(() => {
    // Live IST Clock
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

    // Live Mouse Coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/80 backdrop-blur-md border-t border-[var(--border-color)] py-2 pointer-events-none select-none">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between font-mono text-[10px] text-[var(--text-secondary)]">
        {/* Left: Real Local Coordinates & Time */}
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-primary)] font-bold">GMT+05:30</span>
          <span>// IN / PUNE</span>
          <span className="text-[var(--accent-acid)] hidden sm:inline-block font-bold">[{timeString} IST]</span>
        </div>

        {/* Center: Live Cursor Coordinates */}
        <div className="hidden md:flex items-center gap-2 text-[var(--text-muted)]">
          <span>CURSOR_COORD</span>
          <span className="text-[var(--text-primary)] font-bold">
            [{String(coords.x).padStart(4, "0")} X {String(coords.y).padStart(4, "0")} Y]
          </span>
        </div>

        {/* Right: Minimal Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-acid)] animate-pulse shadow-[0_0_8px_rgba(183,255,0,0.8)]" />
          <span className="font-bold text-[var(--text-primary)] tracking-wider">SYS // ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
