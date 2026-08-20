"use client";

import React, { useEffect, useRef } from "react";
import { pointerUv, pointerState, subscribeScroll } from "@/lib/bus";
import ViewportLazyScene from "./ViewportLazyScene";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 🕷️ SPIDER-MAN SIGNAL CITY & WEB TRAJECTORY BACKGROUND (ContinuousSectionsBg.tsx)
 * ──────────────────────────────────────────────────────────────────────────────
 * High-visibility, crisp continuous background for Sections 2–5 featuring:
 * 1. High-contrast multi-layer NYC / Neo-City Skyscraper Skyline Silhouettes.
 * 2. Illuminated skyscraper window matrices & pulsing crimson antenna beacons.
 * 3. Vibrant Web-Slinging Trajectory Splines (#ED3C3F, #3B82F6, #EDEAE2).
 * 4. High-contrast Spider-Sense Crosshair Target Reticles with laser dots.
 * 5. Enhanced Multi-Depth Parallax synchronized with Sections 2–5 scroll progress.
 * ══════════════════════════════════════════════════════════════════════════════
 */

// Procedural Skyline Silhouette Generator
function buildSkyline(count: number, seed: number, minH: number, maxH: number) {
  const buildings: { x: number; w: number; h: number }[] = [];
  let x = -20;
  let i = 0;
  while (x < 1560) {
    const w = 32 + ((Math.sin(seed + i * 12.9) + 1) / 2) * 52;
    const h = minH + ((Math.sin(seed * 1.7 + i * 5.3) + 1) / 2) * (maxH - minH);
    buildings.push({ x, w, h });
    x += w + 8;
    i++;
    if (i > count) break;
  }
  return buildings;
}

const FAR_BUILDINGS = buildSkyline(55, 2.1, 90, 220);
const NEAR_BUILDINGS = buildSkyline(26, 7.4, 140, 340);

const ARCS = [
  { d: "M -80 620 Q 380 420 760 560 T 1520 480", color: "#ED3C3F", width: 2.5, opacity: 0.85 },
  { d: "M -60 220 Q 300 60 700 180 T 1480 120", color: "#EDEAE2", width: 1.8, opacity: 0.55 },
  { d: "M 120 780 Q 560 560 940 700 T 1560 640", color: "#3B82F6", width: 2.0, opacity: 0.75 },
  { d: "M -100 420 Q 420 260 820 380 T 1500 320", color: "#EDEAE2", width: 1.6, opacity: 0.48 },
  { d: "M 60 90 Q 480 240 860 110 T 1500 200", color: "#ED3C3F", width: 2.2, opacity: 0.70 },
];

const RETICLES = [
  { x: 220, y: 160, s: 24 },
  { x: 1180, y: 280, s: 20 },
  { x: 760, y: 620, s: 28 },
  { x: 440, y: 440, s: 22 },
];

function SignalCityCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<SVGGElement>(null);
  const nearRef = useRef<SVGGElement>(null);
  const arcsRef = useRef<SVGGElement>(null);
  const reticlesRef = useRef<SVGGElement>(null);
  const arcPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const glitchRedRef = useRef<HTMLDivElement>(null);
  const glitchBlueRef = useRef<HTMLDivElement>(null);

  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── 1. Entrance draw-in of web-slinging trajectory arcs ──────────────────
    arcPathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.style.transition = `stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.12 * i}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (el) el.style.strokeDashoffset = "0";
        });
      });
    });

    if (farRef.current) {
      farRef.current.style.transition = "opacity 1.2s ease, transform 1.2s ease";
      farRef.current.style.opacity = "0";
      farRef.current.style.transform = "translateY(35px)";
    }
    if (nearRef.current) {
      nearRef.current.style.transition = "opacity 1.2s ease 0.15s, transform 1.2s ease 0.15s";
      nearRef.current.style.opacity = "0";
      nearRef.current.style.transform = "translateY(35px)";
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (farRef.current) {
          farRef.current.style.opacity = "0.75";
          farRef.current.style.transform = "translateY(0)";
        }
        if (nearRef.current) {
          nearRef.current.style.opacity = "0.95";
          nearRef.current.style.transform = "translateY(0)";
        }
      });
    });

    Array.from(reticlesRef.current?.children ?? []).forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.transition = `opacity 0.8s ease ${0.5 + i * 0.12}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + i * 0.12}s`;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "scale(0.6)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          htmlEl.style.opacity = "0.85";
          htmlEl.style.transform = "scale(1)";
        });
      });
    });

    // ── 2. Spider-Sense Chromatic Glitch Trigger ─────────────────────────────
    let prevPointer = { x: 0, y: 0 };
    let glitchCooldown = 0;
    let rafId: number;
    const clock = { last: performance.now(), t0: performance.now() };

    function fireGlitch() {
      const red = glitchRedRef.current;
      const blue = glitchBlueRef.current;
      if (!red || !blue) return;

      const steps = [
        { d: 0, rx: -6, bx: 6, op: 0.45 },
        { d: 50, rx: 4, bx: -4, op: 0.45 },
        { d: 110, rx: 0, bx: 0, op: 0 },
      ];

      steps.forEach((s) => {
        setTimeout(() => {
          red.style.transition = s.d === 110 ? "transform 0.2s ease, opacity 0.2s ease" : "none";
          blue.style.transition = s.d === 110 ? "transform 0.2s ease, opacity 0.2s ease" : "none";
          red.style.transform = `translateX(${s.rx}px)`;
          blue.style.transform = `translateX(${s.bx}px)`;
          red.style.opacity = `${s.op}`;
          blue.style.opacity = `${s.op}`;
        }, s.d);
      });
    }

    // ── 3. Scroll Listener for Smooth Depth Drift across Sections 2 to 5 ────
    let scrollProgress = 0;
    const unsubScroll = subscribeScroll((snap) => {
      scrollProgress = snap.progress;
    });

    // ── 4. Main 60 FPS Render Tick ──────────────────────────────────────────
    function tick(now: number) {
      rafId = requestAnimationFrame(tick);
      const dt = Math.min((now - clock.last) / 1000, 0.05);
      const elapsed = (now - clock.t0) / 1000;
      clock.last = now;
      glitchCooldown -= dt;

      // Bus pointer read
      if (pointerState.inside) {
        pointerTarget.current.x = (pointerUv.x - 0.5) * 2;
        pointerTarget.current.y = (pointerUv.y - 0.5) * 2;
      }

      pointer.current.x += (pointerTarget.current.x - pointer.current.x) * Math.min(1, dt * 3.5);
      pointer.current.y += (pointerTarget.current.y - pointer.current.y) * Math.min(1, dt * 3.5);

      const px = pointer.current.x;
      const py = pointer.current.y;
      // Enhanced dynamic multi-layer parallax offset across sections 2–5
      const scrollShiftY = (scrollProgress - 0.4) * 150;

      if (farRef.current) {
        farRef.current.style.transform = `translate(${px * 16}px, ${py * 12 + scrollShiftY * 0.38}px)`;
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translate(${px * 30}px, ${py * 18 + scrollShiftY * 0.88}px)`;
      }
      if (arcsRef.current) {
        arcsRef.current.style.transform = `translate(${px * 24}px, ${py * 15 + scrollShiftY * 0.65}px)`;
      }
      if (reticlesRef.current) {
        reticlesRef.current.style.transform = `translate(${px * 40}px, ${py * 24 + scrollShiftY * 1.15}px)`;
        Array.from(reticlesRef.current.children).forEach((el, i) => {
          const htmlEl = el as HTMLElement;
          const bob = Math.sin(elapsed / (1.75 + i * 0.25)) * 12;
          const rot = Math.sin(elapsed / (1.75 + i * 0.25)) * 8;
          htmlEl.style.transform = `scale(1) translateY(${bob}px) rotate(${rot}deg)`;
        });
      }

      // Continuous kinetic flow along the web trajectory paths
      arcPathRefs.current.forEach((el, i) => {
        if (!el) return;
        const len = el.getTotalLength();
        const flow = ((elapsed * (20 + i * 5)) % len) - len * 0.15;
        if (elapsed > 1.6 + 0.12 * i) {
          el.style.strokeDashoffset = `${-flow}`;
        }
      });

      // Spider-Sense Glitch on rapid pointer movement
      const moveDelta = Math.hypot(px - prevPointer.x, py - prevPointer.y);
      if (moveDelta > 0.05 && glitchCooldown <= 0) {
        fireGlitch();
        glitchCooldown = 3.2;
      }
      prevPointer = { x: px, y: py };
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      unsubScroll();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      style={{
        background: `
          radial-gradient(ellipse 90% 70% at 50% 30%, rgba(237, 60, 63, 0.18), transparent 70%),
          radial-gradient(ellipse 65% 55% at 85% 75%, rgba(59, 130, 246, 0.14), transparent 60%),
          #00104A
        `,
      }}
    >
      {/* ── Chromatic Glitch Ghost Overlays ─────────────────────── */}
      <div
        ref={glitchRedRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-0"
        style={{
          background: "radial-gradient(circle at 45% 45%, rgba(237, 60, 63, 0.28), transparent 60%)",
        }}
      />
      <div
        ref={glitchBlueRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-0"
        style={{
          background: "radial-gradient(circle at 55% 55%, rgba(59, 130, 246, 0.24), transparent 60%)",
        }}
      />

      {/* ── Continuous SVG Vector Canvas ────────────────────────── */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0"
      >
        <defs>
          <radialGradient id="spideyHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ED3C3F" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ED3C3F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ED3C3F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Far Skyscraper Skyline Silhouettes with High Contrast */}
        <g ref={farRef} fill="#1E2640" opacity="0.80">
          {FAR_BUILDINGS.map((b, idx) => (
            <rect
              key={`far-${idx}`}
              x={b.x}
              y={900 - b.h}
              width={b.w}
              height={b.h + 20}
              rx={1}
            />
          ))}
        </g>

        {/* Layer 2: Near Skyscraper Skyline Architecture with Lit Windows & Beacons */}
        <g ref={nearRef} fill="#121626" opacity="0.95">
          {NEAR_BUILDINGS.map((b, idx) => {
            const hasWindows = idx % 2 === 0;
            const hasAntenna = idx % 4 === 1;
            const topY = 900 - b.h;

            return (
              <g key={`near-${idx}`}>
                {/* Building Main Tower */}
                <rect x={b.x} y={topY} width={b.w} height={b.h + 20} rx={2} />

                {/* Rooftop Antenna Mast with Pulsing Crimson Beacon */}
                {hasAntenna && (
                  <g>
                    <line
                      x1={b.x + b.w / 2}
                      y1={topY}
                      x2={b.x + b.w / 2}
                      y2={topY - 22}
                      stroke="#ED3C3F"
                      strokeWidth="1.5"
                      opacity="0.85"
                    />
                    <circle
                      cx={b.x + b.w / 2}
                      cy={topY - 22}
                      r="6.0"
                      fill="url(#spideyHalo)"
                    />
                    <circle
                      cx={b.x + b.w / 2}
                      cy={topY - 22}
                      r="2.4"
                      fill="#ED3C3F"
                      className="animate-ping"
                      style={{ animationDuration: `${2.0 + (idx % 3) * 0.5}s` }}
                    />
                  </g>
                )}

                {/* Illuminated Window Matrices */}
                {hasWindows && b.w > 40 && (
                  <g fill="#3B82F6" opacity="0.45">
                    {Array.from({ length: Math.min(6, Math.floor(b.h / 45)) }).map((_, row) => (
                      <g key={`win-row-${row}`}>
                        <rect
                          x={b.x + 8}
                          y={topY + 18 + row * 28}
                          width={6}
                          height={8}
                          rx={1}
                        />
                        <rect
                          x={b.x + 20}
                          y={topY + 18 + row * 28}
                          width={6}
                          height={8}
                          rx={1}
                        />
                        {b.w > 55 && (
                          <rect
                            x={b.x + 32}
                            y={topY + 18 + row * 28}
                            width={6}
                            height={8}
                            rx={1}
                          />
                        )}
                      </g>
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* Layer 3: High-Visibility Web-Slinging Trajectory Splines */}
        <g ref={arcsRef} fill="none">
          {ARCS.map((arc, i) => (
            <path
              key={`arc-${i}`}
              ref={(el) => {
                arcPathRefs.current[i] = el;
              }}
              d={arc.d}
              stroke={arc.color}
              strokeWidth={arc.width}
              strokeOpacity={arc.opacity}
              strokeDasharray="14 10"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Layer 4: Spider-Sense Aiming Crosshair Target Reticles */}
        <g ref={reticlesRef}>
          {RETICLES.map((r, i) => (
            <g key={`ret-${i}`} transform={`translate(${r.x}, ${r.y})`}>
              {/* Outer Focus Circle */}
              <circle
                r={r.s}
                fill="none"
                stroke="#ED3C3F"
                strokeWidth="1.8"
                strokeDasharray="5 4"
                strokeOpacity="0.75"
              />
              {/* Inner Focus Circle */}
              <circle
                r={r.s * 0.55}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.4"
                strokeOpacity="0.65"
              />
              {/* Center Laser Target Dot */}
              <circle r="2.2" fill="#ED3C3F" />
              {/* Crossbars */}
              <line
                x1={-r.s - 4}
                y1={0}
                x2={-r.s + 4}
                y2={0}
                stroke="#ED3C3F"
                strokeWidth="1.8"
                strokeOpacity="0.8"
              />
              <line
                x1={r.s - 4}
                y1={0}
                x2={r.s + 4}
                y2={0}
                stroke="#ED3C3F"
                strokeWidth="1.8"
                strokeOpacity="0.8"
              />
              <line
                x1={0}
                y1={-r.s - 4}
                x2={0}
                y2={-r.s + 4}
                stroke="#ED3C3F"
                strokeWidth="1.8"
                strokeOpacity="0.8"
              />
              <line
                x1={0}
                y1={r.s - 4}
                x2={0}
                y2={r.s + 4}
                stroke="#ED3C3F"
                strokeWidth="1.8"
                strokeOpacity="0.8"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function ContinuousSectionsBg() {
  return (
    <ViewportLazyScene className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <SignalCityCanvas />
    </ViewportLazyScene>
  );
}
