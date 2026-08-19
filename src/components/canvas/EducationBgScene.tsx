"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import RetroDotMatrixBg from "./RetroDotMatrixBg";
import DomSyncProjectGrid from "./DomSyncProjectGrid";
import { pointerUv, pointerState } from "@/lib/bus";

function GyroscopeOrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.35;
      ring2Ref.current.rotation.z = t * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.3;
      ring3Ref.current.rotation.x = -t * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.6;
      coreRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group position={[3.2, 0, -1]}>
      {/* Outer Ring 1 */}
      <mesh ref={ring1Ref} scale={1.8}>
        <torusGeometry args={[1, 0.02, 12, 48]} />
        <meshBasicMaterial color="#4DEEEA" transparent opacity={0.45} />
      </mesh>

      {/* Middle Ring 2 */}
      <mesh ref={ring2Ref} scale={1.4}>
        <torusGeometry args={[1, 0.02, 12, 48]} />
        <meshBasicMaterial color="#B4F342" transparent opacity={0.5} />
      </mesh>

      {/* Inner Ring 3 */}
      <mesh ref={ring3Ref} scale={1.0}>
        <torusGeometry args={[1, 0.025, 12, 48]} />
        <meshBasicMaterial color="#FF3E1D" transparent opacity={0.55} />
      </mesh>

      {/* Center Core */}
      <mesh ref={coreRef} scale={0.35}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#B4F342" wireframe transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function EducationBgScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <RetroDotMatrixBg />
        <DomSyncProjectGrid />
        <GyroscopeOrbitalRings />
      </Canvas>
    </div>
  );
}
