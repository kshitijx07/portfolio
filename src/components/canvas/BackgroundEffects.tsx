"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState } from "@/lib/bus";

const PARTICLE_COUNT = 24;

export default function BackgroundEffects() {
  const instancedRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const colors = [
      new THREE.Color("#4DEEEA"),
      new THREE.Color("#B4F342"),
      new THREE.Color("#FF3E1D"),
      new THREE.Color("#F547EB"),
      new THREE.Color("#FFDF00"),
    ];

    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 8,
      z: -0.8 - Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.25 - Math.random() * 0.35,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.7,
      scale: 0.28 + Math.random() * 0.32,
      color: colors[i % colors.length],
      wobbleSpeed: 1.5 + Math.random() * 2.0,
      wobblePhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    if (!instancedRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Harmonic floating motion with gentle wobble
      p.y += p.vy * delta;
      p.x += (p.vx + Math.sin(t * p.wobbleSpeed + p.wobblePhase) * 0.05) * delta;
      p.rot += p.vRot * delta;

      // Pointer repulsion
      if (pointerState.inside) {
        const dx = p.x - (pointerUv.x - 0.5) * 8.0;
        const dy = p.y - (pointerUv.y - 0.5) * 6.0;
        const dist = Math.hypot(dx, dy);
        if (dist < 1.8 && dist > 0.001) {
          const force = (1.8 - dist) * 0.8;
          p.x += (dx / dist) * force * delta;
          p.y += (dy / dist) * force * delta;
        }
      }

      // Vertical loop wrap
      if (p.y < -4.5) {
        p.y = 4.5;
        p.x = (Math.random() - 0.5) * 10;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(0, 0, p.rot);
      dummy.scale.set(p.scale, p.scale, 1);
      dummy.updateMatrix();

      instancedRef.current.setMatrixAt(i, dummy.matrix);
      instancedRef.current.setColorAt(i, p.color);
    });

    instancedRef.current.instanceMatrix.needsUpdate = true;
    if (instancedRef.current.instanceColor) {
      instancedRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={instancedRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial transparent opacity={0.65} />
    </instancedMesh>
  );
}
