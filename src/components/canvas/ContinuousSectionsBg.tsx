"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointerUv, pointerState, getScrollSnapshot } from "@/lib/bus";
import ViewportLazyScene from "./ViewportLazyScene";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROCEDURAL 3D SPIDER-WEB MESH GEOMETRY GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
function create3DSpiderWebGeometry(radius = 2.4, spokes = 12, rings = 6) {
  const points: THREE.Vector3[] = [];

  // Radial Spokes radiating from center
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    // Slight organic depth bow
    const z = Math.sin(angle * 2.0) * 0.12;
    points.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z));
  }

  // Concentric Polygonal Web Spiral Rings
  for (let r = 1; r <= rings; r++) {
    const ringRadius = (r / rings) * radius;
    const ringSag = (1.0 - r / rings) * 0.08;

    for (let i = 0; i < spokes; i++) {
      const angle1 = (i / spokes) * Math.PI * 2;
      const angle2 = (((i + 1) % spokes) / spokes) * Math.PI * 2;

      // Sagged catenary curve on web segment
      const x1 = Math.cos(angle1) * ringRadius;
      const y1 = Math.sin(angle1) * ringRadius;
      const z1 = Math.sin(angle1 * 2.0) * 0.08 - ringSag;

      const x2 = Math.cos(angle2) * ringRadius;
      const y2 = Math.sin(angle2) * ringRadius;
      const z2 = Math.sin(angle2 * 2.0) * 0.08 - ringSag;

      points.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
    }
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ICONIC 3D SPIDER-MAN SUIT EMBLEM GEOMETRY GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
function create3DSpiderManEmblemGeometry() {
  const points: THREE.Vector3[] = [];

  // Thorax & Abdomen (Head to pointed tail)
  points.push(new THREE.Vector3(0, 0.75, 0), new THREE.Vector3(0.22, 0.25, 0.05));
  points.push(new THREE.Vector3(0.22, 0.25, 0.05), new THREE.Vector3(0.12, -0.15, 0.05));
  points.push(new THREE.Vector3(0.12, -0.15, 0.05), new THREE.Vector3(0, -0.9, 0));
  points.push(new THREE.Vector3(0, -0.9, 0), new THREE.Vector3(-0.12, -0.15, 0.05));
  points.push(new THREE.Vector3(-0.12, -0.15, 0.05), new THREE.Vector3(-0.22, 0.25, 0.05));
  points.push(new THREE.Vector3(-0.22, 0.25, 0.05), new THREE.Vector3(0, 0.75, 0));
  // Central Cross Spine
  points.push(new THREE.Vector3(-0.22, 0.25, 0.05), new THREE.Vector3(0.22, 0.25, 0.05));
  points.push(new THREE.Vector3(-0.12, -0.15, 0.05), new THREE.Vector3(0.12, -0.15, 0.05));

  // 8 Jointed Arachnid Legs (Spider-Man Suit Pattern)
  const spiderLegs = [
    // Top-Right Leg 1 (reaches up high)
    [new THREE.Vector3(0.18, 0.45, 0.02), new THREE.Vector3(0.75, 0.95, 0.1), new THREE.Vector3(1.2, 1.45, 0.18)],
    // Top-Left Leg 1
    [new THREE.Vector3(-0.18, 0.45, 0.02), new THREE.Vector3(-0.75, 0.95, 0.1), new THREE.Vector3(-1.2, 1.45, 0.18)],
    // Upper-Mid Right Leg 2 (sweeps outward)
    [new THREE.Vector3(0.22, 0.25, 0.02), new THREE.Vector3(1.0, 0.55, 0.1), new THREE.Vector3(1.55, 0.4, 0.15)],
    // Upper-Mid Left Leg 2
    [new THREE.Vector3(-0.22, 0.25, 0.02), new THREE.Vector3(-1.0, 0.55, 0.1), new THREE.Vector3(-1.55, 0.4, 0.15)],
    // Lower-Mid Right Leg 3 (sweeps downward)
    [new THREE.Vector3(0.18, -0.05, 0.02), new THREE.Vector3(0.95, -0.45, 0.1), new THREE.Vector3(1.4, -1.1, 0.15)],
    // Lower-Mid Left Leg 3
    [new THREE.Vector3(-0.18, -0.05, 0.02), new THREE.Vector3(-0.95, -0.45, 0.1), new THREE.Vector3(-1.4, -1.1, 0.15)],
    // Bottom-Right Leg 4 (reaches far down)
    [new THREE.Vector3(0.1, -0.35, 0.02), new THREE.Vector3(0.65, -1.15, 0.1), new THREE.Vector3(1.05, -1.85, 0.2)],
    // Bottom-Left Leg 4
    [new THREE.Vector3(-0.1, -0.35, 0.02), new THREE.Vector3(-0.65, -1.15, 0.1), new THREE.Vector3(-1.05, -1.85, 0.2)],
  ];

  spiderLegs.forEach((leg) => {
    points.push(leg[0], leg[1]);
    points.push(leg[1], leg[2]);
  });

  return new THREE.BufferGeometry().setFromPoints(points);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. 3D INTERACTIVE SPIDER-MAN SCENE
// ─────────────────────────────────────────────────────────────────────────────
function Spider3DWorld() {
  const sceneGroup = useRef<THREE.Group>(null!);
  const websGroup = useRef<THREE.Group>(null!);
  const spidersGroup = useRef<THREE.Group>(null!);

  const webGeometry = useMemo(() => create3DSpiderWebGeometry(2.6, 12, 6), []);
  const emblemGeometry = useMemo(() => create3DSpiderManEmblemGeometry(), []);

  // 3D Spider Webs placed throughout the section depths
  const webPlacements = useMemo(() => [
    { pos: [-3.2, 1.8, -1.2], scale: 1.1, rotZ: 0.2, color: "#ED3C3F", opacity: 0.45 },
    { pos: [3.3, 0.8, -1.5], scale: 1.25, rotZ: -0.4, color: "#3B82F6", opacity: 0.4 },
    { pos: [-2.8, -1.4, -1.0], scale: 0.95, rotZ: 0.6, color: "#FFFFFF", opacity: 0.35 },
    { pos: [3.1, -2.4, -1.3], scale: 1.15, rotZ: -0.25, color: "#ED3C3F", opacity: 0.42 },
    { pos: [0.0, -3.8, -1.6], scale: 1.35, rotZ: 0.15, color: "#3B82F6", opacity: 0.38 },
  ], []);

  // 3D Spider Emblems
  const emblemPlacements = useMemo(() => [
    { pos: [-2.6, 1.4, -0.6], scale: 0.55, color: "#ED3C3F", rotSpeed: 0.2 },
    { pos: [2.8, 0.4, -0.7], scale: 0.6, color: "#3B82F6", rotSpeed: -0.25 },
    { pos: [-2.4, -1.8, -0.6], scale: 0.52, color: "#ED3C3F", rotSpeed: 0.22 },
    { pos: [2.7, -2.8, -0.8], scale: 0.58, color: "#3B82F6", rotSpeed: -0.18 },
  ], []);

  // 3D Web Slinger Connecting Strands
  const webLinePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    // Dynamic web sling strands connecting emblems & corner anchors
    pts.push(new THREE.Vector3(-4.5, 3.5, -2.0), new THREE.Vector3(-2.6, 1.4, -0.6));
    pts.push(new THREE.Vector3(-2.6, 1.4, -0.6), new THREE.Vector3(0, 0.8, -1.2));
    pts.push(new THREE.Vector3(0, 0.8, -1.2), new THREE.Vector3(2.8, 0.4, -0.7));
    pts.push(new THREE.Vector3(2.8, 0.4, -0.7), new THREE.Vector3(4.5, 2.5, -2.0));

    pts.push(new THREE.Vector3(-2.6, 1.4, -0.6), new THREE.Vector3(-2.4, -1.8, -0.6));
    pts.push(new THREE.Vector3(-2.4, -1.8, -0.6), new THREE.Vector3(0, -2.2, -1.4));
    pts.push(new THREE.Vector3(0, -2.2, -1.4), new THREE.Vector3(2.7, -2.8, -0.8));
    pts.push(new THREE.Vector3(2.8, 0.4, -0.7), new THREE.Vector3(2.7, -2.8, -0.8));
    pts.push(new THREE.Vector3(2.7, -2.8, -0.8), new THREE.Vector3(4.2, -4.0, -2.0));
    pts.push(new THREE.Vector3(-2.4, -1.8, -0.6), new THREE.Vector3(-4.2, -4.0, -2.0));

    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const snap = getScrollSnapshot();

    if (sceneGroup.current) {
      // Smooth continuous scroll vertical parallax translation
      sceneGroup.current.position.y = (snap.progress - 0.5) * 3.2;
    }

    // Spider-Sense interactive cursor response & tilt
    if (websGroup.current) {
      websGroup.current.children.forEach((child, i) => {
        child.rotation.z += delta * 0.08 * (i % 2 === 0 ? 1 : -1);
        child.rotation.x = Math.sin(t * 0.6 + i) * 0.1;
        child.rotation.y = Math.cos(t * 0.5 + i) * 0.1;
      });
    }

    if (spidersGroup.current) {
      spidersGroup.current.children.forEach((child, i) => {
        const item = emblemPlacements[i];
        if (!item) return;

        child.rotation.z = Math.sin(t * 0.9 + i * 1.5) * 0.15;
        child.rotation.y = Math.sin(t * 0.8 + i) * 0.35;
        child.position.y = item.pos[1] + Math.sin(t * 1.2 + i * 1.3) * 0.12;

        if (pointerState.inside) {
          const targetX = (pointerUv.x - 0.5) * 0.9;
          const targetY = (pointerUv.y - 0.5) * 0.6;
          child.position.x += (item.pos[0] + targetX * 0.4 - child.position.x) * delta * 2.5;
          child.position.y += (item.pos[1] + targetY * 0.4 - child.position.y) * delta * 2.5;
        }
      });
    }
  });

  return (
    <group ref={sceneGroup}>
      {/* 1. 3D Interconnected Web-Sling Strands */}
      <lineSegments geometry={webLinePoints}>
        <lineBasicMaterial color="#ED3C3F" transparent opacity={0.3} linewidth={1} />
      </lineSegments>

      {/* 2. 3D Floating Spider Webs */}
      <group ref={websGroup}>
        {webPlacements.map((w, idx) => (
          <group
            key={idx}
            position={w.pos as [number, number, number]}
            scale={w.scale}
            rotation={[0.1, 0.15, w.rotZ]}
          >
            <lineSegments geometry={webGeometry}>
              <lineBasicMaterial
                color={w.color}
                transparent
                opacity={w.opacity}
                linewidth={1.2}
              />
            </lineSegments>
            {/* Center Web Node */}
            <mesh>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. 3D Iconic Spider-Man Suit Emblems */}
      <group ref={spidersGroup}>
        {emblemPlacements.map((s, idx) => (
          <group
            key={idx}
            position={s.pos as [number, number, number]}
            scale={s.scale}
          >
            <lineSegments geometry={emblemGeometry}>
              <lineBasicMaterial
                color={s.color}
                transparent
                opacity={0.85}
                linewidth={1.8}
              />
            </lineSegments>

            {/* Glowing Spider-Sense Diamond Core */}
            <mesh position={[0, 0.05, 0.06]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXPORTED CONTINUOUS VERTICAL SPIDER-MAN 3D CANVAS
// ─────────────────────────────────────────────────────────────────────────────
export default function ContinuousSectionsBg() {
  return (
    <ViewportLazyScene
      className="absolute inset-0 z-0 pointer-events-none"
      rootMargin="500px 0px"
    >
      <div className="sticky top-0 h-screen w-full pointer-events-none opacity-85">
        <Canvas
          camera={{ position: [0, 0, 5.0], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <DomSyncProjectGrid />
          <Spider3DWorld />
        </Canvas>
      </div>
    </ViewportLazyScene>
  );
}
