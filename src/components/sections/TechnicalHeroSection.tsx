"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import * as THREE from "three";
import HeroFloatingArtifacts from "@/components/sections/HeroFloatingArtifacts";
import MagneticButton from "@/components/ui/MagneticButton";

export default function TechnicalHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  // Central Scroll Timeline Observer for Hero (170vh space)
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothProgress = useSpring(scrollYProgress, { damping: 26, stiffness: 220 });

  // Opposing Typographic Motion Vectors (Choreographed Line by Line)
  const line1X = useTransform(smoothProgress, [0, 0.8], [0, -25]);
  const line1Y = useTransform(smoothProgress, [0, 0.8], [0, -60]);
  const line2X = useTransform(smoothProgress, [0, 0.8], [0, 20]);
  const line2Y = useTransform(smoothProgress, [0, 0.8], [0, -45]);
  const line3X = useTransform(smoothProgress, [0, 0.8], [0, -35]);
  const line3Y = useTransform(smoothProgress, [0, 0.8], [0, -25]);
  const line4X = useTransform(smoothProgress, [0, 0.8], [0, 30]);
  const line4Y = useTransform(smoothProgress, [0, 0.8], [0, 0]);

  // 3D Object Scroll Morph Vectors
  const object3DX = useTransform(smoothProgress, [0, 0.9], [0, 50]);
  const object3DY = useTransform(smoothProgress, [0, 0.9], [0, -30]);
  const object3DScale = useTransform(smoothProgress, [0, 0.9], [1, 0.92]);
  const heroOpacity = useTransform(smoothProgress, [0.75, 0.98], [1, 0]);

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
    if (containerRef.current) observer.observe(containerRef.current);

    // Three.js Scene Setup for Glossy Liquid Balloon Sculpture
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

    const particleCount = 45;
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

      const scrollFraction = scrollYProgress.get();
      const currentScrollVel = Math.min(Math.abs(scrollVelocity.get()) * 0.001, 0.15);

      mesh.rotation.x += 0.004 + targetY * 0.015 + velocity * 0.015 + scrollFraction * 0.01;
      mesh.rotation.y += 0.007 + targetX * 0.015 + velocity * 0.015 + scrollFraction * 0.02 + currentScrollVel;
      camera.position.z = 5.2 - scrollFraction * 0.6;

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
  }, [scrollYProgress, scrollVelocity]);

  return (
    <div ref={containerRef} className="relative min-h-[160vh] md:min-h-[175vh]">
      {/* Sticky Full-Viewport Hero Experience Container */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="sticky top-0 left-0 w-full min-h-screen -mx-4 md:-mx-8 px-4 md:px-8 pt-20 md:pt-26 pb-16 md:pb-20 overflow-hidden bg-gradient-to-b from-[#07145C] via-[#091967] to-[#050505] text-white border-b border-[var(--border-color)] flex flex-col justify-between"
      >
        {/* Generative Dot Grid & Volumetric Glow Mesh */}
        <div className="absolute inset-0 opacity-25 hud-dot-grid pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#203DFF]/35 blur-[140px] rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#6F82FF]/20 blur-[110px] rounded-full" />
        </div>

        <div className="max-w-[1500px] mx-auto w-full relative z-10 flex flex-col justify-between flex-1 space-y-6">
          {/* Top 3-Column Sparse Metadata Strip */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-5 border-b border-white/15 font-mono text-xs text-white/80">
            <div className="md:col-span-4 space-y-1">
              <span className="text-[var(--accent-acid)] font-bold block">
                // DEVOPS & CLOUD ENGINEERING
              </span>
              <span className="text-white/60 text-[11px] block">
                AWS EKS • Terraform • Multi-Agent AI
              </span>
            </div>

            <div className="md:col-span-4 space-y-1">
              <p className="leading-relaxed text-white/90">
                Thinking in systems. Building with scale.
              </p>
            </div>

            <div className="md:col-span-4 space-y-1 md:text-right">
              <p className="text-white font-bold">
                DevOps Intern @ Colgate-Palmolive
              </p>
              <p className="text-white/60 text-[11px]">
                Pune, India • B.Tech CS @ MIT AOE (CGPA 8.48/10)
              </p>
            </div>
          </div>

          {/* Headline (74px bold grotesk with opposing vectors) */}
          <div className="relative z-20 pointer-events-none select-none my-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-display font-extrabold tracking-tighter text-white leading-[0.92] max-w-5xl uppercase drop-shadow-sm space-y-1">
              <motion.span style={{ x: line1X, y: line1Y }} className="block">
                I BUILD
              </motion.span>
              <motion.span style={{ x: line2X, y: line2Y }} className="block">
                DIGITAL & CLOUD
              </motion.span>
              <motion.span style={{ x: line3X, y: line3Y }} className="block">
                SYSTEMS THAT
              </motion.span>
              <motion.span style={{ x: line4X, y: line4Y }} className="block text-[var(--accent-acid)]">
                SCALE.
              </motion.span>
            </h1>
          </div>

          {/* 3D Liquid Canvas & Layered Floating Mixed-Media Stickers */}
          <motion.div
            style={{ x: object3DX, y: object3DY, scale: object3DScale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <HeroFloatingArtifacts />

            {!isLowPower ? (
              <canvas
                ref={canvasRef}
                className="w-full max-w-[640px] h-[360px] md:h-[440px] pointer-events-auto cursor-grab active:cursor-grabbing"
              />
            ) : (
              <div className="w-64 h-64 border-2 border-dashed border-[#203DFF] rounded-full animate-spin-slow opacity-30" />
            )}
          </motion.div>

          {/* Bottom Hero Narrative & Magnetic Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/15 font-mono text-xs">
            <div className="flex items-center gap-3">
              <MagneticButton>
                <a
                  href="#work"
                  data-cursor="Work"
                  className="hud-btn hud-tag-acid"
                >
                  <span>Selected Work</span>
                  <ArrowDown size={13} />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="/Kshitij_Kumbhar_Resume.pdf"
                  download="Kshitij_Kumbhar_Resume.pdf"
                  data-cursor="Download"
                  className="hud-btn bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <span>CV PDF</span>
                  <ArrowUpRight size={13} />
                </a>
              </MagneticButton>
            </div>

            <div className="flex items-center gap-4 text-white/70">
              <span>GMT+05:30 // IN / PUNE</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-acid)] animate-pulse" />
                <span className="text-white font-bold">SYS // ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
