"use client";

import React from "react";

export default function TechnicalGridShell() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      <div className="max-w-[1500px] h-full mx-auto px-4 md:px-8 relative">
        {/* 12-Column Desktop Grid Lines */}
        <div className="w-full h-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-0 border-x border-[var(--border-color)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full border-r border-[var(--border-color)] ${
                i >= 4 ? "hidden md:block" : ""
              } ${i >= 6 ? "hidden lg:block" : ""}`}
            />
          ))}
        </div>

        {/* Structural Crosshair Intersections (+) */}
        <span className="absolute top-12 left-4 md:left-8 font-mono text-[10px] text-[var(--accent-acid)]/60 -translate-x-1/2 -translate-y-1/2">+</span>
        <span className="absolute top-12 right-4 md:right-8 font-mono text-[10px] text-[var(--accent-acid)]/60 translate-x-1/2 -translate-y-1/2">+</span>
        <span className="absolute top-1/3 left-4 md:left-8 font-mono text-[10px] text-[var(--accent-acid)]/60 -translate-x-1/2 -translate-y-1/2">+</span>
        <span className="absolute top-1/3 right-4 md:right-8 font-mono text-[10px] text-[var(--accent-acid)]/60 translate-x-1/2 -translate-y-1/2">+</span>
        <span className="absolute top-2/3 left-4 md:left-8 font-mono text-[10px] text-[var(--accent-acid)]/60 -translate-x-1/2 -translate-y-1/2">+</span>
        <span className="absolute top-2/3 right-4 md:right-8 font-mono text-[10px] text-[var(--accent-acid)]/60 translate-x-1/2 -translate-y-1/2">+</span>
        <span className="absolute bottom-12 left-4 md:left-8 font-mono text-[10px] text-[var(--accent-acid)]/60 -translate-x-1/2 translate-y-1/2">+</span>
        <span className="absolute bottom-12 right-4 md:right-8 font-mono text-[10px] text-[var(--accent-acid)]/60 translate-x-1/2 translate-y-1/2">+</span>
      </div>
    </div>
  );
}
