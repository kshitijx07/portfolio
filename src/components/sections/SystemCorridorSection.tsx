"use client";

import React from "react";
import ImageStreamHero from "@/components/ui/image-stream-hero";
import ScrambleText from "@/components/ui/ScrambleText";

const SYSTEM_STREAM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "Distributed Cloud Mesh & High Throughput Networking",
  },
  {
    src: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
    alt: "Automated Kubernetes Pod Orchestration & CI/CD Pipeline",
  },
  {
    src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop",
    alt: "AI Multi-Agent RAG Swarm & Vector Index Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    alt: "High-Availability Serverless Cloud Infrastructure",
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    alt: "Abstract Gravitational Gradient Field & System Telemetry",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    alt: "Production Server Rack & Enterprise Network Grid",
  },
];

export default function SystemCorridorSection() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--border-color)] bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/15">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[var(--accent-acid)] shadow-[0_0_8px_rgba(183,255,0,0.6)]" />
            <span className="font-mono text-xs text-[var(--accent-acid)] font-extrabold uppercase tracking-wider">
              03 // 3D PERSPECTIVE ARTIFACTS STREAM
            </span>
          </div>
          <span className="font-mono text-xs text-white/60">
            SYSTEM_CORRIDOR // LIVE_RAILS
          </span>
        </div>

        <ImageStreamHero
          images={SYSTEM_STREAM_IMAGES}
          cards={9}
          speed={22}
          axis={52}
          className="h-[420px] md:h-[480px] w-full border border-white/15 bg-[#0D0D0D] relative"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-10 px-6 text-center pointer-events-none select-none">
            <div className="space-y-2">
              <span className="hud-tag hud-tag-acid text-[9px]">
                INFRASTRUCTURE & ARTIFACTS
              </span>
              <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white uppercase tracking-tight max-w-2xl leading-[0.98]">
                <ScrambleText text="Living Architecture in Continuous Motion." />
              </h3>
            </div>
            <p className="max-w-md font-mono text-xs text-white/70 bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-md">
              Synchronized 3D perspective rail stream representing containerized workloads, multi-agent topologies, and cloud microservices.
            </p>
          </div>
        </ImageStreamHero>
      </div>
    </section>
  );
}
