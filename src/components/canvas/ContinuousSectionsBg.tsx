"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { pointerUv, pointerState, subscribeScroll } from "@/lib/bus";
import ViewportLazyScene from "./ViewportLazyScene";
import DomSyncProjectGrid from "./DomSyncProjectGrid";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 🕷️ SPIDER-MAN CONTINUOUS 3D WEB SYSTEM (ContinuousSectionsBg.tsx)
 * ──────────────────────────────────────────────────────────────────────────────
 * High-performance 3D multi-layered procedural spider-web with:
 * 1. Radial spokes & catenary sagging concentric web rings.
 * 2. Multi-depth parallax layers in Spider-Man palette (#ED3C3F, #EDEAE2, #3B82F6).
 * 3. Signature Spidey-Sense kinetic pulses launching along web strands on cursor movement.
 * 4. Glowing dew-drop intersection nodes with organic shimmer.
 * 5. Native requestAnimationFrame loop with zero garbage collection overhead.
 * ══════════════════════════════════════════════════════════════════════════════
 */

// ── 1. Procedural 3D Web Geometry: Radial Spokes + Catenary Sagging Rings ──
function buildWeb(
  radius: number,
  spokes: number,
  rings: number,
  sagAmount: number
) {
  const spokePoints: THREE.Vector3[][] = [];
  const segments: THREE.Vector3[] = [];

  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
    const pts = [new THREE.Vector3(0, 0, 0)];

    for (let r = 1; r <= rings; r++) {
      const t = r / rings;
      const rr = t * radius;
      const z = Math.sin(angle * 2.0 + r) * 0.08 * t;
      pts.push(new THREE.Vector3(dir.x * rr, dir.y * rr, z));
    }
    spokePoints.push(pts);

    for (let r = 0; r < pts.length - 1; r++) {
      segments.push(pts[r], pts[r + 1]);
    }
  }

  // Concentric sagging rings connecting spokes
  for (let r = 1; r <= rings; r++) {
    const sag = (1 - r / rings) * sagAmount;
    for (let i = 0; i < spokes; i++) {
      const a = spokePoints[i][r];
      const b = spokePoints[(i + 1) % spokes][r];
      const mid = a.clone().lerp(b, 0.5);
      mid.z -= sag;
      // Two segments to approximate natural catenary sag
      segments.push(a, mid, mid, b);
    }
  }

  return { segments, spokePoints };
}

function SpiderWebCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // ── 2. Scene / Camera / Renderer ─────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080b, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── 3. Multi-Layer Depth Web Constellation ──────────────────────────────
    const layerConfigs = [
      { radius: 5.6, spokes: 14, rings: 7, sag: 0.22, z: -2.8, opacity: 0.18, color: 0xedeae2 },
      { radius: 4.0, spokes: 12, rings: 6, sag: 0.16, z: -0.8, opacity: 0.35, color: 0xed3c3f },
      { radius: 2.6, spokes: 10, rings: 5, sag: 0.11, z: 1.1, opacity: 0.65, color: 0xedeae2 },
    ];

    const webGroup = new THREE.Group();
    const layerMeshes: THREE.LineSegments[] = [];

    layerConfigs.forEach((cfg, idx) => {
      const { segments, spokePoints } = buildWeb(cfg.radius, cfg.spokes, cfg.rings, cfg.sag);
      const geo = new THREE.BufferGeometry().setFromPoints(segments);
      const mat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(geo, mat);
      lines.position.z = cfg.z;
      lines.userData = { cfg, spokePoints, baseOpacity: cfg.opacity, idx };
      webGroup.add(lines);
      layerMeshes.push(lines);
    });

    scene.add(webGroup);

    // ── 4. Glowing Dew-Drop Nodes at Outer Ring Intersections ───────────────
    const frontLayer = layerMeshes[layerMeshes.length - 1];
    const dewPositions: number[] = [];
    frontLayer.userData.spokePoints.forEach((pts: THREE.Vector3[]) => {
      const p = pts[pts.length - 1];
      dewPositions.push(p.x, p.y, p.z + frontLayer.position.z);
    });

    const dewGeo = new THREE.BufferGeometry();
    dewGeo.setAttribute("position", new THREE.Float32BufferAttribute(dewPositions, 3));
    const dewMat = new THREE.PointsMaterial({
      color: 0xed3c3f,
      size: 0.065,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dewPoints = new THREE.Points(dewGeo, dewMat);
    scene.add(dewPoints);

    // ── 5. Signature Spidey-Sense Kinetic Pulses along Web Strands ──────────
    const PULSE_COUNT = 8;
    const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xed3c3f,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pulses: {
      mesh: THREE.Mesh;
      active: boolean;
      t: number;
      spokeIndex: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < PULSE_COUNT; i++) {
      const mesh = new THREE.Mesh(pulseGeo, pulseMat.clone());
      mesh.visible = false;
      scene.add(mesh);
      pulses.push({
        mesh,
        active: false,
        t: 0,
        spokeIndex: 0,
        speed: 1.5 + Math.random() * 0.7,
      });
    }

    let pulseCooldown = 0;

    function launchPulse(spokeIndex: number) {
      const p = pulses.find((p) => !p.active);
      if (!p) return;
      p.active = true;
      p.t = 0;
      p.spokeIndex = spokeIndex;
      p.mesh.visible = true;
    }

    // ── 6. Pointer Tracking & Kinetic Sense ─────────────────────────────────
    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    const checkPointerPulse = () => {
      if (!pointerState.inside) return;
      const nx = (pointerUv.x - 0.5) * 2;
      const ny = (pointerUv.y - 0.5) * -2;
      pointerTarget.x = nx;
      pointerTarget.y = ny;

      if (pulseCooldown <= 0) {
        const angle = Math.atan2(ny, nx);
        const spokeCount = frontLayer.userData.cfg.spokes;
        const idx =
          Math.round(
            (((angle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * spokeCount
          ) % spokeCount;
        launchPulse(idx);
        pulseCooldown = 0.32;
      }
    };

    // ── 7. Scroll Parallax Listener ─────────────────────────────────────────
    let scrollProgress = 0;
    const unsubScroll = subscribeScroll((snap) => {
      scrollProgress = snap.progress;
    });

    // ── 8. Resize Observer ──────────────────────────────────────────────────
    function onResize() {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    // ── 9. Optimized 60 FPS Render Loop ─────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      pulseCooldown -= dt;
      checkPointerPulse();

      // Critically damped pointer lerp
      pointer.x += (pointerTarget.x - pointer.x) * Math.min(1, dt * 3.5);
      pointer.y += (pointerTarget.y - pointer.y) * Math.min(1, dt * 3.5);

      // Parallax rotation & subtle vertical translation with scroll
      webGroup.rotation.y = pointer.x * 0.28;
      webGroup.rotation.x = -pointer.y * 0.2;
      webGroup.position.y = (scrollProgress - 0.5) * 2.2;

      // Organic idle layer sway for deep spatial dimensionality
      layerMeshes.forEach((mesh, i) => {
        mesh.rotation.z = Math.sin(elapsed * 0.35 + i * 1.7) * 0.035;
      });

      dewPoints.position.y = webGroup.position.y;
      dewPoints.rotation.x = webGroup.rotation.x;
      dewPoints.rotation.y = webGroup.rotation.y;
      dewPoints.rotation.z = Math.sin(elapsed * 0.3) * 0.025;
      dewMat.opacity = 0.7 + Math.sin(elapsed * 1.8) * 0.25;

      // Advance pulses along the web strands
      const spokePoints = frontLayer.userData.spokePoints;
      const layerZ = frontLayer.position.z;

      pulses.forEach((p) => {
        if (!p.active) return;
        p.t += dt * p.speed;
        const pts = spokePoints[p.spokeIndex];
        const travel = Math.min(p.t, 1);
        const segCount = pts.length - 1;
        const segF = travel * segCount;
        const segI = Math.min(Math.floor(segF), segCount - 1);
        const localT = segF - segI;
        const a = pts[segI];
        const b = pts[segI + 1];
        const pos = a.clone().lerp(b, localT);

        p.mesh.position.set(
          pos.x + webGroup.position.x,
          pos.y + webGroup.position.y,
          pos.z + layerZ
        );
        (p.mesh.material as THREE.MeshBasicMaterial).opacity =
          travel < 0.08 ? travel / 0.08 : (1 - travel) * 0.95;

        if (p.t >= 1) {
          p.active = false;
          p.mesh.visible = false;
        }
      });

      renderer.render(scene, camera);
    }
    animate();

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      unsubScroll();
      layerMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      dewGeo.dispose();
      dewMat.dispose();
      pulseGeo.dispose();
      pulses.forEach((p) => (p.mesh.material as THREE.Material).dispose());
      renderer.dispose();
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. EXPORTED CONTINUOUS VERTICAL SPIDER-MAN 3D BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
export default function ContinuousSectionsBg() {
  return (
    <ViewportLazyScene
      className="absolute inset-0 z-0 pointer-events-none"
      rootMargin="500px 0px"
    >
      <div className="sticky top-0 h-screen w-full pointer-events-none opacity-90 overflow-hidden">
        {/* Ambient spider-sense crimson glow off-center for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(750px 500px at 65% 32%, rgba(237, 60, 63, 0.12), transparent 70%)",
          }}
        />
        {/* Fine atmospheric vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            boxShadow: "inset 0 0 200px 70px rgba(0, 0, 0, 0.7)",
          }}
        />
        <SpiderWebCanvas />
      </div>
    </ViewportLazyScene>
  );
}
