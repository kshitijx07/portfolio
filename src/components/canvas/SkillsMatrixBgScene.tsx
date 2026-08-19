"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import RetroDotMatrixBg from "./RetroDotMatrixBg";
import DomSyncProjectGrid from "./DomSyncProjectGrid";
import { pointerUv, pointerState } from "@/lib/bus";

function FloatingTechPolyhedra() {
  const groupRef = useRef<THREE.Group>(null!);

  const shapes = useMemo(() => {
    return [
      { type: "icosa", pos: [-3.6, 2.2, -0.6], scale: 0.7, color: "#4DEEEA", rotSpeed: [0.3, 0.4] },
      { type: "dodeca", pos: [3.8, 1.8, -0.8], scale: 0.75, color: "#B4F342", rotSpeed: [-0.2, 0.5] },
      { type: "torus", pos: [-3.2, -1.8, -0.7], scale: 0.65, color: "#FF3E1D", rotSpeed: [0.4, -0.3] },
      { type: "octa", pos: [3.4, -2.0, -0.5], scale: 0.7, color: "#4DEEEA", rotSpeed: [-0.3, -0.4] },
      { type: "tetra", pos: [0.0, -2.8, -0.9], scale: 0.6, color: "#B4F342", rotSpeed: [0.2, 0.2] },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i];
      if (!s) return;
      child.rotation.x += delta * s.rotSpeed[0];
      child.rotation.y += delta * s.rotSpeed[1];
      child.position.y += Math.sin(t * 1.6 + i * 1.5) * 0.0025;

      // Cursor parallax
      if (pointerState.inside) {
        const targetX = (pointerUv.x - 0.5) * 1.2;
        const targetY = (pointerUv.y - 0.5) * 0.8;
        child.position.x += (targetX * (i * 0.2 + 0.5) - child.position.x * 0.03) * delta * 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, idx) => (
        <mesh key={idx} position={s.pos as [number, number, number]} scale={s.scale}>
          {s.type === "icosa" && <icosahedronGeometry args={[1, 0]} />}
          {s.type === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
          {s.type === "torus" && <torusGeometry args={[0.8, 0.25, 12, 24]} />}
          {s.type === "octa" && <octahedronGeometry args={[1, 0]} />}
          {s.type === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

import ViewportLazyScene from "./ViewportLazyScene";

export default function SkillsMatrixBgScene() {
  return (
    <ViewportLazyScene className="absolute inset-0 z-0 pointer-events-none opacity-65">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
        <RetroDotMatrixBg />
        <DomSyncProjectGrid />
        <FloatingTechPolyhedra />
      </Canvas>
    </ViewportLazyScene>
  );
}
