"use client";

import { useState, useEffect } from "react";
import ContactGlassScene from "@/components/canvas/ContactGlassScene";
import { subscribePointer } from "@/lib/bus";
import { Globe, Check, Copy } from "lucide-react";

export default function ContactClosingSection() {
  const [coords, setCoords] = useState("0799 X 0613 Y");
  const [copied, setCopied] = useState(false);
  const email = "kshitijkumbhar007@gmail.com";

  useEffect(() => {
    const unsub = subscribePointer((state) => {
      const x = Math.round(state.x * 1000).toString().padStart(4, "0");
      const y = Math.round((1.0 - state.y) * 1000).toString().padStart(4, "0");
      setCoords(`${x} X ${y} Y`);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative h-screen w-full overflow-hidden bg-[#00104A] text-white select-none border-t border-white/10">
      {/* 1. 3D Stacked Glass Letters & Stickers Canvas */}
      <ContactGlassScene />

      {/* 2. Foreground Bold Display Copy (Layered above 3D letters) */}
      <div className="relative z-10 flex h-full w-full items-center justify-center pointer-events-none px-6">
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-center leading-[0.95] max-w-5xl">
          Let's Create
          <br />
          Something
          <br />
          Extraordinary
        </h2>
      </div>

      {/* 3. HUD Crosshair Wireframe Overlay */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="relative border-[0.5px] border-white/5">
            <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">+</span>
          </div>
        ))}
      </div>

      {/* 4. Footer Telemetry & Interactive Actions */}
      <footer className="absolute bottom-0 left-0 w-full z-20 flex flex-col md:flex-row justify-between items-start md:items-end p-8 md:p-12 gap-6 font-mono text-xs text-white/80 border-t border-white/10">
        {/* Email Copy Trigger */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 text-white hover:text-[#B4F342] transition-colors pointer-events-auto group"
          >
            <span className="underline underline-offset-4">{email}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#B4F342]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-[#B4F342]" />
            )}
          </button>
          <div className="text-white/40 text-[10px]">KSHITIJ (C) 2026</div>
        </div>

        {/* Live Coordinate Display */}
        <div className="hidden md:block font-bold text-white tracking-widest">
          {coords}
        </div>

        {/* Social Links & Globe Status */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <a
            href="https://github.com/kshitijx07"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/kshitij-kumbhar"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="https://leetcode.com/u/kshitij72"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LEETCODE
          </a>
          <Globe className="w-4 h-4 text-white/60 animate-spin" />
        </div>
      </footer>
    </section>
  );
}
