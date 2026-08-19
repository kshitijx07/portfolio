"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ShieldCheck, Terminal, Sparkles } from "lucide-react";
import * as THREE from "three";

export default function TechnicalHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 60]);

  useEffect(() => {
    // Detect reduced motion or touch devices
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

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    // Liquid Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(1.35, 0.36, 128, 32, 2, 3);
    
    // Iridescent Dark Glass & Chrome Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x121A28,
      emissive: 0x040810,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe Structural Overlay
    const wireGeo = new THREE.TorusKnotGeometry(1.36, 0.365, 64, 16, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xB7FF00,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Dynamic Lights
    const pointLight1 = new THREE.PointLight(0xB7FF00, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00D2FF, 2.5, 20);
    pointLight2.position.set(-4, -4, 4);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Velocity & Interaction Physics Tracking
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
      velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.005, 0.25);
      
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

      if (!isVisible) return; // Pause execution when out of viewport for maximum performance

      // Smooth spring interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      velocity *= 0.95; // Decay velocity

      // Velocity-reactive rotation & deformation
      mesh.rotation.x += 0.004 + targetY * 0.015 + velocity * 0.02;
      mesh.rotation.y += 0.006 + targetX * 0.015 + velocity * 0.02;

      wireMesh.rotation.x = mesh.rotation.x;
      wireMesh.rotation.y = mesh.rotation.y;

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
      wireGeo.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* 3-Column Editorial Asymmetric Header Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-[var(--border-color)] font-mono text-xs text-[var(--text-secondary)]">
        {/* Column 1: Identity & Category */}
        <div className="md:col-span-3 space-y-1">
          <span className="text-[var(--text-primary)] font-bold block">
            KSHITIJ.DESIGN
          </span>
          <span className="text-[var(--accent-acid)] block font-bold">
            // DEVOPS & CLOUD ENGINEER
          </span>
        </div>

        {/* Column 2: System Statement */}
        <div className="md:col-span-4 space-y-1">
          <p className="leading-relaxed">
            Thinking in systems. Engineering scalable Kubernetes clusters, automated CI/CD pipelines & resilient architectures.
          </p>
        </div>

        {/* Column 3: Narrative Bio */}
        <div className="md:col-span-5 space-y-2">
          <p className="leading-relaxed text-[var(--text-primary)]">
            I'm <strong className="text-[var(--text-primary)] font-semibold">Kshitij Kumbhar</strong>, DevOps Intern @ Colgate-Palmolive (Hybrid). Based in Pune, India.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-acid)] animate-pulse" />
            <span>AWS EKS • TERRAFORM • DOCKER • JENKINS CI</span>
          </div>
        </div>
      </div>

      {/* Massive Editorial Headline & Interactive 3D Canvas Stage */}
      <div className="relative mt-8 md:mt-12 min-h-[380px] md:min-h-[460px] flex flex-col justify-between">
        {/* 3D Liquid Object Canvas (Paused off-screen, Velocity reactive) */}
        {!isLowPower ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-85">
            <canvas
              ref={canvasRef}
              className="w-full max-w-[620px] h-[360px] md:h-[440px] pointer-events-auto cursor-grab active:cursor-grabbing"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-25">
            <div className="w-64 h-64 border border-dashed border-[var(--accent-acid)] rounded-full animate-spin-slow" />
          </div>
        )}

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
              data-cursor="Projects"
              className="hud-btn hud-tag-acid"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              data-cursor="Download"
              className="hud-btn"
            >
              <span>CV PDF</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--accent-acid)]" />
            <span>K8S ORCHESTRATION • RESTFUL APIS • CI/CD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
