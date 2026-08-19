"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const RetroGridShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uCellSize: { value: 24.0 }, // Size of grid cell in pixels
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
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 screenPx = gl_FragCoord.xy;
      vec2 gridId = floor(screenPx / uCellSize);
      vec2 gridUv = fract(screenPx / uCellSize);

      // Sub-pixel center dot
      float distToCenter = length(gridUv - vec2(0.5));
      float dotMask = 1.0 - smoothstep(0.08, 0.12, distToCenter);
      vec3 baseDotColor = vec3(0.12, 0.14, 0.18) * dotMask;

      // Procedural wandering neon green cluster (The "Snake" from reference)
      float t = uTime * 2.0;
      float snakePathY = floor(sin(gridId.x * 0.15 + t * 0.5) * 6.0 + 12.0);
      float isSnake = step(abs(gridId.y - snakePathY), 0.5) * step(fract(gridId.x * 0.08 - t * 0.1), 0.25);

      vec3 neonGreen = vec3(0.705, 0.952, 0.258); // #B4F342
      vec3 finalColor = mix(baseDotColor, neonGreen * dotMask * 2.5, isSnake);

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
