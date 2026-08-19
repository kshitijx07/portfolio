"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const WarpShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uSpeed: { value: 1.2 },
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
    uniform float uSpeed;
    varying vec2 vUv;

    float hash(float n) { return fract(sin(n) * 43758.5453123); }

    void main() {
      vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
      float r = length(p);
      float angle = atan(p.y, p.x);

      // Polar coordinates mapping for radial streaks
      float numRays = 48.0;
      float rayId = floor((angle + 3.14159) / (2.0 * 3.14159) * numRays);
      float randomOffset = hash(rayId);

      // Radial speed animation
      float speed = uTime * (0.8 + randomOffset * 1.5) * uSpeed;
      float streak = fract(1.0 / (r + 0.02) * 0.4 + speed + randomOffset);
      streak = smoothstep(0.0, 0.15, streak) * smoothstep(0.8, 0.4, streak);

      // Cyan / Magenta / White chromatic palette
      vec3 cyan = vec3(0.3, 0.93, 0.92);
      vec3 purple = vec3(0.68, 0.32, 0.88);
      vec3 color = mix(cyan, purple, step(0.5, randomOffset));

      // Fade center core
      float mask = smoothstep(0.08, 0.35, r);
      vec3 finalCol = color * streak * mask * 1.8;

      gl_FragColor = vec4(finalCol, mask * streak);
    }
  `,
};

export default function WarpCorridor() {
  const { size } = useThree();
  const uniforms = useMemo(() => THREE.UniformsUtils.clone(WarpShader.uniforms), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial args={[WarpShader]} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}
