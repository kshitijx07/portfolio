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
 * 5. Dual-Chromatic Spider-Sense Glitch Pulse & bus-driven parallax physics.
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

    // ── 3. Scroll Listener for Smooth Depth Drift ───────────────────────────
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
      const scrollShiftY = (scrollProgress - 0.5) * 45;

      if (farRef.current) {
        farRef.current.style.transform = `translate(${px * 14}px, ${py * 10 + scrollShiftY * 0.4}px)`;
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translate(${px * 26}px, ${py * 16 + scrollShiftY * 0.8}px)`;
      }
      if (arcsRef.current) {
        arcsRef.current.style.transform = `translate(${px * 20}px, ${py * 12 + scrollShiftY * 0.6}px)`;
      }
      if (reticlesRef.current) {
        reticlesRef.current.style.transform = `translate(${px * 35}px, ${py * 22 + scrollShiftY}px)`;
        Array.from(reticlesRef.current.children).forEach((el, i) => {
          const htmlEl = el as HTMLElement;
          const bob = Math.sin(elapsed / (1.75 + i * 0.25)) * 10;
          const rot = Math.sin(elapsed / (1.75 + i * 0.25)) * 6;
          htmlEl.style.transform = `scale(1) translateY(${bob}px) rotate(${rot}deg)`;
        });
      }

      // Continuous kinetic flow along the web trajectory paths
      arcPathRefs.current.forEach((el, i) => {
        if (!el) return;
        const len = el.getTotalLength();
        const flow = ((elapsed * (18 + i * 4)) % len) - len * 0.15;
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
      className="relative w-full h-full overflow-hidden select-none pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 120% 90% at 50% 38%, #141420 0%, #0d0e18 45%, #08080c 100%)",
      }}
    >
      {/* ── Micro-Dot Signal Matrix (Enhanced Visibility) ──────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#EDEAE2 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* ── Spider-Man Skyline & Trajectory Vector Canvas ─────────────────── */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* 1. Web-Slinging Trajectory Arcs (High Visibility) */}
        <g ref={arcsRef}>
          {ARCS.map((arc, i) => (
            <path
              key={i}
              ref={(el) => {
                arcPathRefs.current[i] = el;
              }}
              d={arc.d}
              fill="none"
              stroke={arc.color}
              strokeWidth={arc.width}
              opacity={arc.opacity}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* 2. Far Skyline Silhouettes (Deep Indigo Navy) */}
        <g ref={farRef} fill="#1e2640">
          {FAR_BUILDINGS.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={800 - b.h}
              width={b.w}
              height={b.h}
              rx={2}
              opacity={0.8}
            />
          ))}
        </g>

        {/* 3. Near Skyline Silhouettes with Glowing Window Grids & Red Beacons */}
        <g ref={nearRef} fill="#121626">
          {NEAR_BUILDINGS.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={800 - b.h} width={b.w} height={b.h} rx={3} />
              
              {/* Architectural Window Matrices (Subtle Blue & Off-White Illumination) */}
              {i % 2 === 0 && (
                <rect
                  x={b.x + 6}
                  y={800 - b.h + 12}
                  width={b.w - 12}
                  height={b.h * 0.45}
                  fill="#3B82F6"
                  opacity={0.12}
                />
              )}

              {/* Crimson Antenna Beacon Lights */}
              {i % 3 === 0 && (
                <g>
                  {/* Antenna Mast */}
                  <line
                    x1={b.x + b.w * 0.5}
                    y1={800 - b.h}
                    x2={b.x + b.w * 0.5}
                    y2={800 - b.h - 14}
                    stroke="#ED3C3F"
                    strokeWidth={1.5}
                    opacity={0.7}
                  />
                  {/* Pulsing Beacon Dot */}
                  <circle
                    cx={b.x + b.w * 0.5}
                    cy={800 - b.h - 14}
                    r={2.4}
                    fill="#ED3C3F"
                    opacity={0.95}
                  />
                  {/* Beacon Halo */}
                  <circle
                    cx={b.x + b.w * 0.5}
                    cy={800 - b.h - 14}
                    r={6.0}
                    fill="#ED3C3F"
                    opacity={0.25}
                  />
                </g>
              )}
            </g>
          ))}
        </g>

        {/* 4. Spider-Sense Target Reticles (Crisp High-Contrast Aiming) */}
        <g ref={reticlesRef}>
          {RETICLES.map((r, i) => (
            <g
              key={i}
              transform={`translate(${r.x} ${r.y})`}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              {/* Concentric Outer Circle */}
              <circle r={r.s} fill="none" stroke="#EDEAE2" strokeWidth={1.4} opacity={0.7} />
              {/* Inner Focus Ring */}
              <circle r={r.s * 0.55} fill="none" stroke="#3B82F6" strokeWidth={1.2} opacity={0.65} />
              {/* Crosshair Lines */}
              <line
                x1={-r.s * 1.3}
                y1={0}
                x2={-r.s * 0.65}
                y2={0}
                stroke="#EDEAE2"
                strokeWidth={1.4}
              />
              <line
                x1={r.s * 0.65}
                y1={0}
                x2={r.s * 1.3}
                y2={0}
                stroke="#EDEAE2"
                strokeWidth={1.4}
              />
              <line
                x1={0}
                y1={-r.s * 1.3}
                x2={0}
                y2={-r.s * 0.65}
                stroke="#EDEAE2"
                strokeWidth={1.4}
              />
              <line
                x1={0}
                y1={r.s * 0.65}
                x2={0}
                y2={r.s * 1.3}
                stroke="#EDEAE2"
                strokeWidth={1.4}
              />
              {/* Glowing Central Laser Dot */}
              <circle r={2.2} fill="#ED3C3F" opacity={0.95} />
            </g>
          ))}
        </g>
      </svg>

      {/* ── Dual-Pass Spider-Sense Chromatic Glitch Overlays ────────────────── */}
      <div
        ref={glitchRedRef}
        className="absolute inset-0 pointer-events-none opacity-0 mix-blend-screen bg-[#ED3C3F]"
      />
      <div
        ref={glitchBlueRef}
        className="absolute inset-0 pointer-events-none opacity-0 mix-blend-screen bg-[#3B82F6]"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTED CONTINUOUS VERTICAL SPIDER-MAN SIGNAL CITY BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
export default function ContinuousSectionsBg() {
  return (
    <ViewportLazyScene
      className="absolute inset-0 z-0 pointer-events-none"
      rootMargin="500px 0px"
    >
      <div className="sticky top-0 h-screen w-full pointer-events-none overflow-hidden">
        {/* Ambient Spidey Crimson Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(850px 580px at 65% 32%, rgba(237, 60, 63, 0.18), transparent 70%)",
          }}
        />
        {/* Electric Blue Secondary Rim Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(700px 480px at 20% 70%, rgba(59, 130, 246, 0.12), transparent 70%)",
          }}
        />
        {/* Fine atmospheric vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            boxShadow: "inset 0 0 180px 60px rgba(0, 0, 0, 0.65)",
          }}
        />
        <SignalCityCanvas />
      </div>
    </ViewportLazyScene>
  );
}
