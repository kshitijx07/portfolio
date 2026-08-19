"use client";

import React, { useEffect, useState } from "react";

export default function TechnicalHUDBar() {
  const [time, setTime] = useState("");
  const [coords, setCoords] = useState({ x: 120, y: 45 });

  useEffect(() => {
    // Live IST Clock
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Live Cursor Tracker
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const formatCoord = (num: number) => String(num).padStart(4, "0");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/85 backdrop-blur-md border-t border-[var(--border-color)] py-2.5 px-4 md:px-8 font-mono text-[11px] text-[var(--text-secondary)] select-none">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        {/* Left: Time & Location Telemetry */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-acid)] animate-ping opacity-75" />
          <span className="tabular-nums">
            GMT+5:30 IN {time || "11:53"} 31°C
          </span>
          <span className="hidden md:inline text-[var(--text-muted)]">
            // PUNE 18.5204° N, 73.8567° E
          </span>
        </div>

        {/* Center: Live Cursor Coordinate Tracker */}
        <div className="hidden sm:flex items-center gap-2 tabular-nums text-[var(--text-primary)] font-bold">
          <span className="text-[var(--accent-acid)]">✦</span>
          <span>{formatCoord(coords.x)} X {formatCoord(coords.y)} Y</span>
        </div>

        {/* Right: Wireframe Globe & Status Indicator */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[10px] text-[var(--text-muted)]">
            BUILD // 2026.08
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[10px] font-bold">
            <span className="w-1.5 h-1.5 bg-[var(--accent-acid)]" />
            <span>SYS // ONLINE</span>
          </div>

          {/* Wireframe Rotating Globe Glyphs */}
          <span className="text-[var(--text-primary)] font-mono text-sm leading-none animate-spin-slow">
            🌐
          </span>
        </div>
      </div>
    </div>
  );
}
