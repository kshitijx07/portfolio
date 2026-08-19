"use client";

import { Canvas } from "@react-three/fiber";
import HelloModel from "@/components/canvas/HelloModel";
import BackgroundEffects from "@/components/canvas/BackgroundEffects";
import HeroHUD from "@/components/dom/HeroHUD";

export default function HeroPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#00104A] text-white select-none">
      {/* 1. Interactive WebGL Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 4.8], fov: 42 }}
        >
          <ambientLight intensity={0.6} />
          <BackgroundEffects />
          <HelloModel />
        </Canvas>
      </div>

      {/* 2. Bold Display Typography (Layered with WebGL) */}
      <div className="absolute bottom-16 left-6 md:left-10 z-10 max-w-2xl pointer-events-none">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.02]">
          I Bring
          <br />
          Craft & Taste
          <br />
          To Digital Work
        </h1>
      </div>

      {/* 3. Real-time Telemetry & Header HUD */}
      <HeroHUD />
    </main>
  );
}
