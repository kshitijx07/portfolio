"use client";

import React, { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState } from "@/lib/bus";

const RetroGridShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uCellSize: { value: 24.0 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uPointerActive: { value: 0.0 },
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
    uniform float uCellSize;
    uniform vec2 uPointer;
    uniform float uPointerActive;
    varying vec2 vUv;

    void main() {
      vec2 screenPx = gl_FragCoord.xy;
      vec2 gridId = floor(screenPx / uCellSize);
      vec2 gridUv = fract(screenPx / uCellSize);

      // Sub-pixel antialiased dot
      float distToCenter = length(gridUv - vec2(0.5));
      float dotMask = 1.0 - smoothstep(0.08, 0.13, distToCenter);
      vec3 baseDotColor = vec3(0.10, 0.12, 0.16) * dotMask;

      // Procedural wandering neon green snake
      float t = uTime * 2.2;
      float snakePathY = floor(sin(gridId.x * 0.14 + t * 0.45) * 6.0 + (uResolution.y / uCellSize) * 0.5);
      float isSnake = step(abs(gridId.y - snakePathY), 0.5) * step(fract(gridId.x * 0.075 - t * 0.09), 0.28);

      // Pointer proximity glow wave
      vec2 pointerPx = uPointer * uResolution;
      float pointerDist = length(screenPx - pointerPx);
      float pointerGlow = smoothstep(180.0, 0.0, pointerDist) * uPointerActive * 0.8;

      vec3 neonGreen = vec3(0.705, 0.952, 0.258); // #B4F342
      vec3 cyanGlow = vec3(0.302, 0.933, 0.918);  // #4DEEEA

      vec3 finalColor = baseDotColor;
      finalColor = mix(finalColor, neonGreen * dotMask * 2.4, isSnake);
      finalColor += cyanGlow * dotMask * pointerGlow;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

export default function RetroDotMatrixBg() {
  const { size } = useThree();
  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(RetroGridShader.uniforms),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uPointer.value.set(pointerUv.x, pointerUv.y);
    uniforms.uPointerActive.value = pointerState.inside ? 1.0 : 0.0;
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[RetroGridShader]}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
