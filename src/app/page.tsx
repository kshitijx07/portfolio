"use client";

import { Canvas } from "@react-three/fiber";
import HeroAboutScene from "@/components/canvas/HeroAboutScene";
import WarpCorridor from "@/components/canvas/WarpCorridor";
import PolarityCard from "@/components/dom/PolarityCard";
import HeroHUD from "@/components/dom/HeroHUD";
import ContactClosingSection from "@/components/dom/ContactClosingSection";
import { ScrambleText } from "@/components/ui/scramble-text";

export default function PortfolioPage() {
  return (
    <div className="relative w-full bg-[#00104A] text-white selection:bg-[#B4F342] selection:text-black">
      {/* Fixed 3D Canvas Scene for Hero & About */}
      <HeroAboutScene />

      {/* Fixed HUD Overlay (Coordinates, Nav, Weather, Grid Crosshairs) */}
      <HeroHUD />

      {/* SECTION 1: HERO VIEWPORT */}
      <section id="home" className="relative z-10 flex h-screen w-full flex-col justify-end p-8 md:p-14 pb-20">
        <div className="max-w-3xl">
          <div className="mb-4">
            <ScrambleText
              text="DEVOPS & CLOUD ARCHITECT // FULL-STACK DEVELOPER"
              className="text-xs tracking-widest text-[#4DEEEA]"
            />
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.98]">
            I Bring
            <br />
            Craft & Taste
            <br />
            To Digital Work
          </h1>
        </div>
      </section>

      {/* SECTION 2: ABOUT / BIO VIEWPORT */}
      <section id="about" className="relative z-10 flex min-h-screen w-full items-center bg-[#050505]/85 backdrop-blur-md px-8 py-20 md:px-14 border-t border-white/10">
        <div className="grid w-full grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photo with Polarity Negative-to-Positive Entrance */}
          <div className="md:col-span-4 flex flex-col items-start">
            <PolarityCard
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
              name="Kshitij"
            />
          </div>

          {/* Right Column: Bio Statement & Active Projects */}
          <div className="md:col-span-8 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-snug tracking-tight text-white/95">
              I explore how to shape <span className="font-semibold text-white">cloud infrastructure</span> and <span className="font-semibold text-white">microservices</span> with craft and taste, building the next generation of scalable architectures.
            </h2>

            <p className="mt-8 text-base text-[#8A8F98] leading-relaxed">
              Currently engineering automated CI/CD pipelines, containerized deployments on <strong className="text-white">AWS EKS</strong>, and multi-agent RAG swarms using LangGraph. Focused on removing deployment friction and scaling distributed systems.
            </p>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-6 font-mono text-xs text-[#8A8F98]">
              <div>
                <span className="block text-white">LEETCODE</span>
                <span>@kshitij72</span>
              </div>
              <div>
                <span className="block text-white">CODEFORCES</span>
                <span>@kshitijx07</span>
              </div>
              <div>
                <span className="block text-white">LOCATION</span>
                <span>Pune, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DOM PROJECT GRID */}
      <section id="work" className="relative z-10 min-h-screen bg-[#050505] px-6 py-24 md:px-14 border-t border-white/10">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4 font-mono text-xs text-[#8A8F98]">
          <div className="text-white font-bold tracking-widest">PROJECT PORTALS</div>
          <div>2024–2026</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: HostelHub */}
          <div className="group relative h-[380px] w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-between overflow-hidden transition-colors hover:border-[#B4F342]">
            {/* Top Tag */}
            <div className="flex justify-between items-start">
              <span className="bg-[#B4F342] px-2 py-0.5 font-mono text-[10px] font-bold text-black uppercase">
                CODING PROJECT
              </span>
              <span className="font-mono text-xs text-white/50">2026</span>
            </div>

            {/* Visual Graphic Representation */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 bg-[#FF4500] px-8 py-6 rounded-full text-black font-black text-2xl tracking-tighter shadow-xl">
                <span>HOSTEL</span>
                <span className="bg-white text-black px-4 py-1 rounded-full text-lg">HUB</span>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="flex justify-between items-end font-mono text-xs text-[#8A8F98]">
              <span>AWS EKS // JENKINS // MERN</span>
              <span className="text-white">PRN // 202301040119</span>
            </div>
          </div>

          {/* Card 2: DSA Swarm AI */}
          <div className="group relative h-[380px] w-full rounded-sm border border-white/10 bg-[#FF3E1D] p-8 flex flex-col justify-between overflow-hidden text-black transition-transform hover:scale-[1.01]">
            <div className="flex justify-between items-start">
              <span className="bg-black px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                CODING PROJECT
              </span>
              <span className="font-mono text-xs text-black/60">2026</span>
            </div>

            <div className="font-mono text-xl md:text-2xl font-bold tracking-tight text-center">
              npx @kshitij/dsa-swarm-ai
            </div>

            <div className="flex justify-between items-end font-mono text-xs text-black/70">
              <span>LANGGRAPH // MCP // PINECONE</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HYPER-SPEED WARP CORRIDOR */}
      <section className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden border-t border-white/10 bg-[#050505]">
        {/* WebGL Streak Shader Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <WarpCorridor />
          </Canvas>
        </div>

        {/* Center Typography Lockup */}
        <div className="relative z-10 text-center select-none px-6">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white leading-none">
            INNOVATE
            <br />
            WITH
            <br />
            PURPOSE
          </h2>
          <div className="mt-8">
            <ScrambleText
              text="HIGH-PERFORMANCE ARCHITECTURES & CLOUD INFRASTRUCTURE"
              className="text-xs tracking-widest text-[#B4F342]"
            />
          </div>
        </div>

        {/* HUD Crosshairs Overlay */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/40" />
          ))}
        </div>
      </section>

      {/* SECTION 5: CONTACT & CLOSING VIEWPORT */}
      <ContactClosingSection />
    </div>
  );
}
