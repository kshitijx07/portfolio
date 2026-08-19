"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Editorial3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check initial dark theme
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x0f0e0d : 0xf8f6f0, 0.02);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 20;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights with Ethereal Chromatic Aura
    const ambientLight = new THREE.AmbientLight(isDark ? 0x242220 : 0xfffdf9, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(isDark ? 0xe07a5f : 0xc86d51, 1.8);
    dirLight1.position.set(12, 18, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(isDark ? 0x00d2ff : 0x9d7bff, 1.0);
    dirLight2.position.set(-14, -12, 8);
    scene.add(dirLight2);

    // Group for floating 3D holographic & glass objects
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Color palette materials for glass & holographic chrome
    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x1c1b19 : 0xfffdf9,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.7,
        thickness: 0.8,
        transparent: true,
        opacity: 0.65,
      }),
      new THREE.MeshStandardMaterial({
        color: isDark ? 0xe07a5f : 0xc86d51,
        roughness: 0.3,
        metalness: 0.4,
        transparent: true,
        opacity: 0.55,
      }),
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x00d2ff : 0x00b8a3,
        roughness: 0.2,
        metalness: 0.5,
        transparent: true,
        opacity: 0.45,
      }),
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x9d7bff : 0xd8c4b6,
        roughness: 0.3,
        metalness: 0.3,
        transparent: true,
        opacity: 0.5,
      }),
    ];

    const meshItems: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; floatSpeed: number; initialY: number }[] = [];

    // 1. Floating Holographic Glass Octahedrons & Prisms (Y2K / Ethereal)
    const octaGeo = new THREE.OctahedronGeometry(1.2, 0);
    for (let i = 0; i < 8; i++) {
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(octaGeo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14 - 3
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapesGroup.add(mesh);

      meshItems.push({
        mesh,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.003
        ),
        floatSpeed: 0.0015 + Math.random() * 0.001,
        initialY: mesh.position.y,
      });
    }

    // 2. Floating Cyber Glass Torus Rings
    const torusGeo = new THREE.TorusGeometry(1.5, 0.06, 16, 64);
    const torus1 = new THREE.Mesh(torusGeo, materials[1]);
    torus1.position.set(-10, 6, -5);
    shapesGroup.add(torus1);
    meshItems.push({
      mesh: torus1,
      rotSpeed: new THREE.Vector3(0.002, 0.003, 0.001),
      floatSpeed: 0.001,
      initialY: 6,
    });

    const torus2 = new THREE.Mesh(torusGeo, materials[2]);
    torus2.position.set(11, -7, -4);
    shapesGroup.add(torus2);
    meshItems.push({
      mesh: torus2,
      rotSpeed: new THREE.Vector3(-0.002, -0.002, 0.002),
      floatSpeed: 0.0012,
      initialY: -7,
    });

    // 3. Ethereal Stardust Particle Cloud (Pixel & Ethereal vibe)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      color: isDark ? 0x00d2ff : 0xc86d51,
      transparent: true,
      opacity: 0.6,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Theme MutationObserver
    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.getAttribute("data-theme") === "dark";
      scene.fog = new THREE.FogExp2(currentDark ? 0x0f0e0d : 0xf8f6f0, 0.02);
      materials[0].color.setHex(currentDark ? 0x1c1b19 : 0xfffdf9);
      materials[1].color.setHex(currentDark ? 0xe07a5f : 0xc86d51);
      materials[2].color.setHex(currentDark ? 0x00d2ff : 0x00b8a3);
      materials[3].color.setHex(currentDark ? 0x9d7bff : 0xd8c4b6);
      particleMat.color.setHex(currentDark ? 0x00d2ff : 0xc86d51);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Mouse position state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Group parallax rotation
        shapesGroup.rotation.y = mouseX * 0.12;
        shapesGroup.rotation.x = -mouseY * 0.12;

        // Individual mesh animations
        meshItems.forEach((item, index) => {
          item.mesh.rotation.x += item.rotSpeed.x;
          item.mesh.rotation.y += item.rotSpeed.y;
          item.mesh.rotation.z += item.rotSpeed.z;

          // Gentle floating sine wave motion
          item.mesh.position.y = item.initialY + Math.sin(elapsedTime * 0.7 + index) * 0.35;
        });

        // Rotate particle galaxy gently
        particleSystem.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Three.js 3D Canvas */}
      <div
        ref={mountRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-70 transition-opacity duration-1000 overflow-hidden"
      />
      {/* Ethereal Aurora Light Orbs in CSS */}
      <div className="ethereal-aurora-bg">
        <div
          className="aurora-orb w-[450px] h-[450px] top-[-100px] left-[-100px]"
          style={{ background: "radial-gradient(circle, var(--aurora-1) 0%, transparent 70%)" }}
        />
        <div
          className="aurora-orb w-[500px] h-[500px] top-[40%] right-[-150px] animation-delay-2000"
          style={{ background: "radial-gradient(circle, var(--aurora-2) 0%, transparent 70%)" }}
        />
        <div
          className="aurora-orb w-[420px] h-[420px] bottom-[-100px] left-[20%] animation-delay-4000"
          style={{ background: "radial-gradient(circle, var(--aurora-3) 0%, transparent 70%)" }}
        />
      </div>
    </>
  );
}
