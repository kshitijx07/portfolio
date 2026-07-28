"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Move } from "lucide-react";

const skillsList = [
  "React.js", "Next.js 15", "AWS Cloud", "Docker", "Kubernetes",
  "Jenkins", "Node.js", "Spring Boot", "MongoDB", "MySQL",
  "TypeScript", "Tailwind", "Framer Motion", "Linux OS", "Git"
];

export default function Skills3DSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Orbiting group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Create 3D Nodes on a Fibonacci sphere distribution
    const count = skillsList.length;
    const radius = 4.2;

    // Materials
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 256;
    textCanvas.height = 64;

    const nodes: THREE.Mesh[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Create a canvas texture for skill badge label
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFDF9";
        ctx.roundRect(4, 4, 248, 56, 12);
        ctx.fill();
        ctx.strokeStyle = "#E8E3DA";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#1A1918";
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(skillsList[i], 128, 32);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(2.2, 0.55, 1);
      sprite.position.set(x, y, z);

      sphereGroup.add(sprite);
    }

    // Inner orbital rings
    const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc86d51, transparent: true, opacity: 0.2 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    sphereGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    sphereGroup.add(ring2);

    // Interactive Drag to Spin Momentum
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocityX = 0;
    let velocityY = 0.005; // Ambient slow spin

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      velocityY = deltaX * 0.005;
      velocityX = deltaY * 0.005;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener("mousedown", onPointerDown);
    domElem.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    domElem.addEventListener("touchstart", onPointerDown);
    domElem.addEventListener("touchmove", onPointerMove);
    window.addEventListener("touchend", onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Inertia spin
      sphereGroup.rotation.y += velocityY;
      sphereGroup.rotation.x += velocityX;

      // Friction damping
      if (!isDragging) {
        velocityY *= 0.96;
        velocityX *= 0.96;

        // Ambient rotation baseline
        if (Math.abs(velocityY) < 0.002) velocityY = 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElem.removeEventListener("mousedown", onPointerDown);
      domElem.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      domElem.removeEventListener("touchstart", onPointerDown);
      domElem.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="bento-card relative w-full flex flex-col justify-between" data-cursor="Spin 3D">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div>
          <span className="bento-label">SKILLS SYSTEM // CHAPTER 04</span>
          <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
            3D Skill Constellation
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#6E6C68] font-mono bg-[#EFECE6] px-3 py-1.5 rounded-full">
          <Move size={14} className="text-[#C86D51]" />
          <span>Drag to Spin 3D</span>
        </div>
      </div>

      <p className="text-xs text-[#6E6C68] font-sans mb-4">
        Interactive 3D constellation sphere. Drag, spin, and orbit around the technical skills ecosystem.
      </p>

      {/* 3D R3F / Three Canvas Mount */}
      <div ref={mountRef} className="w-full h-[360px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden" />
    </div>
  );
}
