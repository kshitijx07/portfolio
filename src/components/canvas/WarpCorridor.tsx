"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getScrollSnapshot, pointerUv, pointerState } from "@/lib/bus";

const VelocityFlowShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uVelocity: { value: 0.0 },
    uBaseSpeed: { value: 1.2 },
    uIntensity: { value: 1.0 },
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
    uniform vec2 uMouse;
    uniform float uVelocity;
    uniform float uBaseSpeed;
    uniform float uIntensity;

    varying vec2 vUv;

    // Pseudo-random hash
    float hash11(float p) {
      p = fract(p * 0.1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
    }

    float hash21(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    // 1D Perlin-like smooth noise
    float noise1D(float x) {
      float i = floor(x);
      float f = fract(x);
      float u = f * f * (3.0 - 2.0 * f);
      return mix(hash11(i), hash11(i + 1.0), u);
    }

    void main() {
      // Normalize coordinates with aspect ratio correction
      vec2 st = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

      // Interactive mouse offset for parallax 3D vortex center
      vec2 mouseOffset = (uMouse - 0.5) * 0.45;
      vec2 p = st - mouseOffset;

      float r = length(p);
      float angle = atan(p.y, p.x);

      // Dynamic flow clock accelerated by scroll velocity
      float speed = uBaseSpeed + uVelocity * 3.8;
      float t = uTime * speed;

      // Swirl vortex twist along depth
      float depth = 1.0 / max(r, 0.025);
      float twist = sin(depth * 0.25 - t * 0.5) * 0.22;
      float twistedAngle = angle + twist;

      // ── Ray Structure (36 Main Rays + 72 Micro-streaks) ───────────
      float numRays = 36.0;
      float rayIndex = floor((twistedAngle + 3.14159265) / (6.2831853) * numRays);
      float rayRand = hash11(rayIndex * 17.13);
      float rayRandColor = hash11(rayIndex * 41.87);

      // Sector UV for smooth beam width falloff
      float sectorUv = fract((twistedAngle + 3.14159265) / (6.2831853) * numRays) - 0.5;
      float beamWidth = 1.0 - smoothstep(0.25, 0.5, abs(sectorUv));

      // Continuous flowing longitudinal streaks moving towards the camera
      float streakSpeed = t * (0.9 + rayRand * 0.8);
      float streakCoord = depth * 0.38 + streakSpeed + rayRand * 5.0;
      float streak = fract(streakCoord);
      
      // Sharp attack, elongated flowing tail
      float beam = smoothstep(0.0, 0.12, streak) * smoothstep(0.95, 0.25, streak);

      // Secondary high-frequency photon pulses
      float pulseCoord = depth * 0.85 + t * 2.2 + hash11(rayIndex * 93.1);
      float pulse = pow(fract(pulseCoord), 4.0) * 1.5;

      // ── Color Spectrum (Cyan, Magenta, Electric Purple, Blinding White) ──
      vec3 neonCyan   = vec3(0.18, 0.94, 0.98); // #2EF0FA
      vec3 hotMagenta = vec3(0.96, 0.28, 0.92); // #F547EB
      vec3 deepPurple = vec3(0.68, 0.25, 0.98); // #AD40FA
      vec3 pureWhite  = vec3(1.0, 1.0, 1.0);

      vec3 beamColor;
      if (rayRandColor < 0.42) {
        beamColor = mix(neonCyan, pureWhite, 0.35);
      } else if (rayRandColor < 0.82) {
        beamColor = mix(hotMagenta, deepPurple, 0.45);
      } else {
        beamColor = mix(pureWhite, neonCyan, 0.4);
      }

      // Radial shockwave expansion rings
      float ringPulse = sin(depth * 1.2 - t * 3.0);
      float ringMod = smoothstep(-0.4, 0.8, ringPulse) * 0.4 + 0.8;

      // Combine beams, pulses, and width profile
      float totalLight = (beam * beamWidth * ringMod * 2.6) + (pulse * beamWidth * 0.8);

      // Chromatic Aberration fringe at edges of beams
      vec3 chromaticOffset = vec3(
        noise1D(depth * 0.2 + t + 0.1),
        noise1D(depth * 0.2 + t),
        noise1D(depth * 0.2 + t - 0.1)
      ) * 0.3;

      vec3 finalBeam = (beamColor + chromaticOffset) * totalLight;

      // Volumetric Core Glow & Ambient Halo
      float coreMask = smoothstep(0.035, 0.32, r);
      vec3 ambientHalo = mix(neonCyan, hotMagenta, sin(angle * 3.0 + t * 0.6) * 0.5 + 0.5) * (0.08 / max(r * r + 0.04, 0.05));
      ambientHalo *= (1.0 + uVelocity * 2.5);

      vec3 finalColor = (finalBeam + ambientHalo) * coreMask * uIntensity;

      // Alpha transparency falloff for layering
      float alpha = coreMask * clamp(totalLight * 0.85 + 0.2, 0.0, 1.0);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

export interface WarpCorridorProps {
  baseSpeed?: number;
  intensity?: number;
  opacity?: number;
}

export default function WarpCorridor({
  baseSpeed = 1.2,
  intensity = 1.0,
}: WarpCorridorProps) {
  const { size } = useThree();
  const velocitySmooth = useRef(0);
  const mouseSmooth = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(() => {
    const u = THREE.UniformsUtils.clone(VelocityFlowShader.uniforms);
    u.uBaseSpeed.value = baseSpeed;
    u.uIntensity.value = intensity;
    return u;
  }, [baseSpeed, intensity]);

  useFrame((state, delta) => {
    // 1. Smooth scroll velocity tracker
    const rawVel = Math.abs(getScrollSnapshot().velocity);
    const normalizedVel = THREE.MathUtils.clamp(rawVel / 35, 0, 4.0);
    velocitySmooth.current +=
      (normalizedVel - velocitySmooth.current) * (1 - Math.exp(-14 * delta));

    // 2. Smooth mouse tracking
    const targetX = pointerState.inside ? pointerUv.x : 0.5;
    const targetY = pointerState.inside ? pointerUv.y : 0.5;
    mouseSmooth.current.x +=
      (targetX - mouseSmooth.current.x) * (1 - Math.exp(-8 * delta));
    mouseSmooth.current.y +=
      (targetY - mouseSmooth.current.y) * (1 - Math.exp(-8 * delta));

    // 3. Update uniforms
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uVelocity.value = velocitySmooth.current;
    uniforms.uMouse.value.copy(mouseSmooth.current);
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[VelocityFlowShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
