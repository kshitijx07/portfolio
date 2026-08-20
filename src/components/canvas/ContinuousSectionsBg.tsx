"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState, getScrollSnapshot } from "@/lib/bus";
import ViewportLazyScene from "./ViewportLazyScene";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

// ─────────────────────────────────────────────────────────────────────────────
// 1. HIGH-PERFORMANCE CONTINUOUS 3D MATRIX SHADER
// ─────────────────────────────────────────────────────────────────────────────
const ContinuousMatrixShader = {
  uniforms: {
    uTime: { value: 0.0 },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uVelocity: { value: 0.0 },
    uScrollProgress: { value: 0.0 },
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
    uniform float uScrollProgress;
    varying vec2 vUv;

    // Fast Pseudo-Random Noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      vec2 aspectUv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

      // 1. Velocity-linked UV curl warp
      float velocityCurl = clamp(abs(uVelocity) * 0.0025, 0.0, 0.7);
      vec2 warpedUv = aspectUv + vec2(
        sin(aspectUv.y * 4.5 + uTime * 0.7) * velocityCurl * 0.07,
        cos(aspectUv.x * 4.5 + uTime * 0.7) * velocityCurl * 0.07
      );

      // 2. Sub-pixel antialiased 3D retro dot-matrix grid
      float gridDensity = 30.0;
      vec2 cellId = floor(warpedUv * gridDensity);
      vec2 cellUv = fract(warpedUv * gridDensity) - 0.5;

      float d = length(cellUv);
      float dotSize = 0.11;

      // 3. Wandering Continuous Wave Signal
      float wave = sin(cellId.x * 0.22 - uTime * 1.5 + uScrollProgress * 3.0) * 3.2
                 + cos(cellId.x * 0.08 + uTime * 1.0) * 1.8;
      float waveDist = abs(cellId.y - wave);
      float waveIntensity = exp(-waveDist * 0.75) * 0.95;

      // 4. Cursor Proximity Radial Wave
      vec2 pointerAspect = (uPointer * uResolution - 0.5 * uResolution) / uResolution.y;
      float pointerDist = length(warpedUv - pointerAspect);
      float pointerGlow = exp(-pointerDist * 3.5) * 0.7;

      // Combine Dot Mask
      float dotMask = smoothstep(dotSize, dotSize - 0.035, d);
      float dotBrightness = 0.06 + waveIntensity * 0.85 + pointerGlow * 0.85;
      dotBrightness += (hash(cellId) - 0.5) * 0.025;

      // Section-Adaptive Spider-Man Dynamic Colors
      vec3 colorSpideyRed = vec3(0.929, 0.235, 0.247);     // #ED3C3F (Spider-Man Crimson)
      vec3 colorSpideyBlue = vec3(0.231, 0.510, 0.965);    // #3B82F6 (Electric Spidey Blue)
      vec3 colorWebWhite = vec3(0.97, 0.98, 0.99);         // Web Silver White

      // Smooth color morph across the 4 sections
      vec3 sectionColor = mix(colorSpideyRed, colorSpideyBlue, clamp(uScrollProgress * 1.4, 0.0, 1.0));
      if (uScrollProgress > 0.6) {
        sectionColor = mix(sectionColor, colorSpideyRed, (uScrollProgress - 0.6) * 2.5);
      }

      // Spider-Sense web pulse connection
      vec3 finalDotColor = mix(sectionColor, colorWebWhite, waveIntensity * 0.5 + pointerGlow * 0.6);
      vec3 finalColor = finalDotColor * dotMask * dotBrightness;

      // Atmospheric Vignette
      float vignette = 1.0 - length(screenUv - 0.5) * 0.65;
      finalColor *= max(0.25, vignette);

      gl_FragColor = vec4(finalColor, dotMask * max(0.12, dotBrightness));
    }
  `,
};

function ContinuousMatrixMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(ContinuousMatrixShader.uniforms),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const snap = getScrollSnapshot();
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(state.size.width, state.size.height);
    uniforms.uPointer.value.set(pointerUv.x, pointerUv.y);
    uniforms.uVelocity.value = snap.velocitySmoothed;
    uniforms.uScrollProgress.value = snap.progress;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[ContinuousMatrixShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. LIGHTWEIGHT FLOATING CONTINUOUS NODES
// ─────────────────────────────────────────────────────────────────────────────
function ContinuousFloatingNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    return [
      { type: "octa", pos: [-3.4, 2.2, -0.6], scale: 0.65, color: "#B4F342" },
      { type: "icosa", pos: [3.4, 1.4, -0.8], scale: 0.7, color: "#4DEEEA" },
      { type: "dodeca", pos: [-3.2, -0.8, -0.7], scale: 0.65, color: "#FF3E1D" },
      { type: "torus", pos: [3.2, -1.2, -0.8], scale: 0.6, color: "#4DEEEA" },
      { type: "octa", pos: [-3.0, -2.4, -0.6], scale: 0.7, color: "#B4F342" },
      { type: "icosa", pos: [3.3, -2.6, -0.7], scale: 0.65, color: "#4DEEEA" },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const snap = getScrollSnapshot();

    // Scroll vertical parallax offset
    groupRef.current.position.y = (snap.progress - 0.5) * 1.5;

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * 0.35 * (i % 2 === 0 ? 1 : -1);
      child.rotation.y += delta * 0.45 * (i % 2 === 0 ? -1 : 1);
      child.position.y += Math.sin(t * 1.4 + i * 1.2) * 0.0018;

      if (pointerState.inside) {
        const targetX = (pointerUv.x - 0.5) * 0.8;
        const targetY = (pointerUv.y - 0.5) * 0.5;
        child.position.x += (targetX * (i * 0.12 + 0.25) - child.position.x * 0.035) * delta * 2;
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
          <meshBasicMaterial color={n.color} wireframe transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. EXPORTED SINGLE CONTINUOUS VERTICAL 3D BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
export default function ContinuousSectionsBg() {
  return (
    <ViewportLazyScene
      className="absolute inset-0 z-0 pointer-events-none"
      rootMargin="500px 0px"
    >
      <div className="sticky top-0 h-screen w-full pointer-events-none opacity-70">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
          <ContinuousMatrixMesh />
          <DomSyncProjectGrid />
          <ContinuousFloatingNodes />
        </Canvas>
      </div>
    </ViewportLazyScene>
  );
}
