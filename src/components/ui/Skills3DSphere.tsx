"use client";

import React, { useEffect, useRef, useState } from "react";
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
  { name: "Jenkins", category: "tools" },
  { name: "Linux OS", category: "tools" },
  { name: "Node.js", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "React.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind", category: "frontend" },
  { name: "MySQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Git", category: "tools" },
  { name: "Next.js 15", category: "frontend" },
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
    const radius = 170;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    const initialNodes: SkillNode[] = skillsData.map((skill, i) => {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

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
          opacity: Math.max(0.35, Math.min(1, (node.z + 170) / 340)),
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
    <PinterestCardWrapper pinLabel="Pin Skills">
      <div className="w-full flex flex-col justify-between" data-cursor="Spin 3D">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
              Technical Skill Constellation
            </h3>
            <p className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono transition-colors">
              Interactive 3D constellation sphere mapping cloud, backend, and DevOps technical skills
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
          className="relative w-full h-[360px] md:h-[420px] rounded-3xl bg-[#FAF9F7] dark:bg-[#151413] border border-[#E8E3DA] dark:border-[#2E2C29] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center transition-colors shadow-inner select-none"
        >
          {/* Subtle Orbit Rings */}
          <div className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border border-[#E8E3DA]/60 dark:border-[#2E2C29]/60 pointer-events-none -rotate-12" />
          <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-[#C86D51]/20 dark:border-[#E07A5F]/20 pointer-events-none rotate-45" />

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
              <div className="px-3.5 py-1.5 rounded-full bg-[#FFFDF9] dark:bg-[#242220] border border-[#E8E3DA] dark:border-[#2E2C29] text-xs font-mono font-bold text-[#1A1918] dark:text-[#FAF9F7] shadow-md whitespace-nowrap flex items-center gap-1.5">
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
