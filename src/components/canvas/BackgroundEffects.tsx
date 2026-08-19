"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 18;

export default function BackgroundEffects() {
  const instancedRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6,
        -1.2
      ),
      rot: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.25,
      rotSpeed: (Math.random() - 0.5) * 0.8,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!instancedRef.current) return;

    particles.forEach((p, i) => {
      p.pos.y -= p.speed * delta;
      p.rot += p.rotSpeed * delta;
      if (p.pos.y < -3.5) p.pos.y = 3.5;

      dummy.position.copy(p.pos);
      dummy.rotation.set(0, 0, p.rot);
      dummy.scale.set(0.45, 0.45, 1);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#3B82F6" wireframe opacity={0.6} transparent />
    </instancedMesh>
  );
}
