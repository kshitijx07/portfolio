"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import RetroDotMatrixBg from "./RetroDotMatrixBg";
import DomSyncProjectGrid from "./DomSyncProjectGrid";
import { pointerUv, pointerState } from "@/lib/bus";

function FloatingCloudNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    return [
      { pos: [-3.2, 1.8, -0.6], rot: [0.2, 0.4, 0], scale: 0.65, color: "#4DEEEA" },
      { pos: [3.4, 1.2, -0.8], rot: [-0.3, 0.2, 0.1], scale: 0.7, color: "#B4F342" },
      { pos: [-2.8, -1.6, -0.7], rot: [0.1, -0.4, 0.2], scale: 0.6, color: "#FF3E1D" },
      { pos: [3.0, -1.9, -0.5], rot: [-0.2, 0.5, -0.1], scale: 0.75, color: "#4DEEEA" },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * 0.4 * (i % 2 === 0 ? 1 : -1);
      child.rotation.y += delta * 0.5 * (i % 2 === 0 ? 1 : -1);
      child.position.y += Math.sin(t * 1.5 + i * 1.4) * 0.002;

      // Parallax shift from pointer
      if (pointerState.inside) {
        const targetX = (pointerUv.x - 0.5) * 0.8;
        const targetY = (pointerUv.y - 0.5) * 0.6;
        child.position.x += (targetX * (i + 1) * 0.2 - child.position.x * 0.05) * delta * 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, idx) => (
        <mesh key={idx} position={n.pos as [number, number, number]} scale={n.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={n.color} wireframe transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default function ExperienceBgScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <RetroDotMatrixBg />
        <DomSyncProjectGrid />
        <FloatingCloudNodes />
      </Canvas>
    </div>
  );
}
