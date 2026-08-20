"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { pointerUv, pointerState, subscribeScroll } from "@/lib/bus";
import ViewportLazyScene from "./ViewportLazyScene";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 🕷️ SPIDER-MAN SIGNAL CITY & WEB TRAJECTORY BACKGROUND (ContinuousSectionsBg.tsx)
 * ──────────────────────────────────────────────────────────────────────────────
 * High-performance continuous background for Sections 2–5 featuring:
 * 1. Multi-Layer NYC / Pune Skyscraper Skyline Silhouettes (Far & Near).
 * 2. Dynamic Web-Slinging Trajectory Arcs with continuous kinetic flow.
 * 3. Spider-Sense Crosshair Target Reticles with organic bobbing & rotation.
 * 4. Dual-Chromatic Spider-Sense Glitch Pulse (#ED3C3F & #2B6CFF).
 * 5. Bus-driven multi-layer parallax response & scroll depth synchronization.
 * ══════════════════════════════════════════════════════════════════════════════
 */

// Procedural Skyline Silhouette Generator
function buildSkyline(count: number, seed: number, minH: number, maxH: number) {
  const buildings: { x: number; w: number; h: number }[] = [];
  let x = -20;
  let i = 0;
  while (x < 1520) {
    const w = 28 + ((Math.sin(seed + i * 12.9) + 1) / 2) * 48;
    const h = minH + ((Math.sin(seed * 1.7 + i * 5.3) + 1) / 2) * (maxH - minH);
    buildings.push({ x, w, h });
    x += w + 6;
    i++;
    if (i > count) break;
  }
  return buildings;
}

const FAR_BUILDINGS = buildSkyline(60, 2.1, 70, 180);
const NEAR_BUILDINGS = buildSkyline(24, 7.4, 110, 280);

const ARCS = [
  "M -80 620 Q 380 420 760 560 T 1520 480",
  "M -60 220 Q 300 60 700 180 T 1480 120",
  "M 120 780 Q 560 560 940 700 T 1560 640",
  "M -100 420 Q 420 260 820 380 T 1500 320",
  "M 60 90 Q 480 240 860 110 T 1500 200",
];

const RETICLES = [
  { x: 220, y: 160, s: 22 },
  { x: 1180, y: 300, s: 16 },
  { x: 760, y: 620, s: 26 },
  { x: 420, y: 440, s: 18 },
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
          farRef.current.style.opacity = "0.26";
          farRef.current.style.transform = "translateY(0)";
        }
        if (nearRef.current) {
          nearRef.current.style.opacity = "0.45";
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
          htmlEl.style.opacity = "0.35";
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
        { d: 0, rx: -5, bx: 5, op: 0.35 },
        { d: 50, rx: 3, bx: -3, op: 0.35 },
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
      const scrollShiftY = (scrollProgress - 0.5) * 40;

      if (farRef.current) {
        farRef.current.style.transform = `translate(${px * 12}px, ${py * 8 + scrollShiftY * 0.4}px)`;
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translate(${px * 24}px, ${py * 14 + scrollShiftY * 0.8}px)`;
      }
      if (arcsRef.current) {
        arcsRef.current.style.transform = `translate(${px * 18}px, ${py * 10 + scrollShiftY * 0.6}px)`;
      }
      if (reticlesRef.current) {
        reticlesRef.current.style.transform = `translate(${px * 32}px, ${py * 20 + scrollShiftY}px)`;
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
        const flow = ((elapsed * (16 + i * 3)) % len) - len * 0.15;
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
          "radial-gradient(ellipse 120% 90% at 50% 38%, #14141c 0%, #0c0c10 45%, #08080b 100%)",
      }}
    >
      {/* ── Micro-Dot Signal Matrix ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#EDEAE2 1.2px, transparent 1.2px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* ── Spider-Man Skyline & Trajectory Vector Canvas ─────────────────── */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* 1. Web-Slinging Trajectory Arcs */}
        <g ref={arcsRef}>
          {ARCS.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                arcPathRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke={i === 2 ? "#ED3C3F" : "#EDEAE2"}
              strokeWidth={i === 2 ? 1.4 : 1.1}
              opacity={i === 2 ? 0.38 : 0.16}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* 2. Far Skyline Silhouettes */}
        <g ref={farRef} fill="#10111A">
          {FAR_BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={800 - b.h} width={b.w} height={b.h} />
          ))}
        </g>

        {/* 3. Near Skyline Silhouettes with Glowing Red Antenna Beacons */}
        <g ref={nearRef} fill="#0c0c10">
          {NEAR_BUILDINGS.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={800 - b.h} width={b.w} height={b.h} />
              {i % 3 === 0 && (
                <circle
                  cx={b.x + b.w * 0.3}
                  cy={800 - b.h + 6}
                  r={1.8}
                  fill="#ED3C3F"
                  opacity={0.8}
                />
              )}
            </g>
          ))}
        </g>

        {/* 4. Spider-Sense Target Reticles */}
        <g ref={reticlesRef}>
          {RETICLES.map((r, i) => (
            <g
              key={i}
              transform={`translate(${r.x} ${r.y})`}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle r={r.s} fill="none" stroke="#EDEAE2" strokeWidth={1} />
              <line
                x1={-r.s * 1.4}
                y1={0}
                x2={-r.s * 0.6}
                y2={0}
                stroke="#EDEAE2"
                strokeWidth={1}
              />
              <line
                x1={r.s * 0.6}
                y1={0}
                x2={r.s * 1.4}
                y2={0}
                stroke="#EDEAE2"
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={-r.s * 1.4}
                x2={0}
                y2={-r.s * 0.6}
                stroke="#EDEAE2"
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={r.s * 0.6}
                x2={0}
                y2={r.s * 1.4}
                stroke="#EDEAE2"
                strokeWidth={1}
              />
              {/* Central Aiming Dot */}
              <circle r={1.5} fill="#ED3C3F" opacity={0.85} />
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
      <div className="sticky top-0 h-screen w-full pointer-events-none opacity-90 overflow-hidden">
        {/* Ambient Spidey Crimson Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(750px 500px at 65% 32%, rgba(237, 60, 63, 0.12), transparent 70%)",
          }}
        />
        {/* Fine atmospheric vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            boxShadow: "inset 0 0 200px 70px rgba(0, 0, 0, 0.7)",
          }}
        />
        <SignalCityCanvas />
      </div>
    </ViewportLazyScene>
  );
}
