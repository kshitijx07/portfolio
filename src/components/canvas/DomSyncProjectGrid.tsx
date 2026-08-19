"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getScrollSnapshot } from "@/lib/bus";

const DomSyncShader = {
  uniforms: {
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uCurlStrength: { value: 0.0 },
    uTime: { value: 0.0 },
    uDotPixelSize: { value: 8.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec2 uResolution;
    uniform float uCurlStrength;
    uniform float uTime;
    uniform float uDotPixelSize;

    varying vec2 vUv;

    // Semicircular Shader Deformation
    vec2 applyCurl(vec2 screenUv) {
      float centeredY = 2.0 * screenUv.y - 1.0;
      float profile = 1.0 - sqrt(max(0.0, 1.0 - centeredY * centeredY));
      float uvScale = 1.0 - profile * uCurlStrength;
      float distortedX = (screenUv.x - 0.5) * uvScale + 0.5;
      return vec2(distortedX, screenUv.y);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
      vec2 distortedUv = applyCurl(screenUv);

      // Kinetic grid distortion trail on velocity
      vec2 cellSizeUv = vec2(max(2.0, uDotPixelSize)) / uResolution;
      vec2 cellUv = fract(distortedUv / cellSizeUv);
      float squareDist = max(abs(cellUv.x - 0.5), abs(cellUv.y - 0.5));
      float dotMask = 1.0 - smoothstep(0.18, 0.22, squareDist);

      vec3 traceColor = vec3(0.705, 0.952, 0.258) * dotMask * (uCurlStrength * 4.5);

      gl_FragColor = vec4(traceColor, uCurlStrength * 1.6);
    }
  `,
};

export default function DomSyncProjectGrid() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();
  const activity = useRef(0);
  const previousScrollY = useRef<number | null>(null);

  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(DomSyncShader.uniforms),
    []
  );

  useFrame((state, delta) => {
    const scrollY = getScrollSnapshot().scrollTop;
    const dt = THREE.MathUtils.clamp(delta, 1 / 240, 0.1);

    const velocity =
      previousScrollY.current == null
        ? 0
        : Math.abs(scrollY - previousScrollY.current) / dt;
    previousScrollY.current = scrollY;

    // Dual-Time Constant Filter (Fast attack tau=0.025, slow release tau=0.175)
    const target = THREE.MathUtils.clamp(velocity / 800, 0.0, 1.0);
    const tau = target > activity.current ? 0.025 : 0.175;
    const alpha = 1.0 - Math.exp(-dt / tau);
    activity.current += (target - activity.current) * alpha;

    uniforms.uCurlStrength.value = 0.06 * activity.current;
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[DomSyncShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
