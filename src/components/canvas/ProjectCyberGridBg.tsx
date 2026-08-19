"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState, getScrollSnapshot } from "@/lib/bus";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

const CyberGridShader = {
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

    void main() {
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

      // 3D Perspective Horizon transformation
      float horizonY = -0.15;
      float py = p.y - horizonY;

      // Top sky vs Bottom 3D Grid Plane
      if (py > 0.0) {
        // Atmospheric deep nebula with stars
        float starJitter = fract(sin(dot(floor(screenUv * 120.0), vec2(12.9898, 78.233))) * 43758.5453);
        float star = step(0.992, starJitter) * (0.3 + 0.7 * sin(uTime * 3.0 + starJitter * 10.0));
        
        // Pointer nebula ambient glow
        float pointerDist = length(screenUv - uPointer);
        float nebulaGlow = exp(-pointerDist * 3.5) * 0.45;

        vec3 skyColor = vec3(0.02, 0.02, 0.035) + vec3(0.18, 0.93, 0.92) * nebulaGlow * 0.3 + vec3(star);
        gl_FragColor = vec4(skyColor, 0.65);
        return;
      }

      // 3D Plane depth projection (z = 1 / |py|)
      float z = 0.35 / max(abs(py), 0.01);
      float x = p.x * z + (uPointer.x - 0.5) * 0.4;
      float speed = uTime * 0.8 + uVelocity * 0.005;
      float gridY = z - speed;

      // Grid line calculations with sub-pixel antialiasing
      vec2 gridCoords = vec2(x * 1.6, gridY * 1.6);
      vec2 gridFract = abs(fract(gridCoords - 0.5) - 0.5) / fwidth(gridCoords);
      float line = 1.0 - min(min(gridFract.x, gridFract.y), 1.0);

      // Depth fade fog
      float depthFade = exp(-z * 0.18);

      // Cyber Colors (#4DEEEA and #B4F342)
      vec3 gridCyan = vec3(0.302, 0.933, 0.918);
      vec3 gridLime = vec3(0.705, 0.952, 0.258);
      vec3 lineColor = mix(gridCyan, gridLime, sin(gridCoords.y * 0.4 + uTime) * 0.5 + 0.5);

      vec3 finalGrid = lineColor * line * depthFade * 1.8;
      float alpha = clamp(line * depthFade + 0.1, 0.0, 0.85);

      gl_FragColor = vec4(finalGrid, alpha);
    }
  `,
};

function CyberGridMesh() {
  const { size } = useThree();
  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(CyberGridShader.uniforms),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uPointer.value.set(pointerUv.x, pointerUv.y);
    uniforms.uVelocity.value = getScrollSnapshot().velocitySmoothed;
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[CyberGridShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingTechDataNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    return [
      { pos: [-4.2, 2.2, -0.6], scale: 0.65, color: "#4DEEEA", rotSpeed: 0.4 },
      { pos: [4.4, 1.8, -0.8], scale: 0.7, color: "#B4F342", rotSpeed: -0.35 },
      { pos: [-3.8, -1.2, -0.7], scale: 0.6, color: "#FF3E1D", rotSpeed: 0.5 },
      { pos: [3.9, -1.6, -0.5], scale: 0.75, color: "#4DEEEA", rotSpeed: -0.4 },
      { pos: [0.0, 3.2, -0.9], scale: 0.55, color: "#B4F342", rotSpeed: 0.3 },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const n = nodes[i];
      if (!n) return;
      child.rotation.x += delta * n.rotSpeed;
      child.rotation.y += delta * (n.rotSpeed * 1.2);
      child.position.y += Math.sin(t * 1.5 + i * 1.2) * 0.002;

      // Pointer parallax
      if (pointerState.inside) {
        const targetX = (pointerUv.x - 0.5) * 1.5;
        const targetY = (pointerUv.y - 0.5) * 1.0;
        child.position.x += (targetX * (i * 0.2 + 0.6) - child.position.x * 0.04) * delta * 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, idx) => (
        <mesh key={idx} position={n.pos as [number, number, number]} scale={n.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={n.color} wireframe transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

export default function ProjectCyberGridBg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <CyberGridMesh />
        <DomSyncProjectGrid />
        <FloatingTechDataNodes />
      </Canvas>
    </div>
  );
}
