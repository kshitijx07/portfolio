"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ShieldCheck, Terminal, Sparkles } from "lucide-react";
import * as THREE from "three";

export default function TechnicalHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 80]);

  // Three.js Interactive 3D Liquid Torus Knot Centerpiece (Creative-Coding Ethereal Object)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Liquid Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.38, 128, 32, 2, 3);
    
    // Chromatic Iridescent Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1A2B50,
      emissive: 0x050D1A,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Glowing Wireframe Overlay
    const wireGeo = new THREE.TorusKnotGeometry(1.41, 0.385, 64, 16, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xB7FF00,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Dynamic Lights
    const pointLight1 = new THREE.PointLight(0xB7FF00, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00D2FF, 3, 20);
    pointLight2.position.set(-4, -4, 4);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
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

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mesh.rotation.x += 0.005 + targetY * 0.02;
      mesh.rotation.y += 0.008 + targetX * 0.02;

      wireMesh.rotation.x = mesh.rotation.x;
      wireMesh.rotation.y = mesh.rotation.y;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* 3-Column Editorial Asymmetric Header Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-[var(--border-color)] font-mono text-xs text-[var(--text-secondary)]">
        {/* Column 1: Identity & Category */}
        <div className="md:col-span-3 space-y-1">
          <span className="text-[var(--text-primary)] font-bold block">
            Design & Engineering
          </span>
          <span className="text-[var(--accent-acid)] block">
            // Cloud Systems Architect
          </span>
        </div>

        {/* Column 2: Design Philosophy Statement */}
        <div className="md:col-span-4 space-y-1">
          <p className="leading-relaxed">
            Thinking in systems. Designing with precision, high-concurrency craft, and scale.
          </p>
        </div>

        {/* Column 3: Narrative Bio */}
        <div className="md:col-span-5 space-y-2">
          <p className="leading-relaxed text-[var(--text-primary)]">
            I'm <strong className="text-[var(--text-primary)] font-semibold">Kshitij Kumbhar</strong>, engineering DevOps pipelines, Kubernetes infrastructure on AWS EKS, and resilient full-stack systems.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-acid)]" />
            <span>Currently DevOps Intern @ Colgate-Palmolive</span>
          </div>
        </div>
      </div>

      {/* Massive Editorial Headline & Interactive 3D Canvas Stage */}
      <div className="relative mt-8 md:mt-12 min-h-[380px] md:min-h-[460px] flex flex-col justify-between">
        {/* 3D Liquid Object Canvas Positioned Centrally */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-85">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[620px] h-[360px] md:h-[440px] pointer-events-auto cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* Massive Editorial Typography (Tight Tracking, Clamp Scale) */}
        <motion.div style={{ y: yParallax }} className="relative z-10 space-y-4 pointer-events-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold tracking-tighter text-[var(--text-primary)] leading-[0.95] max-w-5xl uppercase select-none">
            I BUILD DIGITAL & CLOUD SYSTEMS THAT FEEL ALIVE.
          </h1>
        </motion.div>

        {/* Bottom Hero Control Matrix */}
        <div className="relative z-10 pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="#work"
              className="hud-btn hud-tag-acid"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="hud-btn"
            >
              <span>CV PDF</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--accent-acid)]" />
            <span>AWS EKS • KUBERNETES • DOCKER • CI/CD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
