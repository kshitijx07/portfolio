"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState, getScrollSnapshot } from "@/lib/bus";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

// ─────────────────────────────────────────────────────────────────────────────
// 1. HIGH-PERFORMANCE UNIFIED PROCEDURAL 3D MATRIX & UV CURL SHADER
// ─────────────────────────────────────────────────────────────────────────────
const UnifiedMatrixShader = {
  uniforms: {
    uTime: { value: 0.0 },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uVelocity: { value: 0.0 },
    uColorA: { value: new THREE.Color("#4DEEEA") }, // Cyan
    uColorB: { value: new THREE.Color("#B4F342") }, // Lime
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uVelocity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;

    // Fast Pseudo-Random Noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      vec2 aspectUv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

      // 1. Velocity-linked UV curl warp
      float velocityCurl = clamp(abs(uVelocity) * 0.003, 0.0, 0.8);
      vec2 warpedUv = aspectUv + vec2(
        sin(aspectUv.y * 5.0 + uTime * 0.8) * velocityCurl * 0.08,
        cos(aspectUv.x * 5.0 + uTime * 0.8) * velocityCurl * 0.08
      );

      // 2. Sub-pixel antialiased 3D retro dot-matrix grid
      float gridDensity = 32.0;
      vec2 cellId = floor(warpedUv * gridDensity);
      vec2 cellUv = fract(warpedUv * gridDensity) - 0.5;

      float d = length(cellUv);
      float dotSize = 0.12;

      // 3. Wandering Neon Snake / Signal Wave
      float snakeWave = sin(cellId.x * 0.25 - uTime * 1.8) * 3.5 + cos(cellId.x * 0.1 + uTime * 1.2) * 2.0;
      float snakeDist = abs(cellId.y - snakeWave);
      float snakeIntensity = exp(-snakeDist * 0.8) * 0.95;

      // 4. Cursor Proximity Radial Wave
      vec2 pointerAspect = (uPointer * uResolution - 0.5 * uResolution) / uResolution.y;
      float pointerDist = length(warpedUv - pointerAspect);
      float pointerGlow = exp(-pointerDist * 4.0) * 0.75;

      // Combine Dot Mask
      float dotMask = smoothstep(dotSize, dotSize - 0.04, d);
      float dotBrightness = 0.07 + snakeIntensity * 0.85 + pointerGlow * 0.9;
      dotBrightness += (hash(cellId) - 0.5) * 0.03; // Micro organic jitter

      // Dynamic Color Blending (Cyan to Neon Lime)
      vec3 dotColor = mix(uColorA, uColorB, snakeIntensity * 0.8 + pointerGlow * 0.5);
      vec3 finalColor = dotColor * dotMask * dotBrightness;

      // Background atmospheric depth vignette
      float vignette = 1.0 - length(screenUv - 0.5) * 0.7;
      finalColor *= max(0.2, vignette);

      gl_FragColor = vec4(finalColor, dotMask * max(0.12, dotBrightness));
    }
  `,
};

function UnifiedMatrixMesh({ accent = "cyan" }: { accent?: "lime" | "cyan" | "orange" }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(() => {
    const u = THREE.UniformsUtils.clone(UnifiedMatrixShader.uniforms);
    if (accent === "lime") {
      u.uColorA.value.set("#B4F342");
      u.uColorB.value.set("#4DEEEA");
    } else if (accent === "orange") {
      u.uColorA.value.set("#FF3E1D");
      u.uColorB.value.set("#B4F342");
    }
    return u;
  }, [accent]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const snap = getScrollSnapshot();
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(state.size.width, state.size.height);
    uniforms.uPointer.value.set(pointerUv.x, pointerUv.y);
    uniforms.uVelocity.value = snap.velocitySmoothed;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[UnifiedMatrixShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. LIGHTWEIGHT 3D WIREFRAME FLOATING DATA NODES
// ─────────────────────────────────────────────────────────────────────────────
function FloatingDataNodes({ variant = "experience" }: { variant?: "experience" | "projects" | "skills" | "education" }) {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    if (variant === "experience") {
      return [
        { type: "octa", pos: [-3.4, 1.8, -0.6], scale: 0.65, color: "#4DEEEA" },
        { type: "octa", pos: [3.4, 1.2, -0.8], scale: 0.7, color: "#B4F342" },
        { type: "octa", pos: [-3.0, -1.8, -0.7], scale: 0.6, color: "#FF3E1D" },
        { type: "octa", pos: [3.2, -1.9, -0.5], scale: 0.75, color: "#4DEEEA" },
      ];
    } else if (variant === "projects") {
      return [
        { type: "icosa", pos: [-3.6, 2.0, -0.7], scale: 0.7, color: "#B4F342" },
        { type: "icosa", pos: [3.6, -1.5, -0.8], scale: 0.75, color: "#4DEEEA" },
        { type: "icosa", pos: [0.0, 2.6, -0.9], scale: 0.6, color: "#B4F342" },
      ];
    } else if (variant === "skills") {
      return [
        { type: "dodeca", pos: [-3.6, 1.8, -0.7], scale: 0.7, color: "#4DEEEA" },
        { type: "torus", pos: [3.6, 1.6, -0.8], scale: 0.65, color: "#B4F342" },
        { type: "octa", pos: [-3.2, -1.8, -0.6], scale: 0.7, color: "#FF3E1D" },
        { type: "icosa", pos: [3.4, -2.0, -0.5], scale: 0.65, color: "#4DEEEA" },
      ];
    } else {
      // Education: Gyroscope orbital ring + core
      return [
        { type: "torus", pos: [3.2, 0.4, -0.8], scale: 1.1, color: "#4DEEEA" },
        { type: "torus", pos: [3.2, 0.4, -0.8], scale: 0.8, color: "#B4F342" },
        { type: "octa", pos: [3.2, 0.4, -0.8], scale: 0.4, color: "#B4F342" },
      ];
    }
  }, [variant]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * 0.35 * (i % 2 === 0 ? 1 : -1);
      child.rotation.y += delta * 0.45 * (i % 2 === 0 ? -1 : 1);
      child.position.y += Math.sin(t * 1.5 + i * 1.3) * 0.002;

      if (pointerState.inside) {
        const targetX = (pointerUv.x - 0.5) * 0.9;
        const targetY = (pointerUv.y - 0.5) * 0.6;
        child.position.x += (targetX * (i * 0.15 + 0.3) - child.position.x * 0.04) * delta * 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, idx) => (
        <mesh key={idx} position={n.pos as [number, number, number]} scale={n.scale}>
          {n.type === "octa" && <octahedronGeometry args={[1, 0]} />}
          {n.type === "icosa" && <icosahedronGeometry args={[1, 0]} />}
          {n.type === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
          {n.type === "torus" && <torusGeometry args={[0.8, 0.18, 12, 32]} />}
          <meshBasicMaterial color={n.color} wireframe transparent opacity={0.38} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. EXPORTED UNIFIED SECTIONS BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
export interface UnifiedSectionsBgProps {
  variant?: "experience" | "projects" | "skills" | "education";
  accent?: "lime" | "cyan" | "orange";
  opacity?: number;
}

export default function UnifiedSectionsBg({
  variant = "experience",
  accent = "cyan",
  opacity = 0.7,
}: UnifiedSectionsBgProps) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
        <UnifiedMatrixMesh accent={accent} />
        <DomSyncProjectGrid />
        <FloatingDataNodes variant={variant} />
      </Canvas>
    </div>
  );
}
