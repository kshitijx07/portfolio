"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Parallax3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf9f7f4, 0.02);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfffdf9, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc86d51, 1.2);
    dirLight.position.set(12, 18, 10);
    scene.add(dirLight);

    // Group for 3D depth objects
    const planesGroup = new THREE.Group();
    scene.add(planesGroup);

    // Translucent 3D Paper Planes
    const planeGeo = new THREE.PlaneGeometry(3.5, 4.5);
    const planeMats = [
      new THREE.MeshStandardMaterial({ color: 0xfffdf9, roughness: 0.8, transparent: true, opacity: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0xc86d51, roughness: 0.7, transparent: true, opacity: 0.25 }),
      new THREE.MeshStandardMaterial({ color: 0xd8c4b6, roughness: 0.8, transparent: true, opacity: 0.4 }),
    ];

    const planeItems: { mesh: THREE.Mesh; depthFactor: number; rotSpeed: number }[] = [];

    for (let i = 0; i < 12; i++) {
      const mat = planeMats[i % planeMats.length];
      const mesh = new THREE.Mesh(planeGeo, mat);
      const depth = (Math.random() - 0.5) * 16;

      mesh.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 30,
        depth
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.5
      );

      planesGroup.add(mesh);
      planeItems.push({
        mesh,
        depthFactor: (depth + 10) / 20 + 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.002,
      });
    }

    // Floating Dust Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 60;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 35;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xc86d51,
      transparent: true,
      opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Mouse & Scroll Parallax Listeners
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse & scroll
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      if (!prefersReducedMotion) {
        // Parallax background shifts
        planesGroup.position.y = scrollY * 0.003;
        planesGroup.rotation.y = mouseX * 0.08;
        planesGroup.rotation.x = -mouseY * 0.08;

        particlesMesh.rotation.y = elapsedTime * 0.03;

        planeItems.forEach((item) => {
          item.mesh.rotation.z += item.rotSpeed;
          item.mesh.position.y += Math.sin(elapsedTime + item.mesh.position.x) * 0.001;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-65 overflow-hidden"
    />
  );
}
