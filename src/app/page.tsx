"use client";

import HeroAboutScene from "@/components/canvas/HeroAboutScene";
import PolarityCard from "@/components/dom/PolarityCard";
import HeroHUD from "@/components/dom/HeroHUD";
import { ScrambleText } from "@/components/ui/scramble-text";

export default function HomePage() {
  return (
    <main className="relative min-h-[200vh] w-full bg-[#00104A] text-white selection:bg-[#B4F342] selection:text-black">
      {/* Fixed 3D Canvas Scene */}
      <HeroAboutScene />

      {/* Fixed HUD Overlay (Coordinates, Nav, Weather, Grid Crosshairs) */}
      <HeroHUD />

      {/* SECTION 1: HERO VIEWPORT */}
      <section className="relative z-10 flex h-screen w-full flex-col justify-end p-8 md:p-14 pb-20">
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

      {/* SECTION 2: ABOUT / BIO VIEWPORT (Smoothed out of Hero) */}
      <section className="relative z-10 flex min-h-screen w-full items-center bg-[#050505]/85 backdrop-blur-md px-8 py-20 md:px-14 border-t border-white/10">
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
    </main>
  );
}
