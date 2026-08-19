"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ShieldCheck, Activity } from "lucide-react";
import * as THREE from "three";
import HeroFloatingArtifacts from "@/components/sections/HeroFloatingArtifacts";

export default function TechnicalHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);
  const [timeString, setTimeString] = useState("12:22 31°C");
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 50]);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const time = new Intl.DateTimeFormat([], istOptions).format(now);
      setTimeString(`${time} 31°C`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) {
      setIsLowPower(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Three.js Scene Setup for Glossy Liquid Blue Sculpture
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.TorusKnotGeometry(1.35, 0.42, 140, 36, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1A44FF,
      emissive: 0x07145C,
      roughness: 0.08,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xB7FF00,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const blueKeyLight = new THREE.PointLight(0x203DFF, 4.5, 25);
    blueKeyLight.position.set(5, 5, 5);
    scene.add(blueKeyLight);

    const cyanRimLight = new THREE.PointLight(0x00E5FF, 3.5, 20);
    cyanRimLight.position.set(-5, -3, 3);
    scene.add(cyanRimLight);

    const limeAccentLight = new THREE.PointLight(0xB7FF00, 2.5, 15);
    limeAccentLight.position.set(0, -4, 4);
    scene.add(limeAccentLight);

    const ambientLight = new THREE.AmbientLight(0x07145C, 1.2);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let velocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.004, 0.2);
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      mouseX = nx;
      mouseY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      velocity *= 0.94;

      mesh.rotation.x += 0.004 + targetY * 0.015 + velocity * 0.015;
      mesh.rotation.y += 0.007 + targetX * 0.015 + velocity * 0.015;

      particles.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mx-4 md:-mx-8 px-4 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#07145C] via-[#091967] to-[#050505] text-white border-b border-[var(--border-color)]"
    >
      {/* Generative Dot Grid & Volumetric Glow Mesh (Reference Screenshot) */}
      <div className="absolute inset-0 opacity-25 hud-dot-grid pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#203DFF]/35 blur-[140px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#6F82FF]/20 blur-[110px] rounded-full" />
      </div>

      <div className="max-w-[1500px] mx-auto relative z-10 space-y-6">
        {/* Top Massive Grotesk Headline (Reference Composition) */}
        <motion.div style={{ y: yParallax }} className="relative z-20 space-y-2 pointer-events-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-display font-extrabold tracking-tighter text-white leading-[0.92] max-w-5xl uppercase select-none drop-shadow-sm">
            I BUILD <br />
            DIGITAL & CLOUD <br />
            SYSTEMS THAT FEEL ALIVE.
          </h1>
        </motion.div>

        {/* 3D Liquid Canvas & Layered Floating Mixed-Media Stickers */}
        <div className="relative min-h-[380px] md:min-h-[460px] flex items-center justify-center">
          {/* Floating Artifacts (Heart sticker, 2026 badge, 3D cursor, etc.) */}
          <HeroFloatingArtifacts />

          {/* 3D Liquid Sculpture Canvas */}
          {!isLowPower ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-95">
              <canvas
                ref={canvasRef}
                className="w-full max-w-[660px] h-[380px] md:h-[460px] pointer-events-auto cursor-grab active:cursor-grabbing"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-30">
              <div className="w-64 h-64 border-2 border-dashed border-[#203DFF] rounded-full animate-spin-slow" />
            </div>
          )}
        </div>

        {/* Bottom Hero Narrative & Telemetry Bar (Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-white/15 font-mono text-xs text-white/80 items-end">
          {/* Left: Bio Narrative */}
          <div className="md:col-span-8 space-y-1">
            <p className="leading-relaxed text-white/90 text-xs sm:text-sm font-sans max-w-2xl">
              I'm <strong className="text-white font-bold font-mono">Kshitij Kumbhar</strong>, DevOps Intern @ Colgate-Palmolive (Mumbai Hybrid). Building scalable Kubernetes clusters, multi-agent AI systems, and automated CI/CD infrastructure.
            </p>
          </div>

          {/* Right: Live Telemetry & Status Ring Glyph */}
          <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-6 font-mono text-xs">
            <div className="text-white/80 font-bold">
              <span>{timeString}</span>
              <span className="text-[var(--accent-acid)] block text-[10px]">PUNE / INDIA</span>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              <span className="w-3 h-3 rounded-full border-2 border-[var(--accent-acid)] border-t-transparent animate-spin" />
              <span className="text-[11px] font-bold text-white">SYS // ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
