"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState, getScrollSnapshot } from "@/lib/bus";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

const BlackHoleAccretionShader = {
  uniforms: {
    uTime: { value: 0.0 },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uVelocity: { value: 0.0 },
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
    varying vec2 vUv;

    // Relativistic 2D Accretion Swirl & Gravitational Lensing
    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.y * vec2(uResolution.x / uResolution.y, 1.0)) / uResolution.y;

      // Pointer gravitational offset
      vec2 pOffset = (uPointer - vec2(0.5)) * 0.35;
      vec2 center = vec2(0.0) + pOffset;
      vec2 p = uv - center;

      float r = length(p);
      float angle = atan(p.y, p.x);

      // Event horizon radius
      float eventHorizon = 0.16;
      if (r < eventHorizon) {
        // Pure void black inside event horizon
        gl_FragColor = vec4(0.015, 0.015, 0.02, 0.95);
        return;
      }

      // Gravitational lensing refraction bend
      float lens = pow(eventHorizon / r, 1.4);
      float swirl = angle + lens * 3.5 + uTime * 0.45;

      // Accretion disk bands
      float diskInner = 0.18;
      float diskOuter = 0.65;
      float inDisk = smoothstep(diskInner, diskInner + 0.05, r) * (1.0 - smoothstep(diskOuter - 0.15, diskOuter, r));

      // Dynamic plasma filaments
      float plasmaA = sin(swirl * 6.0 + r * 22.0 - uTime * 2.0);
      float plasmaB = cos(swirl * 12.0 - r * 14.0 + uTime * 1.5);
      float plasma = (plasmaA + plasmaB) * 0.5 + 0.5;

      // Doppler beaming effect (brighter on approaching side)
      float doppler = 1.0 + sin(swirl) * 0.45;

      vec3 hotCyan = vec3(0.302, 0.933, 0.918);   // #4DEEEA
      vec3 neonLime = vec3(0.705, 0.952, 0.258);  // #B4F342
      vec3 deepBlue = vec3(0.0, 0.063, 0.29);     // #00104A

      vec3 diskColor = mix(deepBlue, hotCyan, plasma * doppler);
      diskColor = mix(diskColor, neonLime, pow(plasma, 3.0) * doppler * 0.85);

      // Outer photon sphere ring glow
      float photonRing = exp(-pow((r - eventHorizon - 0.02) * 45.0, 2.0)) * 2.2;
      vec3 photonColor = neonLime * photonRing;

      // Background dot matrix integration
      vec2 gridUv = fract(gl_FragCoord.xy / 24.0);
      float distToCenter = length(gridUv - vec2(0.5));
      float dotMask = 1.0 - smoothstep(0.08, 0.13, distToCenter);
      vec3 baseDot = vec3(0.10, 0.12, 0.16) * dotMask;

      vec3 finalRgb = baseDot + (diskColor * inDisk * 0.75 + photonColor * 0.8);
      float alpha = clamp(inDisk * 0.85 + photonRing * 0.9 + dotMask * 0.35, 0.0, 0.9);

      gl_FragColor = vec4(finalRgb, alpha);
    }
  `,
};

function BlackHoleAccretionMesh() {
  const { size } = useThree();
  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(BlackHoleAccretionShader.uniforms),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uPointer.value.set(pointerUv.x, pointerUv.y);
    uniforms.uVelocity.value = getScrollSnapshot().velocitySmoothed;
  });

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[BlackHoleAccretionShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ProjectBlackHoleBg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <BlackHoleAccretionMesh />
        <DomSyncProjectGrid />
      </Canvas>
    </div>
  );
}
