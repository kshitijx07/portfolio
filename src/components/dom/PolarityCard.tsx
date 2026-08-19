"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export interface PolarityCardProps {
  name: string;
}

export default function PolarityCard({ name }: PolarityCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  // Pure procedural generative vector animation inside the card (Zero static images)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let t = 0;

    const render = () => {
      t += 0.025;
      const w = canvas.width;
      const h = canvas.height;

      // Dark background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, w, h);

      // 1. Procedural Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Procedural Dynamic Sine Waveforms (Network Telemetry)
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.strokeStyle = j === 0 ? "rgba(77, 238, 234, 0.7)" : j === 1 ? "rgba(180, 243, 66, 0.5)" : "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = j === 0 ? 2 : 1;

        for (let x = 0; x < w; x += 3) {
          const freq = 0.02 + j * 0.01;
          const amp = 35 + j * 15;
          const y = h * 0.5 + Math.sin(x * freq + t * (1.5 + j * 0.5)) * amp * Math.cos(t * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 3. Central Radar Orbital Ring
      const cx = w * 0.5;
      const cy = h * 0.45;
      const r = 48 + Math.sin(t * 2) * 4;

      ctx.strokeStyle = "rgba(77, 238, 234, 0.4)";
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(180, 243, 66, 0.6)";
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.65, t, t + Math.PI * 1.2);
      ctx.stroke();

      // Scanning line
      const scanY = (Math.sin(t * 1.2) * 0.5 + 0.5) * h;
      ctx.fillStyle = "rgba(77, 238, 234, 0.15)";
      ctx.fillRect(0, scanY - 2, w, 4);

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-80 overflow-hidden border border-white/10 rounded-sm bg-black group"
    >
      {/* 100% Procedural Generative Canvas (Zero static images) */}
      <motion.div
        className="w-full h-full"
        initial={{ filter: "invert(1) brightness(0.8)" }}
        animate={{
          filter: isInView ? "invert(0) brightness(1)" : "invert(1) brightness(0.8)",
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <canvas
          ref={canvasRef}
          width={256}
          height={320}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative Handwritten Overlay Signature */}
      <div className="absolute top-4 left-4 font-serif italic text-2xl text-[#B4F342] pointer-events-none drop-shadow-md select-none">
        {name}
      </div>

      {/* Telemetry Tag */}
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-white/70 uppercase">
        PRN // 202301040119
      </div>
    </div>
  );
}
