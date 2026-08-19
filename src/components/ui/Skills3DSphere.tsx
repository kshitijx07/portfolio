"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Globe2 } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

interface SkillNode {
  name: string;
  category: "cloud" | "backend" | "frontend" | "database" | "tools";
  x: number;
  y: number;
  z: number;
}

const skillsData: { name: string; category: SkillNode["category"] }[] = [
  { name: "AWS Cloud", category: "cloud" },
  { name: "Kubernetes", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "Terraform", category: "cloud" },
  { name: "Jenkins CI", category: "tools" },
  { name: "Linux OS", category: "tools" },
  { name: "Node.js", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "React.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "MySQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Git VCS", category: "tools" },
  { name: "Next.js", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
];

export default function Skills3DSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<(SkillNode & { scale: number; opacity: number; px: number; py: number })[]>([]);
  const rotationRef = useRef({ x: 0.005, y: 0.008 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Distribute nodes evenly on 3D sphere using Fibonacci Sphere Algorithm
  useEffect(() => {
    const numPoints = skillsData.length;
    const radius = 175;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    const initialNodes: SkillNode[] = skillsData.map((skill, i) => {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        name: skill.name,
        category: skill.category,
        x: x * radius,
        y: y * radius,
        z: z * radius,
      };
    });

    const projectNodes = (currentNodes: SkillNode[]) => {
      return currentNodes.map((node) => {
        const perspective = 400 / (400 + node.z);
        return {
          ...node,
          scale: Math.max(0.65, Math.min(1.2, perspective)),
          opacity: Math.max(0.35, Math.min(1, (node.z + 175) / 350)),
          px: node.x * perspective,
          py: node.y * perspective,
        };
      });
    };

    let animationFrameId: number;
    let currentNodes = [...initialNodes];

    const rotateSphere = () => {
      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      currentNodes = currentNodes.map((node) => {
        // Rotate around Y axis
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate around X axis
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        return {
          ...node,
          x: x1,
          y: y2,
          z: z2,
        };
      });

      setNodes(projectNodes(currentNodes));

      // Slow drag deceleration
      if (!isDraggingRef.current) {
        rotationRef.current.x *= 0.98;
        rotationRef.current.y *= 0.98;
        if (Math.abs(rotationRef.current.x) < 0.002) rotationRef.current.x = 0.003;
        if (Math.abs(rotationRef.current.y) < 0.002) rotationRef.current.y = 0.004;
      }

      animationFrameId = requestAnimationFrame(rotateSphere);
    };

    rotateSphere();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationRef.current = {
      x: deltaY * 0.005,
      y: deltaX * 0.005,
    };

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <PinterestCardWrapper stampText="SPHERE // 3D_NODES">
      <div className="w-full flex flex-col justify-between" data-cursor="Spin 3D">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#E8E3DA] dark:border-[#2E2C29]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7]">
                Technical Skill Constellation
              </h3>
              <span className="y2k-pill text-[10px] text-[#C86D51] dark:text-[#E07A5F]">
                <Globe2 size={11} className="text-[#C86D51] dark:text-[#E07A5F]" />
                <span>Fibonacci 3D</span>
              </span>
            </div>
            <p className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono">
              Drag or spin the 3D constellation sphere to explore cloud, DevOps & full-stack competencies
            </p>
          </div>
        </div>

        {/* 3D Sphere Interactive Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-[360px] md:h-[420px] rounded-3xl bg-white/40 dark:bg-[#141312] border border-white/80 dark:border-white/10 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center shadow-xl select-none glass-specular-edge"
        >
          {/* Ethereal Orbit Rings */}
          <div className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border border-[#00D2FF]/20 pointer-events-none -rotate-12 animate-pulse" />
          <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-[#C86D51]/25 dark:border-[#E07A5F]/25 pointer-events-none rotate-45" />

          {/* Render 3D Skill Pills */}
          {nodes.map((node, i) => (
            <div
              key={i}
              style={{
                transform: `translate3d(${node.px}px, ${node.py}px, 0px) scale(${node.scale})`,
                opacity: node.opacity,
                zIndex: Math.round(node.z + 200),
              }}
              className="absolute pointer-events-none transition-transform duration-75"
            >
              <div className="px-3.5 py-1.5 rounded-2xl bg-white/90 dark:bg-[#201E1B]/90 border border-white/80 dark:border-white/10 text-xs font-mono font-bold text-[#1A1918] dark:text-[#FAF9F7] shadow-lg whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#C86D51] dark:bg-[#E07A5F]" />
                <span>{node.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PinterestCardWrapper>
  );
}

