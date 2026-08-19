"use client";

import React, { useEffect, useRef } from "react";

interface PixelParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function PixelCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Strictly enable only on desktop devices with a fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: PixelParticle[] = [];
    const maxParticles = 14; // Small, ultra-efficient particle pool
    let lastX = -100;
    let lastY = -100;
    const colors = ["#B7FF00", "#C6FF00", "#FFFFFF"];

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn pixel particle every 10px distance if under pool cap
      if (dist > 10 && particles.length < maxParticles) {
        lastX = e.clientX;
        lastY = e.clientY;

        const size = Math.floor(Math.random() * 3) + 4; // 4px - 6px square
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: Math.floor(e.clientX / 4) * 4, // Snap to 4px grid for pixel staircase look
          y: Math.floor(e.clientY / 4) * 4,
          size,
          alpha: 0.85,
          color,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: 0,
          maxLife: 18 + Math.random() * 6, // ~300ms lifetime
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);
        p.x += p.vx;
        p.y += p.vy;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
