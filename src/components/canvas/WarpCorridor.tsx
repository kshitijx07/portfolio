"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getScrollSnapshot } from "@/lib/bus";

const WarpShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uVelocity: { value: 0.0 },
    uBaseSpeed: { value: 1.0 },
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
    uniform float uVelocity;
    uniform float uBaseSpeed;
    varying vec2 vUv;

    // Hash for random ray offsets
    float hash11(float p) {
      p = fract(p * 0.1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
    }

    void main() {
      vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
      float r = length(p);
      float angle = atan(p.y, p.x);

      // Quantize into 36 distinct angular fan rays
      float numRays = 36.0;
      float rayId = floor((angle + 3.14159265) / (6.2831853) * numRays);
      float rand = hash11(rayId * 19.19);
      float randColor = hash11(rayId * 43.17);

      // Scroll velocity-driven hyper-drive speed
      float dynamicSpeed = uBaseSpeed + uVelocity * 3.5;
      float speedClock = uTime * dynamicSpeed * (0.8 + rand * 0.8);

      // Tunnel depth slicing: 1/r projection
      float depth = 1.0 / max(r, 0.035);
      float streak = fract(depth * 0.35 + speedClock + rand);
      
      // Beam shape with sharp attack and soft decay
      float beam = smoothstep(0.0, 0.18, streak) * smoothstep(0.85, 0.35, streak);
      
      // Ray width profile (angular sector width)
      float sectorUv = fract((angle + 3.14159265) / (6.2831853) * numRays) - 0.5;
      float beamWidth = 1.0 - smoothstep(0.35, 0.48, abs(sectorUv));

      // Color Palette matching reference: Neon Cyan, Vivid Magenta/Violet, Bright White
      vec3 cyan = vec3(0.24, 0.94, 0.96);     // #3DEFF5
      vec3 magenta = vec3(0.92, 0.38, 0.96);  // #EB61F5
      vec3 purple = vec3(0.72, 0.35, 0.98);   // #B859FA
      vec3 white = vec3(1.0, 1.0, 1.0);

      vec3 beamColor;
      if (randColor < 0.45) {
        beamColor = mix(cyan, white, 0.25);
      } else if (randColor < 0.85) {
        beamColor = mix(magenta, purple, 0.5);
      } else {
        beamColor = mix(white, cyan, 0.3);
      }

      // Radial rings expansion artifact
      float ring = sin(depth * 1.5 - uTime * dynamicSpeed * 2.0);
      float ringMod = smoothstep(-0.2, 0.8, ring) * 0.35 + 0.75;

      // Dark core fade out in center
      float centerMask = smoothstep(0.04, 0.28, r);

      // Final light composition
      vec3 finalColor = beamColor * (beam * beamWidth * ringMod * 2.4);

      // Bloom glow ambient halo
      vec3 ambientHalo = mix(cyan, magenta, sin(angle * 2.0 + uTime) * 0.5 + 0.5) * (0.12 / max(r * r, 0.08));
      finalColor += ambientHalo * (1.0 + uVelocity * 2.0);

      gl_FragColor = vec4(finalColor * centerMask, centerMask * (beam * beamWidth + 0.15));
    }
  `,
};

export interface WarpCorridorProps {
  baseSpeed?: number;
  opacity?: number;
}

export default function WarpCorridor({ baseSpeed = 1.0, opacity = 1.0 }: WarpCorridorProps) {
  const { size } = useThree();
  const velocitySmooth = useRef(0);
  const uniforms = useMemo(() => {
    const u = THREE.UniformsUtils.clone(WarpShader.uniforms);
    u.uBaseSpeed.value = baseSpeed;
    return u;
  }, [baseSpeed]);

  useFrame((state, delta) => {
    const rawVel = Math.abs(getScrollSnapshot().velocity);
    const normalizedVel = THREE.MathUtils.clamp(rawVel / 40, 0, 3.5);
    
    // Smooth velocity dampening
    velocitySmooth.current += (normalizedVel - velocitySmooth.current) * (1 - Math.exp(-12 * delta));

    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uVelocity.value = velocitySmooth.current;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[WarpShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
