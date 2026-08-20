"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState, getScrollSnapshot } from "@/lib/bus";
import ViewportLazyScene from "./ViewportLazyScene";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROCEDURAL SPIDER-WEB & SPIDER-SENSE GLSL BACKGROUND SHADER
// ─────────────────────────────────────────────────────────────────────────────
const SpiderWebMatrixShader = {
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

    #define PI 3.14159265359

    // Fast Pseudo-Random Noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    // Procedural Spider-Web Radial & Spiral Pattern
    float spiderWebPattern(vec2 uv, vec2 center, float scale) {
      vec2 p = (uv - center) * scale;
      float r = length(p);
      float a = atan(p.y, p.x);

      // 8-Spoke Radial Strands
      float spokes = abs(sin(a * 4.0));
      float spokeLines = smoothstep(0.08, 0.0, spokes) * smoothstep(2.5, 0.1, r);

      // Concentric Polygonal Spiral Web Strands
      float ringIndex = floor(r * 3.5);
      float polyRing = cos(a * 8.0) * 0.06;
      float rings = abs(fract(r * 3.5 + polyRing) - 0.5);
      float ringLines = smoothstep(0.07, 0.0, rings) * smoothstep(3.0, 0.2, r);

      // Intersection Dewdrop Nodes
      float nodes = smoothstep(0.12, 0.02, dFdx(r) * 10.0 + rings + spokes) * 0.4;

      return clamp(spokeLines * 0.75 + ringLines * 0.65 + nodes, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      vec2 aspectUv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

      // 1. Velocity-linked dynamic web stretch & sway
      float velocityCurl = clamp(abs(uVelocity) * 0.002, 0.0, 0.5);
      vec2 swayedUv = aspectUv + vec2(
        sin(aspectUv.y * 3.0 + uTime * 0.6) * velocityCurl * 0.05,
        cos(aspectUv.x * 3.0 + uTime * 0.6) * velocityCurl * 0.05
      );

      // 2. Multi-hub Spider-Web constellation across viewport
      vec2 hub1 = vec2(-0.45, 0.25 + sin(uTime * 0.3) * 0.05);
      vec2 hub2 = vec2(0.55, -0.35 + cos(uTime * 0.25) * 0.05);
      vec2 hub3 = vec2(0.1, 0.45 + sin(uTime * 0.2 + 1.5) * 0.04);
      vec2 hub4 = vec2(-0.35, -0.45 + cos(uTime * 0.35 + 2.0) * 0.04);

      float web1 = spiderWebPattern(swayedUv, hub1, 2.8);
      float web2 = spiderWebPattern(swayedUv, hub2, 2.5);
      float web3 = spiderWebPattern(swayedUv, hub3, 3.2);
      float web4 = spiderWebPattern(swayedUv, hub4, 3.0);
      float totalWeb = max(max(web1, web2), max(web3, web4));

      // 3. Spider-Sense Interactive Pulse from Pointer
      vec2 pointerAspect = (uPointer * uResolution - 0.5 * uResolution) / uResolution.y;
      float pointerDist = length(swayedUv - pointerAspect);
      float spiderSenseRing = abs(sin(pointerDist * 12.0 - uTime * 3.0));
      float spiderSenseGlow = exp(-pointerDist * 2.8) * 0.85 + smoothstep(0.15, 0.0, spiderSenseRing) * exp(-pointerDist * 1.8) * 0.6;

      // 4. Subtle Hexagonal Nanotech Mesh Grid
      float gridScale = 24.0;
      vec2 cellId = floor(swayedUv * gridScale);
      vec2 cellUv = fract(swayedUv * gridScale) - 0.5;
      float dotD = length(cellUv);
      float dotMask = smoothstep(0.08, 0.05, dotD);
      float dotGlow = exp(-dotD * 4.0) * 0.25;

      // Wave signal along the web
      float signalWave = sin(cellId.x * 0.18 - uTime * 1.2 + uScrollProgress * 3.5) * 2.5;
      float signalDist = abs(cellId.y - signalWave);
      float signalPulse = exp(-signalDist * 0.8) * 0.65;

      // 5. Spider-Man Theme Dynamic Colors
      vec3 colorSpideyRed = vec3(0.929, 0.235, 0.247);     // #ED3C3F (Spider-Man Crimson)
      vec3 colorSpideyBlue = vec3(0.231, 0.510, 0.965);    // #3B82F6 (Electric Spidey Blue)
      vec3 colorWebSilver = vec3(0.95, 0.96, 0.98);        // Spider-Web Silver White

      // Section-Adaptive Smooth Morph (Experience -> Projects -> Skills -> Education)
      vec3 currentTheme = mix(colorSpideyRed, colorSpideyBlue, clamp(uScrollProgress * 1.3, 0.0, 1.0));
      if (uScrollProgress > 0.6) {
        currentTheme = mix(currentTheme, colorSpideyRed, (uScrollProgress - 0.6) * 2.5);
      }

      // Composition
      vec3 webColor = mix(currentTheme, colorWebSilver, totalWeb * 0.6 + spiderSenseGlow * 0.5);
      float intensity = totalWeb * 0.55 + dotMask * (0.04 + signalPulse * 0.6) + spiderSenseGlow * 0.7;

      vec3 finalColor = webColor * intensity;

      // Atmospheric Edge Vignette
      float vignette = 1.0 - length(screenUv - 0.5) * 0.55;
      finalColor *= max(0.3, vignette);

      gl_FragColor = vec4(finalColor, max(0.12, intensity));
    }
  `,
};

function SpiderWebMatrixMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(SpiderWebMatrixShader.uniforms),
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
        args={[SpiderWebMatrixShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PROCEDURAL 3D SPIDER EMBLEM & WEB CONSTELLATION MESHES
// ─────────────────────────────────────────────────────────────────────────────
function SpiderEmblemGeometry() {
  const geom = useMemo(() => {
    const points: THREE.Vector3[] = [];

    // Central Spider Diamond Thorax & Abdomen
    points.push(new THREE.Vector3(0, 0.6, 0), new THREE.Vector3(0.2, 0.2, 0));
    points.push(new THREE.Vector3(0.2, 0.2, 0), new THREE.Vector3(0, -0.7, 0));
    points.push(new THREE.Vector3(0, -0.7, 0), new THREE.Vector3(-0.2, 0.2, 0));
    points.push(new THREE.Vector3(-0.2, 0.2, 0), new THREE.Vector3(0, 0.6, 0));
    points.push(new THREE.Vector3(-0.2, 0.2, 0), new THREE.Vector3(0.2, 0.2, 0));

    // 8 Spider Legs (4 on each side with arachnid joint bends)
    const legSpans = [
      // Top 2 Legs (reaching up & out)
      [new THREE.Vector3(0.15, 0.35, 0), new THREE.Vector3(0.65, 0.85, 0.1), new THREE.Vector3(0.95, 1.25, 0.2)],
      [new THREE.Vector3(-0.15, 0.35, 0), new THREE.Vector3(-0.65, 0.85, 0.1), new THREE.Vector3(-0.95, 1.25, 0.2)],
      // Upper-Mid 2 Legs (sweeping sideways)
      [new THREE.Vector3(0.2, 0.15, 0), new THREE.Vector3(0.85, 0.45, 0.1), new THREE.Vector3(1.25, 0.35, 0.15)],
      [new THREE.Vector3(-0.2, 0.15, 0), new THREE.Vector3(-0.85, 0.45, 0.1), new THREE.Vector3(-1.25, 0.35, 0.15)],
      // Lower-Mid 2 Legs (sweeping down & out)
      [new THREE.Vector3(0.18, -0.15, 0), new THREE.Vector3(0.8, -0.4, 0.1), new THREE.Vector3(1.15, -0.9, 0.15)],
      [new THREE.Vector3(-0.18, -0.15, 0), new THREE.Vector3(-0.8, -0.4, 0.1), new THREE.Vector3(-1.15, -0.9, 0.15)],
      // Bottom 2 Legs (reaching far downward)
      [new THREE.Vector3(0.1, -0.4, 0), new THREE.Vector3(0.55, -0.95, 0.1), new THREE.Vector3(0.85, -1.5, 0.2)],
      [new THREE.Vector3(-0.1, -0.4, 0), new THREE.Vector3(-0.55, -0.95, 0.1), new THREE.Vector3(-0.85, -1.5, 0.2)],
    ];

    legSpans.forEach((leg) => {
      points.push(leg[0], leg[1]);
      points.push(leg[1], leg[2]);
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  return geom;
}

function FloatingSpiderObjects() {
  const groupRef = useRef<THREE.Group>(null!);
  const spiderGeom = SpiderEmblemGeometry();

  const spiders = useMemo(() => {
    return [
      { pos: [-3.4, 2.0, -0.6], scale: 0.65, color: "#ED3C3F", rotSpeed: 0.25 },
      { pos: [3.4, 1.2, -0.8], scale: 0.7, color: "#3B82F6", rotSpeed: -0.3 },
      { pos: [-3.3, -0.8, -0.7], scale: 0.6, color: "#ED3C3F", rotSpeed: 0.28 },
      { pos: [3.3, -1.4, -0.8], scale: 0.65, color: "#3B82F6", rotSpeed: -0.22 },
      { pos: [-3.1, -2.6, -0.6], scale: 0.7, color: "#ED3C3F", rotSpeed: 0.32 },
      { pos: [3.4, -2.8, -0.7], scale: 0.65, color: "#3B82F6", rotSpeed: -0.25 },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const snap = getScrollSnapshot();

    // Subtle scroll vertical parallax
    groupRef.current.position.y = (snap.progress - 0.5) * 1.8;

    groupRef.current.children.forEach((child, i) => {
      const sp = spiders[i];
      child.rotation.z += delta * sp.rotSpeed * 0.4;
      child.rotation.y = Math.sin(t * 0.8 + i) * 0.25;
      child.position.y = sp.pos[1] + Math.sin(t * 1.3 + i * 1.4) * 0.12;

      // Spider-Sense interactive cursor attraction
      if (pointerState.inside) {
        const targetX = (pointerUv.x - 0.5) * 0.7;
        child.position.x += (targetX * (i * 0.1 + 0.2) - (child.position.x - sp.pos[0]) * 0.04) * delta * 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {spiders.map((s, idx) => (
        <group key={idx} position={s.pos as [number, number, number]} scale={s.scale}>
          {/* 3D Wireframe Spider Emblem */}
          <lineSegments geometry={spiderGeom}>
            <lineBasicMaterial color={s.color} transparent opacity={0.6} linewidth={1.5} />
          </lineSegments>

          {/* Glowing Central Spider-Sense Core Reticle */}
          <mesh>
            <ringGeometry args={[0.08, 0.14, 16]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. EXPORTED SINGLE CONTINUOUS VERTICAL SPIDER-MAN 3D BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
export default function ContinuousSectionsBg() {
  return (
    <ViewportLazyScene
      className="absolute inset-0 z-0 pointer-events-none"
      rootMargin="500px 0px"
    >
      <div className="sticky top-0 h-screen w-full pointer-events-none opacity-80">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
          <SpiderWebMatrixMesh />
          <DomSyncProjectGrid />
          <FloatingSpiderObjects />
        </Canvas>
      </div>
    </ViewportLazyScene>
  );
}
